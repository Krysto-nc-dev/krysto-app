import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
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
  const [imagesArray, setImagesArray] = useState([]) // Changer 'image' en tableau
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)

  const {
    data: product,
    error: productError,
    isLoading: productLoading,
    refetch
  } = useGetProductDetailsQuery(productId)

  console.log(product)

  const [
    updateProduct,
    { isLoading: loadingUpdate },
  ] = useUpdateProductMutation()

  const [
    uploadProductImage,
    { isLoading: uploadMutationLoading },
  ] = useUploadProductImageMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (product) {
      setName(product?.name || '')
      setDescription(product?.description || '')
      setDolibarrId(product?.dolibarrId || '')
      setImagesArray(product?.images || [])
      setCategory(product?.category || '')
      setCountInStock(product?.countInStock || 0)
      setPrice(product?.price || 0)
    }
  }, [product])

  const submitHandler = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      _id: productId,
      name,
      description,
      dolibarrId,
      images: imagesArray, // Adapter pour les images
      category,
      countInStock,
      price,
    }

    try {
      await updateProduct(updatedProduct).unwrap()
      toast.success('Produit mis à jour avec succès!')
      refetch()
      navigate('/admin/website/produits')
    } catch (err) {
      console.error('Erreur lors de la mise à jour du produit:', err)
      toast.error('Erreur lors de la mise à jour du produit')
    }
  }


  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('images', e.target.files[0])

    try {
    
      const res = await uploadProductImage(formData).unwrap()
      setImagesArray((prevImages) => [...prevImages, ...res.images])
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    } finally {
     
    }
  }

  const removeImage = (index) => {
    const newImagesArray = [...imagesArray]
    newImagesArray.splice(index, 1)
    setImagesArray(newImagesArray)
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
    Images
  </label>
  <div className="flex flex-wrap">
    {imagesArray.length > 0 ? (
      imagesArray.map((image, index) => (
        <div key={index} className="relative mr-4 mb-4">
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="w-32 h-32 object-cover"
          />
          <button
            type="button"
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
            onClick={() => removeImage(index)}
          >
            X
          </button>
        </div>
      ))
    ) : (
      <p>Aucune image ajoutée</p>
    )}
  </div>
  <input
    type="file"
    multiple
    onChange={uploadFileHandler}
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
