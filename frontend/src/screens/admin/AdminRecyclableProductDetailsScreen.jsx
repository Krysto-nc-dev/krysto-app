import React from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/shared/Button'
import { ArrowBigLeft } from 'lucide-react'
import { useGetRecyclableProductDetailsQuery } from '../../slices/recyclableProductApiSlice'
import Barcode from 'react-barcode'
import Rating from '../../components/shared/Rating'

const AdminRecyclableProductDetailsScreen = () => {
  const { id: recyclableProductId } = useParams()
  const { data: recyclableProduct, error: recyclableProductError, isLoading: recyclableProductLoading } = useGetRecyclableProductDetailsQuery(recyclableProductId)

  if (recyclableProductLoading) {
    return <p>Chargement...</p>
  }

  if (recyclableProductError) {
    return <p>Erreur de chargement des détails du produit recyclable.</p>
  }

  if (!recyclableProduct) {
    return <p>Aucun produit trouvé.</p>
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className='text-2xl font-semibold text-gray-800'>Détails du produit recyclable</h1>
        <Button url={'/admin-produits-recyclable'}><ArrowBigLeft /> Retour</Button>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
        {/* Code-barres positionné en haut à droite du composant */}
        <div className="absolute top-4 right-4">
          <Barcode
            value={recyclableProduct.barCode}
            format="EAN13"
            displayValue={true}
            width={2}
            height={60}
            background="#ffffff"
            lineColor="#000000"
          />
        </div>
        
        <div className="flex">
          {/* Section de l'image */}
          <div className="w-1/3 p-4">
            <img
              src={recyclableProduct.images[0] || '/uploads/no-photo.png'}
              alt={recyclableProduct.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Détails du produit */}
          <div className="w-2/3 p-6">
            <h2 className="text-3xl font-bold mb-4">{recyclableProduct.name}</h2>
            <p className="text-gray-700 mb-2"><strong>Marque:</strong> {recyclableProduct.brand}</p>
            <p className="text-gray-700 mb-2"><strong>Catégorie:</strong> {recyclableProduct.category}</p>
            <p className="text-gray-700 mb-2"><strong>Poids:</strong> {recyclableProduct.weightGr} g</p>
            <p className="text-gray-700 mb-2"><strong>Description:</strong> {recyclableProduct.description}</p>
            <div className="flex items-center justify-between bg-gray-600 p-2 rounded-md">

            <p className="text-gray-200">Note de Recyclage:</p>
            <Rating value={recyclableProduct.recyclingNote} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminRecyclableProductDetailsScreen
