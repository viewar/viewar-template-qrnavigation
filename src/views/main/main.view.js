import React from 'react';
import { compose, withProps, withState, withHandlers, pure, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Button from '../../components/Button';
import { Row, Absolute } from '../../components/Helpers';

import { applyQuaternion, addVectors, multiplyScalar } from '../../utils/math';

import scan from '../../../assets/button_scan.svg';
import add from '../../../assets/button_annotation.svg';
import support from '../../../assets/button_support.svg';


import { viewarConnect } from '../../lib/viewar-react';

let interval;
let sceneState = {};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  width: 50%;
  background-color: rgb(255,255,255);
  opacity: 0.7;
  padding: 1em;
  margin: 0.5em;
`;

const H2 = styled.h2`
`;

const P = styled.p`
`;

const IconButton = styled.div`
  pointer-events: all;
  background: url(${props => props.src}) center no-repeat;
  background-size: cover;
  width: 70px;
  height: 70px;
  margin: 0.5em;
`;

const NewButton = styled(IconButton)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const List = styled.div`
  margin: 0.5em;
  overflow: auto;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
`;


const MainView = ({ showQRMessage, activeStream, supporters, supportEmailHandler, handleSetMarker, selectedAnnotation, history, isTracking, percent, startStreamHandler, fetchSupportList, stopStreamHandler, handleNewAnnotationClick, handleConfirmGround }) =>
  <Container>
    <List>
    { supporters.map(supporter =>
      <ListItem key={supporter.id}>
        {supporter.label}
        { activeStream !== supporter.id ? <Button style={{ borderRadius: '50%', padding: '25px 20px;' }} onClick={() => startStreamHandler(supporter.id)}>Call</Button> :
        <Button style={{ borderRadius: '50%', padding: '25px 20px;' }} onClick={() => stopStreamHandler(supporter.id)}>End</Button>}
      </ListItem>
    )}
    </List>
    { selectedAnnotation && <Info>
      <H2>{selectedAnnotation.name}</H2>
      <P>{selectedAnnotation.description}</P>
    </Info> }
    <div style={{ display: 'flex', position: 'absolute', bottom: 0 }}>
      <IconButton src={scan} onClick={history.goBack}/>
      <IconButton src={support} onClick={supportEmailHandler}/>
    </div>
    <NewButton src={add} onClick={handleSetMarker} />
 </Container>

export default compose(
  viewarConnect(),
  withRouter,
  withState('isTracking', 'setIsTracking', false),
  withState('percent', 'setPercent', '0'),
  withState('selectedAnnotation', 'setSelectedAnnotation', null),
  withState('supporters', 'setSupporters', []),
  withState('activeStream', 'setActiveStream', null),
  withProps(({ viewar }) => ({
    tracker: Object.values(viewar.trackers)[0],
    mySessionId: Math.random().toString(36).substring(7),
    activeCamera: viewar.cameras.perspectiveCamera.active ? viewar.cameras.perspectiveCamera : viewar.cameras.augmentedRealityCamera,
  })),
  withHandlers({
    stopStreamHandler: ({ viewar, activeStream, mySessionId }) => async () => {
      if (!activeStream) return;
      viewar.coreInterface.call('stopStreaming', mySessionId);
      viewar.socketConnection.send({ room: activeStream, messageType: 'stopStreaming', data: mySessionId });
    },
    supportEmailHandler: ({ viewar, mySessionId }) => async () => {
      await viewar.appUtils.sendEmail({
        subject: 'Remote Support Request',
        message:
          `Please assist me via remote support 
          
           http://test2.3.viewar.com/web/action:remote/id:${mySessionId}`,
      });

      viewar.coreInterface.call('startStreaming', mySessionId, 'sender');
    }
  }),
  withHandlers({
    handleTracking: ({ setIsTracking }) => (tracking) => {
      setIsTracking(tracking);
    },
    handleNewAnnotationClick: ({history }) => () => {
      history.push('/new');
    },
    handleSceneTouch: ({ viewar, setSelectedAnnotation }) => async (touches) => {
      const sortedTouches = await sortTouchesByDistance(touches, viewar);
      const { instanceId } = sortedTouches[0];
      const annotation = viewar.annotationService.instanceMapping[instanceId];
      setSelectedAnnotation(annotation);
    },
    handleSetMarker: ({ viewar, activeCamera, activeStream }) => async () => {

      const { position, orientation } = await activeCamera.updatePose();
      const distance = 300;

      const directionVector = applyQuaternion({ x: 0, y: 0, z: -1 }, orientation);
      const finalPosition = addVectors(position, multiplyScalar(directionVector , distance));

      const pose = { position: finalPosition, scale: { x: 0.3, y: 0.3, z: 0.3 } };

      const model = viewar.modelManager.findModelByForeignKey('ball');
      const { id } = await viewar.sceneManager.insertModel(model, { pose });

      const name = prompt('Enter a name for the module', 'new module');
      const description = prompt('Enter a description for the module', 'das ist eine Dummy-Beschreibung!');

      if(activeStream){
        const newSceneState = await viewar.sceneManager.getSceneStateSafe();
        viewar.socketConnection.send({ room: activeStream, messageType: 'syncSceneState', data: newSceneState });
      }

      return viewar.annotationService.addAnnotationToSelectedId(id, {
        name,
        status: 'OK',
        description,
        pose
      });
    },
    fetchSupportList: ({ viewar, setSupporters, activeStream }) => async (touches) => {

      const admin = viewar.socketConnection.admin; //TODO we need more admins in the future
      if(admin) {
        setSupporters([{ label: 'Supporter 1', id: admin }])
      } else {
        setSupporters([])
      }
    },
    startStreamHandler: ({ viewar, setActiveStream, stopStreamHandler, mySessionId }) => async (room) => {
      stopStreamHandler();
      setActiveStream(room);
      const sceneState = await viewar.sceneManager.getSceneStateSafe();
      viewar.socketConnection.send({ room: room, messageType: 'startStreaming', data: { sessionId: mySessionId, sceneState } });
      viewar.coreInterface.call('startStreaming', mySessionId, 'sender');
    }
  }),
  lifecycle({
    async componentWillMount() {
      const { viewar, tracker, handleTracking, setPercent, handleSceneTouch, fetchSupportList } = this.props;
      const { sceneManager, cameras, coreInterface } = viewar;

      tracker.activate();

      await sceneManager.clearScene();

      await viewar.annotationService.insertSelectedDataIntoScene({ onProgressUpdate: setPercent });

      tracker && tracker.on('trackingTargetStatusChanged', handleTracking);

      await coreInterface.call('switchToMode', 'TouchRay');
      sceneManager.on('sceneTouched', handleSceneTouch);

      interval = setInterval(() => fetchSupportList(), 1000);
    },
    async componentWillUnmount() {
      const { viewar, handleSceneTouch, tracker, handleTracking } = this.props;
      const { sceneManager, } = viewar;

      sceneManager.off('sceneTouched', handleSceneTouch);
      tracker && tracker.off('trackingTargetStatusChanged', handleTracking);

      clearInterval(interval);

    },
  }),
  pure,
)(MainView);


// HELPER //
async function sortTouchesByDistance(touches, api) {
  const { cameras: { perspectiveCamera, augmentedRealityCamera } } = api;

  const activeCamera = perspectiveCamera.active ? perspectiveCamera : augmentedRealityCamera;

  const cameraPose = await activeCamera.updatePose();

  // Sort intersections by nearest distance to camera.
  touches.map(touch => {
    for (const intersection of touch.intersection) {
      const x = cameraPose.position.x - intersection.x;
      const y = cameraPose.position.y - intersection.y;
      const z = cameraPose.position.z - intersection.z;
      intersection.squaredDistance = x * x + y * y + z * z;
    }

    touch.intersection.sort((a, b) => a.squaredDistance - b.squaredDistance);
  });

  // Sort touches by nearest distance from nearest intersection to camera.
  touches.sort((a, b) => a.intersection[0].squaredDistance - b.intersection[0].squaredDistance);

  return touches;
}