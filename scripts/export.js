process.chdir('/Volumes/DATA/mongodb');
var shell = require('shelljs');

var start = 20160901;
var end = 20160928;

var username = process.env.MONGO_USER;
var password = process.env.MONGO_PASS;

var url = process.env.MONGO_HOST;

for(i=start;i<=end;i++){
    shell.exec(`mongoexport  --host ${url} -u ${username} -p ${password}  --db 2016Actions --collection ${i} --out ${i}.json`);
}