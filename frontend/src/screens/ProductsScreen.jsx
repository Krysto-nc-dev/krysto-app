import React from 'react';
import Card from '../components/shared/Card';

const ProductsScreen = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Découvrez nos produits</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-5">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </>
  );
};

export default ProductsScreen;
