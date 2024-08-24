// Check and verify cookie
async function start() {
  const cookieLink = await fetch("/.netlify/functions/admin");
  const cookieJson = await cookieLink.json();

  // Login or Logout per the cookie set
  if (cookieJson.success) {
    // load the admin dashboard UI
  } else {
    window.location = "/login";
  }
}

start();
