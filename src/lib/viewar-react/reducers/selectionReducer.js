import { fromJS } from 'immutable';
import { SET_SELECTION, SELECT_MATERIAL, SET_SELECTION_POSE } from '../constants/actionTypes';

const initialState = fromJS(
  {
    selection: {},
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTION_POSE:
      return state.set('selection', state.get('selection').mergeDeep({ pose : action.pose }));
    case SET_SELECTION:
      return state.set('selection', fromJS(action.selection));
    case SELECT_MATERIAL:
      return state.set('selectedMaterials', state.get('selectedMaterials').mergeDeep({ [action.materialName] : action.optionKey }));
    default:
      return state;
  }
};
