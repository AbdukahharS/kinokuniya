const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    discount: {
      type: Map,
      of: new Schema({
        percent: Number,
        unit: Number,
        expireDate: {
          type: Date,
          required: true,
        },
      }),
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
