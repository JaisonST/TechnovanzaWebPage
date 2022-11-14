const eventsSection = document.getElementById("events");
var isTeam = 0;

events.forEach(element => {
    eventsSection.innerHTML += `
        <div class="card" style="width: 35rem;" id=${element.id}>
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <h6 class="card-subtitle text-muted">${element.room}</h6>
                <br>
                <p class="card-text">${element.desc}</p>
                <p class="card-text"><strong> ${element.faculty_coordinator} </strong></p>
                <p class="card-text">${element.student_coordinators}</p>
                <hr>
                <p class="card-text">${element.time}</p>
                <br>
                <div class="justify-content-center">
                    <a class="btn btn-primary event_reg" id="reg_event_${element.id}" data-bs-toggle="modal" data-bs-target="#eventModal">Register</a>
                </div>
            </div>
        </div>
    `;
});

function load_events() {
    event_reg = document.getElementsByClassName("event_reg");

    Array.from(event_reg).forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            createMembers(element.id.at(-1));
        })
    });
}


// UPDATED createMembers() FUNCTION
// 1. Team name visibility 
// 2. Clear Modal on reload before creating teamm member details

// Takes the number of team members and creates a multiple member name and email textfields
function createMembers(id) {

    var eventName = document.getElementById("eventName");
    var EventName = document.getElementById("EventName");
    formatted_name = events[id - 1]["name"].replaceAll(' ', '_');
    EventName.setAttribute('value', formatted_name);
    eventName.innerHTML = `${events[id - 1]["name"]}`;

    isTeam = parseInt(events[id - 1]["isTeam"]);
    // 1. Checking if event requires a team & toggles visiblity of Team Name
    var teamNameInp = document.querySelector("#teamNameInp");
    if (isTeam > 1)
        teamNameInp.removeAttribute("hidden");
    else {
        teamNameInp.setAttribute("hidden", '');
        teamNameInp.removeAttribute("required");
    }

    // Selecting Team Member No, Name and Email parent divs from Modal
    var memberNo = document.querySelector("#members_no");
    var memberNames = document.querySelector("#members_name");
    var memberEmails = document.querySelector("#members_email");

    // 2. Clear Team Member No, Name and Email from Modal
    DeleteChildElements("members_no");
    DeleteChildElements("members_name");
    DeleteChildElements("members_email");

    for (let i = 1; i <= parseInt(events[id - 1]["isTeam"]); i++) {
        var newLabel = document.createElement('input');
        newLabel.value = "# " + i.toString();
        newLabel.setAttribute('type', 'text');
        newLabel.setAttribute('class', 'form-control form-control-md mb-2');
        newLabel.setAttribute('readonly', '');

        memberNo.appendChild(newLabel);

        var newNameField = document.createElement('input');
        newNameField.setAttribute('type', 'text');
        newNameField.setAttribute('name', 'names[]');
        newNameField.setAttribute('class', 'form-control form-control-md mb-2');
        newNameField.setAttribute('placeholder', 'Name');
        newNameField.setAttribute('required', '');

        memberNames.append(newNameField);

        var newEmailField = document.createElement('input');
        newEmailField.setAttribute('type', 'text');
        newEmailField.setAttribute('name', 'members[]');
        newEmailField.setAttribute('class', 'form-control form-control-md mb-2');
        newEmailField.setAttribute('placeholder', 'Email');
        newEmailField.setAttribute('required', '');

        memberEmails.append(newEmailField);
    }
}

function register_team() {

    //Validate entries

    // //Make request 
    res = request('https://www.technovanza-api.tk/events/registration', convertToJSON(["TeamName", "EventName", "members_email"]), "POST");
    console.log(res);
    res.then(event => {
        if (event.status == 200) {
            event.data.then(event_data => {
                showAlert("#eventModal", "You have successfully registered for the event", "success", "Registered");
                // $(modal_id).modal('hide');
            });
        }
        else{
            event.data.then(error_message =>{
                showAlert("#myModal", "Registration failed: " + error_message["error"], 'error', 'Error occured!...');
            });
        }
    });
}

//eventName
