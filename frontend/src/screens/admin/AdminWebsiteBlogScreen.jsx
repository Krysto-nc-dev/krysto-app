import React from 'react'
import Button from '../../components/shared/Button'
import { ArrowBigLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminWebsiteBlogScreen = () => {
  return (
    <>
    <div className="flex items-center justify-between">

      <h1 className="text-gray-800 text-2xl">Articles du blog</h1>
      <Button><ArrowBigLeft/>  <Link to="/admin-administration-du-site"> Retour</Link></Button>
    </div>
    </>
  )
}

export default AdminWebsiteBlogScreen