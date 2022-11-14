registered = document.getElementById("registered");
get_events();

function display_event(reg_event) {
    console.log("Reg", reg_event);
    // registered.innerHTML = "";
    reg_event.forEach(element => {
        $('#registered').owlCarousel('add', `<div class="card">
        <div class="box">
        <img src="${element.src}" alt="">
        <div class="text">${element.name}</div>
        <div class="subtitle">${element.room}</div>
        <p>${element.day1}</p>
        <p>${element.day2}</p>
        </div>
        </div>
        `).owlCarousel('update');
    });
}

function get_events() {
    email = getCookie("user_email");
    email = email.replaceAll("'", "");
    
    if (email != "") {
        events_list = request(`https://www.technovanza-api.tk/user/getevents/${email}`, null, "GET");
        console.log(events_list);
        events_list.then(res => res.data).
        then(events => {
            reg_event = [];
            reg_list = events.events;
            console.log(reg_list);
            reg_list.forEach(ele => {
                reg_event.push(map_name(ele["eventname"]));
            });
            display_event(reg_event);
        })
    }

}

// Name to id mapping
function map_name(name) {
    name = name.replaceAll('_', ' ');
    var findEvent = events.find(x => x.name == name);
    return findEvent;
}
