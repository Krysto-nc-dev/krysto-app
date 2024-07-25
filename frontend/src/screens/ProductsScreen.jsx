import React from 'react'
import Rating from '../components/shared/Rating'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Loader from './FeedbackScreens/Loader'
import Messages from './FeedbackScreens/Messages'
import { useGetDolliProductsQuery } from '../slices/dolibarr/dolliProductApiSlice'
import AnimatedPageTitle from '../components/shared/AnimatedPageTitle'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { Button, Typography } from '@mui/material'
import { EyeIcon, MoreVertical } from 'lucide-react'

const ProductsScreen = () => {
  const {
    data: products,
    error: errorProducts,
    isLoading: loadingProducts,
  } = useGetProductsQuery()
  const {
    data: dolliProducts,
    error: errorDolliProducts,
    isLoading: dolliProductsLoading,
  } = useGetDolliProductsQuery()

  console.log('produits :', products)
  console.log('produits dollibar :', dolliProducts)

  return (
    <>
      {errorProducts && errorProducts.message && (
        <Messages type="error" text="Une Erreur est survenue" />
      )}

      <AnimatedPageTitle title={'Découvrez nos produits'} />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
        {loadingProducts && <Loader />}
        {errorProducts && (
          <Messages type="error" text="Une Erreur est survenue" />
        )}
        {products &&
          products.map((product) => (
            <Card sx={{ maxWidth: 345 }} key={product.id}>
              <CardMedia
                component="img"
                height="110"
                sx={{ height: 140, width: '100%', objectFit: 'cover' }}
                image={product.images[0]} // Assurez-vous que ce chemin est correct
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography
                 variant="body2"
                 color="text.secondary"
                 sx={{
                   display: '-webkit-box',
                   WebkitBoxOrient: 'vertical',
                   overflow: 'hidden',
                   textOverflow: 'ellipsis',
                   WebkitLineClamp: 3, // Limite le texte à 3 lignes
                   height: '4.5em', // Hauteur fixe pour la description
                 }}
                >
                  {product.description}
                </Typography>
                <Rating value={product.rating}  text={product.numReviews + " Avis"}/>
              </CardContent>
              <CardActions>
                <Button
                  href={`/produit/${product._id}`}
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon= {<EyeIcon />}
                >
                  En savoir plus
                </Button>
              </CardActions>
            </Card>
          ))}
      </section>
    </>
  )
}

export default ProductsScreen
