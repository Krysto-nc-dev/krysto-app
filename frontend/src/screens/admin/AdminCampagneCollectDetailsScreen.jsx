import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/shared/Loader';
import Barcode from 'react-barcode';
import { useGetThirdPartyDetailsQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { useGetCampagneCollecteByIdQuery } from '../../slices/campagneCollectApiSlice';
import { useGetPlasticTypesQuery } from '../../slices/plasticTypesSlice';
import { useGetPlasticColorsQuery } from '../../slices/plasticColorsApiSlice';
import { ResponsivePie } from '@nivo/pie';

const AdminCampagneCollectDetailsScreen = () => {
  const { id: campagneCollectId } = useParams();
  const { data: campagneCollect, error: campagneCollectDetails, isLoading: campagneCollectLoading } = useGetCampagneCollecteByIdQuery(campagneCollectId);
  const { data: tier, error: errorTier, isLoading: loadingTier } = useGetThirdPartyDetailsQuery(campagneCollect?.dollibarTierId);
  const { data: plasticTypes, error: errorPlasticTypes, isLoading: loadingPlasticTypes } = useGetPlasticTypesQuery();
  const { data: plasticColors, error: errorPlasticColors, isLoading: loadingPlasticColors } = useGetPlasticColorsQuery();

  if (campagneCollectLoading || loadingTier || loadingPlasticTypes || loadingPlasticColors) {
    return <Loader />;
  }

  if (campagneCollectDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-medium text-red-600">Erreur : {campagneCollectDetails.message}</div>
      </div>
    );
  }

  if (!campagneCollect) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-medium text-gray-600">Aucun détail disponible</div>
      </div>
    );
  }

  const totalPlasticWeight = campagneCollect.collectes.reduce((total, collecte) => total + collecte.PlasticWeightKg, 0);

  const getPlasticTypeName = (id) => {
    const type = plasticTypes.find(type => type._id === id);
    return type ? type.sigleFr : 'Type inconnu';
  };

  const getPlasticColorName = (id) => {
    const color = plasticColors.find(color => color._id === id);
    return color ? color.name : 'Couleur inconnue';
  };

  const plasticWeightsByType = campagneCollect.collectes.reduce((acc, collecte) => {
    const typeName = getPlasticTypeName(collecte.PlasticType);
    if (!acc[typeName]) {
      acc[typeName] = 0;
    }
    acc[typeName] += collecte.PlasticWeightKg;
    return acc;
  }, {});

  const pieChartData = Object.keys(plasticWeightsByType).map(typeName => ({
    id: typeName,
    label: typeName,
    value: plasticWeightsByType[typeName]
  }));

  const MyResponsivePie = ({ data }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#ffffff"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      tooltip={({ datum }) => (
        <div
          style={{
            padding: '5px 10px',
            fontSize: '0.8rem',
            background: '#fff',
            border: '1px solid #ccc',
            color: '#777777',
          }}
        >
          <strong>{datum.label}</strong>: {datum.value.toLocaleString()} Kg
        </div>
      )}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 4]]
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 2,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 1,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: { id: 'Mixed' },
          id: 'dots'
        },
        {
          match: { id: 'PP' },
          id: 'dots'
        },
        {
          match: { id: 'PS' },
          id: 'dots'
        },
        {
          match: { id: 'OTHER' },
          id: 'dots'
        },
        {
          match: { id: 'PET' },
          id: 'lines'
        },
        {
          match: { id: 'HDPE' },
          id: 'lines'
        },
        {
          match: { id: 'LDPE' },
          id: 'lines'
        },
        {
          match: { id: 'PVC' },
          id: 'lines'
        }
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#ffff'
              }
            }
          ]
        }
      ]}
    />
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Date invalide' : date.toLocaleDateString();
  };

  return (
    <div className="p-4 min-h-screen bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold text-center text-primaryColor">Détails de la Campagne de Collecte</h1>
      <div className="text-xl font-bold text-center text-primaryColor">
        Poids total collecté pour cette campagne : <strong className='text-secondaryColor'>{totalPlasticWeight} kg</strong>
      </div>
      <div className="p-6 rounded-lg bg-white shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-primaryColor mb-2">{campagneCollect.title}</h2>
            <p className="text-lg mb-2"><strong>Détails :</strong> {campagneCollect.description}</p>
            <p className="text-lg mb-2"><strong>Type de collecte :</strong> {campagneCollect.collectionType}</p>
            <p className="text-lg mb-2"><strong>Tiers :</strong> <Link to={`/user-third-party-details/${campagneCollect.dollibarTierId}`} className='hover:text-secondaryColor'>{tier ? tier.name : 'Non défini'}</Link></p>
            <p className="text-lg mb-2"><strong>Récurrence :</strong> {campagneCollect.recurring ? 'Oui' : 'Non'}</p>
            {campagneCollect.recurring && (
              <>
                <p className="text-lg mb-2"><strong>Fréquence :</strong> {campagneCollect.frequency}</p>
                <p className="text-lg mb-2"><strong>Date de début :</strong> {formatDate(campagneCollect.startDate)}</p>
                <p className="text-lg mb-2"><strong>Date de fin :</strong> {formatDate(campagneCollect.endDate)}</p>
              </>
            )}
            <p className="text-lg mb-2"><strong>Adresse :</strong> {campagneCollect.address}</p>
            <p className="text-lg mb-2"><strong>Date de création :</strong> {formatDate(campagneCollect.createdAt)}</p>
            <p className="text-lg mb-2"><strong>Dernière modification :</strong> {formatDate(campagneCollect.updatedAt)}</p>
          </div>
          <div className="flex flex-col items-center">
            <span className={`text-lg font-semibold py-1 px-4 rounded ${getStatusColorClass(campagneCollect.status)}`}>{campagneCollect.status}</span>
            {campagneCollect.barcode && (
              <div className="mt-4">
                <Barcode value={campagneCollect.barcode} />
              </div>
            )}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-primaryColor mb-4">Statistiques de Collecte</h2>
        <div className="h-80 mb-6">
          <MyResponsivePie data={pieChartData} />
        </div>
        <h2 className="text-2xl font-bold text-primaryColor mb-4">Détails des Collectes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type de Plastique</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Couleur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poids (Kg)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campagneCollect.collectes.map((collecte, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(collecte.dateCollecte)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getPlasticTypeName(collecte.PlasticType)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getPlasticColorName(collecte.PlasticColor)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{collecte.PlasticWeightKg.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const getStatusColorClass = (status) => {
  switch (status) {
    case 'Actif':
      return 'bg-green-500 text-white';
    case 'Inactif':
      return 'bg-gray-500 text-white';
    case 'En attente':
      return 'bg-yellow-500 text-white';
    default:
      return 'bg-red-500 text-white';
  }
};

export default AdminCampagneCollectDetailsScreen;
