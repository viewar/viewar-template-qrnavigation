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

const THRESHOLD_POINT_DISTANCE = 200;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

let getSceneState$;
let interval;
let lastPosition;

const NewView = ({ handleBack, isTracking, showQRMessage, startHandler, stopHandler, isRecording, cancelHandler }) =>
  <Container>
    { !isRecording && <Button onClick={handleBack}>Back</Button> }
    { !isRecording && <Button src={scan} onClick={startHandler}>Start</Button> }
    { isRecording && <Button src={support} onClick={stopHandler}>Stop</Button> }
    { isRecording && <Button src={support} onClick={cancelHandler}>Cancel</Button> }
  </Container>

export default compose(
  viewarConnect(),
  withState('isRecording', 'setIsRecording', false),
  withState('label', 'setLabel', ''),
  withProps(({ viewar }) => ({
    mySessionId: Math.random().toString(36).substring(7),
    ballModel: viewar.modelManager.findModelByForeignKey('ball'),
    activeCamera: viewar.cameras.perspectiveCamera.active ? viewar.cameras.perspectiveCamera : viewar.cameras.augmentedRealityCamera,
  })),
  withHandlers({
    removeInstancesByForeignKey: ({ viewar }) => (foreignKey) => {
      return Promise.all(viewar.sceneManager.scene.children
        .filter(child => child.model.foreignKey === foreignKey)
        .map(viewar.sceneManager.removeNode)
      );
    },
    addPoint: ({ viewar, activeCamera, ballModel, label }) => async () => {
      const pose = await activeCamera.updatePose();
      viewar.socketConnection.send({ messageType: 'newLiveRoute', data: { route: label, sender: viewar.socketConnection.socket.id } }); //signal for clients which entered show routes after starting

      if (!lastPosition || distance(pose.position, lastPosition) > THRESHOLD_POINT_DISTANCE) {
        viewar.socketConnection.send({ messageType: 'newLiveRoutePoint', data: { route: label, pose } });
        lastPosition = pose.position;
        return viewar.sceneManager.insertModel(ballModel, { pose } );
      }
    },
  }),
  withHandlers({
    handleBack: ({ removeInstancesByForeignKey, onBack}) => async () => {
      await removeInstancesByForeignKey('ball');
      onBack();
    },
    startHandler: ({ viewar, addPoint, setIsRecording, setLabel, removeInstancesByForeignKey }) => async () => {
      setIsRecording(true);

      const label = prompt('enter a label');

      if (!label) {
        return;
      }

      await removeInstancesByForeignKey('ball');

      viewar.socketConnection.send({ messageType: 'newLiveRoute', data: { route: label, sender: viewar.socketConnection.socket.id } });
      setLabel(label);
      interval = setInterval(addPoint, 1000);
    },
    cancelHandler: ({ viewar, setIsRecording, history, label, removeInstancesByForeignKey }) => async () => {
      setIsRecording(false);
      interval && clearInterval(interval);
      viewar.socketConnection.send({ messageType: 'cancelLiveRoute', data: { route: label } });

      await removeInstancesByForeignKey('ball');
    },
    stopHandler: ({ viewar, setIsRecording, history, label, removeInstancesByForeignKey }) => async () => {
      clearInterval(interval);
      setIsRecording(false);

      const sceneState = await viewar.sceneManager.getSceneStateSafe();

      const routes = await viewar.storage.cloud.read('/public/routes/index.json') || {};
      routes[label] = sceneState;

      await viewar.storage.cloud.write('/public/routes/index.json', JSON.stringify(routes));

      viewar.socketConnection.send({ messageType: 'saveLiveRoute', data: { route: label } });
    },
  }),
  lifecycle({
    async componentWillMount() {
      const { viewar } = this.props;

      getSceneState$ = viewar.socketConnection.getData('getSceneState').subscribe(async (room) => {
        const sceneState = await viewar.sceneManager.getSceneStateSafe();
        viewar.socketConnection.send({ room, messageType: 'newSceneState', data: sceneState });
      });

    },
    async componentWillUnmount() {
      interval && clearInterval(interval);
      getSceneState$ && getSceneState$.unsubscribe();
    },
  }),
  pure,
)(NewView);