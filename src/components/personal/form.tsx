import React from 'react';

import { format } from 'date-fns';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import { DBUser } from '../../types/auth';
import { useTranslation } from 'react-i18next';
import { isValidDate } from '../../utils/date';

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

export default function PersonalForm({ className, user, readonly, onUserChange }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [formatDate, setFormatDate] = React.useState('');

    React.useEffect(() => {
        const date = user.lastLoginAt ? new Date(+user.lastLoginAt) : new Date();
        if (isValidDate(date)) {
            const formatted = format(date, 'yyyy MMM dd HH:mm');
            setFormatDate(formatted);
        }
    }, [user.lastLoginAt]);

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
                        value={formatDate}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}