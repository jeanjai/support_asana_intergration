# Google Form and Asana Intergration for Support Requests


------------------------------------------------------------------------------
## PLEASE NOTE THAT THIS WAS BUILT BEFORE ASANA ADDED THIS FUNCTIONALITY
------------------------------------------------------------------------------


## Example sheet

- https://docs.google.com/spreadsheets/d/1YBF-O98YrQ5csxnP4ADnyOoDiqmOhUqBiCxrV85AIXE/edit?usp=sharing



## Table of contents
* [Project overview](#project-overview)
* [Steps to setup](#steps-to-setup)
* [How to debug](#how-to-debug)
* [What can be changed](#what-can-be-changed)
* [What could break the platform](#what-could-break-the-platform)
* [File Structure](#file-structure)
* [FAQ](#faq)



## Project overview

#### OnSubmit: (When someone fills out the form)
  - Sends confirmation email to rep
  - If the task is wishlist, it'll create a task in the wishlist project in asana
  - If the task is a technical issue, it'll create a task in the rep project in asana

#### OnChange: (When a ticket is created or moved in the proper Asana project)
  - Figure out if the ticket was created directly in the proper asana project or if it was moved from rep project
  - If request is high priority, send slack notification
  
#### OnReport: (When report should be sent)
  - Creates a report with each of the following:
      
      - New Submissions
        - Updates the ticket counts for each rep based on the amount of tickets they submitted on that week
        - Adds the amount of tickets every rep submitted (divided by request type) to the html report
        
      - Moved Tickets
        - Group the task submitted with the proper rep
        - Hyperlinks the tasks
        
      - Production Tickets
        - Hyperlink and display all production tickets



## Steps to setup

  1. Make sure Form is linked to Spreadsheet so when a form is submitted it creates a row in Form Responses 1
  2. Make sure all triggers are created (onEdit, onWeek)
  3. Make sure the zapier intergration for when new tasks are created in the proper asana project is copying them to all asana tickets created sheet
  4. Make sure automate.io is properly setup to send a slack notification to the devs when a task that was created in the proper asana project is marked as high priority
  5. Make sure the values in config are all accurate to what you're trying to accomplish
  6. Make sure the values in global_variables are accurate



## How to debug

The test_scripts.gs includes a variaty of functions that will let you test specific actions that are used for the intergration. 

By viewing view -> executions you'll be able to see an overview of what caused the error with the intergration.



## What can be changed

 - Spreadsheet name
 - Form name
 - Sheet name



## What could break the platform

- Column order (unless defined differently in global_variables)
- Values in form options (unless defined differently in global_variables)
- If someone removed the submitted by section in the description of an asana task that was created by the form, the reports won't know who submitted the task



## File Structure

#### onChange.gs
  - Only run when edited sheet is all asana tickets
  - If ticket is high priority, it'll send and email so automate.io can send a slack message to the dev team
  - Moves the task to the proper sheet

#### onReport.gs
  - Creates a weekly report based on the app scripts time trigger
  - Creates html for new submissions, moved tickets and production tickets 
  - Sends report to the proper people
  - Clears sheets

#### onSubmit.gs
  - onSubmit is triggered when someone fills the form
  - Moves form submission to proper sheet
  - Sends confirmation email to rep that submitted ticket

#### config.gs
  - The config file defines basic configurations like if emails should be sent or not.

#### global_functions.gs
  - The global_functions file defines basic functions that can be used by any file

#### global_variables.gs
  - The global_variables file defines basic variables that can be used by any file

#### html_templates.gs
  - The html_templates file defines functions to create certain html documents to use in emails

#### setup.gs
  - The setup file defines simple functions that should only be run once. It shouldn't be touched afterwards.
  

## FAQ

#### How do I get a user's info?

  - Users are defined in the global_variables file as an object. 
  - If you'd like to get the info of a user, you'll need to reference the object:
      
      For example:
        - admin_users.john_doe.email
        - rep_users.john_doe.firstName
      

#### Is there a way to stop the confirmation emails from being delivered to certain reps?
  
  - Yes! Set confirmationEmail to false in the user object in global_variables


#### Why is the number of Moved to proper asana tickets higher than the number of submitted tickets in the weekly report?

  - That's completly normal. The Moved to proper tickets include the tasks that were created from 
    previous weeks. It's possible that a task that was created last week only got moved to the proper asana project this week which could cause the number of moved tickets to be higher than the form submissions.
    

#### Can I change the google sheet's title?

  - Yes! The script uses the id's of the speadsheet and sheets. Changing the title of them won't affect the id's.
  
  
#### How do I add an extra user?

  - If you'd like to add a new user, you'll need to add them in the proper user object (rep_users, production_users...) in 
    global_variables. Once that's done, if the user is a rep_users, you'll need to add them in the form
