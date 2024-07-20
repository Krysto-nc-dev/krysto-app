import React from 'react'
import { useGetPlasticTypesQuery } from '../../slices/plasticTypesSlice'

const AdminPlasticsScreen = () => {
  const {data:plasticTypes , error: plasticTypesError, isLoading: plasticTypesLoading} = useGetPlasticTypesQuery()
    
  console.log(plasticTypes);
 
  return (
    <>
    <h1 className='text-gray-800 text-2xl'>Plastiques</h1>
</>
  )
}

export default AdminPlasticsScreen