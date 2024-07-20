import React from 'react';
import Card from '../components/shared/Card';
import Rating from '../components/shared/Rating';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from './FeedbackScreens/Loader';
import Messages from './FeedbackScreens/Messages';
import { useGetDolliProductsQuery } from '../slices/dolibarr/dolliProductApiSlice';


const ProductsScreen = () => {
    const {data: products , error: errorProducts , isLoading: loadingProducts} = useGetProductsQuery()
    const {data: dolliProducts , error: errorDolliProducts , isLoading: dolliProductsLoading} =  useGetDolliProductsQuery()


    console.log("produits :" , products);
    console.log("produits dollibar :" , dolliProducts);
   
  return (
    <>
    {errorProducts && errorProducts.message && <Messages type="error" text="Une Erreur est survenue"/>}
  
    
      <h1 className="text-3xl font-bold mb-6">Découvrez nos produits</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
        {loadingProducts && <Loader/>}
        {errorProducts && <Messages type="error" text="Une Erreur est survenue"/> }
        {products && products.map((product) => (


          <Card key={product.id} product={product} image={product.images[0]} url={`/produit/${product._id}`} >
            <h2>{product.name}</h2>
             <p className=' min-h-44'>
              
             </p>
             <p className='absolute top-3'>{product.price} XPF</p>
              
              <Rating value={product.rating} text={product.numReviews + " avis"}/>
          </Card>
         
        ))}
      </section>
     
    </>
  );
};

export default ProductsScreen;
