import { fromJS } from 'immutable';
import { SET_SCENE_STATE, ADD_MODEL, SET_POSE, SET_CAMERA_TYPE } from '../constants/actionTypes';

const initialState = fromJS(
  {
    sceneState: { children: [] },
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCENE_STATE:
      return state.set('sceneState', fromJS(action.sceneState));
    case ADD_MODEL:
      return state.set('sceneState', state.get('sceneState').set('children', fromJS([action.model, ...state.get('sceneState').toJS().children])));
    case SET_POSE:
      const index = state.get('sceneState').toJS().children.findIndex(c => c.id === action.id);
      return state.set('sceneState', state.get('sceneState').setIn(['children', index, 'pose' ], action.pose));
    default:
      return state;
  }
};
