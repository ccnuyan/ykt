//Runs every week
//For Trends Query.
module.exports = function (rcds, callback) {
    var mapFunc = function () {
        if (this.EventContext && this.EventContext.CourseId && this.UserId && this.SysAppId && this.EventParameter) {
            var key = this.EventContext.CourseId + '@' + this.UserId + '@' + this.SysAppId;
            var value = {
                Weeks: {},
            };

            if (!this.__proto__.getWeekNumberFrom2000) {
                this.__proto__.getWeekNumberFrom2000 = function (date) {
                    var weekno = ((Math.abs(date - new Date(2000, 0, 1))) / 1000 / 60 / 60 / 24 - 2) / 7;
                    return Math.floor(weekno + 1);
                };
            }

            var weekno = this.getWeekNumberFrom2000(this.EventTime);

            value.Weeks[weekno] = this.EventParameter.Total;
            emit(key, value);
        }
    };

    var reduceFunc = function (key, values) {
        var reducedObject = { CourseId: null, SysAppId: null, UserId: null, Weeks: {} };

        values.forEach(function (value) {
            Object.keys(value.Weeks).forEach(function (wid) {
                if (!reducedObject.Weeks[wid]) {
                    reducedObject.Weeks[wid] = value.Weeks[wid];
                } else {
                    reducedObject.Weeks[wid] += value.Weeks[wid];
                }
            });
        });
        return reducedObject;
    };

    var finalFunc = function (key, reducedObject) {

        reducedObject.CourseId = key.split('@')[0];
        reducedObject.UserId = key.split('@')[1];
        reducedObject.SysAppId = key.split('@')[2];

        return reducedObject;
    };

    var options = {
        query: { 'EventType': 3, 'EventContext._t': {$ne: 'Course'}},
        out: { replace: 'course_user_weeks' },
        finalize: finalFunc
    };

    return rcds.mapReduce(mapFunc, reduceFunc, options, callback);
}; 