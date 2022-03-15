var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");

var formSubmitHandler = function () {
  event.preventDefault();

  var city = cityInputEl.value.trim();

  if (city) {
    getCityWeather(city);

    // clear old content
    cityContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
  console.log(city);
};

getCityWeather = function (city) {
  var weatherUrl =
    "api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid={5b84242e057e4db6d505a48364570d4d}";

  fetch(weatherUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayCity(data, city);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};

var displayCity = function (citys, searchTerm) {
  if (citys.length === 0) {
    cityContainerEl.textContent = "City not found.";
    return;
  }

  citySearchTerm.textContent = searchTerm;

  for (var i = 0; i < citys.length; i++) {
    var cityName = citys[i].name;

    var cityEl = document.createElement("a");
    cityEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = cityName;

    // append to container
    cityEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // append to container
    cityEl.appendChild(statusEl);

    // append container to the dom
    cityContainerEl.appendChild(cityEl);
  }
};
cityFormEl.addEventListener("submit", formSubmitHandler);
