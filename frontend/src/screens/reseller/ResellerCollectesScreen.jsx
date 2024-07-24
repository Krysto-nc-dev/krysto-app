import React from 'react';
import { useGetCampagnesCollecteQuery } from '../../slices/campagneCollectApiSlice';
import { useSelector } from 'react-redux';
import { useGetResellerProfileQuery } from '../../slices/userApiSlice';
import Loader from '../FeedbackScreens/Loader';

const ResellerCollectesScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Récupération des données du profil du revendeur
  const { data: resellerProfile, error: resellerProfileError, isLoading: resellerProfileLoading } = useGetResellerProfileQuery(userInfo._id);

  // Récupération des données des campagnes de collecte
  const { data: campagneCollectes, error: campagneCollectesError, isLoading: loadingCampagneCollectes } = useGetCampagnesCollecteQuery();

  // Affichage d'un message de chargement pendant le chargement des données
  if (resellerProfileLoading || loadingCampagneCollectes) {
    return <Loader />;
  }

  // Gestion des erreurs de récupération des données
  if (resellerProfileError || campagneCollectesError) {
    return (
      <div className="text-red-500 p-4">
        Erreur: {resellerProfileError?.message || campagneCollectesError?.message}
      </div>
    );
  }

  // Vérifiez les valeurs des identifiants
  console.log('Reseller Profile:', resellerProfile);
  console.log('Campagne Collectes:', campagneCollectes);

  // Utilisez la bonne propriété pour le filtrage
  const resellerThirdPartyId = resellerProfile?.dollibarThirdPartyId?.toString(); // Convertir en chaîne si nécessaire
  console.log('Reseller Third Party ID:', resellerThirdPartyId); // Ajoutez ce log pour vérifier la valeur

  const filteredCampagnes = campagneCollectes?.filter(
    campagne => campagne.dollibarTierId?.toString() === resellerThirdPartyId
  ) || []; // Assurez-vous que filteredCampagnes est un tableau même si aucune campagne n'est trouvée

  console.log('Filtered Campagnes:', filteredCampagnes); // Ajoutez ce log pour vérifier les résultats du filtrage

  return (
    <div className="p-2  min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Collectes de plastique</h1>
      <p className="text-lg mb-6 text-gray-700">
        Cette page offre un récapitulatif des collectes effectuées par Krysto dans votre magasin, avec les détails des quantités collectées et les dates des interventions. Vous pouvez également demander une collecte ponctuelle ou souscrire à un abonnement mensuel ou hebdomadaire pour un service régulier.
      </p>
      {filteredCampagnes.length > 0 ? (
        <div className="space-y-4">
          {filteredCampagnes.map((campagne) => (
            <div key={campagne._id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-medium mb-2">{campagne.title}</h2>
              <p className="text-gray-600 mb-1"><strong>Description:</strong> {campagne.description}</p>
              <p className="text-gray-600 mb-1"><strong>Type de Collecte:</strong> {campagne.collectionType}</p>
              <p className="text-gray-600 mb-1"><strong>Date de Début:</strong> {new Date(campagne.startDate).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-1"><strong>Date de Fin:</strong> {new Date(campagne.endDate).toLocaleDateString()}</p>
              <p className="text-gray-600"><strong>Adresse:</strong> {campagne.address}</p>
              {campagne.contract && (
                <p className="text-blue-500 mt-2">
                  <a href={campagne.contract} target="_blank" rel="noopener noreferrer">Voir le contrat de collecte</a>
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">Aucune collecte trouvée pour ce niveau.</p>
      )}
    </div>
  );
};

export default ResellerCollectesScreen;
