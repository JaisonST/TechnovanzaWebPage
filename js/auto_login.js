autoLogin();

//Get cookie - on login 
function autoLogin() {
    if (getCookie("user_email") !== "") {
        if(!document.baseURI.includes('/home.html')){
            console.log("The cookie is not null");
            location.replace('/html/home.html');
        }
    }
    else {
        if(!document.baseURI.includes('/index.html')){
            console.log("The cookie is null");          
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
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=0';
    autoLogin();
}