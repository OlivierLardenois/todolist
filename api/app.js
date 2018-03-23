var restify = require("restify");
var mongoose = require('mongoose')
const corsMiddleware = require('restify-cors-middleware');

var server = restify.createServer();

const cors = corsMiddleware({
    origins: ['*'],
});

server.use(restify.plugins.bodyParser())
server.pre(cors.preflight);
server.use(cors.actual);

server.listen(8080, function () {
    mongoose.connect("mongodb://localhost/api");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        require('./routes/todo')(server)

        console.log('%s listening at %s', server.name, server.url);
    });
});