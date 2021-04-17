// Define HTML elements
citySearch = document.getElementById("city-search");
cityInput = document.getElementById("city");
apiKey = "f9f66e4d8cd2e7c1f9cea3662563d53e"
// var weatherData = {};

var currentWeatherHeader = document.getElementById("current-weather")
// currentIconEl = ?????
var currentTempEl = document.getElementById("current-temp")
var currentHumidityEl = document.getElementById("current-humidity")
var currentWindSpeedEl= document.getElementById("wind-speed")
var currentUvIndexEl = document.getElementById("uv-index")
//----------------------
var futureDate1 = document.getElementById("future-date-1")
var futureTemp1 = document.getElementById("future-temp-1")
var futureHumidity1 = document.getElementById("future-humidity-1")




// citySearch.addEventListener("click", callApi);

citySearch.addEventListener("click", function(event) {
// function callApi(event) {
    // debugger;
    event.preventDefault();
    var cityInputValue = cityInput.value;
    // Gets lat-lon data from Geocoding API for use in One Call API.
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityInputValue + "&limit=1&appid=" + apiKey).then(function(response) {
        return response.json().then(function(latLonData) {
            var lat = latLonData[0].lat
            var lon = latLonData[0].lon
            // Use One Call API with lat-lon input to get weather data in imperial units, excluding hourly and minute forcast data.
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=" + apiKey).then(function(weatherResponse) {
                return weatherResponse.json().then(function(weatherData) {
                    console.log(weatherData)
                    // displayWeather(weatherData);
                    console.log(weatherData.current.temp)
                    console.log(Math.round(weatherData.current.temp))
                    console.log(Math.round(weatherData.current.humidity))
                    console.log(Math.round(weatherData.current.wind_speed))
                    console.log(Math.round(weatherData.current.uvi))
                    // ----------- FUTURE
                    console.log(Math.round(weatherData.daily[0].temp.day))
                    console.log(Math.round(weatherData.daily[0].humidity))

                });
            });
        });
    });
});





// function misc() {
// }

// displayWeather() {
    // console.log(weatherData[0].current.temp)
// }














// localStorage.setItem(cityInputValue, weatherData)

//When a search history item is clicked, either run displayWeather using value, or pull from local storage and parse into weatherData.

// Math.round()  to round temps or other variables
// &exclude={part}
// Use onecall API for UV.
// Geocoding API for lat-long