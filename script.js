const text=document.getElementById("text");
const form=document.querySelector("form"); 

const wrongCity=document.getElementById("wrongCity");
const closeBtn=document.getElementById("closeBtn");
const loader=document.getElementById("loader");

const Name=document.getElementById("name");
const country=document.getElementById("country");     
const flag=document.getElementById("flag");
// https://flagsapi.com/IN/flat/48.png
const sky=document.getElementById("sky");
const icon=document.getElementById("icon");
// https://openweathermap.org/img/wn/03n@2x.png 

const temp=document.getElementById("temp");
const minTemp=document.getElementById("minTemp");
const maxTemp=document.getElementById("maxTemp");
  
const visibility=document.getElementById("visibility");
const humidity=document.getElementById("humidity");
const pressure=document.getElementById("pressure");

// default
getData("chennai");

// call API 
async function getData(city){

try{
    loader.style.display="block";

    const API_key="8de72eb682490c6dc8153ded4c853068";
    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;

    const response = await fetch(URL);
    const data = await response.json( );

    loader.style.display="none";

    // console.log(data);
    showData(data);

} catch{
    errorNotFound(city);
}

}

// error code
function errorNotFound(city){
    document.body.classList.add("popup");
    text.disabled=true;
    wrongCity.innerHTML=city;
}
closeBtn.addEventListener('click',( )=>{
    document.body.classList.remove("popup");
    text.disabled=false;
})


// show data 
function showData(data){

    sky.innerHTML=  data.weather[0].main ;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` ;

    Name.innerHTML = data.name;
    country.innerHTML = countryList[data.sys.country];
    flag.src=`https://flagsapi.com/${data.sys.country}/flat/48.png`;

    temp.innerHTML = data.main.temp + " °C";
    minTemp.innerHTML = data.main.temp_min + " °C";
    maxTemp.innerHTML = data.main.temp_max + " °C";

    pressure.innerHTML = data.main.pressure + " hPa" ;
    humidity.innerHTML =  data.main.humidity + " %" ;
    visibility.innerHTML = data.visibility + " m" ;

    if (data.main.temp < 0) {
        document.body.style.backgroundColor = "rgba(0, 255, 255, 0.25)";
    } else if (data.main.temp >= 0 && data.main.temp < 10) {
        document.body.style.backgroundColor = "rgba(100, 149, 237, 0.25)";
    } else if (data.main.temp >= 10 && data.main.temp < 20) {
        document.body.style.backgroundColor = "rgba(127, 255, 212, 0.25)";
    } else if (data.main.temp >= 20 && data.main.temp < 25) {
        document.body.style.backgroundColor = "rgba(173, 255, 47, 0.25)";
    } else if (data.main.temp >= 25 && data.main.temp < 30) {
        document.body.style.backgroundColor = "rgba(255, 215, 0, 0.25)";
    } else if (data.main.temp >= 30 && data.main.temp < 35) {
        document.body.style.backgroundColor = "rgba(255, 165, 0, 0.25)";
    }

}

// form  
form.addEventListener('submit',(e)=>{
    e.preventDefault( );

    getData(text.value);

    text.value="";
})
