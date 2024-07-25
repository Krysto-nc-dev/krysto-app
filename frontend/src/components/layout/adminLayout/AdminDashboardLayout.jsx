import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSIdebar';
import AdminHeader from './AdminHeader';
import { Box, CssBaseline } from '@mui/material';
import { useThemeContext } from '../../../ThemeContext';

const AdminDashboardLayout = () => {
  const { theme } = useThemeContext();

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: theme.palette.background.default }}>
      <CssBaseline />
      <AdminSidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <AdminHeader />
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto', bgcolor: theme.palette.background.paper }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboardLayout;
