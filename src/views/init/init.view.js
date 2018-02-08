import React from 'react';
import { compose, withProps, pure, lifecycle } from 'recompose';
import { withRouter } from 'react-router-dom';
import { setupStream } from '../../services/websocket/stream-manager';

import { withViewar } from '../../lib/viewar-react';
import { Container } from "../../components/FullScreenContainer";

const InitView = ({  }) => <Container backgroundColor='#333333' center >Loading...</Container>;

export default compose(
  withViewar(),
  withRouter,
  withProps(({ viewar }) => ({
    serverChannel: viewar.appConfig.uiConfig.serverChannel || 'com.viewar.qrnavigation',
    role: viewar.appConfig.uiConfig.isAdmin ? 'Admin' : 'Client',
  })),
  lifecycle({
    async componentDidMount() {
      const { viewar, history, role, serverChannel } = this.props;
      const { sceneManager, modelManager, socketConnection } = viewar;

      socketConnection.connect({ host: 'ws://3.viewar.com:3001' });
      socketConnection.socket.on('connect', async () => {
        setupStream(socketConnection, viewar);

        try{
          await socketConnection.joinSession({ prefix: 'dev', id: serverChannel, role });
          history.push('/home');
        }catch(e) {
          console.error(e);
        }
      });

      await viewar.sceneManager.clearScene();

      setTimeout(() => {
        const model = modelManager.findModelByForeignKey('ball');
        return sceneManager.insertModel(model, { pose: { position: { x: 0, y: 0, z: 0 }} } );
      }, 0);

      socketConnection.socket.on('connect_error', () => {
        alert('Socket Connection Error!');
      });

    }
  }),
  pure,
)(InitView);