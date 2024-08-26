const cleanUp = require("../../modules/cleanUp.js");
const dbClient = require("../../modules/db-client.js");
const isAdmin = require("../../modules/isAdmin.js");

// Secure environment
const handler = async (event) => {
  // Parse Data
  const body = JSON.parse(event.body);
  // Define pet
  const pet = {
    name: cleanUp(body.name),
    species: cleanUp(body.species),
    birthYear: new Date().getFullYear(),
    description: cleanUp(body.description),
  };

  // Verify birthYear
  if (body.birthYear > 1950 && body.birthYear < 2050) {
    pet.birthYear = body.birthYear;
  }

  if (isAdmin(event)) {
    // Connect to DB
    const client = await dbClient();
    // Insert into the DB
    const pets = await client.db().collection("pets-adoption").insertOne(pet);
    client.close();

    return {
      statusCode: 200, // Success
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  }
  return {
    statusCode: 200, // Success
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };
