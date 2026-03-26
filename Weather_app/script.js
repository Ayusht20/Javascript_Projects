let placeInput=document.querySelector("#place");
let weather=document.querySelector(".weather-info");
let spinner = document.getElementById("spinner");
let btn=document.querySelector("button");
placeInput.addEventListener("keydown",(evt)=>
{
    if(evt.key ==="Enter")
    {
        btn.click();
    }
})
let getData = async ()=>
{
let place=placeInput.value.trim(); 
if(place==="")
{
    alert("Can't be empty!");
    return;
}
const url= `http://api.weatherapi.com/v1/current.json?key=872495f839c947cf99561047251602&q=${place}&aqi=no`;
try
{
    let response=await fetch(url);
    let data=await response.json();
    if(response.ok=="false")
    {
        throw new Error("City not found or API error");
    }
    console.log(data);
    const { temp_c,temp_f, humidity, wind_kph, condition } = data.current;
    const html=`<h2>Weather in ${data.location.name},${data.location.region}, ${data.location.country}</h2>
    <p>Temperature: ${temp_c}°C</p>
    <p>Temperature: ${temp_f}°F</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${wind_kph} kph</p>
    <p>Condition: ${condition.text}</p>
    <img src=${condition.icon} alt="${condition.text}"
    `; spinner.style.display = "block";
    weather.innerHTML = ""; 
    setTimeout(()=>{weather.innerHTML=html;
        spinner.style.display = "none";
    },500);
}
catch(error)
{
    spinner.style.display="none";
    weather.innerHTML=`<p>Error:${error.message}</p>`
    console.error("Error",error.message);
}

// weather.innerHTML=html;
}
btn.addEventListener("click" ,getData);