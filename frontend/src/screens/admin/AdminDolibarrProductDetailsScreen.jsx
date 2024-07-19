import React from 'react'
import { useParams } from 'react-router-dom'

const AdminDolibarrProductDetailsScreen = () => {

    const {id:productId} = useParams()
  return (
  <>
  <h1 className='text-gray-800 text-2xl'>
        Produits dolibarr details {productId}
    </h1>
  </>
  )
}

export default AdminDolibarrProductDetailsScreen