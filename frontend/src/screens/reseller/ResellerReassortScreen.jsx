import React from 'react'
import { useSelector } from 'react-redux'
import { useGetStockmovementsQuery } from '../../slices/dolibarr/dolliStockmovementApiSlice'
import { useGetResellerProfileQuery } from '../../slices/userApiSlice'
import { useGetProductsQuery } from '../../slices/productApiSlice'
import Loader from '../FeedbackScreens/Loader'
import Button from '../../components/shared/Button'
import { PlusCircleIcon } from 'lucide-react'

// Fonction utilitaire pour formater la date
const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000) // Convertir timestamp (secondes) en millisecondes
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Fonction pour obtenir le nom du produit en fonction de son product_id
const getProductName = (productId, products) => {
  const product = products.find((p) => p.dolibarrId === productId)
  return product ? product.name : 'Inconnu'
}

// Fonction pour obtenir la première image du produit en fonction de son product_id
const getProductImage = (productId, products) => {
  const product = products.find((p) => p.dolibarrId === productId)
  return product && product.images.length > 0
    ? product.images[0]
    : '/path/to/default-image.jpg' // Remplacez par l'URL de l'image par défaut si nécessaire
}

const ResellerReassortScreen = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const {
    data: resellerProfile,
    error: resellerProfileError,
    isLoading: resellerProfileLoading,
  } = useGetResellerProfileQuery(userInfo._id)
  const {
    data: stockMovements,
    error: stockMovementsError,
    isLoading: stockMovementsLoading,
  } = useGetStockmovementsQuery()
  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery()

  // Filtrer les mouvements de stock en fonction de l'ID d'entrepôt et du type
  const filteredStockMovements =
    stockMovements?.filter(
      (movement) =>
        movement.type === '0' &&
        movement.warehouse_id === resellerProfile?.dollibarWarehousId,
    ) || []

  if (resellerProfileLoading || stockMovementsLoading || productsLoading) {
    return <Loader />
  }

  if (resellerProfileError || stockMovementsError || productsError) {
    return (
      <p className="text-red-500">
        Erreur :{' '}
        {resellerProfileError?.message ||
          stockMovementsError?.message ||
          productsError?.message}
      </p>
    )
  }

  return (
    <div>
      <div className='mb-6'>
        <h1 className="text-xl">Livraison & Réassort</h1>
        <p className="text-sm">
          Cette page vous permet de soumettre des demandes de réassort et suivre
          les livraisons de produits <strong>Krysto</strong> effectuées dans
          votre boutique.
        </p>
      </div>

      <div className="flex items-center justify-between">

      <h3 className="text-xl">Livraisons</h3>
      <Button icon={PlusCircleIcon}>Demande de réassort</Button>
      </div>

      <table className="min-w-full divide-y divide-gray-200 mt-2">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-primaryColor uppercase tracking-wider"
            >
              Produit
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-primaryColor uppercase tracking-wider"
            >
              Quantité
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-primaryColor uppercase tracking-wider"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredStockMovements.length > 0 ? (
            filteredStockMovements.map((movement) => (
              <tr key={movement.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-4">
                  <img
                    src={getProductImage(movement.product_id, products)}
                    alt="Produit"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <strong>
                    {getProductName(movement.product_id, products)}{' '}
                  </strong>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  + {movement.qty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(movement.datem)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                Aucun mouvement de stock à afficher
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ResellerReassortScreen
