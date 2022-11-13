const eventsSection = document.getElementById("events");

events.forEach(element => {
    eventsSection.innerHTML += `
        <div class="card" style="width: 35rem;" id=${element.id}>
        <img class="card-img-top" src="${element.src}" alt="Card image cap" height="600px">
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
            console.log("Added listener to " + element.id);
            createMembers(element.id.at(-1));
        })
    });
}

function createMembers(id){
    var eventName = document.getElementById("eventName");
    var EventName = document.getElementById("EventName");
    EventName.setAttribute('value', `${events[id-1]["name"]}`);
    eventName.innerHTML = `${events[id-1]["name"]}`;

    // Checking if event requires a team 
    if(events[id-1]["isTeam"] > 1){
        
    }

    var memberNo = document.getElementById("members_no");
    var memberNames = document.getElementById("members_name");
    var memberEmails = document.getElementById("members_email");

    for(let i = 1; i <=  parseInt(events[id]["isTeam"]); i++ )
    {
        var newLabel = document.createElement('div');
        newLabel.innerHTML = "# " + i.toString();
        newLabel.setAttribute('class', 'form-control form-control-md mb-2');

        memberNo.appendChild(newLabel);

        var newNameField = document.createElement('input');
        newNameField.setAttribute('type', 'text');
        newNameField.setAttribute('name', 'names[]');
        newNameField.setAttribute('class', 'form-control form-control-md mb-2');
        newNameField.setAttribute('placeholder', 'Name');

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

// Takes given list of element ids, extract name & value property & converts into object  
function convertToJSON(keys){
    jsonObj = {};
    keys.forEach(element => {
        key = document.getElementById(element);
        if( element == "members_email" ){
            var emails = [];
            $('#members_email input').each(function () {
                emails.push(this.value);
            });
            
            console.log(emails);
            jsonObj["members"] = emails;
        }
        else
            jsonObj[key.name] = key.value;
    });

    return JSON.stringify(jsonObj);
}


function register_team(){
    
    console.log("In register team");        

    var JSON = convertToJSON(["TeamName","EventName", "members_email"]);
    console.log(JSON);  
    
    // //Make request 
    // request('http://172.22.194.82:3000/events/registration', JSON, "POST");
}

//eventName
