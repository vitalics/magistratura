import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ExportTable from './export';
import Header from './header';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function CapacityTable() {
  const classes = useStyles();
  const tableRef = useRef<HTMLTableElement>(null);
  const [isSideMenuOpen, setSideMenuOpen] = React.useState(false);

  const handleMenuToggle = React.useCallback(() => {
    setSideMenuOpen(!isSideMenuOpen);
  }, [setSideMenuOpen, isSideMenuOpen]);

  return (
    <>
      <Header onMenuToggle={handleMenuToggle} />

      <Container >
        <TableContainer component={Paper} ref={tableRef}>
          <Table className={classes.table} id='table' aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ФИО</TableCell>
                <TableCell align="center">Уч. практика</TableCell>
                <TableCell align="center">Производственная практика</TableCell>
                <TableCell align="center">Аспирантура</TableCell>
                <TableCell align="center">Итого</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.calories}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.carbs}</TableCell>
                  <TableCell align="center">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <ExportTable filename='temp' sheet='sheet1' tableRef={tableRef}>Dowload me</ExportTable>
      </Container>
    </>
  );
}