const mongoose = require('mongoose')

const accountModel = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
    minLength: 2
  },
  contact: {
    type: String,
  },
  industry: {
    type: String,
  },
  priority: {
    type: String,
  },
}, {timestamps: true})

const Account = mongoose.model('Account', accountModel)

module.exports = Account