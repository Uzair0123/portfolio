/* ============================================================
   UZAIR SULTAN PORTFOLIO — script.js
   Cinematic Animations & Interactions
   ============================================================ */

/* ─────────────────────────────────────────
   1. LENIS SMOOTH SCROLL (Luxurious Feel)
   ───────────────────────────────────────── */
let lenis;

function initSmoothScroll() {
  // Load Lenis via CDN dynamically
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js";
  script.onload = () => {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Make anchor links work with Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) lenis.scrollTo(target, { offset: -80, duration: 1.6 });
      });
    });
  };
  document.head.appendChild(script);
}

/* ─────────────────────────────────────────
   2. CUSTOM CINEMATIC CURSOR
   ───────────────────────────────────────── */
function initCursor() {
  // Create cursor elements
  const cursor = document.createElement("div");
  const follower = document.createElement("div");
  cursor.className = "cursor";
  follower.className = "cursor-follower";
  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0)`;
  });

  // Smooth follower with RAF
  function animateFollower() {
    followerX += (mouseX - followerX - 17.5) * 0.12;
    followerY += (mouseY - followerY - 17.5) * 0.12;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover states
  const hoverTargets = document.querySelectorAll(
    "a, button, .project-card, .service-card, .skill-card",
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform += " scale(2.5)";
      cursor.style.background = "transparent";
      cursor.style.border = "1px solid var(--accent)";
      follower.style.transform += " scale(1.5)";
      follower.style.borderColor = "var(--accent)";
      follower.style.background = "rgba(0,212,255,0.05)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.background = "var(--accent)";
      cursor.style.border = "none";
      follower.style.background = "transparent";
      follower.style.borderColor = "rgba(0,212,255,0.5)";
    });
  });

  // Hide on mobile
  if ("ontouchstart" in window) {
    cursor.style.display = "none";
    follower.style.display = "none";
    document.body.style.cursor = "auto";
  }
}

/* ─────────────────────────────────────────
   3. GRAIN / FILM TEXTURE OVERLAY
   ───────────────────────────────────────── */
function initGrainOverlay() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none;
    z-index: 9997;
    opacity: 0.035;
    mix-blend-mode: overlay;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  function generateGrain() {
    const imageData = ctx.createImageData(256, 256);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  // Animate grain at 12fps for cinematic feel
  let lastTime = 0;
  function animateGrain(time) {
    if (time - lastTime > 83) {
      generateGrain();
      lastTime = time;
    }
    requestAnimationFrame(animateGrain);
  }
  generateGrain();
  requestAnimationFrame(animateGrain);
}

/* ─────────────────────────────────────────
   4. NAVBAR — GLASSMORPHISM REVEAL
   ───────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  // Scroll handler
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    },
    { passive: true },
  );

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = navLinks.classList.contains("open")
      ? "rotate(45deg) translate(5px, 5px)"
      : "";
    spans[1].style.opacity = navLinks.classList.contains("open") ? "0" : "1";
    spans[2].style.transform = navLinks.classList.contains("open")
      ? "rotate(-45deg) translate(5px, -5px)"
      : "";
  });

  // Close nav on link click (mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.querySelectorAll("span").forEach((s) => {
        s.style.transform = "";
        s.style.opacity = "1";
      });
    });
  });

  // Active link highlight on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener(
    "scroll",
    () => {
      let current = "";
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) {
          current = section.getAttribute("id");
        }
      });
      document.querySelectorAll(".nav-links a").forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${current}`) {
          a.classList.add("active");
        }
      });
    },
    { passive: true },
  );
}

/* ─────────────────────────────────────────
   5. HERO — STAGGERED SPLIT TEXT
   ───────────────────────────────────────── */
function initHeroText() {
  const heroName = document.querySelector(".hero-name");
  if (!heroName) return;

  const text = heroName.textContent;
  heroName.textContent = "";
  heroName.style.overflow = "visible";

  // Split into words, each in a clip container
  text.split(" ").forEach((word, i) => {
    const wrapper = document.createElement("span");
    wrapper.style.cssText = `
      display: inline-block;
      overflow: hidden;
      vertical-align: bottom;
      margin-right: 0.15em;
    `;
    const inner = document.createElement("span");
    inner.textContent = word;
    inner.style.cssText = `
      display: inline-block;
      transform: translate3d(0, 100%, 0);
      opacity: 0;
      animation: wordReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${0.4 + i * 0.12}s forwards;
    `;
    wrapper.appendChild(inner);
    heroName.appendChild(wrapper);
  });

  // Inject keyframe
  if (!document.getElementById("wordRevealStyle")) {
    const style = document.createElement("style");
    style.id = "wordRevealStyle";
    style.textContent = `
      @keyframes wordReveal {
        to { transform: translate3d(0, 0, 0); opacity: 1; }
      }
      .nav-links a.active { color: var(--accent) !important; }
      .nav-links a.active::after { width: 100% !important; }
    `;
    document.head.appendChild(style);
  }
}

/* ─────────────────────────────────────────
   6. SCROLL REVEAL — INTERSECTION OBSERVER
   ───────────────────────────────────────── */
function initScrollReveal() {
  // Add reveal class to all animatable elements
  const targets = document.querySelectorAll(
    ".skill-card, .project-card, .service-card, .testimonial-card, .about-grid, .contact-grid, .section-title, .about-facts, .hero-greeting, .hero-tagline, .hero-sub, .hero-buttons",
  );

  targets.forEach((el, i) => {
    el.classList.add("reveal");
    // Stagger children in grids
    if (el.closest(".skills-grid, .projects-grid, .services-grid")) {
      const siblings = Array.from(el.parentNode.children);
      const index = siblings.indexOf(el);
      el.style.transitionDelay = `${index * 0.1}s`;
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  targets.forEach((el) => observer.observe(el));
}

/* ─────────────────────────────────────────
   7. SKILL BARS — ANIMATED FILL
   ───────────────────────────────────────── */
function initSkillBars() {
  const skillFills = document.querySelectorAll(".skill-fill");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = fill.getAttribute("data-width");
          setTimeout(() => {
            fill.style.width = width + "%";
          }, 200);
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 },
  );

  skillFills.forEach((fill) => observer.observe(fill));
}

/* ─────────────────────────────────────────
   8. MAGNETIC BUTTONS
   ───────────────────────────────────────── */
function initMagneticElements() {
  const magnetics = document.querySelectorAll(".btn, .carousel-btn, .nav-logo");

  magnetics.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.25;
      const deltaY = (e.clientY - centerY) * 0.25;
      el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.03)`;
      el.style.transition = "transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)";
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate3d(0, 0, 0) scale(1)";
      el.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    });
  });
}

/* ─────────────────────────────────────────
   9. 3D TILT ON SERVICE & PROJECT CARDS
   ───────────────────────────────────────── */
function initTiltCards() {
  const cards = document.querySelectorAll(
    ".service-card, .project-card, .skill-card",
  );

  cards.forEach((card) => {
    card.style.transformStyle = "preserve-3d";
    card.style.willChange = "transform";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translate3d(0, -6px, 20px)
        scale(1.01)
      `;
      card.style.transition = "transform 0.1s cubic-bezier(0.22, 1, 0.36, 1)";

      // Dynamic light reflection
      const glare = `radial-gradient(
        circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%,
        rgba(0, 212, 255, 0.06),
        transparent 60%
      )`;
      card.style.background = `${glare}, var(--bg-card)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(800px) rotateX(0) rotateY(0) translate3d(0,0,0) scale(1)";
      card.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
      card.style.background = "var(--bg-card)";
    });
  });
}

/* ─────────────────────────────────────────
   10. TESTIMONIALS CAROUSEL
   ───────────────────────────────────────── */
function initCarousel() {
  const track = document.getElementById("testimonial-track");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const dotsContainer = document.getElementById("carousel-dots");

  if (!track) return;

  const cards = track.querySelectorAll(".testimonial-card");
  let current = 0;
  let autoInterval;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = `dot ${i === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + cards.length) % cards.length;
    track.style.transform = `translate3d(-${current * 100}%, 0, 0)`;
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  prevBtn.addEventListener("click", () => {
    goTo(current - 1);
    resetAuto();
  });
  nextBtn.addEventListener("click", () => {
    goTo(current + 1);
    resetAuto();
  });

  function startAuto() {
    autoInterval = setInterval(() => goTo(current + 1), 4500);
  }

  function resetAuto() {
    clearInterval(autoInterval);
    startAuto();
  }

  startAuto();

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
      resetAuto();
    }
  });
}

/* ─────────────────────────────────────────
   11. CONTACT FORM — FORMSPREE HANDLER
   ───────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = "Sending...";
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.textContent = "✓ Message sent! I'll reply within 24 hours.";
        status.className = "form-status success";
        form.reset();
      } else {
        throw new Error("Server error");
      }
    } catch {
      status.textContent = "✗ Something went wrong. Please email me directly.";
      status.className = "form-status error";
    }

    btn.textContent = "Send Message 🚀";
    btn.disabled = false;
    setTimeout(() => {
      status.textContent = "";
      status.className = "form-status";
    }, 6000);
  });
}

/* ─────────────────────────────────────────
   12. PARALLAX — HERO DEPTH EFFECT
   ───────────────────────────────────────── */
function initParallax() {
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
  if (!hero || !heroContent) return;

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroContent.style.transform = `translate3d(0, ${scrollY * 0.25}px, 0)`;
        heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 1.2;
      }
    },
    { passive: true },
  );
}

/* ─────────────────────────────────────────
   13. COUNTER ANIMATION — ABOUT FACTS
   ───────────────────────────────────────── */
function initCounters() {
  const facts = document.querySelectorAll(".fact-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = el.textContent;
          const isNumber = /^\d+/.test(target);

          if (isNumber) {
            const num = parseInt(target);
            const suffix = target.replace(/[0-9]/g, "");
            let current = 0;
            const increment = num / 60;
            const timer = setInterval(() => {
              current += increment;
              if (current >= num) {
                el.textContent = num + suffix;
                clearInterval(timer);
              } else {
                el.textContent = Math.floor(current) + suffix;
              }
            }, 20);
          }
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  facts.forEach((fact) => observer.observe(fact));
}

/* ─────────────────────────────────────────
   14. DRAWING LINE — EXPERIENCE SECTION
       (Progressive reveal on scroll)
   ───────────────────────────────────────── */
function initDrawingLine() {
  const style = document.createElement("style");
  style.textContent = `
    .experience-line {
      position: absolute;
      left: 50%;
      top: 0;
      width: 1px;
      height: 0;
      background: linear-gradient(to bottom, var(--accent), transparent);
      box-shadow: 0 0 8px var(--accent);
      transition: height 0.05s linear;
    }
  `;
  document.head.appendChild(style);
}

/* ─────────────────────────────────────────
   15. TYPING EFFECT — HERO SUBTITLE
   ───────────────────────────────────────── */
function initTypingEffect() {
  const sub = document.querySelector(".hero-sub");
  if (!sub) return;

  const originalText = sub.textContent;
  sub.textContent = "";

  setTimeout(() => {
    let i = 0;
    const type = () => {
      if (i < originalText.length) {
        sub.textContent += originalText[i];
        i++;
        setTimeout(type, 35);
      }
    };
    type();
  }, 1400);
}

/* ─────────────────────────────────────────
   INIT — Run Everything
   ───────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initCursor();
  initGrainOverlay();
  initNavbar();
  initHeroText();
  initScrollReveal();
  initSkillBars();
  initMagneticElements();
  initTiltCards();
  initCarousel();
  initContactForm();
  initParallax();
  initCounters();
  initDrawingLine();
  initTypingEffect();

  console.log(
    "%c⚡ Uzair Sultan Portfolio — Loaded",
    "color: #00d4ff; font-size: 14px; font-weight: bold;",
  );
});
