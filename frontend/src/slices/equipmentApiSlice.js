import { apiSlice } from './apiSlice'
import { EQUIPMENTS_URL, UPLOAD_URL } from '../constants'

export const equipmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMachines: builder.query({
      query: () => ({
        url: `${EQUIPMENTS_URL}`,
      }),
      providesTags: ['Equipment'],
      keepUnusedDataFor: 5,
    }),
    getMachineById: builder.query({
      query: (id) => ({
        url: `${EQUIPMENTS_URL}/${id}`,
      }),
      providesTags: ['Equipment'],
      keepUnusedDataFor: 5,
    }),
    addMachine: builder.mutation({
      query: (newMachine) => ({
        url: `${EQUIPMENTS_URL}`,
        method: 'POST',
        body: newMachine,
      }),
      invalidatesTags: ['Equipment'],
    }),
    updateMachine: builder.mutation({
      query: (data) => ({
        url: `${EQUIPMENTS_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Equipment'],
    }),
    deleteMachine: builder.mutation({
      query: (id) => ({
        url: `${EQUIPMENTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Equipment'],
    }),
    addMaintenance: builder.mutation({
      query: ({ id, newMaintenance }) => ({
        url: `${EQUIPMENTS_URL}/${id}/maintenance`,
        method: 'POST',
        body: newMaintenance,
      }),
      invalidatesTags: ['Equipment'],
    }),
    addUsageProcedure: builder.mutation({
      query: ({ id, newUsageProcedure }) => ({
        url: `${EQUIPMENTS_URL}/${id}/usage-procedure`,
        method: 'POST',
        body: newUsageProcedure,
      }),
      invalidatesTags: ['Equipment'],
    }),
    // (Optional) Mutation to upload plastic type images if needed
    uploadMachineImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetMachinesQuery,
  useGetMachineByIdQuery,
  useAddMachineMutation,
  useUpdateMachineMutation,
  useDeleteMachineMutation,
  useAddMaintenanceMutation,
  useAddUsageProcedureMutation,
  useUploadMachineImageMutation,
} = equipmentApiSlice
