const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('Task', TaskSchema)
