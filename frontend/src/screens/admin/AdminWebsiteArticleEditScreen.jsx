import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../FeedbackScreens/Loader';
import Button from '../../components/shared/Button';
import { ArrowBigLeft, Loader2, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  useGetArticleDetailsQuery,
  useUpdateArticleMutation,
  useUploadArticleImageMutation,
  useAddArticleParagraphMutation,
  useUpdateArticleParagraphMutation,
} from '../../slices/articleApiSlice';
import { useSelector } from 'react-redux';

const AdminWebsiteArticleEditScreen = () => {
  const { id: articleId } = useParams();
  
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imagesArray, setImagesArray] = useState([]);
  const [category, setCategory] = useState('');
  
  const [paragraphTitle, setParagraphTitle] = useState('');
  const [paragraphContent, setParagraphContent] = useState('');
  const [paragraphs, setParagraphs] = useState([]);

  const [listItems, setListItems] = useState([]);
  const [newListItem, setNewListItem] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const { data: article, error: articleError, isLoading: articleLoading, refetch } = useGetArticleDetailsQuery(articleId);
  const [updateArticle, { isLoading: loadingUpdate }] = useUpdateArticleMutation();
  const [uploadArticleImage, { isLoading: uploadMutationLoading }] = useUploadArticleImageMutation();
  const [addArticleParagraph, { isLoading: addingParagraph }] = useAddArticleParagraphMutation();
  const [updateArticleParagraph, { isLoading: updatingParagraph }] = useUpdateArticleParagraphMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (article) {
      setTitle(article?.title || '');
      setSubtitle(article?.subtitle || '');
      setImagesArray(article?.images || []);
      setCategory(article?.category || '');
      setParagraphs(article?.paragraphs || []);
    }
  }, [article]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedArticle = {
      _id: articleId,
      author: userInfo._id,
      title,
      subtitle,
      images: imagesArray,
      category,
    };

    try {
      await updateArticle(updatedArticle).unwrap();
      toast.success('Article mis à jour avec succès!');
      refetch();
      navigate('/admin/website/blog-articles');
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'article:", err);
      toast.error("Erreur lors de la mise à jour de l'article");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('images', e.target.files[0]);

    try {
      const res = await uploadArticleImage(formData).unwrap();
      setImagesArray((prevImages) => [...prevImages, ...res.images]);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const removeImage = (index) => {
    const newImagesArray = [...imagesArray];
    newImagesArray.splice(index, 1);
    setImagesArray(newImagesArray);
  };

  const addParagraphHandler = async (e) => {
    e.preventDefault();

    try {
      const updatedArticle = await addArticleParagraph({
        articleId,
        paragraph: {
          title: paragraphTitle,
          content: paragraphContent,
          listItems: listItems,
        },
      }).unwrap();
      
      toast.success('Paragraphe ajouté avec succès!');
      setParagraphTitle('');
      setParagraphContent('');
      setListItems([]);
      setNewListItem('');
      setParagraphs(updatedArticle.paragraphs || []);
      refetch();
    } catch (err) {
      console.error("Erreur lors de l'ajout du paragraphe:", err);
      toast.error("Erreur lors de l'ajout du paragraphe");
    }
  };

  const addListItemHandler = (e) => {
    e.preventDefault();
    if (newListItem.trim()) {
      setListItems([...listItems, { content: newListItem }]);
      setNewListItem('');
    }
  };

  const removeListItemHandler = (index) => {
    setListItems(listItems.filter((_, i) => i !== index));
  };

  if (articleLoading) {
    return <Loader />;
  }

  if (articleError) {
    return <p className="text-red-500">Erreur: {articleError.message}</p>;
  }

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl">Editer l'article</h1>
        <Button icon={ArrowBigLeft}>
          <Link to="/admin/website/blog-articles"> Retour</Link>
        </Button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Titre de l'article
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sous-titre
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Catégorie
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Images
          </label>
          <div className="flex flex-wrap">
            {imagesArray.length > 0 ? (
              imagesArray.map((image, index) => (
                <div key={index} className="relative mr-4 mb-4">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-32 h-32 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                    onClick={() => removeImage(index)}
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p>Aucune image ajoutée</p>
            )}
          </div>
          <input
            type="file"
            multiple
            onChange={uploadFileHandler}
          />
        </div>

        <Button type="submit" icon={Send}>
          {loadingUpdate ? <Loader2 /> : 'Valider'}
        </Button>
      </form>

      <div className="mt-10">
        <h2 className="text-xl mb-4">Ajouter un paragraphe</h2>
        <form onSubmit={addParagraphHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Titre du paragraphe
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={paragraphTitle}
              onChange={(e) => setParagraphTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contenu du paragraphe
            </label>
            <textarea
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={paragraphContent}
              onChange={(e) => setParagraphContent(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ajouter des éléments à la liste (optionnel)
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newListItem}
                onChange={(e) => setNewListItem(e.target.value)}
                placeholder="Ajouter un élément à la liste"
              />
              <Button type="button" onClick={addListItemHandler}>
                Ajouter
              </Button>
            </div>
            {listItems.length > 0 && (
              <ul className="list-disc pl-5">
                {listItems.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.content}
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => removeListItemHandler(index)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button type="submit" icon={Send}>
            {addingParagraph ? <Loader2 /> : 'Ajouter le paragraphe'}
          </Button>
        </form>
      </div>

      <div className="mt-10">
        <h2 className="text-xl mb-4">Paragraphes existants</h2>
        {paragraphs.length > 0 ? (
          <ul>
            {paragraphs.map((paragraph, index) => (
              <li key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{paragraph.title}</h3>
                <p>{paragraph.content}</p>
                {paragraph.listItems && paragraph.listItems.length > 0 && (
                  <ul className="list-disc pl-5">
                    {paragraph.listItems.map((item, itemIndex) => (
                      <li key={itemIndex}>{item.content}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun paragraphe disponible.</p>
        )}
      </div>
    </>
  );
};

export default AdminWebsiteArticleEditScreen;
