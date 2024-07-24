import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';
import { FaExclamation } from 'react-icons/fa';

const NotFound = () => {
  // Variants pour les animations de texte
  const textVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Variants pour l'animation de l'image SVG
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  // Variants pour l'animation du point d'exclamation avec rebond
  const exclamationVariants = {
    hidden: { opacity: 0, y: -100, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1.2,
      transition: {
        duration: 0.8,
        type: 'spring',
        stiffness: 500,
        damping: 25,
        delay: 0.5,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-backgroundColor p-4">
      <div className="max-w-lg p-7">
        {/* Animation du titre avec point d'exclamation */}
        <motion.div className="flex items-center justify-center mb-6">
          <motion.h1
            className="text-6xl font-bold text-center text-dangerColor"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            Erreur 404
          </motion.h1>

          <motion.div
            className="ml-4 text-dangerColor text-7xl"
            variants={exclamationVariants}
            initial="hidden"
            animate="visible"
          >
            <FaExclamation />
          </motion.div>
        </motion.div>

        {/* Animation du texte descriptif */}
        <motion.p
          className="text-xl text-primaryColor text-center mb-6"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          La page que vous recherchez est introuvable.
        </motion.p>

        {/* Animation de l'image */}
        <motion.div
          className="mb-6"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <img src='images/trashPile.svg' alt="404 Illustration" className="w-full h-auto rounded-lg" />
        </motion.div>

        {/* Animation du lien */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/" className="text-blue-500 hover:underline text-lg text-center block">
            <ArrowBigLeft className="inline-block mr-2" /> Retour à la page d'accueil
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
