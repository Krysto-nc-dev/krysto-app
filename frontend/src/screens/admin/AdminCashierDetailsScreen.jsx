import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { useGetCashierByIdQuery, useAddSaleMutation, useCloseCashierMutation } from '../../slices/cashierApiSlice'
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice'
import { toast } from 'react-toastify'

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
  } = useGetCashierByIdQuery(cashierId)

  const {
    data: products,
    error: productError,
    isLoading: loadingProducts,
  } = useGetProductsQuery({
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

  const getProductLabel = (productId) => {
    const product = products.find((p) => p.id === productId)
    return product ? product.label : 'Produit inconnu'
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
        title: 'Achat divers', // Ajoutez le titre si nécessaire
        products: filteredProducts,
      },
    }

    try {
      await addSale({ cashierId, sale: saleData })
      console.log('Sale added successfully')
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
      console.error('Error adding sale:', error)
      toast.error('Une erreur est survenue lors de la création de la vente.')
    }
  }

  const handleCloseCashier = async () => {
    if (cashierDetails && cashierDetails.status === 'Ouvert') {
      try {
        await closeCashier(cashierId)
        toast.success('Caisse fermée et ventes enregistrées.')
      } catch (error) {
        console.error('Error closing cashier:', error)
        toast.error('Une erreur est survenue lors de la fermeture de la caisse.')
      }
    } else {
      toast.error('La caisse est déjà fermée.')
    }
  }

  if (loadingCashierDetails || loadingProducts) {
    return <Loader />
  }

  const placePrice = cashierDetails && cashierDetails.placePrice
  const totalSales = cashierDetails && cashierDetails.totalSales

  const progressPercentage = (totalSales / placePrice) * 100

  let realGain = totalSales - placePrice
  let realGainClass = realGain >= 0 ? 'text-green-500' : 'text-red-500'

  return (
    <div className="mx-auto p-4 max-w-9xl">
      <div className="rounded-lg shadow-md p-6 bg-gray-700 text-textColor">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-primaryColor">
                {progressPercentage.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-6 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${progressPercentage}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap justify-center ${
                progressPercentage >= 100
                  ? 'bg-green-500'
                  : progressPercentage >= 50
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              } text-white`}
            ></div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-5">
          <div className="text-gray-200">
            {cashierDetails && cashierDetails.title}
          </div>
          <div className="mb-4">
            <span
              className={`px-2 py-1 rounded ${
                cashierDetails && cashierDetails.status === 'Ouvert'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {cashierDetails && cashierDetails.status === 'Ouvert'
                ? 'Ouvert'
                : 'Fermé'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmitSale}>
          <details className="group">
            <summary className="font-medium cursor-pointer text-lg">
              Informations du Client
            </summary>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-textColor text-sm">
                  Prénom du Client
                </label>
                <input
                  type="text"
                  name="clientFirstname"
                  value={formData.clientFirstname}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                  disabled={cashierDetails && cashierDetails.status !== 'Ouvert'}
                />
              </div>
              <div>
                <label className="block text-textColor text-sm">
                  Nom du Client
                </label>
                <input
                  type="text"
                  name="clientLastname"
                  value={formData.clientLastname}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                  disabled={cashierDetails && cashierDetails.status !== 'Ouvert'}
                />
              </div>
              <div>
                <label className="block text-textColor text-sm">
                  Email du Client
                </label>
                <input
                  type="email"
                  name="clientMail"
                  value={formData.clientMail}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                  disabled={cashierDetails && cashierDetails.status !== 'Ouvert'}
                />
              </div>
              <div>
                <label className="block text-textColor text-sm">Ville</label>
                <input
                  type="text"
                  name="clientCity"
                  value={formData.clientCity}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                  disabled={cashierDetails && cashierDetails.status !== 'Ouvert'}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="touriste"
                  checked={formData.touriste}
                  onChange={handleChange}
                  className="rounded text-primaryColor"
                  disabled={cashierDetails && cashierDetails.status !== 'Ouvert'}
                />
                <label className="text-textColor text-sm">Touriste</label>
              </div>
              <div>
                <label className="block text-textColor text-sm">Pays</label>
                <input
                  type="text"
                  name="clientCountry"
                  value={formData.clientCountry}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                  disabled={cashierDetails && cashierDetails.status !== 'Ouvert'}
                />
              </div>
              <div>
                <label className="block text-textColor text-sm">Méthode de Paiement</label>
                <input
                  type="text"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                  disabled={cashierDetails && cashierDetails.status !== 'Ouvert'}
                />
              </div>
            </div>
          </details>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-textColor">
              <thead>
                <tr>
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
                        className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                        disabled={cashierDetails && cashierDetails.status !== 'Ouvert'}
                      />
                    </td>
                    <td className="px-4 py-2">
                      {product.subTotal.toFixed(2)}€
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right mt-4">
            <span className="text-lg font-bold text-textColor">Total: {calculateTotalSale().toFixed(2)}€</span>
          </div>
          <div className="text-right mt-4">
            <button
              type="submit"
              className={`bg-primaryColor text-white py-2 px-4 rounded ${
                cashierDetails && cashierDetails.status === 'Ouvert'
                  ? ''
                  : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={cashierDetails && cashierDetails.status !== 'Ouvert'}
            >
              {addingSale ? 'Ajout en cours...' : 'Ajouter Vente'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={handleCloseCashier}
            className="bg-red-500 text-white py-2 px-4 rounded"
            disabled={cashierDetails && cashierDetails.status !== 'Ouvert'}
          >
            {closingCashier ? 'Fermeture en cours...' : 'Fermer Caisse'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCashierDetailsScreen
