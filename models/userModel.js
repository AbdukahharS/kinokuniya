const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
    cart: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
