var apiKey = '01ca93f221f7d52fb6c774e5960d91fd';
var searchBtn = document.getElementById('fetch-btn');

// DEFINE INPUT FIELD
var cityInput = document.getElementById('city-input');

// DEFINE REQUIRED ON-PAGE RESULTS - WEATHER
var longitude;
var latitude;
var city;
var date;
var tempF;
var wind;
var humidity;


function getCoordinates(cityName) {

    // USER WILL INPUT CITY, BUT I NEED TO RETURN COORDINATES IN ORDER TO PROPERLY PERFORM FORECAST RETURN

    var requestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=${apiKey}`;

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
            saveToStorage(myCity.name)
            getWeather(myCity.lat, myCity.lon)
        })
}

function getWeather(lat, lon) {
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=01ca93f221f7d52fb6c774e5960d91fd`;

    fetch(requestURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (weather) {
            console.log(weather);
        })
};

//CREATE .JSON ARRAY FOR LOCAL STORAGE
function saveToStorage(newCity) {
    var dataStore = JSON.parse(localStorage.getItem('cities')) || [];
    dataStore.push(newCity)
    localStorage.setItem("cities", JSON.stringify(dataStore))
}

function loadStorage() {
    var dataStore = JSON.parse(localStorage.getItem('cities')) || [];
    if (dataStore.length == 0) {
        return
    }
    //for loop to get the elements in the screen
    // getCoordinates(innerHTML of that button)

}

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