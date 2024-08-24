const cookie = require("cookie");

// Secure environment
const handler = async (event) => {
  // Parse incoming data
  const loginIncoming = JSON.parse(event.body);

  // Verify login information
  if (loginIncoming.username == "admin" && loginIncoming.password == "password") {
    // Set Cookie
    const myCookie = cookie.serialize("petadoption", "ACDSKJhd7f2310PW", {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return {
      statusCode: 200, // Success
      headers: { "Content-Type": "application/json", "Set-Cookie": myCookie },
      body: JSON.stringify({ success: true }),
    };
  } else {
    return {
      statusCode: 200, // Success
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false }),
    };
  }
};

module.exports = { handler };
