import React, { useState } from 'react';
import { useGetDolliProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import { AlertCircle } from 'lucide-react';
import Loader from '../FeedbackScreens/Loader';
import Card from '../../components/shared/Card';

const AdminPlasticsPalletsScreen = () => {
  const [selectedPlasticType, setSelectedPlasticType] = useState('');
  const { data: pailletes, error: errorPaillettes, isLoading: loadingPailletes } = useGetDolliProductsQuery({
    mode: 1,
    variant_filter: 3,
    category: 38
  });

  if (loadingPailletes) return <Loader />;
  if (errorPaillettes) return <div>Error loading products</div>;

  const plasticTypes = {
    '1': 'PET',
    '2': 'HDPE',
    '3': 'PVC',
    '4': 'LDPE',
    '5': 'PP',
    '6': 'PS',
    '7': 'Autres'
  };

  // Filtrer les paillettes en fonction du type de plastique sélectionné
  const filteredPailletes = selectedPlasticType
    ? pailletes.filter(paillette => paillette.array_options?.options_type_plastique === selectedPlasticType)
    : pailletes;

  // Calculer le total du stock en kg
  const totalStockWeight = filteredPailletes.reduce((acc, paillette) => {
    const weight = Number(paillette.weight) || 0;
    const stock = Number(paillette.stock_reel) || 0;
    return acc + (stock * weight);
  }, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Stock de paillettes plastique</h1>
        <div>
          <select
            id="plasticType"
            value={selectedPlasticType}
            onChange={e => setSelectedPlasticType(e.target.value)}
            className="block appearance-none w-full bg-gray-300 border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Tous</option>
            {Object.entries(plasticTypes).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
      </div>
      
      <Card variant={"dark"}>
        <h3>Total du stock en kg :</h3>
        <h2>{totalStockWeight.toFixed(2)} kg</h2>
      </Card>

      {filteredPailletes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-red-400 text-2xl mt-40">
          <AlertCircle className="mb-2" size={40} />
          <span>Aucune référence trouvée</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPailletes.map(paillette => (
            <Card variant={"primary"} key={paillette.id}>
              <h2 className="text-xl font-semibold mb-2">{paillette.label}</h2>
              <p className="text-gray-800 mb-2"><strong>Référence:</strong> {paillette.ref}</p>
              <p className="text-gray-800 mb-2">
                <strong>Description:</strong>
                <span dangerouslySetInnerHTML={{ __html: paillette.description }} />
              </p>
              <p className="text-gray-800 mb-2"><strong>Poids unitaire:</strong> {paillette.weight} kg</p>
              <p className="text-gray-800 mb-2"><strong>En stock:</strong> {paillette.stock_reel ?? 0}</p>
              <p className="text-gray-800 mb-2"><strong>Prix:</strong> {paillette.price_ttc} F</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPlasticsPalletsScreen;
