// Check and verify cookie
async function start() {
  const cookieLink = await fetch("/.netlify/functions/admin");
  const cookieJson = await cookieLink.json();

  // Login or Logout per the cookie set
  if (cookieJson.success) {
    document.querySelector("#render-pets").innerHTML = cookieJson.pets;
  } else {
    window.location = "/login";
  }
}

start();

// Add New Pet Button
document.querySelector("#add-new").addEventListener("click", handleClick);

function handleClick() {
  window.location = "/admin/add-new.htm";
}
