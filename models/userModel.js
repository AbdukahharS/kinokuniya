const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
  product: { type: mongoose.Types.ObjectId, required: true },
  entity: { type: Number, required: true },
})

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    cart: {
      type: [itemSchema],
      default: [],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
