const express = require('express')
const { createCategory } = require('../controllers/categoryController')

const router = express.Router()

// POST a new category
router.post('/', createCategory)

// GET all products
// router.get('/', getProducts)

// // GET single product
// router.get('/:id', getProduct)

// // UPDATE a product
// router.patch('/:id', updateProduct)

// // DELETE a product
// router.delete('/:id', deleteProduct)

module.exports = router
