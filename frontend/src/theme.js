import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Couleur principale de votre thème
    },
    secondary: {
      main: '#dc004e', // Couleur secondaire de votre thème
    },
    background: {
      default: '#f5f5f5', // Couleur de fond par défaut
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#333', // Couleur de fond de la sidebar
        },
      },
    },
  },
})

export default theme
