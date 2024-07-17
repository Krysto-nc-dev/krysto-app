import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import App from './App'

import PrivateRoute from './components/utils/PrivateRoute'
import AdminRoute from './components/utils/AdminRoute'
import UserRoute from './components/utils/UserRoutes'
import HomeScreen from './screens/HomeScreen'
import NotFound from './screens/FeedbackScreens/NotFound'
import AboutScreen from './screens/AboutScreen'
import PublicLayout from './components/layout/publicLayout/PublicLayout'
import LoginScreen from './screens/LoginScreen'
import ArticlesScreen from './screens/ArticlesScreen'
import ProductsScreen from './screens/ProductsScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route index={true} path="/connexion" element={<LoginScreen />} />
        <Route path="/a-propos" element={<AboutScreen />} />
        <Route path="/blog" element={<ArticlesScreen />} />
        <Route path="/krysto-shop" element={<ProductsScreen />} />
        <Route path="/produit/:id" element={<ProductDetailsScreen />} />
      </Route>

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}></Route>

      {/* Admin users */}
      <Route path="" element={<AdminRoute />}></Route>

      {/* Users */}
      <Route path="" element={<UserRoute />}></Route>

      {/* Route générique pour gérer toutes les autres routes non définies */}
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
