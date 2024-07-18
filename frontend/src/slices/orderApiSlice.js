import { apiSlice } from './apiSlice'
import { ORDERS_URL } from '../constants.js'

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: 'POST',
        body: { ...order },
      }),
      //   invalidatesTags: ['Order'],
      //   refetchOnFailure: true,
      //   refetchOnMount: true,
      //   refetchInterval: 60 * 60 * 1000, // 1 hour
    }),

    getOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
      }),
      providesTags: ['Order'],
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApiSlice
