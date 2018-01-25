import { SET_PROGRESS, SET_LOADING_DESCRIPTION, SET_LOADING_STATE, SET_ERROR } from '../constants/actionTypes';

export const setLoadingState = loading => ({
  type: SET_LOADING_STATE,
  loading,
});

export const setLoadingProgress = progress => ({
  type: SET_PROGRESS,
  progress,
});

export const setLoadingText = text => ({
  type: SET_LOADING_DESCRIPTION,
  text,
});

export const setError = error => ({
  type: SET_ERROR,
  error,
});
