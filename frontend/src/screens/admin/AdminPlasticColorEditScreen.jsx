import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetPlasticColorDetailsQuery,
  useUpdatePlasticColorMutation,
  useUploadPlasticColorImageMutation,
} from '../../slices/plasticColorsApiSlice'; // Adjust import paths as necessary
import Loader from '../FeedbackScreens/Loader';
import Button from '../../components/shared/Button';
import { ArrowBigLeft, Loader2, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminPlasticColorEditScreen = () => {
  const { id: plasticColorId } = useParams();

  const [name, setName] = useState('');
  const [rarityIndex, setRarityIndex] = useState(1);
  const [imagesArray, setImagesArray] = useState([]);
  
  const { data: plasticColor, error: plasticColorError, isLoading: plasticColorLoading, refetch } = useGetPlasticColorDetailsQuery(plasticColorId);

  const [updatePlasticColor, { isLoading: loadingUpdate }] = useUpdatePlasticColorMutation();
  const [uploadPlasticColorImage, { isLoading: uploadMutationLoading }] = useUploadPlasticColorImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (plasticColor) {
      setName(plasticColor.name || '');
      setRarityIndex(plasticColor.rarityIndex || '');
      setImagesArray(plasticColor.images || []);
    }
  }, [plasticColor]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedPlasticColor = {
      _id: plasticColorId,
      name,
      rarityIndex,
      images: imagesArray,
    };

    try {
      await updatePlasticColor(updatedPlasticColor).unwrap();
      toast.success('Couleur de plastique mise à jour avec succès!');
      refetch();
      navigate('/admin-plastique-colors');
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la couleur de plastique:', err);
      toast.error('Erreur lors de la mise à jour de la couleur de plastique');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('images', e.target.files[0]);

    try {
      const res = await uploadPlasticColorImage(formData).unwrap();
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

  if (plasticColorLoading) {
    return <Loader />;
  }

  if (plasticColorError) {
    return <p className="text-red-500">Erreur: {plasticColorError.message}</p>;
  }

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl">Éditer la couleur de plastique</h1>
        <Button icon={ArrowBigLeft}>
          <Link to="/admin/plastic-colors"> Retour</Link>
        </Button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nom
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
            <label>indice de rareté (1-5) :</label>
            <select value={rarityIndex} onChange={(e) => setRarityIndex(Number(e.target.value))}>
              <option value={0}>Choisir...</option>
              <option value={1}>1</option>
              <option value={1.5}>1.5</option>
              <option value={2}>2</option>
              <option value={2.5}>2.5</option>
              <option value={3}>3</option>
              <option value={3.5}>3.5</option>
              <option value={4}>4</option>
              <option value={4.5}>4.5</option>
              <option value={5}>5</option>
            </select>
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
    </>
  );
};

export default AdminPlasticColorEditScreen;
