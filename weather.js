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
    
    console.log(city.value)

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

    
    weather = `city:${ data.name}<br>

            temp: ${Math.round(data.main.temp)}°C<br>

            feelsLike: ${Math.round(data.main.feels_like)}°C<br>

            description: ${data.weather[0].description}<br>

            humidity: ${data.main.humidity}%<br>

            windSpeed: ${data.wind.speed}m/s`

            
          /* data.name +"<br>"+ Math.round(data.main.temp)+
    "<br>"+ Math.round(data.main.feels_like) + "<br>"+ data.weather[0].description+"<br>" +
    data.main.humidity + "<br>" + data.wind.speed */

    card.innerHTML =weather
}

    catch{
        error.innerHTML="404 something is wrong check your place"
    }
    
}

dark.addEventListener("click",function(){

     document.body.classList.toggle("dark-mode")
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
let cities = JSON.parse(localStorage.getItem("cities")) || [];

// Show cities when page loads
showCities();

addfav.addEventListener("click", () => {

    cities.push(city.value);

    localStorage.setItem("cities", JSON.stringify(cities))

    showCities();

    city.value = "";

});

function showCities() {

    addedfav.innerHTML = ""

    cities.forEach((place, index) => {

        addedfav.innerHTML += `<div id="fav">${place}
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
       

