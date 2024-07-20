import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, DOLIBAR_URL } from '../constants'

const tagTypes = ['Product', 'User', 'Order', 'Article']

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })
const doliBaseQuery = fetchBaseQuery({ baseUrl: DOLIBAR_URL })

export const apiSlice = createApi({
  baseQuery,
  tagTypes,
  endpoints: (builder) => ({}),
})

export const dolibarrApiSlice = createApi({
  baseQuery: doliBaseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
})
