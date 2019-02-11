import React from 'react';
import { compose, withProps, withHandlers, pure, withState } from 'recompose';
import viewar from 'viewar-api';

import { withRouter } from 'react-router-dom';
import Button from '../../components/Button';
import { Container } from '../../components/FullScreenContainer';

import Routes from '../../containers/routes/routes';
import TrackingSystem from '../../containers/tracking-system/tracking-system';
import CreateNewRoute from '../../views/new/new.view';

import styles from './styles.css';
import { removeInstancesByForeignKey } from '../new/new.view';

const AdminView = ({
  handleLearnClick,
  handleBack,
  handleCreateNewRouteBack,
  setActiveRoute,
  activeRoute,
  handleNewClick,
  toggleRoutes,
  initialized,
  setInitialized,
  showRoutes,
  isAdmin,
  history,
  showCreateNewRoute,
  setShowCreateNewRoute,
}) => (
  <Container>
    <TrackingSystem initializationStatusChanged={setInitialized} />
    <div className={styles.upperLeftBar}>
      {!showCreateNewRoute && (
        <Button onClick={handleBack} className={styles.button}>
          Back
        </Button>
      )}
      {initialized && !showCreateNewRoute && (
        <Button onClick={toggleRoutes} className={styles.button}>
          {showRoutes ? 'Hide Routes' : 'Show routes'}
        </Button>
      )}
    </div>
    {initialized && (
      <Routes
        activeRouteChanged={setActiveRoute}
        activeRoute={activeRoute}
        showEditOptions={isAdmin}
        visible={showRoutes && !showCreateNewRoute}
      />
    )}
    <div className={styles.bottomRightBar}>
      {initialized && !showCreateNewRoute && (
        <Button
          onClick={() => setShowCreateNewRoute(true)}
          className={styles.button}
        >
          New Route
        </Button>
      )}
      {!showCreateNewRoute && (
        <Button className={styles.button} onClick={handleLearnClick}>
          Learn QR Codes
        </Button>
      )}
    </div>
    {initialized && showCreateNewRoute && (
      <CreateNewRoute onBack={handleCreateNewRouteBack} />
    )}
  </Container>
);

export default compose(
  withRouter,
  withProps({
    viewar,
  }),
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
    handleCreateNewRouteBack: ({
      setShowCreateNewRoute,
      setActiveRoute,
    }) => newRoute => {
      setShowCreateNewRoute(false);
      setActiveRoute(newRoute);
    },
    toggleRoutes: ({ setShowRoutes, showRoutes }) => () =>
      setShowRoutes(!showRoutes),
  }),
  pure
)(AdminView);
