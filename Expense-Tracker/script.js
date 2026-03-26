let amt=document.querySelector("#expenseAmt");
let exp=document.querySelector("#expenseName");
let btne=document.querySelector(".expense");
let btnl=document.querySelector(".list");
let list=document.querySelector("#expense-list");
let total=document.querySelector("#total-amount");
let msg=document.querySelector(".msg");
let tamt=0;
let addExp=()=>
{
    let amtVal=amt.value;
    let expVal=exp.value;
    if(!amtVal || !expVal || amtVal<=0 )
    {
        alert("Please add valid  Expense amount and expense name!");
        return;
    }
    
    let li=document.createElement("option");
    li.textContent=`Expense:${expVal} , Amount:${amtVal}`;
    list.prepend(li); 
    tamt=tamt+ parseInt(amtVal);
    total.innerHTML=`Total Expense:${tamt}`;
    save(expVal,amtVal);
    msgbox();
    amt.value="";
    exp.value="";
}
let msgbox=()=>
{
    msg.style.display="block";
    msg.textContent="Expense added!";
    setTimeout(()=>
   {
    msg.style.display="none";
    
   },1500)
}
let save=(expName,expAmt)=>
{
    let get=JSON.parse(localStorage.getItem("expenses")) || [];
    get.push({name: expName, amount:parseInt(expAmt)});
    localStorage.setItem("expenses",JSON.stringify(get));
}
let load=()=>
{
    let get=JSON.parse(localStorage.getItem("expenses")) || [];
    tamt=0;
    // list.innerHTML="";
    get.forEach((expense)=>
    {
        let li=document.createElement("option");
        li.textContent = `Expense: ${expense.name}  Amount: ${expense.amount}`;
        list.prepend(li);
        tamt+=expense.amount;
    })
    total.innerHTML = `Total Expense: ${tamt}`;

}
let showExp=()=>
{
    list.style.display="block";
}
// console.log(localStorage.clear());
window.addEventListener("load",load);
btne.addEventListener("click",addExp);
btnl.addEventListener("click",showExp);