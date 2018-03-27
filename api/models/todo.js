const mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    name: String,
    isDone: Boolean
});

module.exports = mongoose.model('Todo', todoSchema);