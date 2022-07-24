const express = require('express')
const {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/authorController')
const upload = require('../middleware/multer')

const router = express.Router()

// POST a new author
router.post('/', upload.single('img'), createAuthor)

// GET all authors
router.get('/', getAuthors)

// GET single author
router.get('/:id', getAuthor)

// UPDATE an author
router.patch('/:id', upload.single('img'), updateAuthor)

// DELETE an author
router.delete('/:id', deleteAuthor)

module.exports = router
