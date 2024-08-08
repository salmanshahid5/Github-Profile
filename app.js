const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get User Data
async function getUser(username) {
  try {
    const response = await fetch(APIURL + username);
    if (!response.ok) {
      throw new Error('No profile with this username');
    }
    const user = await response.json();
    console.log(user);
    displayUser(user);
    getRepos(username);
  } catch (err) {
    createErrorCard(err.message);
  }
}

// Get User Repositories
async function getRepos(username) {
  try {
    const response = await fetch(APIURL + username + "/repos");
    if (!response.ok) {
      throw new Error('Problem fetching repositories');
    }
    const repos = await response.json();
    console.log(repos);
    displayRepo(repos);
  } catch (err) {
    createErrorCard(err.message);
  }
}


