import React from 'react'
import { useGetInvoicesQuery } from '../../slices/dolibarr/dolliInvoiceApiSlices';

const AdminBillingsscreen = () => {

  const {data: invoices , error: errorInvoices , isLoading: invoicesLoading} = useGetInvoicesQuery()
  console.log(invoices);
  return (
    <div className='text-gray-800'>
    <h1 className='text-2xl' >Facturation</h1>
</div>
  )
}

export default AdminBillingsscreen