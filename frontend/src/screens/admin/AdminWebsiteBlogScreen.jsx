import React from 'react';
import Loader from '../FeedbackScreens/Loader';
import Button from '../../components/shared/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowBigLeft, Edit, PlusCircle, Trash } from 'lucide-react';
import { useCreateArticleMutation, useDeleteArticleMutation, useGetArticlesQuery, useUpdateArticleMutation } from '../../slices/articleApiSlice';
import { useGetUsersQuery } from '../../slices/userApiSlice';

const AdminWebsiteBlogScreen = () => {
  const { data: articles, error: errorArticles, isLoading: loadingArticles, refetch } = useGetArticlesQuery();
  const { data: users, error: usersError, isLoading: usersLoading } = useGetUsersQuery();
  const [updateArticle] = useUpdateArticleMutation();
  const [deleteArticle] = useDeleteArticleMutation();
  const [createArticle, { isLoading: loadingCreate }] = useCreateArticleMutation();

  const createArticleHandler = async () => {
    if (window.confirm('Voulez-vous ajouter un article ?')) {
      try {
        await createArticle();
        refetch();
        toast.success('Article créé avec succès');
      } catch (err) {
        toast.error('Erreur lors de la création de l\'article');
      }
    }
  };

  const handleDelete = async (articleId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await deleteArticle(articleId).unwrap();
        refetch();
        toast.success('Article supprimé avec succès!');
      } catch (err) {
        toast.error('Erreur lors de la suppression de l\'article');
      }
    }
  };

  if (loadingArticles || usersLoading) return <Loader />;
  if (errorArticles) return <p className="text-red-500">Erreur: {errorArticles.message}</p>;
  if (usersError) return <p className="text-red-500">Erreur: {usersError.message}</p>;

  // Créer un dictionnaire pour faciliter l'accès au nom complet de l'auteur par ID
  const userMap = users.reduce((acc, user) => {
    acc[user._id] = `${user.name} ${user.lastname}`;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl">Liste des articles</h1>
        <Button icon={ArrowBigLeft}>
          <Link to="/admin-administration-du-site"> Retour</Link>
        </Button>
      </div>

      <div className='mb-4'>
        <Button onClick={createArticleHandler} icon={PlusCircle} version="success">
          {loadingCreate ? 'Chargement...' : 'Ajouter'}
        </Button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primaryColor">
          <tr>
            <th className="px-6 py-3 text-left text-xs text-gray-700 font-bold uppercase tracking-wider">Auteur</th>
            <th className="px-6 py-3 text-left text-xs text-gray-700 font-bold uppercase tracking-wider">Couverture</th>
            <th className="px-6 py-3 text-left text-xs text-gray-700 font-bold uppercase tracking-wider">Titre</th>
            <th className="px-6 py-3 text-left text-xs text-gray-700 font-bold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {articles.map((article) => (
            <tr key={article._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {userMap[article.author] || 'Auteur inconnu'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {article.images[0] ? (
                  <img
                    src={`${article.images[0]}`}
                    alt="Couverture"
                    className="w-40 h-10 object-cover"
                  />
                ) : (
                  <p>Aucune image</p>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.title}</td>
              <td className="flex justify-center items-center gap-3 px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button version="warning" icon={Edit} className="mr-2">
                  <Link to={`/admin/website/modifier-article/${article._id}`}>Éditer</Link>
                </Button>
                <Button version="danger" icon={Trash} onClick={() => handleDelete(article._id)} className="bg-red-500 text-white">
                 
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminWebsiteBlogScreen;
