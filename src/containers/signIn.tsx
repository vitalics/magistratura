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
      history.push(ROUTES.HOME);
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
            Sign in
        </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
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
              label="Password"
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
              Sign In
          </Button>

            {error &&
              <Alert severity="error">{error}</Alert>
            }

            {/* <div>
              <Button className={classes.provider} onClick={handleGoogleSignIn}>
                Sign in with google
                  <img src="https://www.gstatic.com/mobilesdk/160512_mobilesdk/auth_service_google.svg" alt="google" />
              </Button>
            </div> */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  Don't have an account? Sign Up
              </Link>
              </Grid>

            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
});
