import { createTheme } from '@mui/material/styles'

// Déclinaisons de couleurs
const primary = {
  light: '#B0B4E6',
  main: '#9196CA',
  dark: '#7479AD',
  contrastText: '#fff',
}

const secondary = {
  light: '#A5E5D1',
  main: '#7EC7B8',
  dark: '#61A99B',
  contrastText: '#fff',
}

const neutral = {
  light: '#f5f5f5',
  main: '#e0e0e0',
  dark: '#bdbdbd',
}

// Typographies
const typography = {
  fontFamily: 'Lato, Arial, sans-serif',
  h1: {
    fontFamily: 'Animated, Arial, sans-serif',
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#333',
  },
  h2: {
    fontFamily: 'Animated, Arial, sans-serif',
    fontSize: '2rem',
    fontWeight: 600,
    color: '#333',
  },
  h3: {
    fontFamily: 'Animated, Arial, sans-serif',
    fontSize: '1.75rem',
    fontWeight: 500,
    color: '#333',
  },
  body1: {
    fontFamily: 'Lato, Arial, sans-serif',
    fontSize: '1rem',
    fontWeight: 400,
    color: '#333',
  },
  body2: {
    fontFamily: 'Lato, Arial, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 400,
    color: '#666',
  },
}

// Composants MUI personnalisés
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 4,
        textTransform: 'none',
      },
      containedPrimary: {
        backgroundColor: primary.main,
        color: primary.contrastText,
        '&:hover': {
          backgroundColor: primary.dark,
        },
      },
      containedSecondary: {
        backgroundColor: secondary.main,
        color: secondary.contrastText,
        '&:hover': {
          backgroundColor: secondary.dark,
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        backgroundColor: primary.main,
        color: primary.contrastText,
        fontWeight: 'bold',
      },
      body: {
        backgroundColor: '#fff',
        color: '#333',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      colorPrimary: {
        backgroundColor: primary.main,
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: primary.light,
      },
    },
  },
}

// Thème clair
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: primary,
    secondary: secondary,
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
    divider: neutral.main,
  },
  typography: typography,
  components: components,
})

// Thème sombre
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: primary,
    secondary: secondary,
    background: {
      default: '#333',
      paper: '#424242',
    },
    text: {
      primary: '#fff',
      secondary: '#ccc',
    },
    divider: neutral.dark,
  },
  typography: {
    ...typography,
    h1: {
      ...typography.h1,
      color: '#fff',
    },
    h2: {
      ...typography.h2,
      color: '#fff',
    },
    h3: {
      ...typography.h3,
      color: '#fff',
    },
    body1: {
      ...typography.body1,
      color: '#fff',
    },
    body2: {
      ...typography.body2,
      color: '#ccc',
    },
  },
  components: {
    ...components,
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: primary.main,
          color: primary.contrastText,
          fontWeight: 'bold',
        },
        body: {
          backgroundColor: '#424242',
          color: '#fff',
        },
      },
    },
  },
})

export { lightTheme, darkTheme }
