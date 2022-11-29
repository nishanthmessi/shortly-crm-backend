require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const LeadRoutes = require('./routes/lead.routes')
const DealRoutes = require('./routes/deal.routes')
const ContactRoutes = require('./routes/contact.routes')
const AccountRoutes = require('./routes/account.routes')

const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/v1', require('./routes/index.routes'))

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message })
})

LeadRoutes(app)
DealRoutes(app)
ContactRoutes(app)
AccountRoutes(app)

app.get('/', async (req, res) => {
  res.send('Welcome to Shortly CRM Server')
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