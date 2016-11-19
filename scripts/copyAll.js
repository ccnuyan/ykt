var schedule = require('node-schedule');
var copy = require('./dateCopy.js');

var start = new Date(2014,2,31);
var end = new Date();

var date = start;

while(date < end){
    copy(date);
    date.setDate(date.getDate() + 1);
}