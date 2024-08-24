const cookie = require("cookie");

// Secure environment
const handler = async (event) => {
  // Parse Cookie
  const cookieIncoming = cookie.parse(event.headers.cookie || "");

  // Verify Cookie Value
  if (cookieIncoming.petadoption == "ACDSKJhd7f2310PW") {
    return {
      statusCode: 200, // Success
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  } else {
    return {
      statusCode: 200, // False
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false }),
    };
  }
};

module.exports = { handler };
