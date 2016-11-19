var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserLearningUnits = mongoose.model('course_user_learning_units');

module.exports = function (req, res, next) {
    if (!req.query || !req.query.courseid || !req.query.userid || !req.query.appid) {
        throw new Error('not enough params');
    } else {
        UserLearningUnits.findById(`${req.query.courseid}@${req.query.userid}@${req.query.appid}`, function (err, data) {
            if (!data) {
                res.json({
                    CourseId: req.query.courseid,
                    UserId: req.query.userid,
                    SysAppId: req.query.appid,
                    LearningUnits:{},
                    Total:0,
                });
            } else {
                res.json(data.value);
            }
        });
    }
};