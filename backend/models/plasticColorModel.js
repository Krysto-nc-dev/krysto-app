import mongoose from 'mongoose'

const plasticColorSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  rarityIndex: { type: Number, min: 1, max: 5, required: true, default: 0 },
})

const PlasticColor = mongoose.model('PlasticColor', plasticColorSchema)

export default PlasticColor
