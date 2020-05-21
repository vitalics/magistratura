import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core';

import classnames from 'classnames';

type Props = {
  open: boolean;
  onClose?: () => void
}

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}))

export default function SideMenu({ open, onClose }: Props) {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState(open);

  return (
    <Drawer
      anchor={'left'}
      variant='permanent'
      open={isOpen}
      classes={{
        paper: classnames(classes.drawerPaper, !isOpen && classes.drawerPaperClose)
      }}
      onClose={(e, reason) => {
        if (reason === 'backdropClick') {
          console.dir('backdrop');
        } else {
          console.log('escape click');
        }
        setOpen(false);
        onClose && onClose();
      }}>
      Item
    </Drawer>
  );
}