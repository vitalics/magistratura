import React from 'react';
import { useTranslation } from 'react-i18next';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core';

import Header from '../components/menu';
import PersonalForm from '../components/personal/form';
import { useAuth } from '../hooks/auth';
import LoadChart from '../components/personal/loadChart';
import PersonalCard from '../components/personal/card';


import { getUsersByDepartment } from '../firebase';
import { DBUser } from '../types/auth';
import UsersInDepartmentList from '../components/personal/departmentUserList';

const useStyles = makeStyles((theme) => ({
  personalForm: {
    margin: `${theme.spacing(2)}px 0`,
  },
  item: {
    margin: `0 ${theme.spacing(2)}px`,
  },
  personalDepartment: {
    margin: `${theme.spacing(2)}px 0`,
  },
  topMargin: {
    margin: `${theme.spacing(3)}px 0`,
  }
}));
type Props = {
  onThemeChanged?: (themeType: 'dark' | 'light') => void;
  user?: DBUser;
  userLoading?: boolean;
  title?: string;
};

export default function ProfileInfo({ onThemeChanged, user: anotherUser, title, userLoading }: Props) {
  const classes = useStyles();
  const { user: authUser, loading } = useAuth();
  const [user, setUser] = React.useState(authUser);
  const [isLoadUser, setLoadUser] = React.useState(loading);
  const { t } = useTranslation();

  const [usersInDepartment, setUsersInDepartment] = React.useState<DBUser[]>([]);

  React.useEffect(() => {
    if (anotherUser && user && user.uid !== anotherUser.uid) {
      setUser(anotherUser);
      setLoadUser(userLoading ?? false);
    }

    const asyncFn = async () => {
      if (user && (user.roles.includes('Admin') || user.roles.includes('Head'))) {
        const users = await getUsersByDepartment({ includeMySelf: false });
        setUsersInDepartment(users);
      } if (anotherUser) {
        setUsersInDepartment([]);
      }
    };

    asyncFn();
  }, [anotherUser, user, userLoading]);

  return (
    <div>
      <Header title={title ?? t('Header.Profile')} onThemeChanged={onThemeChanged} />
      <Container fixed maxWidth="lg">
        {loading && <CircularProgress />}
        {user &&
          <Grid container spacing={2}>
            <Grid item xs={5} classes={{ root: classes.item }}>
              <PersonalCard user={user} load={!isLoadUser} />

              {usersInDepartment.length > 0 &&
                <Paper classes={{ root: classes.personalDepartment }}>
                  <UsersInDepartmentList usersInDepartment={usersInDepartment} />
                </Paper>
              }
            </Grid>
            <Grid item xs={5} classes={{ "grid-xs-6": classes.item }}>
              <PersonalForm className={classes.personalForm} user={user} />
              <Paper classes={{ root: classes.topMargin }}>
                <LoadChart />
              </Paper>
            </Grid>
          </Grid>
        }
      </Container>
    </div>
  );
};