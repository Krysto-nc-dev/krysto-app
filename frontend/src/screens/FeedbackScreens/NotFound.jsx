import React from 'react';
import { Link } from 'react-router-dom'; // Assurez-vous d'importer correctement le composant de lien approprié pour votre routage

const NotFound = ({ imageUrl }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-sm p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Erreur 404</h1>
        <p className="text-xl text-gray-600 text-center mb-6">La page que vous recherchez est introuvable.</p>
        {imageUrl && (
          <div className="mb-6">
            <img src={imageUrl} alt="404 Illustration" className="w-full h-auto rounded-lg" />
          </div>
        )}
        <Link to="/" className="text-blue-500 hover:underline text-lg text-center block">Retour à la page d'accueil</Link>
      </div>
    </div>
  );
};

export default NotFound;
