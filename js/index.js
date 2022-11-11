function request(url, data, method) {
    console.log(url);
    console.log(data);

    fetch(url, {
        method: method,
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res);
        if (res.status == 200) {
            var date = new Date();
            date.setTime(date.getTime() + (2 * 24 * 60 * 60 * 1000));
            document.cookie = `user_email=${email}; expires=` + date.toGMTString();
            $('#myModal').modal('hide');

            window.location = '/html/home.html';
       }
        else {
            showAlert();
        }
    });
}

// Takes given list of element ids, extract name & value property & convert into object  
function convertToJSON(keys) {
    jsonObj = {};

    keys.forEach(element => {
        key = document.getElementById(element);
        jsonObj[key.name] = key.value;
    });

    return JSON.stringify(jsonObj);
}

function register_user() {
    //Validate entries      
    if (validate(email.value, password.value)) {
        //Make request 
        request('https://www.technovanza-api.tk/register', convertToJSON(["usernameTextField", "emailTextField", "passwordTextField"]), "POST");
    }

    // Clear text fields 
    username.value = '';
    password.value = '';
    email.value = '';
}

function login_user() {
    email = document.getElementById("email");
    password = document.getElementById("password");

    request('https://www.technovanza-api.tk/login', convertToJSON(["email", "password"]), "POST", email.value);

    // Clear text fields 
    password.value = '';
    email.value = '';
}

function validate(email, password) {
    // Regex expression for email validation 
    var re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Regex expression for password validation 
    var pre = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,40}$/;

    // To keep track of validated fields 
    flag = 0;

    emailValidation = document.getElementById("emailValidation");
    if (!(re.test(email))) {
        emailValidation.innerHTML = "Please enter a valid email id";
    }
    else {
        emailValidation.innerHTML = "";
        flag += 1;
    }

    passwordValidation = document.getElementById("passwordValidation");
    if (!pre.test(password)) {
        passwordValidation.innerHTML = "Password should be atleast 8 characters, containing atleast 1 digit, uppercase letter and special character";
    }
    else {
        passwordValidation.innerHTML = "";
        flag += 1;
    }

    if (flag == 2) {
        return true;
    }
}

// Function to show alert using Sweet Alert
function showAlert() {

    $('#myModal').modal('hide');
    Swal.fire({
        icon: 'error',
        title: 'Error occured!...',
        text: 'User registration failed.',
        confirmButtonColor: '#5cbdaa',
    })
}


email = document.getElementById("emailTextField");
password = document.getElementById("passwordTextField");
username = document.getElementById("usernameTextField");

password.addEventListener('blur', () => {
    validate(email.value, password.value);
});