// ==UserScript==
// @name        RetrievePassword
// @namespace   https://github.com/TheNilesh
// @include     *
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/* include Stanford Javascript Crypto Library */

var loginForm = getLoginForm();
var masterPassword = prompt('masterPassword ? ');

if (loginForm != null) {
	var usr, pwd;
	usr, pwd = GoogleApp.getCredentials(location.hostname);
	if (usr != null) {
		loginForm.userIdField.value = usr;
		loginForm.passwordField.value = sjcl.decrypt(masterPassword, pwd);
		if (autoLogin == true) {
			loginForm.submit();
		}
	}
}