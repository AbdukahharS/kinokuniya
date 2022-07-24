const mongoose = require('mongoose')

const Schema = mongoose.Schema

const expSchema = new Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
})

module.exports = mongoose.model('Exp', expSchema)
