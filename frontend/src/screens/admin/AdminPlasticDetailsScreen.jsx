import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPlasticTypeDetailsQuery } from '../../slices/plasticTypesSlice'
import Loader from '../FeedbackScreens/Loader'

import Button from '../../components/shared/Button'
import { ArrowBigLeft } from 'lucide-react'

const AdminPlasticDetailsScreen = () => {
  const { id: plasticTypeId } = useParams()
  const { data: plasticType, error, isLoading } = useGetPlasticTypeDetailsQuery(plasticTypeId)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
        <p>une erreur est survenue</p>
    )
  }

  return (
    <div className="p-6 max-w-9xl mx-auto">
      <div className="mb-6 flex items-start justify-between">
        <Button version="secondary" icon={ArrowBigLeft} url="/admin-plastiques">
          Retour
        </Button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <img
            src={plasticType.images[0] || '/default-placeholder.png'}
            alt={plasticType.sigleFr}
            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-semibold">{plasticType.sigleFr} ({plasticType.sigleEn})</h2>
            <p className="text-gray-600 text-lg">{plasticType.scientificNameFr} ({plasticType.scientificNameEn})</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p>{plasticType.description}</p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Informations Techniques</h3>
            <ul className="list-disc list-inside">
              <li><strong>Température d'injection :</strong> {plasticType.injectionTemperature}</li>
              <li><strong>Point de fusion :</strong> {plasticType.meltingPoint} °C</li>
              <li><strong>Densité :</strong> {plasticType.density} g/cm³</li>
              <li><strong>Résistance thermique :</strong> {plasticType.heatResistance}</li>
              <li><strong>Résistance chimique :</strong> {plasticType.chemicalResistance}</li>
              <li><strong>Rigidité :</strong> {plasticType.rigidity}</li>
              <li><strong>Toxicité :</strong> {plasticType.toxicity}</li>
              <li><strong>Impact environnemental :</strong> {plasticType.environmentalImpact}</li>
            </ul>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-sm bg-gray-50 mb-6">
          <h3 className="text-lg font-semibold mb-2">Flottabilité</h3>
          <ul className="list-disc list-inside">
            <li><strong>Alcool :</strong> {plasticType.flotability.alcohol ? 'Oui' : 'Non'}</li>
            <li><strong>Huile végétale :</strong> {plasticType.flotability.vegetableOil ? 'Oui' : 'Non'}</li>
            <li><strong>Eau :</strong> {plasticType.flotability.water ? 'Oui' : 'Non'}</li>
            <li><strong>Glycérine :</strong> {plasticType.flotability.glycerine ? 'Oui' : 'Non'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminPlasticDetailsScreen
