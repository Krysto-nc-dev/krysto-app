// Import necessary constants and the apiSlice
import { apiSlice } from './apiSlice'
import { ARTICLES_URL, UPLOAD_URL } from '../constants'

// Use apiSlice to inject endpoints
export const articlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing getUsers query
    getArticles: builder.query({
      query: () => ({
        url: `${ARTICLES_URL}`,
      }),
      providesTags: ['Article'],
      keepUnusedDataFor: 5,
    }),

    // New getUserDetails query
    getArticleDetails: builder.query({
      query: (productId) => ({
        url: `${ARTICLES_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createArticle: builder.mutation({
      query: () => ({
        url: `${ARTICLES_URL}`,
        method: 'POST',
      }),
      providesTags: ['Article'],
    }),

    updateArticle: builder.mutation({
      query: (data) => ({
        url: `${ARTICLES_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      providesTags: ['Article'],
    }),
    uploadArticleImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteArticle: builder.mutation({
      query: (productId) => ({
        url: `${ARTICLES_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    createArticleReview: builder.mutation({
      query: (data) => ({
        url: `${ARTICLES_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      providesTags: ['Article'],
    }),
  }),
})

// Export the generated hooks
export const {
  useGetArticlesQuery,
  useGetArticleDetailsQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useUploadArticleImageMutation,
  useDeleteArticleMutation,
} = articlesApiSlice
