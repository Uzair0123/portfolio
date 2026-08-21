/**
 * Uzair Sultan — 3D Cyber Portfolio Controller
 * -------------------------------------------------------------
 * 3D Mouse Parallax Tilt, Numbered Accordions, Scroll Reveals,
 * Code Inspector Tabs, Architecture Modal & Toast Notifications.
 */
document.addEventListener("DOMContentLoaded", () => {
  init3DHeroParallax();
  initProjectAccordion();
  initScrollReveals();
  initNavigation();
  initYear();
  initCodeInspector();
  initArchitectureModal();
  initCopyTriggers();
});

/**
 * 1. 3D Parallax Mouse-Follow Tilt Effect (Smooth Physics)
 */
function init3DHeroParallax() {
  const heroSection = document.querySelector(".hero-3d-section");
  const avatarCard = document.getElementById("avatar3DCard");

  if (!heroSection || !avatarCard) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let isHovered = false;

  heroSection.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Normalize coordinates (-1 to 1)
    mouseX = (x / (rect.width / 2)) * 18; // Max 18 deg tilt
    mouseY = (y / (rect.height / 2)) * -18;
  });

  heroSection.addEventListener("mouseleave", () => {
    isHovered = false;
    mouseX = 0;
    mouseY = 0;
  });

  // Smooth Animation Frame Loop
  function animateTilt() {
    // Linear Interpolation (lerp)
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    avatarCard.style.transform = `perspective(1000px) rotateX(${currentY}deg) rotateY(${currentX}deg) translateZ(25px)`;
    requestAnimationFrame(animateTilt);
  }

  animateTilt();
}

/**
 * 2. Interactive Numbered Project Accordion
 */
function initProjectAccordion() {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(item => {
    const header = item.querySelector(".accordion-header");
    if (!header) return;

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all accordion items
      accordionItems.forEach(i => i.classList.remove("active"));

      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/**
 * 3. Intersection Observer Scroll Reveal Animations
 */
function initScrollReveals() {
  const reveals = document.querySelectorAll(".reveal-on-scroll");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(el => observer.observe(el));
}

/**
 * 4. Active Navigation Link Tracker
 */
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY + 120;

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

/**
 * 5. Code Inspector Tabs
 */
function initCodeInspector() {
  const tabs = document.querySelectorAll(".code-tab-btn");
  const codeBlocks = document.querySelectorAll(".code-tab-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      tabs.forEach(t => t.classList.remove("active"));
      codeBlocks.forEach(b => b.style.display = "none");

      const targetId = e.currentTarget.dataset.code;
      e.currentTarget.classList.add("active");
      const targetBlock = document.getElementById(targetId);
      if (targetBlock) {
        targetBlock.style.display = "block";
      }
    });
  });
}

/**
 * 6. System Architecture Modal
 */
function initArchitectureModal() {
  const modal = document.getElementById("archModal");
  const openBtn = document.getElementById("openArchModalBtn");
  const closeBtn = document.getElementById("closeArchModalBtn");

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

/**
 * 7. Copy-to-Clipboard Triggers
 */
function initCopyTriggers() {
  document.querySelectorAll("[data-copy]").forEach(el => {
    el.addEventListener("click", (e) => {
      const textToCopy = e.currentTarget.dataset.copy;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById("portfolioToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "portfolioToast";
    toast.className = "portfolio-toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--accent-emerald);"></i> ${message}`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function initYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.innerText = new Date().getFullYear();
  }
}
