var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Totals = mongoose.model('course_totals');

module.exports = function (req, res, next) {
    if (!req.query || !req.query.courseid || !req.query.appid) {
        throw new Error('not enough params');
    } else {
        Totals.findById(`${req.query.courseid}@${req.query.appid}`, function (err, data) {
            if(!data){
                res.json({
                    CourseId: req.query.courseid,
                    SysAppId: req.query.appid,
                    Users:{},
                    Count:0,
                    Average:0,
                });
            }else{
                res.json(data.value);
            }
        });
    }
};