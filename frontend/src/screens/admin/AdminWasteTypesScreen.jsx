import React from 'react';
import Button from '../../components/shared/Button';
import { ArrowBigLeft, Edit, Eye, PlusCircle, Trash } from 'lucide-react';
import { useGetWastesQuery } from '../../slices/wasteTypeApiSlice';
import Loader from '../FeedbackScreens/Loader'; // Assurez-vous que ce composant est importé correctement
import Card from '../../components/shared/Card';

const AdminWasteTypesScreen = () => {
  const { data: wasteTypes, error: wasteTypesError, isLoading: wasteTypesLoading } = useGetWastesQuery();

  if (wasteTypesLoading) {
    return <Loader />;
  }

  if (wasteTypesError) {
    return <p className="text-red-500">Erreur: {wasteTypesError.message}</p>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Types de Déchets</h1>
        <Button url="/admin-settings" icon={ArrowBigLeft}>
          Retour
        </Button>
      </div>
      <Button icon={PlusCircle}>Ajouter un nouveaux type de déchets</Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3">
        {wasteTypes && wasteTypes.length > 0 ? (
          wasteTypes.map((wasteType) => (
            <Card url={`/admin-types-de-dechet-detail/${wasteType._id}`} variant={"dark"} key={wasteType._id} className="bg-gray-300 shadow-md rounded-lg p-4 ">
              <div className="text-center mb-3">
                <h2 className="text-sm font-semibold">{wasteType.waste}</h2>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Button version={"primary"} icon={Eye}/>
                <Button version={"warning"} icon={Edit}/>
                <Button version={"danger"} icon={Trash}/>
              </div>
            </Card>
          ))
        ) : (
          <p>Aucun type de déchet disponible.</p>
        )}
      </div>
    </div>
  );
};

export default AdminWasteTypesScreen;
