import thunk from 'redux-thunk';

export { viewarConnect } from './viewar-connect';
export { ViewarProvider } from './viewar-provider';
export viewarReducers from './reducers';

export { insertModel, removeInstance, selectMaterial, setCamera, confirmGround, resetTracking } from './actions';

export function getThunkMiddleware(api) {
  return thunk.withExtraArgument({ api });
}
