/**
 * Uzair Sultan — 3D Cyber Portfolio Controller
 * -------------------------------------------------------------
 * 3D Mouse-follow Parallax Tilt, Numbered Project Accordions,
 * Code Inspector Tabs, Architecture Modal & Toast Notifications.
 */
document.addEventListener("DOMContentLoaded", () => {
  init3DHeroParallax();
  initProjectAccordion();
  initTypingAnimation();
  initNavigation();
  initYear();
  initCodeInspector();
  initArchitectureModal();
  initCopyTriggers();
});

/**
 * 1. 3D Parallax Mouse-Follow Tilt Effect
 */
function init3DHeroParallax() {
  const heroSection = document.querySelector(".hero-3d-section");
  const avatarWrap = document.querySelector(".hero-avatar-wrap");
  const bgText = document.querySelector(".hero-giant-bg-text");

  if (!heroSection || !avatarWrap) return;

  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -14; // Max 14deg tilt
    const tiltY = (x / (rect.width / 2)) * 14;

    avatarWrap.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(30px)`;

    if (bgText) {
      bgText.style.transform = `translate(calc(-50% + ${tiltY * 1.2}px), calc(-50% + ${tiltX * 1.2}px))`;
    }
  });

  heroSection.addEventListener("mouseleave", () => {
    avatarWrap.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    if (bgText) {
      bgText.style.transform = "translate(-50%, -50%)";
    }
  });
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
 * 3. Dynamic Typing Subtitle
 */
function initTypingAnimation() {
  const target = document.getElementById("typingSubtitle");
  if (!target) return;

  const roles = [
    "Linux Systems Administrator",
    "DevOps & Cloud Engineer",
    "Modern Web Architecture Developer",
    "Python Problem Solver (DSA)",
    "Network Infrastructure Specialist"
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
      typeSpeed = 35;
    } else {
      target.innerText = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 75;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1800;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
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
