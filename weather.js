const APIkey = "e529cceddc2a48c4ee6efe2d4837e670";
const weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorBox = document.querySelector(".error");
const weatherBox = document.querySelector(".weather");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherConditionText = document.querySelector(".weather-condition");

async function fetchWeather(query) {
  try {
    const response = await fetch(`${weatherURL}&${query}&appid=${APIkey}`);
    const data = await response.json();

    if (response.status === 404 || !data.name) {
      showError();
    } else {
      console.log(data.weather[0].main);
      updateWeather(data);
    }
  } catch (error) {
    showError();
  }
}

function updateWeather(data) {
  cityElement.textContent = data.name;
  tempElement.textContent = `${Math.round(data.main.temp)} °C`;
  humidityElement.textContent = `${data.main.humidity}%`;
  windElement.textContent = `${data.wind.speed} km/hr`;
  weatherConditionText.textContent = data.weather[0].main;
  const weatherCondition = data.weather[0].main;
  weatherIcon.src = getWeatherIcon(weatherCondition);

  weatherBox.style.display = "block";
  errorBox.style.display = "none";
}

function showError() {
  weatherBox.style.display = "none";
  errorBox.style.display = "block";
}

function getWeatherIcon(weatherCondition) {
  switch (weatherCondition) {
    case "Clear":
      return "pictures/clear.png";
    case "Clouds":
      return "pictures/clouds.png";
    case "Rain":
      return "pictures/rain.png";
    case "Drizzle":
      return "pictures/drizzle.png";
    case "Thunderstorm":
      return "pictures/thunderstorm.png";
    case "Snow":
      return "pictures/snow.png";
    case "Mist":
      return "pictures/mist.png";
    case "Haze":
      return "pictures/haze.png";
    case "Fog":
      return "pictures/fog.png";
    case "Smoke":
      return "pictures/smoke.png";
    case "Dust":
      return "pictures/dust.png";
    case "Squall":
      return "pictures/squall.png";
    case "Tornado":
      return "pictures/tornado.png";
    default:
      return "pictures/clear.png";
  }
}

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(`lat=${lat}&lon=${lon}`);
      },
      (error) => {
        showError();
        console.error("Error getting location:", error);
      }
    );
  } else {
    showError();
    console.error("Geolocation is not supported by this browser.");
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  if (city) {
    fetchWeather(`q=${city}`);
  }
});
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = searchBox.value;
    if (city) {
      fetchWeather(`q=${city}`);
    }
  }
});

window.onload = () => {
  getCurrentLocationWeather();
};
