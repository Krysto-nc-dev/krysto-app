import React, { useState } from 'react';
import Table from '../components/shared/Table';
import Button from '../components/shared/Button';
import SelectFilter from '../components/shared/SelectFilter';
import { Heart, Star, Bell } from 'lucide-react';
import Messages from './FeedbackScreens/Messages';
import Card from '../components/shared/Card';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from '../components/shared/Form/Select';
import InputNumber from '../components/shared/Form/InputNumber';
import RadioGroup from '../components/shared/Form/RadioGroup';
import InputTxt from '../components/shared/Form/InputTxt';
import Checkbox from '../components/shared/Form/Checkbox';
import ImageUpload from '../components/shared/Form/ImageUpload';
import Textarea from '../components/shared/Form/Textarea';

const AboutScreen = () => {
  const headers = ['Name', 'Email', 'Role'];
  const data = [
    { Name: 'John Doe', Email: 'john@example.com', Role: 'Admin' },
    { Name: 'Jane Smith', Email: 'jane@example.com', Role: 'User' },
    { Name: 'Alice Johnson', Email: 'alice@example.com', Role: 'Moderator' },
  ];

  const options = [
    { value: 'all', label: 'All' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'moderator', label: 'Moderator' },
  ];

  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const schema = yup.object().shape({
    textField: yup.string().required('Ce champ est requis'),
    numberField: yup.number().min(0, 'Le nombre doit être positif').required('Ce champ est requis'),
    selectField: yup.string().required('Ce champ est requis'),
    radioField: yup.string().required('Ce champ est requis'),
    checkboxField: yup.bool().oneOf([true], 'Ce champ est requis'),
    textareaField: yup.string().required('Ce champ est requis'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="text-primaryColor text-2xl">Composants</h1>

      <h3>Alertes</h3>
      <div className="container mx-auto mt-5">
        <Messages type="warning" message="Attention, quelque chose s'est mal passé." />
        {/* <Messages type="success" message="Opération réussie !" />
        <Messages type="danger" message="Erreur critique !" />
        <Messages message="Information générale." /> */}
      </div>

      <h3>Boutons</h3>
      <div className="p-6 flex items-center justify-between">
        <Button icon={Heart} version="primary">Like</Button>
        <Button icon={Star} version="secondary">Rate</Button>
        <Button icon={Bell} version="success">Notify</Button>
        <Button icon={Bell} version="primary" isDisabled>Disabled</Button>
      </div>

      <h3>Tableau</h3>
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Primary Table</h2>
          <Table headers={headers} data={data} version="primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Secondary Table</h2>
          <Table headers={headers} data={data} version="secondary" />
        </div>
      </div>

      <h3>Filtres</h3>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Select Filters</h2>
        <SelectFilter label="Filter by Role" options={options} value={selectedFilter} onChange={handleFilterChange} version="primary" />
        <SelectFilter label="Filter by Role" options={options} value={selectedFilter} onChange={handleFilterChange} version="secondary" />
        <SelectFilter label="Filter by Role" options={options} value={selectedFilter} onChange={handleFilterChange} version="success" />
        <SelectFilter label="Filter by Role" options={options} value={selectedFilter} onChange={handleFilterChange} version="danger" />
      </div>

      <h3>Cartes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
        <Card image="https://via.placeholder.com/600x300" url="https://example.com">
          <h2 className="text-xl font-bold mb-4">Card Title</h2>
          <p className="text-gray-700">This is some card content. It can include text, images, and other elements.</p>
        </Card>
        <Card>
          <h2 className="text-xl font-bold mb-4">Card Title</h2>
          <p className="text-gray-700">This is some card content. It can include text, images, and other elements.</p>
        </Card>
        <Card image="https://via.placeholder.com/600x300" variant="translucent">
          <h2 className="text-xl font-bold mb-4">Card Title</h2>
          <p className="text-gray-700">This is some card content. It can include text, images, and other elements.</p>
        </Card>
        <Card image="https://via.placeholder.com/600x300" variant="dark">
          <h2 className="text-xl font-bold mb-4">Card Title</h2>
          <p className="text-gray-200">This is some card content. It can include text, images, and other elements.</p>
        </Card>
        <Card image="https://via.placeholder.com/600x300" variant="secondary">
          <h2 className="text-xl font-bold mb-4">Card Title</h2>
          <p className="text-gray-700">This is some card content. It can include text, images, and other elements.</p>
        </Card>
        <Card image="https://via.placeholder.com/600x300" variant="primary">
          <h2 className="text-xl font-bold mb-4">Card Title</h2>
          <p className="text-gray-700">This is some card content. It can include text, images, and other elements.</p>
        </Card>
        <Card image="https://via.placeholder.com/600x300" variant="danger">
          <h2 className="text-xl font-bold mb-4">Card Title</h2>
          <p className="text-gray-700">This is some card content. It can include text, images, and other elements.</p>
        </Card>
      </div>

      <h3 className='text-xl'>Mon Formulaire</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <Controller
            name="textField"
            control={control}
            render={({ field }) => <InputTxt {...field} label="Texte" />}
          />
          {errors.textField && (
            <p className="absolute text-red-500 text-xs">{errors.textField.message}</p>
          )}
        </div>

        <div className="relative">
          <Controller
            name="numberField"
            control={control}
            render={({ field }) => <InputNumber {...field} label="Nombre" min={0} step={1} />}
          />
          {errors.numberField && (
            <p className="absolute text-red-500 text-sm mt-1">{errors.numberField.message}</p>
          )}
        </div>

        <div className="relative">
          <Controller
            name="selectField"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Sélection"
                options={[
                  { value: '', label: 'Choisir une option' },
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                ]}
              />
            )}
          />
          {errors.selectField && (
            <p className="absolute text-red-500 text-sm mt-1">{errors.selectField.message}</p>
          )}
        </div>

        <div className="relative">
          <Controller
            name="radioField"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                name="radioField"
                options={[
                  { value: 'radio1', label: 'Radio 1' },
                  { value: 'radio2', label: 'Radio 2' },
                ]}
              />
            )}
          />
          {errors.radioField && (
            <p className="absolute text-red-500 text-xs">{errors.radioField.message}</p>
          )}
        </div>

        <div className="relative">
          <Controller
            name="checkboxField"
            control={control}
            render={({ field }) => <Checkbox {...field} label="Accepter les conditions" />}
          />
          {errors.checkboxField && (
            <p className="absolute text-red-500 text-sm mt-1">{errors.checkboxField.message}</p>
          )}
        </div>

        <div className="relative">
          <Controller
            name="textareaField"
            control={control}
            render={({ field }) => <Textarea {...field} label="Description" />}
          />
          {errors.textareaField && (
            <p className="absolute text-red-500 text-xs">{errors.textareaField.message}</p>
          )}
        </div>

        <div className="relative">
          <Controller
            name="imageFieldSingle"
            control={control}
            render={({ field }) => (
              <ImageUpload
                {...field}
                label="Télécharger une image (Unique)"
                multiple={false}
              />
            )}
          />
        </div>

        <div className="relative">
          <Controller
            name="imageFieldMultiple"
            control={control}
            render={({ field }) => (
              <ImageUpload
                {...field}
                label="Télécharger des images (Multiples)"
                multiple={true}
              />
            )}
          />
        </div>

        <Button type="submit">Envoyer</Button>
      </form>
    </>
  );
};

export default AboutScreen;
