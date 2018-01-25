import React from 'react';
import { compose, renderNothing, branch, pure } from 'recompose';
import { connect } from 'react-redux';

import { confirmGround } from '../../lib/viewar-react';
import Button from '../../components/Button';

const GroundConfirm = ({ confirmGround }) =>
  <Button onClick={confirmGround}>Confirm Ground</Button>;

export default compose(
  connect(
    state => ({
      camera: state.viewar_camera.get('camera'),
      groundConfirmed: state.viewar_camera.get('groundConfirmed'),
    }),
    dispatch => ({
      confirmGround: () => dispatch(confirmGround()),
    }),
  ),
  branch(
    ({ groundConfirmed, camera }) => camera === 'perspectiveCamera' || (groundConfirmed && camera !== 'perspectiveCamera'),
    renderNothing,
  ),
  pure,
)(GroundConfirm);
