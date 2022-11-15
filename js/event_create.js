const eventsSection = document.getElementById("browse");
// var isTeam = 0;
load_events();

function load_events() {
    events.forEach(element => {
        eventsSection.innerHTML += `
            <div class="card event-card" id=${element.id}>
            <div class="box">
            <img src="${element.src}" alt="">
            <div class="text">${element.name}</div>
            </div>
            </div>
            `;
    });

    event_list = document.getElementsByClassName("event-card");
    Array.from(event_list).forEach(element => {
        element.addEventListener('click', e => {
            location.href = `/html/event_page.html?id=${element.id.at(-1)}`;
            // createMembers(element.id);
        })
    });
}



// UPDATED createMembers() FUNCTION
// 1. Team name visibility 
// 2. Clear Modal on reload before creating teamm member details

// Takes the number of team members and creates a multiple member name and email textfields
function createMembers(id = 5) {

    var eventName = document.getElementById("eventName");
    var EventName = document.getElementById("EventName");
    formatted_name = events[id - 1]["name"].replaceAll(' ', '_');
    EventName.setAttribute('value', formatted_name);
    eventName.innerHTML = `Register for ${events[id - 1]["name"]}`;

    isTeam = parseInt(events[id - 1]["isTeam"]);
    // 1. Checking if event requires a team & toggles visiblity of Team Name
    var teamNameInp = document.querySelector("#teamNameInp");
    var teamName = document.querySelector("#TeamName");
    isTeam = id;

    if (isTeam > 1){
        
        console.log("%cAdding hidden and required", "color: cyan");
        teamName.setAttribute("required", '');
        teamNameInp.removeAttribute("hidden");
    }
    else {
        teamName.removeAttribute("required");
        teamNameInp.setAttribute("hidden", '');
    }

    // Selecting Team Member No, Name and Email parent divs from Modal
    var memberFields = document.querySelector("#memberFields");

    // 2. Clear Team Member No, Name and Email from Modal
    DeleteChildElements("memberFields");

    memberFields.innerHTML = "";
    for (let i = 1; i <= parseInt(events[id - 1]["isTeam"]); i++) 
    {
        memberFields.innerHTML += `
            <div class="d-flex align-items-center" style="justify-content: space-around;">   
                <div class="input-block" style="width: 8%; border: none;">
                </div> 
                <div class="input-block" style="width: 14%;">
                    <label type="text" id=>#${i}</label>
                    </div> 
                    <div class="input-block" style="width: 60%;">
                    <input type="text" id="${i}_email" name="members[]" placeholder="Email" required>
                    </div>
                <div class="input-block" style="width: 8%; border: none;">
                </div> 
            </div>
            `;            
    }
}

function isStringNullOrWhiteSpace(str){
    if( str === undefined || str === null
                             || typeof str !== 'string'
                             || str.match(/^ *$/) !== null )
        return true;
    else 
        return false;
}

function ValidateEmail(email){
    
    // Regex expression for email validation 
    var re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!(re.test(email.toString()))) {
        return false;
    }
    else 
        return true;
}

function ValidateInputsByName(elementName, isEmail = 0){
    invalidInputs = 0;
    member_inputs = document.getElementsByName(elementName);
    Array.from(member_inputs).forEach(element => {  
        if( isStringNullOrWhiteSpace(element.value.toString()) )
            invalidInputs  += 1;
        if( isEmail == 1 && !ValidateEmail(element.value.toString()) )
            invalidInputs += 1;
        console.log("%cInvalid Input: " + invalidInputs.toString() 
                    + " Member text: " + element.value.toString(), 'color: orange;');
    });
    if( invalidInputs > 0 )
        return false;
    else
        return true;
}

function register_team() {
    
    var emailValidation = document.getElementById("emailValidation");
    console.log(isTeam);
    var flag = 0;
    //Validate Team Name
    if(isTeam > 1)
    {
        console.log("No of members > 0 " + isTeam.toString())
        var teamName = document.getElementById("TeamName");
        var teamNameValidation = document.getElementById("teamNameValidation");
        teamNameValidation.innerHTML = "";
        if( isStringNullOrWhiteSpace(teamName.value) ){
            flag += 1;
            // console.log('%cTeam > 1', 'color: Green;');
            console.log("%cTeam Name is not Valid. Flag = " + flag.toString(), 'color: yellow;');
            teamNameValidation.innerHTML = "Enter a Team Name";
            teamNameValidation.setAttribute('style', 'color: red;');
        }
    }

    emailValidation.innerHTML = "";
    if( ValidateInputsByName("members[]", 1) == false ){        
        flag += 1;
        console.log("%cEmail(s) are not Valid. Flag = " + flag.toString(), 'color: red;');
        emailValidation.innerHTML = "Email(s) are not Valid";    
        emailValidation.setAttribute('style', 'color: red;');    
    }

    if( flag == 0 )
    {
        console.log("%cValidation Complete. Flag = " + flag.toString(), 'color: green;');
        // //Make request 
        res = request('https://www.technovanza-api.tk/events/registration', convertToJSON(["TeamName", "EventName", "members_email"]), "POST");
        console.log(res);
        res.then(event => {
            if (event.status == 200) {
                event.data.then(event_data => {
                    showAlert("You have successfully registered for the event", "success", "Registered");
                    // $(modal_id).modal('hide');
                });
            }
            else{
                event.data.then(error_message =>{
                    showAlert("Registration failed: " + error_message["error"], 'error', 'Error occured!...');
                });
            }
        });
    }
}

function get_info(){
    var r = document.querySelector(':root');

    const event_id = new URLSearchParams(window.location.search).get('id');
    console.log(event_id);
    var event = events[event_id-1];

    infoSection = document.getElementById("infoLoad");
    infoSection.innerHTML = `
    <h1 class="title" id="room">${event.name}</h2>
        <div class="about-content">
            <div class="column left">
                <img src="${event.src}" alt="">
            </div>
            <div class="column right">
                <h2>About the event</h2>
                <p>
                    ${event.desc}
                </p>
                <br>
                <h2>Timings</h2>
                <div class="time">
                    <p>${event.day1}</p>
                    <p>${event.day2}</p>
                </div>
                <br>
                <h2>Faculty Coordinator</h2>
                <div class="faculty">
                    <p>${event.faculty_coordinator}</p>
                </div>
                <br>
                <h2>Student Coordinators</h2>
                <div class="student">
                    <p>${event.student_coordinators}</p>
                </div>
                <br>
                <h2>Participant Count</h2>
                <div class="count">
                    <p>${event.isTeam}</p>
                </div>

                <br><br>
                <div class="modal-buttons">
                    <button class="modal-button" onclick="openModal('registerEventModal', 'CloseRegisterEventModal'); ${ createMembers(event.isTeam) }">Register</button>
                </div>
            </div>
        </div>
    `;

    r.style.setProperty('--room-name', `"${event.room}"`)
}

// SANIA's FUNCTION
// function register_team() {

//     //Validate entries

//     // //Make request
//     res = request('https://www.technovanza-api.tk/events/registration', convertToJSON(["TeamName", "EventName", "members_email"]), "POST");
//     console.log(res);
//     res.then(event => {
//         if (event.status == 200) {
//             event.data.then(event_data => {
//                 showAlert("#eventModal", "You have successfully registered for the event", "success", "Registered");
//                 // $(modal_id).modal('hide');
//             });
//         }
//         else{
//             event.data.then(error_message =>{
//                 showAlert("#myModal", "Registration failed: " + error_message["error"], 'error', 'Error occured!...');
//             });
//         }
//     });
// }

//eventName
