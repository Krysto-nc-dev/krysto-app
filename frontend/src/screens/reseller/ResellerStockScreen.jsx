import React from 'react';
import { useGetWarehouseDetailsQuery } from '../../slices/dolibarr/dolliWarehouseApiSlice'; // Hook pour obtenir les détails de l'entrepôt
import { useGetResellerProfileQuery } from '../../slices/userApiSlice'; // Hook pour obtenir le profil du revendeur
import { useSelector } from 'react-redux'; // Hook pour accéder à l'état global via Redux
import { useGetStockmovementsQuery } from '../../slices/dolibarr/dolliStockmovementApiSlice'; // Hook pour obtenir les mouvements de stock
import { useGetProductsQuery } from '../../slices/productApiSlice'; // Hook pour obtenir les produits
import Loader from '../FeedbackScreens/Loader'; // Composant Loader pour les états de chargement
import Card from '../../components/shared/Card'; // Composant Card pour afficher les informations produit

const ResellerStockScreen = () => {
  // Accéder à l'information utilisateur depuis l'état global de Redux
  const { userInfo } = useSelector((state) => state.auth);

  // Utiliser les hooks pour obtenir les données nécessaires
  const { data: resellerProfile, error: resellerProfileError, isLoading: resellerProfileLoading } = useGetResellerProfileQuery(userInfo._id);
  const { data: warehouse, error: warehouseError, isLoading: warehouseLoading } = useGetWarehouseDetailsQuery(resellerProfile?.dollibarWarehousId || '', { skip: !resellerProfile });
  const { data: stockMovements, error: stockMovementsError, isLoading: stockMovementsLoading } = useGetStockmovementsQuery();
  const { data: products, error: productsError, isLoading: productsLoading } = useGetProductsQuery();

  // Affichage des données dans la console pour débogage
  console.log("resellerProfile:", resellerProfile);
  console.log("products:", products);
  console.log("stockMovements:", stockMovements);

  // Filtrer les mouvements de stock en fonction de l'ID d'entrepôt du revendeur
  const filteredStockMovements = stockMovements?.filter(movement => movement.warehouse_id === resellerProfile?.dollibarWarehousId);

  // Calculer le stock réel par produit
  const calculateStock = (movements = [], products = []) => {
    const stock = {}; // Créer un objet pour stocker les quantités ajoutées et retirées

    // Créer une map pour les correspondances dolibarrId → product_id
    const dolibarrIdToProductId = {};
    products.forEach(product => {
      dolibarrIdToProductId[product.dolibarrId] = product._id;
    });

    // Parcourir chaque mouvement de stock
    movements.forEach(movement => {
      const productId = dolibarrIdToProductId[movement.product_id]; // Trouver l'ID du produit correspondant
      if (!productId) {
        console.warn(`Produit non trouvé pour dolibarrId ${movement.product_id}`);
        return;
      }

      let qty = Number(movement.qty); // Convertir la quantité en nombre

      if (isNaN(qty)) {
        console.warn(`Quantité invalide pour le produit ${productId}: ${movement.qty}`); // Afficher un avertissement si la quantité est invalide
        qty = 0; // Réinitialiser qty à 0
      }

      const type = movement.type; // Type de mouvement : ajout ou retrait

      // Initialiser les valeurs d'ajout et de retrait pour le produit
      if (!stock[productId]) {
        stock[productId] = { add: 0, remove: 0 };
      }

      // Mettre à jour les quantités ajoutées ou retirées
      if (type === '0') {
        stock[productId].add += qty;
      } else if (type === '1') {
        stock[productId].remove += qty;
      }
    });

    // Calculer le stock réel pour chaque produit
    const realStock = {};
    for (const productId in stock) {
      realStock[productId] = stock[productId].add - stock[productId].remove;
    }

    return realStock; // Retourner le stock réel
  };

  // Calculer le stock réel en passant les mouvements filtrés à la fonction calculateStock
  const stockByProduct = calculateStock(filteredStockMovements, products);

  // Afficher le Loader si les données sont en cours de chargement
  if (resellerProfileLoading || warehouseLoading || stockMovementsLoading || productsLoading) {
    return <Loader />;
  }

  // Afficher un message d'erreur si une erreur est survenue
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
        {/* Parcourir les niveaux de stock préférés du revendeur */}
        {resellerProfile?.preferredStockLevels.map((stockLevel) => {
          const productId = stockLevel.productId; // ID du produit dans le profil du revendeur

          // Trouver le produit correspondant à `productId`
          const product = products.find(p => p._id === productId); // Utiliser _id pour trouver le produit

          const preferredStockLevel = stockLevel.desiredQuantity; // Niveau de stock souhaité
          const actualStock = stockByProduct[productId] || 0; // Stock réel du produit
          const stockStatus = actualStock < preferredStockLevel ? 'text-red-500' : 'text-green-500'; // Statut du stock

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
