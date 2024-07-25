
import React, { useState, useEffect } from 'react';
import { useGetThirdPartiesQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { Link } from 'react-router-dom';
import Loader from '../FeedbackScreens/Loader';
import Button from '../../components/shared/Button';
import { PlusCircleIcon } from 'lucide-react';
import { DataGrid } from '@mui/x-data-grid';
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
        <Link to={`/admin-tier-details/${params.row.id}`}>
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
      headerName: 'Telephone',
      width: 250,
      sortable: true,
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
      <AnimatedPageTitle title={`Tiers (${filteredTiers.length})`} />

        <h1 className="text-2xl font-bold"></h1>
        <Button url={"/admin-dolibarr-nouveaux-tier"} icon={PlusCircleIcon}>Nouveaux tier</Button>
      </div>
      
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <p>Erreur : {error.message}</p>
      ) : (
        <div style={{ height: 520, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            checkboxSelection
            sortingOrder={['asc', 'desc']}
            disableSelectionOnClick
          />
        </div>
      )}
    </div>
  );
};

export default AdminThirdpartiesScreen;
