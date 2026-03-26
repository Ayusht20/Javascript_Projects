
let tasks =document.querySelector(".tasks");
let add =document.querySelector(".add");
let list=document.querySelector("ol");
let btnd =document.querySelector(".delete");
let imp=document.querySelector(".imp");
let message=document.querySelector(".message");

let showMessage=(text,color)=>
{
    message.innerText=text;
    message.style.backgroundColor=color;
    message.style.display="block";
    setTimeout(()=>
    {
        message.style.display="none";
    },1000)
}
imp.addEventListener("click",()=>
{
    let lists=document.querySelectorAll("li");
    //    input.type="checkbox";
    lists.forEach((li)=>
    {
        let input= li.querySelector("input[type='checkbox']");
        let textNode=li.childNodes[1];
    
       if(input.checked)
       {
        setTimeout(()=>{
        li.style.backgroundColor="#98FB98";
        //    li.style.color="	#228B22";
           if(!textNode.nodeValue.includes("⭐"))
           textNode.nodeValue= "⭐ " +  textNode.nodeValue;}
        ,200);
           
       }
    //    else
    //    {
    //        li.style.backgroundColor="";
    //    }
   })
})
let AddTask=()=>
{
    // alert("Add some task");
    
    let task =prompt("Add some task");
    if(!task || task.trim()==="")
    {
        alert("Cant be empty");
        return;
    }
    li =document.createElement("li");
    let input =document.createElement("input");
     input.type="checkbox";
    li.appendChild(input);
    li.appendChild(document.createTextNode(" " + task));
    list.appendChild(li);
    saveTasks(task);
    showMessage("Task added","green");
    
}
let saveTasks=(task)=>
{
    let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
let loadTasks=()=>
{
    let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task)=>
    {
        let li=document.createElement("li");
        let input=document.createElement("input");
        input.type ="checkbox";
        li.appendChild(input);
        li.appendChild(document.createTextNode(" " +task));
        list.appendChild(li);
    })
}
window.addEventListener("load" ,loadTasks);
let deleteTask = () => {
    let items = document.querySelectorAll("li");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get saved tasks

    items.forEach(li => {
        let check = li.querySelector("input[type='checkbox']");
        if (check.checked) {
            showMessage("Task completed successfully!", "#0699fc");

            let taskremove = li.childNodes[1].nodeValue.trim();
            li.remove(); // Remove from UI

            // 🔥 Correct way to remove task from storage
            tasks = tasks.filter(task => task !== taskremove);

            // 🔄 Update localStorage
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        else
        {
            showMessage("Select the task you want to complete!", "red");
            
        }
    });

    // 🗑️ Remove "tasks" from localStorage if empty
    if (tasks.length === 0) {
        localStorage.removeItem("tasks");
    }
};




// let deleteTask = () => {
//     let items = document.querySelectorAll("li");
//     items.forEach(li => {
//         let checkbox = li.querySelector("input[type='checkbox']");
//         if (checkbox.checked) {
//             li.remove(); // Remove checked items
//         }
//     });
// };
add.addEventListener("click",AddTask);
btnd.addEventListener("click",deleteTask)