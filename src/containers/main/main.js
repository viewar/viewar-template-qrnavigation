import React from 'react';

import {
  withRouter,
  Route,
  MemoryRouter as Router
} from 'react-router-dom';


import { compose } from 'recompose';
import { connect } from 'react-redux';

import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

import InitView from '../../views/init/init.view';
import NewView from '../../views/new/new.view';
import RoutesView from '../../views/routes/routes.view';
import HomeView from '../../views/home/home.view';


import { Container } from '../../components/FullScreenContainer';
import Image from '../../components/Image';

import logo from '../../../assets/KEBA_Logo.svg.png';


const Main = ({ loading, loadingText }) =>
  <Router>
    <Container>
      <LoadingScreen show={loading} text={loadingText} />
      <Route exact path="/" component={InitView} />
      <Route exact path="/home" component={HomeView} />
      <Route exact path="/new" component={NewView} />
      <Route exact path="/routes" component={RoutesView} />
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
