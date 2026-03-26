let choices = document.querySelectorAll(".choice");
let rockid = document.querySelector("#rock"); 
let paperid = document.querySelector("#paper");
let scissorid  = document.querySelector("#scissor");
let scoreu = document.querySelector(".user-score");
let scorec = document.querySelector(".comp-score");
let msg =document.querySelector("#msg");
let spinner = document.querySelector(".loading-spinner");
let animate= document.querySelector(".fade-in");

let userscore = 0;
let compscore = 0;
const ComGenerate = () =>
{
    let options = ["rock","paper","scissor"];
   let random= Math.floor(Math.random()*3);
    return options[random];

}
let userwin = true;

const gamePlay = (cid)=>
{       
     spinner.style.display = "block";
     msg.style.display = "none";
    
    setTimeout(
        ()=>{
        let compchoice = ComGenerate();
    // msg.innerHTML=`${cid} is user's choice <br> <br> ${compchoice} is computer's choice`; 
    
    if(compchoice === cid)
    {
        console.log("Draw");
        userwin =null;
    }
    else if(compchoice === "paper" && cid === "scissor")
    {
        console.log("User won!");
        userwin = true;
        userscore++;
    }
    else if(compchoice === "rock" && cid === "paper")
    {
        console.log("User won!");
        userwin = true;
        userscore++;
    }
    else if(compchoice === "scissor" && cid === "rock")
    {
        console.log("User won!");
        userwin = true;
        userscore++;
    }
    else if(compchoice === "scissor" && cid === "paper")
    {
        console.log("Computer won!");
        userwin = false;
        compscore++;
    }
    else if(compchoice === "paper" && cid === "rock")
    {
        console.log("Computer won!");
        userwin = false;
        compscore++;
    }
    else if(compchoice === "rock" && cid === "scissor")
    {
        console.log("Computer won!");
        userwin = false;
        compscore++;
    }
    let printchoice = ()=>
    {
        // animate.style.display="flex";
        if(userwin===true){
            
            msg.innerHTML=`<i>You win!!!🥳🥳</i> <br><br> <u>${cid}</u>.. is Your choice <u>${compchoice} </u>.. is computer's choice ` ;
            msg.style.backgroundColor="#0CCE6B";
            msg.style.color="#990B29";
        }
        else if(userwin === false)
        { 
            
            msg.style.backgroundColor="red";
            msg.style.color="white";
            msg.innerHTML=`<i>You lose😖</i> <br><br><u>${cid}</u>.. is Your choice <u>${compchoice}</u>.. is computer's choice`;
            
        }
        else if(userwin=== null)
        {
            msg.innerHTML = `<i>Draw!</i><br><br> <u>${cid}</u>.. Your choice <u>${compchoice}</u>.. is computer's choice `;
            msg.style.backgroundColor = "gray";
            msg.style.color="#990B29";
        }
        
        
        
    };
    printscore();
    printchoice();
    spinner.style.display = "none";
    msg.style.display = "block";}
    ,1000);
   
}
const printscore = () => {
    scoreu.innerHTML = `${userscore}`;
    scorec.innerHTML = `${compscore}`;
  
    // Trigger fade-in animation
    scoreu.classList.remove('fade-in');
    scorec.classList.remove('fade-in');
    void scoreu.offsetWidth; // Force reflow
    void scorec.offsetWidth; // Force reflow
    scoreu.classList.add('fade-in');
    scorec.classList.add('fade-in');
  };
choices.forEach((choice)=>
{
    choice.addEventListener("click" , ()=>{
        const cid =choice.getAttribute("id");
        // console.log(`${cid} is user's choice`);
        // console.log(`${ComGenerate()} is computer's choice`);
        gamePlay(cid);
    })
})