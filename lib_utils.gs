function getYesterDayDate() {
  var d = new Date(Date.now() - 86400000);

  month = '' + (d.getMonth() + 1);
  day = '' + d.getDate();
  year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  var date = [year, month, day].join('-');
  console.log(date)
  return date
}

function dateFormat(d) {
  month = '' + (d.getMonth() + 1);
  day = '' + d.getDate();
  year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  var date = [year, month, day].join('-');

  return date
}

function getDateRanegList(start, end) {
  var s = new Date(start)
  var e = new Date(end)
  var date = []
  s.setHours(s.getHours() + 8)
  e.setHours(e.getHours() + 8)
  
  while (s.getTime() <= e.getTime()) {
    date.push(dateFormat(s))
    s.setDate(s.getDate() + 1)
  }

 return date
}

function yesNoAlert(title, prompt) {
  let check = Browser.msgBox(title, prompt, Browser.Buttons.YES_NO)

  if (check == 'no') {
    return false
  }
  return true
}

function alert(content) {
  SpreadsheetApp.getUi().alert(content);
}


// A=0 B=1 AA=26 AZ =51
function parseNotationToIndex(notation) {
  var result = null
  Array.from(notation).reverse().forEach((element, idx) => {
    var ascii = element.charCodeAt(0)
    if (ascii >= 65 && ascii <= 90) {
      result += Math.pow(26,idx) * (ascii - 65 + 1)
    }
  })
  return result - 1
}

function replaceJsonIntToStr(key, jsonStr) {
  var regexStr = `\\"${key}\\":(\\d+)` 
  var replaceStr = `"${key}":"$1"`

  return jsonStr.replaceAll(new RegExp(regexStr,'g'), replaceStr)
}

function getUnixtime() {
  let dateTime = Date.now();
  return Math.floor(dateTime / 1000);
}

function dateAddDay(date, days) {
  var d = new Date(date)
  var unixtime = d.getTime() + (24*60*60*1000) * days
  var newDate = new Date(unixtime)
  return dateFormat(newDate)
}



