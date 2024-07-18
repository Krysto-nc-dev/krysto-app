import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../slices/productApiSlice'; // Assurez-vous que cette fonction peut accepter des params dynamiques
import Loader from './FeedbackScreens/Loader';
import Button from '../components/shared/Button';
import { BsBasket } from 'react-icons/bs';
import SelectFilter from '../components/shared/SelectFilter';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { useGetDolliProductDetailsQuery } from '../slices/dolibarr/dolliProductApiSlice';

const ProductDetailsScreen = () => {
  const { id: productId } = useParams();

  // Premier appel API pour les détails du produit
  const {
    data: product,
    error: errorProduct,
    isLoading: loadingProduct,
  } = useGetProductDetailsQuery(productId);

  // Deuxième appel API pour les détails de l'autre source
  const {
    data: dolliProduct,
    error: errorDolliProduct,
    isLoading: loadingDolliProduct,
  } = useGetDolliProductDetailsQuery(product?.dolibarrId || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [qty, setQty] = useState(1);
  console.log(dolliProduct);

  useEffect(() => {
    // Optionnel : vous pouvez combiner les données ici si nécessaire
  }, [product, dolliProduct]);

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty }));
      navigate("/pannier");
    }
  };

  if (loadingProduct || loadingDolliProduct) {
    return <Loader />;
  }

  if (errorProduct) {
    return <div>Error loading product details: {errorProduct.message}</div>;
  }

  if (errorDolliProduct) {
    return <div>Error loading Dolibarr product details: {errorDolliProduct.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Product Details - {product.name}</h1>
      <p>{product.description}</p>
      <p>DOLIBARR ID : {dolliProduct?.dolibarrId || 'N/A'}</p>
      {product.countInStock > 0 ? (
        <SelectFilter
          version={'primary'}
          label="Quantité"
          options={[...Array( Number(dolliProduct.stock_reel)).keys()].map((x) => ({
            value: x + 1,
            label: (x + 1).toString(),
          }))}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
      ) : (
        <p className="text-red-500">Cet article n'est plus en stock</p>
      )}
      <Button
        version="primary"
        isDisabled={product.countInStock === 0}
        icon={BsBasket}
        onClick={addToCartHandler}
      >
        Ajouter au panier
      </Button>
    </div>
  );
};

export default ProductDetailsScreen;
