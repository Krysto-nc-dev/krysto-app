import React from 'react';
import Card from '../components/shared/Card';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Button from '../components/shared/Button';

import { Heart, Star, Bell } from 'lucide-react'; // Importez les icônes dont vous avez besoin


const ProductsScreen = () => {
    const {data: products , error: errorProducts , isLoading: loadingProducts} = useGetProductsQuery()
    const handleClick = () => {
        alert('Button clicked!');
      };
    console.log(products);
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Découvrez nos produits</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-5">
        {loadingProducts && <p>Chargement des produits...</p>}
        {errorProducts && <p>Une erreur est survenue...</p>}
        {products && products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </section>
      <div className="p-6 space-y-4">
      <Button icon={Heart} version="primary" onClick={handleClick}>
        Like
      </Button>
      <Button icon={Star} version="secondary" onClick={handleClick}>
        Rate
      </Button>
      <Button icon={Bell} version="success" onClick={handleClick}>
        Notify
      </Button>
      <Button icon={Bell} version="primary" isDisabled>
        Disabled
      </Button>
    </div>
    </>
  );
};

export default ProductsScreen;
