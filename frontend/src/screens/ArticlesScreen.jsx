import React from 'react';
import { useGetArticlesQuery } from '../slices/articleApiSlice';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import Loader from './FeedbackScreens/Loader';
import Rating from '../components/shared/Rating';
import AnimatedPageTitle from '../components/shared/AnimatedPageTitle';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Heart, Share } from 'lucide-react';

// Styled component for the progress bar
const ProgressBar = styled(motion.div)({
  height: '4px',
  backgroundColor: '#3f51b5', // Customize the color as needed
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  transformOrigin: '0%',
});

// Styled component for the card media
const StyledCardMedia = styled(CardMedia)({
  height: 194, // Fixed height for the images
  objectFit: 'cover', // Ensures the image covers the area without distortion
});

// Styled component for fixed height typography
const FixedHeightTypography = styled(Typography)(({ theme, height }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 1, // Number of lines to display before truncating
  height: height,
}));

const ArticlesScreen = () => {
  const { data: articles, error: articleError, isLoading: loadingArticles } = useGetArticlesQuery();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (loadingArticles) {
    return <Loader />;
  }

  if (articleError) {
    return <p className="text-red-500">Erreur: {articleError.message}</p>;
  }

  return (
    <div className="p-4">
      {/* Barre de progression */}
      <ProgressBar style={{ scaleX }} />

      {/* Titre de la page */}
      <AnimatedPageTitle title={"Le Blog Krysto"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles && articles.map((article) => (
          <Card key={article._id} sx={{ maxWidth: 345, marginBottom: 2 }}>
            <StyledCardMedia
              component="img"
              image={article.images[0] || 'https://via.placeholder.com/300'}
              alt={article.title}
            />
            <CardContent>
              <FixedHeightTypography 
                variant="h6" 
                component="div" 
                fontSize="1rem"
                height="3em" // Fixed height for title
                gutterBottom
              >
                {article.title}
              </FixedHeightTypography>
              <FixedHeightTypography 
                variant="body2" 
                color="text.secondary" 
                height="5em" // Fixed height for subtitle
              >
                {article.subtitle}
              </FixedHeightTypography>
              <Rating value={article.rating} text={article.numReviews + " Avis"} />
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <Heart />
              </IconButton>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
              <Button
                component={Link}
                to={`/article-details/${article._id}`}
                size="small"
                sx={{ marginLeft: 'auto' }}
              >
                Lire plus
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticlesScreen;
