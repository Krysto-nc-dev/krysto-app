import React from 'react';
import { useGetPlasticTypesQuery } from '../../slices/plasticTypesSlice';

const AdminPlasticsScreen = () => {
  const { data: plasticTypes, error: plasticTypesError, isLoading: plasticTypesLoading } = useGetPlasticTypesQuery();

  if (plasticTypesLoading) return <p className="text-gray-500">Chargement...</p>;
  if (plasticTypesError) return <p className="text-red-500">Erreur: {plasticTypesError.message}</p>;

  return (
    <>
      <h1 className='text-gray-800 text-2xl mb-6'>Types de Plastique</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plasticTypes.map(plastic => (
          <div key={plastic._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={plastic.images[0] || '/uploads/no-photo.png'}
              alt={plastic.scientificNameFr}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{plastic.sigleFr} ({plastic.sigleEn})</h2>
              <p className="text-gray-600 mt-2">{plastic.scientificNameFr} ({plastic.scientificNameEn})</p>
             
              <div className="mt-4">
               
                <p className="text-sm text-gray-500"><strong>Impact Environnemental:</strong> {plastic.environmentalImpact}</p>
                <p className="text-sm text-gray-500"><strong>Température d'Injection:</strong> {plastic.injectionTemperature}</p>
                <p className="text-sm text-gray-500"><strong>Point de Fusion:</strong> {plastic.meltingPoint}°C</p>
                <p className="text-sm text-gray-500"><strong>Densité:</strong> {plastic.density}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminPlasticsScreen;
