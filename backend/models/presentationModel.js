import mongoose from 'mongoose'

// Schema pour les questions
const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: [true, 'Le texte de la question est requis'],
    },
    type: {
      type: String,
      enum: ['qcm', 'open'],
      required: [true, 'Le type de question est requis'],
    },
    options: {
      type: [String],
      validate: {
        validator: function (v) {
          return this.type === 'qcm' ? v.length > 0 : true
        },
        message: 'Les options sont requises pour les questions QCM',
      },
    },
    correctAnswer: {
      type: String,
      required: [true, 'La réponse correcte est requise'],
    },
  },
  { timestamps: true },
)

// Schema pour les diapositives (slides)
const slideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères'],
    },
    subtitle: {
      type: String,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    paragraphs: {
      type: [String],
    },
    template: {
      type: String,
      enum: ['template1', 'template2', 'template3', 'quiz'],
      default: 'template1',
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: function (v) {
          return this.template === 'quiz' ? v.length > 0 : true
        },
        message:
          'Les questions sont requises pour les diapositives de type quiz',
      },
    },
  },
  { timestamps: true },
)

// Schema pour la présentation
const presentationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre est requis'],
      trim: true,
      maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères'],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: [true, 'La description est requise'],
    },
    estimatedDuration: {
      type: Number,
      required: [true, 'La durée estimée est requise'],
    },

    slides: [slideSchema],
  },
  { timestamps: true },
)

const Presentation = mongoose.model('Presentation', presentationSchema)

export default Presentation
