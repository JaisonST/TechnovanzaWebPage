
username = document.getElementById("usernameTextField");
email = document.getElementById("emailTextField");
password = document.getElementById("passwordTextField");

password.addEventListener('blur', () => {
    validate(email.value, password.value);
});

function register_user() {
    //Validate entries      
    
    // 6:10 PM 15/11/2022 
    // Username Validation with Error message
    usernameValidation = document.getElementById("usernameValidation");
    inValidUserName = 0;
    if( isStringNullOrWhiteSpace(username.value) ){        
        console.log("%cUsername is Invalid: " + isStringNullOrWhiteSpace(username.value), 'color: red;');
        usernameValidation.removeAttribute("hidden");
        usernameValidation.innerHTML = "Please enter a username";
        inValidUserName = 1;
    }
    else{
        usernameValidation.innerHTML = "";
        usernameValidation.setAttribute("hidden", "");
        inValidUserName = 0;
    }

    regBtn = document.getElementById("regBtn");
    if (validate(email.value, password.value) && inValidUserName == 1) {
        console.log
        //Make request 
        res = request('https://www.technovanza-api.tk/register', convertToJSON(["usernameTextField", "emailTextField", "passwordTextField"]), "POST");
        handle_response(res, "User registration failed", "#registerModal");
        regBtn.innerHTML = "Loading...";
    }
    else
    regBtn.innerHTML = "Register";

    // Clear text fields 
    username.value = '';
    password.value = '';
    email.value = '';
}

function login_user() {
    email = document.getElementById("email");
    password = document.getElementById("password");
    
    // 6:10 PM 15/11/2022 
    // Updated NULL email and Password validation as well
    emailValidationLogin = document.getElementById("emailValidationLogin");
    passwordValidationLogin = document.getElementById("passwordValidationLogin");
    loginBtn = document.getElementById("loginBtn");
    inValidInputs = 0;
    
    if( isStringNullOrWhiteSpace(email.value) ){        
        console.log("%cInvalid Email " + isStringNullOrWhiteSpace(username.value), 'color: red;');
        emailValidationLogin.removeAttribute("hidden");
        emailValidationLogin.innerHTML = "Please enter an email.";
        inValidInputs += 1;
    }
    else{
        emailValidationLogin.innerHTML = "";
        emailValidationLogin.setAttribute("hidden", "");
    }

    if( isStringNullOrWhiteSpace(password.value) ){        
        console.log("%cInvalid Password " + isStringNullOrWhiteSpace(password.value), 'color: red;');
        passwordValidationLogin.removeAttribute("hidden");
        passwordValidationLogin.innerHTML = "Please enter a password.";
        inValidInputs += 1;
    }
    else{
        emailValidationLogin.innerHTML = "";
        emailValidationLogin.setAttribute("hidden", "");
    }
    
    if ( inValidInputs == 0 ) {
        res = request('https://www.technovanza-api.tk/login', convertToJSON(["email", "password"]), "POST", email.value);
        
        handle_response(res, "User login failed", "#loginModal");
        loginBtn.innerHTML = "Loading...";
    }

    loginBtn.innerHTML = "Login";

    // Clear text fields 
    password.value = '';
    email.value = '';
}

function handle_response(res, message, modal_id){
    res.then(user => {
        if (user.status == 200) {
            user.data.then(user_data => {
                if(modal_id == "#registerModal"){
                    showAlert("You have successfully registered", "success", "Registered");
                }

                var date = new Date();
                date.setTime(date.getTime() + (2 * 24 * 60 * 60 * 1000));
                if(user_data["user_data"]["isVolunteer"]){
                    document.cookie = `user_isVolunteer=${user_data["user_data"]["isVolunteer"]}; expires=` + date.toGMTString();
                }
                
                if(user_data["user_data"]["isJudge"]){
                    document.cookie = `user_isJudge=${user_data["user_data"]["isJudge"]}; expires=` + date.toGMTString();
                }

                document.cookie = `user_email=${user_data["user_data"]["email"]}; expires=` + date.toGMTString();
                document.cookie = `user_name=${user_data["user_data"]["name"]}; expires=` + date.toGMTString();
                document.cookie = `user_id=${user_data["user_data"]["id"]}; expires=` + date.toGMTString();
                document.cookie = `user_role=${user_data["user_data"]["role"]}; expires=` + date.toGMTString();
                

                window.location = '/html/home.html';
            });
        }
        else{
            user.data.then(user_data =>{
                console.log("error")
                showAlert(message + ": " + user_data["error"], 'error', 'Error occured!...');
            });

            reset();
        }
    });
}

function validate(email, password) {
    // Regex expression for email validation 
    var re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Regex expression for password validation 
    // var pre = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,40}$/;

    // To keep track of validated fields 
    flag = 0;

    emailValidation = document.getElementById("emailValidation");
    if (!(re.test(email))) {
        emailValidation.innerHTML = "Please enter a valid email id";
        emailValidation.removeAttribute("hidden");
    }
    else {
        emailValidation.innerHTML = "";
        emailValidation.setAttribute("hidden", "");
        flag += 1;
    }

    passwordValidation = document.getElementById("passwordValidation");
    if (password.length < 6) {
        passwordValidation.innerHTML = "Password should be atleast 6 characters";
        passwordValidation.removeAttribute("hidden");
    }
    else {
        passwordValidation.innerHTML = "";
        passwordValidation.setAttribute("hidden", "");
        flag += 1;
    }

    if (flag == 2) {
        return true;
    }
}

// Add event listeners for event cards 
cards = document.getElementsByClassName('event-card');
Array.from(cards).forEach(element => {
    element.addEventListener('click', () =>{
        openModal('loginModal', 'CloseLoginModal');
    })
});