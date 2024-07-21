import mongoose from 'mongoose'

// Fonction pour générer un code-barres aléatoire
const generateBarcode = () => {
  const barcode = Math.floor(
    1000000000000 + Math.random() * 9000000000000,
  ).toString()
  console.log(`Generated Barcode: ${barcode}`) // Log pour débogage
  return barcode
}

// Sous-schéma pour les maintenances et réparations
const MaintenanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ['Maintenance', 'Réparation'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: false,
    },
    technician: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    recurrence: {
      frequency: {
        type: String,
        enum: ['Journalier', 'Hebdomadaire', 'Mensuel', 'Annuel'],
        required: false,
      },
      interval: {
        type: Number,
        default: 1,
        required: false,
      },
      endDate: {
        type: Date,
        required: false,
      },
    },
  },
  { timestamps: true },
)

// Sous-schéma pour les procédures d'utilisation
const UsageProcedureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    steps: [
      {
        stepNumber: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
)

// Schéma principal pour les équipements
const EquipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      enum: ['Machine', 'Moule', 'Outillage', 'Bureautique'],
      required: true,
    },
    type: {
      type: String,
      enum: ['Injection', 'Extrusion', 'Compression', 'Broyeur', 'Autres'],
      required: true,
      default: 'Autres',
    },
    provenanceCountry: {
      type: String,
      required: true,
    },
    totalCoast: {
      type: Number,
      required: true,
    },
    tierId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    barcode: {
      type: String,
      required: false,
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    status: {
      type: String,
      enum: ['Operationel', 'En Maintenance', 'Hors service'],
      default: 'Operationel',
      required: true,
    },
    operatingHours: {
      type: Number,
      required: false,
      default: 0,
    },
    buyDate: {
      type: Date,
      required: false,
    },
    orderDate: {
      type: Date,
      required: false,
    },
    receptionDate: {
      type: Date,
      required: false,
    },
    serviceDate: {
      type: Date,
      required: false,
    },
    maintenances: [MaintenanceSchema],
    usageProcedures: [UsageProcedureSchema],
  },
  { timestamps: true },
)

// Middleware pour générer automatiquement le code-barres avant de sauvegarder
EquipmentSchema.pre('save', function (next) {
  if (!this.barcode) {
    this.barcode = generateBarcode()
    console.log(`Setting Barcode: ${this.barcode}`) // Log pour débogage
  }
  next()
})

// Création du modèle Mongoose
const Equipment = mongoose.model('Equipment', EquipmentSchema)

export default Equipment
