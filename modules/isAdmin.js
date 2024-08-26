const cookie = require("cookie");

async function isAdmin(event) {
  const cookieIncoming = cookie.parse(event.headers.cookie || "");
  if (cookieIncoming.petadoption === "ACDSKJhd7f2310PW") {
    return true;
  }
  return false;
}

module.exports = isAdmin;
