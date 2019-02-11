import React from 'react';
import {
  compose,
  withProps,
  withHandlers,
  pure,
  lifecycle,
  withState,
  defaultProps,
} from 'recompose';

import viewar from 'viewar-api';

import { Container } from '../../components/FullScreenContainer';

import styles from './styles.css';

//HELPER FUNCTIONS//

const concatObjValues = obj => Object.values(obj).join('');

const isObjectInArr = (objArr, obj) => {
  const concatenated = concatObjValues(obj);
  return objArr.map(concatObjValues).find(str => str === concatenated);
};

const getUniqueTargetsByPosition = targets => {
  return targets
    .filter(target => target.pose)
    .reduce((acc, target) => {
      const positions = acc.map(({ pose }) => pose.position);
      if (isObjectInArr(positions, target.pose.position)) {
        return acc;
      } else {
        acc.push(target);
        return acc;
      }
    }, []);
};

///////////////

const TrackingSystem = ({ isTracking, showQRMessage, initialized }) => (
  <span>
    {!initialized ? (
      <Container>
        {!isTracking && (
          <div className={styles.overlay}> Please do a few sidesteps </div>
        )}
        {showQRMessage && (
          <div className={styles.overlay}>
            {' '}
            Please film a registered QR-Code{' '}
          </div>
        )}
      </Container>
    ) : (
      <div />
    )}
  </span>
);

const updateTracking = ({
  viewar,
  tracker,
  targetModel,
  setIsTracking,
  setShowQRMessage,
  setInitialized,
  initialized,
  initializationStatusChanged,
}) => async () => {
  const trackedTargets = tracker.targets.filter(target => target.tracked);
  const trackedPlaneTarget = trackedTargets.find(target =>
    target.name.includes('planeTarget')
  );
  const otherTarget = trackedTargets.find(
    target => !target.name.includes('planeTarget')
  );
  const otherTargetHasPose =
    otherTarget &&
    !!api.appConfig.trackerList[0].targets.find(
      target => target.name === otherTarget.name
    ).pose;

  setIsTracking(!!trackedPlaneTarget);

  if (trackedPlaneTarget && !otherTarget && !initialized) {
    initializationStatusChanged(false);
    setShowQRMessage(true);
  }

  if (trackedPlaneTarget && otherTarget && !initialized && otherTargetHasPose) {
    setShowQRMessage(false);
    setInitialized(true);
    initializationStatusChanged(true);

    const targets = getUniqueTargetsByPosition(
      viewar.appConfig.trackerList[0].targets
    );

    return Promise.all(
      targets.map(({ pose }) =>
        viewar.sceneManager.insertModel(targetModel, { pose })
      )
    );
  }
};

export default compose(
  withState('showQRMessage', 'setShowQRMessage', false),
  withState('isTracking', 'setIsTracking', false),
  withState('initialized', 'setInitialized', false),
  defaultProps({
    initializationStatusChanged: () => {},
  }),
  withProps({
    viewar,
  }),
  withProps(({ viewar }) => ({
    tracker: Object.values(viewar.trackers)[0],
    targetModel: viewar.modelManager.findModelByForeignKey('target'),
  })),
  withHandlers({
    toggleRoutes: ({ setShowRoutes, showRoutes }) => () =>
      setShowRoutes(!showRoutes),
    updateTracking,
  }),
  lifecycle({
    async componentDidMount() {
      const { viewar, tracker, updateTracking } = this.props;

      await viewar.cameras.arCamera.activate();

      await tracker.activate();
      tracker.on('trackingStatusChanged', updateTracking);

      setTimeout(() => {
        const model = viewar.modelManager.findModelByForeignKey('ball');
        return viewar.sceneManager.insertModel(model, {
          pose: { position: { x: 0, y: 0, z: 0 } },
        });
      }, 0);
    },
    async componentWillUnmount() {
      const { tracker, updateTracking } = this.props;

      await tracker.deactivate();

      tracker && tracker.off('trackingStatusChanged', updateTracking);
    },
  }),
  pure
)(TrackingSystem);
