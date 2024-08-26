const cookie = require("cookie");

// Secure environment
const handler = async (event) => {
  const body = JSON.parse(event.body);

  const cookieIncoming = cookie.parse(event.headers.cookie || "");

  if (cookieIncoming.petadoption == "ACDSKJhd7f2310PW") {
    return {
      statusCode: 200, // False
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  }

  return {
    statusCode: 200, // False
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };
