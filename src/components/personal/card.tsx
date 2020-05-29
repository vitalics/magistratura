import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import VerifiedUser from '@material-ui/icons/VerifiedUser';
import PeopleIcon from '@material-ui/icons/People';

import classnames from 'classnames';

import man from '../../images/man.png';
import { DBUser } from '../../types/auth';

const useStyles = makeStyles(theme => ({
  root: {},
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
  chipItem: {
    margin: `0 ${theme.spacing(1)}px`,
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
}));

type Props = {
  className?: string;
  user: DBUser;
};

export default function PersonalCard({ className, user }: Props) {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <Grid xs={6} classes={{ root: classnames(classes.root, className) }}>
      <Paper className={classes.paper}>
        <div className={classes.imageWrapper}>
          <img className={classes.image} src={user.photoUrl ?? man} alt="man" />
        </div>
        <div className={classes.info}>
          {user.roles.map(role =>
            <Chip classes={{ root: classes.chipItem }} key={role} label={t(`Roles.${role}`)} avatar={role === 'Head' ? <VerifiedUser /> : <PeopleIcon />} />
          )}
          <Typography className={classes.name}>
            {user.firstname} {user.lastname}
          </Typography>
        </div>
      </Paper>
    </Grid>
  );
}