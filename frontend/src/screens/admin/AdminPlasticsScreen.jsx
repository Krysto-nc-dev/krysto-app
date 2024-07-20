import React from 'react'
import {
  useCreatePlasticTypeMutation,
  useDeletePlasticTypeMutation,
  useGetPlasticTypesQuery,
} from '../../slices/plasticTypesSlice'
import Button from '../../components/shared/Button'
import { Edit, EyeIcon, Loader2, PlusCircle, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../FeedbackScreens/Loader'

const AdminPlasticsScreen = () => {
  const {
    data: plasticTypes,
    error: plasticTypesError,
    isLoading: plasticTypesLoading,
    refetch,
  } = useGetPlasticTypesQuery()

  const [
    createPlasticType,
    { isLoading: loadingCreate },
  ] = useCreatePlasticTypeMutation()

  const [
    deletePlasticType,
    { isLoading: deletePlasticTypeLoading },
  ] = useDeletePlasticTypeMutation()

  if (plasticTypesLoading) return <Loader />
  if (plasticTypesError)
    return <p className="text-red-500">Erreur: {plasticTypesError.message}</p>
  const createPlasticTypeHandler = async () => {
    if (window.confirm('Voulez-vous ajouter un produit?')) {
      try {
        await createPlasticType()
        refetch()
        toast.success('Type de plastique créé avec succès')
      } catch (err) {
        toast.error('Erreur lors de la création du type de plastique')
      }
    }
  }

  const deleteHandler = async (id) => {
    if (window.confirm('Etes-vous sur de vouloir supprimer ce produit?')) {
      try {
        await deletePlasticType(id).unwrap()
        toast.success('Type de plastique supprimé avec succès!')
        refetch()
      } catch (err) {
        toast.error('Erreur lors de la suppression du type de plastique')
      }
    }
  }

  if (deletePlasticTypeLoading) return <Loader />

  return (
    <>
    <div className='flex items-center justify-between mb-8'>

      <h1 className="text-gray-800 text-2xl ">Types de Plastique</h1>
      <Button
        onClick={createPlasticTypeHandler}
        icon={PlusCircle}
        version="success"
        >
        {loadingCreate ? <Loader2 /> : 'Ajouter'}
      </Button>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plasticTypes.map((plastic) => (
          <div
            key={plastic._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={plastic.images[0] || '/uploads/no-photo.png'}
              alt={plastic.scientificNameFr}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">
                {plastic.sigleFr} ({plastic.sigleEn})
              </h2>
              <p className="text-gray-600 mt-2">
                {plastic.scientificNameFr} ({plastic.scientificNameEn})
              </p>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  <strong>Impact Environnemental:</strong>{' '}
                  {plastic.environmentalImpact}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Température d'Injection:</strong>{' '}
                  {plastic.injectionTemperature}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Point de Fusion:</strong> {plastic.meltingPoint}°C
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Densité:</strong> {plastic.density}
                </p>
              </div>
              <div className="mb-4 mt-4 flex justify-center items-center gap-5">
                <Button
                version={"primary"}
                  url={`/admin/plastic-type-details/${plastic._id}`}
                  icon={EyeIcon}
                />

                <Button
                  url={`/admin/plastic-type-modifier/${plastic._id}`}
                  version={'warning'}
                  icon={Edit}
                />

                <Button
                  onClick={() => deleteHandler(plastic._id)}
                  version={'danger'}
                  icon={Trash}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminPlasticsScreen
