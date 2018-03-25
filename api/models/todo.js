const mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    name: String,
    isDone: Boolean
});

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;