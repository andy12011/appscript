function request(url, body) {
  var payload = JSON.stringify(body);

   const headers = {
    "Content-Type": "application/json",
    "api-key": "8e9cca36d2b64dfe994fb8b77dafa03f",
    "X-User-Agent":"spreadsheets/bi"
  };

  var options = {
    "method": "post",
    "headers": headers,
    "payload" : payload
  };
  
  var res = UrlFetchApp.fetch(url, options);
  var content = res.getContentText("UTF-8");
  var json = JSON.parse(content);
  return json;
}

function requestReturnStr(url, body) {
  var payload = JSON.stringify(body);

   const headers = {
    "Content-Type": "application/json",
    "api-key": "8e9cca36d2b64dfe994fb8b77dafa03f",
    "X-User-Agent":"spreadsheets/bi"
  };

  var options = {
    "method": "post",
    "headers": headers,
    "payload" : payload
  };
  
  var res = UrlFetchApp.fetch(url, options);
  var content = res.getContentText("UTF-8");
 
  return content;
}
