/**
 * Cloud Control Plane & DevOps Orchestrator — Core UI Architecture
 * -----------------------------------------------------------------
 * Command Palette (Cmd+K), Interactive Spotlight, Telemetry Clock,
 * Architecture Topology Blueprints, Split Code Tabs & SSH Dispatch.
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // 1. GLOBAL STATE & TELEMETRY CLOCK
  // ═══════════════════════════════════════════════════════════════
  function initTelemetryClock() {
    const uptimeEl = document.getElementById("hudUptimeCounter");
    const latencyEl = document.getElementById("hudLatencyValue");

    // Dynamic Uptime counter (starts from realistic base and increments live)
    let totalSeconds = 182 * 86400 + 14 * 3600 + 32 * 60 + 10;

    setInterval(() => {
      totalSeconds++;
      if (uptimeEl) {
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        uptimeEl.textContent = `${days}d ${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
    }, 1000);

    // Micro latency fluctuation (11ms - 15ms)
    setInterval(() => {
      if (latencyEl) {
        const ms = Math.floor(11 + Math.random() * 5);
        latencyEl.textContent = `${ms}ms`;
      }
    }, 3500);
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. INTERACTIVE CURSOR SPOTLIGHT (LINEAR / VERCEL STYLE)
  // ═══════════════════════════════════════════════════════════════
  function initSpotlightGlow() {
    const cards = document.querySelectorAll(".control-card, .bento-card, .docker-container-card, .timeline-commit-card");

    window.addEventListener("pointermove", (e) => {
      const { clientX, clientY } = e;
      document.documentElement.style.setProperty("--cursor-x", `${clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${clientY}px`);

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. COMMAND PALETTE (CMD + K / CTRL + K)
  // ═══════════════════════════════════════════════════════════════
  function initCommandPalette() {
    const palette = document.getElementById("commandPaletteModal");
    const triggerBtn = document.getElementById("cmdPaletteBtn");
    const closeBtn = document.getElementById("cmdPaletteClose");
    const input = document.getElementById("cmdPaletteInput");
    const resultsContainer = document.getElementById("cmdPaletteResults");

    if (!palette || !input || !resultsContainer) return;

    const commands = [
      { id: "sec-terminal", title: "Jump to Interactive Linux CLI", icon: "fa-terminal", badge: "~/terminal", action: () => scrollToSection("terminal") },
      { id: "sec-topology", title: "Jump to 11-Domain Infrastructure Bento", icon: "fa-network-wired", badge: "~/topology", action: () => scrollToSection("topology") },
      { id: "sec-containers", title: "Jump to Active Docker Containers", icon: "fa-cubes", badge: "~/containers", action: () => scrollToSection("containers") },
      { id: "sec-pipelines", title: "Jump to CI/CD & ArgoCD Pipelines", icon: "fa-code-branch", badge: "~/pipelines", action: () => scrollToSection("pipelines") },
      { id: "sec-gitlog", title: "Jump to Git Commit Graph Timeline", icon: "fa-code-commit", badge: "~/git-log", action: () => scrollToSection("git-log") },
      { id: "sec-contact", title: "Open SSH Handshake & Webhook Gateway", icon: "fa-satellite-dish", badge: "~/init-contact", action: () => scrollToSection("contact") },
      { id: "cmd-whoami", title: "Run 'whoami' in Terminal", icon: "fa-user-astronaut", badge: "CLI", action: () => runTerminalCmd("whoami") },
      { id: "cmd-docker", title: "Run 'docker ps' in Terminal", icon: "fa-docker", badge: "CLI", action: () => runTerminalCmd("docker ps") },
      { id: "cmd-k8s", title: "Run 'kubectl get nodes' in Terminal", icon: "fa-dharmachakra", badge: "CLI", action: () => runTerminalCmd("kubectl get nodes") },
      { id: "cmd-resume", title: "Retrieve Resume (curl -O resume.pdf)", icon: "fa-file-arrow-down", badge: "DOCS", action: () => triggerResumeModal() },
      { id: "cmd-wa", title: "Direct Recruitment Chat via WhatsApp", icon: "fa-whatsapp", badge: "+91 7889446114", action: () => window.open("https://wa.me/917889446114?text=Hi%20Uzair,%20I%20am%20reviewing%20your%20DevOps%20portfolio!", "_blank") },
      { id: "cmd-email", title: "Copy Direct Engineer Email", icon: "fa-envelope", badge: "uzairteeli123456789@gmail.com", action: () => copyTextToClipboard("uzairteeli123456789@gmail.com", "Email copied to clipboard!") }
    ];

    let selectedIndex = 0;
    let filteredCommands = [...commands];

    function renderResults() {
      resultsContainer.innerHTML = "";
      if (filteredCommands.length === 0) {
        resultsContainer.innerHTML = `<div class="cmd-empty-state"><i class="fa-solid fa-triangle-exclamation"></i> No matching infrastructure commands found.</div>`;
        return;
      }

      filteredCommands.forEach((cmd, idx) => {
        const item = document.createElement("div");
        item.className = `cmd-item ${idx === selectedIndex ? 'selected' : ''}`;
        item.dataset.index = idx;
        item.innerHTML = `
          <div class="cmd-item-left">
            <span class="cmd-item-icon"><i class="fa-solid ${cmd.icon}"></i></span>
            <span class="cmd-item-title">${cmd.title}</span>
          </div>
          <span class="cmd-item-badge">${cmd.badge}</span>
        `;
        item.addEventListener("click", () => executePaletteItem(idx));
        resultsContainer.appendChild(item);
      });
    }

    function openPalette() {
      palette.classList.add("is-active");
      document.body.style.overflow = "hidden";
      input.value = "";
      filteredCommands = [...commands];
      selectedIndex = 0;
      renderResults();
      setTimeout(() => input.focus(), 50);
    }

    function closePalette() {
      palette.classList.remove("is-active");
      document.body.style.overflow = "";
    }

    function executePaletteItem(idx) {
      const target = filteredCommands[idx];
      if (target && target.action) {
        closePalette();
        target.action();
      }
    }

    function scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }

    function runTerminalCmd(command) {
      scrollToSection("terminal");
      if (window.TerminalModule) {
        window.TerminalModule.switchTab('zsh');
        window.TerminalModule.executeCommand(command);
      }
    }

    // Input filtering
    input.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      filteredCommands = commands.filter(c => c.title.toLowerCase().includes(query) || c.badge.toLowerCase().includes(query));
      selectedIndex = 0;
      renderResults();
    });

    // Keyboard navigation inside palette
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        renderResults();
        ensureSelectedVisible();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
        renderResults();
        ensureSelectedVisible();
      } else if (e.key === "Enter") {
        e.preventDefault();
        executePaletteItem(selectedIndex);
      } else if (e.key === "Escape") {
        e.preventDefault();
        closePalette();
      }
    });

    function ensureSelectedVisible() {
      const activeEl = resultsContainer.querySelector(".cmd-item.selected");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }

    // Global Keybind (Cmd+K / Ctrl+K)
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (palette.classList.contains("is-active")) {
          closePalette();
        } else {
          openPalette();
        }
      } else if (e.key === "Escape" && palette.classList.contains("is-active")) {
        closePalette();
      }
    });

    if (triggerBtn) triggerBtn.addEventListener("click", openPalette);
    if (closeBtn) closeBtn.addEventListener("click", closePalette);
    palette.addEventListener("click", (e) => {
      if (e.target === palette) closePalette();
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. RESUME DOWNLOAD MODAL WITH SIMULATED PROGRESS BAR
  // ═══════════════════════════════════════════════════════════════
  function triggerResumeModal() {
    let modal = document.getElementById("resumeDownloadModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "resumeDownloadModal";
      modal.className = "terminal-progress-modal";
      modal.innerHTML = `
        <div class="progress-modal-card">
          <div class="progress-header">
            <span class="p-dot dot-red"></span>
            <span class="p-dot dot-yellow"></span>
            <span class="p-dot dot-green"></span>
            <span class="p-title">curl -O resume.pdf // AWS S3 Artifact Delivery</span>
          </div>
          <div class="progress-body">
            <div class="p-cmd">$ curl -sSL https://cdn.uzair.cloud/artifacts/Uzair_Sultan_DevOps_Resume.pdf -o resume.pdf</div>
            <div class="p-bar-track">
              <div class="p-bar-fill" id="resumeProgressBar"></div>
            </div>
            <div class="p-metrics">
              <span id="resumePct">0%</span>
              <span id="resumeSpeed">Connecting to S3 bucket...</span>
            </div>
            <div class="p-status-log" id="resumeStatusLog">[INIT] Resolving CloudFront distribution edge...</div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    modal.classList.add("is-active");
    const bar = document.getElementById("resumeProgressBar");
    const pct = document.getElementById("resumePct");
    const speed = document.getElementById("resumeSpeed");
    const log = document.getElementById("resumeStatusLog");

    bar.style.width = "0%";
    pct.textContent = "0%";
    speed.textContent = "1.8 MB/s";
    log.innerHTML = `<span style="color:#0EA5E9;">[TLS 1.3]</span> SSL Session Established with AWS S3 Edge`;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(15 + Math.random() * 20);
      if (progress > 100) progress = 100;

      bar.style.width = `${progress}%`;
      pct.textContent = `${progress}%`;

      if (progress >= 30 && progress < 70) {
        log.innerHTML = `<span style="color:#F97316;">[STREAM]</span> Transferring encrypted payload (384 KiB / 428 KiB)...`;
        speed.textContent = "2.4 MB/s";
      } else if (progress >= 70 && progress < 100) {
        log.innerHTML = `<span style="color:#8B5CF6;">[VERIFY]</span> SHA-256 Checksum validation in progress...`;
        speed.textContent = "2.1 MB/s";
      } else if (progress >= 100) {
        clearInterval(interval);
        log.innerHTML = `<span style="color:#10B981;">[200 OK]</span> Download Verified. Opening official PDF...`;
        speed.textContent = "Complete";

        setTimeout(() => {
          modal.classList.remove("is-active");
          // Direct fallback to resume / LinkedIn profile or PDF link
          window.open("https://github.com/Uzair0123/portfolio/raw/main/docs/LINKEDIN_PROFILE.md", "_blank");
        }, 900);
      }
    }, 120);
  }
  window.triggerResumeModal = triggerResumeModal;

  // ═══════════════════════════════════════════════════════════════
  // 5. COPY HELPER WITH VISUAL TOAST
  // ═══════════════════════════════════════════════════════════════
  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || "Copied to clipboard!");
      });
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast(successMsg || "Copied to clipboard!");
    }
  }

  function showToast(msg) {
    let toast = document.getElementById("telemetryToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "telemetryToast";
      toast.className = "telemetry-toast";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="toast-dot"></span> ${msg}`;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  // ═══════════════════════════════════════════════════════════════
  // 6. ARCHITECTURE TOPOLOGY FLIP TOGGLE (PROJECT CARDS)
  // ═══════════════════════════════════════════════════════════════
  function initProjectTopologyToggles() {
    document.querySelectorAll(".btn-toggle-topology").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const card = e.currentTarget.closest(".docker-container-card");
        if (card) {
          card.classList.toggle("show-topology");
          const isFlipped = card.classList.contains("show-topology");
          e.currentTarget.innerHTML = isFlipped
            ? `<i class="fa-solid fa-code"></i> Hide Topology`
            : `<i class="fa-solid fa-diagram-project"></i> View Topology`;
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 7. BASH & PYTHON SPLIT CODE TABS
  // ═══════════════════════════════════════════════════════════════
  function initCodeTabSwitchers() {
    document.querySelectorAll(".code-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const targetTab = e.currentTarget.dataset.tab;
        const container = e.currentTarget.closest(".code-split-card");
        if (!container) return;

        container.querySelectorAll(".code-tab-btn").forEach(b => b.classList.remove("active"));
        container.querySelectorAll(".code-snippet-panel").forEach(p => p.classList.remove("active"));

        e.currentTarget.classList.add("active");
        const activePanel = container.querySelector(`.code-snippet-panel[data-panel="${targetTab}"]`);
        if (activePanel) activePanel.classList.add("active");
      });
    });

    // Copy code snippet buttons
    document.querySelectorAll(".btn-copy-snippet").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const snippetBlock = e.currentTarget.closest(".code-card-wrap").querySelector("code");
        if (snippetBlock) {
          copyTextToClipboard(snippetBlock.innerText, "Snippet copied to clipboard!");
          e.currentTarget.innerHTML = `<i class="fa-solid fa-check"></i> Copied`;
          setTimeout(() => {
            e.currentTarget.innerHTML = `<i class="fa-regular fa-copy"></i> Copy`;
          }, 2000);
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 8. SSH HANDSHAKE & WEBHOOK DISPATCH FORM
  // ═══════════════════════════════════════════════════════════════
  function initContactForm() {
    const form = document.getElementById("sshContactForm");
    const terminalOutput = document.getElementById("contactTerminalFeedback");
    if (!form || !terminalOutput) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("senderName").value.trim();
      const email = document.getElementById("senderEmail").value.trim();
      const message = document.getElementById("senderMessage").value.trim();

      if (!name || !email || !message) {
        terminalOutput.innerHTML = `<span style="color:#EF4444;">[400 BAD REQUEST] Error: All environment parameters ($SENDER_NAME, $RETURN_EMAIL, $PAYLOAD_MESSAGE) are required.</span>`;
        return;
      }

      terminalOutput.innerHTML = `
        <div style="color:#0EA5E9;">[CONNECT] Initializing SSH handshake with connect@uzair.cloud on port 22...</div>
        <div style="color:#8B5CF6;">[TLS 1.3] Exchanging Diffie-Hellman ephemeral keys... Verified.</div>
        <div style="color:#F97316;">[PACKET] Dispatching JSON payload via secure webhook...</div>
      `;

      setTimeout(() => {
        terminalOutput.innerHTML += `
          <div style="color:#10B981; font-weight:700;">[200 OK] Handshake Complete! Packet successfully routed to Uzair's terminal inbox.</div>
          <div style="color:#CBD5E1; margin-top:0.3rem;">Forwarding to direct priority channel...</div>
        `;

        const mailtoUrl = `mailto:uzairteeli123456789@gmail.com?subject=DevOps%20Collaboration%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(name)}%20(${encodeURIComponent(email)})`;
        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 1200);
      }, 1000);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 9. 3D AVATAR HEAD TRACKING & PARALLAX
  // ═══════════════════════════════════════════════════════════════
  function initHeroAvatar3D() {
    const hero = document.querySelector(".hero-control-plane");
    const avatarCard = document.querySelector(".hero-avatar-card");
    if (!hero || !avatarCard) return;

    let targetRotX = 0, targetRotY = 0;
    let curRotX = 0, curRotY = 0;

    window.addEventListener("pointermove", (e) => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const normX = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));

      targetRotY = normX * 8;
      targetRotX = -normY * 8;
    }, { passive: true });

    function animateAvatar() {
      curRotX += (targetRotX - curRotX) * 0.08;
      curRotY += (targetRotY - curRotY) * 0.08;
      avatarCard.style.transform = `perspective(1000px) rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg)`;
      requestAnimationFrame(animateAvatar);
    }
    animateAvatar();

    avatarCard.addEventListener("click", () => {
      avatarCard.classList.remove("avatar-shock-active");
      void avatarCard.offsetWidth;
      avatarCard.classList.add("avatar-shock-active");
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 10. MOBILE MENU DRAWER & NAVIGATION
  // ═══════════════════════════════════════════════════════════════
  function initMobileMenu() {
    const toggle = document.getElementById("mobileMenuBtn");
    const drawer = document.getElementById("mobileNavDrawer");
    const closeBtn = document.getElementById("mobileDrawerClose");
    if (!toggle || !drawer) return;

    toggle.addEventListener("click", () => drawer.classList.add("open"));
    if (closeBtn) closeBtn.addEventListener("click", () => drawer.classList.remove("open"));

    drawer.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", () => drawer.classList.remove("open"));
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 11. SMOOTH SCROLL FOR HUD LINKS & KUBECTL CTA
  // ═══════════════════════════════════════════════════════════════
  function initSmoothNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    const ctaKubectl = document.getElementById("ctaKubectlProjects");
    if (ctaKubectl) {
      ctaKubectl.addEventListener("click", () => {
        const projectsSec = document.getElementById("containers") || document.getElementById("projects");
        if (projectsSec) {
          projectsSec.scrollIntoView({ behavior: "smooth" });
          showToast("Scrolled to Active Docker Containers Registry");
        }
      });
    }

    const ctaCurlResume = document.getElementById("ctaCurlResume");
    if (ctaCurlResume) {
      ctaCurlResume.addEventListener("click", triggerResumeModal);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION ON DOM READY
  // ═══════════════════════════════════════════════════════════════
  document.addEventListener("DOMContentLoaded", () => {
    initTelemetryClock();
    initSpotlightGlow();
    initCommandPalette();
    initProjectTopologyToggles();
    initCodeTabSwitchers();
    initContactForm();
    initHeroAvatar3D();
    initMobileMenu();
    initSmoothNavigation();
  });
})();
