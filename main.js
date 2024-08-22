const template = document.querySelector("#single-pet-template");
const wrapper = document.createDocumentFragment();

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

// Fetching Dynmic Pets from data file
async function petsCards() {
    const petsLink = await fetch("pets.json");
    const petsJson = await petsLink.json();
    petsJson.forEach(pet => {
        const clone = template.content.cloneNode(true);

        clone.querySelector("h3").textContent = pet.name;
        clone.querySelector("p").textContent = pet.description;
        clone.querySelector("span").textContent = pet.birthYear;
        clone.querySelector(".pet-image").innerHTML = `<img src="${pet.photo}" />`;

        wrapper.appendChild(clone);
    });
    document.querySelector(".pets-cards").appendChild(wrapper);
}

petsCards();

