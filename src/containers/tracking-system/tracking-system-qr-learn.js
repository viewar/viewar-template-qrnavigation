import React from 'react';
import {compose, withProps, withHandlers, pure, lifecycle, withState, defaultProps} from 'recompose';

import { withViewar } from '../../lib/viewar-react';

import { Container } from "../../components/FullScreenContainer";

import styles from './styles.css';

let interval;

///////////////

const TrackingSystemQRLearn = ({ isTracking, initialized, showInstructions }) =>
    <span>{ !initialized ? <Container>
        { !isTracking && <div className={styles.overlay}>Please do a few sidesteps</div> }
        { isTracking && showInstructions && <div className={styles.overlay}>Start scanning QR-Codes</div> }
    </Container> : <div></div> }</span>;

export default  compose(
  withViewar(),
  withState('showInstructions', 'setShowInstructions', false),
  withState('showQRMessage', 'setShowQRMessage', false),
  withState('isTracking', 'setIsTracking', false),
  withState('initialized', 'setInitialized', false),
  defaultProps({
    initializationStatusChanged: () => {},
    onNewQR: () => {}
  }),
  withProps(({ viewar }) => ({
    tracker: Object.values(viewar.trackers)[0],
    targetModel: viewar.modelManager.findModelByForeignKey('target')
  })),
  withHandlers({
    toggleRoutes: ({ setShowRoutes, showRoutes }) => () => setShowRoutes(!showRoutes),
    handleTracking: ({
       viewar,
       targetModel,
       setIsTracking,
       setShowInstructions,
       setInitialized,
       initialized,
       initializationStatusChanged,
       onScan
    }) => async ({ tracking, targetName }) => {

      // for mock
      if(tracking && targetName === 'VCard01') {
        setInitialized(true);
        initializationStatusChanged(true);
        setIsTracking(true);
        return;
      }

      if (targetName.includes('planeTarget')) {
        setIsTracking(tracking);
        setInitialized(false);
        initializationStatusChanged(true);
        if (tracking) {
          setShowInstructions(true);
          setTimeout(() => setShowInstructions(false), 3000);

          interval = setInterval(async() => {
            //TODO check for new QRcode;
            const QRCodes = await viewar.coreInterface.call('customTrackingCommand', 'ARKit', 'getLearnedTargets', '');
            const scannedQRCodes = QRCodes.filter(QRCode => {
              const { x, y, z } = QRCode.pose.position;
              return x !== 0 && y !== 0 && z !== 0;
            })
            onScan(scannedQRCodes);
          }, 5000);

        }
      }
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { viewar, tracker, handleTracking } = this.props;

      await viewar.sceneManager.clearScene();

      await viewar.cameras.augmentedRealityCamera.activate();
      await tracker.reset();
      tracker.on('trackingStatusChanged', handleTracking);
    },
    async componentWillUnmount() {
      const { tracker, handleTracking } = this.props;

      tracker && tracker.off('trackingStatusChanged', handleTracking);
      clearInterval(interval);
    },
  }),
  pure,
)(TrackingSystemQRLearn);