/*
------------------------------------------------------------------------------------------
OnSubmit
------------------------------------------------------------------------------------------
*/

var useFakeData = false; //true = will use fake data
                         //false = will use last row in 
                         //live = false

var shouldFormResponseEditTriggersOnSubmit = false; //true = will trigger onSubmit when Form Responses 1 is edited
                                                   //false = won't run onSubmit when Form Responses 1 is edited
                                                   //live = false
                               
/*
------------------------------------------------------------------------------------------
Email settings
------------------------------------------------------------------------------------------
*/

var sendEmailsToProperPeople = true; //true = will send email to intended receipients
                                     //false = will email jeanluc@alongside.com
                                     //live = true

var shouldCreateAsanaTask = true; //true = will send email to asana to create task
                                  //false = won't create asana task
                                  //live = true
                                  
var shouldSendEmails = true; //true = will send all emails
                              //false = won't send any emails
                              //live = true
                              //Note: emails for creating tasks will still be sent if shouldCreateAsanaTask = true

/*
------------------------------------------------------------------------------------------
OnReport
------------------------------------------------------------------------------------------
*/

var shouldEmailReport = true; //true = will email the report
                             //false = will log the html of the report
                             //live = true

var shouldDeleteOnReport = true; //true = will delete rows when report in run
                                 //false = won't delete any data
                                 //live = true
                                 
                                 
/*
------------------------------------------------------------------------------------------
Generate Data
------------------------------------------------------------------------------------------
*/

//IMPORTANT THESE DON'T CHANGE ANYTHING RIGHT NOW

var doesNeedHighTestTaskSeverity = false; //true = The test data will be a high priority request
                                          //false = The test data will be a low priority request
                                          //live = N/A
                                       
var isTestTaskWishlist = true; //true = The test data will be a wishlist request
                               //false = The test data will be a technical request
                               //live = N/A
