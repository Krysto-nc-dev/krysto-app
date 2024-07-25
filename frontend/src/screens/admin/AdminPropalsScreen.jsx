import React, { useState } from 'react';
import { useGetProposalsQuery } from '../../slices/dolibarr/dolliProposalApiSlice';
import Loader from '../../components/shared/Loader';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Typography,
  Paper,
  Box,
  styled,
  tableCellClasses,
  useTheme
} from '@mui/material';
import AnimatedPageTitle from '../../components/shared/AnimatedPageTitle';

// Styled components using theme
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.default,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AdminPropalsScreen = () => {
  const theme = useTheme(); // Access the theme
  const { data: propals, isLoading, error } = useGetProposalsQuery();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('ref');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {typeof error.data.message === 'string'
          ? error.data.message
          : 'Une erreur est survenue'}
      </Typography>
    );
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    console.log(`Sorting by ${property} in ${isAsc ? 'descending' : 'ascending'} order`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 4:
        return 'Facturé';
      case 0:
        return 'Brouillon';
      default:
        return 'Inconnu';
    }
  };

  // Fonction de tri des données
  const sortedPropals = propals
    .slice()
    .sort((a, b) => {
      if (orderBy === 'ref') {
        return (order === 'asc' ? a.ref.localeCompare(b.ref) : b.ref.localeCompare(a.ref));
      }
      if (orderBy === 'total_ht') {
        return (order === 'asc' ? a.total_ht - b.total_ht : b.total_ht - a.total_ht);
      }
      if (orderBy === 'total_tva') {
        return (order === 'asc' ? a.total_tva - b.total_tva : b.total_tva - a.total_tva);
      }
      if (orderBy === 'total_ttc') {
        return (order === 'asc' ? a.total_ttc - b.total_ttc : b.total_ttc - a.total_ttc);
      }
      if (orderBy === 'date_validation') {
        return (order === 'asc' ? a.date_validation - b.date_validation : b.date_validation - a.date_validation);
      }
      return 0;
    });

  // Calcul des données pour la pagination
  const paginatedPropals = sortedPropals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ p: 4, minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <AnimatedPageTitle title={`Propositions commerciales (${propals.length})`} />
   
      <Paper sx={{ width: '100%', mb: 2, boxShadow: theme.shadows[2] }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === 'ref'}
                    direction={orderBy === 'ref' ? order : 'asc'}
                    onClick={() => handleRequestSort('ref')}
                  >
                    Référence
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleRequestSort('status')}
                  >
                    Statut
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === 'total_ht'}
                    direction={orderBy === 'total_ht' ? order : 'asc'}
                    onClick={() => handleRequestSort('total_ht')}
                  >
                    Total HT
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === 'total_tva'}
                    direction={orderBy === 'total_tva' ? order : 'asc'}
                    onClick={() => handleRequestSort('total_tva')}
                  >
                    Total TVA
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === 'total_ttc'}
                    direction={orderBy === 'total_ttc' ? order : 'asc'}
                    onClick={() => handleRequestSort('total_ttc')}
                  >
                    Total TTC
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === 'date_validation'}
                    direction={orderBy === 'date_validation' ? order : 'asc'}
                    onClick={() => handleRequestSort('date_validation')}
                  >
                    Date de validation
                  </TableSortLabel>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPropals.map((propal) => (
                <StyledTableRow key={propal.id}>
                  <StyledTableCell>
                    <Link to={`/propal-details/${propal.id}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                      {propal.ref}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>
                    <span
                      style={{
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.common.white,
                        padding: '4px 8px',
                        borderRadius: '12px',
                      }}
                    >
                      {getStatusText(propal.status)}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell>
                    {parseFloat(propal.total_ht).toLocaleString('fr-FR', { minimumFractionDigits: 0 })} XPF
                  </StyledTableCell>
                  <StyledTableCell>
                    {parseFloat(propal.total_tva).toLocaleString('fr-FR', { minimumFractionDigits: 0 })} XPF
                  </StyledTableCell>
                  <StyledTableCell>
                    {parseFloat(propal.total_ttc).toLocaleString('fr-FR', { minimumFractionDigits: 0 })} XPF
                  </StyledTableCell>
                  <StyledTableCell>
                    {propal.status === 4 ? new Date(propal.date_validation * 1000).toLocaleDateString('fr-FR') : 'Non validée'}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={propals.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default AdminPropalsScreen;
