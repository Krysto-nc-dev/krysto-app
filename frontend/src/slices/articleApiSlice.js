// Import necessary constants and the apiSlice
import { apiSlice } from './apiSlice'
import { ARTICLES_URL, UPLOAD_URL } from '../constants'

// Use apiSlice to inject endpoints
export const articlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing getArticles query
    getArticles: builder.query({
      query: () => ({
        url: `${ARTICLES_URL}`,
      }),
      providesTags: ['Article'],
      keepUnusedDataFor: 5,
    }),

    // New getArticleDetails query
    getArticleDetails: builder.query({
      query: (articleId) => ({
        url: `${ARTICLES_URL}/${articleId}`,
      }),
      providesTags: (result, error, articleId) => [
        { type: 'Article', id: articleId },
      ],
      keepUnusedDataFor: 5,
    }),

    // Mutation to create an article
    createArticle: builder.mutation({
      query: (data) => ({
        url: `${ARTICLES_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Article'],
    }),

    // Mutation to update an article
    updateArticle: builder.mutation({
      query: (data) => ({
        url: `${ARTICLES_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: 'Article', id: _id },
      ],
    }),

    // Mutation to upload an article image
    uploadArticleImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    // Mutation to delete an article
    deleteArticle: builder.mutation({
      query: (articleId) => ({
        url: `${ARTICLES_URL}/${articleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, articleId) => [
        { type: 'Article', id: articleId },
      ],
    }),

    // Mutation to create an article review
    createArticleReview: builder.mutation({
      query: (data) => ({
        url: `${ARTICLES_URL}/${data.articleId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { articleId }) => [
        { type: 'Article', id: articleId },
      ],
    }),

    // New mutation to add a paragraph to an article
    // New mutation to add a paragraph to an article
    addArticleParagraph: builder.mutation({
      query: ({ articleId, paragraph }) => ({
        url: `${ARTICLES_URL}/${articleId}/paragraphs`,
        method: 'POST',
        body: paragraph, // Envoyer directement l'objet paragraph
      }),
      invalidatesTags: (result, error, { articleId }) => [
        { type: 'Article', id: articleId },
      ],
    }),

    // Optional: Mutation to update a paragraph in an article
    updateArticleParagraph: builder.mutation({
      query: ({ articleId, paragraphId, paragraph }) => ({
        url: `${ARTICLES_URL}/${articleId}/paragraphs/${paragraphId}`,
        method: 'PUT',
        body: { paragraph },
      }),
      invalidatesTags: (result, error, { articleId }) => [
        { type: 'Article', id: articleId },
      ],
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
  useCreateArticleReviewMutation,
  useAddArticleParagraphMutation, // New hook
  useUpdateArticleParagraphMutation, // Optional hook
} = articlesApiSlice
