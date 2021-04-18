// Define HTML elements
citySearch = document.getElementById("city-search");
cityInput = document.getElementById("city");
apiKey = "f9f66e4d8cd2e7c1f9cea3662563d53e"

citySearch.addEventListener("click", getWeather);

// Returns weather data.
function getWeather(event) {
    event.preventDefault();
    var cityInputValue = cityInput.value;
    // Gets lat-lon data from Geocoding API for use in One Call API.
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityInputValue + "&limit=1&appid=" + apiKey).then(function(response) {
        return response.json().then(function(latLonData) {
            var lat = latLonData[0].lat
            var lon = latLonData[0].lon
            var cityName = latLonData[0].name
            var stateName = latLonData[0].state
        // Use One Call API with lat-lon input to get weather data in imperial units, excluding hourly and minute forcast data.
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=" + apiKey).then(function(weatherResponse) {
                return weatherResponse.json().then(function(weatherData) {
                console.log(weatherData)
                renderWeather(weatherData, cityName, stateName)
                });
            });
        });
    });
};

// Display current weather data.
function renderWeather (weatherData, cityName, stateName) {
    $("#current-weather").text(cityName +", " + stateName + " - " + (moment.unix(weatherData.current.dt).format("M/DD")))
    var currentIcon = weatherData.current.weather[0].icon;
    $("#current-icon").attr("src", "https://openweathermap.org/img/w/" + currentIcon + ".png");
    $("#current-temp").text("Temperature: " + (Math.round(weatherData.current.temp)) + "°F")
    $("#current-humidity").text("Humidity: " + (Math.round(weatherData.current.humidity)) + "%")
    $("#wind-speed").text("Wind Speed: " + (Math.round(weatherData.current.wind_speed)) + " Mph")
    $("#uv-index").text("UV Index: "+(Math.round(weatherData.current.uvi)))
    // Styles UV index background color based on index value.
    if (weatherData.current.uvi < 4) {
        $("#uv-index").addClass("low-uv").removeClass("mid-uv high-uv");
    } else if (weatherData.current.uvi < 7) {
        $("#uv-index").addClass("mid-uv").removeClass("low-uv high-uv");
    } else {
        $("#uv-index").addClass("high-uv").removeClass("low-uv mid-uv");
    }
    // Display 5 day future forcast.
    for (i=1; i<6; i++) {
        $("#future-date"+i).text(moment.unix(weatherData.daily[i].dt).format("M/DD"))
        var futureIcon = weatherData.daily[i].weather[0].icon;
        $("#future-icon"+[i]).attr("src", "https://openweathermap.org/img/w/" + futureIcon + ".png");
        $("#future-temp"+i).text("Temperature: " + (Math.round(weatherData.daily[i].temp.day)) + "°F")
        $("#future-humidity"+i).text("Humidity: " + (Math.round(weatherData.daily[i].humidity)) + "%")
        }
};



// localStorage.setItem(cityInputValue, weatherData)
//When a search history item is clicked, either run getWeather using value, or pull from local storage and parse into weatherData.