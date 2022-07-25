const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
  product: { type: mongoose.Types.ObjectId, required: true },
  entity: { type: Number, required: true },
})

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    items: [itemSchema],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)
