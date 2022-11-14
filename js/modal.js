var modal, modalButton, closeButton;
let isOpened = false;

function openModal(modal_id){
  console.log(modal_id);
  SetModal(modal_id, "CloseModalButton");
  // console.log("%cOpening Modal with ID: " + modal.id.toString(), 'color: Green;');
  // console.log("%cModal Close button selected: " + closeButton.id.toString(), 'color: Orange;');
  modal.classList.add("is-open");
};

function closeModal(){
  modal.classList.remove("is-open");
};

function SetModal( modalID, closeButtonID ){  
  modal = document.getElementById(modalID.toString());
  closeButton = document.getElementById(closeButtonID.toString());
  
  closeButton.addEventListener("click", closeModal);
}
