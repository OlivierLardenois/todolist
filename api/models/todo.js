const mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    name: String
});

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;