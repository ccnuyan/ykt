var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path = require('path');

var UserWeeks = mongoose.model('course_user_weeks');
var _ = require('lodash');

var getWeekNumberFrom2000 = function (date) {
    var weekno = ((Math.abs(date - new Date(2000, 0, 1))) / 1000 / 60 / 60 / 24 - 2) / 7;
    return Math.floor(weekno + 1);
};

module.exports = function (req, res, next) {
    if (!req.query || !req.query.courseid || !req.query.appid) {
        throw new Error('not enough params');
    } else {
        var query = {
            'value.CourseId': req.query.courseid,
            'value.SysAppId': req.query.appid
        };
    };
    UserWeeks.find(query, function (err, data) {
        var date = new Date();
        var lastWeekNo = getWeekNumberFrom2000(date) - 1;
        var thisWeekNo = getWeekNumberFrom2000(date);

        if (!data.length) {
            res.json({
                CourseId: req.query.courseid,
                SysAppId: req.query.appid,
                LastWeek: {},
                LastWeekNo: '0',
                ThisWeek: {},
                ThisWeekNo: '0',
            });
        } else {
            var ret = {
                CourseId: req.query.courseid,
                SysAppId: req.query.appid,
                LastWeekNo: lastWeekNo,
                ThisWeekNo: thisWeekNo,
                LastWeek:{},
                ThisWeek:{}
            };

            var lastWeekActiveUsers = _.filter(data, function (rec) {
                return !!rec.value.Weeks[lastWeekNo];
            });

            var thisWeekActiveUsers = _.filter(data, function (rec) {
                return !!rec.value.Weeks[thisWeekNo];
            });

            lastWeekActiveUsers.forEach(function(usr){
                ret.LastWeek[usr.value.UserId] = usr.value.Weeks[lastWeekNo];
            });

            thisWeekActiveUsers.forEach(function(usr){
                ret.ThisWeek[usr.value.UserId] = usr.value.Weeks[thisWeekNo];
            });

            res.json(ret);
        }
    });
};