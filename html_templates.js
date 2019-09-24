function reportHtmlHeaderForSection(title, submissionCount) {  
  return '<td style="width: 25%;padding: 5px;font-weight:bold;background-color: #dddddd;">' + title + '</td><td style="width: 75%;padding: 5px;font-weight:bold;background-color: #dddddd;">Total: ' + submissionCount + '</td></tr><tr><td style="width: 25%;padding: 5px;"></td><td style="width: 75%;padding: 5px;"></td></tr>';
}

//Loops through the reps and creates a row if the rep submitted any tickets this week
function createHtmlForFormSubmissions() {
  html = '';
  
  for (var i in rep_users) {
    if (rep_users[i].supportTicketThisWeek > 0 || rep_users[i].wishlistTicketsThisWeek > 0) {
      html = html.concat('<tr><td style="width: 25%;padding: 5px;font-weight:bold;">' + rep_users[i].fullName + '</td><td style="width: 75%;padding: 5px;font-weight:bold;">Tickets: ' + rep_users[i].supportTicketThisWeek + ' &ensp; - &ensp; Wishlist: ' + rep_users[i].wishlistTicketsThisWeek + '</td></tr>');
    }
  }
  
  return html;
}

//Loops through all rows and reps and creates row with the task info is it was moved to cb tickets
//Might need to add an exception if someone removed the submitted by in the asana task
function createHtmlForMoved(tickets) {
  html = '';

  for (rowIndex in tickets) {
    row = tickets[rowIndex];
    repThatSubmitted = row[taskMessageColumn].replace(/Submitted by:\n|\n\nSeverity:\n((.|\n)*)/g, '');
    
    for (var i in rep_users) {
      if (rep_users[i].fullName == repThatSubmitted) {
        rep_users[i].movedTicketsThisWeek += 1;
        rep_users[i].htmlMoved += '<tr><td style="width: 25%;padding: 5px;">' + row[timestampColumn].toString().replace(' GMT-0300 (ADT)', '') + '</td><td style="width: 75%;padding: 5px;"><a href="https://app.asana.com/0/' + asana_projects.support.project_id + '/' + row[taskAsanaIdColumn] + '">' + row[taskTitleColumn] + '</a></td></tr>';
      }
    }
  }
  
  for (var i in rep_users) {
    if (rep_users[i].movedTicketsThisWeek > 0) {
      html += rep_users[i].htmlMoved;
    }
  }
  
  return html;
}

function createHTMLForProduction(tickets) {
  html = '';
  
  for (rowIndex in tickets) {
    row = tickets[rowIndex];
    html += '<tr><td style="width: 25%;padding: 5px;">' + row[timestampColumn].toString().replace(' GMT-0300 (ADT)','') + '</td><td style="width: 75%;padding: 5px;"><a href="https://app.asana.com/0/' + asana_projects.support.project_id + '/' + row[taskAsanaIdColumn] + '">' + row[taskTitleColumn] + '</a></td></tr>';
  }
  
  return html;
}

function createHtmlForAsana(tickets, headers) {
  html = '';
  
  //should be run twice
  for (var i in tickets) {
    var rowsForTab = tickets[i];
    html += headers[i];
    for (var rowIndex in rowsForTab) {
      var row = rowsForTab[rowIndex];
      if (row[0]) {
        html += '<tr><td style="width: 25%;padding: 5px;">' + row[timestampColumn] + '</td><td style="width: 75%;padding: 5px;"><a href="https://app.asana.com/0/' + asana_projects.support.project_id + '/' + row[taskAsanaIdColumn] + '">' + row[taskTitleColumn] + '</a></td></tr>';
      }
    }
  }
  
  return html;
}

function createHtmlForUrgentEmail(editedRowValues) {
  var taskTitle = editedRowValues[taskTitleColumn];
  var taskId = editedRowValues[taskAsanaIdColumn];
  return ('<p>' + taskTitle + '</p><p>For more info: https://app.asana.com/0/' + asana_projects.support.project_id + '/' + taskId + '<\p>');
}
