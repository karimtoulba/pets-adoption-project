const isAdmin = require("../../modules/isAdmin.js"); // Check if is admin
const dbClient = require("../../modules/db-client.js"); // Establish Database Connection
const cookie = require("cookie"); // Load the Cookie package

// Secure environment
const handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log(body);

  if (isAdmin(event)) {
    return {
      statusCode: 200, // False
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  }

  // False
  return {
    statusCode: 200, // False
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };
