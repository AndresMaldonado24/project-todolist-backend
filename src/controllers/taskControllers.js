//Schemas
const TaskSchema = require('../models/task')

exports.getAllTask = async (req,res) => {

	const Task = await TaskSchema.find({ userId : req.params.userId })

	if( Task == null){
		return res.status(404).send('No Task Found for that user')
	}
	
	res.json(Task)
}

exports.addTask = async (req, res) => {
   if( req.body == null ){
	return res.status(400)
   }

   
   if(req.body.userId){
		const newTask = {
			title: req.body.title,
			completed: req.body.completed,
			userId : req.body.userId,
			active: true
		}
		TaskSchema(newTask)
		.save()
		.then( () => res.status(201).send('Task Saved Sucsefully!'))
		.catch( (err) => res.status(500).send(err))
	}
}
