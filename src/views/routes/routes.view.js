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

import { removeInstancesByForeignKey } from "../new/new.view";


import { viewarConnect } from '../../lib/viewar-react';

let newLiveRoute$, cancelLiveRoute$, saveLiveRoute$, newLiveRoutePoint$, newSceneState$;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ListItem = styled.div`
  margin: 15px;
  font-size: 22px;
  color: ${props => props.active ? 'red' : 'green' }
`;

const List = styled.div`
  height: calc(100vh - 100px);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`;

const RoutesView = ({ routes, handleRouteSelect, activeRoute, deleteRoutes, handleBack }) =>
  <Container>
    <Button onClick={handleBack}>Back</Button>
    <Button onClick={deleteRoutes}>Delete All</Button>
    <List>
      { Object.entries(routes).filter(([label, { canceled }]) => !canceled).map(([label, route]) => <ListItem key={label + Date.now()} active={activeRoute === label} onClick={() => handleRouteSelect(label)}>{label} {route.live && '[live]'}</ListItem>) }
    </List>
  </Container>

export default compose(
  viewarConnect(),
  withRouter,
  withState('routes', 'setRoutes', {}),
  withState('activeRoute', 'setActiveRoute', null),
  withProps(({ viewar }) => ({
    ballModel: viewar.modelManager.findModelByForeignKey('ball'),
  })),
  withHandlers({
    removeInstancesByForeignKey,
  }),
  withHandlers({
    handleRouteDeselect: ({ routes, removeInstancesByForeignKey, setActiveRoute }) => async () => {

      setActiveRoute(null);
      return removeInstancesByForeignKey('ball');
    },
    deleteRoutes: ({ viewar, setRoutes, setActiveRoute }) => () => {
      if(confirm('are you sure?')) {
        setRoutes({});
        setActiveRoute(null);
        return viewar.storage.cloud.write('/public/routes/index.json', JSON.stringify({}));
      }
    },
  }),
  withHandlers({
    handleBack: ({ handleRouteDeselect, onBack}) => async () => {
      await handleRouteDeselect();
      onBack();
    },
    handleRouteSelect: ({ routes, viewar, setActiveRoute, handleRouteDeselect, activeRoute }) => async (label) => {

      if(label === activeRoute) {
        return handleRouteDeselect();
      }

      setActiveRoute(label);

      if(routes[label].live) {
        viewar.socketConnection.send({ room: routes[label].sender, messageType: 'getSceneState', data: viewar.socketConnection.socket.id });
        return;
      }

      const sceneState = routes[label];
      const result = await viewar.sceneManager.setSceneState(sceneState);
      console.log(result);
    },
    deleteRoutes: ({ viewar, setRoutes, setActiveRoute }) => () => {
      if(confirm('are you sure?')) {
        setRoutes({});
        setActiveRoute(null);
        return viewar.storage.cloud.write('/public/routes/index.json', JSON.stringify({}));
      }
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { viewar, setRoutes, ballModel, setActiveRoute } = this.props;

      const routes = await viewar.storage.cloud.read('/public/routes/index.json')  || {};
      setRoutes(routes);

      newLiveRoute$ = viewar.socketConnection.getData('newLiveRoute').subscribe(( { route, sender } ) => {
        setRoutes({ ...this.props.routes, [route]: { live: true, sender }})
      });

      cancelLiveRoute$ = viewar.socketConnection.getData('cancelLiveRoute').subscribe(async ( { route } ) => {
        setRoutes({ ...this.props.routes, [route]: { canceled: true }})
        if(route === this.props.activeRoute) {
          await viewar.sceneManager.clearScene();
          setActiveRoute(null);
        }
      });

      saveLiveRoute$ = viewar.socketConnection.getData('saveLiveRoute').subscribe(async ({ route }) => {
        const routes = await viewar.storage.cloud.read('/public/routes/index.json') || {};
        setRoutes(routes);
      });

      newLiveRoutePoint$ = viewar.socketConnection.getData('newLiveRoutePoint').subscribe(( { route, pose } ) => {
        if(route === this.props.activeRoute) {
          return viewar.sceneManager.insertModel(ballModel, { pose } );
        }
      });

      newSceneState$ = viewar.socketConnection.getData('newSceneState').subscribe(async (sceneState) => {
        await viewar.sceneManager.setSceneState(sceneState);
      });

    },
    async componentWillUnmount() {
      const { removeInstancesByForeignKey } = this.props;
      await removeInstancesByForeignKey();

      newLiveRoute$ && newLiveRoute$.unsubscribe();
      cancelLiveRoute$ && cancelLiveRoute$.unsubscribe();
      saveLiveRoute$ && saveLiveRoute$.unsubscribe();
      newLiveRoutePoint$ && newLiveRoutePoint$.unsubscribe();
      newSceneState$ && newSceneState$.unsubscribe();

    },
  }),
  pure,
)(RoutesView);