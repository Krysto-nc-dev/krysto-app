import React from 'react'
import { useGetThirdPartiesQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice'

const AdminThirdpartiesScreen = () => {

  const {data: thirdparties , error: errorThirdparties , isLoading: thirdpartiesLoading} = useGetThirdPartiesQuery()
   console.log(thirdparties);
  
  return (
    <div className='text-gray-800'>
        <h1 className='text-2xl' >Tiers</h1>
    </div>
  )
}

export default AdminThirdpartiesScreen