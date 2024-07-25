import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/shared/Modal';
import {
  useCreateCashierMutation,
  useGetCashiersQuery,
} from '../../slices/cashierApiSlice';
import Loader from '../../components/shared/Loader';
import { Eye as EyeIcon } from 'lucide-react';
import {
  useGetThirdPartiesQuery,
  useGetThirdPartyDetailsQuery,
} from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  CircularProgress,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AnimatedPageTitle from '../../components/shared/AnimatedPageTitle';

// Styles pour les boutons et autres éléments
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const AdminCashierScreen = () => {
  const navigate = useNavigate();
  const {
    data: cashiers,
    error: cashiersError,
    isLoading: loadingCashier,
    refetch: refetchCashiers,
  } = useGetCashiersQuery();
  const {
    data: thirdParties,
    error: errorThirdParties,
    isLoading: loadingThirdParties,
  } = useGetThirdPartiesQuery({ mode: '1' });
  const [addCashier] = useCreateCashierMutation();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    tierId: '',
    placePrice: '',
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedPlacePrice = parseFloat(formData.placePrice);

    if (!formData.date || !formData.tierId || isNaN(parsedPlacePrice)) {
      toast.error('Veuillez remplir tous les champs correctement.');
      return;
    }

    try {
      const response = await addCashier({
        ...formData,
        placePrice: parsedPlacePrice,
      });

      if (response && response.data && response.data._id) {
        closeModal();
        refetchCashiers();
        setFormData({
          date: '',
          tierId: '',
          placePrice: '',
        });
        toast.success('La caisse est créée avec succès.');
      } else {
        toast.error('Une erreur est survenue lors de la création de la caisse. Veuillez réessayer.');
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la création de la caisse.');
      console.error('Failed to create cashier:', error);
    }
  };

  const getStatusColor = (status) => {
    return status === 'Ouvert'
      ? 'success'
      : 'error';
  };

  if (loadingCashier || loadingThirdParties) {
    return <Loader />;
  }

  if (cashiersError || errorThirdParties) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Error: {cashiersError?.message || errorThirdParties?.message}</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <AnimatedPageTitle title={`Historique des caisses (${cashiers.length})`} />
     
        <StyledButton variant="contained" color="success" onClick={openModal}>
          Nouvelle Caisse
        </StyledButton>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Total des ventes</TableCell>
              <TableCell align="center">Tiers</TableCell>
              <TableCell align="center">Statut</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cashiers && cashiers.length > 0 ? (
              cashiers.map((cashier) => (
                <TableRow key={cashier._id}>
                  <TableCell>{new Date(cashier.date).toLocaleDateString()}</TableCell>
                  <TableCell>{cashier.totalDaySales} XPF</TableCell>
                  <TableCell>
                    {cashier.tierId ? (
                      <TierName tierId={cashier.tierId} />
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color={getStatusColor(cashier.status)}>
                      {cashier.status === 'Ouvert' ? 'Ouvert' : 'Fermé'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={Link}
                      to={`/admin-caisse-details/${cashier._id}`}
                      color="primary"
                    >
                      <EyeIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Aucune caisse trouvée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {showModal && (
        <Modal closeModal={closeModal}>
          <Box p={4}>
            <Typography variant="h6" gutterBottom>
              Nouvelle Caisse
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Titre"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
                <TextField
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  label="Prix de la place"
                  name="placePrice"
                  type="number"
                  value={formData.placePrice}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
                <Select
                  label="Tiers"
                  name="tierId"
                  value={formData.tierId}
                  onChange={handleChange}
                  variant="outlined"
                  displayEmpty
                  required
                >
                  <MenuItem value="">
                    <em>Sélectionnez un tiers</em>
                  </MenuItem>
                  {thirdParties &&
                    thirdParties.map((tier) => (
                      <MenuItem key={tier.id} value={tier.id}>
                        {tier.name}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Valider
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

const TierName = ({ tierId }) => {
  const {
    data: tier,
    error: tierError,
    isLoading: loadingTier,
  } = useGetThirdPartyDetailsQuery(tierId);

  if (loadingTier) {
    return <CircularProgress />;
  }

  if (tierError) {
    return <Typography color="error">Error: {tierError.message}</Typography>;
  }

  return <Typography>{tier.name}</Typography>;
};

export default AdminCashierScreen;
