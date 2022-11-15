function reset(){
    loginBtn = document.getElementById("loginBtn");
    loginBtn.innerHTML = "Login";

    regBtn = document.getElementById("regBtn");
    regBtn.innerHTML = "Register";
}

//Get cookie - on login 
function autoLogin() {
    if (getCookie("user_email") !== "" && getCookie("user_name") !== "") {
        if (!document.baseURI.includes('/home.html')) {
            console.log("The cookie is not null");
            location.replace('/html/home.html');
        }
    }
    else {
        if (!document.baseURI.includes('/index.html')) {
            console.log("The cookie is null");
            window.location.href = "/html/index.html";
        }
    }
}


function checkValid(){
    if (getCookie("user_email") == "" && getCookie("user_name") == ""){
        console.log("why")
        location.href = "/html/index.html";
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//Delete cookie - on logout 
function eraseCookie() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    autoLogin();
}