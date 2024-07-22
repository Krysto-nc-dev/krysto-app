// import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { Loader } from 'lucide-react'
// import { useGetCashierByIdQuery, useAddSaleMutation, useCloseCashierMutation } from '../../slices/cashierApiSlice'
// import { toast } from 'react-toastify'
// import { useGetDolliProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice'

// const UserCashierDetailsScreen = () => {
//   const { id: cashierId } = useParams()
//   const [formData, setFormData] = useState({
//     clientFirstname: '',
//     clientLastname: '',
//     clientMail: '',
//     clientCity: '',
//     touriste: false,
//     clientCountry: 'Nouvelle-Calédonie',
//     paymentMethod: 'Espèces',
//     products: [],
//   })

//   const {
//     data: cashierDetails,
//     error: errorCashierDetails,
//     isLoading: loadingCashierDetails,
//     refetch
//   } = useGetCashierByIdQuery(cashierId)

//   const {
//     data: products,
//     error: productError,
//     isLoading: loadingProducts,
//   } = useGetDolliProductsQuery({
//     mode: '1',
//     variant_filter: '1',
//   })

//   const [addSale, { isLoading: addingSale }] = useAddSaleMutation()
//   const [closeCashier, { isLoading: closingCashier }] = useCloseCashierMutation()

//   useEffect(() => {
//     if (products) {
//       const initialProductsState = products.map((product) => ({
//         productId: product.id,
//         unitPrice: parseFloat(product.price) || 0,
//         quantity: 0,
//         subTotal: 0,
//         label: product.label,
//         ref: product.ref,
//       }))
//       setFormData((prevState) => ({
//         ...prevState,
//         products: initialProductsState,
//       }))
//     }
//   }, [products])

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     const newValue = type === 'checkbox' ? checked : value

//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: newValue,
//     }))
//   }

//   const handleProductChange = (productId, unitPriceStr, quantity) => {
//     const unitPrice = parseFloat(unitPriceStr)

//     const updatedProducts = formData.products.map((product) =>
//       product.productId === productId
//         ? { ...product, quantity, subTotal: unitPrice * quantity }
//         : product,
//     )

//     setFormData((prevState) => ({
//       ...prevState,
//       products: updatedProducts,
//     }))
//   }

//   const calculateTotalSale = () => {
//     return formData.products.reduce(
//       (total, product) => total + product.subTotal,
//       0,
//     )
//   }

//   const handleSubmitSale = async (e) => {
//     e.preventDefault()

//     const filteredProducts = formData.products
//       .filter((product) => product.quantity > 0)
//       .map((product) => ({
//         productID: product.productId,
//         unitPrice: product.unitPrice,
//         quantity: product.quantity,
//       }))

//     const saleData = {
//       sale: {
//         clientFirstname: formData.clientFirstname,
//         clientLastname: formData.clientLastname,
//         clientMail: formData.clientMail,
//         clientCity: formData.clientCity,
//         touriste: formData.touriste,
//         clientCountry: formData.clientCountry,
//         title: 'Achat divers',
//         products: filteredProducts,
//       },
//     }

//     try {
//       await addSale({ cashierId, sale: saleData })
//       toast.success('Vente ajoutée avec succès.')
//       setFormData({
//         clientFirstname: '',
//         clientLastname: '',
//         clientMail: '',
//         clientCity: '',
//         touriste: false,
//         clientCountry: 'Nouvelle-Calédonie',
//         paymentMethod: 'Espèces',
//         products: formData.products.map((product) => ({
//           ...product,
//           quantity: 0,
//           subTotal: 0,
//         })),
//       })
//     } catch (error) {
//       toast.error('Une erreur est survenue lors de la création de la vente.')
//     }
//   }

//   const handleCloseCashier = async () => {
//     if (cashierDetails && cashierDetails.status === 'Ouvert') {
//       try {
//         await closeCashier(cashierId)
//         toast.success('Caisse fermée et ventes enregistrées.')
//         refetch()
//       } catch (error) {
//         toast.error('Une erreur est survenue lors de la fermeture de la caisse.')
//       }
//     } else {
//       toast.error('La caisse est déjà fermée.')
//     }
//   }

//   if (loadingCashierDetails || loadingProducts) {
//     return <Loader />
//   }

//   const placePrice = cashierDetails?.placePrice || 0
//   const totalSales = cashierDetails?.totalSales || 0

//   const progressPercentage = (totalSales / placePrice) * 100
//   const realGain = totalSales - placePrice
//   const realGainClass = realGain >= 0 ? 'text-green-500' : 'text-red-500'

//   return (
//     <div className="mx-auto p-2 max-w-9xl bg-white shadow-lg rounded-lg">
//       <div className="p-6">
//         <div className="mb-4">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-xs font-semibold text-primaryColor">
//               {progressPercentage.toFixed(2)}%
//             </span>
//             <div className="w-full bg-gray-200 rounded-full overflow-hidden">
//               <div
//                 style={{ width: `${progressPercentage}%` }}
//                 className={`h-2 rounded-full ${
//                   progressPercentage >= 100
//                     ? 'bg-green-500'
//                     : progressPercentage >= 50
//                     ? 'bg-yellow-500'
//                     : 'bg-red-500'
//                 }`}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">{cashierDetails?.title || 'Détails de la Caisse'}</h2>
//           <span className={`px-3 py-1 rounded-full text-white ${
//             cashierDetails?.status === 'Ouvert' ? 'bg-green-500' : 'bg-red-500'
//           }`}>
//             {cashierDetails?.status === 'Ouvert' ? 'Ouvert' : 'Fermé'}
//           </span>
//         </div>

//         <form onSubmit={handleSubmitSale}>
//           <details className="group mb-6">
//             <summary className="cursor-pointer font-medium text-lg text-blue-600">
//               Informations du Client
//             </summary>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//               {['Prénom', 'Nom', 'Email', 'Ville', 'Pays', 'Méthode de Paiement'].map((label, index) => (
//                 <div key={index}>
//                   <label className="block text-gray-700 text-sm font-medium mb-1">
//                     {label} du Client
//                   </label>
//                   <input
//                     type={label === 'Email' ? 'email' : 'text'}
//                     name={`client${label.replace(' ', '')}`}
//                     value={formData[`client${label.replace(' ', '')}`]}
//                     onChange={handleChange}
//                     className="w-full p-2 border border-gray-300 rounded mt-1 text-sm"
//                     disabled={cashierDetails?.status !== 'Ouvert'}
//                   />
//                 </div>
//               ))}
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   name="touriste"
//                   checked={formData.touriste}
//                   onChange={handleChange}
//                   className="rounded text-primaryColor"
//                   disabled={cashierDetails?.status !== 'Ouvert'}
//                 />
//                 <label className="text-gray-700 text-sm">Touriste</label>
//               </div>
//             </div>
//           </details>

//           <div className="overflow-x-auto mb-6">
//             <table className="table-auto w-full bg-gray-50 border border-gray-200 rounded-lg shadow-md">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-700">
//                   <th className="px-4 py-2 text-left">Produit</th>
//                   <th className="px-4 py-2 text-left">Prix Unitaire</th>
//                   <th className="px-4 py-2 text-left">Quantité</th>
//                   <th className="px-4 py-2 text-left">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {formData.products.map((product) => (
//                   <tr key={product.productId}>
//                     <td className="px-4 py-2">{product.label}</td>
//                     <td className="px-4 py-2">{product.unitPrice.toFixed(2)}€</td>
//                     <td className="px-4 py-2">
//                       <input
//                         type="number"
//                         min="0"
//                         value={product.quantity}
//                         onChange={(e) =>
//                           handleProductChange(product.productId, product.unitPrice, parseInt(e.target.value, 10))
//                         }
//                         className="w-full p-2 border border-gray-300 rounded mt-1 text-sm"
//                         disabled={cashierDetails?.status !== 'Ouvert'}
//                       />
//                     </td>
//                     <td className="px-4 py-2">{product.subTotal.toFixed(2)}€</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="text-right mb-6">
//             <span className="text-lg font-semibold text-gray-800">
//               Total: {calculateTotalSale().toFixed(2)}€
//             </span>
//           </div>

//           <div className="flex justify-end mb-6">
//             <button
//               type="submit"
//               className={`bg-primaryColor text-white py-2 px-6 rounded-lg font-semibold ${
//                 cashierDetails?.status === 'Ouvert' ? '' : 'opacity-50 cursor-not-allowed'
//               }`}
//               disabled={cashierDetails?.status !== 'Ouvert'}
//             >
//               {addingSale ? 'Ajout en cours...' : 'Ajouter Vente'}
//             </button>
//           </div>
//         </form>

//         <div className="flex justify-center">
//           <button
//             onClick={handleCloseCashier}
//             className={`bg-red-500 text-white py-2 px-6 rounded-lg font-semibold ${
//               cashierDetails?.status === 'Ouvert' ? '' : 'opacity-50 cursor-not-allowed'
//             }`}
//             disabled={cashierDetails?.status !== 'Ouvert'}
//           >
//             {closingCashier ? 'Fermeture en cours...' : 'Fermer Caisse'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserCashierDetailsScreen

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SquareX } from 'lucide-react'
import {
  useGetCashierByIdQuery,
  useAddSaleMutation,
} from '../../slices/cashierApiSlice'

import { toast } from 'react-toastify'
import { useGetDolliProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice'
import Button from '../../components/shared/Button'
import Loader from '../FeedbackScreens/Loader'

const AdminCashierDetailsScreen = () => {
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
 console.log(cashierDetails);
  const {
    data: products,
    error: productError,
    isLoading: loadingProducts,
  } = useGetDolliProductsQuery({
    mode: '1',
    variant_filter: '1',
  })

  const [addSale, { isLoading: addingSale }] = useAddSaleMutation()

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
        paymentMethod: formData.paymentMethod,
        touriste: formData.touriste,
        clientCountry: formData.clientCountry,
        title: 'Achat divers', // Ajoutez le titre si nécessaire
        products: filteredProducts,
      },
    }

    try {
      await addSale({ cashierId, sale: saleData })
      console.log('Sale added successfully')
      toast.success('Vente ajoutée avec succée.')
      // Réinitialiser le formulaire après l'ajout réussi
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
      toast.error('Une erreur est survenue lors de la création de la caisse.')
    }
  }

  if (loadingCashierDetails || loadingProducts) {
    return <Loader />
  }

  const placePrice = cashierDetails && cashierDetails.placePrice
  const totalSales = cashierDetails && cashierDetails.totalSales

  // Calculer le pourcentage du chiffre d'affaires par rapport au prix de la place
  const progressPercentage = (totalSales / placePrice) * 100

  let realGain = totalSales - placePrice
  let realGainClass = realGain >= 0 ? 'text-green-500' : 'text-red-500'

  return (
    <div className="mx-auto p-4 max-w-9xl">
      <div className="rounded-lg shadow-md p-6 text-gray-800">
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
                />
              </div>
              <div>
                <label className="block text-textColor text-sm">
                  Ville du Client
                </label>
                <input
                  type="text"
                  name="clientCity"
                  value={formData.clientCity}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                />
              </div>
              <div>
                <label className="block  text-sm">
                  Pays du Client
                </label>
                <input
                  type="text"
                  name="clientCountry"
                  value={formData.clientCountry}
                  onChange={handleChange}
                  className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                />
              </div>
              <div>
                <label className="block  text-sm">Touriste</label>
                <input
                  type="checkbox"
                  name="touriste"
                  checked={formData.touriste}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>
            </div>
          </details>
          <div className="mt-6">
            <label className="block  text-sm">
              Mode de Paiement
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
            >
              <option value="Espèces">Espèces</option>
              <option value="Carte bancaire">Carte bancaire</option>
              <option value="Chèque">Chèque</option>
            </select>
          </div>
          <div className="mt-6  text-lg">
            Total de la Vente: {calculateTotalSale()} XPF
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 bg-primaryColor  rounded ${
                addingSale ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={addingSale}
            >
              Ajouter la vente
            </button>
          </div>
          <div className="space-y-4"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6"></div>
          <div className="space-y-4">
            {formData.products.map((product, index) => (
              <div
                key={product.productId}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end"
              >
                <div>
                  <label className="block text-textColor text-sm">
                    Produit
                  </label>
                  <input
                    type="text"
                    value={product.label}
                    disabled
                    className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-textColor text-sm">
                    Prix unitaire (XPF)
                  </label>
                  <input
                    type="number"
                    value={product.unitPrice}
                    onChange={(e) =>
                      handleProductChange(
                        product.productId,
                        e.target.value,
                        product.quantity,
                      )
                    }
                    className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-textColor text-sm">
                    Quantité
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={product.quantity}
                    onChange={(e) =>
                      handleProductChange(
                        product.productId,
                        product.unitPrice,
                        parseInt(e.target.value),
                      )
                    }
                    className="w-full p-2 border bg-gray-500 rounded mt-1 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="mb-6">
        {cashierDetails &&
        cashierDetails.sales &&
        cashierDetails.sales.length > 0 ? (
          <ul className="space-y-4 mt-3">
            {cashierDetails.sales.map((sale) => (
              <li
                key={sale.id}
                className="p-4 bg-gray-100 rounded-lg border-2 border-primaryColor"
              >
                <div className="flex justify-between mb-2 text-sm">
                  <div>
                    {sale.clientFirstname} {sale.clientLastname}
                  </div>
                  <div>
                    {new Date(cashierDetails.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-sm text-gray-800">{sale.clientMail}</div>
                <div className="text-sm text-gray-800">
                   {sale.clientCity}, {sale.clientCountry}
                </div>
                
                <div className="text-sm text-gray-800">
                  {sale.touriste ? 'Client Touriste' : ' Client Local'}
                </div>
                <div className="mt-2 text-sm">
                  <h3 className="font-medium">Produits :</h3>
                  <ul className="pl-4 list-disc list-inside bg-gray-300 my-3 p-1 text-color-800">
                    {sale.products.map((product) => (
                      <li
                        key={product.productID}
                        className="flex justify-between my-3 "
                      >
                        <p>
                          {getProductLabel(product.productID)} -{' '}
                          {product.quantity} x {product.unitPrice} XPF{' '}
                        </p>
                        <p>{product.subTotal} XPF</p>
                      </li>
                    ))}
                  </ul>
       
                  
                </div>
                {/* Calculer et afficher le total basé sur les sous-totaux */}
                <div className="mt-2 text-sm font-bold bg-green-300 p-2 text-center rounded-md border-2 border-green-500 flex justify-between">
                  <span>
                  Total :
                  </span>
           
                  {sale.products.reduce(
                    (total, product) => total + product.subTotal,
                    0,
                  )}{' '}
                  XPF
                </div>
                <div className="text-sm text-gray-800 mt-3">
                  <strong>Mode de paiment :</strong> {sale.paymentMethod}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-red-600 text-center text-2xl mt-3">
            Aucune vente réalisée pour le moment.
          </div>
        )}
      </div>
      <div className="mb-4 text-sm flex justify-between "></div>
      <div className="mb-4 flex justify-between ">
        <div>Prix de l'inscription</div>
        <div>{cashierDetails && cashierDetails.placePrice} XPF</div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between mb-2 ">
          <div>Chiffre d'affaires</div>
          <div>
            {cashierDetails && Math.floor(cashierDetails.totalSales)} XPF
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        {progressPercentage >= 100 ? (
          <div className="text-xl font-medium text-center ">
            Gain réel :{' '}
            <span className={realGainClass}>{Math.floor(realGain)} XPF</span>
          </div>
        ) : (
          <div className="text-xl font-medium text-center ">
            Montant restant à atteindre pour gagner de l'argent :{' '}
            <span className="text-red-500">
              {Math.floor(placePrice - totalSales)} XPF
            </span>
          </div>
        )}

        <Button version={'danger'} icon={SquareX}>
          Fermer la caisse
        </Button>
      </div>
    </div>
  )
}

export default AdminCashierDetailsScreen
