const apiKey = "46b973110df00439f71588f3e586e099";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const input = document.querySelector(".search-box input");
const inputBtn = document.querySelector(".search-box button");

const weatherImg = document.querySelector(".weather-img");

async function checkWeather(city) {
  const request = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await request.json();
  console.log(data);

  if (request.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + "KM/H";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

    if (data.weather[0].main === "Clear") {
      weatherImg.src = "images/clear.png";
    } else if (data.weather[0].main === "Clouds") {
      weatherImg.src = "images/clouds.png";
    } else if (data.weather[0].main === "Rain") {
      weatherImg.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherImg.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherImg.src = "images/mist.png";
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  }
}

inputBtn.addEventListener("click", () => {
  checkWeather(input.value);
});

input.addEventListener("keydown", (e)=> {
  if(e.key === "Enter") {
    checkWeather(input.value)
  }
})