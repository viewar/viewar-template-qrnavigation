import React from 'react';
import { compose, withState, withProps,withHandlers, pure, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { setupStream } from '../../services/websocket/stream-manager';

import { viewarConnect } from '../../lib/viewar-react';


const InitView = ({ triggerOutro, socketConnect, sessionID, setSessionID, introEndedHandler, goToInit }) =>
  <div>
    LOADING...
  </div>

export default compose(
  viewarConnect(),
  withRouter,
  withProps(({ viewar }) => ({
    role: viewar.appConfig.uiConfig.isAdmin ? 'Admin' : 'Client',
  })),
  lifecycle({
    async componentWillMount() {
      const { viewar, history, role } = this.props;
      const { appUtils, sceneManager, modelManager, socketConnection } = viewar;

      socketConnection.connect({ host: 'ws://3.viewar.com:3001' });
      socketConnection.socket.on('connect', async () => {
        setupStream(socketConnection, viewar);

        try{
          await socketConnection.joinSession({ prefix: 'dev', id: 'com.accenture.navigation' || viewar.appConfig.uiConfig.serverChannel, role });
          const nextPath = role === 'Admin' ? '/admin' : '/home';
          history.push(nextPath);
        }catch(e) {
          alert(e)
        }

      });

      await setTimeout(async () => {
        const model = modelManager.findModelByForeignKey('ball');
        await sceneManager.insertModel(model, { pose: { position: { x: 0, y: 0, z: 0 }} } );
      }, 0);

      socketConnection.socket.on('connect_error', () => {
        alert('Socket Connection Error!');
      });

    }
  }),
  pure,
)(InitView);