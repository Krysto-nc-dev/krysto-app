import { createSlice } from '@reduxjs/toolkit'

// Récupère les données du localStorage ou initialise un tableau vide
const initialState = JSON.parse(localStorage.getItem('cart')) || []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Ajoutez des reducers ici si nécessaire
  },
})

export default cartSlice.reducer
