import mongoose from 'mongoose'

const recyclableProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    category: {
      type: String,
      required: [true, 'Vous devez ajouter un catégorie'],
      default: 'Alimentaires',
      enum: ['Alimentaires', 'beauté', 'Entretient', 'Autres'],
    },
    brand: {
      type: String,
      required: [true, 'Please add brand'],
      unique: true,
      trim: true,
      maxlength: [50, 'Brand cannot be more than 50 characters'],
    },
    plastic_types: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Plastic_type',
      },
    ],
    colors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlasticColor', // Référence au modèle des couleurs de plastique
      },
    ],
    weightGr: {
      type: Number,
      required: true,
    },
    barCode: {
      type: String,
      required: [true, 'Please add barcode'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please add description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    recyclingNote: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

const RecyclableProduct = mongoose.model(
  'RecyclableProduct',
  recyclableProductSchema,
)

export default RecyclableProduct
