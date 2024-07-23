import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetResellerProfileQuery } from '../../slices/userApiSlice';
import Loader from '../FeedbackScreens/Loader';
import { HelpCircle, Loader2, Send } from 'lucide-react';
import { useGetWarehouseDetailsQuery } from '../../slices/dolibarr/dolliWarehouseApiSlice';
import { useGetThirdPartyDetailsQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { Link } from 'react-router-dom';
import Button from '../../components/shared/Button';

const ResellerProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: resellerProfile,
    error: resellerProfileError,
    isLoading: resellerProfileLoading,
  } = useGetResellerProfileQuery(userInfo._id);

  const {
    data: warehouse,
    error: warehouseError,
    isLoading: warehouseLoading,
  } = useGetWarehouseDetailsQuery(resellerProfile?.dollibarWarehousId || '', {
    skip: !resellerProfile,
  });

  const {
    data: thirdparty,
    error: thirdpartyError,
    isLoading: thirdpartyLoading,
  } = useGetThirdPartyDetailsQuery(
    resellerProfile?.dollibarThirdPartyId || '',
    { skip: !resellerProfile },
  );

  // State pour la gestion du formulaire
  const [showOnSite, setShowOnSite] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleCheckboxChange = (e) => {
    setShowOnSite(e.target.checked);
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gérer l'envoi du formulaire
    console.log('Form Submitted:', { showOnSite, logoFile, comment, name, position });
  };

  return (
    <div className="p-6 max-w-9xl mx-auto bg-white rounded-lg shadow-md">
      {(resellerProfileLoading || warehouseLoading || thirdpartyLoading) && (
        <Loader />
      )}

      {!resellerProfileLoading && (
        <div>
          {resellerProfileError || warehouseError || thirdpartyError ? (
            <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded-md mb-6">
              <h1 className="text-lg font-semibold">Une erreur est survenue</h1>
              <p>
                Nous rencontrons des difficultés pour charger les informations.
                Si vous constatez une erreur dans les informations de votre
                profil, veuillez nous contacter pour que nous puissions les
                modifier.
              </p>
              <p>
                Pour toute assistance, veuillez nous contacter à{' '}
                <a
                  href="mailto:contact@krysto.nc"
                  className="text-blue-600 hover:underline"
                >
                  contact@krysto.nc
                </a>
                .
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4">
                Profil de{' '}
                <strong>
                  {resellerProfile?.storeName || <Loader2 className="inline" />}
                </strong>
              </h1>
              <section className="p-4 bg-red-100 rounded-lg shadow-md mb-10 text-sm">
                <div className="flex items-center gap-3 mb-2">
                  <HelpCircle />
                  <h2 className="text-lg font-semibold">Assistance</h2>
                </div>
                <p className="mb-2">
                  Vous constatez une erreur dans les données affichées ici ?
                </p>
                <p>
                  Contactez-nous à l'adresse{' '}
                  <a
                    href="mailto:contact@krysto.nc"
                    className="text-blue-600 underline mx-2"
                  >
                    contact@krysto.nc
                  </a>{' '}
                  ou au{' '}
                  <a href="tel:+687939253" className="text-blue-600 underline mx-2">
                    93.92.53
                  </a>
                  .
                </p>
              </section>

              <div className="flex gap-6 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm w-full">
                  <h2 className="text-xl font-semibold mb-2">
                    Détails du Revendeur
                  </h2>
                  {thirdparty && (
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Nom :</span> {thirdparty.name_alias}
                      </p>
                      <p>
                        <span className="font-medium">Adresse :</span> {thirdparty.address}, {thirdparty.zip}, {thirdparty.town}
                      </p>
                      <p>
                        <span className="font-medium">Email :</span>{' '}
                        <a
                          href={`mailto:${thirdparty.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {thirdparty.email}
                        </a>
                      </p>
                      <p>
                        <span className="font-medium">Site Internet :</span>{' '}
                        <Link
                          to={thirdparty.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {thirdparty.url}
                        </Link>
                      </p>
                    </div>
                  )}
                </div>

                {warehouse && (
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm w-full">
                    <h2 className="text-xl font-semibold mb-2">
                      Détails de l'Entrepôt
                    </h2>
                    <p>
                      <span className="font-medium">Nom de l'entrepôt :</span> {warehouse.lieu}
                    </p>
                    <p>
                      <span className="font-medium">Référence de l'entrepôt :</span> {warehouse.libelle}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-sm mt-5 border border-red-400">
        <h2 className="text-xl font-semibold mb-4">Paramètres de Visibilité</h2>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="showOnSite"
            checked={showOnSite}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="showOnSite" className="text-lg">
            Souhaitez-vous apparaître sur notre site avec votre nom, logo et un lien vers votre site ?
          </label>
        </div>

        {showOnSite && (
          <div className="mb-4">
            <label htmlFor="logoUpload" className="block text-lg mb-2">
              Téléchargez votre logo (PNG de préférence avec fond transparent) :
            </label>
            <input
              type="file"
              id="logoUpload"
              accept=".png"
              onChange={handleLogoChange}
              className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="comment" className="block text-lg mb-2">
            Laissez un commentaire pour être affiché sur notre site :
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            className="block w-full text-sm p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-lg mb-2">
            Votre nom :
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="block w-full text-sm p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="position" className="block text-lg mb-2">
            Votre poste :
          </label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={handlePositionChange}
            className="block w-full text-sm p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="submit"
            icon={Send}
          >
            Valider
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResellerProfileScreen;
