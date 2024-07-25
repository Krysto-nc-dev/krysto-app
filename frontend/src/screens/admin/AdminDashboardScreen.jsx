import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Box,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
} from 'recharts'; // Assure-toi que c'est 'recharts' et non '@mui/x-charts'
import AnimatedPageTitle from '../../components/shared/AnimatedPageTitle';
import { Text } from './../../../node_modules/recharts/es6/component/Text';

const AdminDashboardScreen = () => {
  // Données fictives pour les graphiques
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4000 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 7000 },
    { name: 'Jui', sales: 6000 },
    { name: 'Aou', sales: 2000 },
    { name: 'Sep', sales: 7000 },
    { name: 'Oct', sales: 6000 },
    { name: 'Nov', sales: 2000 },
    { name: 'Dec', sales: 9000 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 2400 },
    { month: 'Fev', revenue: 2210 },
    { month: 'Mar', revenue: 2290 },
    { month: 'Avr', revenue: 2000 },
    { month: 'Mai', revenue: 2180 },
    { month: 'Jun', revenue: 2500 },
    { month: 'Jui', revenue: 2500 },
    { month: 'Aou', revenue: 2500 },
    { month: 'Sep', revenue: 500 },
    { month: 'Oct', revenue: 2500 },
    { month: 'Nov', revenue: 2200 },
    { month: 'Dec', revenue: 2200 },
  ];

  const expensesData = [
    { category: 'Marqueting', value: 4000 },
    { category: 'Achat matériel', value: 3000 },
    { category: 'Entretiens et réparation', value: 2000 },
    { category: 'Frais bancaire', value: 1500 },
    { category: 'Autres', value: 1000 },
  ];

  return (
    <>
 
      <AnimatedPageTitle title={'Tableau de Bord'} />

      <Grid container spacing={3}>
        {/* Graphique en Barres */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Ventes Mensuelles</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ width: '100%', height: 300 }}>
                <BarChart width={500} height={300} data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Graphique Linéaire */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Revenus Mensuels</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ width: '100%', height: 300 }}>
                <LineChart width={500} height={300} data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                </LineChart>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Graphique Circulaire */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Dépenses par Catégorie</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ width: '100%', height: 300 }}>
                <PieChart width={500} height={300}>
                  <Pie
                    data={expensesData}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboardScreen;
