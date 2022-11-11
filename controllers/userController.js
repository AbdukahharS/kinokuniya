const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const secretKey = process.env.JWT_SECRET_KEY
const headerKey = process.env.JWT_HEADER_KEY

const genereateJWT = async (id) => {
  const data = {
    id,
    time: Date(),
  }

  const token = jwt.sign(data, secretKey)

  return token
}

const validateJWT = async (token, res) => {
  try {
    const isValidToken = jwt.verify(token, secretKey)
    if (isValidToken) return isValidToken
  } catch (error) {
    return res.status(400).json({ error: error.message + 'vT' })
  }
}

// Register a new user
const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body
  const emptyFields = []

  if (!firstname) emptyFields.push('firstname')
  if (!lastname) emptyFields.push('lastname')
  if (!email) emptyFields.push('email')
  if (!password) emptyFields.push('password')
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'These fields are required: ' + emptyFields })
  }

  // add to database
  try {
    const user = await User.create({
      fullname: `${firstname} ${lastname}`,
      email,
      password,
    })

    const token = await genereateJWT(user._id)

    res.status(200).json({ user, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body

  const emptyFields = []
  if (!email) emptyFields.push('email')
  if (!password) emptyFields.push('password')
  if (emptyFields.length) {
    return res
      .status(400)
      .json({ error: 'Fields below are required: ' + emptyFields })
  }

  const user = await User.findOne({ email, password })

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }

  const token = await genereateJWT(user._id)

  res.status(200).json({ token })
}

// GET all users
const getUsers = async (req, res) => {
  const token = await req.header(headerKey)

  if (!token) {
    return res.status(403).json({ error: 'You need to sign in first' })
  }

  const decodedToken = await validateJWT(token, res)

  const user = await User.findOne({ _id: decodedToken.id })

  if (!user) return res.status(404).json({ error: 'No such user' })
  if (user.role !== 'admin')
    return res
      .status(400)
      .json({ error: 'You have no permission to this data' })

  const users = await User.find({})

  res.status(200).json({ users })
}

// GET a single user
const getUser = async (req, res) => {
  const { id } = req.params
  const token = await req.header(headerKey)

  if (!token) {
    return res.status(403).json({ error: 'You need to sign in first' })
  }

  const decodedToken = await validateJWT(token, res)

  const userByToken = await User.findOne({ _id: decodedToken.id })
  const userById = await User.findOne({ _id: id })

  if (!userByToken)
    return res
      .status(404)
      .json({ error: 'No such user registered with this token' })
  if (!userById)
    return res.status(404).json({ error: 'No such user with this id' })
  if (userByToken._id != id && userByToken.role !== 'admin')
    return res
      .status(400)
      .json({ error: 'You have no permission to this data' })

  res.status(200).json({ user: userById })
}

// UPDATE an user
const updateUser = async (req, res) => {
  const { id } = req.params
  const token = await req.header(headerKey)

  if (!token) {
    return res.status(403).json({ error: 'You need to sign in first' })
  }

  const decodedToken = await validateJWT(token, res)

  const userByToken = await User.findOne({ _id: decodedToken.id })
  const userById = await User.findOne({ _id: id })

  if (!userByToken)
    return res
      .status(404)
      .json({ error: 'No such user registered with this token' })
  if (!userById)
    return res.status(404).json({ error: 'No such user with this id' })
  if (userByToken._id != id && userByToken.role !== 'admin')
    return res
      .status(400)
      .json({ error: 'You have no permission to this data' })

  const user = await User.findOneAndUpdate({ _id: id }, req.body)

  const updatedUser = await User.findOne({ _id: id })

  res.status(200).json(updatedUser)
}

// DELETE an user
const deleteUser = async (req, res) => {
  const { id } = req.params
  const token = await req.header(headerKey)

  if (!token) {
    return res.status(403).json({ error: 'You need to sign in first' })
  }

  const decodedToken = await validateJWT(token, res)

  const userByToken = await User.findOne({ _id: decodedToken.id })
  const userById = await User.findOne({ _id: id })

  if (!userByToken)
    return res
      .status(404)
      .json({ error: 'No such user registered with this token' })
  if (!userById)
    return res.status(404).json({ error: 'No such user with this id' })
  if (userByToken._id != id && userByToken.role !== 'admin')
    return res
      .status(400)
      .json({ error: 'You have no permission to this data' })

  try {
    const user = await User.deleteOne({ _id: id })

    return res.status(200).json({ user })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

module.exports = {
  validateJWT,
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
}
