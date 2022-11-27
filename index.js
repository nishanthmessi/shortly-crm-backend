require('express-async-errors')
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/v1', require('./routes/index.routes'))


app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message })
})

app.get('/', async (req, res) => {
  res.send('Login Page')
})

app.listen(port, async () => {
  console.log(`Server listening on port: ${port} !! `)

  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Not able to connect mongodb', error);
  }
})

module.exports = app