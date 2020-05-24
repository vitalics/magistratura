import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer';
import classnames from 'classnames';

import AuthIcon from './authIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 220,
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
    width: 0,
  },
  docked: {
    height: `calc(100vh - 64px)`,
    position: 'absolute',
  }
}));

export default function Header() {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState(false);

  const handleMenu = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpen(!isOpen);
  }, [setOpen, isOpen]);

  return (
    <>
      <AppBar position={'sticky'}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Расчет нагрузки
          </Typography>
          <AuthIcon />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={'left'}
        variant='temporary'
        open={isOpen}
        classes={{
          paper: classnames(classes.drawerPaper, !isOpen ? classes.drawerPaperClose : undefined),
          docked: classes.docked
        }}
        onClose={(e, reason) => setOpen(false)}
      >
        Item
    </Drawer>
    </>
  );
}