scanned = document.getElementById("scanned");
get_scanned();

function display_scanned(reg_event, time) {
    console.log("Scan", reg_event);
    for(i = 0; i<reg_event.length; i++){
        $('#scanned').owlCarousel('add', `<div class="card">
            <div class="box">
            <img src="${reg_event[i].src}" alt="">
                <div class="text">${reg_event[i].name}</div>
                <div class="subtitle">${time[i]}</div>
            </div>
            </div>
            `).owlCarousel('update');
    }
}

function get_scanned() {
    email = getCookie("user_email");
    email = email.replaceAll("'", "");
    
    if (email != "") {
        events_list = request(`https://www.technovanza-api.tk/getlogs/${email}`, null, "GET");
        console.log(events_list);
        events_list.then(res => res.data).
        then(events => {
            timings = [];
            scan_event = [];
            scan_list = events.logs;
            console.log(scan_list);

            scan_list.forEach(ele => {
                scan_event.push(map_scan_name(ele["event"]));
                time = ele["date"];
                time = moment(time).format('MM/DD/YYYY || h:mma');
                timings.push(time);
            });
            
            console.log("Scan Event", scan_event);

            display_scanned(scan_event, timings);
        })
    }

}

// Name to event_list mapping
function map_scan_name(name) {
    name = name.replaceAll('_', ' ');
    var findEvent = events.find(x => x.name.toLowerCase() == name.toLowerCase());
    return findEvent;
}