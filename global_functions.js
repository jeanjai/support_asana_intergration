/*
------------------------------------------------------------------------------------------
getSheetById returns the sheet given an id. The sheet id can be found at the end of the url.
For example:
https://docs.google.com/spreadsheets/d/1KcviLYOqT7b-VyK_7SKglEZdlDzlQGGJ-jAo82AFwx8/edit#gid=1497647229
1497647229 is the sheet id
------------------------------------------------------------------------------------------
*/

function getSheetById(id) {
  return SpreadsheetApp.getActive().getSheets().filter(
    function(s) {return s.getSheetId() === id;}
  )[0];
}

/*
------------------------------------------------------------------------------------------
loops over all reps and returns the object that contains the full name given. If you'd like to use the reps info, do something like this:
var rep = getRepInfoFromFullName('John Doe')
var rep_first_name = rep.firstName
------------------------------------------------------------------------------------------
*/

//CareerBeacon employees
function getCareerBeaconEmployeeInfoFromFullName(fullname) {
  for (var i in rep_users) {
    if (rep_users[i].fullName == fullname) {
      return rep_users[i];
    }
  }
}

//Alongside employees
function getAlongsideEmployeeInfoFromFullName(fullname) {
  for (var i in admin_users) {
    if (admin_users[i].fullName == fullname) {
      return admin_users[i];
    }
  }
}

/*
------------------------------------------------------------------------------------------
Sends email given a toEmail, subjectLine and htmlMessage. The toEmail can either be an array or a string
------------------------------------------------------------------------------------------
*/

function sendEmail(toEmail, subjectLine, htmlMessage) {
  if (typeof toEmail == 'object') {
    toEmail = toEmail.join();
  }else if (typeof toEmail != 'string') {
    return trackError('Please make sure toEmail is a string or array.');
  }
  
  MailApp.sendEmail({to: toEmail, subject: subjectLine, htmlBody: htmlMessage});
  console.log({message: 'email sent to: ' + toEmail + " with subject line " + subjectLine});
}

/*
------------------------------------------------------------------------------------------
Check for a given value in a nested object. 
For example:
var info = {
  first: {
    data: 'hello'
  },
  second: {
    data: 'good bye'
  }
}
isValuePresentInNestedObject could search if data has the value of 'hello' 
isValuePresentInNestedObject(info, 'hello', data) would return true
------------------------------------------------------------------------------------------
*/

function isValuePresentInNestedObject(object, value, name) {
  for (var i in object) {
    return (object[i][name] == value);
  }
}

/*
------------------------------------------------------------------------------------------
Simplifies the request type to either wishlist of support
------------------------------------------------------------------------------------------
*/

function simplify_request_type(request) {
  if (request == 'Wishlist (Things clients would like to have)') {
    return 'wishlist';
  }else{
    return 'support';
  }
}

/*
------------------------------------------------------------------------------------------
Clearn data appart from header
------------------------------------------------------------------------------------------
*/

function clearSheetRowsApartFromHeader(sheet) {
  sheet.deleteRows(2, sheet.getLastRow()-1);
}

function deleteAllButHeader(sheets) {
  for (var i in sheets) {
    if (sheet.getLastRow - 1 > 1) {
      clearSheetRowsApartFromHeader(sheets[i]);
    }
  }
}

/*
------------------------------------------------------------------------------------------
Clearn data appart from header
------------------------------------------------------------------------------------------
*/

function trackError(message) {
  sendEmail(['example@example.com'], 'Support Report Error', message);
}

/*
------------------------------------------------------------------------------------------
Is string in array
------------------------------------------------------------------------------------------
*/

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

/*
------------------------------------------------------------------------------------------
Is string in object
------------------------------------------------------------------------------------------
*/

function isInObject(value, object) {
  return object.hasOwnProperty(value);
}

/*
------------------------------------------------------------------------------------------
Generate data
------------------------------------------------------------------------------------------
*/

function generateSubmittedBy() {
  repNames = []
  for (i in rep_users) {
    repNames.push(rep_users[i].fullName)
  }
  
  return getRandomValueFromArray(repNames)
}

function getRandomValueFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateText(amountOfSentences) {
  return UrlFetchApp.fetch('https://baconipsum.com/api/?type=meat-and-filler&sentences=' + amountOfSentences + '&format=text')
}

function generateTestTask() {
  var submittedBy = generateSubmittedBy()
  var severity = getRandomValueFromArray(severities)
  var revenueAtRisk = getRandomValueFromArray(revenues)
  var company = getRandomValueFromArray(randomCompanies)
  var name = getRandomValueFromArray(randomNames)
  var email = name + '@example.com'
  var type = getRandomValueFromArray(types)
  var title = generateText(1)
  var description = generateText(3)
  var clientWords = Math.random() >= 0.5 ? generateText(2) : "";
  
  return ['8/21/2019 10:03:40', submittedBy, severity, revenueAtRisk, company, name, email, type, title, description, clientWords, 'This is any useful links', 'https://drive.google.com/open?id=1bWDpqpdyzcYYT5Y4Or5D-9x_sgfD3yHD,https://drive.google.com/open?id=1Utw9wlZYnsCcen3tGM-M7c_ilXvDen-e'];
}

function getTestAsanaCreatedTask() {
  var title = generateText(1)
  var description = generateText(3)

  return ['9/18/2019', title, description, '12345678910', "email@example.com", "low"]
}

/*
------------------------------------------------------------------------------------------
Returns generated form data
------------------------------------------------------------------------------------------
*/

function getSheetLastRowValues(sheet) {
  return sheet.getRange(sheet.getLastRow(),1,1,sheet.getLastColumn()).getValues()[0];
}
