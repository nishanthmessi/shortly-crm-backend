const mongoose = require('mongoose')

const dealModel = new mongoose.Schema({
  dealName: {
    type: String,
    required: true,
    minLength: 2
  },
  stage: {
    type: String,
  },
  account: {
    type: String,
  },
  dealValue: {
    type: Number,
  },
}, {timestamps: true})

const Deal = mongoose.model('Deal', dealModel)

module.exports = Deal