import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetVeilleByIdQuery } from '../../slices/veilleApiSlice';
import Loader from '../FeedbackScreens/Loader'; // Assurez-vous que ce composant est importé correctement
import Button from '../../components/shared/Button'; // Assurez-vous que ce composant est importé correctement
import { ArrowBigLeft } from 'lucide-react';

const AdminWatchMonitoringDetailsScreen = () => {
  const { id } = useParams();
  const { data: veille, error: veilleError, isLoading: veilleLoading } = useGetVeilleByIdQuery(id);

  if (veilleLoading) {
    return <Loader />;
  }

  if (veilleError) {
    return <p className="text-red-500">Erreur: {veilleError.message}</p>;
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Détails de la Veille</h1>
        <Button icon={ArrowBigLeft}>
          <a href="/admin-veilles">Retour</a>
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">{veille.title}</h2>
          <p className="text-gray-600 mt-1">{veille.description}</p>
        </div>

        {veille.images && veille.images.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Images</h3>
            <div className="flex flex-wrap">
              {veille.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-md mr-4 mb-4"
                />
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-xl font-semibold">Détails Supplémentaires</h3>
          <div className="space-y-2">
            <p><strong>Catégorie:</strong> {veille.categories}</p>
            <p><strong>Langue:</strong> {veille.lang}</p>
            <p><strong>Source:</strong> {veille.source}</p>
            <p><strong>Tags:</strong> {veille.tags.join(', ')}</p>
            <p><strong>URL:</strong> <a href={veille.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{veille.url}</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWatchMonitoringDetailsScreen;
