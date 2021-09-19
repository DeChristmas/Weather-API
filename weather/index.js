const api = {
    key: "5dcdf64764d279b41f6e8d2c2838253a",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".search-text");
search.addEventListener('keyup', function(e) {
    if(e.keyCode === 13) {
        getData(search.value);
    }
});
const btn = document.querySelector(".search");
btn.addEventListener("click", getInput);

function getInput (event) {
    event.preventDefault();
    if (event.type == "click") {
        getData(search.value);
        console.log(search.value);
    }
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
        
}

function displayData (response) {
    
    if (response.cod === "404") {
        const error = document.querySelector(".mistake");
        error.textContent = "Please enter a valid city name";
        search.value = "";
    } else {
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

        const air = document.querySelector(".air");
        air.innerHTML = `Air Humidity: ${Math.round(response.main.humidity)} <span>%</span>`;
      
        const weather = document.querySelector(".weather");
        weather.innerText = `Weather: ${response.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

        let weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";
        
        search.value = "";
    }
}



function dateFunction (time) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[time.getDay()];
    let date = time.getDate();
    let month = months[time.getMonth()];
    let year = time.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}