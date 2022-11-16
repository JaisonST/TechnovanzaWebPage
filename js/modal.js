var modal, modalButton, closeButton;
let isOpened = false;

function openModal(modal_id, close_id, isEventRegistration = 0){
  SetModal(modal_id, close_id);
  
  if( isEventRegistration == 0) {    
    usernameValidation = document.getElementById("usernameValidation");
    emailValidation = document.getElementById("emailValidation");
    passwordValidation = document.getElementById("passwordValidation");
    emailValidationLogin = document.getElementById("emailValidationLogin");
    passwordValidationLogin = document.getElementById("passwordValidationLogin");

    usernameValidation.innerHTML = emailValidation.innerHTML = passwordValidation.innerHTML = emailValidationLogin.innerHTML = passwordValidationLogin.innerHTML = "";
    console.log("%cClearing Error Messages in Login/Registration Modal. ", 'color: dodgerblue;');
  }
  else if( isEventRegistration == 1){
    teamNameValidation = document.getElementById("teamNameValidation");
    emailValidation = document.getElementById("emailValidation");
    
    teamNameValidation.innerHTML = emailValidation.innerHTML = "";
    console.log("%cClearing Error Messages in Event Registration Modal. ", 'color: dodgerblue;');
  }
  console.log("%cOpening Modal with ID: " + modal_id.toString(), 'color: green;');
  console.log("%cModal Close button selected: " + close_id.toString(), 'color: lightskyblue;');
  modal.classList.add("is-open");
};

function closeModal(){
  modal.classList.remove("is-open");
  console.log("%cClosing Modal with ID: " + modal.id.toString(), 'color: red;');
};

function SetModal(modalID, closeButtonID){  
  modal = document.getElementById(modalID.toString());
  closeButton = document.getElementById(closeButtonID.toString());
  
  closeButton.addEventListener("click", closeModal);
}