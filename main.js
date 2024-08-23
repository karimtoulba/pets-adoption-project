// Weather temperature
const template = document.querySelector("#single-pet-template");
const wrapper = document.createDocumentFragment();

async function weatherData() {
  const weatherLink = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast");
  const weatherJson = await weatherLink.json();
  const temperature = weatherJson.properties.periods[0].temperature;
  document.querySelector("#weather-output").textContent = temperature;
}

weatherData();

// Dynamic Pets Cards
async function petsCards() {
  const petsLink = await fetch("https://pets-adoption-netlify.netlify.app/.netlify/functions/pets");
  const petsJson = await petsLink.json();
  petsJson.forEach((pet) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".single-pet-card").dataset.type = pet.species;
    clone.querySelector("h3").textContent = pet.name;
    clone.querySelector("p").textContent = pet.description;
    clone.querySelector("span").textContent = sinceYear(pet.birthYear);
    clone.querySelector(".pet-image").innerHTML = theImage(pet.photo, pet.description);

    wrapper.appendChild(clone);
  });
  document.querySelector(".pets-cards").appendChild(wrapper);
}

petsCards();

// Calculating Pet Years
function sinceYear(petYear) {
  const currentYear = new Date().getFullYear();
  const petAge = currentYear - petYear;
  if (petAge == 1) {
    return `A year ago`;
  }
  if (petAge == 0) {
    return `Less than a year ago`;
  }
  return `${petAge} years ago`;
}

// Bringing the Image & Alt Tags (& Fallen Back image)
function theImage(petImage, petAlt) {
  if (petImage == null) {
    return `<img src="images/default.png" alt="No image" />`;
  }
  return `<img src="${petImage}" alt="${petAlt}" />`;
}

// Filtering the Pets
const allButtons = document.querySelectorAll(".pets-filter button");

allButtons.forEach((element) => {
  element.addEventListener("click", handleClick);
});

function handleClick(event) {
  // Remove active class
  allButtons.forEach((element) => {
    element.classList.remove("active");
  });

  // Add active class to target
  event.target.classList.add("active");

  // Actually filter the pets according to the filter selection
  const allPets = document.querySelectorAll(".single-pet-card");
  const currentFilter = event.target.dataset.filter;

  allPets.forEach((element) => {
    if (currentFilter == element.dataset.type || currentFilter == "all") {
      element.style.display = "grid";
    } else {
      element.style.display = "none";
    }
  });
}
