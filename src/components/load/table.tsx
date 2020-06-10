import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Column, RowDetailState, EditingState, ChangeSet } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableBandHeader,
    TableHeaderRow,
    TableRowDetail,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';

import { makeStyles } from '@material-ui/core/styles';
import People from '@material-ui/icons/People';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input'
import { Rows, StudentInfo, Row } from '../../types/load';
// import { countries } from '../../../demo-data/countries';



const useCellStyles = makeStyles(theme => ({
    icon: {
        marginBottom: theme.spacing(0.5),
        marginLeft: theme.spacing(1),
        verticalAlign: 'middle',
    },
}), { name: 'BandCell' });

const BandCell = ({
    children, tableRow, tableColumn, ...restProps
}: TableBandHeader.CellProps) => {
    const classes = useCellStyles();
    let icon = null;
    if ((restProps as any).column.title === 'Количество') icon = <People className={classes.icon} />;
    return (
        <TableBandHeader.Cell
            {...restProps}
            tableRow={tableRow}
            tableColumn={tableColumn}
        >
            <strong>
                {children}
                {icon}
            </strong>
        </TableBandHeader.Cell>
    );
};

const useHeaderCellStyles = makeStyles(theme => ({
    text: {
        color: theme.palette.secondary.light,
    },
}), { name: 'HeaderCell' });

const HeaderCell = ({ className, ...restProps }: any) => {
    const classes = useHeaderCellStyles();
    return (
        <TableHeaderRow.Cell
            {...restProps}
            className={`${classes.text} ${className}`}
        />
    );
}

const ID_WIDTH = 50;
const SUBJECT_WIDTH = 350;
const COURSE_WIDTH = 50;
const ACTION_WIDTH = 150;
const DEFAULT_ITEM_WIDTH = 110;


const useRowStyles = makeStyles(theme => ({
    id: {
        width: ID_WIDTH,
    },
    subject: {
        width: SUBJECT_WIDTH,
    },
    course: {
        width: COURSE_WIDTH,
    },
    item: {
        width: DEFAULT_ITEM_WIDTH,
    },
    action: {
        width: ACTION_WIDTH,
    },
    root: {
        padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`
    }
}));

type Props = {
    subjects: string[];
    onRowsChanged?: (rows: Row[]) => void;
};


export default ({ subjects, onRowsChanged }: Props) => {
    const [expandedRowIds, setExpandedRowIds] = useState<number[]>([2]);
    const [editingRowIds, setEditingRowIds] = useState<number[]>([]);
    const [addedRows, setAddedRows] = useState<Rows>([]);
    const [rowChanges, setRowChanges] = useState({});

    const columns: readonly Column[] = [
        { name: 'id', title: '№' },
        { name: 'subject', title: 'Предмет' },
        { name: 'course', title: 'Курс' },
        { name: 'count_students', title: 'Студентов' },
        { name: 'count_streams', title: 'потоков' },
        { name: 'count_groups', title: 'групп' },
        { name: 'count_subgroups_groups', title: 'групп в подгруппе' },
        { name: 'lection_planned', title: 'План' },
        { name: 'lection_total', title: 'Итог' },
        { name: 'lab_planned', title: 'План' },
        { name: 'lab_total', title: 'Итог' },
        { name: 'practice_planned', title: 'План' },
        { name: 'practice_total', title: 'Итог' },
        { name: 'raiting', title: 'Модуль' },
        { name: 'personal_work', title: 'Инд.Зад' },
        { name: 'course_work', title: 'Курсовая' },
        { name: 'advice', title: 'Консультация' },
        { name: 'peer_view', title: 'Рецензирование контрольных' },
        { name: 'exams', title: 'Экзамены' },
        { name: 'offsets', title: 'Зачеты' },
        { name: 'practice_study', title: 'учебная' },
        { name: 'practice_product', title: 'производственная' },
        { name: 'diploma', title: 'Дипломное проектирование' },
        { name: 'magistratura', title: 'ГЭК / ГАК (студенты и маг.)' },
        { name: 'aspirantura', title: 'Аспирантура' },
        { name: 'total', title: 'Итог' },
    ];
    const [columnBands] = useState([
        {
            title: 'Количество',
            children: [
                { columnName: 'count_students' },
                { columnName: 'count_streams' },
                { columnName: 'count_groups' },
                { columnName: 'count_subgroups_groups' },
            ],
        },
        {
            title: 'Лекций',
            children: [
                { columnName: 'lection_planned' },
                { columnName: 'lection_total' },
            ]
        },
        {
            title: 'Лаб',
            children: [
                { columnName: 'lab_planned' },
                { columnName: 'lab_total' },
            ]
        },
        {
            title: 'Практических',
            children: [
                { columnName: 'practice_planned' },
                { columnName: 'practice_total' },
            ]
        },
        {
            title: 'Практика',
            children: [
                { columnName: 'practice_study' },
                { columnName: 'practice_product' },
            ]
        },
    ]);
    const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
        { columnName: 'id', width: ID_WIDTH, align: 'center' },
        { columnName: 'subject', width: SUBJECT_WIDTH, align: 'left' },
        { columnName: 'course', width: COURSE_WIDTH, align: 'left' },
        { columnName: 'count_students', width: DEFAULT_ITEM_WIDTH, align: 'left' },
        { columnName: 'count_streams', width: DEFAULT_ITEM_WIDTH, align: 'left' },
        { columnName: 'count_groups', width: DEFAULT_ITEM_WIDTH, align: 'left' },
        { columnName: 'count_subgroups_groups', width: DEFAULT_ITEM_WIDTH, align: 'left' },
    ]);

    const [rows, setRows] = useState<Rows>(subjects.map((subject, id) => defaultRow({ id, subject })));

    const RowDetail = ({ row }: { row: Row }) => {
        const classes = useRowStyles();
        const [budgets, setBudgets] = useState(row.budgets);
        const [payers, setPayers] = useState(row.payers);
        return (
            <>
                <TableRow>
                    <TableCell classes={{ root: classes.root }}>
                        Бюджетные
                    </TableCell>
                    <TableCell classes={{ root: classes.root, body: classes.id }}>
                    </TableCell>
                    <TableCell classes={{ root: classes.root, body: classes.action }}>
                    </TableCell>
                    <TableCell classes={{ root: classes.root, body: classes.subject }}>
                        {row.subject}
                    </TableCell>
                    <TableCell classes={{ root: classes.root, body: classes.course }}>
                    </TableCell>
                    {Object.entries(budgets).map(([key, value]) => {
                        return (
                            <TableCell key={key} classes={{ root: classes.root, body: classes.item }}>
                                <Input type="number" value={budgets[key] ?? ''} onChange={e => {
                                    const newBudget = { [`${key}`]: +e.target.value } as unknown as StudentInfo;
                                    console.log(newBudget);
                                    const newBudgets = { ...budgets, ...newBudget }
                                    setBudgets(newBudgets);
                                    // update all rows
                                    let newRows = [...rows];
                                    newRows[row.id].budgets = newBudgets;
                                    newRows[row.id] = recalculateRow(newRows[row.id]);
                                    setRows(newRows);
                                    onRowsChanged && onRowsChanged(newRows);
                                }} />
                            </TableCell>
                        );
                    })}
                </TableRow>
                <TableRow>
                    <TableCell classes={{ root: classes.root }}>
                        Вне бюджета
                    </TableCell>
                    <TableCell classes={{ root: classes.root, body: classes.id }}>
                    </TableCell>
                    <TableCell classes={{ root: classes.root, body: classes.action }}>
                    </TableCell>
                    <TableCell classes={{ root: classes.root, body: classes.subject }}>
                        {row.subject}
                    </TableCell>
                    <TableCell classes={{ root: classes.root, body: classes.course }}>
                    </TableCell>
                    {Object.entries(payers).map(([key, value]) => {
                        return (
                            <TableCell key={key} classes={{ root: classes.root, body: classes.item }}>
                                <Input type="number" value={payers[key] ?? ''} onChange={e => {
                                    const newPayer = { [`${key}`]: +e.target.value } as unknown as StudentInfo;
                                    console.log(newPayer);
                                    const newPayers = { ...budgets, ...newPayer }
                                    setPayers(newPayers);

                                    // update all rows
                                    let newRows = [...rows];
                                    newRows[row.id].payers = newPayers;
                                    newRows[row.id] = recalculateRow(newRows[row.id]);
                                    setRows(newRows);
                                    onRowsChanged && onRowsChanged(newRows);
                                }} />
                            </TableCell>
                        );
                    })}
                </TableRow>
            </>
        );
    }

    const changeAddedRows = (value: Rows) => {
        const initialized: Rows = value.map(row => (Object.keys(row).length ? row : defaultRow()));
        setAddedRows(initialized);
    };

    const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
        let changedRows: Rows = [];
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            changedRows = rows.map((row: { id: string | number; }) => (changed[row.id] ? { ...row, ...changed[+row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            changedRows = rows.filter((row: { id: string | number; }) => !deletedSet.has(row.id));
        }
        const newRows = changedRows.map(recalculateRow)
        setRows(newRows);
        onRowsChanged && onRowsChanged(newRows)
    };

    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
            >
                <EditingState
                    editingRowIds={editingRowIds}
                    onEditingRowIdsChange={e => setEditingRowIds(e.map(Number))}
                    rowChanges={rowChanges}
                    onRowChangesChange={setRowChanges}
                    addedRows={addedRows}
                    onAddedRowsChange={changeAddedRows}
                    onCommitChanges={commitChanges}
                />
                <RowDetailState
                    expandedRowIds={expandedRowIds}
                    onExpandedRowIdsChange={e => setExpandedRowIds(e.map(Number))}
                />
                <Table
                    columnExtensions={tableColumnExtensions}
                />
                <TableHeaderRow
                    cellComponent={HeaderCell}
                />
                {/* TODO: custom rowComponent */}
                <TableEditRow />
                <TableEditColumn
                    showDeleteCommand
                    showEditCommand
                    showAddCommand={!addedRows.length}
                />
                <TableRowDetail
                    contentComponent={RowDetail}
                    toggleColumnWidth={120}
                />
                <TableBandHeader
                    columnBands={columnBands}
                    cellComponent={BandCell}
                />
            </Grid>
        </Paper>
    );
};

function recalculateRow(row: Row): Row {
    const count_groups = (row.budgets.count_groups + row.payers.count_groups) || row.count_groups;
    const count_streams = (row.budgets.count_streams + row.payers.count_streams) || row.count_streams;
    const count_students = (row.budgets.count_students + row.payers.count_students) || row.count_students;
    const count_subgroups_groups = (row.budgets.count_subgroups_groups + row.payers.count_subgroups_groups) || row.count_subgroups_groups;

    const studentsRow: Row = { ...row, count_groups, count_streams, count_students, count_subgroups_groups }

    const lab_total = getLabTotal(studentsRow);
    const practice_total = getPracticeTotal(studentsRow);
    const lection_total = getLectionTotal(studentsRow);

    const withoutTotal = { ...studentsRow, lab_total, practice_total, lection_total };
    const total = getTotal(withoutTotal);
    const totalRow = { ...withoutTotal, total };
    console.log('recalculate', totalRow);
    return totalRow;
}

function defaultRow(input?: { id: number, subject: string }): Row {
    return {
        id: input?.id ?? 1000,
        subject: input?.subject ?? 'DefaultSubject',
        course: 1,
        count_students: 0,
        count_streams: 0,
        count_groups: 0,
        count_subgroups_groups: 0,
        lection_planned: 0,
        lection_total: 0,
        lab_planned: 0,
        lab_total: 0,
        practice_planned: 0,
        practice_total: 0,
        raiting: 0,
        personal_work: 0,
        course_work: 0,
        advice: 0,
        peer_view: 0,
        exams: 0,
        offsets: 0,
        practice_study: 0,
        practice_product: 0,
        diploma: 0,
        magistratura: 0,
        aspirantura: 0,
        total: 0,
        budgets: {
            count_students: 0,
            count_streams: 0,
            count_groups: 0,
            count_subgroups_groups: 0
        },
        payers: {
            count_students: 0,
            count_streams: 0,
            count_groups: 0,
            count_subgroups_groups: 0
        }
    };
}

function getLectionTotal({ count_streams, lection_planned }: Row) {
    return count_streams * lection_planned;
}

function getLabTotal({ lab_planned, count_subgroups_groups, count_groups }: Row) {
    return lab_planned * count_subgroups_groups * count_groups;
}

function getPracticeTotal({ practice_planned, budgets, payers, count_groups }: Row) {
    return practice_planned * Math.round(count_groups);
}

function getTotal(row: Row) {
    return +row.lection_total +
        +row.lab_total +
        +row.practice_total +
        +row.raiting +
        +row.personal_work +
        +row.course_work +
        +row.advice +
        +row.peer_view +
        +row.offsets +
        +row.exams +
        +row.practice_product +
        +row.practice_study +
        +row.diploma +
        +row.magistratura +
        +row.aspirantura;
}

function toNumber({ subject, id, budgets, payers, ...rest }: Row): Row {
    const numeric = Object.entries(rest).map(([key, value]) => ({ [`${key}`]: Number(value) })) as unknown as typeof rest;
    return { id, subject, budgets, payers, ...numeric };
}