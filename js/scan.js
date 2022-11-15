// Qr Scan Function 
// 15/11/2022 6:53 PM 
function scan_QR() {    
    // Perform Validations
    email = "brandon@email.com";
    eventName = "Lazer_maze";
    
    // console.log("%cEmail is Valid " + !isStringNullOrWhiteSpace(email).toString(), 'color: green;');
    // console.log("%cEvent Name is Valid " +!isStringNullOrWhiteSpace(eventName).toString(), 'color: green;');
    
    if ( !isStringNullOrWhiteSpace(email) && !isStringNullOrWhiteSpace(eventName) ){
        console.log("%cValidation Complete.", 'color: green;');
        // Make request 
        res = request('https://www.technovanza-api.tk/log', ConvertEmailEventNameToJSON(email, eventName), "POST");
        console.log(res);
        res.then(event => {
            if (event.status == 200) {
                event.data.then(event_data => {
                    showAlert("Done", "success", "");
                    // $(modal_id).modal('hide');
                });
            }
            else{
                event.data.then(error_message =>{
                    showAlert("Scan Unsuccessful" + error_message["error"], 'error', 'Error occured!...');
                });
            }
        });
    }
}

function ConvertEmailEventNameToJSON( email, eventName ){
    jsonObj = {};
    jsonObj["email"] = email.toString();
    jsonObj["eventname"] = eventName.toString();
    console.log("%cJSON: " + JSON.stringify(jsonObj), 'color: cyan');
    return JSON.stringify(jsonObj);
}