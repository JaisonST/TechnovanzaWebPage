
function onScanSuccess(decodedText, decodedResult) {
    var scanned_res = document.getElementById("scanned_result");
    scanned_res.innerHTML = `${decodedText}`; 
    html5QrcodeScanner.clear();
}
var html5QrcodeScanner = new Html5QrcodeScanner(
	"qr-reader", { fps: 10, qrbox: 100 });
html5QrcodeScanner.render(onScanSuccess);

function submitscan(){
    var scanned_res = document.getElementById("scanned_result");
    var event = document.getElementById("event_choice");

    console.log(scanned_res)
    console.log(event)
}