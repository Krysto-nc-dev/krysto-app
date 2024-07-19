import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../../slices/productApiSlice'
import Loader from '../FeedbackScreens/Loader'
import Button from '../../components/shared/Button'
import { ArrowBigLeft, Loader2, Send } from 'lucide-react'
import { toast } from 'react-toastify'

const AdminWebsiteProductEditScreen = () => {
  const { id: productId } = useParams()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [dolibarrId, setDolibarrId] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0) // Initialiser avec 0
  const [countInStock, setCountInStock] = useState(0) // Initialiser avec 0

  const {
    data: product,
    error: productError,
    isLoading: productLoading,
  } = useGetProductDetailsQuery(productId)
  
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()
 console.log(product);
  const navigate = useNavigate()

  useEffect(() => {
    if (product) {
      setName(product.name || '')
      setDescription(product.description || '')
      setDolibarrId(product.dolibarrId || '')
      setImage(product.image || '')
      setCategory(product.category || '')
      setCountInStock(product.countInStock || 0) // Assurez-vous d'utiliser le bon champ
      setPrice(product.price || 0)
    }
  }, [product])

  const submitHandler = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      _id: productId,
      name,
      description,
      dolibarrId,
      image,
      category,
      countInStock,
      price
    }

    try {
      await updateProduct(updatedProduct).unwrap() // Utiliser .unwrap() pour obtenir les erreurs
      toast.success('Produit mis à jour avec succès!')
      navigate('/admin/website/produits')
    } catch (err) {
      console.error('Erreur lors de la mise à jour du produit:', err)
      toast.error('Erreur lors de la mise à jour du produit')
    }
  }

  if (productLoading) {
    return <Loader />
  }

  if (productError) {
    return <p className="text-red-500">Erreur: {productError.message}</p>
  }

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl">Editer le produit</h1>
        <Button icon={ArrowBigLeft}>
          <Link to="/admin/website/produits"> Retour</Link>
        </Button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nom du produit
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description du produit
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID Dolibarr
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={dolibarrId}
            onChange={(e) => setDolibarrId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Catégorie
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Quantité en stock
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={countInStock}
            onChange={(e) => setCountInStock(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Prix du produit
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <Button type="submit" icon={Send}>
          {loadingUpdate ? <Loader2 /> : 'Valider'}
        </Button>
      </form>
    </>
  )
}

export default AdminWebsiteProductEditScreen
