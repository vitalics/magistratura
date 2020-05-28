import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import MailIcon from '@material-ui/icons/Mail';
import TableChartIcon from '@material-ui/icons/TableChart';
import PersonIcon from '@material-ui/icons/Person';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import LinkIcon from '@material-ui/icons/Link';
import BookIcon from '@material-ui/icons/MenuBook';
import AssessmentIcon from '@material-ui/icons/Assessment';

import classnames from 'classnames';
import AuthIcon from './authIcon';
import LanguadgeSelector from './languadge/selector';
import { setItem, getItem } from '../utils/localstorage';

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
    width: 260,
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
  },
  brightnessIcon: {
    color: theme.palette.primary.contrastText
  },
  toolbar: theme.mixins.toolbar,
  toolbarImage: {
    width: '50%',
    display: 'block',
    margin: '0 auto',
    padding: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

type Props = {
  withDrawer?: boolean;
  title?: string;
  onThemeChanged?: (type: 'dark' | 'light') => void
};

export default React.memo(({ withDrawer, title, onThemeChanged }: Props) => {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState(false);
  const [isExpandUsefull, setExpandUsefull] = React.useState(false);

  const { t } = useTranslation();
  const history = useHistory();

  const handleMenu = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    withDrawer ?? setOpen(!isOpen);
  }, [setOpen, isOpen, withDrawer]);

  const handleTheme = React.useCallback(() => {
    const currentTheme: 'dark' | 'light' = getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setItem('theme', newTheme, undefined);
    onThemeChanged && onThemeChanged(newTheme);
  }, [onThemeChanged]);

  const handleExpandUsefullClick = () => {
    setExpandUsefull(!isExpandUsefull);
  };
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
            {title ?? t('Header.Load')}
          </Typography>
          <LanguadgeSelector />
          {/* theme switch */}
          <IconButton
            classes={{ root: classes.brightnessIcon }}
            aria-label="delete" onClick={handleTheme}>
            <Brightness4Icon />
          </IconButton>
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
        <div className={classes.toolbar}>
          <img className={classes.toolbarImage} src="http://cdn.bru.by/cache/images/design/herb4.png" alt='BRU' />
        </div>
        <Divider />
        <List>
          {['Profile', 'Load', 'Personal Plan', 'Drafts'].map((text, index) => (
            <ListItem button key={text} onClick={e => history.push(`${text.split(' ').join('_').toLowerCase()}`)}>
              <ListItemIcon>{getIconByIndex(index)}</ListItemIcon>
              <ListItemText primary={t(text)} />
            </ListItem>
          ))}
          {/* Usefull Links */}
          <Divider />
          <ListItem button onClick={handleExpandUsefullClick}>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText primary={t('Usefull links')} />
            {isExpandUsefull ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={isExpandUsefull} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={e => window.open('http://e.biblio.bru.by/', '_blank')?.focus()}>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary={t('EBiblio')} />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
    </>
  );
});

function getIconByIndex(index: number) {
  switch (index) {
    case 0:
      return (<PersonIcon />);
    case 1:
      return (<TableChartIcon />);
    case 2:
      return (<AssessmentIcon />);
    default:
      return (<MailIcon />);
  }
}