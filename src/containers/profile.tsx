import React from 'react';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';


import Header from '../components/menu';
import PersonalForm from '../components/personal/form';
import { useAuth } from '../hooks/auth';
import LoadChart from '../components/personal/loadChart';
import { useTranslation } from 'react-i18next';
import PersonalCard from '../components/personal/card';

const useStyles = makeStyles((theme) => ({
  personalForm: {
    margin: `${theme.spacing(2)}px 0`,
  },
  item: {
    margin: `0 ${theme.spacing(2)}px`,
  },
}));
type Props = {
  onThemeChanged?: (themeType: 'dark' | 'light') => void;
};

export default function ProfileInfo({ onThemeChanged }: Props) {
  const classes = useStyles();
  const { user, loading } = useAuth();
  const { t } = useTranslation();

  return (
    <div>
      <Header title={t('Header.Profile')} onThemeChanged={onThemeChanged} />
      <Container fixed maxWidth="lg">
        {loading && <CircularProgress />}
        {user &&
          <Box display="flex">
            <PersonalCard className={classes.item} user={user} />
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
};