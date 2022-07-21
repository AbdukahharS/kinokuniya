const Product = require('../models/productModel')
const mongoose = require('mongoose')

// create a new product
const createProduct = async (req, res) => {
  const { name, price, desc, discount } = req.body

  const emptyFields = []

  if (!name) emptyFields.push('name')
  if (!price) emptyFields.push('price')
  if (!desc) emptyFields.push('desc')
  if (emptyFields.length > 0)
    return res
      .status(400)
      .json({ error: 'All inputs must be filled in', emptyFields })
  // add to the database
  try {
    const product = await Product.create({ name, price, desc, discount })
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' })
  }

  const workout = await Product.findOneAndUpdate({ _id: id }, { ...req.body })

  console.log(workout)

  if (!workout) {
    return res.status(404).json({ error: 'No such product' })
  }

  res.status(200).json(workout)
}

// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' })
  }

  const product = await Product.findOneAndDelete({ _id: id })

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
