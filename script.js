/* =========================================================
   SUGAM SHRESTHA — PORTFOLIO JAVASCRIPT
   ========================================================= */


/* ================= NAVBAR ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

});


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});


navItems.forEach(link => {

  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

  const scrollPosition = window.scrollY + 150;

  sections.forEach(section => {

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {

      navItems.forEach(link => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }

    }

  });

}

window.addEventListener("scroll", updateActiveNav);


/* ================= TYPING ANIMATION ================= */

const typingText = document.getElementById("typingText");

const roles = [
  "Computer Engineering Student",
  "Developer",
  "Problem Solver",
  "Tech Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

  const currentRole = roles[roleIndex];

  if (!deleting) {

    typingText.textContent =
      currentRole.substring(0, characterIndex + 1);

    characterIndex++;

    if (characterIndex === currentRole.length) {

      deleting = true;

      setTimeout(typeEffect, 1500);
      return;
    }

  } else {

    typingText.textContent =
      currentRole.substring(0, characterIndex - 1);

    characterIndex--;

    if (characterIndex === 0) {

      deleting = false;

      roleIndex++;

      if (roleIndex >= roles.length) {
        roleIndex = 0;
      }

    }

  }

  const speed = deleting ? 45 : 85;

  setTimeout(typeEffect, speed);
}

typeEffect();


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


revealElements.forEach(element => {
  revealObserver.observe(element);
});


/* ================= COUNTERS ================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);

      let current = 0;

      const duration = 1200;
      const increment = target / (duration / 16);

      function updateCounter() {

        current += increment;

        if (current >= target) {
          counter.textContent = target;
          return;
        }

        counter.textContent = Math.floor(current);

        requestAnimationFrame(updateCounter);
      }

      updateCounter();

      observer.unobserve(counter);

    });

  },
  {
    threshold: 0.7
  }
);


counters.forEach(counter => {
  counterObserver.observe(counter);
});


/* ================= PROJECT FILTER ================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const filter = button.dataset.filter;

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    projectCards.forEach(card => {

      const category = card.dataset.category;

      if (filter === "all" || category === filter) {

        card.classList.remove("hidden");

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "";
        }, 20);

      } else {

        card.classList.add("hidden");

      }

    });

  });

});


/* ================= THEME TOGGLE ================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  themeToggle.textContent = "☾";
}


themeToggle.addEventListener("click", () => {

  const currentTheme =
    document.documentElement.getAttribute("data-theme");

  if (currentTheme === "light") {

    document.documentElement.removeAttribute("data-theme");

    localStorage.setItem("theme", "dark");

    themeToggle.textContent = "☀";

  } else {

    document.documentElement.setAttribute("data-theme", "light");

    localStorage.setItem("theme", "light");

    themeToggle.textContent = "☾";

  }

});


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

function showError(input, message) {

  input.classList.add("error");

  const error =
    input.parentElement.querySelector(".error-message");

  error.textContent = message;
}


function clearError(input) {

  input.classList.remove("error");

  const error =
    input.parentElement.querySelector(".error-message");

  error.textContent = "";
}


function validateEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


contactForm.addEventListener("submit", event => {

  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  let valid = true;


  /* Name */

  if (name.value.trim().length < 2) {

    showError(name, "Please enter your name.");

    valid = false;

  } else {

    clearError(name);

  }


  /* Email */

  if (!validateEmail(email.value.trim())) {

    showError(email, "Please enter a valid email.");

    valid = false;

  } else {

    clearError(email);

  }


  /* Subject */

  if (subject.value.trim().length < 3) {

    showError(subject, "Please enter a subject.");

    valid = false;

  } else {

    clearError(subject);

  }


  /* Message */

  if (message.value.trim().length < 10) {

    showError(message, "Message should be at least 10 characters.");

    valid = false;

  } else {

    clearError(message);

  }


  if (valid) {

    formSuccess.classList.add("show");

    contactForm.reset();

    setTimeout(() => {
      formSuccess.classList.remove("show");
    }, 7000);

  }

});


/* ================= BACK TO TOP ================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

  if (window.scrollY > 600) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

});


backToTop.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* ================= CURRENT YEAR ================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* ================= DISABLED DEMO LINKS ================= */

document.querySelectorAll(".disabled-link").forEach(link => {

  link.addEventListener("click", event => {
    event.preventDefault();
  });

});


/* ================= KEYBOARD ACCESSIBILITY ================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    navLinks.classList.remove("open");
  }

});