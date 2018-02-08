import React from 'react';
import {compose, withProps, withHandlers, pure, lifecycle, withState} from 'recompose';
import { withRouter } from 'react-router-dom';
import Button from '../../components/Button';
import { Container } from "../../components/FullScreenContainer";

import { withViewar } from '../../lib/viewar-react';

import Routes from '../../views/routes/routes.view';
import TrackingSystem from '../../containers/tracking-system/tracking-system';
import CreateNewRoute from '../../views/new/new.view';

import styles from './styles.css';
import { removeInstancesByForeignKey } from "../new/new.view";

const AdminView = ({ handleLearnClick, handleBack, handleCreateNewRouteBack, setActiveRoute, activeRoute, handleNewClick, toggleRoutes, initialized, setInitialized, showRoutes, isAdmin, history, showCreateNewRoute, setShowCreateNewRoute }) =>
<Container>
  <TrackingSystem initializationStatusChanged={setInitialized} />
  <div className={styles.upperLeftBar}>
    { !showCreateNewRoute && <Button onClick={handleBack}>Back</Button> }
    { initialized && !showCreateNewRoute && <Button onClick={toggleRoutes}>{ showRoutes ? 'Hide Routes' : 'Show routes' }</Button> }
  </div>
    { initialized && showRoutes && !showCreateNewRoute && <Routes activeRouteChanged={setActiveRoute} activeRoute={activeRoute} showEditOptions={isAdmin} /> }
    <div className={styles.bottomRightBar}>
    { initialized && !showCreateNewRoute && <Button onClick={() => setShowCreateNewRoute(true)}>New Route</Button> }
    { !showCreateNewRoute && <Button onClick={handleLearnClick}>Learn QR Codes</Button> }
    </div>
    { initialized && showCreateNewRoute && <CreateNewRoute onBack={handleCreateNewRouteBack} /> }
  }
</Container>

export default compose(
  withViewar(),
  withRouter,
  withProps(({ viewar }) => ({
    isAdmin: viewar.appConfig.uiConfig.isAdmin,
  })),
  withState('activeRoute', 'setActiveRoute', null),
  withState('initialized', 'setInitialized', false),
  withState('showCreateNewRoute', 'setShowCreateNewRoute', false),
  withState('showRoutes', 'setShowRoutes', false),
  withHandlers({
    removeInstancesByForeignKey,
  }),
  withHandlers({
    handleLearnClick: ({ history, removeInstancesByForeignKey }) => () => {
      removeInstancesByForeignKey('ball');
      history.push('/learn');
    },
    handleBack: ({ history, removeInstancesByForeignKey }) => () => {
      removeInstancesByForeignKey('ball');
      history.push('/home');
    },
    handleCreateNewRouteBack: ({ setShowCreateNewRoute, setActiveRoute }) => (newRoute) => {
      setShowCreateNewRoute(false);
      setActiveRoute(newRoute);
    },
    toggleRoutes: ({ setShowRoutes, showRoutes }) => () => setShowRoutes(!showRoutes),
  }),
  pure,
)(AdminView);