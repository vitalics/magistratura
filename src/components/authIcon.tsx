import React from 'react';
import { useHistory } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { signOut } from '../firebase';
import routes from '../routes';

export default function AuthIcon() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const history = useHistory();


  const handleMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    }, [setAnchorEl]);

  const handleClose = React.useCallback(
    () => {
      setAnchorEl(null);
    }, [setAnchorEl]);

  const handleProfile = React.useCallback(
    () => {
      setAnchorEl(null);
      history.push(routes.PROFILE);
    }, [setAnchorEl, history]);

  const handleSignOut = React.useCallback(() => {
    signOut();
    setAnchorEl(null);

    history.push(routes.SIGN_IN);
  }, [setAnchorEl, history]);

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleSignOut}>SignOut</MenuItem>
      </Menu>
    </>
  );
}
