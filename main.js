let userName = document.querySelector(".search-bar input"),
  btn = document.querySelector(".btn"),
  reposContainer = document.querySelector(".repos"),
  user = document.querySelector(".user-name"),
  fullName = document.querySelector(".fullName"),
  bio = document.querySelector(".bio"),
  avatar = document.querySelector(".avatar");

btn.addEventListener("click", () => {
  if (userName.value == "") {
    reposContainer.innerHTML = "Please enter a username";
  } else {
    reposContainer.innerHTML = "";
    getData(userName.value.trim());
  }
});

async function getData(userName) {
  try {
    let response = fetch(`https://api.github.com/users/${userName}`),
      data = (await response).json(),
      userData = await data;
    getRepos(userData["repos_url"]);
    fullName.innerHTML = userData["name"];
    user.innerHTML = userName;
    bio.innerHTML = userData["bio"];
    avatar.setAttribute("src",`${userData["avatar_url"]}`);
  } catch (reason) {
    console.log(reason);
  }
}

async function getRepos(link) {
  try {
    let response = fetch(link),
      data = (await response).json(),
      repos = await data;
    displayRepos(repos);
  } catch (reason) {
    console.log(reason);
  }
}

function displayRepos(repos) {
  repos.forEach((repo) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span>${repo["name"]}</span>
      <a href="${repo["html_url"]}" target="_blank">visit</a>
    `;
    reposContainer.appendChild(li);
  });
}
