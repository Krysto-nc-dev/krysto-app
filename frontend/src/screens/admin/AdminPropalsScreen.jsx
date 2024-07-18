import React from 'react'
import { useGetProposalsQuery } from '../../slices/dolibarr/dolliProposalApiSlice'

const AdminPropalsScreen = () => {

  const {data: propoal , error: errorPropal , isLoading: isLoadingPropal} = useGetProposalsQuery()

  console.log(propoal);
  return (
    <div className='text-gray-800'>
    <h1 className='text-2xl' >Propositions commercial</h1>
</div>
  )
}

export default AdminPropalsScreen