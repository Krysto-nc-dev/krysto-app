import { ArrowBigLeft } from 'lucide-react';
import React from 'react';
import { FaExclamation } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assurez-vous d'importer correctement le composant de lien approprié pour votre routage

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-backgroundColor">
      <div className="max-w-lg p-7 ">
        <h1 className="text-6xl font-bold text-center text-dangerColor mb-6">Erreur 404 </h1>
        <p className="text-xl text-primaryColor text-center mb-6">La page que vous recherchez est introuvable.</p>
   
          <div className="mb-6">
            <img src='images/trashPile.svg' alt="404 Illustration" className="w-full h-auto rounded-lg " />
          </div>
      
        <Link to="/" className="text-blue-500 hover:underline text-lg text-center block f"> Retour à la page d'accueil</Link>
      </div>
    </div>
  );
};

export default NotFound;
