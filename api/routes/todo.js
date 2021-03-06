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
            res.send(200, todo);
        });
        next();
    });

    // Get one task
    server.get('/todo/:id', (req, res, next) => {
        Todo.findOne({ _id: req.params.id}, (err, todo) => {
            if (err) {
                console.error(err);
                res.send(400);
                return;
            }
            res.send(200, todo);
        });
        next();
    });

    // Create one task
    server.post('/todo', (req, res, next) => {
        if (!req.body.name) {
            res.send(400);
            return next();
        }
        var task = new Todo(req.body)
        task.isDone = false;
        task.save((err, task) => {
            if (err) {
                console.error(err);
                res.send(400);
                return;
            }
            res.send(201);
        })
        next();
    });

    // Modifie one task
    server.put('/todo/:id', (req, res, next) => {
        Todo.update({ _id: req.params.id }, req.body, err => {
            if (err) {
                console.error(err);
                res.send(400);
                return;
            }
            res.send(200);
        });
        next();
    });
    
    // Delete one task
    server.del('/todo/:id', (req, res, next) => {
        Todo.remove({ _id: req.params.id }, (err) => {
            if (err) {
                console.error(err);
                res.send(400);
                return;
            }
            res.send(200);
        });
        next();
    });
};
