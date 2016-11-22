var getWeekNumberFrom2000 = function (date) {
    var weekno = ((Math.abs(date - new Date(2000, 0, 1))) / 1000 / 60 / 60 / 24 - 2) / 7;
    return Math.floor(weekno + 1);
};

var getDateFrom2000 = function (weekno) {
    var starts = new Date(1999, 11, 27).getTime();
    var targets = starts + weekno * 7 * 24 * 3600 * 1000;
    var d = new Date(targets);
    return d;
};


module.exports = {
    getWeekNumberFrom2000: getWeekNumberFrom2000,
    getDateFrom2000: getDateFrom2000
};
