import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetResellerProfileQuery, useUpdateResellerProfileMutation } from '../../slices/userApiSlice';
import { useGetProductsQuery } from '../../slices/productApiSlice';
import Loader from '../../components/shared/Loader'; // Assurez-vous que ce composant existe
import Button from '../../components/shared/Button'; // Assurez-vous que ce composant existe

const ResellerSettingsScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: resellerProfile,
    error: resellerProfileError,
    isLoading: resellerProfileLoading,
  } = useGetResellerProfileQuery(userInfo._id);

  const { data: products, error: productsError, isLoading: productsLoading } = useGetProductsQuery();
  
  const [margins, setMargins] = useState(0); // Taux de marge global
  const [stockLevels, setStockLevels] = useState({});

  const [updateResellerProfile] = useUpdateResellerProfileMutation();

  useEffect(() => {
    if (resellerProfile) {
      setMargins(resellerProfile.margin || 0); // Initialisez avec la valeur du profil
      // Configurez les niveaux de stock pour chaque produit
      const initialStockLevels = {};
      resellerProfile.preferredStockLevels.forEach((item) => {
        initialStockLevels[item.productId] = item.desiredQuantity;
      });
      setStockLevels(initialStockLevels);
    }
  }, [resellerProfile]);

  useEffect(() => {
    if (products) {
      // Ajoutez des produits qui ne sont pas dans les niveaux de stock
      const updatedStockLevels = { ...stockLevels };
      products.forEach((product) => {
        if (!updatedStockLevels[product._id]) {
          updatedStockLevels[product._id] = 0;
        }
      });
      setStockLevels(updatedStockLevels);
    }
  }, [products]);

  const handleMarginChange = (e) => {
    setMargins(e.target.value);
  };

  const handleStockChange = (productId, value) => {
    setStockLevels({
      ...stockLevels,
      [productId]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Préparez les niveaux de stock pour la mise à jour
      const updatedStockLevels = Object.keys(stockLevels).map(productId => ({
        productId,
        desiredQuantity: stockLevels[productId],
      }));

      // Met à jour le taux de marge global et les niveaux de stock
      await updateResellerProfile({
        resellerId: userInfo._id,
        margin: margins,
        preferredStockLevels: updatedStockLevels,
      }).unwrap();

      console.log('Taux de marge global:', margins);
      console.log('Niveaux de stock:', stockLevels);

      // Optionnel: Vous pouvez afficher un message de succès ou faire autre chose ici

    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil du revendeur:', err);
      // Optionnel: Afficher un message d'erreur
    }
  };

  if (resellerProfileLoading || productsLoading) {
    return <Loader />;
  }

  if (resellerProfileError || productsError) {
    return <p className="text-red-500">Erreur : {resellerProfileError?.message || productsError?.message}</p>;
  }

  return (
    <div className="p-4">
      <h1 className='text-xl font-bold mb-4'>Paramètres du Revendeur</h1>
      <p className='text-sm mb-4'>
        Cette page vous permet de configurer le pourcentage de marge global appliqué sur nos produits, ainsi que de définir le stock idéal souhaité pour chaque article.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Taux de Marge Global (%)</label>
          <input
            type="number"
            value={margins}
            onChange={handleMarginChange}
            className="block w-full border-gray-300 rounded-md shadow-sm"
            min="0"
            step="0.01"
          />
        </div>

        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-md shadow-sm bg-white mb-4 flex items-center w-56">
            <div className="w-24 h-24 flex-shrink-0">
              {product.images.length > 0 && (
                <img
                  src={product.images[0]} // La première image du produit
                  alt={product.name}
                  className="w-full h-full object-cover rounded-md"
                />
              )}
            </div>
            <div className="ml-4 flex-grow">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Quantité de Stock</label>
                <input
                  type="number"
                  value={stockLevels[product._id] || ''}
                  onChange={(e) => handleStockChange(product._id, e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  min="0"
                />
              </div>
            </div>
          </div>
        ))}

        <Button type="submit">Enregistrer les Modifications</Button>
      </form>
    </div>
  );
};

export default ResellerSettingsScreen;
