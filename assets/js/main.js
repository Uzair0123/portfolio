/**
 * ═══════════════════════════════════════════════════════════════════════════
 * UZAIR SULTAN — AWARD-WINNING CINEMATIC EXPERIENCE CONTROLLER
 * GSAP + ScrollTrigger + Lenis + Canvas Particles + Physics Engine
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function() {
  "use strict";

  // ═══════ PERFORMANCE & STATE ═══════
  const IS_MOBILE = window.matchMedia("(pointer: coarse)").matches;
  const IS_TABLET = window.matchMedia("(max-width: 768px)").matches;
  const PREFERS_REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let lenis = null;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let mouseVelocityX = 0, mouseVelocityY = 0;
  let lastMouseX = 0, lastMouseY = 0;
  let scrollVelocity = 0;
  let lastScrollY = 0;
  let animFrameId = null;
  let heroTimeline = null;

  // ═══════ REGISTER GSAP PLUGINS ═══════
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ═══════ INITIALIZATION ═══════
  document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    initLenisSmoothScroll();
    initParticleCanvas();
    initCustomCursor();
    initSplitTextAnimations();
    initHeroChoreography();
    initScrollAnimations();
    initDynamicCardSpotlights();
    initHeroParallaxAndHeadTracking();
    initMobileMenuDrawer();
    initMagneticButtons();
    initCard3DTilt();
    initProjectAccordion();
    initNavigation();
    initYear();
    initCodeInspector();
    initArchitectureModal();
    initCopyTriggers();
    initMarqueeVelocity();
    initNavbarScrollBehavior();
  });

  // Window load fallback to ensure trigger calculation accuracy
  window.addEventListener("load", () => {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  });

  // ═══════════════════════════════════════════════════════════════
  // 1. CINEMATIC PRELOADER
  // ═══════════════════════════════════════════════════════════════
  function initPreloader() {
    const preloader = document.getElementById("preloader");
    const fill = preloader?.querySelector(".preloader-fill");
    if (!preloader || !fill) {
      document.body.classList.add("loaded");
      if (heroTimeline) heroTimeline.play();
      return;
    }

    let progress = 0;
    const loadInterval = setInterval(() => {
      progress += Math.random() * 20 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadInterval);
        setTimeout(() => {
          preloader.classList.add("is-hidden");
          document.body.classList.add("loaded");
          
          // Trigger hero sequence smoothly as preloader dissolves
          if (heroTimeline) {
            heroTimeline.play();
          } else {
            playHeroSequence();
          }

          if (typeof ScrollTrigger !== "undefined") {
            setTimeout(() => ScrollTrigger.refresh(), 100);
          }
        }, 200);
      }
      fill.style.width = `${progress}%`;
    }, 80);
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. LENIS SMOOTH SCROLL ENGINE
  // ═══════════════════════════════════════════════════════════════
  function initLenisSmoothScroll() {
    if (PREFERS_REDUCED_MOTION || typeof Lenis === "undefined") return;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      // Connect Lenis to GSAP ScrollTrigger
      if (typeof ScrollTrigger !== "undefined") {
        lenis.on("scroll", ScrollTrigger.update);
      }

      if (typeof gsap !== "undefined") {
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }

      // Track scroll velocity
      lenis.on("scroll", ({ velocity }) => {
        scrollVelocity = velocity;
      });
    } catch (e) {
      console.warn("Lenis smooth scroll initialization skipped:", e);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. INTERACTIVE PARTICLE CANVAS (Neural Network Effect)
  // ═══════════════════════════════════════════════════════════════
  function initParticleCanvas() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas || PREFERS_REDUCED_MOTION) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    const PARTICLE_COUNT = IS_MOBILE ? 25 : 65;
    const CONNECTION_DISTANCE = IS_MOBILE ? 90 : 130;
    const MOUSE_RADIUS = 160;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    }
    createParticles();

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha * 0.6})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist2 < CONNECTION_DISTANCE) {
            const alpha = (1 - dist2 / CONNECTION_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }
    animate();
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. INTELLIGENT CURSOR SYSTEM
  // ═══════════════════════════════════════════════════════════════
  function initCustomCursor() {
    if (IS_MOBILE || PREFERS_REDUCED_MOTION) return;

    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    const trail = document.getElementById("cursorTrail");
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotX = e.clientX;
      dotY = e.clientY;

      mouseVelocityX = mouseX - lastMouseX;
      mouseVelocityY = mouseY - lastMouseY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    }, { passive: true });

    function renderCursor() {
      // Dot follows immediately
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

      // Ring follows with smooth spring lerp
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      // Trail follows ring with delayed lerp
      if (trail) {
        trail.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Cursor state handlers
    document.querySelectorAll("a, button, [data-cursor], .accordion-item, .glass-card").forEach(el => {
      el.addEventListener("mouseenter", () => {
        const cursorType = el.getAttribute("data-cursor");
        if (cursorType === "project") {
          document.body.classList.add("cursor-hover-project");
        } else if (cursorType === "terminal") {
          document.body.classList.add("cursor-hover-terminal");
        } else if (cursorType === "grab") {
          document.body.classList.add("cursor-hover-grab");
        } else {
          document.body.classList.add("cursor-hover-pointer");
        }
      });

      el.addEventListener("mouseleave", () => {
        document.body.classList.remove(
          "cursor-hover-pointer",
          "cursor-hover-project",
          "cursor-hover-terminal",
          "cursor-hover-grab"
        );
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. SPLIT TEXT ANIMATIONS (Typography as Motion)
  // ═══════════════════════════════════════════════════════════════
  function initSplitTextAnimations() {
    if (PREFERS_REDUCED_MOTION) return;

    // Split hero title into individual characters if SplitType available
    const heroTitle = document.getElementById("heroMainTitle");
    if (heroTitle && typeof SplitType !== "undefined") {
      try {
        new SplitType(heroTitle, { types: "chars" });
      } catch (e) {
        console.warn("SplitType hero error:", e);
      }
    }

    // Split section titles for scroll reveal
    if (typeof SplitType !== "undefined") {
      document.querySelectorAll(".section-title").forEach(title => {
        try {
          new SplitType(title, { types: "words, chars" });
        } catch (e) {
          // graceful fallback
        }
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 6. HERO CHOREOGRAPHY — CINEMATIC OPENING SEQUENCE (NO FLASH)
  // ═══════════════════════════════════════════════════════════════
  function initHeroChoreography() {
    if (PREFERS_REDUCED_MOTION || typeof gsap === "undefined") {
      document.querySelectorAll(".hero-ambient-glow, .hero-grid-overlay, .floating-asset, .hero-giant-heading, .hero-subtitle-line, .hero-avatar-centerpiece, .avatar-ring-glow, .avatar-status-indicator, .hero-bottom-left, .hero-bottom-right, .marquee-wrapper, .hero-scroll-indicator").forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    // ─── STEP 1: PRE-SET INITIAL HIDDEN STATE IMMEDIATELY (Eliminates FOUC / Flashing) ───
    gsap.set(".hero-ambient-glow", { opacity: 0, scale: 0.8 });
    gsap.set(".hero-grid-overlay", { opacity: 0 });
    gsap.set("#particleCanvas", { opacity: 0 });
    gsap.set(".floating-asset", { scale: 0, opacity: 0, rotation: -20 });

    const chars = document.querySelectorAll(".hero-giant-heading .char");
    if (chars.length > 0) {
      gsap.set(chars, { y: 60, opacity: 0, rotationX: -80 });
    } else {
      gsap.set(".hero-giant-heading", { y: 40, opacity: 0 });
    }

    gsap.set(".hero-subtitle-line", { opacity: 0, y: 15 });
    gsap.set(".hero-avatar-centerpiece", { y: 50, opacity: 0, scale: 0.85 });
    gsap.set(".avatar-ring-glow", { opacity: 0, scale: 0.6 });
    gsap.set(".avatar-status-indicator", { opacity: 0, scale: 0 });
    gsap.set(".hero-bottom-left", { y: 35, opacity: 0 });
    gsap.set(".hero-bottom-right", { y: 30, opacity: 0 });
    gsap.set(".marquee-wrapper", { y: 25, opacity: 0 });
    gsap.set(".hero-scroll-indicator", { opacity: 0, y: -10 });

    // ─── STEP 2: BUILD MASTER HERO TIMELINE (Paused until preloader dissolves) ───
    heroTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

    // Scene 1: Atmosphere
    heroTimeline
      .to(".hero-ambient-glow", { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0)
      .to(".hero-grid-overlay", { opacity: 1, duration: 1.5 }, 0.1)
      .to("#particleCanvas", { opacity: 0.6, duration: 1.5 }, 0.1);

    // Scene 2: Floating 3D elements
    heroTimeline.to(".floating-asset", {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 1,
      stagger: 0.12,
      ease: "back.out(1.6)"
    }, 0.2);

    // Scene 3: Giant Name Reveal
    if (chars.length > 0) {
      heroTimeline.to(chars, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        stagger: 0.035,
        duration: 0.75,
        ease: "back.out(1.4)"
      }, 0.35);
    } else {
      heroTimeline.to(".hero-giant-heading", {
        y: 0,
        opacity: 1,
        duration: 0.8
      }, 0.35);
    }

    // Scene 4: Subtitle line
    heroTimeline.to(".hero-subtitle-line", {
      opacity: 1,
      y: 0,
      duration: 0.5
    }, 0.75);

    // Scene 5: 3D Avatar Centerpiece
    heroTimeline.to(".hero-avatar-centerpiece", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.1,
      ease: "elastic.out(1, 0.7)"
    }, 0.55)
    .to(".avatar-ring-glow", {
      opacity: 0.4,
      scale: 1,
      duration: 0.8
    }, 0.8)
    .to(".avatar-status-indicator", {
      opacity: 1,
      scale: 1,
      duration: 0.45,
      ease: "back.out(2)"
    }, 1.0);

    // Scene 6: Bottom Information
    heroTimeline.to(".hero-bottom-left", {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 0.9)
    .to(".hero-bottom-right", {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 1.0);

    // Scene 7: Marquee & Scroll Indicator
    heroTimeline.to(".marquee-wrapper", {
      y: 0,
      opacity: 1,
      duration: 0.7
    }, 1.1)
    .to(".hero-scroll-indicator", {
      opacity: 1,
      y: 0,
      duration: 0.5
    }, 1.3);

    // Ambient floating loops for assets
    document.querySelectorAll(".floating-asset").forEach((asset, i) => {
      gsap.to(asset, {
        y: "random(-12, 12)",
        x: "random(-8, 8)",
        rotation: "random(-6, 6)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3 + 1.5,
      });
    });

    // Avatar idle breathing loop
    gsap.to(".hero-avatar-card", {
      y: "random(-4, 4)",
      rotationZ: "random(-0.8, 0.8)",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.8,
    });
  }

  function playHeroSequence() {
    if (heroTimeline) {
      heroTimeline.play();
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 7. SCROLL-LINKED ANIMATIONS (Guaranteed Visibility for All Sections)
  // ═══════════════════════════════════════════════════════════════
  function initScrollAnimations() {
    // Universal reveal helper
    function revealElement(el) {
      el.classList.add("is-visible");
      el.style.opacity = "1";
      el.style.transform = "translate3d(0, 0, 0)";
    }

    if (PREFERS_REDUCED_MOTION || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      document.querySelectorAll(".scroll-reveal").forEach(revealElement);
      return;
    }

    // ─── HERO PARALLAX TRANSFORMATIONS ───
    gsap.to(".hero-bg-text", {
      scrollTrigger: {
        trigger: ".hero-3d-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      letterSpacing: "0.15em",
      opacity: 0.05,
      y: -80,
      scale: 1.08,
    });

    gsap.to(".hero-avatar-centerpiece", {
      scrollTrigger: {
        trigger: ".hero-3d-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: -70,
      scale: 0.88,
      opacity: 0.35,
    });

    gsap.to(".hero-giant-heading", {
      scrollTrigger: {
        trigger: ".hero-3d-section",
        start: "top top",
        end: "50% top",
        scrub: 1,
      },
      y: -50,
      opacity: 0.15,
    });

    gsap.to(".hero-scroll-indicator", {
      scrollTrigger: {
        trigger: ".hero-3d-section",
        start: "top top",
        end: "15% top",
        scrub: true,
      },
      opacity: 0,
      y: -15,
    });

    // ─── UNIFIED SCROLL REVEAL (Every section & card guaranteed) ───
    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      gsap.fromTo(el,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            onEnter: () => el.classList.add("is-visible"),
          }
        }
      );
    });

    // ─── INTERSECTION OBSERVER BACKUP (Guarantees zero stuck invisible sections) ───
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px 50px 0px" });

      document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
    }

    // ─── TERMINAL PERSPECTIVE ENTRANCE ───
    const terminalWin = document.querySelector(".terminal-window");
    if (terminalWin) {
      gsap.fromTo(terminalWin,
        { rotateX: 6, scale: 0.96 },
        {
          rotateX: 0,
          scale: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".terminal-section",
            start: "top 78%",
            toggleActions: "play none none none",
          }
        }
      );
    }

    // ─── SECTION DIVIDERS ───
    document.querySelectorAll(".section-divider").forEach(divider => {
      const lines = divider.querySelectorAll(".divider-line");
      const dot = divider.querySelector(".divider-dot");

      gsap.timeline({
        scrollTrigger: {
          trigger: divider,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      })
      .to(lines, { scaleX: 1, duration: 0.8, stagger: 0.1, ease: "power2.inOut" })
      .to(dot, { scale: 1, duration: 0.4, ease: "back.out(3)" }, "-=0.3");
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 8. DYNAMIC CARD SPOTLIGHTS
  // ═══════════════════════════════════════════════════════════════
  function initDynamicCardSpotlights() {
    if (IS_MOBILE) return;

    document.querySelectorAll(".glass-card, .accordion-item, .code-inspector-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }, { passive: true });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 9. HERO PARALLAX & 3D HEAD TRACKING
  // ═══════════════════════════════════════════════════════════════
  function initHeroParallaxAndHeadTracking() {
    const hero = document.querySelector(".hero-3d-section");
    const avatarCard = document.querySelector(".hero-avatar-card");
    const bgName = document.querySelector(".hero-bg-text");
    if (!hero || !avatarCard || IS_MOBILE || PREFERS_REDUCED_MOTION) return;

    let targetRotX = 0, targetRotY = 0;
    let curRotX = 0, curRotY = 0;
    let bgTargetX = 0, bgTargetY = 0;
    let bgCurX = 0, bgCurY = 0;

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const normX = (e.clientX - cx) / (rect.width / 2);
      const normY = (e.clientY - cy) / (rect.height / 2);

      targetRotY = normX * 14;
      targetRotX = -normY * 14;

      bgTargetX = normX * 25;
      bgTargetY = normY * 15;
    }, { passive: true });

    hero.addEventListener("mouseleave", () => {
      targetRotX = 0;
      targetRotY = 0;
      bgTargetX = 0;
      bgTargetY = 0;
    });

    function animateTracking() {
      curRotX += (targetRotX - curRotX) * 0.1;
      curRotY += (targetRotY - curRotY) * 0.1;
      avatarCard.style.transform = `perspective(1000px) rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg)`;

      if (bgName) {
        bgCurX += (bgTargetX - bgCurX) * 0.08;
        bgCurY += (bgTargetY - bgCurY) * 0.08;
        bgName.style.transform = `translate3d(${bgCurX.toFixed(1)}px, ${bgCurY.toFixed(1)}px, 0)`;
      }

      requestAnimationFrame(animateTracking);
    }
    animateTracking();
  }

  // ═══════════════════════════════════════════════════════════════
  // 10. MOBILE MENU DRAWER
  // ═══════════════════════════════════════════════════════════════
  function initMobileMenuDrawer() {
    const toggle = document.getElementById("mobileMenuToggle");
    const overlay = document.getElementById("mobileNavOverlay");
    const closeBtn = document.getElementById("mobileNavClose");
    const links = document.querySelectorAll(".mobile-nav-link");
    if (!toggle || !overlay) return;

    function openDrawer() {
      overlay.classList.add("is-active");
      toggle.classList.add("is-active");
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    }

    function closeDrawer() {
      overlay.classList.remove("is-active");
      toggle.classList.remove("is-active");
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }

    toggle.addEventListener("click", () => {
      overlay.classList.contains("is-active") ? closeDrawer() : openDrawer();
    });

    closeBtn?.addEventListener("click", closeDrawer);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeDrawer();
    });

    links.forEach(link => link.addEventListener("click", closeDrawer));
  }

  // ═══════════════════════════════════════════════════════════════
  // 11. MAGNETIC BUTTONS (Physics-Based)
  // ═══════════════════════════════════════════════════════════════
  function initMagneticButtons() {
    if (IS_MOBILE || PREFERS_REDUCED_MOTION) return;

    document.querySelectorAll('[data-magnetic="true"], .btn-emerald, .nav-brand').forEach(btn => {
      let bX = 0, bY = 0;

      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        bX = (e.clientX - cx) * 0.3;
        bY = (e.clientY - cy) * 0.3;
        btn.style.transform = `translate3d(${bX.toFixed(1)}px, ${bY.toFixed(1)}px, 0)`;
      }, { passive: true });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate3d(0, 0, 0)";
        btn.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        setTimeout(() => {
          btn.style.transition = "";
        }, 400);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 12. 3D CARD TILT
  // ═══════════════════════════════════════════════════════════════
  function initCard3DTilt() {
    if (IS_MOBILE || PREFERS_REDUCED_MOTION) return;

    document.querySelectorAll('[data-tilt="true"]').forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -((y - centerY) / centerY) * 6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
      }, { passive: true });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 13. PROJECT ACCORDION
  // ═══════════════════════════════════════════════════════════════
  function initProjectAccordion() {
    const items = document.querySelectorAll(".accordion-item");
    if (!items.length) return;

    items.forEach(item => {
      const header = item.querySelector(".accordion-header");
      header?.addEventListener("click", () => {
        const wasActive = item.classList.contains("active");

        items.forEach(other => other.classList.remove("active"));

        if (!wasActive) {
          item.classList.add("active");
        }

        if (typeof ScrollTrigger !== "undefined") {
          setTimeout(() => ScrollTrigger.refresh(), 350);
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 14. NAVIGATION & ACTIVE SECTION HIGHLIGHTING
  // ═══════════════════════════════════════════════════════════════
  function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    // Smooth scroll for anchor clicks
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 });
          } else {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    // Update active nav link on scroll
    function updateActiveLink() {
      const scrollY = window.scrollY + 120;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════════
  // 15. NAVBAR SCROLL BEHAVIOR
  // ═══════════════════════════════════════════════════════════════
  function initNavbarScrollBehavior() {
    const navbar = document.getElementById("mainNavbar");
    if (!navbar) return;

    let lastScroll = 0;
    const threshold = 50;

    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= threshold) {
        navbar.classList.remove("navbar-hidden");
        navbar.classList.remove("navbar-scrolled");
        return;
      }

      navbar.classList.add("navbar-scrolled");

      if (currentScroll > lastScroll && currentScroll > 200) {
        // Scrolling down
        navbar.classList.add("navbar-hidden");
      } else {
        // Scrolling up
        navbar.classList.remove("navbar-hidden");
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════════
  // 16. CODE INSPECTOR TABS
  // ═══════════════════════════════════════════════════════════════
  function initCodeInspector() {
    const tabs = document.querySelectorAll(".code-tab");
    const snippets = document.querySelectorAll(".code-snippet");
    if (!tabs.length || !snippets.length) return;

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const targetTab = tab.getAttribute("data-tab");

        tabs.forEach(t => t.classList.remove("active"));
        snippets.forEach(s => s.classList.remove("active"));

        tab.classList.add("active");
        const activeSnippet = document.querySelector(`.code-snippet[data-snippet="${targetTab}"]`);
        if (activeSnippet) activeSnippet.classList.add("active");
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 17. ARCHITECTURE MODAL
  // ═══════════════════════════════════════════════════════════════
  function initArchitectureModal() {
    const trigger = document.getElementById("viewArchitectureBtn");
    const modal = document.getElementById("architectureModal");
    const closeBtn = document.getElementById("closeModalBtn");
    if (!trigger || !modal) return;

    function openModal() {
      modal.classList.add("is-active");
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    }

    function closeModal() {
      modal.classList.remove("is-active");
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }

    trigger.addEventListener("click", openModal);
    closeBtn?.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-active")) {
        closeModal();
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 18. COPY TRIGGERS & TOAST SYSTEM
  // ═══════════════════════════════════════════════════════════════
  function initCopyTriggers() {
    document.querySelectorAll("[data-copy]").forEach(trigger => {
      trigger.addEventListener("click", () => {
        const text = trigger.getAttribute("data-copy");
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied to clipboard: "${text}"`);
        }).catch(() => {
          showToast(`Selected: ${text}`);
        });
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
    
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // ═══════════════════════════════════════════════════════════════
  // 19. MARQUEE VELOCITY (Reacts to Scroll)
  // ═══════════════════════════════════════════════════════════════
  function initMarqueeVelocity() {
    const marqueeTrack = document.querySelector(".marquee-track");
    if (!marqueeTrack || PREFERS_REDUCED_MOTION) return;

    let baseSpeed = 1;
    let currentSpeed = 1;
    let position = 0;

    function animateMarquee() {
      const targetSpeed = baseSpeed + Math.abs(scrollVelocity) * 0.8;
      currentSpeed += (targetSpeed - currentSpeed) * 0.1;

      position -= currentSpeed;
      if (position <= -50) position = 0;

      marqueeTrack.style.transform = `translate3d(${position}%, 0, 0)`;
      requestAnimationFrame(animateMarquee);
    }
    animateMarquee();
  }

  // ═══════════════════════════════════════════════════════════════
  // 20. YEAR STAMP
  // ═══════════════════════════════════════════════════════════════
  function initYear() {
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

})();
