import React from 'react';
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery} from '../../slices/productApiSlice';
import Table from '../../components/shared/Table'; // Assurez-vous que le chemin est correct
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';
import { Edit, EyeIcon,  Loader2, Paperclip, PlusCircle, Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import Loader from '../FeedbackScreens/Loader';

const AdminWebsiteProductsScreen = () => {
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
    refetch,
  } = useGetProductsQuery();

  const navigate = useNavigate()

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [
    deleteProduct,
    { isLoading: deleteProductLoading },
  ] = useDeleteProductMutation()

  if (productsLoading) return <Loader/> ;
  if (productsError) return <p>Error: {productsError.message}</p>;
  if (!products || products.length === 0) return <p>No products found.</p>;

  const createProductHandler = async () => {
    if (window.confirm('Voulez-vous ajouter un produit?')) {
      try {
        await createProduct();
        refetch();
        toast.success('Produit créé avec succès');
      } catch (err) {
        toast.error('Erreur lors de la création du produit');
      }
    }
  };

  
const deleteHandler = async (id) => {
  if (window.confirm('Etes-vous sur de vouloir supprimer ce produit?')) {
    try {
      await deleteProduct(id).unwrap()
      toast.success('Produit supprimé avec succès!')
      refetch()
      navigate('/admin/website/produits')
    } catch (err) {
      console.error('Erreur lors de la suppression du produit:', err)
      toast.error('Erreur lors de la suppression du produit')
    }
  }

}


  // Définir les en-têtes pour le tableau dynamiquement
  const headers = [
    'Nom',
    'Dolibarr Link',
    'Catégorie',
    'Prix',
    'Quantité',
    'Actions',
  ];

  // Préparer les données pour le tableau en utilisant map
  const data = products.map((product) => ({
    Nom: `${product.name}`,
    'Dolibarr Link': (
      <Link to={`/admin-dollibarr-products-details/${product.dolibarrId}`}>
        <Button icon={Paperclip} version="primary" />
      </Link>
    ),
    Catégorie: product.category,
    Prix: `${product.price} XPF`,
    Quantité: product.countInStock,
    Actions: (
      <div className="flex space-x-2">
        <Button version="primary" icon={EyeIcon} />
        <Link to={`/admin/website/modifier-produit/${product._id}`}>
        <Button version="warning" icon={Edit} />
        </Link>
        <Button onClick={() => deleteHandler(product._id)} version="danger" icon={Trash} />
      </div>
    ),
  }));

  return (
    <>
      <div className='flex items-center justify-between my-4'>
        <h1 className="text-2xl font-bold">Liste des produits</h1>
        <Button onClick={createProductHandler} icon={PlusCircle} version="success">
         {loadingCreate ? (<Loader2/>) : ("Ajouter")}  
        </Button>
      </div>
      <Table headers={headers} data={data} version="primary" />
    </>
  );
};

export default AdminWebsiteProductsScreen;
