import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { asyncReactor } from 'async-reactor';

import { insertModel } from '../../actions/index';

const Model = () => null;

export default compose(
  connect(
    null,
    dispatch => ({
      insertModel: props => dispatch(insertModel(props)),
    }),
  ),
  lifecycle({
    async componentWillMount() {
      const { parent, modelId, insertModel } = this.props;
      const modelInstance = await insertModel({ modelId, insertionParams: { parent } });
    },
  }),
)(Model);
