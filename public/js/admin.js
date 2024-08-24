async function start() {
  adminLink = await fetch("/.netlify/functions/admin");
  adminJson = await dataLink.json();
  console.log(dataJson);
}

start();
