const express = require('express')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.post('/signup', authCtrl.signUp)

router.post('/login', authCtrl.logIn)

module.exports = router