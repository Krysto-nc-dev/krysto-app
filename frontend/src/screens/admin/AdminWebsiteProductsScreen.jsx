import React from 'react'
import { useGetProductsQuery } from '../../slices/productApiSlice'
import Table from '../../components/shared/Table' // Assurez-vous que le chemin est correct
import { Link } from 'react-router-dom'
import Button from '../../components/shared/Button'
import { Edit, EyeIcon, Paperclip, PlusCircle, Trash } from 'lucide-react'

const AdminWebsiteProductsScreen = () => {
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery()
  console.log(products)

  if (productsLoading) return <p>Loading...</p>
  if (productsError) return <p>Error: {productsError.message}</p>

  if (!products || products.length === 0) return <p>No products found.</p>

  // Définir les en-têtes pour le tableau dynamiquement
  const headers = [
    'Nom',
    'Dolibarr Link',
    'Catégorie',
    'Prix',
    'Quantité',
    'Actions',
  ]

  // Préparer les données pour le tableau en utilisant map
  const data = products.map((product) => ({
    Nom: `${product.name}`,
    'Dolibarr Link': (
      <Link to={`/admin-dollibarr-products-details/${product.dolibarrId}`}>
        <Button icon={Paperclip} version="primary" />{' '}
      </Link>
    ),
    Catégorie: product.category,
    Prix: `${product.price} XPF`,
    Quantité: product.countInStock,
    Actions: (
      <div className="flex space-x-2">
        <Button icon={Edit}></Button>
        <Button icon={Trash}></Button>
        <Button icon={EyeIcon}></Button>
      </div>
    ),
  }))

  return (
    <>
    <div className='flex items-center justify-between my-4'>
      <h1 className="text-2xl font-bold ">Liste des produits</h1>
       <Button icon={PlusCircle} version="success" to="/admin/add-product">Ajouter</Button>
    </div>
      <Table headers={headers} data={data} version="primary" />
    </>
  )
}

export default AdminWebsiteProductsScreen
