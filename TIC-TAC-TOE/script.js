let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newb = document.querySelector("#new");
let msg = document.querySelector("#msg");
let msgc = document.querySelector(".msgcont");
let turno = true;
const resetGame =()=>
{
turno=true;
enabledbox();
msgc.classList.add("hide");

}

const winPatterns =
[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
boxes.forEach((box)=>
{
    box.addEventListener("click",()=>
    {
        console.log("Box was clicked");
        if(turno)
        {
            box.innerText="O";
            turno=false;
        }
        else{
            box.innerText="X";
            turno=true;
        }
        box.disabled=true;
        checkWinner ();
    })
})
const disabledbox = ()=>
{
    for(let box of boxes)
    {
     box.disabled = true;
    }
}
const enabledbox = ()=>
{
    for(let box of boxes)
    {
     box.disabled = false;
     box.innerText ="";
    }
}
const checkWinner = () =>
{
    for(pattern of winPatterns)
    {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;
       if(val1 != "" && val2 !="" && val3 !="")
       {
        if(val1===val2 && val2===val3 )
        {   
            console.log(val1,val2,val3);
            msg.innerText = `Winner is ${val3}`;
            disabledbox();
            msgc.classList.remove("hide");

        }
       }
    }
}
reset.addEventListener("click" , resetGame);
newb  .addEventListener("click" , resetGame);