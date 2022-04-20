import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
function createData(
    sizeCm: number,
    size1: number,
    size2: number,
    size3: number,
    size4: number,
    size5: number,
) {
  return { sizeCm, size1, size2, size3, size4, size5};
}

const rows = [
  createData(22.1, 4, 5.5, 3.5, 23, 36),
  createData(22.9, 5, 6, 4, 23.5, 37),
  createData(23.3, 5.5, 7, 5, 24, 38),
  createData(24.2, 6.5, 8, 6, 24.5, 39),
  createData(24.6, 7, 8.5, 6, 25, 40),
];

export default function TableSizes() {
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Medida del pie</StyledTableCell>
            <StyledTableCell align="right">US - Hombre</StyledTableCell>
            <StyledTableCell align="right">US - Mujer</StyledTableCell>
            <StyledTableCell align="right">UK</StyledTableCell>
            <StyledTableCell align="right">CM</StyledTableCell>
            <StyledTableCell align="right">EU</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow 
              key={row.sizeCm}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.sizeCm} cm
              </StyledTableCell>
              <StyledTableCell align="right">{row.size1}</StyledTableCell>
              <StyledTableCell align="right">{row.size2}</StyledTableCell>
              <StyledTableCell align="right">{row.size3}</StyledTableCell>
              <StyledTableCell align="right">{row.size4}</StyledTableCell>
              <StyledTableCell align="right">{row.size5}</StyledTableCell>
            </StyledTableRow >
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}