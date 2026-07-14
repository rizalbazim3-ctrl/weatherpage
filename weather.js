let dark=document.getElementById("dark")

let find=document.getElementById("find")

let city=document.getElementById("input")

let card=document.getElementById("card")

let error=document.getElementById("error")

let spin=document.getElementById("spin")

const apiKey="d6ed08af606b623b816d35f0749771ef"

let  weather =``

let addedfav=document.querySelector(".addedfav")



//fetching
async function weatherdetails(){
    spin.style.display="block"

    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`

    try{
        
        let response = await fetch(url)

    let data = await response.json()

    error.style.display="none"

     if (!response.ok) {
        error.style.display = "block";
        card.style.display = "none";
            
    }
    else if(response.ok && error.style.display === "none"){
        card.style.display = "block";
    }
       
    spin.style.display="none"

    //console.log(data)

    
    weather = `
<div class="weather-card">
<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    <h3 atyle>${data.name}</h3>
    <p>Temp: ${Math.round(data.main.temp)}°C</p>
    <p>Feels Like: ${Math.round(data.main.feels_like)}°C</p>
    <p>Description: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
</div>
`;

            
          /* data.name +"<br>"+ Math.round(data.main.temp)+
    "<br>"+ Math.round(data.main.feels_like) + "<br>"+ data.weather[0].description+"<br>" +
    data.main.humidity + "<br>" + data.wind.speed */
    

    card.innerHTML =weather
}

    catch{
        error.innerHTML="404 something is wrong check your place"
    }
    
}
//background  themes

let theme = true

dark.addEventListener("click",function(){
    if(theme){
        document.body.style.backgroundImage = "url('nytCloud.jpg')"
        theme = false
    }else{
        document.body.style.backgroundImage = "url('cloud.avif')"
        theme = true
    }
})

//button eventing

find.addEventListener("click",function(){
    weatherdetails()
})


//debouncing section
 function debounce(weatherfunction,delay){
    let time;
    return function(){
        // clear previous time
        clearTimeout(time)
        //create new time
        time=setTimeout(()=>{
            weatherfunction()
        },delay)
    }
   
}
let debouncesearch=debounce(weatherdetails,500)

let addfav = document.getElementById("addfav")

// Get cities from localStorage or create empty array
let cities = JSON.parse(localStorage.getItem("cities")) ||[];

// Show cities when page loads
showCities();

addfav.addEventListener("click", () => {
    if(!cities.includes(city.value) && city.value !== ""){

        cities.push(city.value);
        
        localStorage.setItem("cities", JSON.stringify(cities))
    
        showCities();
    }else if (city.value == ""){
        alert("invalid place")
    }else{
        alert("The place already exist")
    }
     city.value = "";


});

function showCities() {

    addedfav.innerHTML = ""

    cities.forEach((place, index) => {

             addedfav.innerHTML += `<button id="fav">${place}
                <button class="remove">✕</button></div>`

    })

    let remove = document.querySelectorAll(".remove")

    


    remove.forEach((btn, index) => {

        btn.addEventListener("click", () => {

            cities.splice(index, 1)

            localStorage.setItem("cities", JSON.stringify(cities))

            showCities()

        })

    })

}
       