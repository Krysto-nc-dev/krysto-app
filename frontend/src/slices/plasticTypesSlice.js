// Import necessary constants and the apiSlice
import { apiSlice } from './apiSlice'
import { PLASTIC_TYPES_URL, UPLOAD_URL } from '../constants'

// Use apiSlice to inject endpoints
export const plasticTypesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get all plastic types
    getPlasticTypes: builder.query({
      query: () => ({
        url: `${PLASTIC_TYPES_URL}`,
      }),
      providesTags: ['PlasticType'],
      keepUnusedDataFor: 5,
    }),

    // Query to get a specific plastic type by ID
    getPlasticTypeDetails: builder.query({
      query: (plasticTypeId) => ({
        url: `${PLASTIC_TYPES_URL}/${plasticTypeId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Mutation to create a new plastic type
    createPlasticType: builder.mutation({
      query: (data) => ({
        url: `${PLASTIC_TYPES_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PlasticType'],
    }),

    // Mutation to update an existing plastic type
    updatePlasticType: builder.mutation({
      query: (data) => ({
        url: `${PLASTIC_TYPES_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PlasticType'],
    }),

    // Mutation to delete a plastic type
    deletePlasticType: builder.mutation({
      query: (plasticTypeId) => ({
        url: `${PLASTIC_TYPES_URL}/${plasticTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PlasticType'],
    }),

    // (Optional) Mutation to upload plastic type images if needed
    uploadPlasticTypeImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

// Export the generated hooks
export const {
  useGetPlasticTypesQuery,
  useGetPlasticTypeDetailsQuery,
  useCreatePlasticTypeMutation,
  useUpdatePlasticTypeMutation,
  useDeletePlasticTypeMutation,
  useUploadPlasticTypeImageMutation, // Optional
} = plasticTypesApiSlice
