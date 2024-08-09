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

// Display User Data
function displayUser(user) {
  const card = `<div class="card">
    <div>
      <img src="${user.avatar_url}" alt="" class="avatar">
    </div>
    <div class="user-info">
      <h2>${user.name || user.login}</h2>
      <p>${user.bio || 'No bio available'}</p>
      <ul class="info">
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repositories</strong></li>
      </ul>
      <div id="repos"></div>
    </div>
  </div>`;
  main.innerHTML = card;
}

// Display User Repositories
function displayRepo(repos) {
  const reposEl = document.getElementById('repos');
  repos.slice(0, 3).forEach((repo) => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;
    reposEl.appendChild(repoEl);
  });
}

// Create Error Card
function createErrorCard(msg) {
  const cardHTML = `<div class="card">
    <h1>${msg}</h1>
  </div>`;
  main.innerHTML = cardHTML;
}

// Event Listener for Form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value.trim();
  if (user) {
    getUser(user);
    search.value = "";
  }
});
