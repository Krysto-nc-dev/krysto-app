import React, { useState, useEffect } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaTimesCircle, FaTimes, FaInfoCircle } from 'react-icons/fa';

const Messages = ({ type, message }) => {
  const [closed, setClosed] = useState(false);
  const [animateIn, setAnimateIn] = useState(false); // État pour gérer l'animation d'entrée

  let bgColor, borderColor, textColor, icon, iconColor;

  switch (type) {
    case 'warning':
      bgColor = 'bg-yellow-100';
      borderColor = 'border-yellow-400';
      textColor = 'text-yellow-700';
      icon = <FaExclamationCircle className="h-6 w-6" />;
      iconColor = 'text-yellow-500';
      break;
    case 'success':
      bgColor = 'bg-green-100';
      borderColor = 'border-green-400';
      textColor = 'text-green-700';
      icon = <FaCheckCircle className="h-6 w-6" />;
      iconColor = 'text-green-500';
      break;
    case 'danger':
      bgColor = 'bg-red-100';
      borderColor = 'border-red-400';
      textColor = 'text-red-700';
      icon = <FaTimesCircle className="h-6 w-6" />;
      iconColor = 'text-red-500';
      break;
    default:
      bgColor = 'bg-blue-100';
      borderColor = 'border-blue-400';
      textColor = 'text-blue-700';
      icon = <FaInfoCircle className="h-6 w-6" />;
      iconColor = 'text-blue-500';
      break;
  }

  const handleClose = () => {
    // Déclenche l'animation de sortie
    setAnimateIn(false);

    // Après l'animation de sortie, ferme complètement le message
    setTimeout(() => {
      setClosed(true);
    }, 500); // Correspond à la durée de l'animation en millisecondes
  };

  useEffect(() => {
    if (!closed) {
      // Déclenche l'animation d'entrée lorsque le message est affiché
      setAnimateIn(true);
    }
  }, [closed]);

  if (closed) {
    return null; // Ne rien afficher si l'alerte est fermée
  }

  return (
    <div
      className="message-container "
      style={{ animationName: `${animateIn ? 'bounceIn' : ''}`, animationDuration: '0.5s' }}
      role="alert"
    >
      <div className={`bg-white border ${borderColor} ${textColor} my-4 px-4 py-3 rounded flex items-center justify-between ${bgColor}`}>
        <div className="flex items-center">
          <div className={`mr-3 ${iconColor}`}>
            {icon}
          </div>
          <div className="text-sm">
            {/* <strong className="font-bold">Alerte - </strong> */}
            <span className="block sm:inline">{message}</span>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleClose}
            className={`text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition duration-150 ease-in-out`}
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
