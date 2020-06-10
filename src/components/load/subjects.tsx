import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { getSubjects } from '../../firebase';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 'auto',
        },
        paper: {
            width: theme.breakpoints.width('sm'),
            height: theme.breakpoints.width('sm'),
            overflow: 'auto',
        },
        button: {
            margin: theme.spacing(0.5, 0),
        },
    }),
);

function not(a: string[], b: string[]) {
    return a.filter((value) => !b.includes(value));
}

function intersection(a: string[], b: string[]) {
    return a.filter((value) => b.includes(value));
}

type Props = {
    onRightItemsChanged?: (items: string[]) => void;
    selectedSubjects?: string[];
}

export default function Subjects({ onRightItemsChanged, selectedSubjects, }: Props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState<string[]>([]);
    const [left, setLeft] = React.useState<string[]>([]);
    const [right, setRight] = React.useState<string[]>(selectedSubjects ?? []);

    React.useEffect(() => {
        getSubjects().then(setLeft)
    }, []);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        const rightResult = right.concat(left)
        setRight(rightResult);
        setLeft([]);
        onRightItemsChanged && onRightItemsChanged(rightResult);
    };

    const handleCheckedRight = () => {
        const rightResult = right.concat(leftChecked)
        setRight(rightResult);
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));

        onRightItemsChanged && onRightItemsChanged(rightResult);
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));

        onRightItemsChanged && onRightItemsChanged(right);
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);

        onRightItemsChanged && onRightItemsChanged(right);
    };

    const customList = (items: string[]) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList(left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
          </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
          </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
        </Grid>
    );
}
