/**
 * OLED Cyber-Cinema Orchestrator — Kinetic Motion Architecture
 * -------------------------------------------------------------
 * 1. Blast Door Preloader Curtain
 * 2. 60FPS Interactive HTML5 Network Topology Canvas
 * 3. Lenis Smooth Scroll & GSAP ScrollTrigger Choreography
 * 4. 3D Magnetic Avatar & Card Tilt with Specular Spotlight
 * 5. Slide-Over Architecture Blueprint Drawer
 * 6. Command Palette (Cmd+K) & SSH Webhook Dispatch
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // 1. SYSTEM BOOT PRELOADER BLAST DOOR
  // ═══════════════════════════════════════════════════════════════
  function initPreloaderBlastDoor() {
    const curtain = document.getElementById("preloaderCurtain");
    const bar = document.getElementById("preloaderBar");
    const pct = document.getElementById("preloaderPct");
    const logsContainer = document.getElementById("preloaderLogs");
    if (!curtain || !bar || !pct) return;

    const bootSteps = [
      { text: "[OK] Mounting Avatar Orbital HUD Frame...", at: 15 },
      { text: "[OK] Initializing Lenis 60FPS Physics Engine...", at: 40 },
      { text: "[OK] Spawning Interactive Cloud Constellation...", at: 70 },
      { text: "[OK] Igniting Cyber-Cinema Shaders & Telemetry...", at: 90 },
      { text: "⚡ [READY] Portfolio Control Plane Online.", at: 100 }
    ];

    let currentProgress = 0;
    let stepIndex = 0;

    const interval = setInterval(() => {
      currentProgress += Math.floor(4 + Math.random() * 8);
      if (currentProgress > 100) currentProgress = 100;

      bar.style.width = `${currentProgress}%`;
      pct.textContent = `${currentProgress}%`;

      if (stepIndex < bootSteps.length && currentProgress >= bootSteps[stepIndex].at) {
        if (logsContainer) {
          const line = document.createElement("div");
          line.textContent = bootSteps[stepIndex].text;
          logsContainer.appendChild(line);
        }
        stepIndex++;
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          curtain.classList.add("blast-open");
          setTimeout(() => {
            curtain.style.display = "none";
            triggerHeroEntranceAnimation();
          }, 850);
        }, 300);
      }
    }, 35);
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. 60FPS INTERACTIVE NETWORK TOPOLOGY CANVAS
  // ═══════════════════════════════════════════════════════════════
  function initNetworkConstellationCanvas() {
    const canvas = document.getElementById("networkCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let nodes = [];
    const nodeCount = 55;
    const maxDistance = 135;

    let mouse = { x: -9999, y: -9999, radius: 150 };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    window.addEventListener("pointermove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener("pointerleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    // Create cloud infrastructure nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.2,
        baseColor: i % 3 === 0 ? "rgba(0, 245, 160, 0.7)" : (i % 3 === 1 ? "rgba(56, 189, 248, 0.7)" : "rgba(168, 85, 247, 0.6)")
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Mouse repulsion
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          n.x -= (dx / dist) * force * 3;
          n.y -= (dy / dist) * force * 3;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.baseColor;
        ctx.fill();

        // Connect adjacent nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const distNodes = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (distNodes < maxDistance) {
            const alpha = (1 - distNodes / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }
    animate();
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. LENIS SMOOTH SCROLL & GSAP SCROLLTRIGGER CHOREOGRAPHY
  // ═══════════════════════════════════════════════════════════════
  let lenisInstance = null;

  function initSmoothScrollAndGSAP() {
    if (typeof window.Lenis !== "undefined") {
      lenisInstance = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      });

      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    if (typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined") {
      window.gsap.registerPlugin(window.ScrollTrigger);

      if (lenisInstance) {
        lenisInstance.on("scroll", window.ScrollTrigger.update);
        window.gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
        window.gsap.ticker.lagSmoothing(0);
      }

      // Bento Grid Stagger Animation
      window.gsap.from(".bento-box", {
        scrollTrigger: {
          trigger: "#topology",
          start: "top 80%"
        },
        y: 50,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        stagger: 0.08,
        ease: "power2.out"
      });

      // Projects Stagger Animation
      window.gsap.from(".project-container-card", {
        scrollTrigger: {
          trigger: "#containers",
          start: "top 80%"
        },
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Git Log Commit Nodes Animation
      window.gsap.from(".git-commit-node", {
        scrollTrigger: {
          trigger: "#git-log",
          start: "top 80%"
        },
        x: -30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.15,
        ease: "power2.out"
      });
    }
  }

  function triggerHeroEntranceAnimation() {
    if (typeof window.gsap !== "undefined") {
      window.gsap.from(".hero-identity-card", {
        scale: 0.92,
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "back.out(1.2)"
      });
      window.gsap.from(".hero-glass-terminal", {
        x: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out"
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. 3D MAGNETIC AVATAR & CARD TILT WITH SPOTLIGHT
  // ═══════════════════════════════════════════════════════════════
  function init3DMagneticTilt() {
    const cards = document.querySelectorAll(".hero-identity-card, .hero-glass-terminal, .bento-box, .project-container-card, .commit-card-box");
    const avatarStage = document.getElementById("avatarStage");

    window.addEventListener("pointermove", (e) => {
      const { clientX, clientY } = e;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });

      // Magnetic 3D tilt on Hero Avatar
      if (avatarStage) {
        const rect = avatarStage.getBoundingClientRect();
        if (clientX >= rect.left - 50 && clientX <= rect.right + 50 && clientY >= rect.top - 50 && clientY <= rect.bottom + 50) {
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const normX = (clientX - cx) / (rect.width / 2);
          const normY = (clientY - cy) / (rect.height / 2);
          avatarStage.style.transform = `perspective(1000px) rotateY(${(normX * 14).toFixed(1)}deg) rotateX(${(-normY * 14).toFixed(1)}deg)`;
        } else {
          avatarStage.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
        }
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. SLIDE-OVER ARCHITECTURE BLUEPRINT DRAWER
  // ═══════════════════════════════════════════════════════════════
  const blueprintData = {
    nexora: {
      tag: "CONTAINER // ARCHITECTURE BLUEPRINT",
      title: "Nexora — Quick-Commerce Mobile Architecture",
      diagram: `[React Native 0.81 (Mobile APK)]
    ├── Expo Router v6 (Deep-Linked Navigation)
    ├── SQLite Client Cache (Offline Order Queue)
    └── Cloudflare Workers (6-Digit OTP Gateway)
           └── Async Delivery Radar Engine (Sub-50ms Fulfillment)`,
      impact: "Zero-latency mobile checkout architecture with offline-first SQLite synchronization, OTP security boundaries, and responsive native UI running at 60 FPS."
    },
    kkk: {
      tag: "CONTAINER // ARCHITECTURE BLUEPRINT",
      title: "Kashmir Kesar Kingdom — Global Export Engine",
      diagram: `[User Browser Across 12+ Nations]
    ├── Cloudflare Edge CDN (SSL/TLS 1.3 Termination)
    ├── NGINX Reverse Proxy (Brotli/Gzip: 95% Payload Drop)
    ├── Multi-Currency Dynamic Worker (USD, EUR, GBP, AED, INR)
    └── Service Worker Cache Storage (PWA Offline Catalog)`,
      impact: "Reduced web asset footprint from 48.3MB to 2.43MB (95% drop) enabling instant load times over global cellular connections, integrated with an automated B2B RFQ cost estimator."
    },
    craver: {
      tag: "CONTAINER // ARCHITECTURE BLUEPRINT",
      title: "Craver Fast Food — Modular Ordering Engine",
      diagram: `[Modular ES6+ Reactive Client]
    ├── LocalStorage Persistent State (Cart & Coupon Engine)
    ├── GitHub Actions Automated CI/CD Pipeline
    └── Zero-Downtime GitHub Pages CDN Edge Deployment`,
      impact: "Modular componentized architecture with real-time catalog search, dietary filter matrix, and continuous automated build validation upon git push."
    },
    sysinspect: {
      tag: "CONTAINER // ARCHITECTURE BLUEPRINT",
      title: "sys-inspect — Linux Kernel Telemetry CLI",
      diagram: `[Direct /proc & /sys Memory Readers]
    ├── Zombie/Defunct Process PID Tree Scanner
    ├── Inode & File Descriptor Saturation Evaluator
    └── Dynamic ANSI Health Triage Generator`,
      impact: "Production Linux auditing CLI reporting kernel performance primitives, detecting memory leaks, and isolating zombie processes with strict defensive pipefail handling."
    },
    networklab: {
      tag: "CONTAINER // ARCHITECTURE BLUEPRINT",
      title: "Network Protocol Labs & Packet Inspector",
      diagram: `[Wireshark Raw Interface eth0]
    ├── TCP 3-Way Handshake Sequence Analysis
    ├── CIDR Subnet Calculator (VLSM IPv4/IPv6)
    └── BGP Dynamic Peering Route Simulator (ASN 64512)`,
      impact: "In-depth packet capture and protocol verification across OSI Layers 2 through 7, auditing TCP window scaling, MTU fragmentation, and DNS authoritative propagation."
    },
    algoengine: {
      tag: "CONTAINER // ARCHITECTURE BLUEPRINT",
      title: "Algo-Engine — Python DSA & Distributed Algorithms",
      diagram: `[Big-O Asymptotic Complexity Profiler]
    ├── LRU Cache Engine (O(1) Memory Access)
    ├── Graph Shortest-Path Router (Dijkstra Algorithm)
    └── Automated PyTest Continuous Benchmark Suite`,
      impact: "Clean implementations of distributed consensus primitives, tree balancing, and graph routing algorithms optimized for execution speed and minimal memory footprint."
    }
  };

  function initArchitectureDrawer() {
    const backdrop = document.getElementById("archDrawerBackdrop");
    const closeBtn = document.getElementById("archDrawerClose");
    const tagEl = document.getElementById("drawerTag");
    const titleEl = document.getElementById("drawerTitle");
    const diagramEl = document.getElementById("drawerDiagram");
    const impactEl = document.getElementById("drawerImpact");

    if (!backdrop) return;

    function openDrawer(key) {
      const data = blueprintData[key];
      if (!data) return;

      tagEl.textContent = data.tag;
      titleEl.textContent = data.title;
      diagramEl.textContent = data.diagram;
      impactEl.textContent = data.impact;

      backdrop.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
      backdrop.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    document.querySelectorAll(".btn-blueprint-drawer[data-project]").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.project;
        openDrawer(key);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeDrawer();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
        closeDrawer();
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 6. COMMAND PALETTE (CMD + K) & RESUME SIMULATOR
  // ═══════════════════════════════════════════════════════════════
  function initCommandPalette() {
    const modal = document.getElementById("cmdPaletteModal");
    const triggerBtn = document.getElementById("cmdPaletteBtn");
    const closeBtn = document.getElementById("cmdPaletteClose");
    const input = document.getElementById("cmdSearchInput");
    const results = document.getElementById("cmdResultsList");
    if (!modal || !input || !results) return;

    const items = [
      { title: "Jump to Hero Terminal", icon: "fa-terminal", badge: "#terminal", action: () => scrollToId("terminal") },
      { title: "Jump to 11-Domain Tech Stack Bento", icon: "fa-network-wired", badge: "#topology", action: () => scrollToId("topology") },
      { title: "Jump to Active Containers Registry", icon: "fa-cubes", badge: "#containers", action: () => scrollToId("containers") },
      { title: "Jump to Git Commit Graph Timeline", icon: "fa-code-commit", badge: "#git-log", action: () => scrollToId("git-log") },
      { title: "Open SSH Contact Gateway", icon: "fa-satellite-dish", badge: "#contact", action: () => scrollToId("contact") },
      { title: "Execute 'docker ps' in Terminal", icon: "fa-docker", badge: "CLI", action: () => runCli("docker ps") },
      { title: "Execute 'k8s cluster' in Terminal", icon: "fa-dharmachakra", badge: "CLI", action: () => runCli("k8s cluster") },
      { title: "Download Resume (curl -O resume.pdf)", icon: "fa-file-arrow-down", badge: "PDF", action: () => triggerResumeDownload() },
      { title: "Direct WhatsApp Recruitment Chat", icon: "fa-whatsapp", badge: "Chat", action: () => window.open("https://wa.me/917889446114?text=Hi%20Uzair,%20I%20am%20reviewing%20your%20DevOps%20portfolio!", "_blank") },
      { title: "Copy Email: uzairteeli123456789@gmail.com", icon: "fa-envelope", badge: "Copy", action: () => copyEmail() }
    ];

    let filtered = [...items];
    let selectedIdx = 0;

    function render() {
      results.innerHTML = "";
      filtered.forEach((it, idx) => {
        const row = document.createElement("div");
        row.className = `cmd-result-item ${idx === selectedIdx ? 'selected' : ''}`;
        row.innerHTML = `
          <div style="display:flex; align-items:center; gap:0.65rem;">
            <i class="fa-solid ${it.icon}" style="color:#00F5A0; width:18px;"></i>
            <span style="font-size:0.88rem; font-weight:500;">${it.title}</span>
          </div>
          <span style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-slate); background:rgba(255,255,255,0.05); padding:0.15rem 0.45rem; border-radius:4px;">${it.badge}</span>
        `;
        row.addEventListener("click", () => {
          close();
          it.action();
        });
        results.appendChild(row);
      });
    }

    function open() {
      modal.classList.add("is-active");
      document.body.style.overflow = "hidden";
      input.value = "";
      filtered = [...items];
      selectedIdx = 0;
      render();
      setTimeout(() => input.focus(), 60);
    }

    function close() {
      modal.classList.remove("is-active");
      document.body.style.overflow = "";
    }

    input.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      filtered = items.filter(it => it.title.toLowerCase().includes(q) || it.badge.toLowerCase().includes(q));
      selectedIdx = 0;
      render();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIdx = (selectedIdx + 1) % filtered.length;
        render();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIdx = (selectedIdx - 1 + filtered.length) % filtered.length;
        render();
      } else if (e.key === "Enter" && filtered[selectedIdx]) {
        e.preventDefault();
        close();
        filtered[selectedIdx].action();
      } else if (e.key === "Escape") {
        close();
      }
    });

    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (modal.classList.contains("is-active")) close();
        else open();
      }
    });

    if (triggerBtn) triggerBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function runCli(command) {
    scrollToId("terminal");
    if (window.TerminalModule) {
      window.TerminalModule.switchTab('zsh');
      window.TerminalModule.typeAndExecute(command);
    }
  }

  function copyEmail() {
    const email = "uzairteeli123456789@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      alert("Email copied to clipboard: " + email);
    });
  }

  function triggerResumeDownload() {
    window.open("https://github.com/Uzair0123/portfolio/raw/main/docs/LINKEDIN_PROFILE.md", "_blank");
  }
  window.triggerResumeModal = triggerResumeDownload;

  // ═══════════════════════════════════════════════════════════════
  // 7. SSH CONTACT WEBHOOK DISPATCH
  // ═══════════════════════════════════════════════════════════════
  function initContactWebhook() {
    const form = document.getElementById("sshContactForm");
    const feedback = document.getElementById("sshFeedback");
    if (!form || !feedback) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("senderName").value.trim();
      const email = document.getElementById("senderEmail").value.trim();
      const msg = document.getElementById("senderMessage").value.trim();

      feedback.innerHTML = `
        <div style="color:#38BDF8;">[CONNECT] Establishing TLS 1.3 socket with connect@uzair.cloud on port 22...</div>
        <div style="color:#A855F7;">[AUTH] ED25519 signature validated. Dispatching payload...</div>
      `;

      setTimeout(() => {
        feedback.innerHTML += `
          <div style="color:#00F5A0; font-weight:700;">[200 OK] Packet delivered! Forwarding to Uzair's terminal mail client.</div>
        `;
        const mailto = `mailto:uzairteeli123456789@gmail.com?subject=Engineering%20Collaboration%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}%0A%0AFrom:%20${encodeURIComponent(name)}%20(${encodeURIComponent(email)})`;
        setTimeout(() => {
          window.location.href = mailto;
        }, 1200);
      }, 950);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 8. CODE TOGGLE (BASH VS PYTHON)
  // ═══════════════════════════════════════════════════════════════
  function initCodeToggle() {
    document.querySelectorAll(".auto-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        document.querySelectorAll(".auto-tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".auto-panel").forEach(p => p.style.display = "none");

        btn.classList.add("active");
        const active = document.getElementById(`panel-${tab}`);
        if (active) active.style.display = "block";
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION ON DOM READY
  // ═══════════════════════════════════════════════════════════════
  document.addEventListener("DOMContentLoaded", () => {
    initPreloaderBlastDoor();
    initNetworkConstellationCanvas();
    initSmoothScrollAndGSAP();
    init3DMagneticTilt();
    initArchitectureDrawer();
    initCommandPalette();
    initContactWebhook();
    initCodeToggle();
  });
})();
