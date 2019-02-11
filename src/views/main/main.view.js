import React from 'react';
import { compose, withHandlers, pure, withState, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import viewar from 'viewar-api';

import { Button } from '../../components/Button';

import Routes from '../../containers/routes/routes';
import TrackingSystem from '../../containers/tracking-system/tracking-system';
import { Container } from '../../components/FullScreenContainer';
import { removeInstancesByForeignKey } from '../new/new.view';

import styles from './styles.css';

const MainView = ({
  handleBack,
  setActiveRoute,
  activeRoute,
  toggleRoutes,
  initialized,
  setInitialized,
  showRoutes,
}) => (
  <Container>
    <TrackingSystem initializationStatusChanged={setInitialized} />
    <div className={styles.upperLeftBar}>
      <Button onClick={handleBack} className={styles.button}>
        Back
      </Button>
      {initialized && (
        <Button onClick={toggleRoutes} className={styles.button}>
          {showRoutes ? 'Hide Routes' : 'Show routes'}
        </Button>
      )}
    </div>
    {initialized && (
      <Routes
        activeRouteChanged={setActiveRoute}
        activeRoute={activeRoute}
        showEditOptions={false}
        visible={showRoutes}
      />
    )}
  </Container>
);

export default compose(
  withRouter,
  withProps({ viewar }),
  withState('activeRoute', 'setActiveRoute', null),
  withState('initialized', 'setInitialized', false),
  withState('showRoutes', 'setShowRoutes', false),
  withHandlers({
    removeInstancesByForeignKey,
  }),
  withHandlers({
    handleBack: ({ history, removeInstancesByForeignKey }) => () => {
      removeInstancesByForeignKey('ball');
      history.push('/home');
    },
    toggleRoutes: ({ setShowRoutes, showRoutes }) => () =>
      setShowRoutes(!showRoutes),
  }),
  pure
)(MainView);
