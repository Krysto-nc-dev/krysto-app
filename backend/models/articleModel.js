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

const articleSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    paragraphs: [
      {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
        trim: true,
      },
    ],
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
  },
  { timestamps: true },
)

const Article = mongoose.model('Article', articleSchema)

export default Article
