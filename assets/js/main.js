/**
 * Uzair Sultan — 3D Cyber Portfolio Controller
 * -------------------------------------------------------------
 * 3D Mouse Parallax & Gyroscope Head Tracking, Numbered Accordions,
 * Staggered Scroll Reveals, Code Inspector Tabs, Architecture Modal.
 */
document.addEventListener("DOMContentLoaded", () => {
  init3DHeroTracking();
  initProjectAccordion();
  initScrollReveals();
  initNavigation();
  initYear();
  initCodeInspector();
  initArchitectureModal();
  initCopyTriggers();
});

/**
 * 1. 3D Head Tracking (Desktop Mouse-Follow + Mobile Gyroscope & Touch Drag)
 */
function init3DHeroTracking() {
  const avatarCard = document.getElementById("avatar3DCard");
  const floatingAssets = document.querySelectorAll(".floating-asset");

  if (!avatarCard) return;

  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let isInteracting = false;

  // --- A. DESKTOP MOUSE TRACKING (Window-wide) ---
  window.addEventListener("mousemove", (e) => {
    isInteracting = true;
    const rect = avatarCard.getBoundingClientRect();
    const avatarCenterX = rect.left + rect.width / 2;
    const avatarCenterY = rect.top + rect.height / 2;

    const deltaX = e.clientX - avatarCenterX;
    const deltaY = e.clientY - avatarCenterY;

    targetRotY = Math.max(-28, Math.min(28, (deltaX / (window.innerWidth / 2)) * 28));
    targetRotX = Math.max(-24, Math.min(24, (-deltaY / (window.innerHeight / 2)) * 24));

    floatingAssets.forEach((asset, idx) => {
      const speed = (idx + 1) * 8;
      asset.style.transform = `translate(${targetRotY * speed * 0.05}px, ${-targetRotX * speed * 0.05}px)`;
    });
  });

  // --- B. MOBILE TOUCH TRACKING (Drag / Touch on screen) ---
  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      isInteracting = true;
      const touch = e.touches[0];
      const rect = avatarCard.getBoundingClientRect();
      const avatarCenterX = rect.left + rect.width / 2;
      const avatarCenterY = rect.top + rect.height / 2;

      const deltaX = touch.clientX - avatarCenterX;
      const deltaY = touch.clientY - avatarCenterY;

      targetRotY = Math.max(-26, Math.min(26, (deltaX / (window.innerWidth / 2)) * 26));
      targetRotX = Math.max(-22, Math.min(22, (-deltaY / (window.innerHeight / 2)) * 22));
    }
  }, { passive: true });

  // --- C. MOBILE GYROSCOPE ORIENTATION (Phone Tilt) ---
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (e) => {
      if (e.gamma !== null && e.beta !== null) {
        isInteracting = true;
        const tiltX = Math.max(-25, Math.min(25, (e.gamma / 45) * 25));
        const tiltY = Math.max(-20, Math.min(20, ((e.beta - 45) / 45) * -20));

        targetRotY = tiltX;
        targetRotX = tiltY;
      }
    }, { passive: true });
  }

  // --- D. SMOOTH PHYSICS ANIMATION LOOP (Linear Interpolation / Lerp) ---
  let idleTime = 0;
  function animateHead() {
    currentRotX += (targetRotX - currentRotX) * 0.09;
    currentRotY += (targetRotY - currentRotY) * 0.09;

    idleTime += 0.03;
    const idleBob = isInteracting ? 0 : Math.sin(idleTime) * 4;

    avatarCard.style.transform = `perspective(1000px) rotateX(${currentRotX + idleBob}deg) rotateY(${currentRotY}deg) translateZ(25px)`;

    requestAnimationFrame(animateHead);
  }

  animateHead();
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
 * 3. High-End Staggered Intersection Observer Scroll Reveal
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
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
