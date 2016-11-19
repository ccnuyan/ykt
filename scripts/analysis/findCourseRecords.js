var mongodb = require('mongodb');

var mongoCLient = mongodb.MongoClient;
var url = 'mongodb://';
var assert = require('assert');
var _ = require('lodash');
var records = [];
var fs = require('fs');

mongoCLient.connect(url, function (err, db) {
    console.log(`*****${new Date().toISOString()}*****`);
    if (!err) {
        console.log(`${url} connected`);
    }

    var records = db.collection('hits');

    var query = {CourseId:'74fb82cd-d91e-42cb-8529-c7bb6b9ad7f5'};
    
    records.find({}).toArray(function(err,back){
        var docs = _.filter(back,function(item){
            return item.Source !== item.Target;
        });
        console.log(docs.length);

        fs.writeFile('data.json',JSON.stringify(docs),'utf8',function(){
            db.close();
        });
    });
});