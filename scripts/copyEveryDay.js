var schedule = require('node-schedule');
var copy = require('./dateCopy.js');

var j = schedule.scheduleJob('0 10 1 * * *', function () {
    var today = new Date();
    var t = today.getTime() - 1000 * 60 * 60 * 24;
    var yesterday = new Date(t);
    copy(yesterday);
});

console.log(`copy task initialized ${new Date().toString()}`);