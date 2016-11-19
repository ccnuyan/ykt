var schedule = require('node-schedule');
var copy = require('./dateCopy.js');

var j = schedule.scheduleJob('0 0 1 * * *', function () {
    copy(new Date());
});

console.log(`copy task initialized ${new Date().toString()}`);