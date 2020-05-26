import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress'
import Chart from 'react-google-charts';
import { random } from '../utils/math';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))
export default function LoadChart() {
  const classes = useStyles();
  return (
    <Chart
      className={classes.root}
      chartType="Bar"
      loader={<CircularProgress />}
      data={[
        ['Месяц', 'Плановая', 'Фактическая'],
        ['Январь', random(200, 1500), random(200, 1500)],
        ['Февраль', random(200, 1500), random(200, 1500)],
        ['Март', random(200, 1500), random(200, 1500)],
        ['Апрель', random(200, 1500), random(200, 1500)],
        ['Май', random(200, 1500), random(200, 1500)],
        ['Июнь', random(200, 1500), random(200, 1500)],
        ['Июль', random(200, 1500), random(200, 1500)],
        ['Август', random(200, 1500), random(200, 1500)],
        ['Сентябрь', random(200, 1500), random(200, 1500)],
        ['Октябрь', random(200, 1500), random(200, 1500)],
        ['Ноябрь', random(200, 1500), random(200, 1500)],
        ['Декабрь', random(200, 1500), random(200, 1500)],
      ]}
      options={{
        // Material design options
        chart: {
          title: 'Нагрузка',
          subtitle: 'Плановая и фактическая нагрузка',
        },
      }}
      // For tests
      rootProps={{ 'data-testid': '2' }}
    />
  );
}