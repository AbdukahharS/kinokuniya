const express = require('express')
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')

const router = express.Router()

// POST a new product
router.post('/', createProduct)

// GET all products
router.get('/', getProducts)

// GET single product
router.get('/:id', getProduct)

// UPDATE a product
router.patch('/:id', updateProduct)

// DELETE a product
router.delete('/:id', deleteProduct)

module.exports = router
