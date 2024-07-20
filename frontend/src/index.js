import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js' // Assurez-vous que cet export est disponible
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
import AdminDashboardLayout from './components/layout/adminLayout/AdminDashboardLayout'
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen'
import InitiationsScreen from './screens/InitiationsScreen'
import ContactScreen from './screens/ContactScreen'
import AdminThirdpartiesScreen from './screens/admin/AdminThirdpartiesScreen'
import AdminContactsScreen from './screens/admin/AdminContactsScreen'
import AdminMailsBankScreen from './screens/admin/AdminMaisBankScreen'
import AdminDoliProductsScreen from './screens/admin/AdminDoliProductsScreen'
import AdminWarehousesScreen from './screens/admin/AdminWarehousesScreen'
import AdminPropalsScreen from './screens/admin/AdminPropalsScreen'
import AdminBillingsscreen from './screens/admin/AdminBillingsscreen'
import AdminSupplierInvoicesScreen from './screens/admin/AdminSupplierInvoicesScreen'
import AdminBanksScreen from './screens/admin/AdminBanksScreen'
import AdminCashiersScreen from './screens/admin/AdminCashiersScreen'
import AdminEquipmentsScreen from './screens/admin/AdminEquipmentsScreen'
import AdminPlasticsScreen from './screens/admin/AdminPlasticsScreen'
import AdminRecyclableProductsScreen from './screens/admin/AdminRecyclableProductsScreen'
import AdminCollectCampagnesScreen from './screens/admin/AdminCollectCampagnesScreen'
import AdminPlasticsPalletsScreen from './screens/admin/AdminPlasticsPalletsScreen'
import AdminColorRecipesScreen from './screens/admin/AdminColorRecipesScreen'
import AdminAgendaScreen from './screens/admin/AdminAgendaScreen'
import AdminProjectsScreen from './screens/admin/AdminProjectsScreen'
import AdminPresentationsScreen from './screens/admin/AdminPresentationsScreen'
import AdminWathMonitoringScreen from './screens/admin/AdminWathMonitoringScreen'
import CartScreen from './screens/CartScreen'
import RegisterScreen from './screens/RegisterScreen'
import UserLayout from './components/layout/userLayout/UserLayout'
import ProfileScreen from './screens/user/ProfileScreen'
import ShippingScreen from './screens/user/ShippingScreen'
import PaymentScreen from './screens/user/PaymentScreen'
import UserDashboardScreen from './screens/user/UserDashboardScreen'
import PartnerDashboardScreen from './screens/partner/PartnerDashboardScreen'
import PlaceOrderScreen from './screens/user/PlaceOrderScreen'
import AdminWebsiteScreen from './screens/admin/AdminWebsiteScreen'
import OrderDetailsScreen from './screens/user/OrderDetailsScreen'

import AdminWebsiteOrdersScreen from './screens/admin/AdminWebsiteOrdersScreen'
import AdminWebsiteUsersScreen from './screens/admin/AdminWebsiteUsersScreen'
import AdminWebsiteProductsScreen from './screens/admin/AdminWebsiteProductsScreen'
import AdminDolibarrProductDetailsScreen from './screens/admin/AdminDolibarrProductDetailsScreen'
import AdminWebsiteProductEditScreen from './screens/admin/AdminWebsiteProductEditScreen'
import AdminWebsiteBlogScreen from './screens/admin/AdminWebsiteBlogScreen'
import AdminWebsiteUserEditScreen from './screens/admin/AdminWebsiteUserEditScreen'
import AdminWebsiteArticleEditScreen from './screens/admin/AdminWebsiteArticleEditScreen'
import ArticleDetailsScreen from './screens/ArticleDetailsScreen'

import AdminPlasticTypeEditScreen from './screens/admin/AdminPlasticTypeEditScreen'
import AdminPlasticDetailsScreen from './screens/admin/AdminPlasticDetailsScreen'
import AdminPlasticColorsScreen from './screens/admin/AdminPlasticColorsScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/inscription" element={<RegisterScreen />} />
        <Route path="/connexion" element={<LoginScreen />} />
        <Route path="/a-propos" element={<AboutScreen />} />
        <Route path="/initiations" element={<InitiationsScreen />} />
        <Route path="/blog" element={<ArticlesScreen />} />
        <Route path="/article-details/:id" element={<ArticleDetailsScreen />} />
        <Route path="/contacts" element={<ContactScreen />} />
        <Route path="/krysto-shop" element={<ProductsScreen />} />
        <Route path="/pannier" element={<CartScreen />} />
        <Route path="/produit/:id" element={<ProductDetailsScreen />} />
      </Route>

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route
          path="/partenaire-dashboard"
          element={<PartnerDashboardScreen />}
        />
      </Route>

      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/" element={<AdminDashboardLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboardScreen />} />
          <Route path="/admin-tiers" element={<AdminThirdpartiesScreen />} />
          <Route
            path="/admin-mails-repertoire"
            element={<AdminMailsBankScreen />}
          />
          <Route
            path="/admin-dollibarr-products"
            element={<AdminDoliProductsScreen />}
          />
          <Route
            path="admin-dollibarr-products-details/:id"
            element={<AdminDolibarrProductDetailsScreen />}
          />
          <Route path="/admin-entrepots" element={<AdminWarehousesScreen />} />
          <Route
            path="/admin-propositions-commercial"
            element={<AdminPropalsScreen />}
          />
          <Route path="/admin-facturation" element={<AdminBillingsscreen />} />
          <Route
            path="/admin-facturations-fournisseurs"
            element={<AdminSupplierInvoicesScreen />}
          />
          <Route
            path="/admin-comptes-bancaire"
            element={<AdminBanksScreen />}
          />
          <Route path="/admin-caisses" element={<AdminCashiersScreen />} />
          <Route
            path="/admin-equipements"
            element={<AdminEquipmentsScreen />}
          />
          <Route path="/admin-plastiques" element={<AdminPlasticsScreen />} />
          <Route
            path="/admin/plastic-type-modifier/:id"
            element={<AdminPlasticTypeEditScreen />}
          />
          <Route
            path="/admin/plastic-type-details/:id"
            element={<AdminPlasticDetailsScreen />}
          />
          <Route
            path="/admin-plastique-colors"
            element={<AdminPlasticColorsScreen />}
          />
          <Route
            path="/admin-campagnes-collecte"
            element={<AdminCollectCampagnesScreen />}
          />
          <Route
            path="/admin-produits-recyclable"
            element={<AdminRecyclableProductsScreen />}
          />
          <Route
            path="/admin-paillettes-plastique"
            element={<AdminPlasticsPalletsScreen />}
          />
          <Route
            path="/admin-recettes-couleur"
            element={<AdminColorRecipesScreen />}
          />
          <Route
            path="/admin-administration-du-site"
            element={<AdminWebsiteScreen />}
          />
          <Route
            path="/admin/website/commandes"
            element={<AdminWebsiteOrdersScreen />}
          />
          <Route
            path="/admin/website/utilisateurs"
            element={<AdminWebsiteUsersScreen />}
          />
          <Route
            path="/admin/website/produits"
            element={<AdminWebsiteProductsScreen />}
          />
          <Route
            path="/admin/website/blog-articles"
            element={<AdminWebsiteBlogScreen />}
          />
          <Route
            path="/admin/website/modifier-produit/:id"
            element={<AdminWebsiteProductEditScreen />}
          />
          <Route
            path="/admin/website/modifier-utilisateur/:id"
            element={<AdminWebsiteUserEditScreen />}
          />
          <Route
            path="/admin/website/modifier-article/:id"
            element={<AdminWebsiteArticleEditScreen />}
          />
          <Route path="/admin-agenda" element={<AdminAgendaScreen />} />
          <Route path="/admin-projets" element={<AdminProjectsScreen />} />
          <Route
            path="/admin-presentations"
            element={<AdminPresentationsScreen />}
          />
          <Route
            path="/admin-veilles"
            element={<AdminWathMonitoringScreen />}
          />
          {/* Route générique pour gérer toutes les autres routes non définies */}
        </Route>
      </Route>

      {/* Users */}
      <Route path="" element={<UserRoute />}>
        <Route path="/" element={<UserLayout />}>
          <Route
            path="/utilisateur-dashboard"
            element={<UserDashboardScreen />}
          />
          <Route path="/adresse-de-livraison" element={<ShippingScreen />} />
          <Route path="/paiment" element={<PaymentScreen />} />
          <Route path="/commande/:id" element={<OrderDetailsScreen />} />
          <Route path="/validation-commande" element={<PlaceOrderScreen />} />
          <Route path="/mon-profile" element={<ProfileScreen />} />
        </Route>
      </Route>

      {/* Route générique pour gérer toutes les autres routes non définies */}
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
)
