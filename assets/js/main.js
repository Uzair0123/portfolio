/**
 * Uzair Sultan — Cinematic 3D Cyber Portfolio Motion Controller
 * -----------------------------------------------------------------
 * Multi-Plane Parallax, Magnetic Micro-Interactions, 3D Card Depth Tilt,
 * Mobile Gyroscope, Connected Scroll Reveals & Interactive Terminal.
 */
document.addEventListener("DOMContentLoaded", () => {
  initHeroParallaxAndHeadTracking();
  initMagneticButtons();
  initCard3DTilt();
  initProjectAccordion();
  initScrollReveals();
  initNavigation();
  initYear();
  initCodeInspector();
  initArchitectureModal();
  initCopyTriggers();
});

/**
 * 1. Multi-Plane 3D Parallax & Avatar Head Tracking (Desktop + Mobile)
 */
function initHeroParallaxAndHeadTracking() {
  const avatarCard = document.getElementById("avatar3DCard");
  const parallaxLayers = document.querySelectorAll("[data-parallax]");
  const heroSection = document.querySelector(".hero-3d-section");

  if (!avatarCard || !heroSection) return;

  let mouseX = 0, mouseY = 0;
  let currentHeadX = 0, currentHeadY = 0;
  let targetHeadX = 0, targetHeadY = 0;
  let isInteracting = false;

  // --- A. DESKTOP MOUSE PARALLAX & HEAD TRACKING ---
  window.addEventListener("mousemove", (e) => {
    isInteracting = true;
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;

    const normalizedX = (e.clientX - windowCenterX) / windowCenterX; // -1 to 1
    const normalizedY = (e.clientY - windowCenterY) / windowCenterY; // -1 to 1

    // 1. Head rotation angles (max 28 deg)
    targetHeadY = normalizedX * 28;
    targetHeadX = -normalizedY * 24;

    // 2. Multi-Plane Parallax translation
    parallaxLayers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.parallax) || 0.05;
      const transX = normalizedX * depth * 80;
      const transY = normalizedY * depth * 80;
      layer.style.transform = `translate3d(${transX}px, ${transY}px, 0)`;
    });
  });

  // --- B. MOBILE TOUCH TRACKING ---
  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      isInteracting = true;
      const touch = e.touches[0];
      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;

      const normalizedX = (touch.clientX - windowCenterX) / windowCenterX;
      const normalizedY = (touch.clientY - windowCenterY) / windowCenterY;

      targetHeadY = normalizedX * 24;
      targetHeadX = -normalizedY * 20;
    }
  }, { passive: true });

  // --- C. MOBILE GYROSCOPE TILT ---
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (e) => {
      if (e.gamma !== null && e.beta !== null) {
        isInteracting = true;
        // Gamma: Left-to-Right (-90 to 90)
        // Beta: Front-to-Back (-180 to 180)
        targetHeadY = Math.max(-25, Math.min(25, (e.gamma / 45) * 25));
        targetHeadX = Math.max(-20, Math.min(20, ((e.beta - 45) / 45) * -20));
      }
    }, { passive: true });
  }

  // --- D. SMOOTH PHYSICS ANIMATION LOOP (Lerp) ---
  let idleTime = 0;
  function animateFrame() {
    currentHeadX += (targetHeadX - currentHeadX) * 0.085;
    currentHeadY += (targetHeadY - currentHeadY) * 0.085;

    idleTime += 0.03;
    const idleBob = isInteracting ? 0 : Math.sin(idleTime) * 3.5;

    avatarCard.style.transform = `perspective(1000px) rotateX(${currentHeadX + idleBob}deg) rotateY(${currentHeadY}deg) translateZ(25px)`;

    requestAnimationFrame(animateFrame);
  }

  animateFrame();
}

/**
 * 2. Magnetic Buttons Engine (Micro-Interactions)
 */
function initMagneticButtons() {
  // Only activate on desktop devices with hover support
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const magneticBtns = document.querySelectorAll("[data-magnetic='true']");

  magneticBtns.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - btnCenterX) * 0.35;
      const deltaY = (e.clientY - btnCenterY) * 0.35;

      btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.04)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate3d(0px, 0px, 0) scale(1)";
    });
  });
}

/**
 * 3. Interactive 3D Card Depth Tilt
 */
function initCard3DTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const tiltCards = document.querySelectorAll("[data-tilt='true']");

  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = (y / (rect.height / 2)) * -6; // Max 6 deg tilt
      const rotY = (x / (rect.width / 2)) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}

/**
 * 4. Interactive Numbered Project Accordion
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
 * 5. Connected Intersection Observer Scroll Reveal
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
 * 6. Active Navigation Link Tracker
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
 * 7. Code Inspector Tabs
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
 * 8. System Architecture Modal
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
 * 9. Copy-to-Clipboard Triggers
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
