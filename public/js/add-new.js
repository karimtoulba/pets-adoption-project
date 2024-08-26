document.querySelector("#add-new-pet-form").addEventListener("submit", handleNewPet);

async function handleNewPet(e) {
  e.preventDefault();

  const pet = {
    name: document.querySelector("#name").value,
    birthYear: document.querySelector("#birthYear").value,
    species: document.querySelector("#species").value,
    description: document.querySelector("#description").value,
  };

  const newLink = await fetch("/.netlify/functions/add-new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });

  const newJson = await newLink.json();

  // Redirect to admin page if Logged in
  if (newJson.success) {
    window.location = "/admin";
  }
}
