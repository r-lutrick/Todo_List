// Import model
const TodoModel = require('../models/todo.model')

// Create
module.exports.addOne = (req, res) => {
    TodoModel.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err))
}

// Read
module.exports.getAll = (req, res) => {
    TodoModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
}

// Read one
module.exports.getOne = (req, res) => {
    TodoModel.findOne({ _id: req.params.id })
        .then(data => res.json(data))
        .catch(err => res.json(err))
}

// Update
module.exports.updateOne = (req, res) => {
    TodoModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err))
}

// Delete
module.exports.deleteOne = (req, res) => {
    TodoModel.deleteOne({ _id: req.params.id })
        .then(data => res.json(data))
        .catch(err => res.json(err))
}