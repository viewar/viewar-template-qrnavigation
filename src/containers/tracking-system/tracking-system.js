import React from 'react';
import {compose, withProps, withHandlers, pure, lifecycle, withState, defaultProps} from 'recompose';

import { withViewar } from '../../lib/viewar-react';

import { Container } from "../../components/FullScreenContainer";

import styles from './styles.css';


//HELPER FUNCTIONS//


const concatObjValues = (obj) => Object.values(obj).join('');

const isObjectInArr = (objArr, obj) => {
  const concatenated = concatObjValues(obj);
  return objArr.map(concatObjValues).find(str => str === concatenated);
};

const getUniqueTargetsByPosition = (targets) => {
  return targets.filter(target => target.pose)
    .reduce((acc, target) => {
      const positions = acc.map(({ pose }) => pose.position);
      if( isObjectInArr(positions, target.pose.position) ) {
        return acc;
      }
      else {
        acc.push(target);
        return acc;
      }
    }, []);
};


///////////////

const TrackingSystem = ({ isTracking, showQRMessage, initialized }) =>
    <span>{ !initialized ? <Container>
        { !isTracking && <div className={styles.overlay}> Please do a few sidesteps </div> }
        { showQRMessage && <div className={styles.overlay}> Please film a registered QR-Code </div> }
    </Container> : <div></div> }</span>

export default  compose(
  withViewar(),
  withState('showQRMessage', 'setShowQRMessage', false),
  withState('isTracking', 'setIsTracking', false),
  withState('initialized', 'setInitialized', false),
  defaultProps({
    initializationStatusChanged: () => {}
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
       setShowQRMessage,
       setInitialized,
       initialized,
       initializationStatusChanged
    }) => async ({ tracking, targetName }) => {

      // for mock
      if(tracking && targetName === 'VCard01') {
        setInitialized(true);
        initializationStatusChanged(true);
        setIsTracking(true);
        setShowQRMessage(false);
        return;
      }

      if (targetName.includes('planeTarget')) {
        setIsTracking(tracking);
        setInitialized(false);
        initializationStatusChanged(false);
        if (tracking) setShowQRMessage(true);
      }

      if (tracking && !initialized && !targetName.includes('planeTarget')) {
        setShowQRMessage(false);
        setInitialized(true);
        initializationStatusChanged(true);

        const targets = getUniqueTargetsByPosition(viewar.appConfig.trackerList[0].targets);

        return Promise.all(targets.map(({ pose }) => viewar.sceneManager.insertModel(targetModel, { pose }) ));
      }
    }
  }),
  lifecycle({
    async componentDidMount() {
      const { viewar, tracker, handleTracking } = this.props;

      await viewar.cameras.augmentedRealityCamera.activate();

      await tracker.activate();
      tracker.on('trackingStatusChanged', handleTracking);

      setTimeout(() => {
        const model = viewar.modelManager.findModelByForeignKey('ball');
        return viewar.sceneManager.insertModel(model, { pose: { position: { x: 0, y: 0, z: 0 }} } );
      }, 0);
    },
    async componentWillUnmount() {

      const { tracker, handleTracking } = this.props;

      await tracker.deactivate();

      tracker && tracker.off('trackingStatusChanged', handleTracking);
    },
  }),
  pure,
)(TrackingSystem);