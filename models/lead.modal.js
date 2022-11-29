const mongoose = require('mongoose')

const leadModel = new mongoose.Schema({
  leadName: {
    type: String,
    required: true,
    minLength: 2
  },
  status: {
    type: String,
  },
  company: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  }
}, {timestamps: true})

const Lead = mongoose.model('Lead', leadModel)

module.exports = Lead