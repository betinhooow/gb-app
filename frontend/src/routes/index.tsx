import React from 'react';
import { Switch } from 'react-router-dom';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Route from './Route';
import ForgotPassword from '../pages/ForgotPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/home" component={Home} isPrivate />
    <Route path="/forgot-password" component={ForgotPassword} />
  </Switch>
);

export default Routes;
