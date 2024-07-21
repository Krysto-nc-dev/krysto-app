import React from 'react';
import { useGetWarehousesQuery } from '../../slices/dolibarr/dolliWarehouseApiSlice';
import Loader from '../../components/shared/Loader';
import { Link } from 'react-router-dom';
import Card from '../../components/shared/Card';

const AdminWarehousesScreen = () => {
  const {
    data: warehouses,
    isLoading,
    error
  } = useGetWarehousesQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-red-500">
        {typeof error.data.message === 'string'
          ? error.data.message
          : 'Une erreur est survenue'}
      </p>
    );
  }

  return (
    <div className="h-screen p-6  text-gray-70à">
      <h1 className="text-3xl font-bold mb-6 text-primaryColor text-center">Entrepôts ({warehouses.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((warehouse) => (
          <Card url={`/user-warehouse-details/${warehouse.id}`} key={warehouse.id} className= "card p-4">
            <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold mb-2 text-secondaryColor">{warehouse.label}</h2>
            <p className="text-gray-700"> {warehouse.lieu}</p>
            </div>
            <p className="text-gray-700"><strong>Description:</strong> {warehouse.description}</p>
            <p className="text-gray-700"><strong>Adresse:</strong> {warehouse.address}</p>
            <div className="flex justify-between items-center">

            <p className="text-gray-700"><strong>Code Postal:</strong> {warehouse.zip}</p>
            <p className="text-gray-700"><strong>Ville:</strong> {warehouse.town}</p>
            </div>
            <p className="text-gray-700"><strong>Téléphone:</strong> {warehouse.phone}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminWarehousesScreen;
