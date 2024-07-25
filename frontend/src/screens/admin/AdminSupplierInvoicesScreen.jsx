import React, { useState } from 'react'
import { useGetSupplierInvoicesQuery } from '../../slices/dolibarr/dolliSupplierInvoiceApiSlice'
import { CircleDollarSign } from 'lucide-react'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TableSortLabel,
  TablePagination,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import AnimatedPageTitle from './../../components/shared/AnimatedPageTitle'

// Styles pour les cartes
const StyledCard = styled(Card)(({ theme, color }) => ({
  backgroundColor: color || theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[3],
  height: '100%', // S'assure que les cartes ont toutes la même hauteur
}))

const AdminSupplierInvoicesScreen = () => {
  const {
    data: supplierInvoices,
    error: errorSupplierInvoices,
    isLoading: loadingSupplierInvoices,
  } = useGetSupplierInvoicesQuery()

  const [orderDirection, setOrderDirection] = useState('asc')
  const [orderBy, setOrderBy] = useState('date')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  if (loadingSupplierInvoices) return <CircularProgress />
  if (errorSupplierInvoices)
    return (
      <Typography color="error">
        Erreur lors du chargement des factures fournisseurs
      </Typography>
    )

  // Formatage de la date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  // Formatage du montant TTC en XPF avec séparateur de milliers
  const formatTotalTTC = (amount) => {
    return Number(amount).toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'XPF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  // Calcul des totaux et filtrage des factures
  const totalTTC = supplierInvoices.reduce(
    (acc, invoice) => acc + parseFloat(invoice.total_ttc),
    0,
  )

  const currentYear = new Date().getFullYear()
  const startCurrentFiscalYear = new Date(currentYear, 6, 1)
  const endCurrentFiscalYear = new Date(currentYear + 1, 5, 30, 23, 59, 59)
  const startPreviousFiscalYear = new Date(currentYear - 1, 6, 1)
  const endPreviousFiscalYear = new Date(currentYear, 5, 30, 23, 59, 59)

  const invoicesCurrentYear = supplierInvoices.filter((invoice) => {
    const invoiceDate = new Date(invoice.date * 1000)
    return invoiceDate.getFullYear() === currentYear
  })

  const invoicesPreviousYear = supplierInvoices.filter((invoice) => {
    const invoiceDate = new Date(invoice.date * 1000)
    return invoiceDate.getFullYear() === currentYear - 1
  })

  const invoicesCurrentFiscalYear = supplierInvoices.filter((invoice) => {
    const invoiceDate = new Date(invoice.date * 1000)
    return (
      invoiceDate >= startCurrentFiscalYear &&
      invoiceDate <= endCurrentFiscalYear
    )
  })

  const invoicesPreviousFiscalYear = supplierInvoices.filter((invoice) => {
    const invoiceDate = new Date(invoice.date * 1000)
    return (
      invoiceDate >= startPreviousFiscalYear &&
      invoiceDate <= endPreviousFiscalYear
    )
  })

  const totalTTCCurrentYear = invoicesCurrentYear.reduce(
    (acc, invoice) => acc + parseFloat(invoice.total_ttc),
    0,
  )

  const totalTTCPreviousYear = invoicesPreviousYear.reduce(
    (acc, invoice) => acc + parseFloat(invoice.total_ttc),
    0,
  )

  const totalTTCCurrentFiscalYear = invoicesCurrentFiscalYear.reduce(
    (acc, invoice) => acc + parseFloat(invoice.total_ttc),
    0,
  )

  const totalTTCPreviousFiscalYear = invoicesPreviousFiscalYear.reduce(
    (acc, invoice) => acc + parseFloat(invoice.total_ttc),
    0,
  )

  // Fonction pour trier les données
  const handleSort = (property) => {
    const isAscending = orderBy === property && orderDirection === 'asc'
    setOrderDirection(isAscending ? 'desc' : 'asc')
    setOrderBy(property)
  }

  // Fonction pour trier les factures
  const sortedInvoices = [...supplierInvoices].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderDirection === 'asc' ? -1 : 1
    if (a[orderBy] > b[orderBy]) return orderDirection === 'asc' ? 1 : -1
    return 0
  })

  // Fonction pour gérer le changement de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Fonction pour gérer le changement de nombre de lignes par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Calculer les factures à afficher pour la page actuelle
  const paginatedInvoices = sortedInvoices.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  )

  return (
    <div style={{ padding: '10px' }}>
      <AnimatedPageTitle title={'Factures de fournisseur'} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledCard color="#f0f4c3" style={{ width: '100%' }}>
            {' '}
            {/* Première carte prenant toute la largeur */}
            <CardContent
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography variant="h6" style={{ fontSize: '1.2rem' }}>
                  Total TTC de toutes les factures
                </Typography>
                <Typography variant="h5" style={{ fontSize: '1.3rem' }}>
                  {formatTotalTTC(totalTTC)}
                </Typography>
              </div>
              <CircleDollarSign color="primary" size={32} />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledCard color="#c5e1a5">
            <CardContent>
              <Typography variant="body2" style={{ fontSize: '0.80rem' }}>
                Total des factures pour l'année en cours
              </Typography>
              <Typography variant="h6">
                {formatTotalTTC(totalTTCCurrentYear)}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledCard color="#ef9a9a">
            <CardContent>
              <Typography variant="body2" style={{ fontSize: '0.80rem' }}>
                Total des factures pour l'année précédente
              </Typography>
              <Typography variant="h6">
                {formatTotalTTC(totalTTCPreviousYear)}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledCard color="#a5d6a7">
            <CardContent>
              <Typography variant="body2" style={{ fontSize: '0.80rem' }}>
                Total des factures pour l'exercice social actuel
              </Typography>
              <Typography variant="h6">
                {formatTotalTTC(totalTTCCurrentFiscalYear)}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StyledCard color="#b39ddb">
            <CardContent>
              <Typography variant="body2" style={{ fontSize: '0.80rem' }}>
                Total factures pour l'exercice social précédent
              </Typography>
              <Typography variant="h6">
                {formatTotalTTC(totalTTCPreviousFiscalYear)}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <TableContainer
        component={Paper}
        style={{ width: '100%', marginTop: '24px' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'ref_supplier'}
                  direction={
                    orderBy === 'ref_supplier' ? orderDirection : 'asc'
                  }
                  onClick={() => handleSort('ref_supplier')}
                >
                  Ref. Fournisseur
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'label'}
                  direction={orderBy === 'label' ? orderDirection : 'asc'}
                  onClick={() => handleSort('label')}
                >
                  Libellé
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'total_ttc'}
                  direction={orderBy === 'total_ttc' ? orderDirection : 'asc'}
                  onClick={() => handleSort('total_ttc')}
                >
                  Total TTC (XPF)
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? orderDirection : 'asc'}
                  onClick={() => handleSort('date')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.ref_supplier}</TableCell>
                <TableCell>{invoice.label}</TableCell>
                <TableCell>{formatTotalTTC(invoice.total_ttc)}</TableCell>
                <TableCell>{formatDate(invoice.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={supplierInvoices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  )
}

export default AdminSupplierInvoicesScreen
