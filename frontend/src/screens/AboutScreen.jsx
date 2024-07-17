import React, { useState } from 'react';
import Table from "../components/shared/Table";
import Button from "../components/shared/Button";
import SelectFilter from "../components/shared/SelectFilter";
import { Heart, Star, Bell } from "lucide-react";

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
      <h1 className='text-primaryColor text-2xl'>Welcome Krysto</h1>
   
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
    </>
  );
}

export default AboutScreen;
