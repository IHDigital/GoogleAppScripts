var getResponseListToken = "[LIST_TOKEN]";// Get it from List Setting.
var nameFiledNumber  = 1; //Name field positon
var apiKey = "[API_KEY]";

function install() {
    // Deletes all triggers in the current project.
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
        ScriptApp.deleteTrigger(triggers[i]);
    }
    var form = FormApp.getActiveForm();
    ScriptApp.newTrigger('onFormSubmit')
        .forForm(form)
        .onFormSubmit()
        .create();
}

function onFormSubmit(e) {
    Logger.log("A response has been received!");
    var formResponse = e.response;
    var itemResponses = formResponse.getItemResponses();
    var email = formResponse.getRespondentEmail();
    var username = itemResponses[nameFiledNumber - 1].getResponse();
    console.log(email,username);
    postToGetResponse(email,username)
}

function postToGetResponse(email, name) {
    var data = { "campaign": { "campaignId": getResponseListToken }, "name": name, "email": email };
    var headers = {
        "X-Auth-Token": "api-key " + apiKey
    };
    var options = {
        "contentType": "application/json",
        "method": "POST",
        "headers": headers,
        "payload": JSON.stringify(data)
    };
  
    var response = UrlFetchApp.fetch("https://api.getresponse.com/v3/contacts", options);
}

