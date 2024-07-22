import mongoose from 'mongoose'

const generateBarcode = () => {
  return Math.floor(1000000000000 + Math.random() * 9000000000000).toString()
}

const collecteSchema = new mongoose.Schema(
  {
    dateCollecte: {
      type: Date,
      required: true,
    },
    PlasticWeightKg: {
      type: Number,
      required: true,
    },
    wasteType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WasteType',
    },
    PlasticType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlasticType',
    },
    PlasticColor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlasticColor',
    },
    collectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

const campagneCollectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères'],
    },
    description: {
      type: String,
      required: true,
    },
    dollibarTierId: {
      type: String,
      required: true,
    },
    collectionType: {
      type: String,
      enum: ['Particulier', 'Professionnel'],
      required: true,
    },
    contract: {
      type: String,
      required: false,
    },
    recurring: {
      type: Boolean,
      required: true,
      default: false,
    },
    wasteType: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WasteType',
        required: true,
      },
    ],
    frequency: {
      type: String,
      enum: ['Hebdomadaire', 'Mensuelle'],
      required: function () {
        return this.recurring
      },
    },
    barcode: {
      type: String,
      required: function () {
        return this.recurring
      },
      unique: true,
      default: function () {
        return this.recurring ? generateBarcode() : undefined
      },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: function () {
        return this.recurring
      },
    },
    status: {
      type: String,
      enum: ['Actif', 'Inactif'],
      required: true,
      default: 'Actif',
    },
    address: {
      type: String,
      required: true,
    },
    collectes: [collecteSchema], // Relation avec le sous-modèle collecteSchema
  },
  { timestamps: true },
)

campagneCollectSchema.pre('save', function (next) {
  if (this.recurring && !this.barcode) {
    this.barcode = generateBarcode()
  }
  next()
})

const CampagneCollect = mongoose.model('CampagneCollect', campagneCollectSchema)

export default CampagneCollect
