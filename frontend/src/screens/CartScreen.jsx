import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Messages from './FeedbackScreens/Messages';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/shared/Button';
import { ArrowBigLeftIcon, ShoppingCart, Trash } from 'lucide-react';
import SelectFilter from '../components/shared/SelectFilter';
import { addToCart } from '../slices/cartSlice'; // Assurez-vous d'importer également removeFromCart si nécessaire

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    const itemInCart = cartItems.find((item) => item._id === product._id);
    if (itemInCart) {
      // Mettre à jour la quantité du produit existant dans le panier
      dispatch(addToCart({ ...itemInCart, qty })); // Utilisez l'itemInCart trouvé pour mettre à jour la quantité
    } else {
      // Ajouter le produit avec la nouvelle quantité au panier
      dispatch(addToCart({ ...product, qty }));
    }
  };

  const removeCartItemHandler = (productId) => {
    // dispatch(removeFromCart(productId));
  };

  return (
    <>
      <h1 className="text-2xl text-gray-700">Votre Panier</h1>
      <div className="mt-4">
        {cartItems.length === 0 ? (
          <>
            <div className="mb-4">
              <Messages type={'warning'} message={'Votre panier est vide'} />
            </div>
            <Link to={'/krysto-shop'}>
              <Button icon={ArrowBigLeftIcon} version={'primary'}>
                Continuer mes achats
              </Button>
            </Link>
          </>
        ) : (
          <div>
            {cartItems.map((cartItem) => (
              <div key={cartItem._id} className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-10">
                  <img className="w-12 h-12" src={cartItem.image} alt={cartItem.name} />
                  <div className="ml-4">
                    <h2 className="text-sm text-gray-700">{cartItem.name}</h2>
                    <p className="text-sm text-gray-500">{cartItem.qty} x {cartItem.price} Xpf</p>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-sm text-gray-700 font-bold">Sous-total</h2>
                    <p className="text-sm text-gray-500">{cartItem.qty * cartItem.price} Xpf</p>
                  </div>
                </div>
                <SelectFilter
                  version={'primary'}
                  label="Quantité"
                  options={[...Array(cartItem.countInStock).keys()].map((x) => ({
                    value: x + 1,
                    label: (x + 1).toString(),
                  }))}
                  value={cartItem.qty}
                  onChange={(e) => addToCartHandler(cartItem, Number(e.target.value))}
                />

                <Button
                  version="danger"
                  icon={Trash}
                  onClick={() => removeCartItemHandler(cartItem._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <h2 className="text-sm text-gray-700 font-bold">Sous-total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
          <p className="text-sm text-gray-500">
            {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)} Xpf
          </p>
        </div>
        <div>
          <h2 className="text-sm text-gray-700 font-bold">Livraison</h2>
          <p className="text-sm text-gray-500">
            {cart.shippingPrice} Xpf
          </p>
        </div>
        <div>
          <h2 className="text-sm text-gray-700 font-bold">Taxe</h2>
          <p className="text-sm text-gray-500">
            {cart.taxPrice} Xpf
          </p>
        </div>
        <div>
          <h2 className="text-sm text-gray-700 font-bold">Total</h2>
          <p className="text-sm text-gray-500">
            {cart.totalPrice} Xpf
          </p>
        </div>
        <Link to={'/commande'}>
          <Button icon={ShoppingCart} version="primary">Passer la commande</Button>
        </Link>
      </div>
    </>
  );
};

export default CartScreen;
