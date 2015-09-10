// ==UserScript==
// @name        PasswordManager
// @namespace   https://github.com/TheNilesh
// @include     *
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/* Include Stanford Javascript Crypto Library */

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

var masterPassword = null;
var userIdField = null;
var pwdBox;

function encryptAndSend() {
    if (masterPassword == null) {
        masterPassword = prompt("Master Password ?");
    }
    var encUser = utf8_to_b64( JSON.stringify(sjcl.encrypt(masterPassword, userIdField.value)) );
    var encPwd = utf8_to_b64( JSON.stringify(sjcl.encrypt(masterPassword, pwdBox.value)) );
   
  //post to google
  GM_xmlhttpRequest({
    method: "POST",
    url: "https://docs.google.com/forms/d/[FORM_ID]/formResponse",
    data: "entry.[field-number1]=" + location.hostname + "&entry.[field-number2]=" + encUser + "&entry.[field-number3]=" + encPwd,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    onload: function (response) {
      console.log("Submitted: ");
    },
    onerror:    function(reponse) {
      console.log("error: ");
    }
  });
}

//*****************************MAIN*****************************//
var loginForm = null;
var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) {
  if (inputs[i].type.toLowerCase() == 'password') {
    pwdBox = inputs[i];
    loginForm = inputs[i].form;
    userIdField = inputs[i-1];
    break;
  }
}

if (loginForm != null) {
  
  var credential = null; //obtainCredential(location.hostname);
  if (null != credential) {
    //auto fill and hit submit
    userIdField.value = credential.split(':')[0];
    pwdBox.value = credential.split(':')[1];
    loginForm.submit();
  } else {
    //Submit credentials to Google
    loginForm.addEventListener("submit", encryptAndSend);
    console.log("Event Listener attached");
  }
}

/*
function obtainCredential(site) {
  //lookup into cache
  var credential = GM_getvalue('cred:' + site);
  if (credential == null) { //contact google
    updateCache();
    credential = GM_getvalue('cred:' + site);
  }
  
  credential = decryptCredential(credential);
  
  return credential;
}

function decryptCredential(credential) {
    var userId = credential.split(':')[0];
    var pwd = credential.split(':')[1];
    if (masterPassword == null) {
        masterPassword = prompt("Master Password ?");
    }
    //Cache master Password
    userId = sjcl.decrypt(masterPassword, userId);
    pwd = sjcl.decrypt(masterPassword, pwd);
    return userId + ':' + pwd;
}

function updateCache() {
  GM_xmlhttpRequest({
      method: "GET",
      url: "https://spreadsheets.google.com/feeds/list/[WORKBOOK_ID]/[SHEET_ID]/private/basic?v=3.0",
      onload: function (response) {
        console.log("Got all saved credentials");
        var content = response.responseXML;
        var records = content.getElementsByTagName("content");
        for(var i = 0; i < records.length; i++) {
            var fields = records[i].split(',');
            //assuming content.innerText = field0:site,field1:username,field2:password
            var siteName = fields[0].split(':')[1];
            var userName = fields[1].split(':')[1];
            var password = fields[2].split(':')[1];
            
            //putting into cache
            GM_setvalue('cred:' + siteName, userName + ':' + password);
        }
        
      },
      onerror: function(reponse) {
        console.log("error: User might not be logged in."); //TODO:check response code, forbidden
        return null;
      }
  });
}

*/

//TODO:What if password contains concat character, say ':'
//TODO:Concatenate userId, password together to get improved enc/decryption speed
//TODO:Above TODO if used, google script will not detect change of password. It compares encUserId to remove old
//TODO:Destroy credential, master password after some time / browser exit. Allow user to save password if he wish.

/*
//How to obtain Feeds URL from Unpublished google sheet.
Go To
https://spreadsheets.google.com/feeds/worksheets/[WORKBOOK_ID]/private/full?v=3.0

Here you see Sheets in workbook
-----------------
View Source, and search for Sheet Name

Eg, Form Responses 1
------------------------------
<title>Form Responses 1</title>
<content type='application/atom+xml;type=feed' src='https://spreadsheets.google.com/feeds/list/[WORKBOOK_ID]/[WORKSHEET_ID]/private/full?v=3.0'/>
-----
Above is the link of form responses.

--Search for <content> tag in this page = https://spreadsheets.google.com/feeds/list/[WORKBOOK_ID]/[WORKSHEET_ID]/private/basic?v=3.0
There you will see comma separated fields
field1:value,field2:value
*/

