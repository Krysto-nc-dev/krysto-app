
import { ArrowBigLeft } from 'lucide-react'
import React from 'react'
import Button from '../../components/shared/Button'

const AdminWasteTypeDetailsScreen = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Types de Déchets</h1>
        <Button version={'primary'}  url="/admin-settings" icon={ArrowBigLeft}>
          Retour
        </Button>
      </div>
    </div>
  )
}

export default AdminWasteTypeDetailsScreen
