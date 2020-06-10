import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { dark } from '@material-ui/core/styles/createPalette';

import * as ROUTES from './routes';

import SignIn from './containers/signIn';
import SignUp from './containers/signUp';
import ProfileInfo from './containers/profile';
import Home from './containers/home';
import User from './containers/user';
import Load from './containers/load';

import PrivateRoute from './components/auth/private';
import ProtectedRoute from './components/auth/protected';

import { getItem } from './utils/localstorage';
import { AuthProvider } from './hooks/auth';

const lightTheme = createMuiTheme();
const darkTheme = createMuiTheme({
  palette: {
    ...dark
  }
});

export default React.memo(() => {
  const { i18n } = useTranslation();
  const [themeType, setThemeType] = React.useState<'dark' | 'light'>('light')

  React.useEffect(() => {
    const theme = getItem<'dark' | 'light'>('theme');
    setThemeType(theme || 'light');

    const lang = getItem('i18nextLng');

    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [setThemeType, i18n]);

  return (
    <AuthProvider>
      <MuiThemeProvider theme={themeType === 'dark' ? darkTheme : lightTheme}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
              <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
              <PrivateRoute exact path={ROUTES.PROFILE}>
                <ProfileInfo onThemeChanged={type => setThemeType(type)} />
              </PrivateRoute>
              <ProtectedRoute path={ROUTES.USER} allowed={['Admin', 'Head']}>
                <User />
              </ProtectedRoute>
              <PrivateRoute path={ROUTES.HOME}>
                <Home onThemeChanged={type => setThemeType(type)} />
              </PrivateRoute>
              <PrivateRoute path={ROUTES.LOAD}>
                <Load />
              </PrivateRoute>
              <PrivateRoute exact path={ROUTES.MAIN}>
                <Redirect to={ROUTES.HOME} />
              </PrivateRoute>
              <Route path="*">
                <Redirect to={ROUTES.HOME} />
              </Route>
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    </AuthProvider>
  );
});
