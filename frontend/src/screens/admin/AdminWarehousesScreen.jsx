import React from 'react';
import { useGetWarehousesQuery } from '../../slices/dolibarr/dolliWarehouseApiSlice';
import Loader from '../../components/shared/Loader';
import { Card as MuiCard, CardContent, Typography, Grid, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import AnimatedPageTitle from '../../components/shared/AnimatedPageTitle';

// Composant de carte stylisé
const StyledCard = ({ to, children }) => (
  <MuiCard
    component={Link}
    to={to}
    sx={{
      textDecoration: 'none',
      color: 'inherit',
      backgroundColor: '#f0f4f8',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        backgroundColor: '#e3f2fd',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      },
    }}
  >
    {children}
  </MuiCard>
);

const AdminWarehousesScreen = () => {
  const { data: warehouses, isLoading, error } = useGetWarehousesQuery();

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

  return (
    <>
      <Container sx={{ pt: 4 }}>
        <AnimatedPageTitle title={`Entrepôts (${warehouses.length})`} />
        <Grid container spacing={4}>
          {warehouses.map((warehouse) => (
            <Grid item xs={12} sm={6} md={4} key={warehouse.id}>
              <StyledCard to={`/admin-entrepot-details/${warehouse.id}`}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom color="secondary">
                    {warehouse.label}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Description:</strong> {warehouse.description}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Adresse:</strong> {warehouse.address}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">
                      <strong>Code Postal:</strong> {warehouse.zip}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Ville:</strong> {warehouse.town}
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    <strong>Téléphone:</strong> {warehouse.phone}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AdminWarehousesScreen;
