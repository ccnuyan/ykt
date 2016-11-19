//Runs every day
//For Teacher Overview
module.exports = function (rcds, callback) {
    var mapFunc = function () {
        if (this.EventContext && this.EventContext.CourseId && this.UserId && this.SysAppId && this.EventParameter) {

            var key = this.EventContext.CourseId + '@' + this.SysAppId;
            var value = {
                Users: {},
            };
            value.Users[this.UserId] = this.EventParameter.Total;
            emit(key, value);
        }
    };

    var reduceFunc = function (key, values) {
        var reducedObject = { Users: {} };

        values.forEach(function (value) {
            Object.keys(value.Users).forEach(function (uid) {
                if (!reducedObject.Users[uid]) {
                    reducedObject.Users[uid] = value.Users[uid];
                } else {
                    reducedObject.Users[uid] += value.Users[uid];
                }
            });
        });

        return reducedObject;
    };

    var finalFunc = function (key, reducedObject) {
        reducedObject.Total = 0;
        reducedObject.CourseId = key.split('@')[0];
        reducedObject.SysAppId = key.split('@')[1];

        var count = 0;
        Object.keys(reducedObject.Users).forEach(function (userid) {
            count++;
            reducedObject.Total += reducedObject.Users[userid];
        });

        reducedObject.Count = count;
        if (reducedObject.Count > 0) {
            reducedObject.Average = reducedObject.Total / reducedObject.Count;
        }

        return reducedObject;
    };

    var options = {
        query: { 'EventType': 3 },
        out: { replace: 'course_totals' },
        finalize: finalFunc
    };

    return rcds.mapReduce(mapFunc, reduceFunc, options, callback);
};