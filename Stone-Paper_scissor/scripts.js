let choices = document.querySelectorAll(".choice");
let rockid = document.querySelector("#rock");
let paperid = document.querySelector("#paper");
let scissorid = document.querySelector("#scissor");
let scoreu = document.querySelector(".user-score");
let scorec = document.querySelector(".comp-score");
let msg = document.querySelector("#msg");
let spinner = document.createElement("div"); // Create the spinner dynamically
spinner.className = "loading-spinner";
document.querySelector(".msg-container").appendChild(spinner);

let userscore = 0;
let compscore = 0;

const ComGenerate = () => {
    let options = ["rock", "paper", "scissor"];
    let random = Math.floor(Math.random() * 3);
    return options[random];
};

let userwin = true;

const gamePlay = (cid) => {
    // Show spinner and clear message
    spinner.style.display = "block";
    msg.style.display = "none";

    setTimeout(() => {
        let compchoice = ComGenerate();

        if (compchoice === cid) {
            userwin = null; // Draw
        } else if (
            (compchoice === "paper" && cid === "scissor") ||
            (compchoice === "rock" && cid === "paper") ||
            (compchoice === "scissor" && cid === "rock")
        ) {
            userwin = true; // User wins
            userscore++;
        } else {
            userwin = false; // Computer wins
            compscore++;
        }

        const printchoice = () => {
            if (userwin === true) {
                msg.innerHTML = `<i>You win!!!🥳🥳</i> <br><br> <u>${cid}</u>.. is Your choice <u>${compchoice}</u>.. is computer's choice `;
                msg.style.backgroundColor = "#0CCE6B";
                msg.style.color = "#990B29";
            } else if (userwin === false) {
                msg.style.backgroundColor = "red";
                msg.style.color = "white";
                msg.innerHTML = `<i>You lose😖</i> <br><br><u>${cid}</u>.. is Your choice <u>${compchoice}</u>.. is computer's choice`;
            } else if (userwin === null) {
                msg.innerHTML = `<i>Draw!</i><br><br> <u>${cid}</u>.. Your choice <u>${compchoice}</u>.. is computer's choice `;
                msg.style.backgroundColor = "gray";
                msg.style.color = "#990B29";
            }
        };

        printscore();
        printchoice();

        // Hide spinner and show message
        spinner.style.display = "none";
        msg.style.display = "block";
    }, 1000); // Simulate a 1-second loading delay
};

const printscore = () => {
    // Add the fade-in effect to user score
    scoreu.innerHTML = `${userscore}`;
    scoreu.classList.add("score-updated");

    // Add the fade-in effect to computer score
    scorec.innerHTML = `${compscore}`;
    scorec.classList.add("score-updated");

    // Remove the class after the animation ends to reset
    setTimeout(() => {
        scoreu.classList.remove("score-updated");
        scorec.classList.remove("score-updated");
    }, 500); // Match the duration of the animation
};


choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const cid = choice.getAttribute("id");
        // printscore();
        gamePlay(cid);
    });
});
