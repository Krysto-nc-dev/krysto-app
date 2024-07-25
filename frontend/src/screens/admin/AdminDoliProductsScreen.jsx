import React, { useState } from 'react';
import { useGetDolliProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import { ShoppingCart, Briefcase, List, CheckCircle, XCircle, X, PlusCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../../components/shared/Loader';
import {
  Box,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  InputLabel,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnimatedPageTitle from './../../components/shared/AnimatedPageTitle';

const AdminDoliProductScreen = () => {
  const [mode, setMode] = useState(0); // 0: all, 1: products, 2: services
  const [statusBuy, setStatusBuy] = useState(''); // '' for all, '1' for en ventes, '0' for hors ventes
  const [status, setStatus] = useState(''); // '' for all, '0' for en achat, '1' for hors achat

  const { data, isLoading, error } = useGetDolliProductsQuery(mode);

  const filteredData = data?.filter((product) => {
    return (
      (statusBuy === '' || product.status_buy === statusBuy) &&
      (status === '' || product.status === status)
    );
  });

  const resetFilters = () => {
    setMode(0);
    setStatusBuy('');
    setStatus('');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <AnimatedPageTitle title={`Produits (${filteredData?.length ?? 0})`} />
        <Button
          component={Link}
          to="/admin-dolibarr-nouveaux-produit"
          variant="contained"
          color="primary"
          startIcon={<PlusCircleIcon size={20} />}
        >
          Nouveau produit
        </Button>
      </Box>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Filtres</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel>Type</InputLabel>
                <Select value={mode} onChange={(e) => setMode(e.target.value)} label="Type">
                  <MenuItem value={0}>Tous</MenuItem>
                  <MenuItem value={1}>Produits</MenuItem>
                  <MenuItem value={2}>Services</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel>État (Vente)</InputLabel>
                <Select value={statusBuy} onChange={(e) => setStatusBuy(e.target.value)} label="État (Vente)">
                  <MenuItem value="">Tout afficher</MenuItem>
                  <MenuItem value="1">En ventes</MenuItem>
                  <MenuItem value="0">Hors ventes</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel>État (Achat)</InputLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value)} label="État (Achat)">
                  <MenuItem value="">Tout afficher</MenuItem>
                  <MenuItem value="0">En achat</MenuItem>
                  <MenuItem value="1">Hors achat</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {mode === 0 && statusBuy === '' && status === '' ? (
              <Typography variant="body2">Aucun filtre appliqué</Typography>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2">
                  {mode === 1
                    ? 'Type: Produits'
                    : mode === 2
                    ? 'Type: Services'
                    : 'Type: Tous'}
                  {', '}
                  {statusBuy === '1'
                    ? 'En ventes'
                    : statusBuy === '0'
                    ? 'Hors ventes'
                    : 'Tout afficher'}
                  {', '}
                  {status === '0'
                    ? 'En achat'
                    : status === '1'
                    ? 'Hors achat'
                    : 'Tout afficher'}
                </Typography>
                <Button
                  onClick={resetFilters}
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<X size={15} />}
                >
                  Réinitialiser les filtres
                </Button>
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Typography color="error">{error.message}</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Référence</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Prix</TableCell>
                <TableCell>En stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <Link to={`/admin-dollibarr-products-details/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {product.ref}
                    </Link>
                  </TableCell>
                  <TableCell>{product.label}</TableCell>
                  <TableCell>
                    {Math.round(product.price ?? 0).toLocaleString()} <span className="text-mutedColor text-[10px]">XPF</span>
                  </TableCell>
                  <TableCell>
                    {product.type === '1' ? (
                      <span className="text-blue-700 bg-blue-200 px-3 py-1 rounded-full font-bold">Service</span>
                    ) : product.stock_reel != null && (typeof product.stock_reel === 'number' || typeof product.stock_reel === 'string') ? (
                      parseFloat(product.stock_reel) === 0 ? (
                        <span className="text-red-700 bg-red-200 px-3 py-1 rounded-full font-bold">Rupture de stock</span>
                      ) : (
                        <span className="text-green-500 font-bold">{parseFloat(product.stock_reel).toFixed(0)}</span>
                      )
                    ) : (
                      <span className="text-red-700 bg-red-200 px-3 py-1 rounded-full font-bold">Rupture de stock</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminDoliProductScreen;
