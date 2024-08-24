const cookie = require("cookie");

// Secure environment
const handler = async () => {
  const myCookie = cookie.serialize("petadoption", "-", {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 0,
  });
  return {
    statusCode: 200, // False
    headers: { "Content-Type": "application/json", "Set-Cookie": myCookie },
    body: JSON.stringify({ success: true }),
  };
};

module.exports = { handler };
