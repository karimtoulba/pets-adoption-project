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
    clone.querySelector("span").textContent = sinceYears(pet.birthYear);
    clone.querySelector(".pet-image").innerHTML = noImage(pet.photo, pet.description);

    wrapper.appendChild(clone);
  });
  document.querySelector(".pets-cards").appendChild(wrapper);
}

petsCards();

// Calculating the pet age
function sinceYears(petYear) {
    const currentYear = new Date().getFullYear();
    const petAge = currentYear - petYear;
    if (petAge == 1) {return `A year ago`}
    if (petAge == 0) {return `Less than a year ago`}
    return `${petAge} years ago`
}

// Failed Image - Fallen Back Default Image
function noImage(petImage, petAlt) {
    if (petImage == null) {return `<img src="/images/default.png" alt="No Image" />`}
    return `<img src="${petImage}" alt="${petAlt}" />`
}