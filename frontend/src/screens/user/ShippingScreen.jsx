import { useState } from 'react'
import Button from '../../components/shared/Button'
import { Send } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../../slices/cartSlice'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/paiment')
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        Votre adresse de livraison
      </h1>

      <form
        onSubmit={submitHandler}
        className="w-full max-w-md mx-auto  p-6 rounded-lg shadow-md space-y-4"
      >
        <div className="flex flex-col">
          <label
            htmlFor="address"
            className="mb-2 text-sm font-medium text-gray-600"
          >
            Adresse
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="city"
            className="mb-2 text-sm font-medium text-gray-600"
          >
            Ville
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="postalCode"
            className="mb-2 text-sm font-medium text-gray-600"
          >
            Code postal
          </label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="country"
            className="mb-2 text-sm font-medium text-gray-600"
          >
            Pays
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button
          onClick={submitHandler}
          icon={Send}
          version={'primary'}
          className="w-full py-3 mt-6"
        >
          Valider cette adresse
        </Button>
      </form>
    </>
  )
}

export default ShippingScreen
