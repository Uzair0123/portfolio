/**
 * Advanced Interactive Cyber Terminal Simulator
 * -------------------------------------------------------------
 * Embedded Linux Bash Shell simulator with history navigation,
 * autocomplete, dynamic command parsing, and system telemetry.
 */
const TerminalModule = {
  history: [],
  historyIndex: -1,

  commands: {
    help: `Available Linux & Systems Commands:
  • <span style="color:#10B981;">whoami</span>       - Developer overview & technical philosophy
  • <span style="color:#10B981;">skills</span>       - Systems, Networking, Web, Python & DevOps competencies
  • <span style="color:#10B981;">projects</span>     - Production web builds & engineering repositories
  • <span style="color:#10B981;">tree</span>         - Visual workspace directory tree hierarchy
  • <span style="color:#10B981;">neofetch</span>     - System telemetry, kernel & environment specs
  • <span style="color:#10B981;">uptime</span>       - Workstation uptime & load average metrics
  • <span style="color:#10B981;">contact</span>      - Direct phone, WhatsApp (+91-7889446114) & email
  • <span style="color:#10B981;">sudo hire</span>    - Launch priority recruitment inquiry
  • <span style="color:#10B981;">matrix</span>       - Digital rain cyber matrix simulation
  • <span style="color:#10B981;">clear</span>        - Flush the terminal console buffer`,

    whoami: `<strong style="color:#F8FAFC;">Uzair Sultan</strong>
<span style="color:#10B981; font-weight:600;">MCA (IGNOU, Currently Pursuing) • BCA (University of Kashmir)</span>
<span style="color:#94A3B8;">Linux Systems Administrator • DevOps Engineer • Modern Web Architect</span>
Passionate systems builder specializing in Linux internals, network protocol inspection, modular vanilla web development, and algorithmic problem solving with Python. Focused on high-performance, fault-tolerant infrastructure and commercial web delivery.`,

    skills: `<span style="color:#10B981; font-weight:700;">[LINUX & SYSTEMS]</span>   Ubuntu 24.04, Bash Shell, Systemd, Process Lifecycle, Permissions, Grep/Sed/Awk
<span style="color:#06B6D4; font-weight:700;">[NETWORKING]</span>        TCP/IP Suite, OSI 7-Layer, Subnetting/CIDR, DNS Resolution, Firewalls, Wireshark
<span style="color:#F59E0B; font-weight:700;">[WEB ARCHITECTURE]</span>  Semantic HTML5, Modern CSS3 Grid/Flex, Modular ES6+ JS, PWA (95% Bandwidth Opt)
<span style="color:#8B5CF6; font-weight:700;">[PYTHON & DSA]</span>      Python 3, Data Structures & Algorithms (Trees, Graphs, Sorting, Hash Maps)
<span style="color:#EF4444; font-weight:700;">[DEVOPS & CI/CD]</span>    Git, GitHub, GitHub Actions CI/CD Workflows, Cloud Pages Deployment`,

    projects: `<strong style="color:#F8FAFC;">1. Kashmir Kesar Kingdom Pvt. Ltd. (Production Commercial Web Platform)</strong>
   • Full-scale commercial export portal with multi-currency engine & B2B RFQ estimator
   • 95% asset payload compression (48.3MB down to 2.43MB) with PWA offline caching
   • Live: <a href="https://uzair0123.github.io/kashmir-kesar-kingdom/" target="_blank" style="color:#06B6D4;">https://uzair0123.github.io/kashmir-kesar-kingdom/</a>
   • GitHub: <a href="https://github.com/Uzair0123/kashmir-kesar-kingdom" target="_blank" style="color:#10B981;">https://github.com/Uzair0123/kashmir-kesar-kingdom</a>

<strong style="color:#F8FAFC;">2. Craver Fast Food Co. (Production-Grade Online Ordering Web App)</strong>
   • Modular ES6+ online ordering platform with real-time catalog search & dietary filters
   • Interactive quick-view modal, persistent LocalStorage cart with coupon engine & checkout receipts
   • Live: <a href="https://uzair0123.github.io/craver-fast-food/" target="_blank" style="color:#06B6D4;">https://uzair0123.github.io/craver-fast-food/</a>
   • GitHub: <a href="https://github.com/Uzair0123/craver-fast-food" target="_blank" style="color:#10B981;">https://github.com/Uzair0123/craver-fast-food</a>

<strong style="color:#F8FAFC;">3. Linux System Administration & Bash Automation Toolkit</strong>
   • Automated scripts for server log rotation, user auditing & automated backup routines

<strong style="color:#F8FAFC;">4. Network Protocol Labs & Wireshark Packet Inspection</strong>
   • Hands-on packet flow analysis & CIDR subnet allocation schemes`,

    tree: `<span style="color:#10B981; font-weight:700;">uzair-sultan/workspace</span>
├── <span style="color:#06B6D4;">Linux_Administration/</span>
│   ├── bash_automation.sh
│   ├── system_audit.sh
│   └── log_rotator.sh
├── <span style="color:#06B6D4;">Computer_Networking/</span>
│   ├── tcp_handshake_analysis.pcapng
│   └── subnet_calculator.py
├── <span style="color:#06B6D4;">Production_Web_Apps/</span>
│   ├── <span style="color:#F59E0B; font-weight:700;">kashmir-kesar-kingdom/</span> (Live Production)
│   │   ├── assets/ (95% Compressed Payload)
│   │   └── sw.js (Offline PWA Engine)
│   └── <span style="color:#EF4444; font-weight:700;">craver-fast-food/</span> (Live Production)
│       ├── data/products.js (Structured Catalog)
│       └── js/cart.js (LocalStorage Cart Engine)
└── <span style="color:#06B6D4;">Python_DSA/</span>
    ├── binary_search_tree.py
    └── graph_traversal.py`,

    neofetch: `<span style="color:#10B981;">        .---.        </span> <span style="color:#10B981; font-weight:700;">uzair@linux-workstation</span>
<span style="color:#10B981;">       /     \\       </span> -----------------------
<span style="color:#10B981;">      | () () |      </span> <strong style="color:#F8FAFC;">OS:</strong> Ubuntu 24.04 LTS (x86_64)
<span style="color:#10B981;">       \\  _  /       </span> <strong style="color:#F8FAFC;">Kernel:</strong> Linux 6.8.0-generic
<span style="color:#10B981;">        /   \\        </span> <strong style="color:#F8FAFC;">Shell:</strong> GNU bash 5.2.21
<span style="color:#10B981;">       /|   |\\       </span> <strong style="color:#F8FAFC;">Languages:</strong> Bash, Python 3, JavaScript (ES6+), C
<span style="color:#10B981;">      (_|   |_)      </span> <strong style="color:#F8FAFC;">Uptime:</strong> 99.99%
<span style="color:#10B981;">        '---'        </span> <strong style="color:#F8FAFC;">Status:</strong> Ready for Hire / Engineering Collaboration`,

    uptime: `<span style="color:#94A3B8;">up 42 days, 14:28, 1 user, load average: 0.08, 0.05, 0.01</span>`,

    contact: `<strong style="color:#F8FAFC;">Direct Communication Channels:</strong>
  • <span style="color:#10B981;">Phone / Call:</span>  <a href="tel:+917889446114" style="color:#06B6D4;">+91-7889446114</a>
  • <span style="color:#10B981;">WhatsApp:</span>      <a href="https://wa.me/917889446114" target="_blank" style="color:#06B6D4;">+91-7889446114</a>
  • <span style="color:#10B981;">Email:</span>         <a href="mailto:uzairteeli123456789@gmail.com" style="color:#06B6D4;">uzairteeli123456789@gmail.com</a>
  • <span style="color:#10B981;">GitHub:</span>        <a href="https://github.com/Uzair0123" target="_blank" style="color:#06B6D4;">https://github.com/Uzair0123</a>
  • <span style="color:#10B981;">Location:</span>      Jammu & Kashmir, India`,

    "sudo hire": `<span style="color:#10B981; font-weight:700;">[AUTHENTICATION SUCCESSFUL — ROOT PRIVILEGES]</span>
Access Granted: Direct channel initialized with Uzair Sultan!
Redirecting to WhatsApp (+91-7889446114) / Email...`,

    matrix: `<span style="color:#10B981;">01010101 01111010 01100001 01101001 01110010<br>
01010011 01110101 01101100 01110100 01100001 01101110<br>
Wake up, Neo... The matrix has you.<br>
Follow the white rabbit. 🐇</span>`
  },

  init: function() {
    this.body = document.getElementById("terminalBody");
    this.input = document.getElementById("terminalInput");
    if (!this.body || !this.input) return;

    this.bindEvents();
    this.printInitialGreeting();
  },

  printInitialGreeting: function() {
    this.appendOutput(`<span style="color:#94A3B8;">Welcome to Uzair Sultan's Interactive Terminal v2.6 (Ubuntu x86_64)
Type '<span style="color:#10B981; font-weight:700;">help</span>' or tap quick pills below. Press Tab for autocomplete, &uarr;/&darr; for history.</span>`);
  },

  bindEvents: function() {
    this.input.addEventListener("keydown", (e) => {
      // History Navigation: Up Arrow
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this.history.length > 0 && this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        }
      }
      // History Navigation: Down Arrow
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        } else if (this.historyIndex === 0) {
          this.historyIndex = -1;
          this.input.value = "";
        }
      }
      // Autocomplete: Tab
      else if (e.key === "Tab") {
        e.preventDefault();
        const current = this.input.value.trim().toLowerCase();
        if (current) {
          const matches = Object.keys(this.commands).filter(c => c.startsWith(current));
          if (matches.length === 1) {
            this.input.value = matches[0];
          }
        }
      }
      // Execute: Enter
      else if (e.key === "Enter") {
        const cmd = this.input.value.trim().toLowerCase();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = -1;
        }
        this.executeCommand(cmd);
        this.input.value = "";
      }
    });

    // Quick Command Pills
    document.querySelectorAll(".term-chip").forEach(chip => {
      chip.addEventListener("click", (e) => {
        const cmd = e.currentTarget.dataset.cmd;
        if (cmd) {
          this.executeCommand(cmd);
        }
      });
    });
  },

  executeCommand: function(cmd) {
    if (!cmd) return;

    // Echo command line
    this.appendOutput(`<span class="term-prompt">uzair@linux-workstation:~$</span> <span style="color:#FFF;">${cmd}</span>`);

    if (cmd === "clear") {
      this.body.innerHTML = "";
      return;
    }

    if (cmd === "sudo hire") {
      this.appendOutput(this.commands["sudo hire"]);
      setTimeout(() => {
        window.open("https://wa.me/917889446114?text=Hi%20Uzair,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20engineering%20opportunity!", "_blank");
      }, 1000);
      return;
    }

    const output = this.commands[cmd];
    if (output) {
      this.appendOutput(`<div class="term-output">${output}</div>`);
    } else {
      this.appendOutput(`<span style="color:#EF4444;">bash: command not found: ${cmd}. Type '<span style="color:#10B981;">help</span>' for available commands.</span>`);
    }

    // Auto scroll to bottom
    this.body.scrollTop = this.body.scrollHeight;
  },

  appendOutput: function(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    this.body.appendChild(div);
    this.body.scrollTop = this.body.scrollHeight;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  TerminalModule.init();
});
