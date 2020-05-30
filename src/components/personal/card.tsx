import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles, Avatar } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import VerifiedUser from '@material-ui/icons/VerifiedUser';
import PeopleIcon from '@material-ui/icons/People';
import AssistantIcon from '@material-ui/icons/Assistant';
import SecurityIcon from '@material-ui/icons/Security';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';

import Skeleton from '@material-ui/lab/Skeleton';

import man from '../../images/man.png';
import { DBUser } from '../../types/auth';
import SubjectsTable from './subjects';

const useStyles = makeStyles(theme => ({
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
    margin: `0 ${theme.spacing(0.5)}px`,
  },
  chipWrapper: {
    margin: `${theme.spacing(1)}px 0`,
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
  load?: boolean
};

export default function PersonalCard({ user, load }: Props) {
  const classes = useStyles();

  const { t } = useTranslation();

  const onDepartmentClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    console.warn('noting by click');
  }, []);

  return (
    <Paper className={classes.paper}>
      <div className={classes.imageWrapper}>
        {load ?
          <img className={classes.image} src={user.photoUrl ?? man} alt="man" /> :
          <Skeleton className={classes.image} variant="rect" />
        }

      </div>
      <div className={classes.info}>
        {load ?
          <Typography className={classes.name} variant="h6">
            {user.firstname} {user.lastname}
          </Typography> :
          <Skeleton variant="text" />}

        <div className={classes.chipWrapper}>
          {load ?
            user.roles.map(role =>
              <Chip classes={{ root: classes.chipItem }} key={role} label={t(`Roles.${role}`)} avatar={getIconByRole(role)} />
            )
            :
            <Skeleton>
              <Chip classes={{ root: classes.chipItem }} avatar={<Avatar />} />
            </Skeleton>
          }

        </div>
        <div className={classes.chipWrapper}>
          {load ?
            user.degrees && user.degrees.length > 0 && user.degrees.map(degree =>
              <Chip classes={{ root: classes.chipItem }} key={degree} label={t(`Degrees.${degree}`)} avatar={<SchoolIcon />} />
            ) :
            <Skeleton>
              <Chip classes={{ root: classes.chipItem }} avatar={<Avatar />} />
            </Skeleton>
          }
        </div>
        <div className={classes.chipWrapper}>
          {load ?
            <Chip classes={{ root: classes.chipItem }} label={t(`Department.${user.department}`)} onClick={onDepartmentClick} avatar={<HomeIcon />} /> :
            <Skeleton><Chip classes={{ root: classes.chipItem }} avatar={<Avatar />} /></Skeleton>
          }
        </div>
        {load ?
          <SubjectsTable subjects={user.subjects} />
          : <Skeleton><SubjectsTable /></Skeleton>
        }

      </div>
    </Paper>
  );
}

type ArrayInfer<T> = T extends Array<infer U> ? U : T;

function getIconByRole(role: ArrayInfer<DBUser['roles']>) {
  switch (role) {
    case 'Admin':
      return <SecurityIcon />;
    case 'Assistant':
      return <AssistantIcon />;
    case 'Head':
      return <VerifiedUser />;
    case 'Professor':
    case 'Sr. Professor':
      return <PeopleIcon />
  }
}