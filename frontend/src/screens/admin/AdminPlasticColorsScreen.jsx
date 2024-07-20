import React from 'react'
import { ArrowBigLeft, Edit, EyeIcon, Loader2, PlusCircle, Trash } from 'lucide-react'
import Button from '../../components/shared/Button'
import { useCreatePlasticColorMutation, useDeletePlasticColorMutation, useGetPlasticColorsQuery } from '../../slices/plasticColorsApiSlice'
import Loader from '../FeedbackScreens/Loader'
import Rating from '../../components/shared/Rating'
import { toast } from 'react-toastify'


const AdminPlasticColorsScreen = () => {
  // Utilisation du hook pour obtenir les couleurs de plastique
  const { data: plasticColors, error, isLoading , refetch} = useGetPlasticColorsQuery()


  const [
    createPlasticColor,
    { isLoading: loadingCreate },
  ] = useCreatePlasticColorMutation()

  const [
    deletePlasticColor,
    { isLoading: deletePlasticColorLoading },
  ] = useDeletePlasticColorMutation()

  const createPlasticColorHandler = async () => {
    if (window.confirm('Voulez-vous ajouter une couleur ?')) {
      try {
        await createPlasticColor()
        refetch()
        toast.success('Couleur créé avec succès')
      } catch (err) {
        toast.error('Erreur lors de la création de la couleur')
      }
    }
  }

  const deleteHandler = async (id) => {
    if (window.confirm('Etes-vous sur de vouloir supprimer cette couleur ?')) {
      try {
        await deletePlasticColor(id).unwrap()
        toast.success('Couleur de plastique supprimé avec succès!')
        refetch()
      } catch (err) {
        toast.error('Erreur lors de la suppression de la couleur')
      }
    }
  }

  if (deletePlasticColorLoading) return <Loader />


  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (<p > Une erreur est survenue lors du chargement des couleurs de plastique.</p>)
  }

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
       

        <h1 className='text-2xl'>Couleurs de plastique</h1>
        <Button version="secondary" icon={ArrowBigLeft} url="/admin-dashboard">
          Retour
        </Button>
       
    
      </div>
      <Button
        onClick={createPlasticColorHandler}
        icon={PlusCircle}
        version="success"
        >
        {loadingCreate ? <Loader2 /> : 'Ajouter'}
      </Button>

      <div className=" mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plasticColors.length > 0 ? (
          plasticColors.map((color) => (
            <div key={color._id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">{color.name}</h2>
              <div className="mb-2">
                <img
                  src={color.images[0]} // Affichage de la première image
                  alt={color.name}
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>
              <div className="flex items-center justify-between">

              <p className="text-sm text-gray-700 mt-3">Indice de rareté</p>
              <Rating value={color.rarityIndex}/>
              </div>
              <div className="flex  items-center justify-between mt-5 ">
                <Button url={`/admin-plastique-couleurs-details/${color._id}`} icon={EyeIcon} version={"primary"}/>
                <Button url={`/admin-plastique-couleurs-edit/${color._id}`} icon={Edit} version={"warning"}/>
                <Button  onClick={() => deleteHandler(color._id)} icon={Trash} version={"danger"}/>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune couleur de plastique disponible.</p>
        )}
      </div>
    </>
  )
}

export default AdminPlasticColorsScreen
