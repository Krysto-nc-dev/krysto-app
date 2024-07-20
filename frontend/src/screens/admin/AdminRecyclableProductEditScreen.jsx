import React from 'react'
import Button from '../../components/shared/Button'
import { ArrowBigLeft } from 'lucide-react'
import { useParams } from 'react-router-dom'

const AdminRecyclableProductEditScreen = () => {
    const {id: recyclableProductId} = useParams()
  return (
    <>
    <div className='flex items-center justify-between'>
    <h1 className='text-2xl text-gray-800' >Editer le produit recyclable : {recyclableProductId}</h1>
    <Button url={'/admin-produits-recyclable'}> <ArrowBigLeft/>Retour</Button>
    </div>
    </>
  )
}

export default AdminRecyclableProductEditScreen