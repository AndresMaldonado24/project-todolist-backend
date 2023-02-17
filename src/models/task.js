const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    userId : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', TaskSchema)