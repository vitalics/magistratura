import React from 'react';
import { useTranslation } from 'react-i18next';

import CircularProgress from '@material-ui/core/CircularProgress'
import Chart from 'react-google-charts';
import { makeStyles } from '@material-ui/core';

import classnames from 'classnames';

import { random } from '../../utils/math';
import { getHalfYearAsNumber } from '../../utils/date';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));

type Props = {
  className?: string
}
export default function PersonalLoadChart({ className }: Props) {
  const classes = useStyles();
  const now = new Date();

  const { t } = useTranslation();

  return (
    <Chart
      className={classnames(classes.root, className)}
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
          title: t('Personal.Chart.Load.Title', { count: getHalfYearAsNumber(now) }),
          subtitle: t('Personal.Chart.Load.SubTitle'),
        },
      }}

      // For tests
      rootProps={{ 'data-testid': '2' }}
    />
  );
}