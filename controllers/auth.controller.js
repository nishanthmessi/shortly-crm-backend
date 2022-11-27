const Users = require('../models/auth.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { nanoid } = require('nanoid')
const sendEmail = require('../utils/sendEmail')

const login = async (req, res) => {
	const { email, password } = req.body
	const user = await Users.findOne({ email: email.toLowerCase() }).lean()

	if (!user) {
		return res.status(404).json({
			error: `'${email.toLowerCase()}' does not exist`,
		})
	}

	const verify = await bcrypt.compare(password, user.password)

	if (!verify) {
		return res.status(401).json({ error: 'Invalid password' })
	}

	try {
		const accessToken = jwt.sign(
			{ _id: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		)

		res.status(200).json({
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
			token: accessToken,
		})
	} catch (error) {
		res.status(500).json({ error: 'Internal Error. Please try again later' })
	}
}

const register = async (req, res) => {
	const { username, email, password } = req.body
	console.log(req.body)
	if (password.length < 6) {
		return res
			.status(400)
			.json({ error: 'Password length must be at least 6 characters' })
	}
	
	const encryptedPassword = await bcrypt.hashSync(password, 10)
	try {	
		const check = await Users.findOne({ email: email.toLowerCase() }).lean()
		if (check) return res.status(400).send('Email already registered')

		const user = await new Users({
			username,
			password: encryptedPassword,
			email: email.toLowerCase(),
		})
		user.save()

		const token = jwt.sign(
			{ _id: user._id, email: user._email },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		)

		const { password, ...rest } = user._doc
		res.status(201).json({ user: { email: user.email, _id: user._id, token: token } })
	} catch (error) {
		res.status(400).send('An error occurred')
	}
}

const forgotPassword = async (req, res) => {
	const { email } = req.body
	const user = await Users.findOne({ email })
	if (!user) {
		res.status(400).json({ error: 'User not found!' })
		return
	}
	
	try {
		const resetToken = user.getResetPasswordToken()
		const resetCode = nanoid(6).toUpperCase()

		user.resetCode = resetCode
		user.save()
		sendResetEmail(email, resetCode, resetToken)
		res.status(202).json({ user })
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error!' })
	}
}

const sendResetEmail = async (email, token, resetToken) => {
	const resetUrl = `http://localhost:3000/reset-password/${resetToken}`

    const message = `
      <h1>You have requested a password reset</h1>
			<p>Your password reset code is: ${token}</p>
      <p>Please click the following link to reset password:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `
		
    try {
      await sendEmail({
				from: process.env.ACCOUNT_EMAIL,
        to: email,
        subject: 'Password Reset Request',
        text: message
      })
    } catch (err) {
      console.error(err)
    }
}

const resetPassword = async (req, res) => {
	const { password, resetCode } = req.body
	const user = await Users.findOne({ resetCode })
	if (!user) {
		res.status(400).json({ error: 'Invalid reset code' })
		return
	}
	const newEncryptedPassword = await bcrypt.hash(password, 12)
	
	try {
		await user.updateOne({ password: newEncryptedPassword })
		res.status(200).json({ message: 'Password updated successfully!' })
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error!' })
	}
}

module.exports = { 
	login, 
  register, 
  forgotPassword, 
  resetPassword 
}