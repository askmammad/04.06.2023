async function logJSONData(infoData) {
  const response = await fetch(infoData);
  const jsonData = await response.json();
  printFunc(jsonData);
}

async function printFunc(jsonData) {
  let name = document.getElementById("name");
  let username = document.getElementById("username");
  let followers_number = document.getElementById("followers_number");
  let following_number = document.getElementById("following_number");
  let bio = document.getElementById("bio");
  name.innerHTML = jsonData.name;
  username.innerHTML = jsonData.login;
  followers_number.innerHTML = jsonData.followers;
  following_number.innerHTML = jsonData.following;
  bio.innerHTML = jsonData.bio;

}

let infoData = "https://api.github.com/users/askmammad";
logJSONData(infoData);
