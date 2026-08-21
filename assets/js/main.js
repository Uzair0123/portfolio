/**
 * Uzair Sultan — Portfolio Global Controller
 * -------------------------------------------------------------
 * Dynamic typing animation, active navigation link tracker,
 * mobile drawer toggle, and contact copy triggers.
 */
document.addEventListener("DOMContentLoaded", () => {
  initTypingAnimation();
  initNavigation();
  initYear();
});

function initTypingAnimation() {
  const target = document.getElementById("typingSubtitle");
  if (!target) return;

  const roles = [
    "Linux Systems Administrator",
    "DevOps & Cloud Engineer",
    "Modern Web Architecture Developer",
    "Python Problem Solver (DSA)",
    "Network Infrastructure Enthusiast"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      target.innerText = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      target.innerText = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

function initYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.innerText = new Date().getFullYear();
  }
}
