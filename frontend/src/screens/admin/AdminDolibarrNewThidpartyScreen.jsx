import React, { useState, useEffect } from 'react';
import { ArrowBack, Send } from '@mui/icons-material';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography, Container } from '@mui/material';
import { useCreateThirdPartyMutation, useGetThirdPartiesQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { toast } from 'react-toastify';
import AnimatedPageTitle from './../../components/shared/AnimatedPageTitle';


// Options pour les sélecteurs
const countryOptions = [
  { id: '5', code: 'DE', name: 'Allemagne' },
  { id: '2', code: 'BE', name: 'Belgique' },
  { id: '14', code: 'CA', name: 'Canada' },
  { id: '9', code: 'CN', name: 'Chine' },
  { id: '129', code: 'KR', name: 'Corée du Sud' },
  { id: '11', code: 'US', name: 'États-Unis' },
  { id: '1', code: 'FR', name: 'France' },
  { id: '3', code: 'IT', name: 'Italie' },
  { id: '123', code: 'JP', name: 'Japon' },
  { id: '165', code: 'NC', name: 'Nouvelle-Calédonie' },
  { id: '166', code: 'NZ', name: 'Nouvelle-Zélande' },
  { id: '96', code: 'PF', name: 'Polynésie française' },
  { id: '25', code: 'PT', name: 'Portugal' },
  { id: '7', code: 'GB', name: 'Royaume-Uni' },
  { id: '6', code: 'CH', name: 'Suisse' },
  { id: '231', code: 'VU', name: 'Vanuatu' },
  { id: '236', code: 'WF', name: 'Wallis-et-Futuna' },
  { id: '28', code: 'AU', name: 'Australie' },
  { id: '4', code: 'ES', name: 'Espagne' }
];

const fournisseurOptions = [
  { code: '1', name: 'Oui' },
  { code: '0', name: 'Non' }
];

const clientOptions = [
  { code: '1', name: 'Oui' },
  { code: '0', name: 'Non' }
];
const statusOptions = [
  { code: '1', name: 'Ouvert' },
  { code: '0', name: 'Clos' }
];

const prospectOptions = [
  { code: '2', name: 'Non' },
  { code: '1', name: 'Oui' }
];

const formatCode = (prefix, number) => `${prefix}-${String(number).padStart(6, '0')}`;

const AdminDolibarrNewThidpartyScreen = () => {
  const { data: thirdparties, error: thirdpartiesError, isLoading: loadingThirdparties } = useGetThirdPartiesQuery();
  const [formData, setFormData] = useState({
    country_id: '',
    country_code: '',
    idprof1: "",
    tva_intra: "",
    idprof2: "",
    idprof3: "",
    idprof4: "",
    idprof5: "",
    idprof6: "",
    url: "",
    siret: "",
    ape: "",
    address: "",
    status: "",
    zip: "",
    town: "",
    name: '',
    name_alias: '',
    prospect: '0',
    client: '0',
    fournisseur: '0',
    code_client: '',
    code_fournisseur: ''
  });

  const [createThirdparty, { isLoading: loadingCreate }] = useCreateThirdPartyMutation();

  useEffect(() => {
    if (thirdparties && !loadingThirdparties) {
      const latestClientCode = Math.max(
        ...thirdparties
          .filter(tp => tp.code_client)
          .map(tp => parseInt(tp.code_client.split('-')[1], 10)),
        0
      );
      const latestFournisseurCode = Math.max(
        ...thirdparties
          .filter(tp => tp.code_fournisseur)
          .map(tp => parseInt(tp.code_fournisseur.split('-')[1], 10)),
        0
      );

      setFormData(prev => ({
        ...prev,
        code_client: prev.client === '1' ? formatCode('C', latestClientCode + 1) : '',
        code_fournisseur: prev.fournisseur === '1' ? formatCode('F', latestFournisseurCode + 1) : ''
      }));
    }
  }, [thirdparties, loadingThirdparties, formData.client, formData.fournisseur]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'country_code') {
      const countryInfo = countryOptions.find(c => c.code === value) || {};
      setFormData(prev => ({
        ...prev,
        [name]: value,
        country_id: countryInfo.id || '',
        country_code: countryInfo.code || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createThirdparty(formData);
      toast.success('Tiers ajouté avec succès!');
      setFormData({
        country_id: '',
        country_code: '',
        idprof1: "",
        idprof2: "",
        idprof3: "",
        idprof4: "",
        idprof5: "",
        idprof6: "",
        address: "",
        url: "",
        tva_intra: "",
        siret: "",
        ape: "",
        status:"",
        name: '',
        name_alias: '',
        prospect: '0',
        client: '0',
        fournisseur: '0',
        code_client: '',
        code_fournisseur: ''
      });
    } catch (error) {
      console.error('Error adding third party:', error);
      toast.error("Erreur lors de l'ajout du tiers.");
    }
  };

  return (
    <Container>
          <AnimatedPageTitle title={`Nouveau Tiers`} />

   
      
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBack />}
        href="/admin-tiers"
      >
        Retour
      </Button>

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="name">Nom</InputLabel>
          <TextField
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="name_alias">Nom Alias</InputLabel>
          <TextField
            id="name_alias"
            name="name_alias"
            value={formData.name_alias}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="status">Status</InputLabel>
          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value="">Sélectionner</MenuItem>
            {statusOptions.map(status => (
              <MenuItem key={status.code} value={status.code}>
                {status.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h6" gutterBottom>
          Type de tier
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="prospect">Prospect</InputLabel>
          <Select
            id="prospect"
            name="prospect"
            value={formData.prospect}
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value="">Sélectionner</MenuItem>
            {prospectOptions.map(prospect => (
              <MenuItem key={prospect.code} value={prospect.code}>
                {prospect.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="client">Client</InputLabel>
          <Select
            id="client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value="">Sélectionner</MenuItem>
            {clientOptions.map(client => (
              <MenuItem key={client.code} value={client.code}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="fournisseur">Fournisseur</InputLabel>
          <Select
            id="fournisseur"
            name="fournisseur"
            value={formData.fournisseur}
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value="">Sélectionner</MenuItem>
            {fournisseurOptions.map(fournisseur => (
              <MenuItem key={fournisseur.code} value={fournisseur.code}>
                {fournisseur.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="country_code">Pays</InputLabel>
          <Select
            id="country_code"
            name="country_code"
            value={formData.country_code}
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value="">Sélectionner</MenuItem>
            {countryOptions.map(country => (
              <MenuItem key={country.code} value={country.code}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="address"
            name="address"
            label="Adresse"
            value={formData.address}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="zip"
            name="zip"
            label="Code Postal"
            value={formData.zip}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="town"
            name="town"
            label="Ville"
            value={formData.town}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="url"
            name="url"
            label="URL"
            value={formData.url}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="tva_intra"
            name="tva_intra"
            label="TVA Intracommunautaire"
            value={formData.tva_intra}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="siret"
            name="siret"
            label="SIRET"
            value={formData.siret}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="ape"
            name="ape"
            label="APE"
            value={formData.ape}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="idprof1"
            name="idprof1"
            label="N° RIDET"
            value={formData.idprof1}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="idprof2"
            name="idprof2"
            label="ID Prof 2"
            value={formData.idprof2}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="idprof3"
            name="idprof3"
            label="ID Prof 3"
            value={formData.idprof3}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="idprof4"
            name="idprof4"
            label="ID Prof 4"
            value={formData.idprof4}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="idprof5"
            name="idprof5"
            label="ID Prof 5"
            value={formData.idprof5}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="idprof6"
            name="idprof6"
            label="ID Prof 6"
            value={formData.idprof6}
            onChange={handleChange}
            variant="outlined"
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<Send />}
          disabled={loadingCreate}
          sx={{ mt: 3 }}
        >
          Ajouter
        </Button>
      </form>
    </Container>
  );
};

export default AdminDolibarrNewThidpartyScreen;
