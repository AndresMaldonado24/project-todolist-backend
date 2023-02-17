const express = require('express')
const router = express.Router()

const {aunthenticateToken} = require('../controllers/loginControllers')
const {getTask} = require('../controllers/taskControllers')

/* Get All Task from User */
router.get('/all', aunthenticateToken, getTask )

module.exports = router