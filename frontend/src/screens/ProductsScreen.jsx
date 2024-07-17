import React from 'react';
import Card from '../components/shared/Card';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from './FeedbackScreens/Loader';
import Messages from './FeedbackScreens/Messages';


const ProductsScreen = () => {
    const {data: products , error: errorProducts , isLoading: loadingProducts} = useGetProductsQuery()
    
   
  return (
    <>
    {errorProducts && errorProducts.message && <Messages type="error" text="Une Erreur est survenue"/>}
  
    
      <h1 className="text-3xl font-bold mb-6">Découvrez nos produits</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-5">
        {loadingProducts && <Loader/>}
        {errorProducts && <Messages type="error" text="Une Erreur est survenue"/> }
        {products && products.map((product) => (
          <Card key={product.id} product={product} url={`/produit/${product._id}`}/>
        ))}
      </section>
     
    </>
  );
};

export default ProductsScreen;
