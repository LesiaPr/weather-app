function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  celsiusTemp = response.data.main.temp;
  celsiusTempMax = response.data.main.temp_max;
  celsiusTempMin = response.data.main.temp_min;
  celsiusFeelsLike = response.data.main.feels_like;

  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + `%`;
  meterWindSpeed = response.data.wind.speed;
  document.querySelector("#wind").innerHTML =
    Math.round(meterWindSpeed) + ` km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temp-max").innerHTML =
    Math.round(celsiusTempMax) + `&deg`;
  document.querySelector("#temp-min").innerHTML =
    Math.round(celsiusTempMin) + `&deg`;
  document.querySelector("#feels-like").innerHTML =
    Math.round(celsiusFeelsLike) + `&deg`;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      "http://openweathermap.org/img/w/" +
        response.data.weather[0].icon +
        ".png"
    );

  function currentTime() {
    let date = new Date((response.data.dt + response.data.timezone) * 1000);
    let minute1 = date.getMinutes();
    if (minute1 < 10) {
      minute1 = `0${minute1}`;
    }
    let hours2 = date.getUTCHours();
    let hours1 = date.getUTCHours();
    var ampm = hours1 >= 12 ? "pm" : "am";
    hours1 = hours1 % 12;
    hours1 = hours1 ? hours1 : 12; // the hour '0' should be '12'
    let date1 = date.getUTCDate();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let country = response.data.sys.country;

    if (
      country === "CA" ||
      country === "AU" ||
      country === "NZ" ||
      country === "US" ||
      country === "PH"
    ) {
      return `${day}, ${date1} ${month} ${hours1}:${minute1} ${ampm}`;
    } else {
      return `${day}, ${date1} ${month} ${hours2}:${minute1}`;
    }
  }
  let currentDay = document.querySelector("#current-date");
  currentDay.innerHTML = currentTime();
}
function search(city) {
  let apiKey = "2e83e559867c8706e92fdf33c55ffaf1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}

function showLocation(position) {
  let apiKey = "2e83e559867c8706e92fdf33c55ffaf1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);

function showCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#wind").innerHTML =
    Math.round(meterWindSpeed) + ` km/h`;
  document.querySelector("#temp-max").innerHTML =
    Math.round(celsiusTempMax) + `&deg`;
  document.querySelector("#temp-min").innerHTML =
    Math.round(celsiusTempMin) + `&deg`;
  document.querySelector("#feels-like").innerHTML =
    Math.round(celsiusFeelsLike) + `&deg`;
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  document.querySelector("#temp").innerHTML = Math.round(fahrenheitTemp);
  let fahrenheitTempMax = (celsiusTempMax * 9) / 5 + 32;
  document.querySelector("#temp-max").innerHTML =
    Math.round(fahrenheitTempMax) + `&deg`;
  let fahrenheitTempMin = (celsiusTempMin * 9) / 5 + 32;
  document.querySelector("#temp-min").innerHTML =
    Math.round(fahrenheitTempMin) + `&deg`;
  let fahrenheitFeelsLike = (celsiusFeelsLike * 9) / 5 + 32;
  document.querySelector("#feels-like").innerHTML =
    Math.round(fahrenheitFeelsLike) + `&deg`;
  let milesSpeed = meterWindSpeed * 2.34;
  document.querySelector("#wind").innerHTML = Math.round(milesSpeed) + ` mph`;
}

let celsiusTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

search("Toronto");
