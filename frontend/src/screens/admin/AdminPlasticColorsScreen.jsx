
import { ArrowBigLeft } from 'lucide-react'
import React from 'react'
import Button from '../../components/shared/Button'

const AdminPlasticColorsScreen = () => {
  return (
    <>
    
      <div className="mb-6 flex items-start justify-between">
      <h1 className='text-2xl' >Couleurs de plastique</h1>
        <Button version="secondary" icon={ArrowBigLeft} url="/admin-dashboard">
          Retour
        </Button>
      </div>
   
    </>
  )
}

export default AdminPlasticColorsScreen