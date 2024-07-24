import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetArticleDetailsQuery, useCreateArticleReviewMutation } from '../slices/articleApiSlice';
import { motion, useScroll, useSpring } from 'framer-motion'; // Importer framer-motion
import Button from '../components/shared/Button';
import { ArrowBigLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import Card from '../components/shared/Card';
import Loader from './FeedbackScreens/Loader';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ArticleDetailsScreen = () => {
  const { id: articleId } = useParams();
  const { data: article, error: articleError, isLoading: articleLoading } = useGetArticleDetailsQuery(articleId);
  const [createArticleReview, { isLoading: loadingReview, error: reviewError }] = useCreateArticleReviewMutation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Barre de progression
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (articleLoading) {
    return <Loader />;
  }

  if (articleError) {
    return <p className="text-red-500">Erreur: {articleError.message}</p>;
  }

  const submitReviewHandler = async (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === '') {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }

    try {
      await createArticleReview({ articleId, rating, comment }).unwrap();
      toast.success('Avis soumis avec succès!');
      setRating(0);
      setComment('');
    } catch (err) {
      console.error('Erreur lors de la soumission de l\'avis:', err);
      toast.error('Erreur lors de la soumission de l\'avis.');
    }
  };

  if (!article) {
    return <p>Article non trouvé.</p>;
  }

  const reviews = Array.isArray(article.reviews) ? article.reviews : [];

  return (
    <div className="p-4">
      {/* Barre de progression */}
      <motion.div
        className="progress-bar fixed top-0 left-0 h-2 bg-blue-500"
        style={{ scaleX }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX }}
        transition={{ duration: 0.1 }}
      />

      <div className="mb-6 flex items-center">
        <Button icon={ArrowBigLeft}>
          <a href="/blog">Retour</a>
        </Button>
      </div>

      <motion.h1
        className="text-4xl font-bold mb-4"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 0.6 }}
      >
        {article.title || 'Titre indisponible'}
      </motion.h1>

      <motion.h2
        className="text-2xl font-semibold mb-4"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 0.7 }}
      >
        {article.subtitle || 'Sous-titre indisponible'}
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 0.8 }}
      >
        {article.category || 'Catégorie indisponible'}
      </motion.p>

      {article.images && article.images.length > 0 && (
        <div className="mb-6">
          {article.images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Article image ${index + 1}`}
              className="w-full h-80 object-cover mb-4"
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.9 }}
            />
          ))}
        </div>
      )}

      <div>
        {article.paragraphs && article.paragraphs.length > 0 ? (
          article.paragraphs.map((paragraph, index) => (
            <motion.div
              key={index}
              className="mb-6"
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 1 }}
            >
              <h3 className="text-xl font-semibold mb-2">{paragraph.title || 'Titre indisponible'}</h3>
              <p className="text-gray-700 mb-4">{paragraph.content || 'Contenu indisponible'}</p>
              {paragraph.listItems && paragraph.listItems.length > 0 && (
                <ul className="list-disc pl-5">
                  {paragraph.listItems.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600">{item.content || 'Élément indisponible'}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))
        ) : (
          <p>Aucun paragraphe disponible.</p>
        )}
      </div>

      <div className="mt-10">
        <motion.h2
          className="text-xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 1.2 }}
        >
          Ajouter un avis
        </motion.h2>
        <form onSubmit={submitReviewHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Évaluation (1-5)</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={0}>Choisir...</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Commentaire</label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <Button type="submit" disabled={loadingReview}>
            {loadingReview ? 'En cours...' : 'Soumettre'}
          </Button>
          {reviewError && <p className="text-red-500">{reviewError.message}</p>}
        </form>
      </div>

      <div className="mt-10">
        <motion.h2
          className="text-xl font-semibold mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          transition={{ duration: 1.4 }}
        >
          Avis des lecteurs
        </motion.h2>
        {reviews.length === 0 ? (
          <p>Aucun avis pour cet article.</p>
        ) : (
          reviews.map((review) => (
            <motion.div
              key={review._id}
              className="mb-4"
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 1.5 }}
            >
              <Card>
                <div className="mb-2">
                  <span className="font-semibold">Note:</span> {review.rating}/5
                </div>
                <p className="mb-2">{review.comment}</p>
                <div className="text-gray-600 text-sm">
                  <span className="font-semibold">Auteur:</span> {review.name || 'Anonyme'}
                </div>
                <div className="text-gray-400 text-xs">
                  <span className="font-semibold">Date:</span> {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticleDetailsScreen;
