/**
 * Script attached to spreadsheet containing credentials
 */
 function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menu =[
             {name: "Decrypt", functionName: "decryptCell"},
             {name: "Encrypt", functionName: "encryptCell"}
            ]; 
  ss.addMenu("Crypt", menu);
  ss.toast("Select cell and click show Secret", "", 5);
}

function bin2Str(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 10));
  }
  return result;
}

function decryptCell() {
  var masterKey = Browser.inputBox('Enter master Key');
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var cell = spreadSheet.getActiveSheet().getActiveCell();
  var input = cell.getValue();
  
  var byteArray = Utilities.base64Decode(input, Utilities.Charset.UTF_8);
  
  var strJson = bin2Str(byteArray);     //JSON in String format
  var encJson = JSON.parse(strJson);    //JSON Object
  
  var decryptedCell = sjcl.decrypt(masterKey, encJson);
  spreadSheet.toast(decryptedCell, "Decrypted", 5);
}

function encryptCell() {
  var masterKey = Browser.inputBox('Enter master Key');
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var cell = spreadSheet.getActiveSheet().getActiveCell();
  var input = cell.getValue();
  
  var encJson = sjcl.encrypt(masterKey, input);   //JSON Object
  var strJson = JSON.stringify(encJson);         //JSON in string format
  
  var encB64 = Utilities.base64Encode(strJson, Utilities.Charset.UTF_8);
  Browser.msgBox(encB64);
}

/*
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
*/
