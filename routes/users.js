const express = require('express')
const {
  validateJWT,
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController')

const router = express.Router()

// Validate token
router.post('/validate', validateJWT)

// Register a new user
router.post('/register', register)

// Login a user
router.post('/login', login)

// GET all users
router.get('/', getUsers)

// GET single user
router.get('/:id', getUser)

// UPDATE an user
router.patch('/:id', updateUser)

// DELETE an user
router.delete('/:id', deleteUser)

module.exports = router
