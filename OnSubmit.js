function onFormSubmit(e) {
  var new_form_row_details = useFakeData ? generateTestTask() : getSheetLastRowValues(sheet_form_response);
  var [time, form_submitted_by, severity, revenue_at_risk, company, contact, contact_email, request_type, title_of_ticket, ticket_context, clients_words, useful_links, additional_files] = new_form_row_details;
  var asana_project = simplify_request_type(request_type);
  var employee_that_submitted_ticket = sendEmailsToProperPeople ? getCareerBeaconEmployeeInfoFromFullName(form_submitted_by) : admin_users.super_man;
  var emailOfRep = [employee_that_submitted_ticket.email];

  //move row to proper tab
  if (isInArray('Wishlist', request_type)) {
    sheet_form_submitted_this_week_wishlist.appendRow(new_form_row_details);
    console.log({message: "Submission was moved to form submissions this week (wishlist)"})
  }else{
    sheet_form_submitted_this_week.appendRow(new_form_row_details);
    console.log({message: "Submission was moved to form submissions this week (ticket)"})
  }
  
  if (shouldCreateAsanaTask) {
    createAsanaTask();
  }else{
    console.log({message: "Didn't create asana task because of a config setting"})
  }
  
  //if the confirmation email should be sent
  if (shouldSendEmails) {
    if (employee_that_submitted_ticket.confirmationEmail) {
      sendConfirmationEmail();
    }
  }else{
    console.log({message: "Confirmation email wasn't sent because of a config setting"})
  }
  
  function sendConfirmationEmail() {
    var subjectLine = 'Request confirmation - ' + title_of_ticket;
    var htmlMessage = '<p>This is to comfirm that your request (' + title_of_ticket + ') has been received. No further actions are required.</p>';
    
    if (shouldSendEmails) {
      sendEmail(emailOfRep, subjectLine, htmlMessage);
    }else{
      console.log({message: "Confirmation email wasn't sent because of a config setting"})
    }
  }

  function createAsanaHtmlMessage() {
    var asanaHtml = 'Submitted by:\n' + form_submitted_by + '\n\nSeverity:\n' + severity + '\n\n\n------------------------------------------------\n\n\nCompany:\n' + company + '\n\nContact:\n' + contact + '\n\n\Contact Email:\n' + contact_email + '\n\n\n------------------------------------------------\n\n\nType of Request:\n' + request_type + '\n\nBriefly Explain Request:\n' + title_of_ticket + '\n\nContext:\n' + ticket_context;
    
    if (clients_words) {
      asanaHtml += '\n\nClient Words: \n' + clients_words;
    }if (useful_links) {
      asanaHtml += '\n\nUseful Links: \n' + useful_links;
    }if (additional_files) {
      asanaHtml += '\n\nFiles:';
      files = additional_files.split(',');
      for (var i in files) {
        asanaHtml += ('\n' + files[i]);
      }
    }
    
    return asanaHtml;
  }
  
  function createHighPriorityHtmlNotificationEmail() {
    var highPriorityHtml = '<p style="margin: 0px;"><b>Submitted by:</b></p><p style="margin: 0px;">' + form_submitted_by + '</p><br><p style="margin: 0px;"><b>Severity:</b></p><p style="margin: 0px;">' + severity + '</p><br><b>Company name:</b></p><p style="margin: 0px;">' + company + '</p><br><p style="margin: 0px;"><b>Contact person:</b></p><p style="margin: 0px;">' + contact + '</p><br><p style="margin: 0px;"><b>Contact’s email:</b></p><p style="margin: 0px;">' + contact_email + '</p><br><p style="margin: 0px;"><b>Type of Request:</b></p><p style="margin: 0px;">' + request_type + '</p><br>'
  
    if (clients_words) {
      highPriorityHtml += '<p style="margin: 0px;"><b>Client Words:</b></p><p style="margin: 0px;">' + clients_words + '</p><br>';
    }if (useful_links) {
      highPriorityHtml += '<p style="margin: 0px;"><b>Useful Links:</b></p><p style="margin: 0px;">' + useful_links + '</p><br>';
    }if (additional_files) {
      highPriorityHtml += '<p style="margin: 0px;"><b>Files:</b></p>';
      files = additional_files.split(',');
      
      for (var i in files) {
        highPriorityHtml += '<p style="margin: 0px;">' + files[i] + '</p>';
      }
    }
    
    return highPriorityHtml
  }
  
  function createAsanaTask() {
    var asanaHtml = createAsanaHtmlMessage();
    var highPriorityHtml = createHighPriorityHtmlNotificationEmail()
    var asana_email_to_create_task = asana_projects[asana_project].email_to_create_task;
  
    //checks if the asana_project that was given is in the object 'asana_projects'
    if (isInObject(asana_project, asana_projects) != true) {
      return trackError('unknown asana project: ' + asana_project + '. Should be either wishlist or support');
    }
    
    //If the request is a high priority
    if (isInArray(severity, high_priority_requests)) {
      followers_for_higher_priority_tickets.unshift(asana_email_to_create_task);
      
      //creates task for high priority tickets
      sendEmail(followers_for_higher_priority_tickets, title_of_ticket, asanaHtml);
      console.log({message: "Created Asana Task for high priority ticket"})
      
      if (shouldSendEmails) {
        
        //send notification email to production for high priority tickets
        sendEmail(people_to_email_for_high_priority_rep_request, 'High priority support ticket: ' + title_of_ticket, '<h3>' + highPriorityHtml + '</h3>');
        console.log({message: "Sent email to CB production for high priority ticket"})
      }else{
        console.log({message: "Email to people who should get notified for high priority tickets wasen't sent because of a config setting"})
      }
    
    //If request is low priority
    }else{
    
      //creates task for low priority tickets
      sendEmail(asana_email_to_create_task, title_of_ticket, asanaHtml);
      console.log({message: "Created Asana Task for low priority ticket"})
    }
  }
}
