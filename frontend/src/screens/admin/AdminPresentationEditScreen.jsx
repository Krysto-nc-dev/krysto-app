import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../FeedbackScreens/Loader';
import Button from '../../components/shared/Button';
import { ArrowBigLeft, Edit, Eye, EyeIcon, Loader2, Send, Trash } from 'lucide-react';
import { toast } from 'react-toastify';

import { useSelector } from 'react-redux';
import { useAddSlideToPresentationMutation, useDeleteSlideFromPresentationMutation, useGetPresentationDetailsQuery, useUpdatePresentationMutation, useUpdateSlideInPresentationMutation } from '../../slices/presentationApiSlice';

const AdminPresentationEditScreen = () => {
  const { id: presentationId } = useParams();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagesArray, setImagesArray] = useState([]);
  const [slides, setSlides] = useState([]);
  const [newSlide, setNewSlide] = useState({
    title: '',
    subtitle: '',
    paragraphs: [],
  });
  
  const [updatePresentation, { isLoading: loadingUpdate }] = useUpdatePresentationMutation();
//   const [uploadPresentationImage] = useUploadPresentationImageMutation();
  const [updateSlide] = useUpdateSlideInPresentationMutation();
  const [addSlide] = useAddSlideToPresentationMutation();
  const [deleteSlide] = useDeleteSlideFromPresentationMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { data: presentation, error: presentationError, isLoading: presentationLoading, refetch } = useGetPresentationDetailsQuery(presentationId);

  useEffect(() => {
    if (presentation) {
      setTitle(presentation.title || '');
      setDescription(presentation.description || '');
      setImagesArray(presentation.images || []);
      setSlides(presentation.slides || []);
    }
  }, [presentation]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const updatedPresentation = {
      _id: presentationId,
      title,
      description,
      images: imagesArray,
      slides,
    };

    try {
      await updatePresentation(updatedPresentation).unwrap();
      toast.success('Présentation mise à jour avec succès!');
      refetch();
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la présentation:", err);
      toast.error("Erreur lors de la mise à jour de la présentation");
    }
  };

//   const uploadFileHandler = async (e) => {
//     const files = Array.from(e.target.files);
//     const formData = new FormData();
//     files.forEach(file => formData.append('images', file));

//     try {
//       const res = await uploadPresentationImage(formData).unwrap();
//       setImagesArray((prevImages) => [...prevImages, ...res.images]);
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

  const removeImage = (index) => {
    setImagesArray(imagesArray.filter((_, i) => i !== index));
  };

  const addSlideHandler = async (e) => {
    e.preventDefault();
  
    if (!newSlide.title.trim() || !newSlide.subtitle.trim()) {
      toast.error('Le titre et le sous-titre de la diapositive sont requis.');
      return;
    }
  
    try {
      const response = await addSlide({
        presentationId,
        slide: newSlide,
      }).unwrap();
      
      toast.success('Diapositive ajoutée avec succès!');
      setSlides(response.slides || []);
      setNewSlide({ title: '', subtitle: '', paragraphs: [] });
    } catch (err) {
      console.error("Erreur lors de l'ajout de la diapositive:", err);
      toast.error(`Erreur lors de l'ajout de la diapositive: ${err?.data?.message || err.message}`);
    }
  };

  const updateSlideHandler = async (index, slide) => {
    try {
      const updatedSlides = [...slides];
      updatedSlides[index] = slide;
      await updateSlide({
        presentationId,
        slideId: slide._id,
        slide,
      }).unwrap();
      
      toast.success('Diapositive mise à jour avec succès!');
      setSlides(updatedSlides);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la diapositive:", err);
      toast.error(`Erreur lors de la mise à jour de la diapositive: ${err?.data?.message || err.message}`);
    }
  };

  const deleteSlideHandler = async (index) => {
    try {
      await deleteSlide({
        presentationId,
        slideId: slides[index]._id,
      }).unwrap();
      
      toast.success('Diapositive supprimée avec succès!');
      setSlides(slides.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Erreur lors de la suppression de la diapositive:", err);
      toast.error(`Erreur lors de la suppression de la diapositive: ${err?.data?.message || err.message}`);
    }
  };

  if (presentationLoading) {
    return <Loader />;
  }

  if (presentationError) {
    return <p className="text-red-500">Erreur: {presentationError.message}</p>;
  }

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl">Éditer la Présentation</h1>
        <Button icon={ArrowBigLeft}>
          <Link to="/admin/presentations"> Retour</Link>
        </Button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Titre de la Présentation
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
            Description
          </label>
          <textarea
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            // onChange={uploadFileHandler}
          />
        </div>

        <Button type="submit" icon={Send}>
          {loadingUpdate ? <Loader2 /> : 'Valider'}
        </Button>
      </form>

      <div className="mt-10">
        <h2 className="text-xl mb-4">Ajouter une Diapositive</h2>
        <form onSubmit={addSlideHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Titre de la Diapositive
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newSlide.title}
              onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sous-titre
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newSlide.subtitle}
              onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
            />
          </div>
          <Button type="submit" icon={Send}>
            {loadingUpdate ? <Loader2 /> : 'Ajouter la Diapositive'}
          </Button>
        </form>
      </div>

      <div className="mt-10">
        <h2 className="text-xl mb-4">Diapositives Existantes</h2>
        {slides.length > 0 ? (
          <ul>
            {slides.map((slide, index) => (
              <li key={index} className="mb-4 border p-4 rounded">
                <h3 className="text-lg font-semibold">{slide.title}</h3>
                <p>{slide.subtitle}</p>
                
                <div className="flex items-center gap-4 mt-5">

                <Button
                  version={'primary'}
                  
                  icon={Eye}
                  />
                <Button
                  version={'warning'}
                  
                  icon={Edit}
                  />
                <Button
                  version={'danger'}
                  onClick={() => deleteSlideHandler(index)}
                  icon={Trash}
                  />
                  </div>
         
                
                {/* Ajouter des fonctionnalités supplémentaires pour modifier une diapositive ici */}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune diapositive disponible.</p>
        )}
      </div>
    </>
  );
};

export default AdminPresentationEditScreen;
