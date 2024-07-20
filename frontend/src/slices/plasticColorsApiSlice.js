// Import necessary constants and the apiSlice
import { apiSlice } from './apiSlice'
import { PLASTIC_COLORS_URL, UPLOAD_URL } from '../constants'

// Use apiSlice to inject endpoints
export const plasticColorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get all plastic colors
    getPlasticColors: builder.query({
      query: () => ({
        url: `${PLASTIC_COLORS_URL}`,
      }),
      providesTags: ['PlasticColor'],
      keepUnusedDataFor: 5,
    }),

    // Query to get a specific plastic color by ID
    getPlasticColorDetails: builder.query({
      query: (plasticColorId) => ({
        url: `${PLASTIC_COLORS_URL}/${plasticColorId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Mutation to create a new plastic color
    createPlasticColor: builder.mutation({
      query: (data) => ({
        url: `${PLASTIC_COLORS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PlasticColor'],
    }),

    // Mutation to update an existing plastic color
    updatePlasticColor: builder.mutation({
      query: (data) => ({
        url: `${PLASTIC_COLORS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PlasticColor'],
    }),

    // Mutation to delete a plastic color
    deletePlasticColor: builder.mutation({
      query: (plasticColorId) => ({
        url: `${PLASTIC_COLORS_URL}/${plasticColorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PlasticColor'],
    }),

    // (Optional) Mutation to upload plastic color images if needed
    uploadPlasticColorImage: builder.mutation({
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
  useGetPlasticColorsQuery,
  useGetPlasticColorDetailsQuery,
  useCreatePlasticColorMutation,
  useUpdatePlasticColorMutation,
  useDeletePlasticColorMutation,
  useUploadPlasticColorImageMutation, // Optional
} = plasticColorsApiSlice
