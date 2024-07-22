import React from 'react'
import Button from '../../components/shared/Button'
import { ArrowBigLeft, Trash2Icon } from 'lucide-react'

const AdminSettingsScreen = () => {
  return (
    <div className='p-2'>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl">Paramétres de l'application</h1>
        <Button url={'/admin-dashboard'} icon={ArrowBigLeft}>
          Retour
        </Button>
      </div>
      <Button icon={Trash2Icon} url={"/admin-types-de-dechets"}>Gerer les types de déchet</Button>
    </div>
  )
}

export default AdminSettingsScreen
