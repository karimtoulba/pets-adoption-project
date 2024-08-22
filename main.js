// Fetching and printing the weather data from Weather.com
async function start() {
  const weatherLink = await fetch(
    "https://api.weather.gov/gridpoints/MFL/110,50/forecast"
  );

  const weatherJson = await weatherLink.json();
  const theWeather = weatherJson.properties.periods[0].temperature;
  document.querySelector("#weather-output").textContent = theWeather;
}

start();
