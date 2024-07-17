// Import necessary constants and the apiSlice
import { apiSlice } from './apiSlice'
import { PRODUCTS_URL } from '../constants'

// Use apiSlice to inject endpoints
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing getUsers query
    getProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}`,
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),

    // New getUserDetails query
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

// Export the generated hooks
export const { useGetProductsQuery, useGetProductDetailsQuery } = usersApiSlice
