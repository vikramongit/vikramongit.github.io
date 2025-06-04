document.addEventListener("DOMContentLoaded", () => {
  // Toggle Mobile Menu
  window.toggleMenu = function () {
    document.querySelector(".nav-links").classList.toggle("active");
  };

  // Update Profile Info from GitHub API
  async function updateProfile() {
    try {
      const response = await fetch("https://api.github.com/users/vikramongit");
      const data = await response.json();
      document.getElementById("profile-photo").src = data.avatar_url;
      document.getElementById("profile-name").textContent = data.name || data.login;
      document.getElementById("profile-bio").textContent =
        data.bio || "Developer with expertise in Flutter & Android.";
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }
  updateProfile();

  // Fetch Projects from GitHub API
  async function fetchProjects() {
    try {
      const response = await fetch("https://api.github.com/users/vikramongit/repos");
      const projects = await response.json();
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }

  // Render Projects with Banners
  async function renderProjects() {
    const projects = await fetchProjects();
    const container = document.getElementById("projects-container");

    // Map project names to corresponding images
    const projectBanners = {
      "ai-integrated-ludo-game": "assets/images/ai-integrated-ludo-game.png",
      "gameoflife": "assets/images/GameOfLife.png",
      "jokeapp": "assets/images/JokeApp.png",
      "playchess": "assets/images/PlayChess.png",
      "travel-companion": "assets/images/Travel-Companion.png",
      "newsfeed": "assets/images/newsfeed.png",
      "redactorve": "assets/images/RedactorVE.png"
    };

    projects.forEach(project => {
      if (projectBanners[project.name.toLowerCase()]) {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = `
          <img src="${projectBanners[project.name.toLowerCase()]}" alt="${project.name} Banner">
          <h3>${project.name}</h3>
          <p>${project.description || "No description available."}</p>
          <a href="${project.html_url}" target="_blank" class="project-btn">View Repo</a>
        `;
        container.appendChild(card);
      }
    });
  }

  renderProjects();
});
