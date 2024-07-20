import asyncHandler from '../middleware/asyncHandler.js'
import Article from '../models/articleModel.js'
import CartScreen from './../../frontend/src/screens/CartScreen'

// @desc Get articles
// @route GET /api/articles
// @access Public
const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({})
  res.status(200).json(articles)
})
// @desc Create a article
// @route POST /api/article
// @access Private/Admin
const createArticle = asyncHandler(async (req, res) => {
  const article = new Article({
    author: req.user._id,
    category: 'Sample Category',
    name: 'Sample name',
    images: ['/uploads/no-photo.png'],
    title: 'Sample title',
    subtitle: 'Sample subtitle',
  })
  const createdArticle = await Article.save()
  res.status(201).json(createdArticle)
})
// @desc UPDATE article
// @route PUT /api/articles/:id
// @access Private/Admin
const updateArticle = asyncHandler(async (req, res) => {
  const { name, category, images, title, subtitle, paragraphs } = req.body
  const article = await Article.findByIdAndUpdate(req.params.id)
  if (article) {
    article.name = name
    article.category = category
    article.images = images
    article.title = title
    article.subtitle = subtitle
    article.paragraphs = paragraphs
    const updatedArticle = await article.save()
    res.json(updatedArticle)
  } else {
    res.status(404)
    throw new Error('Article non trouvé.')
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
    throw new Error('Article non trouvé.')
  }
})

// @desc DELETE article
// @route DEL /api/article/:id
// @access Private/Admin
const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id)
  if (article) {
    await Article.deleteOne({ _id: article._id })
    res
      .status(200)
      .json({ message: 'Article deleted successfully', article: article })
  } else {
    res.status(404)
    throw new Error('Artcle non trouvé.')
  }
})
// @desc Create a new review
// @route POST /api/articles/:id/reviews
// @access Private
const createArticleReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const article = await Article.findByIdAndUpdate(req.params.id)
  if (article) {
    const alreadyReviewed = article.reviews.find(
      (review) => review.user.toString() === req.user._id.toString(),
    )
    if (alreadyReviewed) {
      return res.status(400).json({
        message: 'Vous avez déjà évalué ce article.',
      })
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    article.reviews.push(review)
    article.numReviews = product.reviews.length
    const avgRating =
      article.reviews.reduce((acc, review) => acc + review.rating, 0) /
      article.reviews.length

    await Article.save()
    res.status(201).json({ message: 'Votre avis a été ajouté.', article })
  } else {
    res.status(404)
    throw new Error('Article non trouvé.')
  }
})

export {
  getArticles,
  createArticle,
  updateArticle,
  getArticleById,
  deleteArticle,
  createArticleReview,
}
