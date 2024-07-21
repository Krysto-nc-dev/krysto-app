import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/shared/Loader';
import Barcode from 'react-barcode';
import { useGetMachineByIdQuery, useDeleteMachineMutation } from '../../slices/equipmentApiSlice';
import Button from '../../components/shared/Button';
import { ArrowBigLeft, Edit, PlusCircle, Trash } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminEquipmentDetailsScreen = () => {
  const { id: machineId } = useParams();
  const { data: machine, error, isLoading } = useGetMachineByIdQuery(machineId);
  const [deleteMachine, { isLoading: deleting }] = useDeleteMachineMutation();

  const handleDelete = async () => {
    try {
      await deleteMachine(machineId).unwrap();
      toast.success('Équipement supprimé avec succès');
      window.history.back(); // Or redirect to another page
    } catch (err) {
      toast.error(err?.data?.message || 'Erreur lors de la suppression de l\'équipement');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">
          {typeof error.data.message === 'string' ? error.data.message : 'Une erreur est survenue'}
        </p>
      </div>
    );
  }

  const isBarcodeAvailable = machine.barcode && machine.barcode.trim() !== '';

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <Button onClick={() => window.history.back()} icon={ArrowBigLeft}>
          Retour
        </Button>
        <div className='flex items-center gap-3'>
          <Button url={`/admin/equipment/edit/${machineId}`} icon={Edit} version={'warning'}>Éditer</Button>
          <Button onClick={handleDelete} icon={Trash} version={'danger'} disabled={deleting}>
            {deleting ? 'Suppression...' : 'Supprimer'}
          </Button>
        </div>
      </div>

      <div className="max-w-9xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/3 flex-shrink-0">
          <img src={`${machine.images[0]}`} alt="Machine" className="w-full h-[450px] object-cover" />
        </div>

        {/* Details Section */}
        <div className="md:w-2/3 p-6 flex flex-col relative">
          <div className="relative">
            {isBarcodeAvailable ? (
              <div className="absolute top-6 right-6">
                <Barcode value={machine.barcode} />
              </div>
            ) : (
              <div className="absolute top-6 right-6 border border-gray-400 p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-sm text-gray-700">Code-barres indisponible</p>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-semibold text-primaryColor mb-6">{machine.name}</h1>
          <div className="space-y-4">
            <div className="text-gray-700">
              <p className="text-sm"><strong>Description:</strong> {machine.description}</p>
              <p className="text-sm"><strong>Type:</strong> {machine.type}</p>
              <p className="text-sm"><strong>Catégorie:</strong> {machine.category}</p>
              <p className="text-sm"><strong>Provenance:</strong> {machine.provenanceCountry}</p>
              <p className="text-sm"><strong>Status:</strong> {machine.status}</p>
              <p className="text-sm"><strong>Coût Total:</strong> {Number(machine.totalCoast).toLocaleString()} XPF</p>
              <p className="text-sm"><strong>Heures d'opération:</strong> {machine.operatingHours.toLocaleString()}</p>
              

              <p className="text-sm"><strong>Date d'achat:</strong> {new Date(machine.buyDate).toLocaleDateString()}</p>
              <p className="text-sm"><strong>Date de commande:</strong> {new Date(machine.orderDate).toLocaleDateString()}</p>
              <p className="text-sm"><strong>Date de réception:</strong> {new Date(machine.receptionDate).toLocaleDateString()}</p>
              <p className="text-sm"><strong>Date de mise en service:</strong> {new Date(machine.serviceDate).toLocaleDateString()}</p>
            
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 mb-4 flex items-center justify-between'>
        <h3 className="text-xl">Maintenances</h3>
        <Button url={`/admin/maintenance/add/${machineId}`} icon={PlusCircle}>Nouvelle maintenance</Button>
      </div>

      <div className="w-full space-y-4">
        {machine.maintenances.map((maintenance, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700"><strong>Date:</strong> {new Date(maintenance.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-700"><strong>Type:</strong> {maintenance.type}</p>
            <p className="text-sm text-gray-700"><strong>Description:</strong> {maintenance.description}</p>
            <p className="text-sm text-gray-700"><strong>Coût:</strong> {Number(maintenance.cost).toLocaleString()} XPF</p>
            <p className="text-sm text-gray-700"><strong>Technicien:</strong> {maintenance.technician}</p>
            <p className="text-sm text-gray-700"><strong>Notes:</strong> {maintenance.notes}</p>
            {maintenance.recurrence && (
              <p className="text-sm text-gray-700"><strong>Récurrence:</strong> {maintenance.recurrence.frequency} tous les {maintenance.recurrence.interval} mois jusqu'au {new Date(maintenance.recurrence.endDate).toLocaleDateString()}</p>
            )}
          </div>
        ))}
      </div>

      <div className='mt-6 mb-4 flex items-center justify-between'>
        <h3 className="text-xl">Procédures d'utilisation</h3>
        <Button url={`/admin/usage-procedure/add/${machineId}`} icon={PlusCircle}>Nouvelle procédure</Button>
      </div>

      <div className="space-y-4">
        {machine.usageProcedures.map((procedure, index) => (
          <div key={procedure._id} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold mb-2">{procedure.title}</h4>
            {procedure.steps.map((step, stepIndex) => (
              <p key={stepIndex} className="text-sm text-gray-700"><strong>Étape {step.stepNumber}:</strong> {step.description}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEquipmentDetailsScreen;
