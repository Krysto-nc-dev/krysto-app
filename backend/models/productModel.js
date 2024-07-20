import mongoose from 'mongoose'

const reviewsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

const productSchema = new mongoose.Schema(
  {
    dolibarrId: { type: String, required: true, default: '0' },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    quantity: { type: Number, required: true },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: { type: String, required: true },
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
    countInStock: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true },
)

// Middleware pour mettre à jour la note moyenne et le nombre d'avis
productSchema.pre('save', function (next) {
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

const Product = mongoose.model('Product', productSchema)

export default Product
