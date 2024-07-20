import { ArrowBigLeft } from 'lucide-react';
import React from 'react';
import Button from '../../components/shared/Button';
import { useParams } from 'react-router-dom';
import { useGetPlasticColorDetailsQuery } from '../../slices/plasticColorsApiSlice';
import Loader from '../FeedbackScreens/Loader';

const AdminPlasticColorDetailsScreen = () => {
  const { id: plasticColorId } = useParams();
  const { data: plasticColor, error: plasticColorError, isLoading: plasticColorLoading } = useGetPlasticColorDetailsQuery(plasticColorId);

  if (plasticColorLoading) {
    return <Loader/>;
  }

  if (plasticColorError) {
    return <p>Erreur de chargement des détails de la couleur de plastique.</p>;
  }

  if (!plasticColor) {
    return <p>Aucune couleur de plastique trouvée.</p>;
  }

  return (
    <>
      <div className="mb-6 flex items-start justify-between">
   
        <Button version={'primary'} icon={ArrowBigLeft} url="/admin-dashboard">
          Retour
        </Button>
      </div>
      <div className="flex items-center mb-4">
          <img
            src={plasticColor.images[0] || '/default-placeholder.png'}
            alt={plasticColor.name}
            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-semibold">{plasticColor.name}</h2>
          
          </div>
        </div>
     
    </>
  );
};

export default AdminPlasticColorDetailsScreen;
