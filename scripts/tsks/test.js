    var date = new Date();
    date.setDate(date.getDate() - 1);
    var mon = (date.getMonth() + 1).toString();
    var targetMon = '00'.substring(0, '00'.length - mon.length) + mon;
    var day = date.getDate().toString();
    var targetDay = '00'.substring(0, '00'.length - day.length) + day;
    console.log(`${date.getFullYear()}${targetMon}${targetDay}`)   ;