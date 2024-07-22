import ColorMixCalculator from '../../components/admin/ColorMixCalculator';
import Loader from '../../components/shared/Loader';

import { useGetPlasticColorsQuery } from '../../slices/plasticColorsApiSlice';

const UserColorMixCalculatorScreen = () => {
  const { data: colors, error: errorColors, isLoading: loadingColors } = useGetPlasticColorsQuery();

  if (loadingColors) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader className="w-16 h-16 text-primaryColor" />
      </div>
    );
  }

  if (errorColors) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-red-100 text-red-600 p-4 rounded-lg shadow-lg text-center">
          <p className="text-lg font-semibold">Erreur de chargement des couleurs.</p>
          <p className="mt-2">Veuillez réessayer plus tard ou contactez le support si le problème persiste.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="max-w-9xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        <header className="bg-primaryColor p-4 text-white text-center text-2xl font-bold">
          Calculateur de Mélange de Couleurs
        </header>
        <main className="p-6">
          {colors ? (
            <ColorMixCalculator colors={colors} />
          ) : (
            <div className="flex justify-center items-center h-64 bg-white shadow-md rounded-lg">
              <span className="text-lg font-semibold text-gray-600">Aucune couleur disponible.</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserColorMixCalculatorScreen;
