//Get cookie - on login 
function autoLogin(baseURI) {
    if (getCookie("user_email") !== "" && getCookie("user_name") !== "") {        
        console.log("%cCookie is Set " + document.baseURI, 'color: cyan' );
        console.log("%c!document.baseURI.includes(baseURI) " + !document.baseURI.includes(baseURI), 'color: red');
        if (!document.baseURI.includes(baseURI)) {
            console.log("%c!document.baseURI.includes(baseURI)" + !document.baseURI.includes(baseURI), 'color: red');
            location.replace(baseURI);
        }
    }
    else {    
        console.log("%cCookie is not Set" + document.baseURI, 'color: purple');
        if (!document.baseURI.includes('/index.html')) {
            console.log("%c!document.baseURI.includes '/index.html' " + !document.baseURI.includes(baseURI) , 'color: red');
            window.location.href = "/html/index.html";
        }
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