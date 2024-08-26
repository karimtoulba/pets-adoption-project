const cookie = require("cookie");
const { MongoClient } = require("mongodb");

// Secure environment
const handler = async (event) => {
  // Parse Cookie
  const cookieIncoming = cookie.parse(event.headers.cookie || "");

  // Connect to Database
  const client = new MongoClient(process.env.DBCONNECT);
  await client.connect();

  const pets = await client.db().collection("pets-adoption").find().toArray();
  client.close();
  
  // Verify Cookie Value
  if (cookieIncoming.petadoption == "ACDSKJhd7f2310PW") {
    const petsHTML = generateHTML(pets);

    return {
      statusCode: 200, // Success
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, pets: petsHTML }),
    };
  } else {
    return {
      statusCode: 200, // False
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false }),
    };
  }

  function generateHTML(pets) {
    ourHTML = `<div class="pets-cards">`;
    ourHTML += pets
      .map((pet) => {
        return `<div class="single-pet-card">
                <div class="pet-text">
                  <h3>${pet.name}</h3>
                  <p>${pet.description}</p>
                  <div class="admin-buttons">
                  <button class="admin-button">Edit</button> <button class=" admin-button">Delete</button>
                  </div>
                </div>
                <div class="pet-image">
                  <img src="../${pet.photo}" />
                </div>
              </div>`;
      })
      .join("");
    ourHTML += `</div>`;
    return ourHTML;
  }
};

module.exports = { handler };
