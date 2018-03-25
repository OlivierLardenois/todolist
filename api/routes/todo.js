var Todo = require('../models/todo')

module.exports = function(server) {
    // Get all tasks
    server.get('/todo', (req, res, next) => {
        Todo.find({}, (err, todo) => {
            if (err) {
                console.error(err);
                res.send(400);
                return;
            }
            console.log("Todo :", todo);
            res.send(200, todo);
        });
        next()
    });

    // Get one task
    server.get('/todo/:id', (req, res, next) => {
        Todo.findOne({ _id: req.params.id}, (err, todo) => {
            if (err) {
                console.error(err);
                res.send(400);
                return;
            }
            console.log("Todo :", todo);
            res.send(200, todo);
        });
        next()
    });

    // Create one task
    server.post('/todo', (req, res, next) => {
        var task = new Todo(req.body)
        task.isDone = false;
        task.save((err, task) => {
            if (err) {
                console.error(err);
                res.send(400);
                return;
            }
            console.log("Task created :", task);
            res.send(201);
        })
        next()
    });

    // Complete one task
    server.post('/todo/done/:id', (req, res, next) => {
        Todo.update({ _id: req.params.id }, { isDone: true }, err => {
            if (err) {
                console.error(err);
                res.send(400);
                return;
            }
            console.log("Task done");
            res.send(200);
        });
        next()
    });

    // Modifie one task
    server.put('/todo/:id', (req, res, next) => {
        Todo.update({ _id: req.params.id }, req.body, err => {
            if (err) {
                console.error(err);
                res.send(400);
                return;
            }
            console.log("Task updated");
            res.send(200);
        });
        next()
    });
    
    // Delete one task
    server.del('/todo/:id', (req, res, next) => {
        Todo.remove({ _id: req.params.id }, (err) => {
            if (err) {
                console.error(err);
                res.send(400);
                return;
            }
            console.log("Task deleted");
            res.send(200);
        });
        next()
    });
};
