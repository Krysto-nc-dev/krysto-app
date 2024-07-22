import asyncHandler from '../middleware/asyncHandler.js'
import Presentation from '../models/presentationModel.js'

// @desc Get all presentations
// @route GET /api/presentations
// @access Public
const getPresentations = asyncHandler(async (req, res) => {
  const presentations = await Presentation.find({})
  res.status(200).json(presentations)
})

// @desc Get a presentation by id
// @route GET /api/presentations/:id
// @access Public
const getPresentationById = asyncHandler(async (req, res) => {
  const presentation = await Presentation.findById(req.params.id)
  if (presentation) {
    res.status(200).json(presentation)
  } else {
    res.status(404)
    throw new Error('Présentation non trouvée.')
  }
})

// @desc Create a new presentation
// @route POST /api/presentations
// @access Private/Admin
const createPresentation = asyncHandler(async (req, res) => {
  const { title, description, images, slides } = req.body

  const presentation = new Presentation({
    title: 'Sample presentation',
    description: 'sample description',
    images: ['/uploads/no-photo.png'],
    slides: [],
    estimatedDuration: 0,
    user: req.user._id,
  })

  const createdPresentation = await presentation.save()
  res.status(201).json(createdPresentation)
})

// @desc Update a presentation
// @route PUT /api/presentations/:id
// @access Private/Admin
const updatePresentation = asyncHandler(async (req, res) => {
  const { title, description, images, slides } = req.body

  const presentation = await Presentation.findById(req.params.id)
  if (presentation) {
    presentation.title = title || presentation.title
    presentation.description = description || presentation.description
    presentation.images = images || presentation.images
    presentation.slides = slides || presentation.slides

    const updatedPresentation = await presentation.save()
    res.json(updatedPresentation)
  } else {
    res.status(404)
    throw new Error('Présentation non trouvée.')
  }
})

// @desc Delete a presentation
// @route DELETE /api/presentations/:id
// @access Private/Admin
const deletePresentation = asyncHandler(async (req, res) => {
  const presentation = await Presentation.findById(req.params.id)
  if (presentation) {
    await Presentation.deleteOne({ _id: presentation._id })
    res
      .status(200)
      .json({ message: 'Présentation supprimée avec succès', presentation })
  } else {
    res.status(404)
    throw new Error('Présentation non trouvée.')
  }
})

// @desc Add a slide to a presentation
// @route POST /api/presentations/:id/slides
// @access Private/Admin
const addSlideToPresentation = asyncHandler(async (req, res) => {
  const presentation = await Presentation.findById(req.params.id)
  if (presentation) {
    const newSlide = req.body
    presentation.slides.push(newSlide)
    await presentation.save()
    res.status(201).json(presentation)
  } else {
    res.status(404)
    throw new Error('Présentation non trouvée.')
  }
})

// @desc Update a slide in a presentation
// @route PUT /api/presentations/:id/slides/:slideId
// @access Private/Admin
const updateSlideInPresentation = asyncHandler(async (req, res) => {
  const presentation = await Presentation.findById(req.params.id)
  if (presentation) {
    const slide = presentation.slides.id(req.params.slideId)
    if (slide) {
      Object.assign(slide, req.body)
      await presentation.save()
      res.json(presentation)
    } else {
      res.status(404)
      throw new Error('Diapositive non trouvée.')
    }
  } else {
    res.status(404)
    throw new Error('Présentation non trouvée.')
  }
})

// @desc Delete a slide from a presentation
// @route DELETE /api/presentations/:id/slides/:slideId
// @access Private/Admin
const deleteSlideFromPresentation = asyncHandler(async (req, res) => {
  const presentation = await Presentation.findById(req.params.id)
  if (presentation) {
    const slide = presentation.slides.id(req.params.slideId)
    if (slide) {
      slide.remove()
      await presentation.save()
      res.status(200).json(presentation)
    } else {
      res.status(404)
      throw new Error('Diapositive non trouvée.')
    }
  } else {
    res.status(404)
    throw new Error('Présentation non trouvée.')
  }
})

export {
  getPresentations,
  getPresentationById,
  createPresentation,
  updatePresentation,
  deletePresentation,
  addSlideToPresentation,
  updateSlideInPresentation,
  deleteSlideFromPresentation,
}
