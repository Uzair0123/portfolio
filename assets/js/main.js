/**
 * Uzair Sultan — Aesthetic 3D Digital Experience Controller
 * -----------------------------------------------------------------
 * Dual-Ring Custom Cursor, Kinetic Parallax, Dynamic Card Spotlights,
 * 3D Avatar Physics, Mobile Drawer & Gyroscope 3D Ambient Engine.
 */
document.addEventListener("DOMContentLoaded", () => {
  initCustomCursor();
  initDynamicCardSpotlights();
  initHeroParallaxAndHeadTracking();
  initMobileMenuDrawer();
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
 * 1. Intelligent Dual-Ring Custom Cursor System (Desktop)
 */
function initCustomCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  // Cursor morph triggers
  document.querySelectorAll("a, button, [data-cursor], input, textarea, .accordion-header").forEach(el => {
    el.addEventListener("mouseenter", (e) => {
      const cursorType = el.dataset.cursor || "pointer";
      document.body.classList.remove("cursor-hover-pointer", "cursor-hover-project", "cursor-hover-grab", "cursor-hover-terminal");
      document.body.classList.add(`cursor-hover-${cursorType}`);
    });

    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover-pointer", "cursor-hover-project", "cursor-hover-grab", "cursor-hover-terminal");
    });
  });

  // Smooth Ring Lerp Animation Loop
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }

  renderCursor();
}

/**
 * 2. Dynamic Card Spotlight Flare (Ray-Traced Radial Glow)
 */
function initDynamicCardSpotlights() {
  const spotlightCards = document.querySelectorAll(".glass-card, .accordion-item, .terminal-window");

  spotlightCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }, { passive: true });
  });
}

/**
 * 3. Multi-Plane 3D Parallax & Avatar Head Tracking (Desktop + Mobile)
 */
function initHeroParallaxAndHeadTracking() {
  const avatarCard = document.getElementById("avatar3DCard");
  const parallaxLayers = document.querySelectorAll("[data-parallax]");
  const heroSection = document.querySelector(".hero-3d-section");

  if (!avatarCard || !heroSection) return;

  let currentHeadX = 0, currentHeadY = 0;
  let targetHeadX = 0, targetHeadY = 0;
  let isTouching = false;
  let hasGyro = false;

  // --- A. DESKTOP MOUSE PARALLAX & HEAD TRACKING ---
  window.addEventListener("mousemove", (e) => {
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;

    const normalizedX = (e.clientX - windowCenterX) / windowCenterX; // -1 to 1
    const normalizedY = (e.clientY - windowCenterY) / windowCenterY; // -1 to 1

    targetHeadY = normalizedX * 26;
    targetHeadX = -normalizedY * 22;

    parallaxLayers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.parallax) || 0.05;
      const transX = normalizedX * depth * 70;
      const transY = normalizedY * depth * 70;
      layer.style.transform = `translate3d(${transX}px, ${transY}px, 0)`;
    });
  }, { passive: true });

  // --- B. MOBILE TOUCH TRACKING (Swiping turns head) ---
  window.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
      isTouching = true;
      handleTouchPos(e.touches[0]);
    }
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      isTouching = true;
      handleTouchPos(e.touches[0]);
    }
  }, { passive: true });

  window.addEventListener("touchend", () => {
    setTimeout(() => { isTouching = false; }, 800);
  });

  function handleTouchPos(touch) {
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;

    const normalizedX = (touch.clientX - windowCenterX) / windowCenterX;
    const normalizedY = (touch.clientY - windowCenterY) / windowCenterY;

    targetHeadY = normalizedX * 24;
    targetHeadX = -normalizedY * 20;
  }

  // --- C. MOBILE GYROSCOPE ORIENTATION ---
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (e) => {
      if (e.gamma !== null && e.beta !== null && !isTouching) {
        hasGyro = true;
        targetHeadY = Math.max(-24, Math.min(24, (e.gamma / 40) * 24));
        targetHeadX = Math.max(-20, Math.min(20, ((e.beta - 45) / 40) * -20));
      }
    }, { passive: true });
  }

  // --- D. SMOOTH PHYSICS ANIMATION LOOP (Lerp + Organic 3D Breathing) ---
  let animTime = 0;
  function animateFrame() {
    animTime += 0.035;

    let organicTiltY = 0;
    let organicTiltX = 0;

    if (!isTouching && !hasGyro) {
      organicTiltY = Math.sin(animTime * 0.8) * 10;
      organicTiltX = Math.cos(animTime * 0.6) * 7;
    }

    const finalTargetX = targetHeadX + organicTiltX;
    const finalTargetY = targetHeadY + organicTiltY;

    currentHeadX += (finalTargetX - currentHeadX) * 0.085;
    currentHeadY += (finalTargetY - currentHeadY) * 0.085;

    const idleBob = Math.sin(animTime) * 3.5;

    avatarCard.style.transform = `perspective(1000px) rotateX(${currentHeadX + idleBob}deg) rotateY(${currentHeadY}deg) translate3d(0, 0, 20px)`;

    requestAnimationFrame(animateFrame);
  }

  animateFrame();
}

/**
 * 4. Mobile Navigation Drawer Controller
 */
function initMobileMenuDrawer() {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const closeBtn = document.getElementById("mobileNavClose");
  const overlay = document.getElementById("mobileNavOverlay");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !overlay) return;

  function openDrawer() {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeDrawer();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });
}

/**
 * 5. Magnetic Buttons Engine (Micro-Interactions)
 */
function initMagneticButtons() {
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
    }, { passive: true });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate3d(0px, 0px, 0) scale(1)";
    });
  });
}

/**
 * 6. Interactive 3D Card Depth Tilt
 */
function initCard3DTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const tiltCards = document.querySelectorAll("[data-tilt='true']");

  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = (y / (rect.height / 2)) * -5;
      const rotY = (x / (rect.width / 2)) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, -4px, 0)`;
    }, { passive: true });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
    });
  });
}

/**
 * 7. Interactive Numbered Project Accordion
 */
function initProjectAccordion() {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(item => {
    const header = item.querySelector(".accordion-header");
    if (!header) return;

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      accordionItems.forEach(i => i.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/**
 * 8. 100% Smooth Intersection Observer Scroll Reveal (Hardware Accelerated)
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
    threshold: 0.05,
    rootMargin: "0px 0px -20px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 9. Active Navigation Link Tracker
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
  }, { passive: true });
}

/**
 * 10. Animated Code Inspector Tabs
 */
function initCodeInspector() {
  const tabs = document.querySelectorAll(".code-tab-btn");
  const codePanes = document.querySelectorAll(".code-tab-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      const targetId = e.currentTarget.dataset.code;

      tabs.forEach(t => t.classList.remove("active"));
      e.currentTarget.classList.add("active");

      codePanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add("active-pane");
        } else {
          pane.classList.remove("active-pane");
        }
      });
    });
  });
}

/**
 * 11. System Architecture Modal
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
 * 12. Copy-to-Clipboard Triggers
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
