import asyncHandler from '../middleware/asyncHandler.js'
import Article from '../models/articleModel.js' // Assurez-vous que le modèle correct est importé

// @desc Get articles
// @route GET /api/articles
// @access Public
const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({})
  res.status(200).json(articles)
})

// @desc Create an article
// @route POST /api/articles
// @access Private/Admin
const createArticle = asyncHandler(async (req, res) => {
  const article = new Article({
    author: req.user._id,
    category: 'Sample category',
    images: ['/uploads/no-photo.png'],
    title: 'Sample title',
    subtitle: 'Sample subtitle',
    paragraphs: [], // Initialisation avec un tableau vide
    rating: 0,
    numReviews: 0,
  })
  const createdArticle = await article.save()
  res.status(201).json(createdArticle)
})

// @desc UPDATE an article
// @route PUT /api/articles/:id
// @access Private/Admin
const updateArticle = asyncHandler(async (req, res) => {
  const { title, subtitle, category, images, paragraphs } = req.body
  const article = await Article.findById(req.params.id)

  if (article) {
    article.title = title || article.title
    article.subtitle = subtitle || article.subtitle
    article.category = category || article.category
    article.images = images || article.images
    article.paragraphs = paragraphs || article.paragraphs
    const updatedArticle = await article.save()
    res.json(updatedArticle)
  } else {
    res.status(404)
    throw new Error('Article not found.')
  }
})

// @desc Get article by id
// @route GET /api/articles/:id
// @access Public
const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id)

  if (article) {
    res.status(200).json(article)
  } else {
    res.status(404)
    throw new Error('Article not found.')
  }
})

// @desc DELETE an article
// @route DELETE /api/articles/:id
// @access Private/Admin
const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id)

  if (article) {
    await Article.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Article deleted successfully', article })
  } else {
    res.status(404)
    throw new Error('Article not found.')
  }
})

// @desc Add a paragraph to an article
// @route POST /api/articles/:id/paragraphs
// @access Private/Admin
const addArticleParagraph = asyncHandler(async (req, res) => {
  const { title, content } = req.body
  const article = await Article.findById(req.params.id)

  if (article) {
    const newParagraph = { title, content }
    article.paragraphs.push(newParagraph)
    await article.save()
    res.status(201).json({ message: 'Paragraph added successfully.', article })
  } else {
    res.status(404)
    throw new Error('Article not found.')
  }
})

// @desc Create a new review
// @route POST /api/articles/:id/reviews
// @access Private
const createArticleReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const article = await Article.findById(req.params.id)

  if (article) {
    const alreadyReviewed = article.reviews.find(
      (review) => review.user.toString() === req.user._id.toString(),
    )

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: 'You have already reviewed this article.' })
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    article.reviews.push(review)
    article.numReviews = article.reviews.length
    article.rating =
      article.reviews.reduce((acc, review) => acc + review.rating, 0) /
      article.reviews.length

    await article.save()
    res.status(201).json({ message: 'Review added successfully.', article })
  } else {
    res.status(404)
    throw new Error('Article not found.')
  }
})

export {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  addArticleParagraph,
  createArticleReview,
}
