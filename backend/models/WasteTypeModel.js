import mongoose from 'mongoose'

const wasteTypeSchema = new mongoose.Schema(
  {
    waste: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
)

const WasteType = mongoose.model('WasteType', wasteTypeSchema)

export default WasteType
