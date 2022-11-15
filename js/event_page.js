async function getParticipant(eventname) {
    console.log(eventname);
    eventname = eventname.replaceAll(' ', '_');

    /* fetch JSON data and parse */
    const url = `https://www.technovanza-api.tk/events/get_registered_teams/${eventname}`;
    const raw_data = await (await fetch(url)).json();

    rows = [];
    for (i = 0; i < raw_data.length; i++) {
        row = {};
        row["Team Name"] = raw_data[i].teamName;
        for (j = 0; j < raw_data[i].members.length; j++) {
            row[`Member_${j + 1}`] = raw_data[i].members[j].email;
        }
        rows.push(row);
    }

    /* generate worksheet and workbook */
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");


    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [Object.keys(rows[0])], { origin: "A1" });

    /* calculate column width */
    const max_width = rows.reduce((w, r) => Math.max(w, r.Member_1.length), 10);
    worksheet["!cols"] = [{ wch: max_width }, { wch: max_width }, { wch: max_width }, { wch: max_width }, { wch: max_width }, { wch: max_width }];

    /* create an XLSX file and try to save to Presidents.xlsx */
    XLSX.writeFile(workbook, `${eventname}.xlsx`);
}

function get_info() {
    hidden = "";

    if (getCookie("isVolunteer") == "") {
        hidden = "hidden";
    }
    else {
        hidden = ""
    }

    var r = document.querySelector(':root');

    const event_id = new URLSearchParams(window.location.search).get('id');
    console.log(event_id);
    var event = events[event_id - 1];

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
                <div class="modal-buttons">
                    <button class="modal-button download" id="downloadBtn" ${hidden} onclick="getParticipant('${event.name}')">Download Participant List</button>
                </div>
            </div>
        </div>
    `;
    r.style.setProperty('--room-name', `"${event.room}"`)
}