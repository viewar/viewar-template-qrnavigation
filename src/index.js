import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import viewarApi from 'viewar-api';


import { ViewarProvider, viewarReducers, getThunkMiddleware } from './lib/viewar-react';

import Main from './containers/main/main';

import SocketConnection from './services/websocket/socket-connection';
import { createStorageService } from "./services/storage";

import './index.css';
import './spinner.css';

const appId = 'com.viewar.qrnavigation.dev';
const version = 1.0;


injectTapEventPlugin();


;(async function () {

  // initialize the ViewAR API
  const api = await viewarApi.init({appId, version, logToScreen: true});
  window.api = api;

  api.storage.cloud.storageKey = appId;

  // apply viewar thunk middleware
  const enhancers = [];


  const socketConnection = SocketConnection();
  const storageService = createStorageService(api);
  Object.assign(api, { socketConnection, storageService });

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
