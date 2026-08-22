/**
 * ═══════════════════════════════════════════════════════════════════════════
 * UZAIR SULTAN — AWARD-WINNING CINEMATIC EXPERIENCE CONTROLLER
 * GSAP + ScrollTrigger + Lenis + Canvas Particles + Physics Engine
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  // ═══════ PERFORMANCE & STATE ═══════
  const IS_MOBILE = window.matchMedia('(pointer: coarse)').matches;
  const IS_TABLET = window.matchMedia('(max-width: 768px)').matches;
  const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lenis = null;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let mouseVelocityX = 0, mouseVelocityY = 0;
  let lastMouseX = 0, lastMouseY = 0;
  let scrollVelocity = 0;
  let lastScrollY = 0;
  let animFrameId = null;

  // ═══════ REGISTER GSAP PLUGINS ═══════
  gsap.registerPlugin(ScrollTrigger);

  // ═══════ INITIALIZATION ═══════
  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initLenisSmoothScroll();
    initParticleCanvas();
    initCustomCursor();
    initHeroChoreography();
    initSplitTextAnimations();
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

  // ═══════════════════════════════════════════════════════════════
  // 1. CINEMATIC PRELOADER
  // ═══════════════════════════════════════════════════════════════
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const fill = preloader?.querySelector('.preloader-fill');
    if (!preloader || !fill) return;

    let progress = 0;
    const loadInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadInterval);
        setTimeout(() => {
          preloader.classList.add('is-hidden');
          document.body.classList.add('loaded');
          // Trigger hero choreography after preloader
          setTimeout(playHeroSequence, 200);
        }, 300);
      }
      fill.style.width = `${progress}%`;
    }, 120);
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. LENIS SMOOTH SCROLL ENGINE
  // ═══════════════════════════════════════════════════════════════
  function initLenisSmoothScroll() {
    if (PREFERS_REDUCED_MOTION) return;

    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Track scroll velocity
    lenis.on('scroll', ({ scroll, velocity }) => {
      scrollVelocity = velocity;
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. INTERACTIVE PARTICLE CANVAS (Neural Network Effect)
  // ═══════════════════════════════════════════════════════════════
  function initParticleCanvas() {
    if (PREFERS_REDUCED_MOTION || IS_MOBILE) return;

    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = window.innerWidth < 1024 ? 40 : 70;
    const CONNECTION_DISTANCE = 150;
    const MOUSE_INFLUENCE = 200;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
          baseOpacity: Math.random() * 0.5 + 0.2,
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Mouse repulsion/attraction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_INFLUENCE) {
          const force = (MOUSE_INFLUENCE - dist) / MOUSE_INFLUENCE;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
        }

        // Scroll velocity influence
        p.vy += scrollVelocity * 0.001;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Bounds
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.baseOpacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < CONNECTION_DISTANCE) {
            const opacity = (1 - cdist / CONNECTION_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animFrameId = requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. INTELLIGENT CURSOR SYSTEM
  // ═══════════════════════════════════════════════════════════════
  function initCustomCursor() {
    if (IS_MOBILE || PREFERS_REDUCED_MOTION) return;

    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const trail = document.getElementById('cursorTrail');
    if (!dot || !ring) return;

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let trailX = ringX;
    let trailY = ringY;
    let dotX = ringX;
    let dotY = ringY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    // Cursor morph triggers
    const interactiveElements = 'a, button, [data-cursor], input, textarea, .accordion-header';
    document.querySelectorAll(interactiveElements).forEach(el => {
      el.addEventListener('mouseenter', () => {
        const cursorType = el.dataset.cursor || 'pointer';
        document.body.className = document.body.className.replace(/cursor-hover-\w+/g, '').trim();
        document.body.classList.add(`cursor-hover-${cursorType}`);
      });

      el.addEventListener('mouseleave', () => {
        document.body.className = document.body.className.replace(/cursor-hover-\w+/g, '').trim();
      });
    });

    // Physics-based ring animation loop
    function renderCursor() {
      // Calculate mouse velocity
      mouseVelocityX = targetMouseX - lastMouseX;
      mouseVelocityY = targetMouseY - lastMouseY;
      lastMouseX = targetMouseX;
      lastMouseY = targetMouseY;

      const speed = Math.sqrt(mouseVelocityX ** 2 + mouseVelocityY ** 2);
      
      // Ring follows with inertia
      const ringLerp = Math.max(0.08, 0.16 - speed * 0.001);
      ringX += (targetMouseX - ringX) * ringLerp;
      ringY += (targetMouseY - ringY) * ringLerp;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      // Trail follows ring with more delay
      trailX += (ringX - trailX) * 0.04;
      trailY += (ringY - trailY) * 0.04;
      if (trail) {
        trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
        trail.style.opacity = Math.min(0.6, speed * 0.02);
        const trailSize = 120 + speed * 0.5;
        trail.style.width = `${trailSize}px`;
        trail.style.height = `${trailSize}px`;
      }

      requestAnimationFrame(renderCursor);
    }

    renderCursor();
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. HERO CHOREOGRAPHY — CINEMATIC OPENING SEQUENCE
  // ═══════════════════════════════════════════════════════════════
  function playHeroSequence() {
    if (PREFERS_REDUCED_MOTION) {
      // Instant reveal for reduced motion
      document.querySelectorAll('.scroll-reveal, .hero-giant-heading, .hero-avatar-centerpiece, .hero-bottom-left, .hero-bottom-right, .marquee-wrapper, .floating-asset, .hero-ambient-glow, .hero-scroll-indicator, .hero-subtitle-line').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }});

    // SCENE 01 — Atmosphere
    tl.to('.hero-ambient-glow', {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: 'power2.out'
    }, 0)
    .from('.hero-grid-overlay', {
      opacity: 0,
      duration: 2,
    }, 0.2)
    .to('#particleCanvas', {
      opacity: 0.5,
      duration: 2,
    }, 0);

    // SCENE 02 — Floating Assets Enter
    tl.from('.floating-asset', {
      scale: 0,
      opacity: 0,
      rotation: -20,
      duration: 1.2,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    }, 0.3);

    // SCENE 03 — Giant Name (Letter by Letter)
    tl.from('.hero-giant-heading .char', {
      y: 80,
      opacity: 0,
      rotationX: -90,
      stagger: 0.04,
      duration: 0.8,
      ease: 'back.out(1.5)'
    }, 0.5);

    // SCENE 04 — Subtitle Types In
    tl.from('.hero-subtitle-line', {
      opacity: 0,
      y: 15,
      duration: 0.6,
    }, 1.1);

    // SCENE 05 — Avatar Spring Physics Entrance
    tl.from('.hero-avatar-centerpiece', {
      y: 60,
      opacity: 0,
      scale: 0.8,
      rotationY: -15,
      duration: 1.4,
      ease: 'elastic.out(1, 0.6)'
    }, 0.7)
    .from('.avatar-ring-glow', {
      opacity: 0,
      scale: 0.5,
      duration: 1,
    }, 1)
    .from('.avatar-status-indicator', {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: 'back.out(2)'
    }, 1.4);

    // SCENE 06 — Bottom Row
    tl.from('.hero-bottom-left', {
      y: 40,
      opacity: 0,
      duration: 0.8,
    }, 1.2)
    .from('.hero-role-badge', {
      y: 15,
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: 'back.out(2)'
    }, 1.4)
    .from('.hero-tagline-text', {
      y: 15,
      opacity: 0,
      duration: 0.6,
    }, 1.5)
    .from('.hero-bottom-right', {
      y: 30,
      opacity: 0,
      duration: 0.7,
    }, 1.5)
    .from('.btn-neon-pill-glow', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(2)'
    }, 1.6);

    // SCENE 07 — Marquee & Scroll Indicator
    tl.from('.marquee-wrapper', {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, 1.8)
    .from('.hero-scroll-indicator', {
      opacity: 0,
      y: -10,
      duration: 0.6,
    }, 2.2);

    // Continuous floating animation for assets
    document.querySelectorAll('.floating-asset').forEach((asset, i) => {
      gsap.to(asset, {
        y: 'random(-15, 15)',
        x: 'random(-10, 10)',
        rotation: 'random(-8, 8)',
        duration: 'random(4, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });

    // Avatar idle breathing
    gsap.to('.hero-avatar-card', {
      y: 'random(-5, 5)',
      rotationZ: 'random(-1, 1)',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 6. SPLIT TEXT ANIMATIONS (Typography as Motion)
  // ═══════════════════════════════════════════════════════════════
  function initSplitTextAnimations() {
    if (PREFERS_REDUCED_MOTION || typeof SplitType === 'undefined') return;

    // Split hero title into individual characters
    const heroTitle = document.getElementById('heroMainTitle');
    if (heroTitle) {
      new SplitType(heroTitle, { types: 'chars' });
    }

    // Split section titles for scroll reveal
    document.querySelectorAll('.section-title').forEach(title => {
      new SplitType(title, { types: 'words, chars' });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 7. SCROLL-LINKED ANIMATIONS (Camera Feel)
  // ═══════════════════════════════════════════════════════════════
  function initScrollAnimations() {
    if (PREFERS_REDUCED_MOTION) {
      document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    // ─── WOW MOMENT A: Giant Name Scroll Transformation ───
    gsap.to('.hero-bg-text', {
      scrollTrigger: {
        trigger: '.hero-3d-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      letterSpacing: '0.15em',
      opacity: 0.05,
      y: -100,
      scale: 1.1,
    });

    // ─── Hero Parallax on Scroll ───
    gsap.to('.hero-avatar-centerpiece', {
      scrollTrigger: {
        trigger: '.hero-3d-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: -80,
      scale: 0.85,
      opacity: 0.3,
    });

    gsap.to('.hero-giant-heading', {
      scrollTrigger: {
        trigger: '.hero-3d-section',
        start: 'top top',
        end: '50% top',
        scrub: 1,
      },
      y: -60,
      opacity: 0.1,
      scale: 0.9,
    });

    gsap.to('.hero-bottom-grid', {
      scrollTrigger: {
        trigger: '.hero-3d-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: -50,
      opacity: 0,
    });

    // ─── Section Divider Animation ───
    document.querySelectorAll('.section-divider').forEach(divider => {
      const lines = divider.querySelectorAll('.divider-line');
      const dot = divider.querySelector('.divider-dot');

      gsap.timeline({
        scrollTrigger: {
          trigger: divider,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })
      .to(lines, { scaleX: 1, duration: 0.8, stagger: 0.1, ease: 'power2.inOut' })
      .to(dot, { scale: 1, duration: 0.4, ease: 'back.out(3)' }, '-=0.3');
    });

    // ─── Scroll Reveal with Enhanced Stagger ───
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      gsap.fromTo(el, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // ─── Section Title Word Highlight ───
    document.querySelectorAll('.section-title .char').forEach((char, i) => {
      gsap.fromTo(char,
        { opacity: 0.3, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: char.closest('.section-title'),
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // ─── WOW MOMENT B: Terminal Perspective Entrance ───
    gsap.fromTo('.terminal-window',
      { rotateX: 8, y: 60, scale: 0.95, opacity: 0 },
      {
        rotateX: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.terminal-section',
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      }
    );

    // ─── WOW MOMENT C: Project Accordion Staggered Reveal ───
    gsap.fromTo('.accordion-item',
      { x: -60, opacity: 0, rotateY: -5 },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-accordion',
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );

    // ─── Service Rows Staggered Entrance ───
    gsap.fromTo('.service-row',
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-numbered-list',
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );

    // ─── Skills Cards 3D Entrance ───
    gsap.fromTo('.glass-card',
      { y: 50, rotateX: 10, opacity: 0 },
      {
        y: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );

    // ─── Contact Card Grand Entrance ───
    gsap.fromTo('.contact-card',
      { scale: 0.9, y: 50, opacity: 0 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-card',
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );

    // ─── Scroll Indicator Fade Out ───
    gsap.to('.hero-scroll-indicator', {
      scrollTrigger: {
        trigger: '.hero-3d-section',
        start: 'top top',
        end: '15% top',
        scrub: true,
      },
      opacity: 0,
      y: -20,
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 8. DYNAMIC CARD SPOTLIGHTS
  // ═══════════════════════════════════════════════════════════════
  function initDynamicCardSpotlights() {
    const spotlightCards = document.querySelectorAll('.glass-card, .accordion-item, .terminal-window');

    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }, { passive: true });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 9. HERO PARALLAX & 3D HEAD TRACKING
  // ═══════════════════════════════════════════════════════════════
  function initHeroParallaxAndHeadTracking() {
    const avatarCard = document.getElementById('avatar3DCard');
    const parallaxLayers = document.querySelectorAll('[data-depth]');
    const heroSection = document.querySelector('.hero-3d-section');

    if (!avatarCard || !heroSection) return;

    let currentHeadX = 0, currentHeadY = 0;
    let targetHeadX = 0, targetHeadY = 0;
    let isTouching = false;
    let hasGyro = false;

    // Desktop mouse parallax with depth layers
    document.addEventListener('mousemove', (e) => {
      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;

      const normalizedX = (e.clientX - windowCenterX) / windowCenterX;
      const normalizedY = (e.clientY - windowCenterY) / windowCenterY;

      targetHeadY = normalizedX * 22;
      targetHeadX = -normalizedY * 18;

      parallaxLayers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth) || 0.05;
        const transX = normalizedX * depth * 80;
        const transY = normalizedY * depth * 80;
        gsap.to(layer, {
          x: transX,
          y: transY,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    }, { passive: true });

    // Mobile touch tracking
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        isTouching = true;
        handleTouchPos(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        isTouching = true;
        handleTouchPos(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      setTimeout(() => { isTouching = false; }, 800);
    });

    function handleTouchPos(touch) {
      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;

      const normalizedX = (touch.clientX - windowCenterX) / windowCenterX;
      const normalizedY = (touch.clientY - windowCenterY) / windowCenterY;

      targetHeadY = normalizedX * 20;
      targetHeadX = -normalizedY * 16;
    }

    // Gyroscope
    if (window.DeviceOrientationEvent && IS_MOBILE) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null && !isTouching) {
          hasGyro = true;
          targetHeadY = Math.max(-20, Math.min(20, (e.gamma / 40) * 20));
          targetHeadX = Math.max(-16, Math.min(16, ((e.beta - 45) / 40) * -16));
        }
      }, { passive: true });
    }

    // Physics animation loop with spring damping
    let animTime = 0;
    function animateFrame() {
      animTime += 0.03;

      let organicTiltY = 0;
      let organicTiltX = 0;

      if (!isTouching && !hasGyro) {
        organicTiltY = Math.sin(animTime * 0.7) * 8;
        organicTiltX = Math.cos(animTime * 0.5) * 5;
      }

      const finalTargetX = targetHeadX + organicTiltX;
      const finalTargetY = targetHeadY + organicTiltY;

      // Spring physics interpolation
      currentHeadX += (finalTargetX - currentHeadX) * 0.06;
      currentHeadY += (finalTargetY - currentHeadY) * 0.06;

      const idleBob = Math.sin(animTime) * 2.5;

      gsap.set(avatarCard, {
        rotateX: currentHeadX + idleBob,
        rotateY: currentHeadY,
        z: 20,
        transformPerspective: 1000,
      });

      requestAnimationFrame(animateFrame);
    }

    animateFrame();
  }

  // ═══════════════════════════════════════════════════════════════
  // 10. MOBILE MENU DRAWER
  // ═══════════════════════════════════════════════════════════════
  function initMobileMenuDrawer() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const closeBtn = document.getElementById('mobileNavClose');
    const overlay = document.getElementById('mobileNavOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !overlay) return;

    function openDrawer() {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    }

    function closeDrawer() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }

    toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDrawer();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
        if (lenis) {
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            setTimeout(() => lenis.scrollTo(target, { offset: -72 }), 100);
          }
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 11. MAGNETIC BUTTONS (Physics-Based)
  // ═══════════════════════════════════════════════════════════════
  function initMagneticButtons() {
    if (IS_MOBILE) return;

    const magneticBtns = document.querySelectorAll('[data-magnetic="true"]');

    magneticBtns.forEach(btn => {
      let currentX = 0, currentY = 0;
      let targetX = 0, targetY = 0;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        targetX = (e.clientX - btnCenterX) * 0.3;
        targetY = (e.clientY - btnCenterY) * 0.3;
      }, { passive: true });

      btn.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
      });

      // Spring physics loop
      function animateMagnetic() {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        btn.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${targetX !== 0 ? 1.04 : 1})`;

        if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
          requestAnimationFrame(animateMagnetic);
        }
      }

      btn.addEventListener('mouseenter', animateMagnetic);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 12. 3D CARD TILT
  // ═══════════════════════════════════════════════════════════════
  function initCard3DTilt() {
    if (IS_MOBILE) return;

    const tiltCards = document.querySelectorAll('[data-tilt="true"]');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotX = (y / (rect.height / 2)) * -4;
        const rotY = (x / (rect.width / 2)) * 4;

        gsap.to(card, {
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          overwrite: 'auto'
        });
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 13. PROJECT ACCORDION
  // ═══════════════════════════════════════════════════════════════
  function initProjectAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        accordionItems.forEach(i => i.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
          // Animate content reveal
          gsap.from(item.querySelector('.accordion-body'), {
            opacity: 0,
            y: -10,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 14. NAVIGATION
  // ═══════════════════════════════════════════════════════════════
  function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scroll to section on link click
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          if (lenis) {
            lenis.scrollTo(target, { offset: -72, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Active section tracker
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPos = window.scrollY + 150;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════════
  // 15. NAVBAR SCROLL BEHAVIOR (Hide on scroll down, show on scroll up)
  // ═══════════════════════════════════════════════════════════════
  function initNavbarScrollBehavior() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      // Add scrolled state
      if (currentScroll > 50) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }

      // Hide/show based on direction (only after hero)
      if (currentScroll > window.innerHeight * 0.8) {
        if (currentScroll > lastScroll && currentScroll > 200) {
          navbar.classList.add('is-hidden');
        } else {
          navbar.classList.remove('is-hidden');
        }
      } else {
        navbar.classList.remove('is-hidden');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════════
  // 16. CODE INSPECTOR TABS
  // ═══════════════════════════════════════════════════════════════
  function initCodeInspector() {
    const tabs = document.querySelectorAll('.code-tab-btn');
    const codePanes = document.querySelectorAll('.code-tab-pane');

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const targetId = e.currentTarget.dataset.code;

        tabs.forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');

        codePanes.forEach(pane => {
          if (pane.id === targetId) {
            pane.classList.add('active-pane');
            gsap.from(pane, { opacity: 0, y: 10, duration: 0.3 });
          } else {
            pane.classList.remove('active-pane');
          }
        });
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 17. ARCHITECTURE MODAL
  // ═══════════════════════════════════════════════════════════════
  function initArchitectureModal() {
    const modal = document.getElementById('archModal');
    const openBtn = document.getElementById('openArchModalBtn');
    const closeBtn = document.getElementById('closeArchModalBtn');

    if (!modal) return;

    if (openBtn) {
      openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 18. COPY TRIGGERS
  // ═══════════════════════════════════════════════════════════════
  function initCopyTriggers() {
    document.querySelectorAll('[data-copy]').forEach(el => {
      el.addEventListener('click', (e) => {
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
    let toast = document.getElementById('portfolioToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'portfolioToast';
      toast.className = 'portfolio-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--accent-emerald);"></i> ${message}`;
    
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // ═══════════════════════════════════════════════════════════════
  // 19. MARQUEE VELOCITY (Reacts to Scroll)
  // ═══════════════════════════════════════════════════════════════
  function initMarqueeVelocity() {
    const marqueeTrack = document.querySelector('.marquee-track');
    if (!marqueeTrack || PREFERS_REDUCED_MOTION) return;

    let baseSpeed = 24; // seconds for full animation
    let currentSpeed = baseSpeed;

    // Base animation
    gsap.to(marqueeTrack, {
      xPercent: -50,
      duration: baseSpeed,
      ease: 'none',
      repeat: -1,
    });

    // Velocity reaction
    if (lenis) {
      lenis.on('scroll', ({ velocity }) => {
        const speedMultiplier = Math.max(0.5, 1 - Math.abs(velocity) * 0.01);
        gsap.to(marqueeTrack, {
          timeScale: speedMultiplier,
          duration: 0.3,
          overwrite: true,
        });
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 20. YEAR STAMP
  // ═══════════════════════════════════════════════════════════════
  function initYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.innerText = new Date().getFullYear();
    }
  }

})();