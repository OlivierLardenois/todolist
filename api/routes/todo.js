var Todo = require('../models/todo')

module.exports = function(server) {
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

    server.post('/todo', (req, res, next) => {
        console.log("ICI")
        var task = new Todo(req.body)
        task.save((err, task) => {
            if (err) {
                console.error(err);
                res.send(400);
                return;
            }
            console.log("Task saved :", task);
            res.send(201);
        })
        next()
    });

    server.del('/todo/:id', (req, res, next) => {
        Todo.remove({ _id: req.params.id }, (err) => {
            if (err) {
                console.error(err);
                res.send(400);
                return;
            }
            console.log("Task removed");
            res.send(200);
        });
        next()
    });

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
};
