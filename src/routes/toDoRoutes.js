const express = require('express')
const router = express.Router()

const {aunthenticateToken} = require('../controllers/loginControllers')
const {getAllTask, addTask} = require('../controllers/taskControllers')

/* Get All Task from User */
router.get('/allTask/:userId', aunthenticateToken, getAllTask )

router.post('/addTask', aunthenticateToken, addTask)

module.exports = router