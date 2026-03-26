
let fromcur= document.querySelector(".from select")
let tocur =document.querySelector(".to select");
// let img =document.querySelector("img");
let btn = document.querySelector("button")
let msg =document.querySelector(".msg");
const BASE_URL =
  "https://api.currencyfreaks.com/latest?apikey=fca4c9576abd43e4a2c21defe04a0c49&symbols="; 
const dropdowns=document.querySelectorAll(".dropdown select");
for(let select of dropdowns)
{
  for(curCode in countryList)
  {
    let newOption =document.createElement("option");
    newOption.innerText = curCode;
    newOption.value= curCode;
    select.append(newOption);
  }
  select.addEventListener("change" ,(evt)=>
  {
    updateFlag(evt.target);
  })
}
const updateFlag=(element)=>
{
  let curCode =element.value;
  let countryCode=countryList[curCode];
  let img= element.parentElement.querySelector("img");
  img.src=`https://flagsapi.com/${countryCode}/flat/64.png`;

}

btn.addEventListener("click" ,async (evt)=>
{
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal =amount.value;
  console.log(amtVal);
  if(amtVal === "" || amtVal<1)
  {
    amtVal=1;
    amount.value="1";
  }
  console.log(fromcur.value,tocur.value);
  // const URL =`${BASE_URL}${fromcur.value},${tocur.value}`;
  // let response= await fetch(URL);
  // let data =await response.json();
  // let rates;
  let rateofFrom=Data.rates[fromcur.value];
  let rateofTo= Data.rates[tocur.value];
  console.log(Data);
  let rate=rateofTo/rateofFrom;
  let finalAmt = amount.value *rate;
  msg.innerText = `Rate is: ${rate} 
  ${amtVal} ${fromcur.value}= ${finalAmt} ${tocur.value}`;
})
// console.log(Data);
// btn.addEventListener("mouseover"  ,
// ()=>
// {
//   btn.style.boxShadow="0 10px 10px 10px black";
// })
// btn.onmouseleave = ()=>
// {
//   btn.style.boxShadow="none"

// }
// btn.addEventListener("click",()=>
// {

// })