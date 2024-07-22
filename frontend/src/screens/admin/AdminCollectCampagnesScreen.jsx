import React from 'react';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useGetCampagnesCollecteQuery } from '../../slices/campagneCollectApiSlice';
import Button from '../../components/shared/Button';
import { Edit, EyeIcon, Trash } from 'lucide-react';

const AdminCollectCampagnesScreen = () => {
  const { data: collectCampagnes, error: errorCampagnes, isLoading: loadingCampagnes } = useGetCampagnesCollecteQuery();

  if (loadingCampagnes) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (errorCampagnes) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-red-600">Erreur : {errorCampagnes.message}</div>
      </div>
    );
  }

  if (!collectCampagnes || collectCampagnes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-gray-600">Aucune Campagne de Collecte</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif':
        return 'bg-green-500 text-white';
      case 'Inactif':
      case 'Annulé':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Campagnes de Collecte</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Titre</th>
              <th className="px-6 py-3 text-left">Type de collecte</th>
              <th className="px-6 py-3 text-left">Tier</th>
              <th className="px-6 py-3 text-left">Récurrence</th>
              <th className="px-6 py-3 text-left">Fréquence</th>
              <th className="px-6 py-3 text-left">Adresse</th>
              <th className="px-6 py-3 text-left">Statut</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100">
            {collectCampagnes.map((campagne) => (
              <tr key={campagne._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">{campagne.title}</td>
                <td className="px-6 py-4">{campagne.collectionType}</td>
                <td className="px-6 py-4">{campagne.dollibarTierId}</td>
                <td className="px-6 py-4">{campagne.recurring ? 'Oui' : 'Non'}</td>
                <td className="px-6 py-4">{campagne.frequency}</td>
                <td className="px-6 py-4">{campagne.address}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-4 py-2 ${getStatusColor(campagne.status)} rounded-full text-center`}>
                    {campagne.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center flex gap-3">
          
                  <Button version={'primary'} url={`/admin-campagne-collecte-details/${campagne._id}`} icon={EyeIcon}/>
                  <Button version={'warning'} url={`/admin-campagne-collecte-edit/${campagne._id}`} icon={Edit}/>
                  <Button version={'danger'}  icon={Trash}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCollectCampagnesScreen;
