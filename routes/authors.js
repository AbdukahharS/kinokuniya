const express = require('express')
const {
  createAuthor,
  //   getProducts,
  //   getProduct,
  //   updateProduct,
  //   deleteProduct,
} = require('../controllers/authorController')

const router = express.Router()

// POST a new author
router.post('/', createAuthor)

// GET all products
// router.get('/', getProducts)

// // GET single product
// router.get('/:id', getProduct)

// // UPDATE a product
// router.patch('/:id', updateProduct)

// // DELETE a product
// router.delete('/:id', deleteProduct)

module.exports = router
