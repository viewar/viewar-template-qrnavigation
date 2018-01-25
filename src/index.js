import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import viewarApi from 'viewar-api'
import { ViewarProvider, viewarReducers, getThunkMiddleware } from './lib/viewar-react';

import Main from './containers/main/main';

import AnnotationService from './services/annotation.service';
import SocketConnection from './services/websocket/socket-connection';

import './index.css';
import './spinner.css';

const appId = 'com.accenture.navigation';
const version = 1.0;


injectTapEventPlugin();


;(async function () {

  // initialize the ViewAR API
  const api = await viewarApi.init({appId, version, logToScreen: true});
  const viewarThunkMiddleware = getThunkMiddleware(api);

  // apply viewar thunk middleware
  const middlewares = [viewarThunkMiddleware]; // ADD YOUR MIDDLEWARES HERE
  const enhancers = [applyMiddleware(...middlewares)];


  api.sceneManager.clearScene();

  const annotationService = new AnnotationService();
  annotationService.init({ viewarApi: api });


  const socketConnection = SocketConnection();
  Object.assign(api, { annotationService, socketConnection });

  // create store with the viewar thunk middleware
  const store = createStore(viewarReducers(), composeWithDevTools(...enhancers));


  const render = Component => {
    ReactDOM.render(
      <AppContainer>
        <ViewarProvider viewar={api}>
          <Provider store={store}>
            <Component />
          </Provider>
        </ViewarProvider>
      </AppContainer>,
      document.getElementById('app')
    );
  };

  render(Main);

  if (module.hot) {
    module.hot.accept('./containers/main/main', () => {
      render(Main);
    });
  }
}())
