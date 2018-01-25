import { fromJS } from 'immutable';
import { SET_LOADING_STATE, SET_ERROR, SET_LOADING_DESCRIPTION, SET_PROGRESS } from '../constants/actionTypes';

const initialState = fromJS(
  {
    loading: false,
    loadingText: '',
    progress: 0.1,
    error: null,
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_STATE:
      return state.set('loading', action.loading);
    case SET_LOADING_DESCRIPTION:
      return state.set('loadingText', action.text);
    case SET_PROGRESS:
      return state.set('progress', action.progress);
    case SET_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
};
