var apiKey = '01ca93f221f7d52fb6c774e5960d91fd';
var searchBtn = document.getElementById('fetch-btn');

// DEFINE INPUT FIELD
var cityInput = document.getElementById('city-input');

// DEFINE FIELDS ON DOC FOR APPENDING STORED DATA
var searchList = document.querySelector('ul');
var currentCityEl = document.getElementById('city-name');

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


function getCoordinates(cityName) {

    // USER WILL INPUT CITY, BUT I NEED TO RETURN COORDINATES IN ORDER TO PROPERLY PERFORM FORECAST RETURN

    var requestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=${apiKey}&units=imperial`;

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

            saveToStorage(myCity)
            getWeather(myCity.lat, myCity.lon)
        })
}

//CREATE .JSON ARRAY FOR LOCAL STORAGE
// USE `||` (OR) TO RETRIEVE THE VALUE OF KEY `CITIES` FROM LOCAL STORAGE --> IF THIS VALUE HAS VALUE (AKA. 'TRUTHY'), USE IT. IF FALSY, IT WILL RETURN/ASSIGN AN EMPTY ARRAY

function saveToStorage(newCity) {
    var dataStore = JSON.parse(localStorage.getItem('cities')) || [];
    dataStore.push(newCity);
    localStorage.setItem('cities', JSON.stringify(dataStore));
    
    // dataStore shows full list of city searches saved into localStorage as an array
    console.log(dataStore);

    //for loop to get the elements in the screen
    for (let i = 0; i < dataStore.length; i++) {
        var newCityLi = document.createElement('li');
        newCityLi.innerHTML =
            `<button>${dataStore[i].name}, ${dataStore.state}</button>`;
        newCityLi.className = 'city-li';
        searchList.appendChild(newCityLi);
    }
}


function loadStorage() {
    var dataStore = JSON.parse(localStorage.getItem('cities')) || [];
    if (dataStore.length == 0) {
        return
    }
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
            console.log(weather);

            // WEATHER = ARRAY OF WEATHER CONDITIONS FOR MOST RECENT CITY SEARCH (DATASTORE[i])
        })

    var weather = JSON.parse(localStorage.getItem('weather')) || [];

    // dataStore.push(weather);
    // localStorage.setItem('weather', JSON.stringify(dataStore));

    // console.log(dataStore);

    // for (let i = 0; i < weather.length; i++) {
    //     var conditions = [weather.temp, weather.dt, weather.wind, weather.humidity];}
    
};

// city name, date, an icon rep of weather conditions, temperature, humidity, and wind speed

function handleUserInput() {
        var cityName = cityInput.value.trim();

        if (cityName === '') {
            alert("Please enter a valid city.");
            return;
        } else {
            getCoordinates(cityName);
        };
    }

// PAGE BUTTON EVENT LISTENERS
searchBtn.addEventListener('click', handleUserInput);