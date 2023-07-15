function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(celsiusTemp);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(meterWindSpeed) + ` km/h`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temp = document.querySelector("#temp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
  let wind = document.querySelector("#wind");
  let milesSpeed = meterWindSpeed * 2.34;
  wind.innerHTML = Math.round(milesSpeed) + ` mph`;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function currentDateTime(date) {
  let weeksName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = weeksName[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
}
let date = new Date();
let currentDay = document.querySelector("#current-date");
currentDay.innerHTML = currentDateTime(date);

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  meterWindSpeed = response.data.wind.speed;
  document.querySelector("#wind").innerHTML =
    Math.round(meterWindSpeed) + ` km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "2e83e559867c8706e92fdf33c55ffaf1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
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
let celsiusTemp = null;

search("Toronto");
