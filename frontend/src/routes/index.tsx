import React from 'react';
import { Switch } from 'react-router-dom';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/home" component={Home} isPrivate />
  </Switch>
);

export default Routes;
