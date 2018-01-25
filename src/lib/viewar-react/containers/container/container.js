import React from 'react';
import { compose, withState, withHandlers, lifecycle, pure } from 'recompose';
import { connect } from 'react-redux';
import { asyncReactor } from 'async-reactor';

import { insertContainer } from '../../actions/index';

async function Container({ children, parent, insertContainer }) {
  const containerInstance = await insertContainer({insertionParams: {parent}});

  const addParentPropToChildren = () => {
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        parent: containerInstance,
      });
    });
  };

  const childrenWithProps = addParentPropToChildren();
  return <div>{childrenWithProps}</div>;
}

export default compose(
  connect(
    null,
    dispatch => ({
      insertContainer: props => dispatch(insertContainer(props)),
    }),
  ),
  pure,
)(asyncReactor(Container));