//Spreadsheets
var sheet_form_response = getSheetById(1005077164),
    sheet_form_submitted_this_week = getSheetById(611980426),
    sheet_form_submitted_this_week_wishlist = getSheetById(1299379556),
    sheet_form_moved_to_proper_project = getSheetById(1068861868),
    sheet_tickets_created_in_asana_this_week = getSheetById(1183049658),
    sheet_all_asana_tickets_created = getSheetById(1010295433);

//all asana tickets created column indexes
var timestampColumn = 0,
    taskTitleColumn = 1,
    taskMessageColumn = 2,
    taskAsanaIdColumn = 3,
    taskFollowersColumn = 4,
    taskPriorityColumn = 5;
    
    
var formResponseTimestampColumn = 0,
    formResponseSubmittedByColumn = 1,
    formResponseSeverityColumn = 2,
    formResponseAnnualRevenueColumn = 3,
    formResponseCompanyColumn = 4,
    formResponseContactByColumn = 5,
    formResponseContactEmailByColumn = 6,
    formResponseTypeColumn = 7,
    formResponseTitleColumn = 8,
    formResponseMessageColumn = 9,
    formResponseClientWordColumn = 10,
    formResponseUsefulLinksColumn = 11,
    formResponseAdditionalFileColumn = 12;
    

var highPriorityCustomField = ['Urgent', 'High Priority'];
var high_priority_requests = ['Critical (Requires immediate action)', 'Significant (Important but may not require immediate action)'];

//used for creating test data
var revenues = ['$0 - $ 1,000', '$1,001 - $5,000', '$5,001 - $10,000', '$10,000+']
var severities = ['Critical (Requires immediate action)', 'Significant (Important but may not require immediate action)', 'Moderate (Moderate loss of functionality or performance)', 'Informational (Minor loss of functionality, wishlist how-to questions)']
var types = ['ATS Technical Issue', 'CareerBeacon.com Technical Issue', 'Wishlist (Things clients would like to have)', 'General Feedback']
var randomNames = ['Antwan','Josiah','Krystle','Christena','Clay','Sharen','Doyle','Therese','Christiane','Song','Lizbeth','Renea','Natalya','Parker','Lucinda','Junie','Deandre','Socorro','Meagan']
var randomCompanies = ['Coolerly','Cold','Chill','Breezeful','Coolsly','Scool','Breezign','Coolic','Zcool','Bfreeze','Bfreezes','Breezy','Freshine','Zfreeze','Sleeease','Zfreezes','Freshink','Sleeeasy']


var asana_projects = {
  wishlist: {
    project_id: 12345678910,
    email_to_create_task: 'x+10987654321@mail.asana.com'
  },
  support: {
    project_id: 12345678910,
    email_to_create_task: 'x+1110987654321@mail.asana.com'
  }
};

var rep_users = {
  
  //Reps
  jon_doe: {id: 0, 
                 firstName: 'Jon', 
                 lastName: 'Doe', 
                 fullName: 'Jon Doe', 
                 email: 'jon.doe@example.com',
                 supportTicketThisWeek: 0,
                 wishlistTicketsThisWeek: 0,
                 ticketsConvertedThiWeek: 0,
                 movedTicketsThisWeek: 0,
                 htmlMoved: '<tr><td style="width: 25%;padding: 5px;font-weight:bold;">Jacqui Janes</td>',
                 confirmationEmail: true},
  
  jane_doe: {id: 1, 
                  firstName: 'Jane', 
                  lastName: 'Doe', 
                  fullName: 'Jane Doe', 
                  email: 'jane.doe@example.com',
                  supportTicketThisWeek: 0,
                  wishlistTicketsThisWeek: 0,
                  ticketsConvertedThiWeek: 0,
                  movedTicketsThisWeek: 0,
                  htmlMoved: '<tr><td style="width: 25%;padding: 5px;font-weight:bold;">Kathryn Henry</td>',
                  confirmationEmail: true},
  
  joe_bloggs: {id: 2, 
                      firstName: 'Joe', 
                      lastName: 'Bloggs', 
                      fullName: 'Joe Bloggs', 
                      email: 'joe.bloggs@example.com',
                      supportTicketThisWeek: 0,
                      wishlistTicketsThisWeek: 0,
                      ticketsConvertedThiWeek: 0,
                      movedTicketsThisWeek: 0,
                      htmlMoved: '<tr><td style="width: 25%;padding: 5px;font-weight:bold;">Charlene Williams</td>',
                      confirmationEmail: true}
};



var production_users = {
  jason_doe: {id: 5, 
                 firstName: 'Jason', 
                 lastName: 'Doe', 
                 fullName: 'Jason Doe', 
                 email: 'jason.doe@example.com',
                 asana_email: 'jason.doe@example.com'},
  
  will_smith: {id: 6, 
                 firstName: 'Will', 
                 lastName: 'Smith', 
                 fullName: 'Will Smith', 
                 email: 'will.smith@example.com',
                 asana_email: 'will.smith@example.com'}
}

var admin_users = {
  super_man: {id: 0, 
                 firstName: 'Super', 
                 lastName: 'Man', 
                 fullName: 'Super Man', 
                 email: 'super.man@example.com',
                 asana_email: 'super.man@example.com',
                 confirmationEmail: true},
  
  tony_stark: {id: 1, 
                 firstName: 'Tony', 
                 lastName: 'Stark', 
                 fullName: 'Tony Stark', 
                 email: 'tony.stark@example.com',
                 asana_email: 'tony.stark@example.com'}
};

if (sendEmailsToProperPeople) {
  var people_to_email_for_high_priority_rep_request = [production_users.jason_doe],
      followers_for_higher_priority_tickets = [production_users.jason_doe],
      task_owner_for_higher_priority_tickets = production_users.jason_doe,
      weeklyReportReceipients = [admin_users.tony_stark.email, admin_users.super_man.email, production_users.jason_doe.email, production_users.will_smith.email];
}else{
  var people_to_email_for_high_priority_rep_request = [admin_users.super_man.email],
      followers_for_higher_priority_tickets = [admin_users.super_man.email],
      task_owner_for_higher_priority_tickets = admin_users.super_man.email,
      weeklyReportReceipients = [admin_users.super_man.email];
}
