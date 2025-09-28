'use client';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from '@mui/material';
import { useState, ChangeEvent } from 'react';

type Membership = {
  id: string;
  name: string;
  description: string;
  amount: number;
  duration: number;
  subscriptions: any[]; // You can define this more precisely if needed
};

type Props = {
  data: Membership[];
};

export default function MembershipTable({ data }: Props) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Membership Plans
      </Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Duration (days)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((membership: Membership) => (
                <TableRow key={membership.id}>
                  <TableCell>{membership.name}</TableCell>
                  <TableCell>{membership.description}</TableCell>
                  <TableCell>${membership.amount}</TableCell>
                  <TableCell>{membership.duration}</TableCell>
                </TableRow>
              ))}
              {visibleRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No memberships found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
