/**
 * A google script for send shopify customer info to getresponse with custom fiedls
 *
 * change the api keya  
 * if same email is unable to create it directly, and unbale to update via email, need search email first the get the ID, then you can update
 * for custom fields ID, can get it from /v3/custom-fields. then choose which fields you want to put in postToGetResponse function
 * 
 * all script that need push data to external service need run the script first, then can be trigged via web app.
 * 
 * refer the script the edit which data you want, then deply this script as web app
 * 
 */
var getResponseListToken = "[LIST TOKEN]";// Get it from List Setting. eg:B1ZyE
var apiKey = "]API_KEY]"; //Get/Create it from GetResponse API page. 

function sendPost(url,data) {
    var headers = {
        "X-Auth-Token": "api-key " + apiKey
    };
    var options = {
        "contentType": "application/json",
        "method": "POST",
        "muteHttpExceptions":true,
        "headers": headers,
        "payload": JSON.stringify(data)
    };
   Logger.log(JSON.stringify([url,data]));
   var response = UrlFetchApp.fetch(url, options);
   Logger.log(response.getContentText());
   return JSON.parse(response.getContentText());
}
function postToGetResponse(contactId,email, name, birthday) {
    var data = { "campaign": { "campaignId": getResponseListToken },
                 "email": email, customFieldValues:[
                  {customFieldId:'VGGhiK',value:[birthday]}
                ] };
  if (name) {
  data.name = name;
  }

  var response = sendPost("https://api.getresponse.com/v3/contacts/"+contactId, data);
}

function searchContact(email) {
  var data = {
    "subscribersType": [
        "subscribed",
        "undelivered",
        "removed",
        "unconfirmed"
    ],
    "sectionLogicOperator": "and",
    "section": [
        {
            "campaignIdsList": [
                "BsJQ5"
            ],
            "logicOperator": "and",
            "subscriptionDate": "all_time",
            "subscriberCycle": [
                "receiving_autoresponder",
                "not_receiving_autoresponder"
            ],
            "conditions": [
                {
                    "conditionType": "email",
                    "operatorType": "string_operator",
                    "operator": "is",
                    "value": email
                }
            ]
        }
    ]
};
  return sendPost("https://api.getresponse.com/v3/search-contacts/contacts", data);
 
}

function doPost(e) {
 let data = JSON.parse(e.postData.contents);
 //console.log(data);
 var existContact = searchContact(data.email);
 var contactId = "";
  if (existContact.length > 0) {
    contactId = existContact[0].contactId;
  }
 // console.log(existContact);
 postToGetResponse(contactId,data.email,data.first_name?`${data.first_name} ${data.last_name}`:null, data.note.replace('Birthday: ',''));
 return ContentService.createTextOutput(e.postData.contents).setMimeType(ContentService.MimeType.JAVASCRIPT);
}