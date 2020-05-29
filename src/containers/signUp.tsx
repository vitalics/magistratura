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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import { createUserWithEmailAndPassword } from '../firebase';
import routes from '../routes';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default React.memo(() => {
  const classes = useStyles();
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const history = useHistory();
  const { t } = useTranslation();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      history.push(routes.MAIN);
    }
  });

  const handleSignUp = React.useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setError('');

    if (!firstname) {
      const err = new Error('fistname field is required');
      setError(err.message);
      throw err;
    }
    if (!lastname) {
      const err = new Error('lastname field is required');
      setError(err.message);
      throw err;
    }

    try {
      await createUserWithEmailAndPassword({ firstname, lastname, lastLoginAt: Date.now(), email, dateOfBirth: null, phone: null, roles: ['Professor'], skype: null, photoUrl: null, password, department: 'ASU', degrees: [], subjects: null })
      history.push('/');
    } catch (e) {
      setError(e.message);
    }
  }, [firstname, lastname, email, password, history])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('Sign Up')}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label={t("First Name")}
                autoFocus
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label={t("Last Name")}
                name="lastName"
                autoComplete="lname"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={t("Email Address")}
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label={t("Password")}
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          {error &&
            <Alert severity="error">{t(error)}</Alert>
          }

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
          >
            {t('Sign Up.Action')}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href={routes.SIGN_IN} variant="body2">
                {t('Already have an account')}? {t('Sign In')}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
});