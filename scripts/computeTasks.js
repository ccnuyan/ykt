var mongodb = require('mongodb');

var mongoCLient = mongodb.MongoClient;
// https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
var url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.APP}?socketTimeoutMS=3600000`;

var getTotalForEveryCourse = require('./tsks/getTotalForEveryCourse.js');
var getCourseLearningUnitsForEveryOne = require('./tsks/getCourseLearningUnitsForEveryOne.js');
var getCourseWeeksForEveryOne = require('./tsks/getCourseWeeksForEveryOne.js');

var schedule = require('node-schedule');

var j1 = schedule.scheduleJob('0 0 2 * * *', function () {
    console.log(`*****${new Date().toISOString()} getTotalForEveryCourse Started *****`);
    mongoCLient.connect(url, function (err, db) {
        getTotalForEveryCourse(db.collection('records'), function (err) {
            if (err) {
                console.log('ERROR: getTotalForEveryCourse');
                console.log(err);
                console.log(`*****${new Date().toISOString()} getTotalForEveryCourse failed`);
            } else {
                console.log(`*****${new Date().toISOString()} getTotalForEveryCourse done`);
            }
        });
    });
});

var j2 = schedule.scheduleJob('0 0 3 * * *', function () {
    console.log(`*****${new Date().toISOString()} getCourseLearningUnitsForEveryOne Started *****`);
    mongoCLient.connect(url, function (err, db) {
        getCourseLearningUnitsForEveryOne(db.collection('records'), function (err) {
            if (err) {
                console.log('ERROR: getCourseLearningUnitsForEveryOne');
                console.log(err);
                console.log(`*****${new Date().toISOString()} getCourseLearningUnitsForEveryOne failed'`);
            } else {
                console.log(`*****${new Date().toISOString()} getCourseLearningUnitsForEveryOne done`);
            }
        });
    });
});

var j3 = schedule.scheduleJob('0 0 4 * * *', function () {
    console.log(`*****${new Date().toISOString()} getCourseWeeksForEveryOne Started *****`);
    mongoCLient.connect(url, function (err, db) {
        getCourseWeeksForEveryOne(db.collection('records'), function (err) {
            if (err) {
                console.log('ERROR: getCourseWeeksForEveryOne');
                console.log(err);
                console.log(`*****${new Date().toISOString()} getCourseWeeksForEveryOne failed`);
            } else {
                console.log(`*****${new Date().toISOString()} getCourseWeeksForEveryOne done`);
            }
        });
    });
});

console.log('mapreduce tasks initialized!');
