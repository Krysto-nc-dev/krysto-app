import React from 'react';
import { useGetVeillesQuery } from '../../slices/veilleApiSlice';
import { Eye, PlusCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../../components/shared/Loader';
import Button from '../../components/shared/Button';

const typeColors = {
  'Vidéo': 'bg-blue-500',
  'Site Web': 'bg-green-500',
  'Article': 'bg-red-500',
  'PDF': 'bg-orange-500',
};

const AdminWatchMonitoringScreen = () => {
  const { data: veilles, error, isLoading } = useGetVeillesQuery();

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen p-2 ">
      <div className="flex items-center justify-between mb-6">

      <h1 className="text-xl  ">Veilles</h1>
      <Button icon={PlusCircleIcon} >Nouvelle veille</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {veilles.map((veille) => (
          <Link to={`/admin-veille-details/${veille._id}`} key={veille._id} className="card rounded-lg shadow-md overflow-hidden relative block hover:no-underline">
            <div className={`absolute top-0 right-0 p-2 ${typeColors[veille.type]} text-white rounded-bl-lg`}>
              {veille.type}
            </div>
            <img src={veille.images[0]} alt={veille.title} className="w-full h-[15rem] object-cover" />
            <div className="p-4">
              <h2 className="text-md font-bold mb-2 text-secondaryColor">{veille.title}</h2>
              <ul className="flex flex-wrap gap-2 mb-2">
                {veille.tags.map((tag, index) => (
                  <li className='bg-primaryColor px-2 py-1 rounded-full text-white min-w-[8ch] text-center text-xs' key={index}>{tag}</li>
                ))}
              </ul>
              <p className=" mb-2 line-clamp-3 h-16 overflow-hidden">{veille.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminWatchMonitoringScreen;
