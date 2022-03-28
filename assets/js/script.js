var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var dateEl = document.querySelector("#date");
var datesEl = document.querySelector(".dates");
var dates1El = document.querySelector(".dates1");
var dates2El = document.querySelector(".dates2");
var dates3El = document.querySelector(".dates3");
var dates4El = document.querySelector(".dates4");
var currentWeatherItemEl = document.querySelector("#current-weather-item");
var weatherForecastEl = document.querySelector("weather-forecast");
var currentTempEl = document.querySelector("#current-temp");
var cityHistoryEl = document.querySelector("#citySearchHistory");
var citySavedEl = document.querySelector("data-search");
var cityArr = [];

setInterval(() => {
  let daytime = moment();
  dateEl.innerHTML = daytime.format("LL");
  datesEl.innerHTML = daytime.add(1, "days").calendar();
  dates1El.innerHTML = daytime.add(1, "days").calendar();
  dates2El.innerHTML = daytime.add(1, "days").calendar();
  dates3El.innerHTML = daytime.add(1, "days").calendar();
  dates4El.innerHTML = daytime.add(1, "days").calendar();
}, 1000);

function cityHistory() {
  cityHistoryEl.innerHTML = "";

  for (var i = cityArr.length - 1; i >= 0; i--) {
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-controls", "today forcast");
    btn.classList.add("btn");
    btn.setAttribute("data-search", cityArr[i]);
    btn.textContent = cityArr[i];
    cityHistoryEl.append(btn);
  }
}

putInHistory = function (city) {
  if (cityArr.indexOf(city) !== -1) {
    return;
  }
  cityArr.push(city);
  localStorage.setItem("city-search", JSON.stringify(cityArr));
  console.log(city);
  cityHistory();
};

function cityKeepHistory() {
  var storedCities = localStorage.getItem("city-search");
  if (storedCities) {
    cityArr = JSON.parse(storedCities);
  }
  cityHistory();
}
var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInputEl.value;

  if (city) {
    getCityWeather(city);
    getFiveDay(city);
    putInHistory(city);

    // clear old content
    cityContainerEl.textContent = " ";
    cityInputEl.value = " ";
  } else {
    alert("Please enter a City");
  }
  // console.log(city);
};

getCityWeather = function (city) {
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=5b84242e057e4db6d505a48364570d4d&units=imperial";

  fetch(weatherUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        // console.log(response);
        response.json().then(function (data) {
          // console.log(data);
          displayCity(data, city);
        });
      } else {
        alert("Error: " + response.statusText);
      }
      // console.log(response);
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};

getFiveDay = function (city) {
  var fiveDayWeatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=5b84242e057e4db6d505a48364570d4d&units=imperial";

  fetch(fiveDayWeatherUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data);
        displayFiveDay(data, city);
      });
    } else {
      alert("error: " + response.statusText);
    }
    // console.log(response);
  });
};
var displayFiveDay = function (citys) {
  // for (var citys = 1; i >= 33; i += 8) {
  const { temp } = citys.list[1].main;
  const { icon } = citys.list[1].weather[0];
  const { humidity } = citys.list[1].main;
  const { speed } = citys.list[1].wind;
  // console.log(temp, icon, humidity, speed);

  document.querySelector(".temps").innerHTML = "Temp: " + temp + "&#176; F";
  document.querySelector(".humiditys").innerHTML =
    "Humidity: " + humidity + "%";
  document.querySelector(".winds").innerHTML = "Wind Speed: " + speed + "MPH";
  document.querySelector(".w-icon").src =
    "http://openweathermap.org/img/wn/" + icon + "@2x.png";

  var tempA = Object.values(citys.list[9].main)[0];
  var iconA = Object.values(citys.list[9].weather[0])[3];
  var humidityA = Object.values(citys.list[9].main)[7];
  var speedA = Object.values(citys.list[9].wind)[0];
  document.querySelector(".tempA").innerHTML = "Temp: " + tempA + "&#176; F";
  document.querySelector(".humidityA").innerHTML =
    "Humidity: " + humidityA + "%";
  document.querySelector(".windA").innerHTML = "Wind Speed: " + speedA + "MPH";
  document.querySelector(".iconA").src =
    "http://openweathermap.org/img/wn/" + iconA + "@2x.png";
  // console.log(tempA, iconA, humidityA, speedA);
  var temp2 = Object.values(citys.list[17].main)[0];
  var icon2 = Object.values(citys.list[17].weather[0])[3];
  var humidity2 = Object.values(citys.list[17].main)[7];
  var speed2 = Object.values(citys.list[17].wind)[0];
  console.log(temp2, icon2, 2, humidity2, speed2);
  document.querySelector(".temp2").innerHTML = "Temp: " + temp2 + "&#176; F";
  document.querySelector(".humidity2").innerHTML =
    "Humidity: " + humidity2 + "%";
  document.querySelector(".wind2").innerHTML = "Wind Speed: " + speed2 + "MPH";
  document.querySelector(".icon2").src =
    "http://openweathermap.org/img/wn/" + icon2 + "@2x.png";
  var temp3 = Object.values(citys.list[25].main)[0];
  var icon3 = Object.values(citys.list[25].weather[0])[3];
  var humidity3 = Object.values(citys.list[25].main)[7];
  var speed3 = Object.values(citys.list[25].wind)[0];
  // console.log(temp3, icon3, humidity3, speed3);
  document.querySelector(".temp3").innerHTML = "Temp: " + temp3 + "&#176; F";
  document.querySelector(".humidity3").innerHTML =
    "Humidity: " + humidity3 + "%";
  document.querySelector(".wind3").innerHTML = "Wind Speed: " + speed3 + "MPH";
  document.querySelector(".icon3").src =
    "http://openweathermap.org/img/wn/" + icon3 + "@2x.png";
  var temp4 = Object.values(citys.list[33].main)[0];
  var icon4 = Object.values(citys.list[33].weather[0])[3];
  var humidity4 = Object.values(citys.list[33].main)[7];
  var speed4 = Object.values(citys.list[33].wind)[0];
  // console.log(temp4, icon4, humidity4, speed4);
  document.querySelector(".temp4").innerHTML = "Temp: " + temp4 + "&#176; F";
  document.querySelector(".humidity4").innerHTML =
    "Humidity: " + humidity4 + "%";
  document.querySelector(".wind4").innerHTML = "Wind Speed: " + speed4 + "MPH";
  document.querySelector(".icon4").src =
    "http://openweathermap.org/img/wn/" + icon4 + "@2x.png";
};

var displayCity = function (citys) {
  const cityName = Object.values(citys.name);
  const temp = Object.values(citys.main)[0];
  const icon = Object.values(citys.weather[0])[3];
  const humidity = Object.values(citys.main)[0];
  const speed = Object.values(citys.wind)[0];
  document.querySelector(".temp-current").innerHTML = temp + "&#176; F";
  document.querySelector(".humidity-current").innerHTML = humidity + "%";
  document.querySelector(".wind-current").innerHTML = speed + "MPH";
  document.querySelector(".icon-main").src =
    "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  document.querySelector(".city").textContent = cityName.trim();
  console.log(typeof cityName);
};
cityFormEl.addEventListener("submit", formSubmitHandler);
// citySavedEl.addEventListener("submit", getCityWeather());
cityKeepHistory();
