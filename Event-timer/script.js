let events = document.querySelector("ol");
let message = document.querySelector(".message");
let add = document.querySelector(".add");
let bd = document.querySelector(".delete");
let btnT=document.querySelector(".time");
// btnT.addEventListener();
let messageBox = (text, color) => {
    message.innerText = text;
    message.style.backgroundColor = color;
    message.style.display = "block";
    setTimeout(() => {
        message.style.display = "none";
    }, 1000);
};

let AutoDelete = (event) => {
    let saved = JSON.parse(localStorage.getItem("eventing")) || [];
    saved = saved.filter(evt => evt !== event );
    localStorage.setItem("eventing", JSON.stringify(saved));
    messageBox("Event completed by time!", "#0699fc");
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
            saved = saved.filter(ev => ev !== del && " ");
            localStorage.setItem("eventing", JSON.stringify(saved));
            messageBox("Task completed successfully!", "#0699fc");
            found = true;
        }
    });

    if (!found) {
        messageBox("Select the task you want to complete!", "red");
    }
};

let createListItem = (event) => {
    let li = document.createElement("li");
    let input = document.createElement("input");
    input.type = "checkbox";
    li.appendChild(input);
    li.appendChild(document.createTextNode(" " + event));
    events.appendChild(li);
};

let addEvent = () => {
    let event = prompt("Enter the event!");
    if (!event || event.trim() === "") {
        alert("Add some event!");
        return;
    }

    let time = prompt("Set the time for the event to happen in seconds!⌛");
    if (!time || time.trim() === "" || isNaN(time)) {
        alert("Add a valid time!");
        return;
    }

    time = parseInt(time) * 1000;
    createListItem(event);
    messageBox("Event added successfully!", "green");
    saveEvent(event);
    // setInterval(showTime(time),1000);
    showTime(time);
    setTimeout(() => {
        let listItems = document.querySelectorAll("li");
        listItems.forEach(li => {
            if (li.textContent.includes(event)) {
                li.remove();
            }
        });
        AutoDelete(event);
        // clearInterval(showTime);
    }, time);
};

let saveEvent = (event) => {
    let saved = JSON.parse(localStorage.getItem("eventing")) || [];
    saved.push(event);
    
    localStorage.setItem("eventing", JSON.stringify(saved));
};

let loadEvent = () => {
    let saved = JSON.parse(localStorage.getItem("eventing")) || [];
    console.log(saved);
    saved.forEach(event => createListItem(event));
};
let showTime=(time)=>
{
    let lists=document.querySelectorAll("li");
    lists.forEach((li)=>
    {
        let t=li.querySelector("span");
        if(!t)
        {
            t = document.createElement("span");
            // t.classList.add("countdown");
            li.appendChild(t);
        }
        let remainTime=time/1000;
        t.innerText=` (${remainTime}s)`;
        let intervalId = setInterval(() => {
            remainTime--;
            if (remainTime < 0) {
              clearInterval(intervalId);
              t.innerText = " (0s)";
            } else {
              t.innerText = ` (${remainTime}s)`;
            }
          }, 1000);
    })
}
window.addEventListener("load", loadEvent);
add.addEventListener("click", addEvent);
bd.addEventListener("click", deleteEvent);
