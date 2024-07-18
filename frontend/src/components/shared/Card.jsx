import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ children, image, variant, url }) => {
  const variantClasses = {
    primary: 'bg-primaryColor text-black',
    secondary: 'bg-secondaryColor text-black',
    dark: 'bg-gray-800 text-white',
    translucent: 'bg-gray-300 bg-opacity-50 text-black',
    danger: 'bg-red-400 bg-opacity-50 text-black',
  };

  const cardContent = (
    <div className={`relative container mx-auto shadow-md rounded-lg overflow-hidden transition-transform duration-300 ${variantClasses[variant] || 'bg-white text-black'} ${url ? 'hover:shadow-lg' : ''}`}>
      {image && (
        <div className="overflow-hidden h-[300px]">
          <img src={image} alt="Container Image" className="w-full  transform transition-transform duration-300 hover:scale-105" />
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );

  return url ? (
    <Link to={url} className=" block transform transition-transform duration-300 hover:shadow-lg">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default Card;
