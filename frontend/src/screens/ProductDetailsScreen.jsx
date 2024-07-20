import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsQuery, useCreateProductReviewMutation } from '../slices/productApiSlice';
import Loader from './FeedbackScreens/Loader';
import Button from '../components/shared/Button';
import { BsBasket } from 'react-icons/bs';
import SelectFilter from '../components/shared/SelectFilter';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { useGetDolliProductDetailsQuery } from '../slices/dolibarr/dolliProductApiSlice';
import { toast } from 'react-toastify';
import Rating from '../components/shared/Rating';
import Card from '../components/shared/Card';

const ProductDetailsScreen = () => {
  const { id: productId } = useParams();

  // Premier appel API pour les détails du produit
  const {
    data: product,
    error: errorProduct,
    isLoading: loadingProduct,
    refetch,
  } = useGetProductDetailsQuery(productId);

  // Deuxième appel API pour les détails de l'autre source
  const {
    data: dolliProduct,
    error: errorDolliProduct,
    isLoading: loadingDolliProduct,
  } = useGetDolliProductDetailsQuery(product?.dolibarrId || '');

  // Mutation pour créer un avis sur le produit
  const [createProductReview, { isLoading: loadingProductReview, error: errorProductReview }] = useCreateProductReviewMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Optionnel : vous pouvez combiner les données ici si nécessaire
  }, [product, dolliProduct]);

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty }));
      navigate('/pannier');
    }
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      toast.error('Vous devez être connecté pour soumettre un avis.');
      return;
    }

    try {
      await createProductReview({ productId, rating, comment }).unwrap();
      toast.success('Avis soumis avec succès!');
      setRating(0);
      setComment('');
      refetch();
    } catch (err) {
      console.error('Erreur lors de la soumission de l\'avis:', err);
      toast.error('Erreur lors de la soumission de l\'avis');
    }
  };

  if (loadingProduct || loadingDolliProduct || loadingProductReview) {
    return <Loader />;
  }

  if (errorProduct) {
    return <div>Erreur lors du chargement des détails du produit : {errorProduct.message}</div>;
  }

  if (errorDolliProduct) {
    return <div>Erreur lors du chargement des détails du produit Dolibarr : {errorDolliProduct.message}</div>;
  }

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  // Vérification et sécurisation de la valeur de stock
  const stockReel = Number(dolliProduct?.stock_reel) || 0;
  const options = stockReel > 0 ? [...Array(stockReel).keys()].map((x) => ({
    value: x + 1,
    label: (x + 1).toString(),
  })) : [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Détails du produit - {product.name}</h1>
      <p>{product.description}</p>
      <p>DOLIBARR ID : {dolliProduct?.dolibarrId || 'N/A'}</p>
      {product.countInStock > 0 ? (
        <SelectFilter
          version="primary"
          label="Quantité"
          options={options}
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
      <div>
        <h2>Évaluer ce produit</h2>
        <form onSubmit={submitReviewHandler}>
          <div>
            <label>Évaluation (1-5) :</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <option value={0}>Choisir...</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div>
            <label>Commentaire :</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          </div>
          <div>
            <Button type="submit" disabled={loadingProductReview}>
              {loadingProductReview ? 'En cours...' : 'Envoyer'}
            </Button>
            {errorProductReview && <p className="text-red-500">{errorProductReview.message}</p>}
          </div>
          {!userInfo && <p className="text-red-500">Vous devez vous connecter pour évaluer ce produit.</p>}
        </form>
      </div>
      <h2>Avis des clients</h2>
      {product.reviews.length === 0 && <p>Aucun avis n'a été publié pour ce produit.</p>}
      {product.reviews.map((review) => (
        <Card key={review._id} className="mb-4">

          <Rating value={review.rating}/>
          <h3>{review.name}</h3>
          <p>{review.comment}</p>
         
          <hr />
          <p>Client : {review.user.name}</p>
          <p>Date du commentaire : {new Date(review.createdAt).toLocaleDateString()}</p>
         
        </Card>
      ))}
    </div>
  );
};

export default ProductDetailsScreen;
