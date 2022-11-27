var express = require('express')
var router = express.Router()

const {
	login,
	register,
	forgotPassword,
	resetPassword,
} = require('../controllers/auth.controller')

router.post('/login', login)
router.post('/register', register)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

module.exports = router