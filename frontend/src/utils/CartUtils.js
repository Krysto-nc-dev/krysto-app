export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  )

  // Calculate shipping price (if order is over 100 dollars then free else 10 euros shipping cost)
  // state.shippingPrice = addDecimals(Number(state.itemsPrice > 100 ? 0 : 10))
  state.shippingPrice = 1000
  // Calculate tax price (15% tax)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
  // Calculate total price
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice),
  )

  // Mettre à jour le localStorage avec les nouvelles données du panier
  localStorage.setItem('cart', JSON.stringify(state.cartItems))

  return state
}
