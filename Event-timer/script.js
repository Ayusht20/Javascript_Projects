let events = document.querySelector("ol");
let message = document.querySelector(".message");
let add = document.querySelector(".add");
let bd = document.querySelector(".delete");

let popup = document.querySelector(".popup");
let saveBtn = document.querySelector("#save");
let cancelBtn = document.querySelector("#cancel");
let eventInput = document.querySelector("#eventInput");
let timeInput = document.querySelector("#timeInput");


let messageBox = (text, color) => {
    message.innerText = text;
    message.style.backgroundColor = color;
    message.style.display = "block";
    setTimeout(() => {
        message.style.display = "none";
    }, 1000);
};


let createListItem = (event) => {
    let li = document.createElement("li");

    let input = document.createElement("input");
    input.type = "checkbox";

    let text = document.createTextNode(" " + event);

    let timer = document.createElement("span");

    li.append(input, text, timer);
    events.appendChild(li);

    return li;
};


let saveEvent = (event, targetTime) => {
    let saved = JSON.parse(localStorage.getItem("eventing")) || [];

    saved.push({
        name: event,
        time: targetTime
    });

    localStorage.setItem("eventing", JSON.stringify(saved));
};

// Auto delete
let AutoDelete = (event) => {
    let saved = JSON.parse(localStorage.getItem("eventing")) || [];
    saved = saved.filter(evt => evt.name !== event);
    localStorage.setItem("eventing", JSON.stringify(saved));
    messageBox("Event completed!", "#0699fc");
};


let deleteEvent = () => {
    let list = document.querySelectorAll("li");
    let saved = JSON.parse(localStorage.getItem("eventing")) || [];
    let found = false;

    list.forEach(li => {
        let check = li.querySelector("input[type='checkbox']");
        if (check.checked) {
            let del = li.childNodes[1].textContent.trim();
            li.remove();

            saved = saved.filter(ev => ev.name !== del);
            localStorage.setItem("eventing", JSON.stringify(saved));

            messageBox("Task completed!", "#0699fc");
            found = true;
        }
    });

    if (!found) {
        messageBox("Select a task!", "red");
    }
};
let formatTime = (seconds) => {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    let result = "";

    if (hrs > 0) result += `${hrs}h `;
    if (mins > 0 || hrs > 0) result += `${mins}m `;
    result += `${secs}s`;

    return result;
};
let showTime = (li, targetTime) => {
    let t = li.querySelector("span");

    let intervalId = setInterval(() => {
        let now = Date.now();
        let diff = targetTime - now;

        if (diff <= 0) {
            clearInterval(intervalId);
            li.remove();
        } else {
            let seconds = Math.floor(diff / 1000);
            t.innerText = ` (${formatTime(seconds)})`;
        }
    }, 1000);
};


let loadEvent = () => {
    let saved = JSON.parse(localStorage.getItem("eventing")) || [];

    saved.forEach(evt => {
        let now = Date.now();
        let diff = evt.time - now;

        if (diff > 0) {
            let li = createListItem(evt.name);
            showTime(li, evt.time);

            setTimeout(() => {
                li.remove();
                AutoDelete(evt.name);
            }, diff);
        }
    });
};


add.addEventListener("click", () => {
    popup.style.display = "flex";
});


cancelBtn.addEventListener("click", () => {
    popup.style.display = "none";
});


popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});


saveBtn.addEventListener("click", () => {
    let event = eventInput.value.trim();
    let timeValue = timeInput.value;

    if (!event) {
        alert("Enter event!");
        return;
    }

    if (!timeValue) {
        alert("Select time!");
        return;
    }

    let now = new Date();
    let [hours, minutes] = timeValue.split(":");

    let targetTime = new Date();
    targetTime.setHours(hours, minutes, 0, 0);

    if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    let targetTimestamp = targetTime.getTime();

    let li = createListItem(event);
    saveEvent(event, targetTimestamp);

    showTime(li, targetTimestamp);

    let diff = targetTimestamp - Date.now();

    setTimeout(() => {
        li.remove();
        AutoDelete(event);
    }, diff);

    messageBox("Event added!", "green");

    popup.style.display = "none";
    eventInput.value = "";
    timeInput.value = "";
});

// =========================

window.addEventListener("load", loadEvent);
bd.addEventListener("click", deleteEvent);