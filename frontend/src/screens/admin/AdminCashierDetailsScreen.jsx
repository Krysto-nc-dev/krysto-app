import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SquareX } from 'lucide-react';
import {
  useGetCashierByIdQuery,
  useAddSaleMutation,
} from '../../slices/cashierApiSlice';
import { toast } from 'react-toastify';
import { useGetDolliProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loader from '../FeedbackScreens/Loader';

const AdminCashierDetailsScreen = () => {
  const { id: cashierId } = useParams();

  const [formData, setFormData] = useState({
    clientFirstname: '',
    clientLastname: '',
    clientMail: '',
    clientCity: '',
    touriste: false,
    clientCountry: 'Nouvelle-Calédonie',
    paymentMethod: 'Espèces',
    products: [],
  });

  const {
    data: cashierDetails,
    error: errorCashierDetails,
    isLoading: loadingCashierDetails,
  } = useGetCashierByIdQuery(cashierId);

  const {
    data: products,
    error: productError,
    isLoading: loadingProducts,
  } = useGetDolliProductsQuery({
    mode: '1',
    variant_filter: '1',
  });

  const [addSale, { isLoading: addingSale }] = useAddSaleMutation();

  useEffect(() => {
    if (products) {
      const initialProductsState = products.map((product) => ({
        productId: product.id,
        unitPrice: parseFloat(product.price) || 0,
        quantity: 0,
        subTotal: 0,
        label: product.label,
        ref: product.ref,
      }));
      setFormData((prevState) => ({
        ...prevState,
        products: initialProductsState,
      }));
    }
  }, [products]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleProductChange = (productId, unitPriceStr, quantity) => {
    const unitPrice = parseFloat(unitPriceStr);

    const updatedProducts = formData.products.map((product) =>
      product.productId === productId
        ? { ...product, quantity, subTotal: unitPrice * quantity }
        : product
    );

    setFormData((prevState) => ({
      ...prevState,
      products: updatedProducts,
    }));
  };

  const calculateTotalSale = () => {
    return formData.products.reduce(
      (total, product) => total + product.subTotal,
      0
    );
  };

  const getProductLabel = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.label : 'Produit inconnu';
  };

  const handleSubmitSale = async (e) => {
    e.preventDefault();

    const filteredProducts = formData.products
      .filter((product) => product.quantity > 0)
      .map((product) => ({
        productID: product.productId,
        unitPrice: product.unitPrice,
        quantity: product.quantity,
      }));

    const saleData = {
      sale: {
        clientFirstname: formData.clientFirstname,
        clientLastname: formData.clientLastname,
        clientMail: formData.clientMail,
        clientCity: formData.clientCity,
        paymentMethod: formData.paymentMethod,
        touriste: formData.touriste,
        clientCountry: formData.clientCountry,
        title: 'Achat divers', // Ajoutez le titre si nécessaire
        products: filteredProducts,
      },
    };

    try {
      await addSale({ cashierId, sale: saleData });
      toast.success('Vente ajoutée avec succès.');
      setFormData({
        clientFirstname: '',
        clientLastname: '',
        clientMail: '',
        clientCity: '',
        touriste: false,
        clientCountry: 'Nouvelle-Calédonie',
        paymentMethod: 'Espèces',
        products: formData.products.map((product) => ({
          ...product,
          quantity: 0,
          subTotal: 0,
        })),
      });
    } catch (error) {
      toast.error('Une erreur est survenue lors de la création de la vente.');
    }
  };

  if (loadingCashierDetails || loadingProducts) {
    return <Loader />;
  }

  const placePrice = cashierDetails?.placePrice || 0;
  const totalSales = cashierDetails?.totalSales || 0;

  // Clamp progress percentage between 0 and 100
  const progressPercentage = Math.min((totalSales / placePrice) * 100, 100);
  let realGain = totalSales - placePrice;
  let realGainClass = realGain >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <Card sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Détails de la Caisse
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          sx={{
            height: 8,
            borderRadius: 5,
            mb: 2,
            backgroundColor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              backgroundColor:
                progressPercentage >= 100
                  ? 'success.main' // Always green when progress >= 100%
                  : progressPercentage >= 50
                  ? 'warning.main'
                  : 'error.main',
            },
          }}
        />

        <Typography variant="body2" color="textSecondary" paragraph>
          Progression: {progressPercentage.toFixed(2)}%
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6">Informations de la Caisse</Typography>
        <Typography variant="body2" color="textSecondary">
          {cashierDetails?.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color:
              cashierDetails?.status === 'Ouvert'
                ? 'success.main'
                : 'error.main',
          }}
        >
          {cashierDetails?.status === 'Ouvert' ? 'Ouvert' : 'Fermé'}
        </Typography>

        <Accordion sx={{ mt: 3 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="client-info-content"
            id="client-info-header"
          >
            <Typography variant="h6">Informations du Client</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmitSale}>
              <TextField
                label="Prénom du Client"
                name="clientFirstname"
                value={formData.clientFirstname}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Nom du Client"
                name="clientLastname"
                value={formData.clientLastname}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email du Client"
                name="clientMail"
                value={formData.clientMail}
                onChange={handleChange}
                type="email"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Ville du Client"
                name="clientCity"
                value={formData.clientCity}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Pays du Client"
                name="clientCountry"
                value={formData.clientCountry}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="touriste"
                    checked={formData.touriste}
                    onChange={handleChange}
                  />
                }
                label="Touriste"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Mode de Paiement</InputLabel>
                <Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  label="Mode de Paiement"
                >
                  <MenuItem value="Espèces">Espèces</MenuItem>
                  <MenuItem value="Carte">Carte</MenuItem>
                  <MenuItem value="Virement">Virement</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={addingSale}
                sx={{ mt: 2 }}
              >
                Ajouter la Vente
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Produits
        </Typography>
        {formData.products.map((product) => (
          <Card key={product.productId} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                {product.label}
              </Typography>
              <TextField
                label="Prix Unitaire (XPF)"
                type="number"
                value={product.unitPrice}
                onChange={(e) =>
                  handleProductChange(
                    product.productId,
                    e.target.value,
                    product.quantity
                  )
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Quantité"
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(
                    product.productId,
                    product.unitPrice,
                    parseInt(e.target.value, 10)
                  )
                }
                fullWidth
                margin="normal"
              />
            </CardContent>
          </Card>
        ))}

        <Typography variant="h6" sx={{ mt: 3 }}>
          Total de la Vente: {calculateTotalSale()} XPF
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Ventes Réalisées</Typography>
        {cashierDetails?.sales && cashierDetails.sales.length > 0 ? (
          <List>
            {cashierDetails.sales.map((sale) => (
              <ListItem key={sale.id} sx={{ mb: 2, border: '1px solid', borderRadius: 1 }}>
                <ListItemText
                  primary={`${sale.clientFirstname} ${sale.clientLastname}`}
                  secondary={`Date: ${new Date(sale.date).toLocaleDateString()} - Email: ${sale.clientMail} - ${sale.clientCity}, ${sale.clientCountry}`}
                />
                <Typography variant="body2" color="textSecondary">
                  {sale.touriste ? 'Client Touriste' : 'Client Local'}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Mode de Paiement: {sale.paymentMethod}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Produits :</strong>
                </Typography>
                <List>
                  {sale.products.map((product) => (
                    <ListItem key={product.productID}>
                      <ListItemText
                        primary={`${getProductLabel(product.productID)} - ${product.quantity} x ${product.unitPrice} XPF`}
                        secondary={`${product.subTotal} XPF`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="body2" color="textPrimary" sx={{ mt: 1 }}>
                  <strong>Total :</strong> {sale.products.reduce(
                    (total, product) => total + product.subTotal,
                    0
                  )} XPF
                </Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="error" sx={{ textAlign: 'center' }}>
            Aucune vente réalisée pour le moment.
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2">
          <strong>Prix de l'inscription:</strong> {placePrice} XPF
        </Typography>
        <Typography variant="body2">
          <strong>Chiffre d'affaires:</strong> {Math.floor(totalSales)} XPF
        </Typography>
        <Typography variant="body2">
          {progressPercentage >= 100 ? (
            <span>
              <strong>Gain réel:</strong> <span className={realGainClass}>{Math.floor(realGain)} XPF</span>
            </span>
          ) : (
            <span>
              <strong>Montant restant à atteindre pour gagner de l'argent:</strong> <span className="text-red-500">{Math.floor(placePrice - totalSales)} XPF</span>
            </span>
          )}
        </Typography>

        <Button
          variant="outlined"
          color="error"
          startIcon={<SquareX />}
          sx={{ mt: 2 }}
        >
          Fermer la caisse
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminCashierDetailsScreen;
