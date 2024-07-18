import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import Loader from './FeedbackScreens/Loader';
import Button from '../components/shared/Button';
import { BsBasket } from 'react-icons/bs';
import SelectFilter from '../components/shared/SelectFilter';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [qty, setQty] = useState(1);



  const {
    data: product,
    error: errorProduct,
    isLoading: loadingProduct,
  } = useGetProductDetailsQuery(productId);


  const addToCartHandler = () => {
    dispatch(addToCart({ ...product , qty  }));
    navigate("/pannier")
  }


  if (loadingProduct) {
    return <Loader />;
  }

  if (errorProduct) {
    return <div>Error: {errorProduct.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Product Details - {product.name}</h1>
      <p>{product.description}</p>
      <p>DOLIBARR ID : {product.dolibarrId}</p>
      {product.countInStock > 0 ? (
        <SelectFilter
          version={'primary'}
          label="Quantité"
          options={[...Array(product.countInStock).keys()].map((x) => ({
            value: x + 1,
            label: (x + 1).toString(),
          }))}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
      ) : (
        <p className="text-red-500">Cette article n'est plus en stock</p>
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
