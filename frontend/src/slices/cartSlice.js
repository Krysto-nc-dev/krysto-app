import { createSlice } from '@reduxjs/toolkit'

// Récupère les données du localStorage ou initialise un tableau vide
const savedCartItems = JSON.parse(localStorage.getItem('cart'))
const initialState = {
  cartItems: savedCartItems ? savedCartItems : [],
}
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id,
      )

      if (existItem) {
        // Si l'élément existe déjà dans le panier, incrémenter la quantité
        state.cartItems = state.cartItems.map(
          (cartItem) => (cartItem._id = existItem._id ? item : item),
        )
      } else {
        // Sinon, ajouter l'élément au panier avec une quantité de 1
        state.cartItems = [...state.cartItems, item]
      }

      // Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      )

      // Calculate shipping price (if order is over 100 dollars then free else 10 euros shipping cost)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
      // Calculate tax price (15% tax)
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2))
      // Calculate total price
      state.totalPrice = addDecimals(
        state.itemsPrice + state.shippingPrice + state.taxPrice,
      )

      // Calculate total price

      state.totalPrice = addDecimals(
        Number(state.itemsPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice).toFixed(2),
      )

      // Mettre à jour le localStorage avec les nouvelles données du panier
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const { addToCart } = cartSlice.actions // Exporte l'action addToCart si besoin

export default cartSlice.reducer
