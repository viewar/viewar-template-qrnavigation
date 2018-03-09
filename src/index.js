import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import viewarApi from 'viewar-api';

import Main from './containers/main/main';

import SocketConnection from './services/websocket/socket-connection';
import { createStorageService } from "./services/storage";

import './index.css';

const appId = 'com.viewar.qrnavigation.dev';
const version = 1.0;


injectTapEventPlugin();


;(async function () {

  // initialize the ViewAR API
  const api = await viewarApi.init({appId, version, logToScreen: true});
  window.api = api;

  api.storage.cloud.storageKey = appId;


  const socketConnection = SocketConnection();
  const storageService = createStorageService(api);
  Object.assign(api, { socketConnection, storageService });

  const render = Component => {
    ReactDOM.render(
      <AppContainer>
        <Component />
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
