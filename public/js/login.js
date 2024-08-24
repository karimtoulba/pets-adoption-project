// Check the login form data
document.querySelector("#login-form").addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault(); // Prevent redirect to another page

  // Post JSON data to .netlify/functions/login
  const loginLink = await fetch("/.netlify/functions/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
    }),
  });

  // Listen to incoming JSON data
  const loginJson = await loginLink.json();

  // Apply results
  if (loginJson.success) {
    window.location = "/admin";
  } else {
    console.log("Try again later");
  }
}
