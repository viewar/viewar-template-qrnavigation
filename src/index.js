import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import viewarApi from 'viewar-api';

import Main from './containers/main/main';

import SocketConnection from './services/websocket/socket-connection';
import { createStorageService } from './services/storage';

import './index.css';

injectTapEventPlugin();

(async function() {
  // initialize the ViewAR API
  const api = await viewarApi.init();
  window.api = api;

  // api.storage.cloud.storageKey = appId;

  const socketConnection = SocketConnection();
  const storageService = createStorageService(api);
  Object.assign(api, { socketConnection, storageService });

  const rootElement = document.getElementById('app');

  const render = Component => {
    ReactDOM.render(<Component />, rootElement);
  };

  render(Main);

  if (module.hot) {
    module.hot.accept(Main, () => {
      render(Main);
    });
  }
})();
