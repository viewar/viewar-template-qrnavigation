import React from 'react';
import { branch, pure, compose, renderNothing } from 'recompose';
import styled from 'styled-components';

import { Container } from '../FullScreenContainer';

const Text = styled.div`
  position: absolute;
  top: 0;
  color: #00ffdf;
  letter-spacing: 0.45rem;
  padding: 60px;
  text-transform: uppercase;
`;

const LoadingScreen = ({ text }) => <Container><Text>{text}</Text></Container>;

export default compose(
  branch(
    ({ show }) => !show,
    renderNothing,
  ),
  pure,
)(LoadingScreen);