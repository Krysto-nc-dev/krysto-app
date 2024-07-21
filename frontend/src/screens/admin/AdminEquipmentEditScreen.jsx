import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMachineByIdQuery, useUpdateMachineMutation, useUploadMachineImageMutation } from '../../slices/equipmentApiSlice'; // Adjust import paths as necessary
import Loader from '../FeedbackScreens/Loader';
import Button from '../../components/shared/Button';
import { ArrowBigLeft, Loader2, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker'; // Make sure you have react-datepicker installed
import 'react-datepicker/dist/react-datepicker.css';

const AdminEquipmentEditScreen = () => {
  const { id: machineId } = useParams();
  const { data: machine, error, isLoading, refetch } = useGetMachineByIdQuery(machineId);
  const [updateMachine, { isLoading: loadingUpdate }] = useUpdateMachineMutation();
  const [uploadMachineImage, { isLoading: uploadMutationLoading }] = useUploadMachineImageMutation();
  const navigate = useNavigate();

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      type: '',
      category: '',
      provenanceCountry: '',
      status: '',
      totalCoast: 0,
      operatingHours: 0,
      buyDate: new Date(),
      orderDate: new Date(),
      receptionDate: new Date(),
      serviceDate: new Date(),
      images: [],
    },
  });

  const imagesArray = watch('images');

  useEffect(() => {
    if (machine) {
      setValue('name', machine.name);
      setValue('description', machine.description);
      setValue('type', machine.type);
      setValue('category', machine.category);
      setValue('provenanceCountry', machine.provenanceCountry);
      setValue('status', machine.status);
      setValue('totalCoast', machine.totalCoast);
      setValue('operatingHours', machine.operatingHours);
      setValue('buyDate', new Date(machine.buyDate));
      setValue('orderDate', new Date(machine.orderDate));
      setValue('receptionDate', new Date(machine.receptionDate));
      setValue('serviceDate', new Date(machine.serviceDate));
      setValue('images', machine.images);
    }
  }, [machine, setValue]);

  const onSubmit = async (data) => {
    const updatedMachine = {
        id: machineId,
        name: data.name,
        description: data.description,
        type: data.type,
        category: data.category,
        provenanceCountry: data.provenanceCountry,
        status: data.status,
        totalCoast: data.totalCoast,
        operatingHours: data.operatingHours,
        buyDate: data.buyDate.toISOString(),
        orderDate: data.orderDate.toISOString(),
        receptionDate: data.receptionDate.toISOString(),
        serviceDate: data.serviceDate.toISOString(),
        images: data.images,
      };
    
    try {
      await updateMachine(updateMachine).unwrap();
      toast.success('Équipement mis à jour avec succès!');
      refetch();
      navigate('/admin-equipment');
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'équipement:', err);
      toast.error('Erreur lors de la mise à jour de l\'équipement');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('images', e.target.files[0]);

    try {
      const res = await uploadMachineImage(formData).unwrap();
      setValue('images', [...imagesArray, ...res.images]);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const removeImage = (index) => {
    const updatedImagesArray = [...imagesArray];
    updatedImagesArray.splice(index, 1);
    setValue('images', updatedImagesArray);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">Erreur: {error.message}</p>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl">Éditer l'équipement</h1>
        <Button icon={ArrowBigLeft}>
          <a href="/admin/equipment"> Retour</a>
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-3">

        <div className="mb-4 flex-1 ">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
                <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
                />
            )}
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
                <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
                />
            )}
            />
        </div>
            </div>


      
        <div className="flex items-center justify-between">

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Catégorie</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
                <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
                />
            )}
            />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
                <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
                />
            )}
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Provenance</label>
          <Controller
            name="provenanceCountry"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Coût Total</label>
          <Controller
            name="totalCoast"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Heures d'opération</label>
          <Controller
            name="operatingHours"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
              />
            )}
          />
        </div>

      
            </div>
            <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...field}
                rows="3"
              />
            )}
          />
        </div>

        

        
      
<div className="flex items-center justify-between ">

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date d'achat</label>
          <Controller
            name="buyDate"
            control={control}
            render={({ field }) => (
                <DatePicker
                selected={field.value}
                onChange={(date) => setValue('buyDate', date)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            )}
            />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date de commande</label>
          <Controller
            name="orderDate"
            control={control}
            render={({ field }) => (
                <DatePicker
                selected={field.value}
                onChange={(date) => setValue('orderDate', date)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            )}
            />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date de réception</label>
          <Controller
            name="receptionDate"
            control={control}
            render={({ field }) => (
                <DatePicker
                selected={field.value}
                onChange={(date) => setValue('receptionDate', date)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            )}
            />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date de mise en service</label>
          <Controller
            name="serviceDate"
            control={control}
            render={({ field }) => (
                <DatePicker
                selected={field.value}
                onChange={(date) => setValue('serviceDate', date)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            )}
            />
        </div>

            </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Images</label>
          <div className="flex flex-wrap mb-4">
            {imagesArray && imagesArray.length > 0 ? (
              imagesArray.map((image, index) => (
                <div key={index} className="relative mr-4 mb-4">
                  <img src={image} alt={`Image ${index + 1}`} className="w-32 h-32 object-cover" />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                    onClick={() => removeImage(index)}
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p>Aucune image ajoutée</p>
            )}
          </div>
          <input
            type="file"
            multiple
            onChange={uploadFileHandler}
          />
        </div>

        <Button type="submit" icon={Send}>
          {loadingUpdate ? <Loader2 /> : 'Valider'}
        </Button>
      </form>
    </div>
  );
};

export default AdminEquipmentEditScreen;
