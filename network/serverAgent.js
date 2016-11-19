var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('morgan');
var assert = require('assert');

var handlers = require('../api/handlers');
var crossDomainHanlder = require('../api/crossDomainHanlder');

var app = express();
var conf = require('../api/config');

app.get('/status', function (req, res) {
    res.status(200).send('ok');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(crossDomainHanlder);
conf.morgan && app.use(logger('dev'));

app.post('/hit',
    require('./hit'));

app.get('/friends/',
    require('./friends').get);

app.post('/friends/',
    require('./friends').post);

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
        server.listen(conf.networkport, function () {
            console.log('Express server listening on port ' + conf.networkport);
            if (callback) callback(app);
        });
    });
};

module.exports = connect;
