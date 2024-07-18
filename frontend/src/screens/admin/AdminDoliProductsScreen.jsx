import React from 'react'
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice.js';

const AdminDoliProductsScreen = () => {
  const {data: products , error: errorProducts , isLoading: productsLoading} = useGetProductsQuery()
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