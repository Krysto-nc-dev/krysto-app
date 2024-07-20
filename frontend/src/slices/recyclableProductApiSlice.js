// Import necessary constants and the apiSlice
import { apiSlice } from './apiSlice'
import { RECYCLABLE_PRODUCTS_URL, UPLOAD_URL } from '../constants'

// Use apiSlice to inject endpoints
export const recyclableProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get all recyclable products
    getRecyclableProducts: builder.query({
      query: () => ({
        url: `${RECYCLABLE_PRODUCTS_URL}`,
      }),
      providesTags: ['RecyclableProduct'],
      keepUnusedDataFor: 5,
    }),

    // Query to get details of a specific recyclable product
    getRecyclableProductDetails: builder.query({
      query: (productId) => ({
        url: `${RECYCLABLE_PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Mutation to create a new recyclable product
    createRecyclableProduct: builder.mutation({
      query: (data) => ({
        url: `${RECYCLABLE_PRODUCTS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['RecyclableProduct'],
    }),

    // Mutation to update an existing recyclable product
    updateRecyclableProduct: builder.mutation({
      query: (data) => ({
        url: `${RECYCLABLE_PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['RecyclableProduct'],
    }),

    // Mutation to upload an image for a recyclable product
    uploadRecyclableProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    // Mutation to delete a recyclable product
    deleteRecyclableProduct: builder.mutation({
      query: (productId) => ({
        url: `${RECYCLABLE_PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['RecyclableProduct'],
    }),

    // Mutation to create a review for a recyclable product
    createRecyclableProductReview: builder.mutation({
      query: (data) => ({
        url: `${RECYCLABLE_PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['RecyclableProduct'],
    }),
  }),
})

// Export the generated hooks
export const {
  useGetRecyclableProductsQuery,
  useGetRecyclableProductDetailsQuery,
  useCreateRecyclableProductMutation,
  useUpdateRecyclableProductMutation,
  useUploadRecyclableProductImageMutation,
  useDeleteRecyclableProductMutation,
  useCreateRecyclableProductReviewMutation,
} = recyclableProductsApiSlice
