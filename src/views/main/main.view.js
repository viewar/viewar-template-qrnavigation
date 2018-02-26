import React from 'react';
import { compose, withHandlers, pure, withState } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Button } from '../../components/Button';

import { withViewar } from '../../lib/viewar-react';

import Routes from '../../containers/routes/routes';
import TrackingSystem from '../../containers/tracking-system/tracking-system';
import { Container } from "../../components/FullScreenContainer";
import { removeInstancesByForeignKey } from "../new/new.view";

import styles from './styles.css';

const MainView = ({ debugMode, handleBack, setActiveRoute, activeRoute, handleNewClick, toggleRoutes, initialized, setInitialized, showRoutes }) =>
  <Container>
    <TrackingSystem initializationStatusChanged={setInitialized} />
    <div className={styles.upperLeftBar}>
      <Button onClick={handleBack}>Back</Button>
      { initialized && <Button onClick={toggleRoutes}>{ showRoutes ? 'Hide Routes' : 'Show routes' }</Button> }
    </div>
      { initialized && showRoutes && <Routes activeRouteChanged={setActiveRoute} activeRoute={activeRoute} showEditOptions={false} /> }
  </Container>

export default compose(
  withViewar(),
  withRouter,
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
    toggleRoutes: ({ setShowRoutes, showRoutes }) => () => setShowRoutes(!showRoutes),
  }),
  pure,
)(MainView);