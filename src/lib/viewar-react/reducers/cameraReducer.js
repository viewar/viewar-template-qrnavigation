import { fromJS } from 'immutable';
import { SET_GROUND_CONFIRMED, SET_CAMERA_TYPE } from '../constants/actionTypes';

const initialState = fromJS(
  {
    groundConfirmed: false,
    camera: 'perspectiveCamera',
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUND_CONFIRMED:
      return state.set('groundConfirmed', action.bool);
    case SET_CAMERA_TYPE:
      return state.set('camera', action.camera);
    default:
      return state;
  }
};
