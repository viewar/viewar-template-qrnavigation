import React from 'react';
import { compose, withProps, withHandlers, pure, lifecycle } from 'recompose';
import { withRouter } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import Button from '../../components/Button';

import { viewarConnect } from '../../lib/viewar-react';

import background from '../../../assets/Header_Start_KEBA2.jpg';

import styles from './styles.css';

const slideFromBottom = keyframes`
  0% {
    transform: translateY(130%);
  }
  70% {
    transform: translateY(130%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
}
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const HomeView = ({ handleNewClick, handleRoutesClick, handleNewLiveClick }) =>
  <Container>
    <Button onClick={handleNewClick}>Create new route</Button>
    <Button onClick={handleRoutesClick}>Show routes</Button>
  </Container>

export default compose(
  viewarConnect(),
  withRouter,
  withHandlers({
    handleNewClick: ({ history }) => () => history.push(`/new`),
    handleNewLiveClick: ({ history }) => () => history.push(`/new`),
    handleRoutesClick: ({ history }) => () => history.push(`/routes`),
  }),
  pure,
)(HomeView);