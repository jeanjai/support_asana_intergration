//These functions only need to be run once. 
var form_id = '1G-AIZCer_TdYwo0B65bpL5AcVseHloqSDEsY_nHBPlo';

function runAll() {
  createSpreadsheetFormTrigger();
  createSpreadsheetChangeTrigger();
  createSpreadsheetWeeklyTrigger();
}

function createSpreadsheetFormTrigger() {
  var form = FormApp.openById(form_id);
  ScriptApp.newTrigger('onFormSubmit')
  .forForm(form)
  .onFormSubmit()
  .create();
}

function createSpreadsheetChangeTrigger() {
var sheet = SpreadsheetApp.getActive();
ScriptApp.newTrigger('onEdit')
  .forSpreadsheet(sheet)
  .onChange()
  .create();
}

function createSpreadsheetWeeklyTrigger() {
  ScriptApp.newTrigger('onWeek')
  .timeBased()
  .onWeekDay(ScriptApp.WeekDay.FRIDAY)
  .atHour(8)
  .create();
}
