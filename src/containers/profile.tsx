import React from 'react';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import VerifiedUser from '@material-ui/icons/VerifiedUser'
import { makeStyles } from '@material-ui/core';

import { useAuthState } from 'react-firebase-hooks/auth';

import Header from '../components/menu';
import man from '../images/man.png'
import { auth } from '../firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        // marginTop: 80
    },
    image: {
        marginTop: -70,
        maxWidth: 120,
        boxShadow: theme.shadows[2],
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
}));

export default function ProfileInfo() {
    const classes = useStyles();
    const [user] = useAuthState(auth);
    const isVerifyed = user?.emailVerified;

    return (
        <div className={classes.root}>
            <Header />
            <Container fixed maxWidth="md" >
                <Paper className={classes.paper}>
                    <div className={classes.imageWrapper}>
                        <img className={classes.image} src={man} alt="man" />
                    </div>
                    <div className={classes.info}>
                        {isVerifyed ? <Chip label={'verifyed'} avatar={<VerifiedUser />} /> : <Chip label={'not verifyed'} avatar={<VerifiedUser />} />}

                        <Typography className={classes.name}>
                            {user?.displayName}
                        </Typography>
                        <Typography className={classes.name}>
                            {user?.email}
                        </Typography>
                    </div>
                </Paper>
            </Container>
        </div>
    );
}