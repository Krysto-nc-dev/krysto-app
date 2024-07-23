// Import necessary constants and the apiSlice
import { apiSlice } from './apiSlice'
import { USERS_URL } from '../constants'

// Use apiSlice to inject endpoints
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing login mutation
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),

    // Existing register mutation
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    // Existing logout mutation
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),

    // Existing profile mutation
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),

    // Existing getUsers query
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),

    // New deleteUsers mutation
    deleteUsers: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
    }),

    // New getUserDetails query
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Existing updateUser mutation
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // New getPartnerProfile query
    getPartnerProfile: builder.query({
      query: (partnerId) => ({
        url: `${USERS_URL}/partner/${partnerId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // New updatePartnerProfile mutation
    updatePartnerProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/partner/${data.partnerId}`,
        method: 'PUT',
        body: data,
      }),
    }),

    // New getResellerProfile query
    getResellerProfile: builder.query({
      query: (resellerId) => ({
        url: `${USERS_URL}/reseller/${resellerId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // New updateResellerProfile mutation
    updateResellerProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reseller/${data.resellerId}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

// Export the generated hooks
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUsersMutation, // Added
  useGetUserDetailsQuery, // Added
  useUpdateUserMutation,
  useGetPartnerProfileQuery, // Added
  useUpdatePartnerProfileMutation, // Added
  useGetResellerProfileQuery, // Added
  useUpdateResellerProfileMutation, // Added
} = usersApiSlice
