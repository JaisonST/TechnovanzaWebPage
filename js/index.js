function register_user() {
    //Validate entries      
    if (validate(email.value, password.value)) {
        //Make request 
        res = request('https://www.technovanza-api.tk/register', convertToJSON(["usernameTextField", "emailTextField", "passwordTextField"]), "POST");
        handle_response(res, "User registration failed", "#registerModal");
        
    }

    // Clear text fields 
    username.value = '';
    password.value = '';
    email.value = '';
}

function login_user() {
    email = document.getElementById("email");
    password = document.getElementById("password");

    if (email.value != "" && password.value != "") {
        res = request('https://www.technovanza-api.tk/login', convertToJSON(["email", "password"]), "POST", email.value);
        handle_response(res, "User login failed", "#loginModal");
    }

    // Clear text fields 
    password.value = '';
    email.value = '';
}

function handle_response(res, message, modal_id){
    res.then(user => {
        if (user.status == 200) {
            user.data.then(user_data => {
                if(modal_id == "#registerModal"){
                    showAlert(modal_id, "You have successfully registered", "success", "Registered");
                }

                var date = new Date();
                date.setTime(date.getTime() + (2 * 24 * 60 * 60 * 1000));
                document.cookie = `user_email=${user_data["user_data"]["email"]}; expires=` + date.toGMTString();
                // $(modal_id).modal('hide');
                
                window.location = '/html/home.html';
            });
        }
        else{
            user.data.then(user_data =>{
                showAlert(modal_id, message + ": " + user_data["error"], 'error', 'Error occured!...');
            });
        }
    });
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

// email = document.getElementById("emailTextField");
// password = document.getElementById("passwordTextField");
// username = document.getElementById("usernameTextField");

// password.addEventListener('blur', () => {
//     validate(email.value, password.value);
// });