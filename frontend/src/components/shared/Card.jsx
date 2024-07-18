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
    <div className={` mb-4 relative container mx-auto shadow-md  rounded-lg overflow-hidden transition-transform duration-300 ${variantClasses[variant] || 'bg-white text-black'} ${url ? 'hover:shadow-xl hover:shadow-gray-400' : ''} custom-scale`}>
      {image && (
        <div className="overflow-hidden h-[300px]">
          <img src={image} alt="Container Image" className="w-full  transform transition-transform duration-300 " />
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );

  return url ? (
    <Link to={url} className=" transform transition-transform duration-300 hover:scale-105 ">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default Card;
