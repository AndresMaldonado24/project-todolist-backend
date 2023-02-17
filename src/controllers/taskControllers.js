//Schemas
const TaskSchema = require('../models/task')

exports.getTask = async (req,res) => {

    const Task = await TaskSchema.find({ userId : req.body.userId })

    if( Task !== null){
		return res.status(409).send('Email alrady in use')
	}
    
    res.json(Task)
}