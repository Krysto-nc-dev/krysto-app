import React, { useEffect } from 'react';
import CheckoutSteps from '../../components/user/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { Loader, Send, ShoppingCart } from 'lucide-react';
import { useCreateOrderMutation } from '../../slices/orderApiSlice';
import Messages from '../FeedbackScreens/Messages';
import { clearCartItems } from '../../slices/cartSlice';
import { toast } from 'react-toastify';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder , {isLoading: loadingCreateOrder , error : errorCreateOrder}] = useCreateOrderMutation()

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate('/adresse-de-livraison');
    } else if (!cart.paymentMethod) {
      navigate('/paiment');
    }
  }, [cart.paymentMethod , cart.shippingAddress, navigate]);

  const placeOrderHandler =  async () => {
    try {
        const res = await createOrder({
            orderItems : cart.cartItems,
            shippingAddress : cart.shippingAddress,
            paymentMethod : cart.paymentMethod,
            itemsPrice : cart.itemsPrice,
            shippingPrice : cart.shippingPrice,
            taxPrice : cart.taxPrice,
            totalPrice : cart.totalPrice

        }).unwrap()

        dispatch(clearCartItems())
        navigate(`/commande/${res._id}`)
        
    } catch (error) {
        toast.error(error)
    }

  }


  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="text-gray-700 text-2xl text-center mb-5 mt-8">Valider votre commande</h1>
      <div>
        <ul>
          <li>
            <Card>

            <h2 className='text-xl text-primaryColor mb-3'>Adresse de livraison:</h2>
            <div>
              {cart.shippingAddress?.address}, {cart.shippingAddress?.city}, {cart.shippingAddress?.postalCode}, {cart.shippingAddress?.country}
            </div>
            </Card>
          </li>
          <li>
          <Card>

            <h2 className='text-xl text-primaryColor mb-3'>Mode de paiement:</h2>
             <div>{cart.paymentMethod}</div> 
          </Card>
          </li>
          <li>
            <ul>
                <Card>

            <h2 className='text-xl text-primaryColor mt-2 mb-3'>Votre commande </h2>
              {cart.cartItems.map((item) => (
                  <li key={item._id}>
                  <Card variant={'primary'}>
                    {item.name} - {item.qty} x {item.price} Xpf =  <strong>{item.qty * item.price} Xpf </strong> 
                  </Card>
                </li>
              ))}
              </Card>
            </ul>
          </li>
        </ul>
        <Card variant={"dark"} >

          <div className='text-xl text-primaryColor mb-3'>Total:</div>
            <div className='flex justify-center gap-20'>
          <div>
            <p className='text-secondaryColor mt-2'>Sous-Total</p>
          {cart.itemsPrice} Xpf
          </div>
          <div>
            <p className='text-secondaryColor mt-2'>Taxe</p>
          {cart.taxPrice} Xpf
          </div>
          <div>

            <p className='text-secondaryColor mt-2'>Livraison</p>
          {cart.shippingPrice} Xpf
          </div>
          <div>
            <p className='text-secondaryColor mt-2'>Total de votre commande</p>
            {cart.totalPrice} Xpf
          </div>
             {
                errorCreateOrder && (
                  <Messages type="error" message={errorCreateOrder} />
                )
 
             }
            </div>
    
        </Card>
        <div className=" w-full flex gap-3 items-center justify-center mb-5 ">

        <Button isDisabled={cart.cartItems.lenght === 0} icon={Send} onClick={placeOrderHandler} >
          {loadingCreateOrder ? <Loader/> : "Valider la commande"  } 
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
