const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// get UserName
async function getUser(username) {
  try {
    const response = await fetch(APIURL + username);
    const responseJson = await response.json();
    console.log(responseJson);
  } catch (err) {
    if(err.response.status == 404) {
        createErrorCard('No profile with this username')
    }
  }
}

getUser("salmanshahid5");

