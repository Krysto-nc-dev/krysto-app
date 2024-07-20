import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useGetPlasticTypeDetailsQuery,
  useUpdatePlasticTypeMutation,
  useUploadPlasticTypeImageMutation,
} from '../../slices/plasticTypesSlice'
import Loader from '../FeedbackScreens/Loader'
import Button from '../../components/shared/Button'
import { ArrowBigLeft, Loader2, Send } from 'lucide-react'
import { toast } from 'react-toastify'

const AdminPlasticTypeEditScreen = () => {
  const { id: plasticTypeId } = useParams()

  const [sigleFr, setSigleFr] = useState('')
  const [sigleEn, setSigleEn] = useState('')
  const [scientificNameFr, setScientificNameFr] = useState('')
  const [scientificNameEn, setScientificNameEn] = useState('')
  const [description, setDescription] = useState('')
  const [imagesArray, setImagesArray] = useState([])
  const [flotability, setFlotability] = useState({
    alcohol: false,
    vegetableOil: false,
    water: false,
    glycerine: false,
  })
  const [injectionTemperature, setInjectionTemperature] = useState('')
  const [density, setDensity] = useState(0)
  const [meltingPoint, setMeltingPoint] = useState(0)
  const [heatResistance, setHeatResistance] = useState('')
  const [chemicalResistance, setChemicalResistance] = useState('')
  const [rigidity, setRigidity] = useState('')
  const [toxicity, setToxicity] = useState('')
  const [environmentalImpact, setEnvironmentalImpact] = useState('')

  const {
    data: plasticType,
    error: plasticTypeError,
    isLoading: plasticTypeLoading,
    refetch
  } = useGetPlasticTypeDetailsQuery(plasticTypeId)

  const [
    updatePlasticType,
    { isLoading: loadingUpdate },
  ] = useUpdatePlasticTypeMutation()

  const [
    uploadPlasticTypeImage,
    { isLoading: uploadMutationLoading },
  ] = useUploadPlasticTypeImageMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (plasticType) {
      setSigleFr(plasticType?.sigleFr || '')
      setSigleEn(plasticType?.sigleEn || '')
      setScientificNameFr(plasticType?.scientificNameFr || '')
      setScientificNameEn(plasticType?.scientificNameEn || '')
      setDescription(plasticType?.description || '')
      setImagesArray(plasticType?.images || [])
      setFlotability(plasticType?.flotability || {
        alcohol: false,
        vegetableOil: false,
        water: false,
        glycerine: false,
      })
      setInjectionTemperature(plasticType?.injectionTemperature || '')
      setDensity(plasticType?.density || 0)
      setMeltingPoint(plasticType?.meltingPoint || 0)
      setHeatResistance(plasticType?.heatResistance || '')
      setChemicalResistance(plasticType?.chemicalResistance || '')
      setRigidity(plasticType?.rigidity || '')
      setToxicity(plasticType?.toxicity || '')
      setEnvironmentalImpact(plasticType?.environmentalImpact || '')
    }
  }, [plasticType])

  const submitHandler = async (e) => {
    e.preventDefault()

    const updatedPlasticType = {
      _id: plasticTypeId,
      sigleFr,
      sigleEn,
      scientificNameFr,
      scientificNameEn,
      description,
      images: imagesArray,
      flotability,
      injectionTemperature,
      density,
      meltingPoint,
      heatResistance,
      chemicalResistance,
      rigidity,
      toxicity,
      environmentalImpact,
    }

    try {
      await updatePlasticType(updatedPlasticType).unwrap()
      toast.success('Type de plastique mis à jour avec succès!')
      refetch()
      navigate('/admin-plastiques')
    } catch (err) {
      console.error('Erreur lors de la mise à jour du type de plastique:', err)
      toast.error('Erreur lors de la mise à jour du type de plastique')
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('images', e.target.files[0])

    try {
      const res = await uploadPlasticTypeImage(formData).unwrap()
      setImagesArray((prevImages) => [...prevImages, ...res.images])
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const removeImage = (index) => {
    const newImagesArray = [...imagesArray]
    newImagesArray.splice(index, 1)
    setImagesArray(newImagesArray)
  }

  if (plasticTypeLoading) {
    return <Loader />
  }

  if (plasticTypeError) {
    return <p className="text-red-500">Erreur: {plasticTypeError.message}</p>
  }

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl">Éditer le type de plastique</h1>
        <Button icon={ArrowBigLeft}>
          <Link to="/admin/plastic-types"> Retour</Link>
        </Button>
      </div>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sigle (Français)
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={sigleFr}
            onChange={(e) => setSigleFr(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sigle (Anglais)
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={sigleEn}
            onChange={(e) => setSigleEn(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nom scientifique (Français)
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={scientificNameFr}
            onChange={(e) => setScientificNameFr(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nom scientifique (Anglais)
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={scientificNameEn}
            onChange={(e) => setScientificNameEn(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
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
            onChange={uploadFileHandler}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Flottabilité
          </label>
          <div className="space-y-2">
            {Object.keys(flotability).map((key) => (
              <label key={key} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={flotability[key]}
                  onChange={() =>
                    setFlotability((prev) => ({
                      ...prev,
                      [key]: !prev[key]
                    }))
                  }
                />
                <span className="ml-2 capitalize">{key}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Température d'injection
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={injectionTemperature}
            onChange={(e) => setInjectionTemperature(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Densité
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={density}
            onChange={(e) => setDensity(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Point de fusion
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={meltingPoint}
            onChange={(e) => setMeltingPoint(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Résistance à la chaleur
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={heatResistance}
            onChange={(e) => setHeatResistance(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Résistance chimique
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={chemicalResistance}
            onChange={(e) => setChemicalResistance(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rigidité
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={rigidity}
            onChange={(e) => setRigidity(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Toxicité
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={toxicity}
            onChange={(e) => setToxicity(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Impact environnemental
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={environmentalImpact}
            onChange={(e) => setEnvironmentalImpact(e.target.value)}
          />
        </div>

        <Button type="submit" icon={Send}>
          {loadingUpdate ? <Loader2 /> : 'Valider'}
        </Button>
      </form>
    </>
  )
}

export default AdminPlasticTypeEditScreen
