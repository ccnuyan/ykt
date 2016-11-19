var mongodb = require('mongodb');

var mongoCLient = mongodb.MongoClient;
var url = 'mongodb://';

mongoCLient.connect(url, function (err, db) {
    console.log(`*****${new Date().toISOString()}*****`);
    if (!err) {
        console.log(`${url} connected`);
    }

    var records = db.collection('records');

    records.count(function(err,back){
        console.log(`records.count(): ${back}`);
    });

    db.close();
});

