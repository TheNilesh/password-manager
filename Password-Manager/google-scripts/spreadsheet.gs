/**
 * Script attached to spreadsheet containing credentials
 ( this is DESIGN not actual code) 
 */
 
function onFormSubmit(e){
  var range = e.range;
    if (duplicate is found) { //https://developers.google.com/apps-script/articles/removing_duplicates.html
        cancel old trigger;     //https://developers.google.com/apps-script/guides/triggers/installable
        delete old credentials;
    }
// attach trigger to execute after n days after Timestamp column.
    ScriptApp.newTrigger('sendRemainder')
      .timeBased()
      .everyDays(50)
      .create();
}

function sendRemainder() {
    var emailBody = "You have not changed your password for " + getCellContent() + " since " + n + " days."
    GMailApp.send();
}