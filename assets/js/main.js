/**
 * Uzair Sultan — Portfolio Global Controller
 * -------------------------------------------------------------
 * Dynamic typing animation, active navigation link tracker,
 * architecture modal inspector, code viewer tabs, and toast notifications.
 */
document.addEventListener("DOMContentLoaded", () => {
  initTypingAnimation();
  initNavigation();
  initYear();
  initCodeInspector();
  initArchitectureModal();
  initCopyTriggers();
});

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

function initArchitectureModal() {
  const modal = document.getElementById("archModal");
  const openBtn = document.getElementById("openArchModalBtn");
  const closeBtn = document.getElementById("closeArchModalBtn");

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener("click", () => {
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
