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

var masterPwd = null;
var userIdField = null;
var pwdBox;

function encryptAndSend() {
  if (masterPwd == null) {
    masterPwd = prompt("Master Password ?");
  }
  
  var encUser = utf8_to_b64( JSON.stringify(sjcl.encrypt(masterPwd, userIdField.value)) );
  var encPwd = utf8_to_b64( JSON.stringify(sjcl.encrypt(masterPwd, pwdBox.value)) );

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
    pwdBox.value = credential.getPassword();
    userIdField.value = credential.getUserName();
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
  var credential = GM_getvalue("cred:" + site);
  
  if (credential == null) { //contact google
    obtainFromGoogle(site);
  }
  return credential;
}

function obtainFromGoogle(site) {
  GM_xmlhttpRequest({
      method: "GET",
      url: "[sheet_feeds_URL]",
      onload: function (response) {
        console.log("Got list of credentials");
      },
      onerror:    function(reponse) {
        console.log("error: User might not be logged in.");
        return null;
      }
  });
}
*/

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

