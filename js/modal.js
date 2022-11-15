var modal, modalButton, closeButton;
let isOpened = false;

function openModal(modal_id, close_id){
  SetModal(modal_id, close_id);
  console.log("%cOpening Modal with ID: " + modal.id.toString(), 'color: green;');
  console.log("%cModal Close button selected: " + closeButton.id.toString(), 'color: lightskyblue;');
  modal.classList.add("is-open");
};

function closeModal(){
  
  usernameValidation = document.getElementById("usernameValidation");
  emailValidation = document.getElementById("emailValidation");
  passwordValidation = document.getElementById("passwordValidation");
  emailValidationLogin = document.getElementById("emailValidationLogin");
  passwordValidationLogin = document.getElementById("passwordValidationLogin");

  usernameValidation.innerHTML = emailValidation.innerHTML = passwordValidation.innerHTML = emailValidationLogin.innerHTML = passwordValidationLogin.innerHTML = "";
  console.log("%cClearing Error Messages: ", 'color: dodgerblue;');

  modal.classList.remove("is-open");
  console.log("%cClosing Modal with ID: " + modal.id.toString(), 'color: red;');
};

function SetModal( modalID, closeButtonID ){  
  modal = document.getElementById(modalID.toString());
  closeButton = document.getElementById(closeButtonID.toString());
  
  closeButton.addEventListener("click", closeModal);
}
