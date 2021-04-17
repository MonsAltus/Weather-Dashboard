// Define HTML elements
citySearch = document.getElementById("city-search");
cityInput = document.getElementById("city");
apiKey = "f9f66e4d8cd2e7c1f9cea3662563d53e"
// var weatherData = {};

// var currentWeatherHeader = document.getElementById("current-weather")
// // currentIconEl = ?????
// var currentTempEl = document.getElementById("current-temp")
// var currentHumidityEl = document.getElementById("current-humidity")
// var currentWindSpeedEl= document.getElementById("wind-speed")
// var currentUvIndexEl = document.getElementById("uv-index")
//----------------------
var futureDate1 = document.getElementById("future-date-1")
var futureTemp1 = document.getElementById("future-temp-1")
var futureHumidity1 = document.getElementById("future-humidity-1")
// var lat = ""
// var lon = ""



citySearch.addEventListener("click", getLatLon);

// citySearch.addEventListener("click", function(event) {
// Gets lat-lon data from Geocoding API for use in One Call API.
function getLatLon(event) {
    // debugger;
    event.preventDefault();
    var cityInputValue = cityInput.value;
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityInputValue + "&limit=1&appid=" + apiKey).then(function(response) {
        return response.json().then(function(latLonData) {
            var lat = latLonData[0].lat
            var lon = latLonData[0].lon
            var cityName = latLonData[0].name
            var stateName = latLonData[0].state
            getWeather(lat, lon, cityName, stateName)
        });
    });
};


// Use One Call API with lat-lon input to get weather data in imperial units, excluding hourly and minute forcast data.
function getWeather(lat, lon, cityName, stateName) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=" + apiKey).then(function(weatherResponse) {
    return weatherResponse.json().then(function(weatherData) {
        console.log(weatherData)
        // displayWeather(weatherData);
        var currentDate = moment.unix(weatherData.current.dt).format("M/DD")
        $("#current-weather").text(cityName +", " + stateName + " - " + currentDate)
        $("#current-temp").text("Temperature: " + (Math.round(weatherData.current.temp)) + "°F")
        $("#current-humidity").text("Humidity: " + (Math.round(weatherData.current.humidity)) + "%")
        $("#wind-speed").text("Wind Speed: " + (Math.round(weatherData.current.wind_speed)) + " Mph")
        $("#uv-index").text("UV Index: "+(Math.round(weatherData.current.uvi)))


                    // console.log()
                    // console.log(Math.round(weatherData.current.temp))
                    // console.log(Math.round(weatherData.current.humidity))
                    // console.log(Math.round(weatherData.current.wind_speed))
                    // console.log()
                    // ----------- FUTURE

        for (i=1; i<6; i++) {
            $("#future-date"+i).text(moment.unix(weatherData.daily[i].dt).format("M/DD"))
            $("#future-icon"+i)
            $("#future-temp"+i).text("Temperature: " + (Math.round(weatherData.daily[i].temp.day)) + "°F")
            $("#future-humidity"+i).text("Humidity: " + (Math.round(weatherData.daily[i].humidity)) + "%")
        }





        });
    });
};




// function misc() {
// }

// displayWeather() {
    // console.log(weatherData[0].current.temp)
// }














// localStorage.setItem(cityInputValue, weatherData)

//When a search history item is clicked, either run displayWeather using value, or pull from local storage and parse into weatherData.

// Math.round()  to round temps or other variables
// &exclude={part}
// Use onecall API for UV index.
// Geocoding API for lat-long