/** ( this is DESIGN not actual code) 
 * Server side script (supposed to be callable from, client side javascript)
*/
function getCredentials(hostName) {
    Sheet sheet = getSheetById('id');
    for(var i =0;i < sheet.rowCount ; i++) {
        if ( sheet.cell(i, 'hostName').value() == e.parameters.hostName) { //credentials found
            var userId = sheet.cell(i, 'userId').value();
            var password = sheet.cell(i, 'password').value();
            return (userId, password);
        }
     }
     return (null, null); //we dont have credential for this hostName
 }