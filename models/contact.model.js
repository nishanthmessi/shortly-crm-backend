const mongoose = require('mongoose')

const contactModel = new mongoose.Schema({
  contactName: {
    type: String,
    required: true,
    minLength: 2
  },
  company: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
}, {timestamps: true})

const Contact = mongoose.model('Contact', contactModel)

module.exports = Contact