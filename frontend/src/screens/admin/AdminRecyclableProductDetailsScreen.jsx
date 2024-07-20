import React from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/shared/Button'
import { ArrowBigLeft } from 'lucide-react'

const AdminRecyclableProductDetailsScreen = () => {
    const {id: recyclableProductId} = useParams()


  return (
    <>
    <div className='flex items-center justify-between'>
    <h1 className='text-2xl text-gray-800' >Produit recyclable {recyclableProductId}</h1>
    <Button url={'/admin-produits-recyclable'}> <ArrowBigLeft/>Retour</Button>
    </div>
    </>
  )
}

export default AdminRecyclableProductDetailsScreen