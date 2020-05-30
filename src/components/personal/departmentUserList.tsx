import React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles, Typography } from '@material-ui/core';

import { DBUser } from '../../types/auth';

import man from '../../images/man.png';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { GETUSER } from '../../routes';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  inline: {
    display: 'inline',
  },
}))
type Props = {
  usersInDepartment: DBUser[];
}
export default function DepartmentUserList({ usersInDepartment }: Props) {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const handleClick = React.useCallback((uid: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    history.push(GETUSER(uid));
  }, [history]);

  return (
    <>
      {usersInDepartment.length > 0 &&
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              {t('Department.List')}
            </ListSubheader>
          }
          className={classes.root}
        >
          {usersInDepartment.map(user =>
            <React.Fragment key={user.email}>
              <ListItem button onClick={handleClick(user.uid)}>
                <ListItemAvatar>
                  <Avatar alt={user.firstname! + user.lastname!} src={user.photoUrl ?? man} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.firstname} ${user.lastname}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {user.degrees}
                      </Typography>
                      {user.roles.map(role => t(`Roles.${role}`))}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </React.Fragment>
          )}
        </List>
      }
    </>
  );
}