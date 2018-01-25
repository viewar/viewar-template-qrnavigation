import React from 'react';
import { compose, withState, branch, renderNothing, pure } from 'recompose';
import { connect } from 'react-redux';
import { insertModel } from '../../lib/viewar-react/index';

import Input from '../../components/Input/index';
import Button from '../../components/Button/index';


const LoadModelForm = ({ modelId, setModelId, insertModel }) =>
  <div>
    <Input value={modelId} type="text" onChange={({ target }) => setModelId(target.value)} />
    <Button onClick={() => insertModel(modelId)}>Insert Model</Button>
  </div>;

export default compose(
  withState('modelId', 'setModelId', '36651'),
  connect(
    state => ({
      camera: state.viewar_camera.get('camera'),
    }),
    dispatch => ({ insertModel: modelId => dispatch(insertModel({ modelId }))  }),
  ),
  branch(
    ({ camera }) => camera !== 'perspectiveCamera',
    renderNothing,
  ),
  pure,
)(LoadModelForm);
