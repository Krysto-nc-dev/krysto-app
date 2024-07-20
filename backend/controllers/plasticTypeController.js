import asyncHandler from '../middleware/asyncHandler.js'
import PlasticType from '../models/plasticTypeModel.js'

// @desc    Get all plastic types
// @route   GET /api/plasticTypes
// @access  Public
const getPlasticTypes = asyncHandler(async (req, res) => {
  const plasticTypes = await PlasticType.find({})
  res.status(200).json(plasticTypes)
})

// @desc    Create a new plastic type
// @route   POST /api/plasticTypes
// @access  Private/Admin
const createPlasticType = asyncHandler(async (req, res) => {
  const {
    sigleFr,
    sigleEn,
    scientificNameFr,
    scientificNameEn,
    description,
    images,
    flotability,
    injectionTemperature,
    density,
    meltingPoint,
    heatResistance,
    chemicalResistance,
    rigidity,
    toxicity,
    environmentalImpact,
  } = req.body

  const plasticType = new PlasticType({
    sigleFr: 'sample sigle fr',
    sigleEn: 'sample sigle en',
    scientificNameFr: 'sample scientific name fr',
    scientificNameEn: 'sample scientific name en',
    description: 'sample description',
    images: ['/uploads/no-photo.png'],
    flotability: {
      alcohol: false,
      vegetableOil: false,
      water: false,
      glycerine: false,
    },
    injectionTemperature: 'sample injection temperature',
    density: '0',
    meltingPoint: '0',
    heatResistance: 'sample',
    chemicalResistance: 'sample ressistance',
    rigidity: 'sample rigidity',
    toxicity: 'sample toxification',
    environmentalImpact: 'sample impact',
  })

  const createdPlasticType = await plasticType.save()
  res.status(201).json(createdPlasticType)
})

// @desc    Get plastic type by ID
// @route   GET /api/plasticTypes/:id
// @access  Public
const getPlasticTypeById = asyncHandler(async (req, res) => {
  const plasticType = await PlasticType.findById(req.params.id)

  if (plasticType) {
    res.status(200).json(plasticType)
  } else {
    res.status(404)
    throw new Error('Type de plastique non trouvé.')
  }
})

// @desc    Update plastic type
// @route   PUT /api/plasticTypes/:id
// @access  Private/Admin
const updatePlasticType = asyncHandler(async (req, res) => {
  const {
    sigleFr,
    sigleEn,
    scientificNameFr,
    scientificNameEn,
    description,
    images,
    flotability,
    injectionTemperature,
    density,
    meltingPoint,
    heatResistance,
    chemicalResistance,
    rigidity,
    toxicity,
    environmentalImpact,
  } = req.body

  const plasticType = await PlasticType.findById(req.params.id)

  if (plasticType) {
    plasticType.sigleFr = sigleFr || plasticType.sigleFr
    plasticType.sigleEn = sigleEn || plasticType.sigleEn
    plasticType.scientificNameFr =
      scientificNameFr || plasticType.scientificNameFr
    plasticType.scientificNameEn =
      scientificNameEn || plasticType.scientificNameEn
    plasticType.description = description || plasticType.description
    plasticType.images = images || plasticType.images
    plasticType.flotability = flotability || plasticType.flotability
    plasticType.injectionTemperature =
      injectionTemperature || plasticType.injectionTemperature
    plasticType.density = density || plasticType.density
    plasticType.meltingPoint = meltingPoint || plasticType.meltingPoint
    plasticType.heatResistance = heatResistance || plasticType.heatResistance
    plasticType.chemicalResistance =
      chemicalResistance || plasticType.chemicalResistance
    plasticType.rigidity = rigidity || plasticType.rigidity
    plasticType.toxicity = toxicity || plasticType.toxicity
    plasticType.environmentalImpact =
      environmentalImpact || plasticType.environmentalImpact

    const updatedPlasticType = await plasticType.save()
    res.status(200).json(updatedPlasticType)
  } else {
    res.status(404)
    throw new Error('Type de plastique non trouvé.')
  }
})

// @desc    Delete plastic type
// @route   DELETE /api/plasticTypes/:id
// @access  Private/Admin
const deletePlasticType = asyncHandler(async (req, res) => {
  const plasticType = await PlasticType.findById(req.params.id)

  if (plasticType) {
    await plasticType.deleteOne()
    res.status(200).json({ message: 'Type de plastique supprimé avec succès.' })
  } else {
    res.status(404)
    throw new Error('Type de plastique non trouvé.')
  }
})

export {
  getPlasticTypes,
  createPlasticType,
  getPlasticTypeById,
  updatePlasticType,
  deletePlasticType,
}
