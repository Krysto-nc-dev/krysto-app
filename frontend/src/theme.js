import { createTheme } from '@mui/material/styles'
import merge from 'deepmerge'

// Couleurs personnalisées
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

const gray = {
  light: '#f5f5f5',
  main: '#949494',
  dark: '#333333',
}

const highlight = '#F5F5DC'
const muted = '#ecf3ff80'
const danger = '#E57373'
const warning = '#FFB74D'
const success = '#1c9222'

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
  h4: {
    fontFamily: 'Animated, Arial, sans-serif',
    fontSize: '1.125rem',
    fontWeight: 500,
    color: '#333',
  },
  h5: {
    fontFamily: 'Animated, Arial, sans-serif',
    fontSize: '1.0625rem',
    fontWeight: 500,
    color: '#333',
  },
  h6: {
    fontFamily: 'Animated, Arial, sans-serif',
    fontSize: '1rem',
    fontWeight: 500,
    color: '#333',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    color: '#333',
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    color: '#666',
  },
  button: {
    textTransform: 'none',
  },
}

// Composants personnalisés
const components = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
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
  MuiLink: {
    defaultProps: {
      underline: 'hover',
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
      },
      filled: {
        textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
      }),
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
      default: '#9196CA',
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
const darkTheme = createTheme(
  merge(lightTheme, {
    palette: {
      mode: 'dark',
      background: {
        default: gray.dark,
        paper: '#424242',
      },
      text: {
        primary: '#fff',
        secondary: '#ccc',
      },
      divider: gray.main,
    },
    typography: {
      h1: { color: '#fff' },
      h2: { color: '#fff' },
      h3: { color: '#fff' },
      h4: { color: '#fff' },
      h5: { color: '#fff' },
      h6: { color: '#fff' },
      body1: { color: '#fff' },
      body2: { color: '#ccc' },
    },
    components: {
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
  }),
)

export { lightTheme, darkTheme }
