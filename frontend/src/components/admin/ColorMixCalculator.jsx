import React, { useState } from 'react';
import { ChefHat, OctagonX, RotateCcw, SaveAll } from 'lucide-react';

const ColorMixCalculator = ({ colors }) => {
  const [percentages, setPercentages] = useState(Array(colors.length).fill(0));
  const [weights, setWeights] = useState(Array(colors.length).fill(0));
  const [totalWeight, setTotalWeight] = useState(500); 
  const [isPercentageMode, setIsPercentageMode] = useState(true);

  const handlePercentageChange = (index, value) => {
    const newPercentages = [...percentages];
    newPercentages[index] = Math.max(0, parseFloat(value)) || 0;
    setPercentages(newPercentages);
  };

  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = Math.max(0, parseFloat(value)) || 0;
    setWeights(newWeights);
  };

  const handleReset = () => {
    setPercentages(Array(colors.length).fill(0));
    setWeights(Array(colors.length).fill(0));
  };

  const calculateWeights = () => {
    return percentages.map(percentage => (totalWeight * percentage) / 100);
  };

  const calculatePercentages = () => {
    const total = weights.reduce((acc, curr) => acc + curr, 0);
    return weights.map(weight => (weight / totalWeight) * 100);
  };

  const totalPercentage = percentages.reduce((acc, curr) => acc + curr, 0);
  const totalWeightInGrams = weights.reduce((acc, curr) => acc + curr, 0);
  const calculatedWeights = calculateWeights();

  const combinedColorsWeights = colors.map((color, index) => ({
    color: color.name,
    weight: isPercentageMode ? calculatedWeights[index] : weights[index],
    percentage: isPercentageMode ? percentages[index] : (weights[index] / totalWeight) * 100,
  }));

  const filteredColorsWeights = combinedColorsWeights.filter(({ weight }) => weight > 0);

  const toggleMode = () => {
    if (isPercentageMode) {
      setWeights(calculateWeights());
    } else {
      setPercentages(calculatePercentages());
    }
    handleReset();
    setIsPercentageMode(!isPercentageMode);
  };

  const handleSaveRecipe = () => {
    // Logic to save the recipe
    alert('Recette enregistrée !');
  };

  return (
    <div className="p-6 max-w-9xl mx-auto rounded-lg shadow-lg bg-white">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Calculateur de Mélange de Couleurs</h1>

      {(totalPercentage >= 100 && isPercentageMode) || (totalWeightInGrams >= totalWeight && !isPercentageMode) ? (
        <div className='flex items-center justify-between mb-4'>
          <div className="p-4 bg-green-500 text-white rounded-md flex items-center">
            <ChefHat strokeWidth={2.25} className='mr-3' /> Recette terminée ! Prêt à utiliser !
            <button 
              onClick={handleReset} 
              className="ml-4 text-red-300 hover:text-red-500"
            >
              <OctagonX strokeWidth={1.5} />
            </button>
          </div>
          <button 
            onClick={handleSaveRecipe} 
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center"
          >
            <SaveAll strokeWidth={1.5} className='mr-2' /> Enregistrer
          </button>
        </div>
      ) : null}

      <div className="mb-4 flex justify-between items-center">
        <div className="flex-1">
          <label htmlFor="totalWeight" className="block text-sm font-medium text-gray-700">
            Poids Total (grammes)
          </label>
          <input
            id="totalWeight"
            type="number"
            value={totalWeight}
            onChange={(e) => setTotalWeight(Math.max(0, parseFloat(e.target.value)))}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor"
          />
        </div>
        <button 
          onClick={toggleMode} 
          className="ml-4 px-6 py-2 bg-primaryColor text-white rounded-full hover:bg-secondaryColor flex items-center"
        >
          <RotateCcw className="mr-2" /> 
          {isPercentageMode ? 'Entrer par Grammes' : 'Entrer par Pourcentages'}
        </button>
      </div>
      
      <h2 className="text-lg font-semibold mb-2 text-gray-800">
        {isPercentageMode ? 'Pourcentages des Couleurs' : 'Grammages des Couleurs'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        {colors.map((color, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">{color.name}</label>
            <input
              type="number"
              value={isPercentageMode ? percentages[index] : weights[index]}
              onChange={(e) => isPercentageMode ? handlePercentageChange(index, e.target.value) : handleWeightChange(index, e.target.value)}
              className={`block w-full p-2 border text-gray-700 rounded-md shadow-sm ${((isPercentageMode && totalPercentage >= 100) || (!isPercentageMode && totalWeightInGrams >= totalWeight)) ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-primaryColor focus:border-primaryColor`}
              disabled={(isPercentageMode && totalPercentage >= 100) || (!isPercentageMode && totalWeightInGrams >= totalWeight)}
            />
            {((isPercentageMode && totalPercentage >= 100) || (!isPercentageMode && totalWeightInGrams >= totalWeight)) && (
              <p className="text-xs text-red-500 mt-2">Vous avez atteint la limite</p>
            )}
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          {isPercentageMode ? 'Grammage des Couleurs' : 'Pourcentage des Couleurs'}
        </h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 bg-primaryColor text-white text-left">Couleur</th>
              <th className="py-2 px-4 bg-primaryColor text-white text-left">{isPercentageMode ? 'Poids (grammes)' : 'Pourcentage (%)'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredColorsWeights.map(({ color, weight, percentage }, index) => (
              <tr key={index} className='border-b hover:bg-gray-100'>
                <td className="py-2 px-4">{color}</td>
                <td className="py-2 px-4">{isPercentageMode ? weight.toFixed(2) : percentage.toFixed(2)} {isPercentageMode ? 'g' : '%'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ColorMixCalculator;
