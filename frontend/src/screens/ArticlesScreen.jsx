import React from 'react';
import { useGetArticlesQuery } from '../slices/articleApiSlice';

import { Link } from 'react-router-dom';
import Loader from './FeedbackScreens/Loader';
import Rating from '../components/shared/Rating';

const ArticlesScreen = () => {
  const { data: articles, error: articleError, isLoading: loadingArticles } = useGetArticlesQuery();

  if (loadingArticles) {
    return <Loader />;
  }

  if (articleError) {
    return <p className="text-red-500">Erreur: {articleError.message}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles && articles.map((article) => (
          <div key={article._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={article.images[0] || 'https://via.placeholder.com/300'}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-4">{article.subtitle}</p>
              <Link to={`/article-details/${article._id}`} className=" mb-2 text-blue-500 hover:underline">
                Lire plus
              </Link>
            <Rating value={article.rating} text={article.numReviews + " Avis"}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesScreen;
