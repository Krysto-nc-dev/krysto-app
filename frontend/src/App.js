import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css' // Assurez-vous que ce chemin est correct
import ScrollToTop from './components/utils/ScrollToTop'

import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ScrollToTop />
        <div>
          <div>
            <Outlet />
          </div>
        </div>
        <ToastContainer />
      </ThemeProvider>
    </div>
  )
}

export default App
