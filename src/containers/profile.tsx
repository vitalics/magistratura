import React from 'react';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';


import Header from '../components/menu';
import man from '../images/man.png'
import PersonalForm from '../components/personalForm';
import { useAuth } from '../hooks/auth';
import LoadChart from '../components/loadChard';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: 80
  },
  image: {
    marginTop: -70,
    maxWidth: 120,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
  },
  imageWrapper: {
    justifyContent: 'center',
    display: 'flex',
  },
  paper: {
    margin: '85px auto 0px',
  },
  info: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  name: {
    marginTop: theme.spacing(2),
  },
  item: {
    margin: `0 ${theme.spacing(2)}px`,
  },
  personalForm: {
    margin: `${theme.spacing(2)}px 0`,
  }
}));

export default React.memo(() => {
  const classes = useStyles();
  const { user, loading } = useAuth();

  return (
    <div className={classes.root}>
      <Header title="Профиль" />
      <Container fixed maxWidth="lg">
        {loading && <CircularProgress />}
        {user &&
          <Box display="flex">
            <Grid xs={6} classes={{ "grid-xs-6": classes.item }}>
              <Paper className={classes.paper}>
                <div className={classes.imageWrapper}>
                  <img className={classes.image} src={user.photoUrl ?? man} alt="man" />
                </div>
                <div className={classes.info}>
                  <Chip label={user.role} avatar={<VerifiedUser />} />
                  <Typography className={classes.name}>
                    {user.firstname} {user.lastname}
                  </Typography>
                </div>
              </Paper>
            </Grid>
            <Grid xs={6} classes={{ "grid-xs-6": classes.item }}>
              <PersonalForm className={classes.personalForm} user={user} />

              <Paper>
                <LoadChart />
              </Paper>
            </Grid>
          </Box>
        }
      </Container>
    </div>
  );
});