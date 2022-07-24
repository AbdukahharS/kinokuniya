const Author = require('../models/authorModel')
const Product = require('../models/productModel')
const fs = require('fs')
const mongoose = require('mongoose')

// create a new author
const createAuthor = async (req, res) => {
  const { name, desc } = req.body
  const { file } = req

  const emptyFields = []

  if (!name) emptyFields.push('name')
  if (!file) emptyFields.push('file')
  if (!desc) emptyFields.push('desc')
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'All inputs must be filled in', emptyFields })
  }

  // add to the database
  try {
    const author = await Author.create({
      name,
      desc,
      img: `/static/${file.filename}`,
    })
    res.status(200).json(author)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get all authors
const getAuthors = async (req, res) => {
  const authors = await Author.find({}).sort({ createdAt: -1 })

  res.status(200).json(authors)
}

// get a single author
const getAuthor = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such author' })
  }

  const author = await Author.findById(id)

  if (!author) {
    return res.status(404).json({ error: 'No such author' })
  }

  res.status(200).json(author)
}

// update a product
const updateAuthor = async (req, res) => {
  const { id } = req.params
  const { file } = req

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such author' })
  }

  const newAuthor = { ...req.body }
  if (file) newAuthor.img = `/static/${file.filename}`
  const author = await Author.findOneAndUpdate({ _id: id }, newAuthor)

  if (file) fs.unlinkSync(author.img.replace('/static', './uploads'))

  if (!author) {
    return res.status(404).json({ error: 'No such author' })
  }

  const updatedAuthor = await Author.findById(id)

  res.status(200).json(updatedAuthor)
}

// delete a author
const deleteAuthor = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such author' })
  }

  const products = await Product.find({ author: id })
  if (products.length) {
    const ids = products.map((prod) => {
      return prod._id
    })
    return res.status(400).json({
      error:
        'There are products with this author. To delete this one, you need to change authors of these products: ' +
        ids,
    })
  }

  const author = await Author.findOneAndDelete({ _id: id })

  fs.unlinkSync(author.img.replace('/static', './uploads'))

  if (!author) {
    return res.status(404).json({ error: 'No such author' })
  }

  res.status(200).json(author)
}

module.exports = {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
}
