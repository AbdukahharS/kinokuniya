require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// routes
const productRoutes = require('./routes/products')
const authorRoutes = require('./routes/authors')
const categoryRoutes = require('./routes/categories')
const userRoutes = require('./routes/users')

// express app
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('uploads'))
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/products', productRoutes)
app.use('/api/authors', authorRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/users', userRoutes)

// connect to DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
