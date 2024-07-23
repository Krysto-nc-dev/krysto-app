import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ResellerRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo  &&   userInfo.role === 'Reseller' ? <Outlet /> : <Navigate to="/connexion" replace />;
  
};

export default ResellerRoute;