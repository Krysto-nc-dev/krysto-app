import { createTheme } from '@mui/material/styles'

// Définir les couleurs pour le mode clair
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9196CA',
      contrastText: '#fff',
    },
    secondary: {
      main: '#7EC7B8',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#333',
    },
    // Autres styles typographiques
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
        },
        containedPrimary: {
          backgroundColor: '#9196CA',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#7a7fb8',
          },
        },
        containedSecondary: {
          backgroundColor: '#7EC7B8',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#5cb2a0',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#9196CA',
          color: '#fff',
          fontWeight: 'bold',
        },
        body: {
          backgroundColor: '#fff',
          color: '#333',
        },
      },
    },
    // Autres composants
  },
})

// Définir les couleurs pour le mode sombre
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9196CA',
      contrastText: '#fff',
    },
    secondary: {
      main: '#7EC7B8',
      contrastText: '#fff',
    },
    background: {
      default: '#333',
      paper: '#424242',
    },
    text: {
      primary: '#fff',
      secondary: '#ccc',
    },
    divider: '#555',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#fff',
    },
    // Autres styles typographiques
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
        },
        containedPrimary: {
          backgroundColor: '#9196CA',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#7a7fb8',
          },
        },
        containedSecondary: {
          backgroundColor: '#7EC7B8',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#5cb2a0',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#9196CA',
          color: '#fff',
          fontWeight: 'bold',
        },
        body: {
          backgroundColor: '#424242',
          color: '#fff',
        },
      },
    },
    // Autres composants
  },
})

export { lightTheme, darkTheme }
