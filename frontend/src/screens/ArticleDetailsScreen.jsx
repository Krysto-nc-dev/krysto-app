import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetArticleDetailsQuery } from '../slices/articleApiSlice';


import { ArrowBigLeft, Loader } from 'lucide-react';
import Button from '../components/shared/Button';

const ArticleDetailsScreen = () => {
  const { id: articleId } = useParams();
  const { data: article, error: articleError, isLoading: articleLoading } = useGetArticleDetailsQuery(articleId);

  if (articleLoading) {
    return <Loader />;
  }

  if (articleError) {
    return <p className="text-red-500">Erreur: {articleError.message}</p>;
  }

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center">
        <Button icon={ArrowBigLeft}>
          <a href="/articles">Retour</a>
        </Button>
      </div>

      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <h2 className="text-2xl font-semibold mb-4">{article.subtitle}</h2>
      <p className="text-gray-600 mb-6">{article.category}</p>

      {article.images.length > 0 && (
        <div className="mb-6">
          {article.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Article image ${index + 1}`}
              className="w-full h-80 object-cover mb-4"
            />
          ))}
        </div>
      )}

      <div>
        {article.paragraphs.length > 0 ? (
          article.paragraphs.map((paragraph, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{paragraph.title}</h3>
              <p className="text-gray-700 mb-4">{paragraph.content}</p>
              {paragraph.listItems && paragraph.listItems.length > 0 && (
                <ul className="list-disc pl-5">
                  {paragraph.listItems.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600">{item.content}</li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p>Aucun paragraphe disponible.</p>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailsScreen;
