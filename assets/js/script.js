var apiKey = '01ca93f221f7d52fb6c774e5960d91fd';
var searchBtn = document.getElementById('fetch-btn');
var cityBtn = document.getElementsByClassName('city-li');

// DEFINE INPUT FIELD
var cityInput = document.getElementById('city-input');

// DEFINE FIELDS ON DOC FOR APPENDING STORED DATA
var searchList = document.querySelector('ul');
var cityNameEl = document.getElementById('city-name');
var tempNowEl = document.getElementById('temp-now');
var windNowEl = document.getElementById('wind-now');
var humidNowEl = document.getElementById('humid-now');


// DEFINE REQUIRED ON-PAGE RESULTS - WEATHER
var lon;
var lat;
var city;
var date;
var tempF;
var windMPH;
var humidity;
var icon;
var dataStore;


// START BY GETTING INPUT FROM USER ON CITY NAME TO RESEARCH
function handleUserInput() {
    var cityName = cityInput.value.trim();

    if (cityName === '') {
        alert("Please enter a valid city.");
        return;
    } else {
        getCoordinates(cityName);
    };
}


function getCoordinates(city) {

    // USER WILL INPUT CITY, BUT I NEED TO RETURN COORDINATES IN ORDER TO PROPERLY PERFORM FORECAST RETURN

    var requestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${apiKey}&units=imperial`;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data)
            if (data.length == 0) {
                alert("Please enter a valid city.")
                return
            }

            var myCity = data.find(function (cityInstance) {
                return cityInstance.country == "US"
            })

            if (myCity == undefined) {
                myCity = data[0]
            }

            console.log(myCity);
            console.log(myCity.name);
            console.log(myCity.state);

            saveToStorage(`${myCity.name}, ${myCity.state}`)
            getWeather(myCity.lat, myCity.lon)
            getForecast(myCity.lat, myCity.lon)

        })
}

//CREATE .JSON ARRAY FOR LOCAL STORAGE
// USE `||` (OR) TO RETRIEVE THE VALUE OF KEY `CITIES` FROM LOCAL STORAGE --> IF THIS VALUE HAS VALUE (AKA. 'TRUTHY'), USE IT. IF FALSY, IT WILL RETURN/ASSIGN AN EMPTY ARRAY

function saveToStorage(myCity) {
    var dataStore = JSON.parse(localStorage.getItem('cities')) || [];
    if(dataStore.includes(myCity)){
        return
    }
    dataStore.push(myCity);
    localStorage.setItem('cities', JSON.stringify(dataStore));
    loadStorage()
    // dataStore shows full list of city searches saved into localStorage as an array
    console.log(dataStore);

    //for loop to get the elements in the screen
  
}


function getWeather(lat, lon) {
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=01ca93f221f7d52fb6c774e5960d91fd&units=imperial`;

    // THESE ARE SHOWING CORRECT COORDS FOR DATASTORE[i]
    console.log(lat);
    console.log(lon);

    fetch(requestURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (weather) {
            makeMainCard(weather)
        })
};


function makeMainCard(weather){
    var mainEl = document.getElementById("weather-now")
    mainEl.innerHTML = ` <div class="card-body">
                            <h5 class="card-title" id="city-name">${weather.name}</h5>
                            <h6 class="card-subtitle mt-4 mb-3 text-muted" id="temp-now">Temperature: ${weather.main.temp}</h6>
                            <h6 class="card-subtitle mt-2 mb-3 text-muted" id="wind-now">Wind: ${weather.wind.speed}</h6>
                            <h6 class="card-subtitle mt-2 mb-3 text-muted" id="humid-now">Humidity: ${weather.main.humidity}</h6>
                            <i></i>
                        </div>`
    console.log(weather);

    console.log(weather.name);

    console.log(weather.wind.speed);

    console.log(weather.dt);

    console.log(weather.weather[0].description);

    console.log(weather.weather[0].icon);

    console.log(weather.main.temp);

    console.log(weather.main.humidity);


}


function getForecast(lat, lon) {
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=01ca93f221f7d52fb6c774e5960d91fd&units=imperial`;

    // THESE ARE SHOWING CORRECT COORDS FOR DATASTORE[i]
    console.log(lat);
    console.log(lon);

    fetch(requestURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (forecast) {
            console.log(forecast)
        })
};


function loadStorage() {
    var dataStore = JSON.parse(localStorage.getItem('cities')) || [];
    if (dataStore.length == 0) {
        return
    }
    searchList.innerHTML= ""
    for (let i = 0; i < dataStore.length; i++) {
        var newCityLi = document.createElement('li');
        newCityLi.innerHTML =
            `<button class="city-li">${dataStore[i]}</button>`;
        newCityLi.className = 'city-li';
        searchList.appendChild(newCityLi);
    }
    searchList.addEventListener("click", function(event){
        console.dir(event.target)
        if(event.target.nodeName === "BUTTON"){
            console.dir(event.target)
            getCoordinates(event.target.innerHTML)
        }
    })
}

// PAGE BUTTON EVENT LISTENERS
searchBtn.addEventListener('click', handleUserInput);
loadStorage()
// cityBtn.addEventListener('click', getCoordinates);