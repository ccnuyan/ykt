var mongodb = require('mongodb');

var mongoCLient = mongodb.MongoClient;
var url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.APP}?socketTimeoutMS=3600000`;

var getTotalForEveryCourse = require('./tsks/getTotalForEveryCourse.js');
var getCourseLearningUnitsForEveryOne = require('./tsks/getCourseLearningUnitsForEveryOne.js');
var getCourseWeeksForEveryOne = require('./tsks/getCourseWeeksForEveryOne.js');


mongoCLient.connect(url, function (err, db) {
    var promises = [];
    console.log(`*****${new Date().toISOString()} getTotalForEveryCourse Started *****`);
    getTotalForEveryCourse(db.collection('records'), function (err) {
        if (err) {
            console.log('ERROR: getTotalForEveryCourse');
            console.log(err);
            console.log('getTotalForEveryCourse failed');
        } else {
            console.log('getTotalForEveryCourse done');
        }
    });

    console.log(`*****${new Date().toISOString()} getCourseLearningUnitsForEveryOne Started *****`);
    getCourseLearningUnitsForEveryOne(db.collection('records'), function (err) {
        if (err) {
            console.log('ERROR: getCourseLearningUnitsForEveryOne');
            console.log(err);
            console.log('getCourseLearningUnitsForEveryOne failed');
        } else {
            console.log('getCourseLearningUnitsForEveryOne done');
        }
    });

    console.log(`*****${new Date().toISOString()} getCourseWeeksForEveryOne Started *****`);
    getCourseWeeksForEveryOne(db.collection('records'), function (err) {
        if (err) {
            console.log('ERROR: getCourseWeeksForEveryOne');
            console.log(err);
            console.log('getCourseWeeksForEveryOne failed');
        } else {
            console.log('getCourseWeeksForEveryOne done');
        }
    });
});
