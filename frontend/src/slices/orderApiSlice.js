import { apiSlice } from './apiSlice'
import { ORDERS_URL, PAYPAL_URL } from '../constants.js'

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: 'POST',
        body: order,
      }),
      // Définir les tags pour invalider ou rafraîchir les données
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),

    getOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
      }),
      providesTags: ['Order'],
      keepUnusedDataFor: 5,
    }),

    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      providesTags: (result, error, orderId) => [
        { type: 'Order', id: orderId },
      ],
      keepUnusedDataFor: 5,
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
      //   // Définir les tags pour invalider ou rafraîchir les données
      //   invalidatesTags: [{ type: 'Order', id: orderId }],
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: `${PAYPAL_URL}`,
      }),
      providesTags: ['PayPalClientId'],
      keepUnusedDataFor: 5,
    }),
  }),
})

// Export des hooks générés pour l'utilisation dans les composants
export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} = orderApiSlice
