import React from 'react';

import 'date-fns';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

import fns from '@date-io/date-fns';

import classnames from 'classnames';
import { DBUser } from '../../types/auth';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
}));

type Props = {
    className?: string;
    user: DBUser;
    readonly?: boolean;
    onUserChange?: (user: DBUser) => void;
};
const dateUtils = new fns();
export default function PersonalForm({ className, user, readonly, onUserChange }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <Paper classes={{
            root: classnames(classes.root, className)
        }}>
            <Typography variant="h6" gutterBottom>
                {t('Personal Info')}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="firstName"
                        name="firstName"
                        label={t('First Name')}
                        fullWidth
                        autoComplete="given-name"
                        value={user.firstname}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="lastName"
                        name="lastName"
                        label={t('Last Name')}
                        fullWidth
                        autoComplete="family-name"
                        value={user.lastname}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label={t('Email')}
                        fullWidth
                        autoComplete="shipping address-line1"
                        value={user.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="skype"
                        name="skype"
                        label={t('Skype')}
                        fullWidth
                        autoComplete="shipping address-line2"
                        value={user.skype ?? ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="mobile"
                        name="mobile"
                        label={t('Mobile')}
                        fullWidth
                        value={user.phone ?? ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="lastLogin"
                        name="lastLogin"
                        label={t('Last Login At')}
                        value={user.lastLoginAt ? dateUtils.format(new Date(user.lastLoginAt), 'fullDateTime24h') : dateUtils.format(new Date(), 'fullDateTime24h')}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}