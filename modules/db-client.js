const { MongoClient } = require("mongodb");

async function dbClient() {
  const client = new MongoClient(process.env.DBCONNECT);
  await client.connect();
  return client;
}

module.exports = dbClient;
