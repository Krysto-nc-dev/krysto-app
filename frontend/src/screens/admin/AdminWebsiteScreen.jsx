import { Send, ShoppingCart, Users } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminWebsiteScreen = () => {
  return (
    <>
      <h1 className="text-gray-800 text-2xl mb-3">
        Administration du site internet
      </h1>

      <div>
        <ul>
        <li className='mb-6'>
            <Link to="/admin/website/produits" className='flex items-center gap-3 hover:text-primaryColor'> <ShoppingCart/> Produits</Link>
          </li>
          <li className='mb-6'>
            <Link to="/admin/website/utilisateurs" className='flex items-center gap-3 hover:text-primaryColor'> <Users/> Utilisateurs</Link>
          </li>
        
          <li className='mb-6'>
            <Link to="/admin/website/commandes" className='flex items-center gap-3 hover:text-primaryColor'>
              <Send /> Commandes
            </Link>
          </li>
         
        </ul>
      </div>
    </>
  )
}

export default AdminWebsiteScreen
