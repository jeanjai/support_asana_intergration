function onWeek() {
  var htmlReport = '<table style="font-family:Arial, sans-serif;font-size:14px;">' + createHtmlSectionForNewFormSubmissions() + createHtmlSectionForMovedSubmissions() + createHtmlSectionForProductionTickets() + '</table>';
  
  if (shouldSendEmails) {
    sendEmail(weeklyReportReceipients, 'Weekly Support Report', htmlReport);
  }else{
    Logger.log("Weekly report email wasn't sent because of a config setting")
  }
  
  //clears rows from all applicable sheets
  if (shouldDeleteOnReport) {
    deleteAllButHeader([sheet_form_submitted_this_week, sheet_form_submitted_this_week_wishlist, sheet_form_moved_to_proper_project, sheet_tickets_created_in_asana_this_week]);
  }
  
  function createHtmlSectionForNewFormSubmissions() {
    
    var amountOfSupportTicketsThisWeek = sheet_form_submitted_this_week.getLastRow() - 1,
        amountOfWishlistTicketsThisWeek = sheet_form_submitted_this_week_wishlist.getLastRow() - 1,
        totalSubmissionCount = amountOfSupportTicketsThisWeek + amountOfWishlistTicketsThisWeek,
        header = reportHtmlHeaderForSection('Requests from Sales Team', totalSubmissionCount);

    if (amountOfSupportTicketsThisWeek == 0) {
      var ticketRows = [[]];
    }else{
      var ticketRows = sheet_form_submitted_this_week.getRange(2, 1, amountOfSupportTicketsThisWeek, sheet_form_submitted_this_week.getLastColumn()).getValues();
    }
      
    if (amountOfWishlistTicketsThisWeek == 0) {
      var wishlistRows = [[]];
    }else{
      var wishlistRows = sheet_form_submitted_this_week_wishlist.getRange(2, 1, amountOfWishlistTicketsThisWeek, sheet_form_submitted_this_week_wishlist.getLastColumn()).getValues();
    }
    
    var tickets = ticketRows.concat(wishlistRows);
    updateTaskCountPerRep(tickets);
      
    return header.concat(createHtmlForFormSubmissions());
  }
    
  function createHtmlSectionForMovedSubmissions() {
    var amountOfMovedTicketsThisWeek = sheet_form_moved_to_proper_project.getLastRow() - 1;
    var header = reportHtmlHeaderForSection('Converted to Support Tickets', amountOfMovedTicketsThisWeek);
      
    if (amountOfMovedTicketsThisWeek == 0) {
      return header;
    }
    
    var movedRows = sheet_form_moved_to_proper_project.getRange(2, 1, amountOfMovedTicketsThisWeek, sheet_form_moved_to_proper_project.getLastColumn()).getValues();
    return header + createHtmlForMoved(movedRows);
  }
    
  function createHtmlSectionForProductionTickets() {
    var amountOfProductionCreatedTicketsThisWeek = sheet_tickets_created_in_asana_this_week.getLastRow() - 1;
    var header = reportHtmlHeaderForSection('Production Team Requests', amountOfProductionCreatedTicketsThisWeek);
      
    if (amountOfProductionCreatedTicketsThisWeek == 0) {
      return header;
    }
    
    var productionRows = sheet_tickets_created_in_asana_this_week.getRange(2, 1, amountOfProductionCreatedTicketsThisWeek, sheet_tickets_created_in_asana_this_week.getLastColumn()).getValues();
    return header.concat(createHTMLForProduction(productionRows));
  }
    
  function updateTaskCountPerRep(tickets) {
    for (rowIndex in tickets) {
      var row = tickets[rowIndex];
      var repThatSubmittedTicket = row[formResponseSubmittedByColumn];
      var requestType = row[formResponseTypeColumn];
      
      for (repIndex in rep_users) {
        var repFullName = rep_users[repIndex].fullName;
        if (repThatSubmittedTicket == repFullName) {
          if (requestType == 'Wishlist (Things clients would like to have)') {
            rep_users[repIndex].wishlistTicketsThisWeek += 1;
          }else{
            rep_users[repIndex].supportTicketThisWeek += 1;
          }
        }
      }
    }
  }
}
