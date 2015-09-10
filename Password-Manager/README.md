# Our own Password Manager
using Google drive and Greasemonkey

Motivation
------------------
http://stackoverflow.com/questions/32265248/simulate-captive-login-with-greasemonkey-using-firefox-saved-password

Why new? Chrome's password manager is enough
---------------------------------------------------------
Read this [LifeHacker article](http://lifehacker.com/5944969/which-password-manager-is-the-most-secure)
Yes, LastPass is good choice. but ... 

0. Its not fully free and open source, and too rich for our needs.
1. It does not work with captive-portal.
1. LastPass stores our encrypted credentials in their cloud, we are unsure about its security.
2. We dont own what it does.

Idea
---------------
Store our credentials in google drive, that can be fetched only if we are already logged-in. Google offers [two-step verification](https://www.google.com/landing/2step/), so nobody can retrieve our credentials without stealing our phone.

<b>Initialization</b>

0. Prompt for master password.
1. Store them in browser cache.
2. Master password should expire after some time-span OR browser restart.

<b>Password Storing</b>

0. Auto-detect login forms and grab credentials.
1. Encrypt credentials with master password.
2. Submit them to Google Sheet.

<b>Password Autofill</b>

0. Detect login form.
1. Retrieve credentials from google sheet. i.e, ``getCredentials(pageURL);``
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
