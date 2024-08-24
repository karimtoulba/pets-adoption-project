document.querySelector("#logout").addEventListener("click", handleLogout);

async function handleLogout() {
  // Remove the cookie
  const logoutLink = await fetch("/.netlify/functions/logout");
  const logoutJson = await logoutLink.json();

  // Redirect the page
  window.location = "/";
}
