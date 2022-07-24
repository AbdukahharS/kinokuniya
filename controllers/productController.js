const mongoose = require('mongoose')
const fs = require('fs')
const Product = require('../models/productModel')
const Author = require('../models/authorModel')
const Category = require('../models/categoryModel')

// create a new product
const createProduct = async (req, res) => {
  const { name, price, desc, author, discount, categories } = req.body
  const { file } = req

  const emptyFields = []

  if (!name) emptyFields.push('name')
  if (!price) emptyFields.push('price')
  if (!desc) emptyFields.push('desc')
  if (!author) emptyFields.push('author')
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'All inputs must be filled in', emptyFields })
  }

  if (!mongoose.Types.ObjectId.isValid(author)) {
    return res.status(404).json({ error: 'No such author' })
  }

  const validateAuthor = await Author.findOne({ _id: author })
  if (!validateAuthor) {
    return res.status(404).json({ error: 'No such author' })
  }

  if (categories) {
    categories.split(',').forEach(async (category) => {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res
          .status(404)
          .json({ error: 'No such category with id ' + category })
      }

      const validateCategory = await Category.findById(category)
      if (!validateCategory) {
        return res.status(404).json('No such category with id ' + category)
      }
    })
  }

  // add to the database
  try {
    const product = await Product.create({
      name,
      img: `/static/${file.filename}`,
      price: Number(price),
      desc,
      author,
      discount: discount ? discount : null,
      categories: categories ? categories.split(',') : null,
    })
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get all products
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 })

  res.status(200).json(products)
}

// get a single product
const getProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' })
  }

  const product = await Product.findById(id)

  if (!product) {
    return res.status(404).json({ error: 'No such product' })
  }

  res.status(200).json(product)
}

// update a product
const updateProduct = async (req, res) => {
  const { id } = req.params
  const { file } = req

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' })
  }

  if (req.body.categories) {
    req.body.categories = req.body.categories.split(',')
  }

  const newProduct = { ...req.body }
  if (file) newProduct.img = `/static/${file.filename}`
  const product = await Product.findOneAndUpdate({ _id: id }, newProduct)

  if (file) fs.unlinkSync(product.img.replace('/static', './uploads'))

  const updatedProduct = await Product.findById(product._id)

  if (!updatedProduct) {
    return res.status(404).json({ error: 'No such product' })
  }

  res.status(200).json(updatedProduct)
}

// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' })
  }

  const product = await Product.findOneAndDelete({ _id: id })

  fs.unlinkSync(product.img.replace('/static', './uploads'))

  if (!product) {
    return res.status(404).json({ error: 'No such product' })
  }

  res.status(200).json(product)
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
