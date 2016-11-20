var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('morgan');
var assert = require('assert');

require('./src/controllers/models.js');

var handlers = require('./handlers');
var crossDomainHanlder = require('./crossDomainHanlder');

var app = express();
var conf = require('./config');

app.get('/status', function (req, res) {
    res.status(200).send('ok');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(crossDomainHanlder);
conf.morgan && app.use(logger('dev'));

app.get('/course_totals/',
    require('./src/controllers/course_totals'));

app.get('/course_user_learning_units/',
    require('./src/controllers/course_user_learning_units'));

app.get('/course_user_weeks/',
    require('./src/controllers/course_user_weeks'));

app.get('/course_recent/',
    require('./src/controllers/course_recent'));

//error handlers
app.use(handlers.logErrors);
app.use(handlers.clientErrorHandler);
app.use(handlers.errorHandler);

var mongoose = require('mongoose');
var connect = function (callback) {
    var cstring = conf.url;
    console.log(cstring);
    mongoose.connect(cstring, function (err) {
        if (err) {
            console.log(err.message);
            setTimeout(connect, 10000);
            mongoose.connection.close();
            return;
        }
        var server = http.createServer(app);
        server.listen(conf.port, function () {
            console.log('Express server listening on port ' + conf.port);
            if (callback) callback(app);
        });
    });
};

module.exports = connect;
