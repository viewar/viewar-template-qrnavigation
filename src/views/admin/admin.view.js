import React from 'react';
import {compose, withProps, withHandlers, pure, lifecycle, withState} from 'recompose';
import { withRouter } from 'react-router-dom';
import Button from '../../components/Button';
import { Container } from "../../components/FullScreenContainer";

import { viewarConnect } from '../../lib/viewar-react';

import Routes from '../../views/routes/routes.view';
import TrackingSystem from '../../containers/tracking-system/tracking-system';
import CreateNewRoute from '../../views/new/new.view';

import styles from './styles.css';
import { removeInstancesByForeignKey } from "../new/new.view";

const AdminView = ({ handleBack, handleCreateNewRouteBack, setActiveRoute, activeRoute, handleNewClick, toggleRoutes, initialized, setInitialized, showRoutes, isAdmin, history, showCreateNewRoute, setShowCreateNewRoute }) =>
<Container>
  <TrackingSystem initializationStatusChanged={setInitialized} />
  { initialized && <div><div className={styles.upperLeftBar}>
    { !showCreateNewRoute && <Button onClick={handleBack}>Back</Button> }
    { !showCreateNewRoute && <Button onClick={toggleRoutes}>{ showRoutes ? 'Hide Routes' : 'Show routes' }</Button> }
  </div>
    { showRoutes && !showCreateNewRoute && <Routes activeRouteChanged={setActiveRoute} activeRoute={activeRoute} showEditOptions={isAdmin} /> }
    <div className={styles.bottomRightBar}>
    { !showCreateNewRoute && <Button onClick={() => {}}>Learn QR Codes</Button> }
    { !showCreateNewRoute && <Button onClick={() => setShowCreateNewRoute(true)}>New Route</Button> }
    </div>
    { showCreateNewRoute && <CreateNewRoute onBack={handleCreateNewRouteBack} /> }
  </div>
  }
</Container>

export default compose(
  viewarConnect(),
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