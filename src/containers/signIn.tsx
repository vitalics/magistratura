import React from 'react';
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


import { signInWithEmailAndPassword } from '../firebase';

import * as ROUTES from '../routes';
import { useAuth } from '../hooks/auth';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  provider: {
    width: '100%',
  },
}));



export default React.memo(() => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const { user } = useAuth();
  const { t } = useTranslation();
  const history = useHistory();

  React.useEffect(() => {
    if (user) {
      history.push(ROUTES.HOME);
    }
  });

  const handleSignIn = React.useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // prevent form 
    e.preventDefault();

    setError('');

    try {
      await signInWithEmailAndPassword(email, password);
      history.push(ROUTES.MAIN);
    } catch (e) {
      setError(e.message);
    }
  }, [email, password, history]);

  const handleEmail = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('SignIn.Header')}
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label={t('Email')}
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('Password')}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignIn}
            >
              {t('SignIn.Action')}
            </Button>

            {error &&
              <Alert severity="error">{error}</Alert>
            }
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t('Forgot password')}?
              </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {t('Dont have an account')}? {t('Sign Up')}
                </Link>
              </Grid>

            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
});
