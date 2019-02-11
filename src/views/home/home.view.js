import React from 'react';
import { compose, withProps, withHandlers, pure } from 'recompose';
import { withRouter } from 'react-router-dom';
import viewar from 'viewar-api';

import styles from './styles.css';

import { Button } from '../../components/Button';

import { Container } from '../../components/FullScreenContainer';

const HomeView = ({ isAdmin, handleStartClick, handleAdminClick }) => (
  <Container className={styles.container}>
    <Container center className={styles.centerContainer}>
      <div className={styles.heading}>QR-Navigation</div>
      <Button big onClick={handleStartClick}>
        Start
      </Button>
    </Container>
    {isAdmin && (
      <Button upperRight onClick={handleAdminClick}>
        Admin
      </Button>
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
  withHandlers({
    handleStartClick: ({ history }) => () => history.push('/main'),
    handleAdminClick: ({ history }) => () => history.push('/admin'),
  }),
  pure
)(HomeView);
