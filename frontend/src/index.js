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
import AdminPlasticColorDetailsScreen from './screens/admin/AdminPlasticColorDetailsScreen'
import AdminPlasticColorEditScreen from './screens/admin/AdminPlasticColorEditScreen'
import AdminColorCalculatorScreen from './screens/admin/AdminColorCalculatorScreen'
import AdminRecyclableProductEditScreen from './screens/admin/AdminRecyclableProductEditScreen'
import AdminRecyclableProductDetailsScreen from './screens/admin/AdminRecyclableProductDetailsScreen'
import AdminProjectEditScreen from './screens/admin/AdminProjectEditScreen'
import AdminProjectDetailsScreen from './screens/admin/AdminProjectDetailsScreen'
import AdminDoliProductScreen from './screens/admin/AdminDoliProductsScreen'
import AdminDollibarNewProductScreen from './screens/admin/AdminDollibarNewProductScreen'
import AdminDolibarrNewThidpartyScreen from './screens/admin/AdminDolibarrNewThidpartyScreen'
import AdminEquipmentDetailsScreen from './screens/admin/AdminEquipmentDetailsScreen'
import AdminEquipmentEditScreen from './screens/admin/AdminEquipmentEditScreen'
import AdminCampagneCollectDetailsScreen from './screens/admin/AdminCampagneCollectDetailsScreen'
import AdminCampagneCollectEditScreen from './screens/admin/AdminCampagneCollectEditScreen'
import AdminCashierDetailsScreen from './screens/admin/AdminCashierDetailsScreen'
import AdminPresentationEditScreen from './screens/admin/AdminPresentationEditScreen'
import AdminWatchMonitoringDetailsScreen from './screens/admin/AdminWatchMonitoringDetailsScreen'
import AdminSupportScreen from './screens/admin/AdminSupportScreen'
import AdminSettingsScreen from './screens/admin/AdminSettingsScreen'
import AdminWasteTypesScreen from './screens/admin/AdminWasteTypesScreen'
import AdminWasteTypeDetailsScreen from './screens/admin/AdminWasteTypeDetailsScreen'
import PartnerRoute from './components/utils/PartnerRoute'
import PartnerDashboardLayout from './components/layout/partnerLayout/PartnerDashboardLayout'

import ResellerDashboardScreen from './screens/reseller/ResellerDashboardScreen'
import ResellerRoute from './components/utils/ResellerRoute'
import ResellerDashboardLayout from './components/layout/resellerLayout/ResellerDashboardLayout'
import ResellerCatalogueScreen from './screens/reseller/ResellerCatalogueScreen'

import ResellerStockScreen from './screens/reseller/ResellerStockScreen'
import ResellerReassortScreen from './screens/reseller/ResellerReassortScreen'
import ResellerSalesScreen from './screens/reseller/ResellerSalesScreen'
import ResellerCollectesScreen from './screens/reseller/ResellerCollectesScreen'
import ResellerQuoteScreeen from './screens/reseller/ResellerQuoteScreeen'
import ResellerBillsScreen from './screens/reseller/ResellerBillsScreen'
import ResellerSettingsScreen from './screens/reseller/ResellerSettingsScreen'
import ResellerSupportsScreen from './screens/reseller/ResellerSupportsScreen'
import ResellerProfileScreen from './screens/reseller/ResellerProfileScreen'
import ResellerDocumentionScreen from './screens/reseller/ResellerDocumentionScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'

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
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/produit/:id" element={<ProductDetailsScreen />} />
      </Route>

      {/* users with role reseller */}
      <Route path="" element={<ResellerRoute />}>
        <Route path="/" element={<ResellerDashboardLayout />}>
          <Route
            path="/revendeur-dashboard"
            element={<ResellerDashboardScreen />}
          />
          <Route
            path="/revendeur-catalogue"
            element={<ResellerCatalogueScreen />}
          />
          <Route
            path="/revendeur-paramétres"
            element={<ResellerSettingsScreen />}
          />
          <Route
            path="/revendeur-stock-reel"
            element={<ResellerStockScreen />}
          />
          <Route
            path="/revendeur-demande-reassorts"
            element={<ResellerReassortScreen />}
          />
          <Route
            path="/revendeur-support"
            element={<ResellerSupportsScreen />}
          />
          <Route path="/revendeur-ventes" element={<ResellerSalesScreen />} />
          <Route
            path="/revendeur-profile"
            element={<ResellerProfileScreen />}
          />
          <Route
            path="/revendeur-documentation"
            element={<ResellerDocumentionScreen />}
          />
          <Route
            path="/revendeur-collectes"
            element={<ResellerCollectesScreen />}
          />
          <Route path="/revendeur-devis" element={<ResellerQuoteScreeen />} />
          <Route path="/revendeur-factures" element={<ResellerBillsScreen />} />
        </Route>
      </Route>
      {/* users with role partner  */}
      <Route path="" element={<PartnerRoute />}>
        <Route path="/" element={<PartnerDashboardLayout />}>
          <Route
            path="/partenaire-dashboard"
            element={<PartnerDashboardScreen />}
          />
        </Route>
      </Route>

      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/" element={<AdminDashboardLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboardScreen />} />
          <Route path="/admin-settings" element={<AdminSettingsScreen />} />
          <Route path="/admin-tiers" element={<AdminThirdpartiesScreen />} />
          <Route
            path="/admin-dolibarr-nouveaux-tier"
            element={<AdminDolibarrNewThidpartyScreen />}
          />
          <Route
            path="/admin-types-de-dechets"
            element={<AdminWasteTypesScreen />}
          />
          <Route
            path="/admin-types-de-dechet-detail/:id"
            element={<AdminWasteTypeDetailsScreen />}
          />
          <Route
            path="/admin-mails-repertoire"
            element={<AdminBanksScreen />}
          />
          <Route
            path="/admin-dollibarr-products"
            element={<AdminDoliProductsScreen />}
          />

          <Route
            path="/admin-dolibarr-nouveaux-produit"
            element={<AdminDollibarNewProductScreen />}
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
            path="/admin-caisse-details/:id"
            element={<AdminCashierDetailsScreen />}
          />
          <Route
            path="/admin-equipements"
            element={<AdminEquipmentsScreen />}
          />
          <Route
            path="/admin-equipement-details/:id"
            element={<AdminEquipmentDetailsScreen />}
          />
          <Route
            path="/admin-equipement-edit/:id"
            element={<AdminEquipmentEditScreen />}
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
            path="/admin-color-calculator"
            element={<AdminColorCalculatorScreen />}
          />
          <Route
            path="/admin-plastique-colors"
            element={<AdminPlasticColorsScreen />}
          />
          <Route
            path="/admin-plastique-couleurs-details/:id"
            element={<AdminPlasticColorDetailsScreen />}
          />
          <Route
            path="/admin-plastique-couleurs-edit/:id"
            element={<AdminPlasticColorEditScreen />}
          />
          <Route
            path="/admin/recyclable-product-details/:id"
            element={<AdminRecyclableProductDetailsScreen />}
          />
          <Route
            path="/admin/recyclable-product-edit/:id"
            element={<AdminRecyclableProductEditScreen />}
          />
          <Route
            path="/admin-campagnes-collecte"
            element={<AdminCollectCampagnesScreen />}
          />
          <Route
            path="/admin-campagne-collecte-details/:id"
            element={<AdminCampagneCollectDetailsScreen />}
          />
          <Route
            path="/admin-campagne-collecte-edit/:id"
            element={<AdminCampagneCollectEditScreen />}
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
            path="/admin-projet-details/:id"
            element={<AdminProjectDetailsScreen />}
          />
          <Route
            path="/admin-projet/edit/:id"
            element={<AdminProjectEditScreen />}
          />
          <Route
            path="/admin-presentations"
            element={<AdminPresentationsScreen />}
          />
          <Route
            path="/admin-presentation-edit/:id"
            element={<AdminPresentationEditScreen />}
          />
          <Route
            path="/admin-veilles"
            element={<AdminWathMonitoringScreen />}
          />
          <Route
            path="/admin-veille-details/:id"
            element={<AdminWatchMonitoringDetailsScreen />}
          />
          <Route path="/admin-support" element={<AdminSupportScreen />} />
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
