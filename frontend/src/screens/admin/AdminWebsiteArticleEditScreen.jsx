import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Loader from '../FeedbackScreens/Loader'
import Button from '../../components/shared/Button'
import { ArrowBigLeft, Loader2, Send } from 'lucide-react'
import { toast } from 'react-toastify'
import { useGetArticleDetailsQuery, useUpdateArticleMutation, useUploadArticleImageMutation } from '../../slices/articleApiSlice'
import { useSelector } from 'react-redux'

const AdminWebsiteArticleEditScreen = () => {
  const { id: articleId } = useParams()

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [imagesArray, setImagesArray] = useState([]) // Changer 'image' en tableau
  const [category, setCategory] = useState('')
  
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: article,
    error: articleError,
    isLoading: articleLoading,
    refetch
  } = useGetArticleDetailsQuery(articleId)

  console.log(article)

  const [
    updateArticle,
    { isLoading: loadingUpdate },
  ] = useUpdateArticleMutation()

  const [
    uploadArticleImage,
    { isLoading: uploadMutationLoading },
  ] = useUploadArticleImageMutation()


  const navigate = useNavigate()

  useEffect(() => {
    if (article) {

      setTitle(article?.title || '')
      setSubtitle(article?.subtitle || '')
      setImagesArray (article?.images || [])
      setCategory(article?.category || '')
     
    }
  }, [article])

  const submitHandler = async (e) => {
    e.preventDefault()

    const updatedArticle = {
      _id: articleId,
      author: userInfo._id ,
      title,
      subtitle, // Adapter pour le sous-titre
      images: imagesArray, // Adapter pour les images
      category,
   
    }

    try {
      await updateArticle(updatedArticle).unwrap()
      toast.success('Article mis à jour avec succès!')
      refetch()
      navigate('/admin/website/blog-articles')
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'article:", err)
      toast.error("Erreur lors de la mise à jour de l'article:", err)
    }
  }


  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('images', e.target.files[0])

    try {
    
      const res = await uploadArticleImage(formData).unwrap()
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

  if (articleLoading) {
    return <Loader />
  }

  if (articleError) {
    return <p className="text-red-500">Erreur: {articleError.message}</p>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sous titre
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
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
       
        <Button type="submit" icon={Send}>
          {loadingUpdate ? <Loader2 /> : 'Valider'}
        </Button>
      </form>
    </>
  )
}

export default AdminWebsiteArticleEditScreen
