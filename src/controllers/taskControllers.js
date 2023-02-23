// Schemas
const TaskSchema = require('../models/task')

exports.getAllTask = async (req, res) => {
  const Task = await TaskSchema.find({ userId: req.params.userId })

  if (Task == null) {
    return res.status(404).send('No Task Found for that user')
  }
  const FilteredTask = Task.filter(t => t.active === true)
  res.json(FilteredTask)
}

exports.addTask = async (req, res) => {
  if (req.body == null) {
    return res.status(400)
  }

  if (req.body.userId) {
    const newTask = {
      title: req.body.title,
      completed: req.body.completed,
      userId: req.body.userId,
      active: true
    }
    TaskSchema(newTask)
      .save()
      .then((data) => {
        res.status(201).send(data._id.toHexString())
      })
      .catch((err) => {
        res.status(500)
        console.log(err)
      })
  }
}

exports.updateStateTask = async (req, res) => {
  const Task = await TaskSchema.findOne({ _id: req.params.id })

  if (Task == null) {
    return res.status(404).send('Task Not Found')
  }

  Task.completed = !Task.completed
  Task.save()
    .then(() => res.status(200).send('Update Task Sucsefully!'))
    .catch((err) => console.log(err))
}

exports.removeTask = async (req, res) => {
  const Task = await TaskSchema.findOne({ _id: req.params.id })

  if (Task == null) {
    return res.status(404).send('Task Not Found')
  }

  Task.active = !Task.active
  Task.save()
    .then(() => res.status(200).send('Update Task Sucsefully!'))
    .catch((err) => res.status(500).send(err))
}

exports.removeCompletedTask = async (req, res) => {
  await TaskSchema.updateMany(
    { _id: { $in: req.body.data } },
    { $set: { active: false } }
  )
    .then(() => res.status(200).send('Update Task Sucsefully!'))
    .catch((err) => res.status(500).send(err))
}
