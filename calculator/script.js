let nums=document.querySelectorAll("#num");
let print=document.querySelector("p");
let op=document.querySelectorAll("#calc");
let reset = document.querySelector("#reset");
let equal =document.querySelector("#equal");
let fade =document.querySelector(".fade-in");
let history=[document.querySelector(".history")];

nums.forEach((num) => {
    num.addEventListener("click", () => {
        // fade.style.display="flex";
        let number =num.innerText;
        print.innerText +=number;
        print.classList.add("fade-in");
      setTimeout(()=>{
        print.classList.remove("fade-in");
      },300);
       

    }); 
});
reset.addEventListener("click",
()=>
{
print.innerText="";
}
)
let firstnum="";
let operator ="";
op.forEach((btn)=>
{
    btn.addEventListener("click" , ()=>
    {
        firstnum=print.innerText;
        operator=btn.innerText;
        print.innerText="";
    })
})
equal.addEventListener("click" , 
()=>
{
    let secondnum=print.innerText;
    let result;
switch(operator)
{
    case "+":
        result = parseFloat(firstnum) + parseFloat(secondnum);
        break;
    case "-":
        result = parseFloat(firstnum) - parseFloat(secondnum);
        break;
    case "/":
        result = parseFloat(firstnum) / parseFloat(secondnum);
        break;
    case "X":
        result = secondnum!==0 ? parseFloat(firstnum) * parseFloat(secondnum) : "Error";
        break;
    default:
    return;
    
}
setTimeout(()=>{
  print.classList.remove("fade-in");
},500);
print.classList.add("fade-in");
print.innerText=result;
firstnum=result;
secondnum="";
operator="";
}
)

 