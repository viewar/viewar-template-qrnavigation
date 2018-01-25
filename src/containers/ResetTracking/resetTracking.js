import React from 'react';
import { compose, renderNothing, branch, pure } from 'recompose';
import { connect } from 'react-redux';

import { resetTracking } from '../../lib/viewar-react';
import Button from '../../components/Button';

const ResetTracking = ({ resetTracking }) =>
  <Button onClick={resetTracking}>Reset</Button>;

export default compose(
  connect(
    state => ({
      camera: state.viewar_camera.get('camera'),
      groundConfirmed: state.viewar_camera.get('groundConfirmed'),
    }),
    dispatch => ({
      resetTracking: () => dispatch(resetTracking()),
    }),
  ),
  branch(
    ({ groundConfirmed, camera }) => camera === 'perspectiveCamera' || (!groundConfirmed && camera !== 'perspectiveCamera'),
    renderNothing,
  ),
  pure,
)(ResetTracking);
