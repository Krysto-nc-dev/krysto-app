import React from 'react'
import { useGetWarehousesQuery } from '../../slices/dolibarr/dolliWarehouseApiSlice';

const AdminWarehousesScreen = () => {
  const {data: warehouses , error: errorWarehouses , isLoading: warehousesLoading} = useGetWarehousesQuery()
  console.log(warehouses);
  return (
    <>
    <h1 className='text-gray-800 text-2xl'>Entrepôts</h1>
</>
  )
}

export default AdminWarehousesScreen