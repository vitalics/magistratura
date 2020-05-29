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
import ProfileInfo from './containers/profile';
import Home from './containers/home';

import * as ROUTES from './routes';
import { useAuth } from './hooks/auth';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { getItem } from './utils/localstorage';
import { dark, } from '@material-ui/core/styles/createPalette';
import { useTranslation } from 'react-i18next';

const lightTheme = createMuiTheme();
const darkTheme = createMuiTheme({
  palette: {
    ...dark
  }
});

export default React.memo(() => {
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const [themeType, setThemeType] = React.useState<'dark' | 'light'>('light')

  React.useEffect(() => {
    const lang = getItem('i18nextLng');

    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  React.useEffect(() => {
    const theme = getItem<'dark' | 'light'>('theme');
    setThemeType(theme || 'light');

  }, [setThemeType]);

  return (
    <MuiThemeProvider theme={themeType === 'dark' ? darkTheme : lightTheme}>
      <div className="App">
        <Router>
          <Switch>
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            {user ? <Route path={ROUTES.HOME} render={props => <Home onThemeChanged={type => setThemeType(type)} />} /> :
              <Redirect to={ROUTES.SIGN_IN} />}
            {user ? <Route path={ROUTES.PROFILE} render={props => <ProfileInfo onThemeChanged={newTheme => setThemeType(newTheme)} />} /> :
              <Redirect to={ROUTES.SIGN_IN} />}
            }
            {user ? <Route path={ROUTES.MAIN} render={props => <Home onThemeChanged={type => setThemeType(type)} />} /> :
              <Redirect to={ROUTES.SIGN_IN} />}
            }
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );
});
