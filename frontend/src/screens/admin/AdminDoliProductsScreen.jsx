import React from 'react'
import {useGetDolliProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice'

const AdminDoliProductsScreen = () => {
  const {data: products , error: errorProducts , isLoading: productsLoading} =  useGetDolliProductsQuery()
  console.log(products);
  return (
    <>
    <h1 className='text-gray-800 text-2xl'>
        Produits Dolibarr
    </h1>
</>
  )
}

export default AdminDoliProductsScreen