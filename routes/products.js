const express = require('express')
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
} = require('../controllers/productController')

const router = express.Router()

// POST a new product
router.post('/', createProduct)

// GET all products
router.get('/', getProducts)

// GET single product
router.get('/:id', getProduct)

// DELETE a product
router.delete('/:id', deleteProduct)

module.exports = router
