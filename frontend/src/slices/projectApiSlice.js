// Import necessary constants and the apiSlice
import { apiSlice } from './apiSlice'
import { PROJECTS_URL, UPLOAD_URL } from '../constants'

// Use apiSlice to inject endpoints
export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing getUsers query
    getProjects: builder.query({
      query: () => ({
        url: `${PROJECTS_URL}`,
      }),
      providesTags: ['Project'],
      keepUnusedDataFor: 5,
    }),

    // New getUserDetails query
    getProjectDetails: builder.query({
      query: (projectId) => ({
        url: `${PROJECTS_URL}/${projectId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProject: builder.mutation({
      query: () => ({
        url: `${PROJECTS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Project'],
    }),

    updateProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Project'],
    }),
    uploadProjectDocuments: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/documents`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (projectId) => ({
        url: `${PROJECTS_URL}/${projectId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

// Export the generated hooks
export const {
  useGetProjectsQuery,
  useGetProjectDetailsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useUploadProjectDocumentsMutation,
  useDeleteProjectMutation,
  useCreateProjectReviewMutation,
} = projectsApiSlice
