const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/toDoRoutes')

/* ################Settings################ */
app.set('port', process.env.PORT || 3000)
/* ################Mongo Connetcion################ */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conected to MongoDB'))
  .catch((err) => console.log(err))
/* ################Middleware################ */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})
app.use(express.json())
app.use(cors())
/* ################Routes################ */
app.use('/auth/', authRoutes)
app.use('/api/', taskRoutes)
/* ################Start server################ */
app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}`)
})
