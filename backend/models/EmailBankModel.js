import mongoose from 'mongoose'

const emailBankSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  civility: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  city: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  acceptMailing: {
    type: Boolean,
    required: true,
    default: true,
  },
})

const EmailBank = mongoose.model('EmailBank', emailBankSchema)

export default EmailBank
