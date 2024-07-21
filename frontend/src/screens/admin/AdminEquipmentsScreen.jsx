import React from 'react';
import Barcode from 'react-barcode';
import { Link } from 'react-router-dom';
import { useGetMachinesQuery } from '../../slices/equipmentApiSlice';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { PlusCircleIcon } from 'lucide-react';

const AdminEquipmentScreen = () => {
  const { data: machines, error, isLoading } = useGetMachinesQuery();
  console.log(machines);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6 min-h-screen">
      <div className='flex justify-center justify-between mb-6'>
        <h1 className="text-2xl font-bold">Matériel</h1>
        <Button icon={PlusCircleIcon}>Nouveau matériel</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map(machine => (
          <Card
            image={`${machine.images[0]}`}
            variant={"primary"}
            url={`/admin-equipement-details/${machine._id}`}
            key={machine._id}
            className="card"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-800">{machine.name}</h3>
              </div>
              <p><strong>Description:</strong> {machine.description}</p>
              <p><strong>Catégorie:</strong> {machine.category}</p>
              <p><strong>Type:</strong> {machine.type}</p>
              <p><strong>Provenance:</strong> {machine.provenanceCountry}</p>
              <p><strong>Coût Total:</strong> {machine.totalCoast} €</p>
              <p><strong>Status:</strong> {machine.status}</p>
              <p><strong>Heures de Fonctionnement:</strong> {machine.operatingHours}</p>
              <p><strong>Date d'Achat:</strong> {new Date(machine.buyDate).toLocaleDateString()}</p>
              {machine.barcode ? (
                <div className="mt-4">
                  <Barcode
                    value={machine.barcode}
                    width={1}
                    height={50}
                    fontSize={14}
                  />
                </div>
              ) : (
                <p className="mt-4 text-red-500">Code-barres non disponible</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEquipmentScreen;
