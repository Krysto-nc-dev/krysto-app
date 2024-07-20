import { Newspaper, Send, ShoppingCart, Users, Waves } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/shared/Button'

const AdminWebsiteScreen = () => {
  return (
    <>
      <h1 className="text-gray-800 text-2xl mb-3">
        Administration du site internet
      </h1>

      <div>
        <ul className="flex items-center gap-5">
          <li className="mb-6">
            <Link
              to="/admin/website/produits"
              className="flex items-center gap-3 hover:text-primaryColor hover:underline"
            >
              {' '}
              <ShoppingCart /> Produits
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/admin/website/utilisateurs"
              className="flex items-center gap-3 hover:text-primaryColor hover:underline"
            >
              {' '}
              <Users /> Utilisateurs
            </Link>
          </li>

          <li className="mb-6">
            <Link
              to="/admin/website/commandes"
              className="flex items-center gap-3 hover:text-primaryColor hover:underline"
            >
              <Send /> Commandes
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/admin/website/blog-articles"
              className="flex items-center gap-3 hover:text-primaryColor hover:underline"
            >
              <Newspaper /> Articles du blog
            </Link>
          </li>
          <li className="mb-6">
            <Button version={'primary'} icon={Waves}>
              <Link to="/"> Allez au site</Link>
            </Button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default AdminWebsiteScreen
