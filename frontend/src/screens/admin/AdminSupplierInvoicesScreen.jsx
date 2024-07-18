import React from 'react'
import { useGetSupplierInvoicesQuery } from '../../slices/dolibarr/dolliSupplierInvoiceApiSlice';

const AdminSupplierInvoicesScreen = () => {
  const {data: supplierInvoices , error: errorSupplierInvoices , isLoading: supplierInvoicesLoading} = useGetSupplierInvoicesQuery()
  console.log(supplierInvoices);
  return (
    <div className='text-gray-800'>
    <h1 className='text-2xl' >Factures fournisseur</h1>
</div>
  )
}

export default AdminSupplierInvoicesScreen