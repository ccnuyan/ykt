var getWeekNumberFrom2000=function(date){
    var weekno = ((Math.abs(date - new Date(2000,0,1)))/1000/60/60/24-2)/7;
    return Math.floor(weekno+1);
};

module.exports = getWeekNumberFrom2000;
