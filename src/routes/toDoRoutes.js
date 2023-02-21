const express = require('express')
const router = express.Router()

const {aunthenticateToken} = require('../controllers/loginControllers')
const {getAllTask, addTask, updateStateTask, removeTask, removeCompletedTask} = require('../controllers/taskControllers')

/* GET Request */
router.get('/allTask/:userId', aunthenticateToken, getAllTask)

/* POST Request */
router.post('/addTask', aunthenticateToken, addTask)

/* PUT Request */
router.put('/updateStateTask/:id', aunthenticateToken, updateStateTask)

router.put('/removeTask/:id', aunthenticateToken, removeTask)

router.put('/removeCompletedTask', aunthenticateToken, removeCompletedTask)

module.exports = router