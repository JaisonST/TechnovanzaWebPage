/*=============== SHOW PROFILE MODAL ===============*/
const showProfileModal = (openButton, modalContent) =>{
    const openBtn = document.getElementById(openButton),
    modalContainer = document.getElementById(modalContent)
    
    if(openBtn && modalContainer){
        openBtn.addEventListener('click', ()=>{
            //set name 
            var name = getCookie("user_name");
            var name_element = document.getElementById("profile-modal-name");
            name_element.innerHTML = `Hey ${name}!`; 
            
            //set qr code 
            var email = getCookie("user_email");
            const qr = document.getElementById('qrcode');
            qr.innerHTML = '';
            const qrcode = new QRCode('qrcode', {
                text: email,
                width: 150,
                height: 150,
            });

            modalContainer.classList.add('show-profile_modal')
        })
    }
}
showProfileModal('open-profile-modal','modal-profile-container')

/*=============== CLOSE PROFILE MODAL ===============*/
const closeProfileBtn = document.querySelectorAll('.close-profile-modal')

function closeProfileModal(){
    const modalContainer = document.getElementById('modal-profile-container')
    modalContainer.classList.remove('show-profile_modal')
}
closeProfileBtn.forEach(c => c.addEventListener('click', closeProfileModal))