//Runs every day;
//For One's Detail Query;
module.exports = function (rcds, callback) {

    var mapFunc = function () {
        if (this.EventContext && this.EventContext.CourseId && this.UserId && this.SysAppId && this.EventParameter) {
            var key = this.EventContext.CourseId + '@' + this.UserId + '@' + this.SysAppId;
            var value = {
                UserId: this.UserId,
                LearningUnits: {},
            };
            value.LearningUnits[this.EventContext.LearningUnitId] = this.EventParameter.Total;
            emit(key, value);
        }
    };

    var reduceFunc = function (key, values) {
        var reducedObject = { UserId: null, SysAppId: null, CourseId: null, LearningUnits: {} };

        values.forEach(function (value) {
            Object.keys(value.LearningUnits).forEach(function (lid) {
                if (!reducedObject.LearningUnits[lid]) {
                    reducedObject.LearningUnits[lid] = value.LearningUnits[lid];
                } else {
                    reducedObject.LearningUnits[lid] += value.LearningUnits[lid];
                }
            });
        });
        return reducedObject;
    };

    var finalFunc = function (key, reducedObject) {
        reducedObject.CourseId = key.split('@')[0];
        reducedObject.UserId = key.split('@')[1];
        reducedObject.SysAppId = key.split('@')[2];

        reducedObject.Total = 0;

        Object.keys(reducedObject.LearningUnits).forEach(function (lid) {
            reducedObject.Total += reducedObject.LearningUnits[lid];
        });

        return reducedObject;
    };

    var options = {
        query: { 'EventType': 3 },
        out: { replace: 'course_user_learning_units' },
        finalize: finalFunc,
    };

    return rcds.mapReduce(mapFunc, reduceFunc, options, callback);
};