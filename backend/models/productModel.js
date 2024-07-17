import mongoose from 'mongoose'

const reviewsShema = new mongoose.Schema(
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
    image: { type: String, required: true },
    category: { type: String, required: true },
    reviews: [reviewsShema],
    rating: {
      type: Number,
      min: 1,
      max: 5,
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

const Product = mongoose.model('Product', productSchema)

export default Product
