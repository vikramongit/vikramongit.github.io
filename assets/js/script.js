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

  // Render Projects into the Projects Container using a stable placeholder image
  async function renderProjects() {
    const projects = await fetchProjects();
    const container = document.getElementById("projects-container");
    
    if (!projects.length) {
      document.getElementById("project-error").style.display = "block";
    } else {
      projects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        // Use a stable placeholder image from via.placeholder.com
        const imageUrl = "https://via.placeholder.com/300x150.png?text=Project+Image";
        card.innerHTML = `
          <img src="${imageUrl}" alt="Project Image" class="project-image">
          <h3>${project.name}</h3>
          <p>${project.description || "No description available."}</p>
        `;
        container.appendChild(card);
      });
    }
  }
  renderProjects();
});
