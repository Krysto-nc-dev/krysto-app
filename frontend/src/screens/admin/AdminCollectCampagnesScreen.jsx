import React from 'react'
import { useGetCampagnesCollecteQuery } from '../../slices/campagneCollectApiSlice'

const AdminCollectCampagnesScreen = () => {
  const {data: campagnesCollect , error: campagnesCollectError , isLoading: campgnesCollectLoading} = useGetCampagnesCollecteQuery()
  
    console.log(campagnesCollect);
  return (
    <>
    <h1 className='text-gray-800 text-2xl'>
      Campagnes de collecte
    </h1>
</>
  )
}

export default AdminCollectCampagnesScreen