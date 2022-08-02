const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
  try {
    const token = jwt.verify(token, secretKey)
    if (token) return token
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = validateToken
