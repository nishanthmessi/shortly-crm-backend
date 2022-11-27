const crypto = require('crypto')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	resetCode: {
		type: String,
	},
})

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

    return resetToken
}

module.exports = mongoose.model("User", userSchema);