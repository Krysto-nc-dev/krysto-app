import React from 'react';
import { useGetWarehouseDetailsQuery } from '../../slices/dolibarr/dolliWarehouseApiSlice';
import { useGetResellerProfileQuery } from '../../slices/userApiSlice';
import { useSelector } from 'react-redux';
import { useGetStockmovementsQuery } from '../../slices/dolibarr/dolliStockmovementApiSlice';
import { useGetProductsQuery } from '../../slices/productApiSlice';
import Loader from '../FeedbackScreens/Loader';
import Card from '../../components/shared/Card';

const ResellerStockScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: resellerProfile, error: resellerProfileError, isLoading: resellerProfileLoading } = useGetResellerProfileQuery(userInfo._id);
  const { data: warehouse, error: warehouseError, isLoading: warehouseLoading } = useGetWarehouseDetailsQuery(resellerProfile?.dollibarWarehousId || '', { skip: !resellerProfile });
  const { data: stockMovements, error: stockMovementsError, isLoading: stockMovementsLoading } = useGetStockmovementsQuery();
  const { data: products, error: productsError, isLoading: productsLoading } = useGetProductsQuery();

  // Vérifiez les données dans la console
  console.log("resellerProfile:", resellerProfile);
  console.log("products:", products);
  console.log("stockMovements:", stockMovements);

  // Filtrer les mouvements de stock en fonction de l'ID d'entrepôt
  const filteredStockMovements = stockMovements?.filter(movement => movement.warehouse_id === resellerProfile?.dollibarWarehousId);

  // Calculer le stock réel par produit
  const calculateStock = (movements) => {
    const stock = {};

    movements.forEach(movement => {
      const productId = movement.product_id; // Assurez-vous que cela correspond à `dolibarrId`
      let qty = Number(movement.qty);

      if (isNaN(qty)) {
        console.warn(`Invalid quantity for product ${productId}: ${movement.qty}`);
        qty = 0;
      }

      const type = movement.type;

      if (!stock[productId]) {
        stock[productId] = { add: 0, remove: 0 };
      }

      if (type === '0') {
        stock[productId].add += qty;
      } else if (type === '1') {
        stock[productId].remove += qty;
      }
    });

    const realStock = {};
    for (const productId in stock) {
      realStock[productId] = stock[productId].add - stock[productId].remove;
    }

    return realStock;
  };

  const stockByProduct = calculateStock(filteredStockMovements || []);

  if (resellerProfileLoading || warehouseLoading || stockMovementsLoading || productsLoading) {
    return <Loader />;
  }

  if (resellerProfileError || warehouseError || stockMovementsError || productsError) {
    return <p className="text-red-500">Erreur : {resellerProfileError?.message || warehouseError?.message || stockMovementsError?.message || productsError?.message}</p>;
  }

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Stock Réel</h1>
      <p className="text-lg mb-6 text-gray-700">
        Suivez les quantités disponibles pour chaque produit dans votre entrepôt.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {resellerProfile?.preferredStockLevels.map((stockLevel) => {
          const productId = stockLevel.productId; // ID dans le profil du revendeur
          
          // Vérifiez la valeur des IDs pour le débogage
          console.log(`Recherche produit pour ID: ${productId}`);
          
          // Trouver le produit correspondant à `productId`
          const product = products.find(p => p._id === productId); // Utilisez _id pour correspondre aux IDs
          
          // Vérifiez la correspondance
          console.log(`Produit trouvé pour ID ${productId}:`, product);

          const preferredStockLevel = stockLevel.desiredQuantity;
          const actualStock = stockByProduct[productId] || 0;
          const stockStatus = actualStock < preferredStockLevel ? 'text-red-500' : 'text-green-500';

          return (
            <Card key={productId} className="bg-white shadow-md rounded-lg p-4 flex items-center">
              {product?.images?.length > 0 ? (
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={product.images[0]} // La première image du produit
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 flex-shrink-0 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Image non disponible</p>
                </div>
              )}
              <div className="ml-4 flex-grow">
                <h2 className="text-xl font-medium mb-2">{product ? product.name : 'Produit non trouvé'}</h2>
                <p className={`text-lg ${stockStatus} mb-2`}>
                  Stock Réel: {actualStock}
                  <span className="text-gray-500"> (Souhaité: {preferredStockLevel})</span>
                </p>
                {product && (
                  <div className="mt-2">
                    <p className="text-gray-600">Prix de vente: {product.price} Xpf</p>
                    <p className="text-gray-600">Votre marge: {product.price * resellerProfile.margin / 100} Xpf</p>
                    <p className="text-gray-600">Prix de revente: {product.price * (1 + resellerProfile.margin / 100)} Xpf</p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
      {resellerProfile?.preferredStockLevels.length === 0 && <p className="text-gray-700 mt-6">Aucun produit trouvé dans les niveaux de stock préférés.</p>}
    </div>
  );
};

export default ResellerStockScreen;
