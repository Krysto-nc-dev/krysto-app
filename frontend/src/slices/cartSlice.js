import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/CartUtils'

const savedCartItems = JSON.parse(localStorage.getItem('cart')) || []
const initialState = {
  cartItems: Array.isArray(savedCartItems) ? savedCartItems : [],
  shippingAddress: {},
  paymentMethod: 'Paypal',
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
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existItem._id
            ? { ...cartItem, qty: item.qty || cartItem.qty + 1 }
            : cartItem,
        )
      } else {
        const newItem = { ...item, qty: item.qty || 1 }
        state.cartItems.push(newItem)
      }

      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      )

      return updateCart(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      return updateCart(state)
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      return updateCart(state)
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions

export default cartSlice.reducer
