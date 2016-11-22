var schedule = require('node-schedule');
var getSource = require('./getSource.js');
var shell = require('shelljs');

var cwd = '/data/mongodb';

var sourceUrl = process.env.MONGO_SOURCE_HOST;
var sourceusername = process.env.MONGO_SOURCE_USER;
var sourcepassword = process.env.MONGO_SOURCE_PASS;

var targetUrl = process.env.MONGO_HOST;
var username = process.env.MONGO_USER;
var password = process.env.MONGO_PASS;

module.exports = function (date) {

    var sourcedb = getSource.getSourceDb(date);
    var sourceCollection = getSource.getSourceCollection(date);

    console.log('Exporting');
    console.log(`${sourcedb}Actions:${sourceCollection}`);
    shell.exec(`mongoexport --host ${sourceUrl} -u ${sourceusername} -p ${sourcepassword}  --db ${sourcedb}Actions --collection ${sourceCollection} --out ${cwd}/${sourceCollection}.json`);

    console.log('Importing');
    shell.exec(`mongoimport --host ${targetUrl} -u ${username} -p ${password}  --db ${process.env.APP} --collection records --file ${cwd}/${sourceCollection}.json`);

    console.log(`*****${new Date().toISOString()} Done ${sourceCollection}`);
};