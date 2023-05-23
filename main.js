let userName = document.querySelector(".search-bar input"),
  btn = document.querySelector(".btn"),
  reposContainer = document.querySelector(".repos"),
  user = document.querySelector(".user-name"),
  fullName = document.querySelector(".fullName"),
  bio = document.querySelector(".bio"),
  avatar = document.querySelector(".avatar"),
  profile = document.getElementById("profile");

btn.addEventListener("click", () => {
  if (userName.value == "") {
    reposContainer.innerHTML = "enter github username";
  } else {
    reposContainer.innerHTML = "";
    getData(userName.value.trim());
  }
});

async function getData(userName) {
  try {
    let response = await fetch(`https://api.github.com/users/${userName}`),
      userData = await response.json();

    if (response.ok == true) {
      profile.style.display = "block";
      fullName.innerHTML = userData["name"];
      user.innerHTML = userName;
      bio.innerHTML = userData["bio"];
      avatar.setAttribute("src", `${userData["avatar_url"]}`);

      getRepos(userData["repos_url"]);
    }
  } catch (reason) {
    console.log(reason);
  }
}

async function getRepos(link) {
  try {
    let response = await fetch(link),
      repos = await response.json();
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
