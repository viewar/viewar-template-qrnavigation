import React from 'react';

import { Route, MemoryRouter as Router } from 'react-router-dom';

import InitView from '../../views/init/init.view';
import HomeView from '../../views/home/home.view';
import MainView from '../../views/main/main.view';
import AdminView from '../../views/admin/admin.view';
import LearnView from '../../views/learn/learn.view';

import { Container } from '../../components/FullScreenContainer';

const Main = () => (
  <Router>
    <Container>
      <Route exact path="/" component={InitView} />
      <Route exact path="/home" component={HomeView} />
      <Route exact path="/main" component={MainView} />
      <Route exact path="/admin" component={AdminView} />
      <Route exact path="/learn" component={LearnView} />
    </Container>
  </Router>
);

export default Main;
