let btn=document.querySelector("button");
let body=document.querySelector("body");
let p=document.querySelector("p");
let changeColor=()=>
{
    const list="0123456789ABCDEF";
    let color ="#";
    for(let i=0;i<6;i++)
    {
        color+=list[Math.floor(Math.random()*16)];
    }
    return color;

}
btn.addEventListener("click",
()=>
{
    const newColor =changeColor();
    body.style.backgroundColor=newColor;
    p.innerText=`Color code=${newColor}`;
}
)