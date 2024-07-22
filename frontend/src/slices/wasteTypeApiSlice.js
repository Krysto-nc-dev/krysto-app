import { WASTES_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const wasteTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWastes: builder.query({
      query: () => ({
        url: `${WASTES_URL}`,
      }),
      providesTags: ['Waste'],
      keepUnusedDataFor: 5,
    }),
    getWasteById: builder.query({
      query: (id) => ({
        url: `${WASTES_URL}/${id}`,
      }),
      providesTags: ['Waste'],
      keepUnusedDataFor: 5,
    }),
    createWaste: builder.mutation({
      query: (newWaste) => ({
        url: `${WASTES_URL}`,
        method: 'POST',
        body: newWaste,
      }),
      invalidatesTags: ['Waste'],
    }),
    updateWaste: builder.mutation({
      query: ({ id, updatedWaste }) => ({
        url: `${WASTES_URL}/${id}`,
        method: 'PUT',
        body: updatedWaste,
      }),
      invalidatesTags: ['Waste'],
    }),
    deleteWaste: builder.mutation({
      query: (id) => ({
        url: `${WASTES_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Waste'],
    }),
  }),
})

export const {
  useGetWastesQuery,
  useGetWasteByIdQuery,
  useCreateWasteMutation,
  useUpdateWasteMutation,
} = wasteTypeApiSlice
