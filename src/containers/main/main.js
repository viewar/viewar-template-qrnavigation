import React from 'react';

import {
  Route,
  MemoryRouter as Router
} from 'react-router-dom';

import { compose } from 'recompose';
import { connect } from 'react-redux';

import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

import InitView from '../../views/init/init.view';
import HomeView from '../../views/home/home.view';
import MainView from '../../views/main/main.view';
import AdminView from '../../views/admin/admin.view';

import { Container } from '../../components/FullScreenContainer';

const Main = ({ loading, loadingText }) =>
  <Router>
    <Container>
      <LoadingScreen show={loading} text={loadingText} />
      <Route exact path="/" component={InitView} />
      <Route exact path="/home" component={HomeView} />
      <Route exact path="/main" component={MainView} />
      <Route exact path="/admin" component={AdminView} />
    </Container>
  </Router>;

export default compose(
  connect(
    ({ viewar_general }) => ({
      loading: viewar_general.get('loading'),
      loadingText: viewar_general.get('loadingText'),
    }),
    null,
  ),
)(Main);
