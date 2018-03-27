var corsMiddleware = require('restify-cors-middleware');
var mongoose = require('mongoose');
var restify = require("restify");

var server = restify.createServer();

const cors = corsMiddleware({
    origins: ['*'],
});

server.use(restify.plugins.bodyParser())
server.pre(cors.preflight);
server.use(cors.actual);

server.listen(8080, function () {
    let mongoURL = ((process.env.NODE_ENV == "test") ? "mongodb://localhost/api" : "mongodb://localhost/test");
    mongoose.connect(mongoURL);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        require('./routes/todo')(server)

        console.log('%s listening at %s', server.name, server.url);
    });
});