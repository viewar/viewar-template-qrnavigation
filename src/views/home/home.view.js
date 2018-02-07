import React from 'react';
import {compose, withProps, withHandlers, pure, lifecycle, withState} from 'recompose';
import { withRouter } from 'react-router-dom';

import styles from './styles.css';

import { viewarConnect } from '../../lib/viewar-react';
import { Button } from "../../components/Button";

import { Container } from "../../components/FullScreenContainer";


const HomeView = ({ isAdmin, handleStartClick, handleAdminClick }) =>
  <Container backgroundColor='#333333'>
    <Container center>
      <div className={styles.heading}>QR-Navigation</div>
    </Container>
    { isAdmin && <Button upperRight onClick={handleAdminClick}>Admin</Button> }
    <Button bottomLeft big onClick={handleStartClick}>Start</Button>
  </Container>

export default compose(
  viewarConnect(),
  withRouter,
  withProps(({ viewar }) => ({
    isAdmin: viewar.appConfig.uiConfig.isAdmin,
  })),
  withHandlers({
    handleStartClick: ({ history }) => () => history.push('/main'),
    handleAdminClick: ({ history }) => () => history.push('/admin'),
  }),
  pure,
)(HomeView);