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

0. Encrypt credentials with master password, store them on Google Drive.
1. Retrieve them using Greasemonkey user script.
2. Ask master password to decrypt.
3. Automatically fill them on login-forms, and simulate login button click .
2. Make script aware of captive login portal.
3. Google script attached to spreadsheet will automatically remind us to change password, via email.

Thanks To
-------------


References
===================
http://mxr.mozilla.org/firefox/source/toolkit/components/passwordmgr/src/nsLoginManager.js#626
