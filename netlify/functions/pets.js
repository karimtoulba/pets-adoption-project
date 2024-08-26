const dbClient = require("../../modules/db-client.js");

// Secure environment
const handler = async () => {
  const client = await dbClient();

  const pets = await client.db().collection("pets-adoption").find().toArray();
  client.close();

  return {
    statusCode: 200, // Success
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(pets),
  };
};

module.exports = { handler };
