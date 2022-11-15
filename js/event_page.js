function get_info(){
    var r = document.querySelector(':root');

    const event_id = new URLSearchParams(window.location.search).get('id');
    console.log(event_id);
    event = events[event_id-1];

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
                    <button class="modal-button" onclick="openModal('registerEventModal', 'CloseRegisterEventModal');  createMembers(${event.id});">Register</button>
                </div>
            </div>
        </div>
    `;

    r.style.setProperty('--room-name', `"${event.room}"`)
}