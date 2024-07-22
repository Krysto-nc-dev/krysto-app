import React from 'react'
import Button from '../../components/shared/Button'
import { ArrowBigLeft } from 'lucide-react'

const AdminWasteTypesScreen = () => {
  return (
    <div className='p-2'>
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-xl">Type de déchets</h1>
      <Button url={'/admin-settings'} icon={ArrowBigLeft}>
        Retour
      </Button>
    </div>
    
  </div>
  )
}

export default AdminWasteTypesScreen