import { useState, useEffect } from 'react'
import CheckoutSteps from '../../components/user/CheckoutSteps'
import Button from '../../components/shared/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../../slices/cartSlice'

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const shippingAddress = cart

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/adresse-de-livraison')
    }
  }, [shippingAddress, navigate])

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod({ paymentMethod }))
    navigate('/validation-commande')
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-2xl">Réglement de votre commande</h1>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium text-gray-700"
          >
            Méthode de paiement :
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="PayPal">PayPal</option>
            <option value="Stripe">Stripe</option>
            <option value="Carte bancaire">Carte bancaire</option>
            <option value="Virement bancaire">Virement bancaire</option>
          </select>
        </div>

        <Button type="submit">Continuer</Button>
      </form>
    </>
  )
}

export default PaymentScreen
