import React from 'react';

import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TranslateIcon from '@material-ui/icons/Translate';

import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { setItem, getItem } from '../../utils/localstorage';

const Map: Record<string, string> = {
    en: 'Lang.English',
    ru: 'Lang.Russian',
}

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        color: theme.palette.primary.contrastText
    },
    buttonTextWrapper: {
        padding: `0 ${theme.spacing(1)}px`,
    }
}));

export default function LanguadgeSelector() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const classes = useStyles();
    const { i18n, t } = useTranslation();

    const handleToggle = React.useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, [setOpen]);

    const handleClose = React.useCallback((event: React.MouseEvent<EventTarget>) => {
        setOpen(false);
    }, [setOpen]);

    const handleListKeyDown = React.useCallback((event: React.KeyboardEvent) => {
        console.log('handleListKeyDown', event);
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }, [setOpen]);

    const handleLang = React.useCallback(async (e: React.MouseEvent<HTMLLIElement>) => {
        const lang = (e.target as any).id as string;
        setItem('i18nextLng', lang, undefined);
        await i18n.changeLanguage(lang);

        setOpen(false);
    }, [i18n, setOpen]);

    return (
        <>
            <div>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    className={classes.button}
                    onClick={handleToggle}
                >
                    <TranslateIcon />
                    <div className={classes.buttonTextWrapper}>
                        {t(`${Map[getItem('i18nextLng') || i18n.language]}`)}
                    </div>
                </Button>
            </div>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                // anchorOrigin={{
                //     vertical: 'top',
                //     horizontal: 'left',
                // }}
                >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'top top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem id="en" onClick={handleLang}>Engish</MenuItem>
                                    <MenuItem id="ru" onClick={handleLang}>Русский</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}