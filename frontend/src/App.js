import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css' // Assurez-vous que ce chemin est correct
import ScrollToTop from './components/utils/ScrollToTop'
import { Outlet } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from './theme'
import { ThemeProvider, useTheme } from './ThemeContext'

const AppContent = () => {
  const { isDarkMode } = useTheme()

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
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
