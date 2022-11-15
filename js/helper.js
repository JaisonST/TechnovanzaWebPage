// Takes given list of element ids, extract name & value property & convert into object  
// function convertToJSON(keys) {
//     jsonObj = {};

//     keys.forEach(element => {
//         key = document.getElementById(element);
//         jsonObj[key.name] = key.value;
//     });

//     return JSON.stringify(jsonObj);
// }

// UPDATED convertToTJSON() FUNCTION
// 1. For non team events, the team's value is set to the participant's name

// Takes given list of element ids, extract name & value property & converts into object  
function convertToJSON(keys) {
    jsonObj = {};
    keys.forEach(element => {
        key = document.getElementById(element);

        if (element == "TeamName") {
                jsonObj[key.name] = key.value;
        }
        else {
            if (element == "members_email") {
                var emails = [];
                $('input[name="members[]"]').each(function () {
                    emails.push({"email": `${this.value}`});
                });

                console.log(emails);
                jsonObj["members"] = emails;
            }
            else
                jsonObj[key.name] = key.value;
        }
    });

    return JSON.stringify(jsonObj);
}

// POST/GET requests
async function request(url, data, method) {
    console.log(url)
    console.log(data);
    const res = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    response = {
        "status": res.status,
        "data": res.json(),
    }

    return response;
}

// Function to show alert using Sweet Alert
function showAlert(text, icon, title) {
    closeModal();
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonColor: '#66aedf',
    })
}

// Utility function to delete all input fields by passing the parent class name 
function DeleteChildElements(parentClassName) {
    var parentTag = document.getElementById(parentClassName.toString());
    if (!parentTag)
        return;
    else
        while (parentTag.firstChild) {
            parentTag.firstChild.remove();
        }
}