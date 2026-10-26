console.log("JavaScript connected");

// ===== DARK / LIGHT MODE TOGGLE =====
const themeButton = document.getElementById("themeToggle");

// Load saved theme preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeButton.innerHTML = '<i class="fas fa-sun"></i>';
}

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeButton.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("theme", "dark");
  } else {
    themeButton.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", "light");
  }
});

// ===== MOBILE NAVIGATION TOGGLE =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 20px " + "rgba(0,0,0,0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 10px " + "rgba(0,0,0,0.08)";
  }
});

// ===== PROJECT SEARCH & FILTER =====
const projectSearch = document.getElementById("projectSearch");
const projectCards = document.querySelectorAll(".project-card");
const noResults = document.getElementById("noResults");

projectSearch.addEventListener("input", function () {
  const query = projectSearch.value.toLowerCase().trim();
  let visibleCount = 0;

  projectCards.forEach(function (card) {
    const title = card.getAttribute("data-title").toLowerCase();
    const tech = card.getAttribute("data-tech").toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();

    if (
      title.includes(query) ||
      tech.includes(query) ||
      description.includes(query)
    ) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  if (visibleCount === 0 && query.length > 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
