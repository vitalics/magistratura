import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu'

import AuthIcon from './authIcon';
import SideMenu from './sidemenu';

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
}));

type Props = {
  onMenuToggle: () => void;
};
export default function Header({ onMenuToggle }: Props) {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
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
            onClick={onMenuToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Photos
          </Typography>
          <AuthIcon />
        </Toolbar>
      </AppBar>
      <SideMenu open={isOpen} onClose={handleClose} />
    </>
  );
}