const express = require('express')
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController')

const router = express.Router()

// POST a new category
router.post('/', createCategory)

// GET all categories
router.get('/', getCategories)

// GET single category
router.get('/:id', getCategory)

// UPDATE a category
router.patch('/:id', updateCategory)

// DELETE a category
router.delete('/:id', deleteCategory)

module.exports = router
