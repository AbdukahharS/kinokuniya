const Category = require('../models/categoryModel')
const Product = require('../models/productModel')
const mongoose = require('mongoose')

// create a new category
const createCategory = async (req, res) => {
  const { title } = req.body

  if (!title) return res.status(400).json({ error: 'Title is required' })

  // add to the database
  try {
    const category = await Category.create({
      title,
    })
    res.status(200).json(category)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get all categories
const getCategories = async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 })

  res.status(200).json(categories)
}

// get a single category
const getCategory = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such category' })
  }

  const category = await Category.findById(id)

  if (!category) {
    return res.status(404).json({ error: 'No such category' })
  }

  res.status(200).json(category)
}

// update a category
const updateCategory = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' })
  }

  const category = await Category.findOneAndUpdate({ _id: id }, { ...req.body })

  if (!category) {
    return res.status(404).json({ error: 'No such category' })
  }

  const updatedCategory = await Category.findById(id)
  res.status(200).json(updatedCategory)
}

// delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' })
  }

  const category = await Category.findOneAndDelete({ _id: id })

  if (!category) {
    return res.status(404).json({ error: 'No such category' })
  }

  const products = await Product.find({})

  products.forEach(async (product) => {
    const ind = product.categories.indexOf(id)
    if (ind !== -1) {
      const newCategories = product.categories.splice(ind, 1)
      const upProduct = await Product.findOneAndUpdate(
        { _id: product.id },
        { ...product, categories: newCategories }
      )
    }
  })

  res.status(200).json(category)
}

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
}
