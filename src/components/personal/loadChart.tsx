import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress'
import Chart from 'react-google-charts';
import { makeStyles } from '@material-ui/core';

import { random } from '../../utils/math';
import { getHalfYearAsNumber } from '../../utils/date';
import { useTranslation } from 'react-i18next';
import { dark } from '@material-ui/core/styles/createPalette';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));
export default function LoadChart() {
  const classes = useStyles();
  const now = new Date();

  const { t } = useTranslation();

  return (
    <Chart
      className={classes.root}
      chartType="Bar"
      loader={<CircularProgress />}
      data={[
        ['Месяц', 'Плановая', 'Фактическая'],
        ['Февраль', random(200, 1500), random(200, 1500)],
        ['Март', random(200, 1500), random(200, 1500)],
        ['Апрель', random(200, 1500), random(200, 1500)],
        ['Май', random(200, 1500), random(200, 1500)],
        ['Июнь', random(200, 1500), random(200, 1500)],
        ['Июль', random(200, 1500), random(200, 1500)],
      ]}
      options={{
        // Material design options
        chart: {
          title: t('Personal.Chart.Load.Title', { halfYear: getHalfYearAsNumber(now) }),
          subtitle: t('Personal.Chart.Load.SubTitle'),
        },
        backgroundColor: dark.background.default
      }}

      // For tests
      rootProps={{ 'data-testid': '2' }}
    />
  );
}