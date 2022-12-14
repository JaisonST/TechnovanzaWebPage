
function onScanSuccess(decodedText, decodedResult) {
    var scanned_res = document.getElementById("scanned_result");
    scanned_res.innerHTML = `${decodedText}`;

    console.log(scanned_res);
    html5QrcodeScanner.clear();
    console.log("Hide Reader");
    QRReader.setAttribute("hidden", "");
}

QRReader = document.getElementById("qr-reader");

var html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: 100 });
html5QrcodeScanner.render(onScanSuccess);

function submitscan() {
    var email = document.getElementById("scanned_result").innerHTML;
    var eventName = document.getElementById("event_choice").value;

    console.log(email);
    console.log(eventName);

    // QR Scan
    // Perform Validations

    console.log("%cEmail is Valid " + !isStringNullOrWhiteSpace(email).toString(), 'color: green;');
    console.log("%cEvent Name is Valid " + !isStringNullOrWhiteSpace(eventName).toString(), 'color: green;');

    if (!isStringNullOrWhiteSpace(email) && !isStringNullOrWhiteSpace(eventName)) { 
        console.log("%cValidation Complete.", 'color: green;');
        // Make request 
        res = request('https://www.technovanza-api.tk/log', ConvertEmailEventNameToJSON(email, eventName), "POST");
        console.log(res);
        res.then(event => {
            if (event.status == 200) {
                event.data.then(event_data => {
                    showAlert("Scan successful", "success", `Email: ${email} Logged.`);
                    closeModal();
                });
            }
            else {
                event.data.then(error_message => {
                    showAlert("Scan Unsuccessful" + error_message["error"], 'error', 'Error occured!...');
                    closeModal();
                });
            }
        });
    }
    console.log("Show Reader");
    QRReader.removeAttribute("hidden");
    html5QrcodeScanner.render(onScanSuccess);
    document.getElementById("event_choice").selectedIndex = 0; 
}

function ConvertEmailEventNameToJSON(email, eventName) {
    jsonObj = {};
    jsonObj["email"] = email.toString();
    jsonObj["eventname"] = eventName.toString();
    console.log("%cJSON: " + JSON.stringify(jsonObj), 'color: cyan');
    return JSON.stringify(jsonObj);
}