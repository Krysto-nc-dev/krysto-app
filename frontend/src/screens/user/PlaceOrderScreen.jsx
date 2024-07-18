import React from 'react'
import CheckoutSteps from '../../components/user/CheckoutSteps'

const PlaceOrderScreen = () => {
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <h1 className="text-gray-700 text-2xl">Valider votre commande</h1>
    </>
  )
}

export default PlaceOrderScreen
