import React from 'react';


const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-overlay"></div>
      <img src="/images/sablier.png" alt="Loading..." className="loader-image" />
      <div className="flex items-end mt-4 ">

      <div className="loading-text">Chargement</div>
      <div className="loading-dots p-1">
        <div className="dot1"></div>
        <div className="dot2"></div>
        <div className="dot3"></div>
      </div>
    </div>
      </div>
  );
};

export default Loader;
