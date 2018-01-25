import React from 'react';
import { compose, lifecycle, withHandlers, setPropTypes, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import { viewarConnect } from '../..';
import { extractMaterials } from '../../../utils';

import { setSelection, setPose, setSelectionPose, insertModel, insertContainer } from '../../actions/index';

const Scene = ({ children, viewar }) => <div>{children}</div>;

const _propTypes = {
  children: (props, propName, componentName) => {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, (child) => {
      if (child.type.displayName !== 'Model' || child.type.displayName !== 'Container') {
        error = new Error(`${componentName} children should be of type Model or Container`);
      }
    });
    return error;
  },
};

export default compose(
  setDisplayName('Scene'),
  setPropTypes(_propTypes),
  viewarConnect(),
  connect(
    state => ({
      sceneState: state.viewar_scene.get('sceneState'),
      selectedMaterials: state.viewar_selection.get('selectedMaterials'),
      selection: state.viewar_selection.get('selection').toJS(),
    }),
    dispatch => ({
      setSelection: selection => dispatch(setSelection(selection)),
      setPose: (id, pose) => dispatch(setPose(id, pose)),
      setSelectionPose: (pose) => dispatch(setSelectionPose(pose)),
      insertModel: props => dispatch(insertModel(props)),
      insertContainer: props => dispatch(insertContainer(props)),
}),
  ),
  withHandlers({
    onSelectionChange: props => selection => {

      if(!selection || !selection.model || selection.id === 'DefaultLayer') return props.setSelection({});

      const materials = extractMaterials(selection);

      const { id, interaction, pose, model: { id: modelId, name }  } = selection;
      props.setSelection({ id, interaction, pose, modelId, name, materials });
    },
    onPoseChange: props => ({ id, pose }) => {
        props.setPose(id, pose);
        if(id === props.selection.id){
          props.setSelectionPose(pose);
        }
    },
  }),
  lifecycle({
    componentWillMount() {
      const { viewar: { sceneManager }, onSelectionChange, onPoseChange } = this.props;
      sceneManager.on('selectionChanged', onSelectionChange);
      sceneManager.on('sceneObjectPoseChanged', onPoseChange);
    },
    componentWillReceiveProps(nextProps){

      // TODO this code is for sycing the state into redux for timetravel but it crashes when inserting new Models


      // const { viewar: { sceneManager } } = this.props;
      //
      // if(nextProps.sceneState !== this.props.sceneState && JSON.stringify(sceneManager.getSceneState()) !== JSON.stringify(nextProps.sceneState)){
      //   sceneManager.setSceneState(nextProps.sceneState);
      // }
    },
  }),
)(Scene);