import { RECIPES_URL, UPLOAD_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const plasticTypesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => ({
        url: `${RECIPES_URL}`,
      }),
      providesTags: ['Recipe'],
      keepUnusedDataFor: 5,
    }),
    getRecipesById: builder.query({
      query: (id) => ({
        url: `${RECIPES_URL}/${id}`,
      }),
      providesTags: ['Recipe'],
      keepUnusedDataFor: 5,
    }),
    // Mutation to create an article
    createRecipe: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Recipe'],
    }),
    updateRecipe: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      uploadRecipeImage: builder.mutation({
        query: (data) => ({
          url: `${UPLOAD_URL}`,
          method: 'POST',
          body: data,
        }),
      }),
      invalidatesTags: ['Recipe'],
    }),
    deleteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: `${RECIPES_URL}/${recipeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipe'],
    }),
  }),
})

export const {
  useGetRecipesQuery,
  useGetRecipesByIdQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useUploadRecipeImageMutation,
} = plasticTypesApiSlice
