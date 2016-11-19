process.chdir('/Volumes/DATA/mongodb');
var shell = require('shelljs');

var start = 20160101;
var end = 20160928;

var username = process.env.MONGO_USER;
var password = process.env.MONGO_PASS;

var url = process.env.MONGO_HOST;
var app = process.env.APP;

for (i = start; i <= end; i++) {
    if (i % 100 < 32) {
        shell.exec(`mongoimport --host ${url} -u ${username} -p ${password} --db ${app} --collection records --file ${i}.json`);
    }
}