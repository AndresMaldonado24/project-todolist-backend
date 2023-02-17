const express = require('express')
const router = express.Router()

const loginControllers = require('../controllers/loginControllers')

/* Create User */
router.post('/register', loginControllers.createUser )

router.post('/login', loginControllers.aunthenticateUser )

module.exports = router