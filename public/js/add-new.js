document.querySelector("#add-new-pet-form").addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault(); // Prevent default form redirection

  const pet = {
    name: document.querySelector("#name").value,
    species: document.querySelector("#species").value,
    birthYear: document.querySelector("#birthYear").value,
    description: document.querySelector("#description").value,
  };

  const newLink = await fetch("/.netlify/functions/add-new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });

  const newJson = await newLink.json();

  // Redirect to Admin Dashboard if successfully submitted
  if (newJson.success) {
    window.location = "/admin";
  }
}
