import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css' // Assurez-vous que ce chemin est correct
import ScrollToTop from './components/utils/ScrollToTop'
import { Outlet } from 'react-router-dom'
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { ThemeProvider, useThemeContext } from './ThemeContext'

const AppContent = () => {
  const { isDarkMode, theme } = useThemeContext()

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalise les styles de base */}
      <ScrollToTop />
      <div>
        <div>
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </MuiThemeProvider>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
