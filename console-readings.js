JS line47 (myCity) =
{ name: 'Herbert', lat: 29.5894017, lon: -95.5938342, country: 'US', state: 'Texas' }

country: "US"
lat: 29.5894017
lon: -95.5938342
name: "Herbert"
state: "Texas"

JS Line65 (dataStore):
(4)['Manchester', 'Herbert', 'Small', 'Bern']
0: "Manchester"
1: "Herbert"
2: "Small"
3: "Bern"
length: 4

JS Line 98 (console.log weather)
{ coord: {… }, weather: Array(1), base: 'stations', main: {… }, visibility: 10000, … }
base
:
"stations"
clouds
:
{ all: 100 }
cod
:
200
coord
:
{ lon: -98.4221, lat: 30.1007 }
dt
:
1682395579
id
:
4674911
main
:
{ temp: 62.44, feels_like: 62.28, temp_min: 61.32, temp_max: 63.79, pressure: 1013, … }
name
:
"Blanco"
sys
:
{ type: 2, id: 2080025, country: 'US', sunrise: 1682337438, sunset: 1682384763 }
timezone
:
-18000
visibility
:
10000
weather
:
[{… }]
wind
:
{ speed: 1.99, deg: 140, gust: 7 }

console.log(weather);

console.log(weather.name);

console.log(weather.wind.speed);

console.log(weather.dt);

console.log(weather.weather[0].description);

console.log(weather.weather[0].icon);

console.log(weather.main.temp);

console.log(weather.main.humidity);