import React from 'react';
import { compose, withProps, withState, withHandlers, pure, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Button from '../../components/Button';
import { Row, Absolute } from '../../components/Helpers';

import { applyQuaternion, addVectors, multiplyScalar, distance } from '../../utils/math';

import scan from '../../../assets/button_scan.svg';
import add from '../../../assets/button_annotation.svg';
import support from '../../../assets/button_support.svg';


import { viewarConnect } from '../../lib/viewar-react';

let sceneState = {};

const THRESHOLD_POINT_DISTANCE = 200;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;


const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.69);
  color: white;
  top: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;


let getSceneState$;
let interval;
let lastPosition;

const NewView = ({ isTracking, showQRMessage, startHandler, stopHandler, isRecording, cancelHandler, history }) =>
  <Container>
    <Button onClick={history.goBack}>Back</Button>
    { !isTracking && <Overlay> Please do a few sidesteps </Overlay>}
    { showQRMessage && <Overlay> Please film the QR-Code </Overlay>}
    { !isRecording && <Button src={scan} onClick={startHandler}>Start</Button> }
    { isRecording && <Button src={support} onClick={stopHandler}>Stop</Button> }
    { isRecording && <Button src={support} onClick={cancelHandler}>Cancel</Button> }
  </Container>

export default compose(
  viewarConnect(),
  withRouter,
  withState('showQRMessage', 'setShowQRMessage', false),
  withState('isTracking', 'setIsTracking', false),
  withState('isRecording', 'setIsRecording', false),
  withState('label', 'setLabel', ''),
  withState('lastPose', 'setLastPose', null),
  withProps(({ viewar }) => ({
    tracker: Object.values(viewar.trackers)[0],
    mySessionId: Math.random().toString(36).substring(7),
    ballModel: viewar.modelManager.findModelByForeignKey('ball'),
    activeCamera: viewar.cameras.perspectiveCamera.active ? viewar.cameras.perspectiveCamera : viewar.cameras.augmentedRealityCamera,
  })),
  withHandlers({
    addPoint: ({ viewar, activeCamera, ballModel, label, lastPose, setLastPose }) => async () => {
      const pose = await activeCamera.updatePose();
      viewar.socketConnection.send({ messageType: 'newLiveRoute', data: { route: label, sender: viewar.socketConnection.socket.id } }); //signal for clients which entered show routes after starting
      //console.log(lastPosition && distance(pose.position, lastPosition) );
      if (!lastPosition || distance(pose.position, lastPosition) > THRESHOLD_POINT_DISTANCE) {
        viewar.socketConnection.send({ messageType: 'newLiveRoutePoint', data: { route: label, pose } });
        lastPosition = pose.position;
        return viewar.sceneManager.insertModel(ballModel, { pose } );
      }
    },
  }),
  withHandlers({
    startHandler: ({ viewar, addPoint, setIsRecording, setLabel }) => async () => {
      setIsRecording(true);

      const label = prompt('enter a label');

      if (!label) {
        return;
      }

      viewar.socketConnection.send({ messageType: 'newLiveRoute', data: { route: label, sender: viewar.socketConnection.socket.id } });
      setLabel(label);
      interval = setInterval(addPoint, 1000);
    },
    cancelHandler: ({ viewar, setIsRecording, history, label }) => async () => {
      setIsRecording(false);
      clearInterval(interval);
      viewar.socketConnection.send({ messageType: 'cancelLiveRoute', data: { route: label } });

      await viewar.sceneManager.clearScene();
      history.goBack();
    },
    stopHandler: ({ viewar, setIsRecording, history, label }) => async () => {
      clearInterval(interval);
      setIsRecording(false);

      const sceneState = await viewar.sceneManager.getSceneStateSafe();

      const routes = await viewar.storage.cloud.read('/public/routes/index.json') || {};
      routes[label] = sceneState

      await viewar.storage.cloud.write('/public/routes/index.json', JSON.stringify(routes));

      viewar.socketConnection.send({ messageType: 'saveLiveRoute', data: { route: label } });

      await viewar.sceneManager.clearScene();
      history.goBack();
    },
    handleTracking: ({ setIsTracking, setShowQRMessage }) => (tracking) => {
      setIsTracking(tracking);
      if (tracking) {
        setShowQRMessage(true)
        setTimeout(() => setShowQRMessage(false), 2000);
      }
    },
  }),
  lifecycle({
    async componentWillMount() {
      const { viewar, tracker, handleTracking } = this.props;
      const { sceneManager, cameras, modelManager } = viewar;

      await cameras.augmentedRealityCamera.activate();

      tracker.activate();

      await sceneManager.clearScene();
      tracker && tracker.on('trackingTargetStatusChanged', handleTracking);

      getSceneState$ = viewar.socketConnection.getData('getSceneState').subscribe(async (room) => {
        const sceneState = await viewar.sceneManager.getSceneStateSafe();
        viewar.socketConnection.send({ room, messageType: 'newSceneState', data: sceneState });
      });

    },
    async componentWillUnmount() {
      const { viewar, tracker, handleTracking } = this.props;

      tracker && tracker.off('trackingTargetStatusChanged', handleTracking);

      clearInterval(interval);

      getSceneState$ && getSceneState$.unsubscribe();

    },
  }),
  pure,
)(NewView);