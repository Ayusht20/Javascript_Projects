let hours =document.querySelector(".hours");
let minutes =document.querySelector(".minutes");
let seconds =document.querySelector(".seconds");
let date =document.querySelector(".date");
let btn = document.querySelector("button");
getDate=()=>
{
    let now = new Date();
    date.innerText=now.getDate();

}
updateTime=()=>
{
    let now = new Date();
    timeFormat=()=>
    {       uh = now.getHours();
            uh = uh %12 || 12;
        if(now.getHours()>=12)
        {   
            hours.innerText =`${uh} pm`;
            
        }
        else 
        {
            hours.innerText =`${uh} am`;

        }
    }
    timeFormat();
    minutes.innerText =`${now.getMinutes()} minutes`;
    seconds.innerText =`${now.getSeconds()} seconds`;
    // console.log(hours);
}
// btn.addEventListener("click" ,getDate);
setInterval(updateTime,1000)
updateTime();
