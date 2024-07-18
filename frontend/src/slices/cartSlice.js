import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/CartUtils'

const savedCartItems = JSON.parse(localStorage.getItem('cart')) || []
const initialState = {
  cartItems: Array.isArray(savedCartItems) ? savedCartItems : [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id,
      )

      if (existItem) {
        // Si l'article existe déjà dans le panier, mettre à jour la quantité
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existItem._id
            ? { ...cartItem, qty: item.qty || cartItem.qty + 1 }
            : cartItem,
        )
      } else {
        // Sinon, ajouter l'article avec la quantité spécifiée ou 1 par défaut
        const newItem = { ...item, qty: item.qty || 1 }
        state.cartItems.push(newItem)
      }

      return updateCart(state)
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer
