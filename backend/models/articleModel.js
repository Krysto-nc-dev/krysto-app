import mongoose from 'mongoose'

// Schéma des avis (reviews)
const reviewsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }, // Ajoute les champs createdAt et updatedAt automatiquement
)

const listItemSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  { _id: false }, // Évite la création d'un ID pour chaque élément de liste
)

const paragraphSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: {
      type: String,
      required: true,
      minlength: 10,
      trim: true,
    },
    listItems: [listItemSchema], // Liste des éléments
  },
  { _id: false }, // Évite la création d'un ID pour chaque paragraphe
)

// Schéma des articles
const articleSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: { type: String, required: true },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    paragraphs: [paragraphSchema], // Utilisation du schéma des paragraphes
    reviews: [reviewsSchema],
    rating: {
      type: Number,
      default: 0,
      required: true,
    },
    numReviews: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }, // Ajoute les champs createdAt et updatedAt automatiquement
)

// Middleware pour mettre à jour la note moyenne et le nombre d'avis
articleSchema.pre('save', function (next) {
  if (this.isModified('reviews')) {
    // Calculez la nouvelle moyenne des évaluations
    const numReviews = this.reviews.length
    const totalRating = this.reviews.reduce(
      (acc, review) => acc + review.rating,
      0,
    )
    this.rating = numReviews > 0 ? totalRating / numReviews : 0
    this.numReviews = numReviews
  }
  next()
})

const Article = mongoose.model('Article', articleSchema)

export default Article
