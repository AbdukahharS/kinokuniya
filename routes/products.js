const express = require('express')
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')
const upload = require('../middleware/multer')

const router = express.Router()

// POST a new product
router.post('/', upload.single('img'), createProduct)

// GET all products
router.get('/', getProducts)

// GET single product
router.get('/:id', getProduct)

// UPDATE a product
router.patch('/:id', upload.single('img'), updateProduct)

// DELETE a product
router.delete('/:id', deleteProduct)

module.exports = router
