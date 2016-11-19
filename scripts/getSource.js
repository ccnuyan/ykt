var moment = require('moment');

var getSourceCollection = function (date) {
    if (!date) {
        date = new Date();
        date.setDate(date.getDate() - 1);
    }
    return moment(date).format('YYYYMMDD');
};
var getSourceDb = function (date) {
    if (!date) {
        date = new Date();
        date.setDate(date.getDate() - 1);
    }
    return moment(date).format('YYYY');
};

module.exports = {
    getSourceCollection: getSourceCollection,
    getSourceDb: getSourceDb
};
