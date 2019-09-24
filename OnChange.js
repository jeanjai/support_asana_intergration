function onEdit(e) {
  var editedSheetId = e.source.getActiveSheet().getSheetId();
  console.log({message: "Edited sheet name = " + e.source.getActiveSheet().getSheetName()})
  
  if (editedSheetId == sheet_form_response.getSheetId() && shouldFormResponseEditTriggersOnSubmit) {
    return onFormSubmit('');
  }
  
  if (editedSheetId != sheet_all_asana_tickets_created.getSheetId()) {
    console.log({message: "Edit was not made on the all asana tickets sheet"})
    return '';
  }
  
  var editedRowValues = getSheetLastRowValues(sheet_all_asana_tickets_created)
  var taskFollowers = editedRowValues[taskFollowersColumn];
  
  //Sends email so automate.io can setup a trigger to notify the dev team
  if (isInArray(editedRowValues[taskPriorityColumn], highPriorityCustomField)) {
    if (shouldSendEmails) {
      sendEmail('email@example.com', 'Support ticket: Urgent Support Ticket', createHtmlForUrgentEmail(editedRowValues));
      console.log({message: "Email sent to automated@alongside.com to trigger automate.io intergration to send slack notification"});
    }else{
      console.log({message: "Email to automated@alongside.com to trigger automate.io intergration to send a slack notification for high priority task wasn't sent because of a config setting"})
    }
  }
  
  //If the ticket was created by this script
  if (isInArray('automated@alongside.com',taskFollowers.toString().split(','))) {
    sheet_form_moved_to_proper_project.appendRow(editedRowValues);
    console.log({message: "Task was properly moved to Moved"})
  }else{
    sheet_tickets_created_in_asana_this_week.appendRow(editedRowValues);
    console.log({message: "Task was properly moved to Production"})
  }
}
