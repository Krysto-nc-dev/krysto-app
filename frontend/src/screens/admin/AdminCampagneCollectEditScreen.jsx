import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCampagneCollecteByIdQuery, useUpdateCampagneCollecteMutation } from '../../slices/campagneCollectApiSlice';
import { useGetThirdPartyDetailsQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { useGetPlasticTypesQuery } from '../../slices/plasticTypesSlice';
import { useGetPlasticColorsQuery } from '../../slices/plasticColorsApiSlice';
import Loader from '../../components/shared/Loader';
import Button from '../../components/shared/Button';
import { ArrowBigLeft, Save, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminCampagneCollectEditScreen = () => {
  const { id: campagneCollectId } = useParams();
  const navigate = useNavigate();
  
  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [collectionType, setCollectionType] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [address, setAddress] = useState('');
  const [barcode, setBarcode] = useState('');

  // Fetch data
  const { data: campagneCollect, error: campagneCollectError, isLoading: campagneCollectLoading } = useGetCampagneCollecteByIdQuery(campagneCollectId);
  const { data: plasticTypes, error: errorPlasticTypes, isLoading: loadingPlasticTypes } = useGetPlasticTypesQuery();
  const { data: plasticColors, error: errorPlasticColors, isLoading: loadingPlasticColors } = useGetPlasticColorsQuery();
  const { data: tier, error: errorTier, isLoading: loadingTier } = useGetThirdPartyDetailsQuery(campagneCollect?.dollibarTierId);
  const [updateCampagneCollecte, { isLoading: loadingUpdate }] = useUpdateCampagneCollecteMutation();

  // Initialize form fields with fetched data
  useEffect(() => {
    if (campagneCollect) {
      setTitle(campagneCollect.title || '');
      setDescription(campagneCollect.description || '');
      setCollectionType(campagneCollect.collectionType || '');
      setRecurring(campagneCollect.recurring || false);
      setFrequency(campagneCollect.frequency || '');
      setStartDate(campagneCollect.startDate || '');
      setEndDate(campagneCollect.endDate || '');
      setAddress(campagneCollect.address || '');
      setBarcode(campagneCollect.barcode || '');
    }
  }, [campagneCollect]);

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedCampagneCollecte = {
      _id: campagneCollectId,
      title,
      description,
      collectionType,
      recurring,
      frequency,
      startDate,
      endDate,
      address,
      barcode
    };

    try {
      await updateCampagneCollecte(updatedCampagneCollecte).unwrap();
      toast.success('Campagne de collecte mise à jour avec succès !');
      navigate('/admin-campagnes-collecte');
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la campagne de collecte:', err);
      toast.error('Erreur lors de la mise à jour de la campagne de collecte');
    }
  };

  if (campagneCollectLoading) {
    return <Loader />;
  }

  if (campagneCollectError) {
    return <p className="text-red-500">Erreur : {campagneCollectError.message}</p>;
  }

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Éditer la Campagne de Collecte</h1>
        <Button url={'/admin-campagnes-collecte'}><ArrowBigLeft /> Retour</Button>
      </div>

      <form onSubmit={submitHandler} className="space-y-6  rounded-lg shadow-md ">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primaryColor focus:ring focus:ring-primaryColor focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primaryColor focus:ring focus:ring-primaryColor focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Type de Collecte</label>
          <input
            type="text"
            value={collectionType}
            onChange={(e) => setCollectionType(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primaryColor focus:ring focus:ring-primaryColor focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Récurrence</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              className="h-4 w-4 text-primaryColor focus:ring-primaryColor border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">Oui</span>
          </div>
        </div>

        {recurring && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Fréquence</label>
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primaryColor focus:ring focus:ring-primaryColor focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Date de Début</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primaryColor focus:ring focus:ring-primaryColor focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Date de Fin</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primaryColor focus:ring focus:ring-primaryColor focus:ring-opacity-50"
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Adresse</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primaryColor focus:ring focus:ring-primaryColor focus:ring-opacity-50"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Code-barres</label>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primaryColor focus:ring focus:ring-primaryColor focus:ring-opacity-50"
          />
        </div>

        <Button type="submit" icon={Save}>
          {loadingUpdate ? <Loader2 /> : 'Enregistrer'}
        </Button>
      </form>
    </div>
  );
};

export default AdminCampagneCollectEditScreen;
