const { MongoClient } = require("mongodb");

// Secure environment
const handler = async () => {
  const client = new MongoClient(process.env.DBCONNECT);
  await client.connect();

  const pets = await client.db().collection("pets-adoption").find().toArray();
  client.close();

  return {
    statusCode: 200, // Success
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(pets),
  };
};

module.exports = { handler };
