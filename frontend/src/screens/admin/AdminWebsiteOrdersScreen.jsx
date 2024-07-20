import React from 'react';
import { useGetOrdersQuery } from '../../slices/orderApiSlice';
import Table from '../../components/shared/Table';
import { Check, X } from 'lucide-react'; // Assurez-vous d'utiliser les bons noms pour les icônes
import { Link } from 'react-router-dom';
import Loader from '../FeedbackScreens/Loader';
import Messages from '../FeedbackScreens/Messages';

const AdminWebsiteOrdersScreen = () => {
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetOrdersQuery();

  if (ordersLoading) return <Loader/>;
  if (ordersError) return <p>Error: {ordersError.message}</p>;

  if (!orders || orders.length === 0) return <Messages  message={"Aucune commandes trouvé"}/>;

  // Définir les en-têtes pour le tableau dynamiquement
  const headers = [
    'ID',
    'Nom',
    'Adresse',
    'Total commande',
    'Taxe',
    'Livraison',
    'Total',
    'Payée',
    'Livrée',
  ];

  // Préparer les données pour le tableau en utilisant map
  const data = orders.map((order) => ({
    'ID': <Link to={`/commande/${order._id}`}>{order._id}</Link>,
    'Nom': `${order.user.name} ${order.user.lastname}`,
    'Adresse': `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`,
    'Total commande': `${order.itemsPrice} XPF`,
    'Taxe': `${order.taxPrice} XPF`,
    'Livraison': `${order.shippingPrice} XPF`,
    'Total': `${order.totalPrice} XPF`,
    'Payée': order.isPaid ? (
      <Check className="text-green-600" />
    ) : (
      <X className="text-red-600" />
    ),
    'Livrée': order.isDelivered ? (
      <Check className="text-green-600" />
    ) : (
      <X className="text-red-600" />
    ),
  }));

  return (
    <>
      <h1>Listes des commandes</h1>
      <Table headers={headers} data={data} version="primary" />
    </>
  );
};

export default AdminWebsiteOrdersScreen;
