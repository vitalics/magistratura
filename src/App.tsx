import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import '@fortawesome/fontawesome-free';

import SignIn from './containers/signIn';
import SignUp from './containers/signUp';
import GetAuthRoute from './components/authRoute'
import ProfileInfo from './containers/profile';
import Home from './containers/home';

import * as ROUTES from './routes';
import { useAuth } from './hooks/auth';

export default React.memo(() => {
  const { user } = useAuth();

  const AuthRoute = GetAuthRoute(user)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <AuthRoute path={ROUTES.HOME} component={Home} />
          <AuthRoute path={ROUTES.PROFILE} component={ProfileInfo} />
          <AuthRoute path={ROUTES.MAIN} component={Home} />
        </Switch>
      </Router>
    </div>
  );
});
