import { DOLIBAR_URL, DOLIBARR_API_KEY } from '../../constants'
import { apiSlice } from '../apiSlice'

export const dolliThirdPartyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getThirdParties: builder.query({
      query: ({ mode, category } = {}) => {
        const params = new URLSearchParams()

        params.append('limit', '100000')

        if (mode) {
          params.append('mode', mode)
        }
        if (category) {
          params.append('category', category)
        }

        const queryString = params.toString()
        const url = queryString
          ? `${DOLIBAR_URL}/thirdparties?${queryString}`
          : `${DOLIBAR_URL}/thirdparties`

        return {
          url: url,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),

    getThirdPartyDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/thirdparties/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    createThirdParty: builder.mutation({
      query: (invoiceData) => ({
        url: `${DOLIBAR_URL}/thirdparties`,
        method: 'POST',
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
        body: invoiceData,
      }),
    }),
  }),
})

export const {
  useGetThirdPartiesQuery,
  useGetThirdPartyDetailsQuery,
  useCreateThirdPartyMutation,
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliThirdPartyApiSlice
