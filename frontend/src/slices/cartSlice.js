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
        (cartItem) => cartItem._id === item._id, // Correction ici : utiliser cartItem._id
      )

      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existItem._id
            ? { ...cartItem, qty: cartItem.qty + (item.qty || 1) }
            : cartItem,
        )
      } else {
        const newItem = { ...item, qty: item.qty || 1 }
        state.cartItems = [...state.cartItems, newItem]
      }

      return updateCart(state)
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer
