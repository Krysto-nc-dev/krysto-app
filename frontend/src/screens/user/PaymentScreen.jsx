import React, { useState } from 'react';
import CheckoutSteps from '../../components/user/CheckoutSteps';
import Button from '../../components/shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../../slices/cartSlice';

const PaymentScreen = () => {
  const [payment, setPayment] = useState('PayPal');

  const cart = useSelector((state) => state.cart)
  const { paymentMethod } = cart
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const handlePaymentMethodChange = (e) => {
    setPayment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({payment}))
    navigate('/validation-commande')
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-2xl">Réglement de votre commande</h1>

      <form onSubmit={handleSubmit} className='mt-4'>
        <div className="mb-4">
          <label htmlFor="payment" className="block text-sm font-medium text-gray-700">
            Méthode de paiement :
          </label>
          <select
            id="payment"
            name="payment"
            value={payment}
            onChange={handlePaymentMethodChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="PayPal">PayPal</option>
            <option value="Stripe">Stripe</option>
            <option value="Carte bancaire">Carte bancaire</option>
            <option value="Virement bancaire">Virement bancaire</option>
  
          </select>
        </div>
        
        <Button type="submit" >
         Continuer
        </Button>
      </form>
    </>
  );
};

export default PaymentScreen;
