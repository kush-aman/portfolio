console.log("JavaScript connected");

// ===== DARK / LIGHT MODE FEATURE =====
const themeButton = document.getElementById("themeToggle");
const footerThemeToggle = document.getElementById("footerThemeToggle");

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    console.warn("localStorage not available:", e);
  }

  // Update navbar theme button
  if (themeButton) {
    const icon = themeButton.querySelector(".theme-toggle-icon");
    const label = themeButton.querySelector(".theme-toggle-text");
    if (icon) {
      icon.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    if (label) {
      label.textContent = isDark ? "Light Mode" : "Dark Mode";
    }
    themeButton.setAttribute("aria-label", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
    themeButton.setAttribute("title", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
  }

  // Update footer theme button
  if (footerThemeToggle) {
    footerThemeToggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i> Switch to Light Mode'
      : '<i class="fas fa-moon"></i> Switch to Dark Mode';
    footerThemeToggle.setAttribute("aria-label", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
  }
}

function toggleTheme() {
  const isCurrentlyDark = document.body.classList.contains("dark-mode");
  applyTheme(isCurrentlyDark ? "light" : "dark");
}

// Check saved preference or system preference on load
(function initTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch (e) {
    console.warn("localStorage error:", e);
  }

  if (savedTheme === "dark" || savedTheme === "light") {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  if (themeButton) {
    themeButton.addEventListener("click", toggleTheme);
  }
  if (footerThemeToggle) {
    footerThemeToggle.addEventListener("click", toggleTheme);
  }
})();

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
