import React from 'react'
import { useCreateRecyclableProductMutation, useDeleteRecyclableProductMutation, useGetRecyclableProductsQuery } from '../../slices/recyclableProductApiSlice'
import Rating from '../../components/shared/Rating'
import { toast } from 'react-toastify'
import Button from '../../components/shared/Button'
import { Edit, EyeIcon, Loader2, PlusCircle, Trash } from 'lucide-react'
import Loader from '../FeedbackScreens/Loader'

const AdminRecyclableProductsScreen = () => {
  const { data: recyclableProducts, error: recyclableProductsError, isLoading: recyclableProductsLoading , refetch } = useGetRecyclableProductsQuery()


  const [
    createRecyclableProduct,
    { isLoading: loadingCreate },
  ] = useCreateRecyclableProductMutation()

  const [
    deleteRecyclableProduct,
    { isLoading: deleteRecyclableProductLoading },
  ] = useDeleteRecyclableProductMutation()





  const createRecyclableProductHandler = async () => {
    if (window.confirm('Voulez-vous ajouter un produit recyclable ?')) {
      try {
        await createRecyclableProduct()
        refetch()
        toast.success('Produit recyclable créé avec succès')
      } catch (err) {
        toast.error('Erreur lors de la création du produit recyclable')
      }
    }
  }

  const deleteHandler = async (id) => {
    if (window.confirm('Etes-vous sur de vouloir supprimer ce produit recyclable ?')) {
      try {
        await deleteRecyclableProduct(id).unwrap()
        toast.success('Produit recyclable supprimé avec succès!')
        refetch()
      } catch (err) {
        toast.error('Erreur lors de la suppression du produit recyclable')
      }
    }
  }
  if (deleteRecyclableProductLoading) return <Loader />

  if (recyclableProductsLoading) {
    return <Loader/>
  }

  if (recyclableProductsError) {
    return <p>Erreur de chargement des produits recyclables.</p>
    
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">

      <h1 className='text-gray-800 text-2xl mb-4'>Produits recyclables</h1>
      <Button
        onClick={createRecyclableProductHandler}
        icon={PlusCircle}
        version="success"
        >
        {loadingCreate ? <Loader2 /> : 'Ajouter'}
      </Button>
          </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recyclableProducts && recyclableProducts.length > 0 ? (
          recyclableProducts.map((product) => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={product.images[0] || '/uploads/no-photo.png'}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-1"><strong>Marque:</strong> {product.brand}</p>
                <p className="text-gray-700 mb-1"><strong>Catégorie:</strong> {product.category}</p>
   
              
              <Rating value={product.recyclingNote}/>
              <div className="mb-4 mt-4 flex justify-center items-center gap-5">
                <Button
                version={"primary"}
                  url={`/admin/recyclable-product-details/${product._id}`}
                  icon={EyeIcon}
                />

                <Button
                  url={`/admin/recyclable-product-edit/${product._id}`}
                  version={'warning'}
                  icon={Edit}
                />

                <Button
                  onClick={() => deleteHandler(product._id)}
                  version={'danger'}
                  icon={Trash}
                />
              </div>
               
              </div>
            </div>
          ))
        ) : (
          <p>Aucun produit recyclable disponible.</p>
        )}
      </div>
    </div>
  )
}

export default AdminRecyclableProductsScreen
