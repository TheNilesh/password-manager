# Password Manager
Using Google Spreadsheet and Greasemonkey.

Motivation
------------------
http://stackoverflow.com/questions/32265248/simulate-captive-login-with-greasemonkey-using-firefox-saved-password

Why new?
---------------------------------------------------------
Read this [LifeHacker article](http://lifehacker.com/5944969/which-password-manager-is-the-most-secure).
Yes, LastPass is good choice. but ... 

0. Its not free and open source, and too rich for our needs.
1. It could not detect captive-login page.
2. We dont own what it does.

Brief Idea
---------------
Store our credentials in google sheet, that can be fetched only if we are logged-in to Google.

<b>Initialization</b>

0. Prompt for master password.
1. Optionally, store it in browser cache.
2. Master password should expire after some time-span OR browser restart.

<b>Password Storing</b>

0. Auto-detect login forms and grab credentials.
1. Encrypt credential with master password.
2. Submit it to Google Sheet.

<b>Password Autofill</b>

0. Detect login form.
1. Retrieve credentials from google sheet private feeds. i.e, ``getCredential(location.hostname);``
2. Fill them on login-forms, and simulate login button click .

<b>Features</b>

0. Make script aware of captive login portal, by manually marking some login page as captive portal.
1. Google script attached to spreadsheet will periodically remind us to change password, via email.
2. Automatic password generation. Rather than password reuse it would generate password which is lexicographically related to site URL.

TODO
-------------
 - No need of creating Google form, we can directly manipulate sheet using this [API](https://developers.google.com/google-apps/spreadsheets/?hl=en)
 - Automate process

References
===================
http://mxr.mozilla.org/firefox/source/toolkit/components/passwordmgr/src/nsLoginManager.js#626
