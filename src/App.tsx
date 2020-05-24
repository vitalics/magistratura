import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import '@fortawesome/fontawesome-free';

import SignIn from './containers/signIn';
import SignUp from './containers/signUp';
import AuthRoute from './components/authRoute'
import ProfileInfo from './containers/profile';
import Home from './containers/home';

import * as ROUTES from './routes';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);
  const UserRoute = AuthRoute(user);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <UserRoute exact path={ROUTES.HOME} component={Home} />
          <UserRoute exact path={ROUTES.PROFILE} component={ProfileInfo} />
          {user ? <UserRoute path={ROUTES.MAIN} component={Home} /> : <Redirect to={ROUTES.SIGN_IN} />}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
