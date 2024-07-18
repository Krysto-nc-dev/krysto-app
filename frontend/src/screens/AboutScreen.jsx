import React, { useState } from 'react';
import Table from "../components/shared/Table";
import Button from "../components/shared/Button";
import SelectFilter from "../components/shared/SelectFilter";
import { Heart, Star, Bell } from "lucide-react";
import Messages from './FeedbackScreens/Messages';
import Card from '../components/shared/Card';

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

  return (
    <>
      <h1 className='text-primaryColor text-2xl'>Composants</h1>
     
      <h3>Alertes</h3>
      <div className="container mx-auto mt-5">
      <Messages type="warning" message="Attention, quelque chose s'est mal passé." />
      {/* <Messages type="success" message="Opération réussie !" />
      <Messages type="danger" message="Erreur critique !" />
      <Messages message="Information générale." /> */}
    </div>
      <h3>Boutons</h3>
      <div className="p-6 flex items-centers justify-between">
        <Button icon={Heart} version="primary">
          Like
        </Button>
        <Button icon={Star} version="secondary">
          Rate
        </Button>
        <Button icon={Bell} version="success">
          Notify
        </Button>
        <Button icon={Bell} version="primary" isDisabled>
          Disabled
        </Button>
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
        <SelectFilter
          label="Filter by Role"
          options={options}
          value={selectedFilter}
          onChange={handleFilterChange}
          version="primary"
        />
        <SelectFilter
          label="Filter by Role"
          options={options}
          value={selectedFilter}
          onChange={handleFilterChange}
          version="secondary"
        />
        <SelectFilter
          label="Filter by Role"
          options={options}
          value={selectedFilter}
          onChange={handleFilterChange}
          version="success"
        />
        <SelectFilter
          label="Filter by Role"
          options={options}
          value={selectedFilter}
          onChange={handleFilterChange}
          version="danger"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-5">

      <Card image="https://via.placeholder.com/600x300" url="https://example.com">
      <h2 className="text-xl font-bold mb-4">Card Title</h2>
      <p className="text-gray-700">This is some card content. It can include text, images, and other elements.</p>
    </Card>

      <Card >
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
    </>
  );
}

export default AboutScreen;
