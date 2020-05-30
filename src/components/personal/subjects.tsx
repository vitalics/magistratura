import React from 'react';
import { useTranslation } from 'react-i18next';

import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
});

type Props = {
    subjects?: string[] | null;
}
export default function SubjectsTable({ subjects }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <>
            {!subjects && <>{t('Subjects.NoSubjects')}</>}
            {subjects && subjects.length === 0 && <>{t('Subjects.NoSubjects')}</>}
            {subjects && subjects.length > 0 && <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{t('Subjects')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subjects.map(subject =>
                            <TableRow key={subject}>    
                                <TableCell component="th" scope="row" align="center">
                                    {t(`Subjects.${subject}`)}
                                </TableCell>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
            }
        </>
    );
}