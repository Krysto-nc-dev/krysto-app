import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import Loader from "./FeedbackScreens/Loader";

const ProductDetailsScreen = () => {
  const { id: productId } = useParams();

  const { data: product, error: errorProduct, isLoading: loadingProduct } =
    useGetProductDetailsQuery(productId);

  // Vérification si les données du produit sont en chargement ou non disponibles
  if (loadingProduct) {
    return  <Loader/>;
  }

  if (errorProduct) {
    return <div>Error: {errorProduct.message}</div>;
  }

  // Vérification si le produit existe avant d'accéder à ses propriétés
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Product Details - {product.name}
      </h1>
      <p>{product.description}</p>
      <p>DOLIBARR ID : {product.dolibarrId}</p>
    </div>
  );
};

export default ProductDetailsScreen;
