// Import necessary constants and the apiSlice
import { apiSlice } from './apiSlice'
import { PRESENTATIONS_URL, UPLOAD_URL } from '../constants'

// Use apiSlice to inject endpoints
export const presentationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get all presentations
    getPresentations: builder.query({
      query: () => ({
        url: `${PRESENTATIONS_URL}`,
      }),
      providesTags: ['Presentation'],
      keepUnusedDataFor: 5,
    }),

    // Query to get a specific presentation by ID
    getPresentationDetails: builder.query({
      query: (presentationId) => ({
        url: `${PRESENTATIONS_URL}/${presentationId}`,
      }),
      providesTags: (result) =>
        result ? [{ type: 'Presentation', id: result._id }] : [],
      keepUnusedDataFor: 5,
    }),

    // Mutation to create a new presentation
    createPresentation: builder.mutation({
      query: () => ({
        url: `${PRESENTATIONS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Presentation'],
    }),

    // Mutation to update an existing presentation
    updatePresentation: builder.mutation({
      query: (data) => ({
        url: `${PRESENTATIONS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'Presentation', id: result._id }] : [],
    }),

    // Mutation to delete a presentation
    deletePresentation: builder.mutation({
      query: (presentationId) => ({
        url: `${PRESENTATIONS_URL}/${presentationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Presentation'],
    }),

    // Mutation to add a slide to a presentation
    addSlideToPresentation: builder.mutation({
      query: ({ presentationId, slide }) => ({
        url: `${PRESENTATIONS_URL}/${presentationId}/slides`,
        method: 'POST',
        body: slide,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'Presentation', id: result._id }] : [],
    }),

    // Mutation to update a specific slide in a presentation
    updateSlideInPresentation: builder.mutation({
      query: ({ presentationId, slideId, slide }) => ({
        url: `${PRESENTATIONS_URL}/${presentationId}/slides/${slideId}`,
        method: 'PUT',
        body: slide,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'Presentation', id: result._id }] : [],
    }),

    // Mutation to delete a specific slide from a presentation
    deleteSlideFromPresentation: builder.mutation({
      query: ({ presentationId, slideId }) => ({
        url: `${PRESENTATIONS_URL}/${presentationId}/slides/${slideId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'Presentation', id: result._id }] : [],
    }),
  }),
})

// Export the generated hooks
export const {
  useGetPresentationsQuery,
  useGetPresentationDetailsQuery,
  useCreatePresentationMutation,
  useUpdatePresentationMutation,
  useDeletePresentationMutation,
  useAddSlideToPresentationMutation,
  useUpdateSlideInPresentationMutation,
  useDeleteSlideFromPresentationMutation,
} = presentationsApiSlice
