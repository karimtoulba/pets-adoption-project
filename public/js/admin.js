async function start() {
  dataLink = await fetch("/.netlify/functions/admin");
  dataJson = await dataLink.json();
  console.log(dataJson);
}

start();
