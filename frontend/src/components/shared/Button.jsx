import React from 'react';

const Button = ({ children, icon: Icon, version, type = 'button', isDisabled = false, onClick }) => {
  const baseStyle = 'flex items-center justify-center px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none transition duration-300';
  const versionStyle = version === 'primary' ? 'bg-primaryColor  hover:bg-secondaryColor focus:ring-2 focus:ring-secondaryColor focus:ring-opacity-50' : 
                      version === 'secondary' ? 'bg-secondaryColor hover:bg-primaryColor focus:ring-2 focus:ring-secondaryColor focus:ring-opacity-50' :
                      'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50';

  const disabledStyle = isDisabled ? 'cursor-not-allowed opacity-50 bg-red-300 hover:bg-red-300' : '';

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`${baseStyle} ${versionStyle} ${disabledStyle}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
};

export default Button;
