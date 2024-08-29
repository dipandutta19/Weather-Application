// Create your own Weather App api key from https://openweathermap.org/

// Step 1: Set up Api Key
const apiKey = "6d055e39ee237af35ca066f35474e9df"


window.onload = function () {
    document.getElementById('searchCity').value = 'Kolkata';
    getWeather();

    // Add event listener for Enter key
    document.getElementById('searchCity').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission
            getWeather(); // Call the search function
        }
    });
};

function getWeather() {
    const city = document.getElementById('searchCity').value;
    if (city === '') {
        alert('Please enter a valid city.');
        return;
    }

    // Step 2: Set up apiUrl
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Step 3: Fetch JSON Data

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error Occured ', error);
        });

}

function displayWeather(data) {
    const cityName = data.name;
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    const apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(apiUrl2)
        .then(response => response.json())
        .then(data => {
            displayWeatherDetails(data);
        })
        .catch(error => {
            console.error('Error Occured ', error);
        });

    document.getElementById('city').innerHTML = cityName;
    document.getElementById('latitude').innerHTML = lat.toFixed(2);
    document.getElementById('longitude').innerHTML = lon.toFixed(2);
    x = new Date();
    document.getElementById('date').innerHTML = x.toDateString();

}

function displayWeatherDetails(data) {
    // document.getElementById('Report').innerHTML += 
    // '<br>Dew Point : ' + data.current.dew_point + 
    // '<br>Pressure : ' + data.current.pressure +
    // '<br>Humidity : ' + data.current.humidity;
    const timezone = data.timezone;
    const dewpoint = data.current.dew_point;
    const feels_like = data.current.feels_like;
    const humidity = data.current.humidity;
    const pressure = data.current.pressure;
    const temp = data.current.temp;
    const visibility = data.current.visibility;
    const wind_deg = data.current.wind_deg;
    const wind_speed = data.current.wind_speed;
    const weatherDescription = data.current.weather[0].description;

    //For Sunrise and Sunset

    // Function to convert Unix timestamp to HH:MM:SS format
    function formatTime(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }

    // The Unix timestamps for sunrise and sunset
    let sunriseTimestamp = data.current.sunrise;
    let sunsetTimestamp = data.current.sunset;

    // Format the sunrise and sunset times
    var sunrise = formatTime(sunriseTimestamp);
    var sunset = formatTime(sunsetTimestamp);


    document.getElementById('Timezone').innerHTML = timezone;
    document.getElementById('DewPoint').innerHTML = dewpoint + "°C";
    document.getElementById('feels_like').innerHTML = feels_like + "°C";
    document.getElementById('humidity').innerHTML = humidity + "%";
    document.getElementById('Pressure').innerHTML = pressure + "hPa";
    document.getElementById('Sunrise').innerHTML = sunrise + " IST";
    document.getElementById('Sunset').innerHTML = sunset + " IST";
    document.getElementById('Temperature').innerHTML = temp + "°C";
    document.getElementById('Visibility').innerHTML = visibility + " meter";
    document.getElementById('WeatherType').innerHTML = data.current.weather[0].main;
    document.getElementById('WindDegree').innerHTML = wind_deg + "°";
    document.getElementById('WindSpeed').innerHTML = wind_speed + " meter/sec";
    document.getElementById('dashboard').innerHTML = temp.toFixed(0) + "°C" + " , " + toTitleCase(weatherDescription);

    // To make upper case
    function toTitleCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    // For weather icon
    var iconCode = data.current.weather[0].icon;
    if (iconCode == "01d") {
        document.getElementById('weather-icon').src = "sun.png";
        document.getElementById('weather-icon1').src = "sun.png";
        document.getElementById('weather-icon').style.height = "60px";
        document.getElementById('weather-icon1').style.height = "50px";
        document.getElementById('weather-icon').style.paddingRight = "1%";
    } else if (iconCode == "01n") {
        document.getElementById('weather-icon').src = "moon.png";
        document.getElementById('weather-icon1').src = "moon.png";
        document.getElementById('weather-icon').style.height = "50px";
        document.getElementById('weather-icon1').style.height = "30px";
        document.getElementById('weather-icon').style.paddingRight = "1%";
    } else {
        displayWeatherIcon(iconCode);
    }
}

function displayWeatherIcon(iconCode) {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Display the icon (assuming you have an element with id 'weather-icon')
    document.getElementById('weather-icon').src = iconUrl;
    document.getElementById('weather-icon1').src = iconUrl;

}