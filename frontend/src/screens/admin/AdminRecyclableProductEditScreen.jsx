import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetRecyclableProductDetailsQuery,
  useUpdateRecyclableProductMutation,
  useUploadRecyclableProductImageMutation,
} from '../../slices/recyclableProductApiSlice'
import Loader from '../FeedbackScreens/Loader'
import Button from '../../components/shared/Button'
import { ArrowBigLeft, Loader2, Send } from 'lucide-react'
import { toast } from 'react-toastify'

const AdminRecyclableProductEditScreen = () => {
  const { id: recyclableProductId } = useParams()
  const navigate = useNavigate()

  // States for form fields
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [weightGr, setWeightGr] = useState('')
  const [description, setDescription] = useState('')
  const [recyclingNote, setRecyclingNote] = useState('')
  const [imagesArray, setImagesArray] = useState([])
  const [barCode, setBarCode] = useState('')

  // List of categories
  const categories = ['Alimentaires', 'Beaute', 'Entretien', 'Autres']

  // List of recycling notes
  const recyclingNotes = [ 1, 1.5, 2, 2.5, 3,3.5,4,4.5] // Replace with actual notes

  // Query and mutations
  const { data: recyclableProduct, error: recyclableProductError, isLoading: recyclableProductLoading, refetch } = useGetRecyclableProductDetailsQuery(recyclableProductId)
  const [updateRecyclableProduct, { isLoading: loadingUpdate }] = useUpdateRecyclableProductMutation()
  const [uploadRecyclableProductImage, { isLoading: uploadMutationLoading }] = useUploadRecyclableProductImageMutation()

  // Effect to set form values from fetched data
  useEffect(() => {
    if (recyclableProduct) {
      setName(recyclableProduct.name || '')
      setBrand(recyclableProduct.brand || '')
      setCategory(recyclableProduct.category || '')
      setWeightGr(recyclableProduct.weightGr || '')
      setDescription(recyclableProduct.description || '')
      setRecyclingNote(recyclableProduct.recyclingNote || '')
      setImagesArray(recyclableProduct.images || [])
      setBarCode(recyclableProduct.barCode || '')
    }
  }, [recyclableProduct])

  // Form submit handler
  const submitHandler = async (e) => {
    e.preventDefault()

    const updatedRecyclableProduct = {
      _id: recyclableProductId,
      name,
      brand,
      category,
      weightGr,
      description,
      recyclingNote,
      images: imagesArray,
      barCode,
    }

    try {
      await updateRecyclableProduct(updatedRecyclableProduct).unwrap()
      toast.success('Produit recyclable mis à jour avec succès!')
      refetch()
      navigate('/admin-produits-recyclable')
    } catch (err) {
      console.error('Erreur lors de la mise à jour du produit recyclable:', err)
      toast.error('Erreur lors de la mise à jour du produit recyclable')
    }
  }

  // Image upload handler
  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('images', e.target.files[0])

    try {
      const res = await uploadRecyclableProductImage(formData).unwrap()
      setImagesArray((prevImages) => [...prevImages, ...res.images])
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  // Remove image handler
  const removeImage = (index) => {
    const newImagesArray = [...imagesArray]
    newImagesArray.splice(index, 1)
    setImagesArray(newImagesArray)
  }

  if (recyclableProductLoading) {
    return <Loader />
  }

  if (recyclableProductError) {
    return <p className="text-red-500">Erreur: {recyclableProductError.message}</p>
  }

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl text-gray-800">Éditer le produit recyclable : {recyclableProductId}</h1>
        <Button url={'/admin-produits-recyclable'}><ArrowBigLeft /> Retour</Button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Marque</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Catégorie</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Poids (g)</label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={weightGr}
            onChange={(e) => setWeightGr(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Note de Recyclage</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={recyclingNote}
            onChange={(e) => setRecyclingNote(e.target.value)}
          >
            <option value="" disabled>Sélectionner une note</option>
            {recyclingNotes.map((note) => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Images</label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Code-barres</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={barCode}
            onChange={(e) => setBarCode(e.target.value)}
          />
        </div>

        <Button type="submit" icon={Send}>
          {loadingUpdate ? <Loader2 /> : 'Valider'}
        </Button>
      </form>
    </>
  )
}

export default AdminRecyclableProductEditScreen
