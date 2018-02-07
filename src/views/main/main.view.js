import React from 'react';
import {compose, withHandlers, pure, withState} from 'recompose';
import { withRouter } from 'react-router-dom';
import { Button } from '../../components/Button';

import { viewarConnect } from '../../lib/viewar-react';

import Routes from '../../views/routes/routes.view';
import TrackingSystem from '../../containers/tracking-system/tracking-system';
import { Container } from "../../components/FullScreenContainer";
import { removeInstancesByForeignKey } from "../new/new.view";

import styles from './styles.css';

const MainView = ({ handleBack, setActiveRoute, activeRoute, handleNewClick, toggleRoutes, initialized, setInitialized, showRoutes }) =>
  <Container>
    <TrackingSystem initializationStatusChanged={setInitialized} />
    { initialized && <div><div className={styles.upperLeftBar}>
      <Button onClick={handleBack}>Back</Button>
      <Button onClick={toggleRoutes}>{ showRoutes ? 'Hide Routes' : 'Show routes' }</Button>
    </div>
      { showRoutes && <Routes activeRouteChanged={setActiveRoute} activeRoute={activeRoute} showEditOptions={false} /> }
      </div>
    }
  </Container>

export default compose(
  viewarConnect(),
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