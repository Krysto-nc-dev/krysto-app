import { ArrowBigLeft } from 'lucide-react'
import React from 'react'
import Button from '../../components/shared/Button'
import { Link, useParams } from 'react-router-dom'

const AdminWebsiteUserEditScreen = () => {

    const {id:userId} = useParams()
  return (
    <>
    <div className="flex items-center justify-between">

      <h1 className="text-gray-800 text-2xl">Modifier l'utilisateur : {userId}</h1>
      <Button><ArrowBigLeft/>  <Link to="/admin-administration-du-site"> Retour</Link></Button>
    </div>
    </>
  )
}

export default AdminWebsiteUserEditScreen