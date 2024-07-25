import { AlignJustify, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, IconButton, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useThemeContext } from '../../../ThemeContext';
import { DASHBOARD_ADMIN_SIDEBAR_LINKS } from './Navigation';

const AdminSidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, isDarkMode } = useThemeContext();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Drawer
      variant="permanent"
      open={isSidebarOpen}
      sx={{
        width: isSidebarOpen ? 150 : 60,
        flexShrink: 0,
        pl: 1,
        '& .MuiDrawer-paper': {
          width: isSidebarOpen ? 150 : 60,
          boxSizing: 'border-box',
          borderRight: 'none',
          backgroundColor: isDarkMode ? theme.palette.background.default : theme.palette.primary.main,
          color: theme.palette.text.primary,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 0 , ml:1.2, mt:2}}>
        <IconButton onClick={toggleSidebar} color="inherit">
          {isSidebarOpen ? <X size={18} /> : <AlignJustify size={18} />}
        </IconButton>
      </Box>
      <List sx={{ p: 0, mt: 2 }}>
        {DASHBOARD_ADMIN_SIDEBAR_LINKS.map((link) => (
          <ListItem
            button
            key={link.key}
            component={Link}
            to={link.href}
            selected={location.pathname === link.href}
            sx={{
              minHeight: 25,
              px: 1,
              py: 0,
              display: 'flex',
              justifyContent: isSidebarOpen ? 'flex-start' : 'center',
              alignItems: 'center',
              '&:hover': {
                bgcolor: theme.palette.action.hover,
              },
              bgcolor: location.pathname === link.href ? theme.palette.action.selected : 'inherit',
            }}
          >
            <ListItemIcon sx={{ minWidth: 24 }}>
              {React.cloneElement(link.icon, { size: 16 })}
            </ListItemIcon>
            {isSidebarOpen && (
              <ListItemText
                primary={link.label}
                sx={{ '& .MuiTypography-root': { fontSize: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
