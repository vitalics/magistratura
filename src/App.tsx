import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import CapacityTable from './components/capacitytable';
import SignIn from './containers/signIn';
import { getCurrentUser } from './services/auth';
import SignUp from './containers/signUp';
import AuthRoute from './components/authRoute'

function App() {
  const UserRoute = AuthRoute(getCurrentUser());
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <UserRoute exact path='/home' component={CapacityTable} />
          {/* <Route path="/" >
            <Redirect to={'/home'} />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
