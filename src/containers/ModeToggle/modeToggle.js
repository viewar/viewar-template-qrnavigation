import React from 'react';
import { compose, pure } from 'recompose';
import { connect } from 'react-redux';

import { setCamera } from '../../lib/viewar-react';
import Button from '../../components/Button';

const ModeToggle = ({ setCamera, camera }) =>
    <Button onClick={() => setCamera(camera === 'perspectiveCamera' ? 'augmentedRealityCamera' : 'perspectiveCamera')}>{camera === 'perspectiveCamera' ? 'AR' : 'VR' }</Button>;

export default compose(
  connect(
    state => ({
      camera: state.viewar_camera.get('camera'),
    }),
    dispatch => ({
      setCamera: camera => dispatch(setCamera({ camera })),
    }),
  ),
  pure,
)(ModeToggle);
