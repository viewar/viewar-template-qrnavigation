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

let interval;

///////////////

const TrackingSystemQRLearn = ({
  isTracking,
  initialized,
  showInstructions,
}) => (
  <span>
    {!initialized ? (
      <Container>
        {!isTracking && (
          <div className={styles.overlay}>Please do a few sidesteps</div>
        )}
        {isTracking && showInstructions && (
          <div className={styles.overlay}>
            Film a learned QR code first and then film the new ones.
          </div>
        )}
      </Container>
    ) : (
      <div />
    )}
  </span>
);

export default compose(
  withState('showInstructions', 'setShowInstructions', false),
  withState('showQRMessage', 'setShowQRMessage', false),
  withState('isTracking', 'setIsTracking', false),
  withState('initialized', 'setInitialized', false),
  defaultProps({
    viewar,
    initializationStatusChanged: () => {},
    onNewQR: () => {},
  }),
  withProps(({ viewar }) => ({
    tracker: Object.values(viewar.trackers)[0],
    targetModel: viewar.modelManager.findModelByForeignKey('target'),
  })),
  withHandlers({
    toggleRoutes: ({ setShowRoutes, showRoutes }) => () =>
      setShowRoutes(!showRoutes),
    handleTracking: ({
      viewar,
      targetModel,
      setIsTracking,
      setShowInstructions,
      setInitialized,
      initialized,
      initializationStatusChanged,
      onScan,
    }) => async ({ target }) => {
      const targetName = target.name;
      const tracking = target.tracked;

      //HELPER
      const hasPose = targetName => {
        const arkit = viewar.appConfig.trackerList.find(
          tracker => tracker.name === 'ARKit'
        );
        if (!arkit) return false;
        const target = arkit.targets.find(target => target.name === targetName);
        if (!target) return false;
        return !!target.pose;
      };

      // for mock
      if (tracking && targetName === 'VCard01') {
        setInitialized(true);
        initializationStatusChanged(true);
        setIsTracking(true);
        return;
      }

      if (targetName.includes('planeTarget')) {
        setIsTracking(tracking);
        setInitialized(false);
        if (tracking) {
          setShowInstructions(true);
        }
      }

      if (hasPose(targetName)) {
        setShowInstructions(false);
        initializationStatusChanged(true);

        interval = setInterval(async () => {
          const QRCodes = await viewar.coreInterface.call(
            'customTrackingCommand',
            'ARKit',
            'getLearnedTargets',
            ''
          );
          const scannedQRCodes = QRCodes.filter(QRCode => {
            const { x, y, z } = QRCode.pose.position;
            return x !== 0 && y !== 0 && z !== 0;
          });
          onScan(scannedQRCodes);
        }, 2000);
      }
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { viewar, tracker, handleTracking } = this.props;

      await viewar.sceneManager.clearScene();

      await viewar.cameras.arCamera.activate();
      await tracker.reset();
      tracker.on('trackingStatusChanged', handleTracking);

      setTimeout(() => {
        const model = viewar.modelManager.findModelByForeignKey('ball');
        return viewar.sceneManager.insertModel(model, {
          pose: { position: { x: 0, y: 0, z: 0 } },
        });
      }, 0);
    },
    async componentWillUnmount() {
      const { tracker, handleTracking } = this.props;

      await tracker.deactivate();

      tracker && tracker.off('trackingStatusChanged', handleTracking);
      clearInterval(interval);
    },
  }),
  pure
)(TrackingSystemQRLearn);
