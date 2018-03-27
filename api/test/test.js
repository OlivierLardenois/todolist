var mongoose = require('mongoose');
var request = require('supertest');
var chai = require('chai');
var Todo = require('../models/todo');

var should = chai.should();
request = request('http://localhost:8080');

describe("Todolist", () => {
    // Open DB connection for test
    before((done) => {
        mongoose.connect("mongodb://localhost/api");
        let db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
			Todo.remove({}, () => done());
        });
    });

    // Close DB connection
    after((done) => {
        mongoose.disconnect();
        done()
    });

	let task = {
		name: "Make a test",
		isDone: false,
		__v: 0
	}

    describe("Get all tasks", () => {
        it("Should get all tasks", (done) => {
            request
                .get("/todo")
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe("Create one tasks", () => {
        it("Should not create a task without name", (done) => {
			request
				.post("/todo")
				.send({"name": ""})
				.end((err, res) => {
					res.status.should.equal(400);
					done();
				});
		});

        it("Should create a task", (done) => {
            request
                .post("/todo")
                .send({"name": task.name})
                .end((err, res) => {
                    res.status.should.equal(201);
                    done();
                });
        });
    });

    describe("Get a task", () => {
        it("Should get a task", (done) => {
            let id = "";
            request.get("/todo").end((err, res) => {
               task._id = res.body[0]._id;
			   request
					.get(`/todo/${task._id}`)
					.end((err, res) => {
						res.status.should.equal(200);
						res.body.should.be.eql(task);
						done();
					});
            });
		});
	});

	describe("Modifie a task", () => {
        it("Should modifie a task", (done) => {
            request
                .put(`/todo/${task._id}`)
                .send(Object.assign(task, {name: "Task updated", isDone: true}))
                .end((err, res) => {
                    res.status.should.equal(200);
                    done();
                });
        });
	});

	describe("Delete a task", () => {
        it("Should delete a task", (done) => {
            request
                .del(`/todo/${task._id}`)
                .end((err, res) => {
                    res.status.should.equal(200);
                    done();
                });
        });
	});
});
