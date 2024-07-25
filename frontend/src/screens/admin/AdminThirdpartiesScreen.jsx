import React, { useState, useEffect } from 'react';
import { useGetThirdPartiesQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { Link } from 'react-router-dom';
import { CircularProgress, Typography, Box, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PlusCircle } from 'lucide-react';
import AnimatedPageTitle from './../../components/shared/AnimatedPageTitle';
import Ship from '../../components/shared/Ship';

const AdminThirdpartiesScreen = () => {
  const [filter, setFilter] = useState('all'); // all, client, prospect, fournisseur
  const { data: tiers, isLoading, error } = useGetThirdPartiesQuery();
  const [filteredTiers, setFilteredTiers] = useState([]);

  useEffect(() => {
    if (tiers) {
      const filtered = tiers.filter((tier) => {
        if (filter === 'client') return tier.client === "1";
        if (filter === 'prospect') return tier.client === "2";
        if (filter === 'fournisseur') return tier.fournisseur === "1";
        return true;
      });
      setFilteredTiers(filtered);
    }
  }, [tiers, filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getTierType = (tier) => {
    if (tier.client === "1") return "Client";
    if (tier.client === "2") return "Prospect";
    if (tier.fournisseur === "1") return "Fournisseur";
    return "Autre";
  };

  const getTierTypeSx = (tier) => {
    if (tier.client === "1") return { backgroundColor: '#90caf9', color: '#1e88e5' };
    if (tier.client === "2") return { backgroundColor: '#fff59d', color: '#fbc02d' };
    if (tier.fournisseur === "1") return { backgroundColor: '#a5d6a7', color: '#43a047' };
    return { backgroundColor: '#ef9a9a', color: '#e53935' };
  };

  // Transform the data for DataGrid
  const rows = filteredTiers.map((tier) => ({
    id: tier.id,
    name: tier.name,
    type: getTierType(tier),
    email: tier.email,
    address: tier.address,
    phone: tier.phone,
  }));

  // Define columns for DataGrid
  const columns = [
    {
      field: 'name',
      headerName: 'Nom',
      width: 200,
      renderCell: (params) => (
        <Link to={`/admin-tier-details/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {params.row.name}
        </Link>
      ),
      sortable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      renderCell: (params) => (
        <Ship text={params.row.type} sx={getTierTypeSx(params.row)} />
      ),
      sortable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      sortable: true,
    },
    {
      field: 'address',
      headerName: 'Adresse',
      width: 300,
      sortable: true,
    },
    {
      field: 'phone',
      headerName: 'Téléphone',
      width: 150,
      sortable: true,
    },
  ];

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <AnimatedPageTitle title={`Tiers (${filteredTiers.length})`} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120, mr: 2 }}>
            <InputLabel>Filtrer</InputLabel>
            <Select
              value={filter}
              onChange={handleFilterChange}
              label="Filtrer"
            >
              <MenuItem value="all">Tous</MenuItem>
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="prospect">Prospect</MenuItem>
              <MenuItem value="fournisseur">Fournisseur</MenuItem>
            </Select>
          </FormControl>
          <Button
            component={Link}
            to="/admin-dolibarr-nouveaux-tier"
            variant="contained"
            color="primary"
            startIcon={<PlusCircle size={20} />}
          >
            Nouveau tier
          </Button>
        </Box>
      </Box>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">Erreur : {error.message}</Typography>
      ) : (
        <Box sx={{ height: 520, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            checkboxSelection
            sortingOrder={['asc', 'desc']}
            disableSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default AdminThirdpartiesScreen;
