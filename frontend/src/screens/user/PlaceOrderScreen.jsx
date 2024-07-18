import React, { useEffect } from 'react';
import CheckoutSteps from '../../components/user/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { Send, ShoppingCart } from 'lucide-react';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate('/adresse-de-livraison');
    } else if (!cart.paymentMethod) {
      navigate('/paiment');
    }
  }, [cart, navigate]);

//   // Fonction pour afficher la méthode de paiement
//   const renderPaymentMethod = () => {
//     if (typeof cart.paymentMethod === 'string') {
//       return cart.paymentMethod;
//     }
//     // Gérer le cas où paymentMethod est un objet
//     return JSON.stringify(cart.paymentMethod) || 'Méthode de paiement non spécifiée';
//   };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="text-gray-700 text-2xl">Valider votre commande</h1>
      <div>
        <ul>
          <li>
            <Card>

            <div>Adresse de livraison:</div>
            <div>
              {cart.shippingAddress?.address}, {cart.shippingAddress?.city}, {cart.shippingAddress?.postalCode}, {cart.shippingAddress?.country}
            </div>
            </Card>
          </li>
          <Card>

          <li>
            <div>Mode de paiement:</div>
            {/* <div>{cart.paymentMethod}</div> */}
          </li>
          </Card>
          <li>
            <div>Produits:</div>
            <ul>
              {cart.cartItems.map((item) => (
                <li key={item._id}>
                  <Card>
                    {item.name} - {item.qty} x {item.price} €
                  </Card>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <Card variant={"danger"} >
          <div>Total:</div>
          <div>
            {cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} €
          </div>
        </Card>
        <div className=" w-full flex gap-3 items-center justify-center ">

        <Button icon={Send} >
          Valider la commande
        </Button>
        <Button icon={ShoppingCart} version={'primary'} >
          Retour au panier
        </Button>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
