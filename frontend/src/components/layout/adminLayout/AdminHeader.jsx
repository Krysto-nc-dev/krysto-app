import React from 'react';
import {
  Bell,
  BookOpenText,
  CircleUser,
  LogOut,
  MessageCircle,
  MessageCircleQuestion,
  Settings,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../../slices/userApiSlice';
import { logout } from '../../../slices/authSlice';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Switch, Box, Typography } from '@mui/material';
import { useThemeContext } from '../../../ThemeContext';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const { isDarkMode, toggleTheme, theme } = useThemeContext();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: isDarkMode ? theme.palette.background.default : theme.palette.primary.main,
      }}
    >
      <Toolbar sx={{ minHeight: '30px', padding: '0 2px', bgcolor: isDarkMode ? theme.palette.background.default : theme.palette.primary.main }}>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={handleClick}>
          <Bell size={16} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: isDarkMode ? theme.palette.background.default : theme.palette.background.paper,
              color: isDarkMode ? theme.palette.text.primary : theme.palette.text.secondary,
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Bell size={16} style={{ marginRight: 4 }} />
              <Typography variant="body2">Notifications</Typography>
            </Box>
          </MenuItem>
        </Menu>

        <IconButton color="inherit" onClick={handleClick}>
          <MessageCircle size={16} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: isDarkMode ? theme.palette.background.default : theme.palette.background.paper,
              color: isDarkMode ? theme.palette.text.primary : theme.palette.text.secondary,
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/messages" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MessageCircle size={16} style={{ marginRight: 4 }} />
                <Typography variant="body2">Messages</Typography>
              </Box>
            </Link>
          </MenuItem>
        </Menu>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Switch checked={isDarkMode} onChange={toggleTheme} size="small" />
          <IconButton color="inherit" onClick={handleClick}>
            <Avatar src="https://randomuser.me/api/portraits/men/41.jpg" sx={{ width: 24, height: 24 }} />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: isDarkMode ? theme.palette.background.default : theme.palette.background.paper,
              color: isDarkMode ? theme.palette.text.primary : theme.palette.text.secondary,
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircleUser size={16} style={{ marginRight: 4 }} />
                <Typography variant="body2">Mon profil</Typography>
              </Box>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/admin-settings" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Settings size={16} style={{ marginRight: 4 }} />
                <Typography variant="body2">Paramètres</Typography>
              </Box>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/documentation" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BookOpenText size={16} style={{ marginRight: 4 }} />
                <Typography variant="body2">Documentation</Typography>
              </Box>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/admin-support" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MessageCircleQuestion size={16} style={{ marginRight: 4 }} />
                <Typography variant="body2">Aide & supports</Typography>
              </Box>
            </Link>
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); logoutHandler(); }} style={{ color: theme.palette.error.main }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LogOut size={16} style={{ marginRight: 4 }} />
              <Typography variant="body2">Déconnexion</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
