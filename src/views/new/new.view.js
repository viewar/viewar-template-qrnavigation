import React from 'react';
import {
  compose,
  withProps,
  withState,
  withHandlers,
  pure,
  lifecycle,
} from 'recompose';
import viewar from 'viewar-api';
import { Button } from '../../components/Button';
import { Container } from '../../components/FullScreenContainer';

import { distance } from '../../utils/math';

import { InputModal } from '../../containers/modal/modal';

const THRESHOLD_POINT_DISTANCE = 200;

let getSceneState$;
let interval;
let lastPosition;

export const removeInstancesByForeignKey = ({ viewar }) => foreignKey => {
  return Promise.all(
    viewar.sceneManager.scene.children
      .filter(child => child.model.foreignKey === foreignKey)
      .map(viewar.sceneManager.removeNode)
  );
};

const NewView = ({
  handleBack,
  isTracking,
  showQRMessage,
  startHandler,
  stopHandler,
  isRecording,
  cancelHandler,
  showLabelModal,
  handleModalCancel,
}) => (
  <Container>
    {showLabelModal && (
      <InputModal required onOk={startHandler} onCancel={handleModalCancel}>
        Enter a label for the route
      </InputModal>
    )}
    {isRecording && <Button onClick={stopHandler}>Stop</Button>}
    {isRecording && <Button onClick={cancelHandler}>Cancel</Button>}
  </Container>
);

export default compose(
  withState('showLabelModal', 'setShowLabelModal', false),
  withState('isRecording', 'setIsRecording', false),
  withState('label', 'setLabel', ''),
  withProps({
    viewar,
  }),
  withProps(({ viewar }) => ({
    ballModel: viewar.modelManager.findModelByForeignKey('ball'),
    activeCamera: viewar.cameras.perspectiveCamera.active
      ? viewar.cameras.perspectiveCamera
      : viewar.cameras.arCamera,
  })),
  withHandlers({
    removeInstancesByForeignKey,
  }),
  withHandlers({
    addPoint: ({ viewar, activeCamera, ballModel, label }) => async () => {
      try {
        const pose = await activeCamera.updatePose();

        viewar.socketConnection.send({
          messageType: 'newLiveRoute',
          data: { route: label, sender: viewar.socketConnection.socket.id },
        }); //signal for clients which entered show routes after starting

        if (
          !lastPosition ||
          distance(pose.position, lastPosition) > THRESHOLD_POINT_DISTANCE
        ) {
          viewar.socketConnection.send({
            messageType: 'newLiveRoutePoint',
            data: { route: label, pose },
          });
          lastPosition = pose.position;
          return viewar.sceneManager.insertModel(ballModel, { pose });
        }
      } catch (e) {
        console.warn(
          'creation of new Routes is not available in the Web-Version'
        );
      }
    },
    handleBack: ({ removeInstancesByForeignKey, onBack }) => async (
      activeRoute,
      keep
    ) => {
      if (!keep) {
        await removeInstancesByForeignKey('ball');
      }
      onBack(activeRoute);
    },
  }),
  withHandlers({
    handleModalCancel: ({ setShowLabelModal, handleBack }) => () => {
      setShowLabelModal(false);
      handleBack(null);
    },
    startHandler: ({
      viewar,
      addPoint,
      setIsRecording,
      setLabel,
      removeInstancesByForeignKey,
      setShowLabelModal,
    }) => async label => {
      setIsRecording(true);
      setShowLabelModal(false);

      await removeInstancesByForeignKey('ball');

      viewar.socketConnection.send({
        messageType: 'newLiveRoute',
        data: { route: label, sender: viewar.socketConnection.socket.id },
      });
      setLabel(label);
      interval = setInterval(addPoint, 1000);
    },
    cancelHandler: ({
      viewar,
      setIsRecording,
      history,
      label,
      handleBack,
    }) => async () => {
      setIsRecording(false);
      interval && clearInterval(interval);
      viewar.socketConnection.send({
        messageType: 'cancelLiveRoute',
        data: { route: label },
      });

      handleBack(null);
    },
    stopHandler: ({
      viewar,
      setIsRecording,
      history,
      label,
      handleBack,
    }) => async () => {
      clearInterval(interval);
      setIsRecording(false);

      const sceneState = await viewar.sceneManager.getSceneStateSafe();

      const routes =
        (await viewar.storage.cloud.read('/public/routes/index.json')) || {};
      routes[label] = sceneState;

      await viewar.storage.cloud.write(
        '/public/routes/index.json',
        JSON.stringify(routes)
      );

      viewar.socketConnection.send({
        messageType: 'saveLiveRoute',
        data: { route: label },
      });

      handleBack(label, true);
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { viewar, setShowLabelModal } = this.props;

      getSceneState$ = viewar.socketConnection
        .getData('getSceneState')
        .subscribe(async room => {
          const sceneState = await viewar.sceneManager.getSceneStateSafe();
          viewar.socketConnection.send({
            room,
            messageType: 'newSceneState',
            data: sceneState,
          });
        });

      setShowLabelModal(true);
    },
    async componentWillUnmount() {
      interval && clearInterval(interval);
      getSceneState$ && getSceneState$.unsubscribe();
    },
  }),
  pure
)(NewView);
