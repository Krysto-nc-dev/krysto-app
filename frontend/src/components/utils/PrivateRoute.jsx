import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo  &&   userInfo.role === 'Partner' ? <Outlet /> : <Navigate to="/connexion" replace />;
  
};

export default PrivateRoute;