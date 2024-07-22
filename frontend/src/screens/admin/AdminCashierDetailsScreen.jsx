import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { useGetCashierByIdQuery, useAddSaleMutation, useCloseCashierMutation } from '../../slices/cashierApiSlice'
import { toast } from 'react-toastify'
import { useGetDolliProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice'

const UserCashierDetailsScreen = () => {
  const { id: cashierId } = useParams()
  const [formData, setFormData] = useState({
    clientFirstname: '',
    clientLastname: '',
    clientMail: '',
    clientCity: '',
    touriste: false,
    clientCountry: 'Nouvelle-Calédonie',
    paymentMethod: 'Espèces',
    products: [],
  })

  const {
    data: cashierDetails,
    error: errorCashierDetails,
    isLoading: loadingCashierDetails,
    refetch
  } = useGetCashierByIdQuery(cashierId)

  const {
    data: products,
    error: productError,
    isLoading: loadingProducts,
  } = useGetDolliProductsQuery({
    mode: '1',
    variant_filter: '1',
  })

  const [addSale, { isLoading: addingSale }] = useAddSaleMutation()
  const [closeCashier, { isLoading: closingCashier }] = useCloseCashierMutation()

  useEffect(() => {
    if (products) {
      const initialProductsState = products.map((product) => ({
        productId: product.id,
        unitPrice: parseFloat(product.price) || 0,
        quantity: 0,
        subTotal: 0,
        label: product.label,
        ref: product.ref,
      }))
      setFormData((prevState) => ({
        ...prevState,
        products: initialProductsState,
      }))
    }
  }, [products])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }))
  }

  const handleProductChange = (productId, unitPriceStr, quantity) => {
    const unitPrice = parseFloat(unitPriceStr)

    const updatedProducts = formData.products.map((product) =>
      product.productId === productId
        ? { ...product, quantity, subTotal: unitPrice * quantity }
        : product,
    )

    setFormData((prevState) => ({
      ...prevState,
      products: updatedProducts,
    }))
  }

  const calculateTotalSale = () => {
    return formData.products.reduce(
      (total, product) => total + product.subTotal,
      0,
    )
  }

  const handleSubmitSale = async (e) => {
    e.preventDefault()

    const filteredProducts = formData.products
      .filter((product) => product.quantity > 0)
      .map((product) => ({
        productID: product.productId,
        unitPrice: product.unitPrice,
        quantity: product.quantity,
      }))

    const saleData = {
      sale: {
        clientFirstname: formData.clientFirstname,
        clientLastname: formData.clientLastname,
        clientMail: formData.clientMail,
        clientCity: formData.clientCity,
        touriste: formData.touriste,
        clientCountry: formData.clientCountry,
        title: 'Achat divers',
        products: filteredProducts,
      },
    }

    try {
      await addSale({ cashierId, sale: saleData })
      toast.success('Vente ajoutée avec succès.')
      setFormData({
        clientFirstname: '',
        clientLastname: '',
        clientMail: '',
        clientCity: '',
        touriste: false,
        clientCountry: 'Nouvelle-Calédonie',
        paymentMethod: 'Espèces',
        products: formData.products.map((product) => ({
          ...product,
          quantity: 0,
          subTotal: 0,
        })),
      })
    } catch (error) {
      toast.error('Une erreur est survenue lors de la création de la vente.')
    }
  }

  const handleCloseCashier = async () => {
    if (cashierDetails && cashierDetails.status === 'Ouvert') {
      try {
        await closeCashier(cashierId)
        toast.success('Caisse fermée et ventes enregistrées.')
        refetch()
      } catch (error) {
        toast.error('Une erreur est survenue lors de la fermeture de la caisse.')
      }
    } else {
      toast.error('La caisse est déjà fermée.')
    }
  }

  if (loadingCashierDetails || loadingProducts) {
    return <Loader />
  }

  const placePrice = cashierDetails?.placePrice || 0
  const totalSales = cashierDetails?.totalSales || 0

  const progressPercentage = (totalSales / placePrice) * 100
  const realGain = totalSales - placePrice
  const realGainClass = realGain >= 0 ? 'text-green-500' : 'text-red-500'

  return (
    <div className="mx-auto p-2 max-w-9xl bg-white shadow-lg rounded-lg">
      <div className="p-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-primaryColor">
              {progressPercentage.toFixed(2)}%
            </span>
            <div className="w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPercentage}%` }}
                className={`h-2 rounded-full ${
                  progressPercentage >= 100
                    ? 'bg-green-500'
                    : progressPercentage >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{cashierDetails?.title || 'Détails de la Caisse'}</h2>
          <span className={`px-3 py-1 rounded-full text-white ${
            cashierDetails?.status === 'Ouvert' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {cashierDetails?.status === 'Ouvert' ? 'Ouvert' : 'Fermé'}
          </span>
        </div>

        <form onSubmit={handleSubmitSale}>
          <details className="group mb-6">
            <summary className="cursor-pointer font-medium text-lg text-blue-600">
              Informations du Client
            </summary>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {['Prénom', 'Nom', 'Email', 'Ville', 'Pays', 'Méthode de Paiement'].map((label, index) => (
                <div key={index}>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    {label} du Client
                  </label>
                  <input
                    type={label === 'Email' ? 'email' : 'text'}
                    name={`client${label.replace(' ', '')}`}
                    value={formData[`client${label.replace(' ', '')}`]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 text-sm"
                    disabled={cashierDetails?.status !== 'Ouvert'}
                  />
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="touriste"
                  checked={formData.touriste}
                  onChange={handleChange}
                  className="rounded text-primaryColor"
                  disabled={cashierDetails?.status !== 'Ouvert'}
                />
                <label className="text-gray-700 text-sm">Touriste</label>
              </div>
            </div>
          </details>

          <div className="overflow-x-auto mb-6">
            <table className="table-auto w-full bg-gray-50 border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-2 text-left">Produit</th>
                  <th className="px-4 py-2 text-left">Prix Unitaire</th>
                  <th className="px-4 py-2 text-left">Quantité</th>
                  <th className="px-4 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {formData.products.map((product) => (
                  <tr key={product.productId}>
                    <td className="px-4 py-2">{product.label}</td>
                    <td className="px-4 py-2">{product.unitPrice.toFixed(2)}€</td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductChange(product.productId, product.unitPrice, parseInt(e.target.value, 10))
                        }
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-sm"
                        disabled={cashierDetails?.status !== 'Ouvert'}
                      />
                    </td>
                    <td className="px-4 py-2">{product.subTotal.toFixed(2)}€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right mb-6">
            <span className="text-lg font-semibold text-gray-800">
              Total: {calculateTotalSale().toFixed(2)}€
            </span>
          </div>

          <div className="flex justify-end mb-6">
            <button
              type="submit"
              className={`bg-primaryColor text-white py-2 px-6 rounded-lg font-semibold ${
                cashierDetails?.status === 'Ouvert' ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={cashierDetails?.status !== 'Ouvert'}
            >
              {addingSale ? 'Ajout en cours...' : 'Ajouter Vente'}
            </button>
          </div>
        </form>

        <div className="flex justify-center">
          <button
            onClick={handleCloseCashier}
            className={`bg-red-500 text-white py-2 px-6 rounded-lg font-semibold ${
              cashierDetails?.status === 'Ouvert' ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={cashierDetails?.status !== 'Ouvert'}
          >
            {closingCashier ? 'Fermeture en cours...' : 'Fermer Caisse'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCashierDetailsScreen
