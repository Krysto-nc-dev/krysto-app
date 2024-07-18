import React from 'react'
import { useGetBankAccountsQuery } from '../../slices/dolibarr/dolliBankAccountApiSlice';

const AdminBanksScreen = () => {
  const {data: bankaccounts , error: errorbankaccounts , isLoading: bankaccountsLoading} = useGetBankAccountsQuery()
  console.log(bankaccounts);
  return (
    <div className='text-gray-800'>
    <h1 className='text-2xl' >Compte bancaires</h1>
</div>
  )
}

export default AdminBanksScreen