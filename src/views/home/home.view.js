import React from 'react';
import {compose, withProps, withHandlers, pure, lifecycle, withState} from 'recompose';
import { withRouter } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import Button from '../../components/Button';

import { viewarConnect } from '../../lib/viewar-react';

import Routes from '../../views/routes/routes.view';
import CreateNewRoute from '../../views/new/new.view';

import styles from './styles.css';

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

const HomeView = ({ handleNewClick, handleShowClick, isTracking, setShowRoutes, showQRMessage, initialized, showRoutes, showCreateNewRoute, setShowCreateNewRoute }) =>
  <Container>
    { !isTracking && <Overlay> Please do a few sidesteps </Overlay> }
    { showQRMessage && <Overlay> Please film the QR-Code </Overlay> }
    { initialized && <div>
      { !showRoutes && !showCreateNewRoute && <Button onClick={handleNewClick}>Create new route</Button> }
      { !showRoutes && !showCreateNewRoute && <Button onClick={handleShowClick}>Show routes</Button> }
      { showRoutes && !showCreateNewRoute && <Routes onBack={() => setShowRoutes(false)} /> }
      { showCreateNewRoute && <CreateNewRoute onBack={() => setShowCreateNewRoute(false)} /> }
    </div>
    }

  </Container>

export default compose(
  viewarConnect(),
  withRouter,
  withState('showQRMessage', 'setShowQRMessage', false),
  withState('isTracking', 'setIsTracking', false),
  withState('initialized', 'setInitialized', false),
  withState('showRoutes', 'setShowRoutes', false),
  withState('showCreateNewRoute', 'setShowCreateNewRoute', false),
  withProps(({ viewar }) => ({



    tracker: Object.values(viewar.trackers)[0],
    mySessionId: Math.random().toString(36).substring(7),
    ballModel: viewar.modelManager.findModelByForeignKey('ball'),
    activeCamera: viewar.cameras.perspectiveCamera.active ? viewar.cameras.perspectiveCamera : viewar.cameras.augmentedRealityCamera,
    targetModel: viewar.modelManager.findModelByForeignKey('target')
  })),
  withHandlers({
    handleNewClick: ({ setShowCreateNewRoute }) => () => setShowCreateNewRoute(true),
    handleShowClick: ({ setShowRoutes }) => () => setShowRoutes(true),
    handleTracking: ({ viewar, tracker, targetModel, setIsTracking, setShowQRMessage, setInitialized, initialized }) => async ({ tracking, targetName }) => {
      if (targetName.includes('planeTarget')) {
        setIsTracking(tracking);
        setInitialized(false);
        if (tracking) setShowQRMessage(true);
      }
      if (tracking && !initialized && !targetName.includes('planeTarget')) {
        setShowQRMessage(false);
        setInitialized(true);

        const targets = getUniqueTargetsByPosition(viewar.appConfig.trackerList[0].targets);

        console.log(targets, targetName)

        return Promise.all(targets.map(({ pose }) => viewar.sceneManager.insertModel(targetModel, { pose }) ));
      }
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { viewar, tracker, handleTracking } = this.props;

      await viewar.cameras.augmentedRealityCamera.activate();

      await tracker.activate();
      tracker.on('trackingStatusChanged', handleTracking);
    },
    async componentWillUnmount() {
      const { tracker, handleTracking } = this.props;

      tracker && tracker.off('trackingStatusChanged', handleTracking);
    },
  }),
  pure,
)(HomeView);