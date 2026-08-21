/**
 * Interactive Cyber Terminal Simulator
 * -------------------------------------------------------------
 * Embedded Linux Bash Shell simulator for developer portfolio.
 */
const TerminalModule = {
  commands: {
    help: `Available Commands:
  • <span style="color:#10B981;">whoami</span>      - Overview of Uzair Sultan & technical background
  • <span style="color:#10B981;">skills</span>      - Breakdown of Linux, Networking, Web & Python competencies
  • <span style="color:#10B981;">projects</span>    - Featured production builds & GitHub repositories
  • <span style="color:#10B981;">neofetch</span>    - System architecture & environment metrics
  • <span style="color:#10B981;">contact</span>     - Direct communication channels & social links
  • <span style="color:#10B981;">sudo hire</span>   - Initiate employment / contract inquiry
  • <span style="color:#10B981;">clear</span>       - Clear the terminal console buffer`,

    whoami: `<strong style="color:#F8FAFC;">Uzair Sultan</strong>
<span style="color:#94A3B8;">Linux Administrator • DevOps Engineer • Modern Web Developer</span>
Passionate systems builder specializing in Linux internals, network protocols, modular vanilla web development, and algorithmic problem solving with Python. Focused on high-performance, fault-tolerant infrastructure and commercial web delivery.`,

    skills: `<span style="color:#10B981; font-weight:700;">[LINUX & SYSTEMS]</span>   Ubuntu, Bash Scripting, Systemd, Process Management, User Permissions, CLI
<span style="color:#06B6D4; font-weight:700;">[NETWORKING]</span>        TCP/IP, OSI 7-Layer, Subnetting, DNS, Firewalls, Port Analysis, Wireshark
<span style="color:#F59E0B; font-weight:700;">[WEB DEV]</span>           Semantic HTML5, Responsive CSS3, Modular ES6+ JS, PWA, 95% Bandwidth Opt
<span style="color:#8B5CF6; font-weight:700;">[PYTHON & DSA]</span>      Python 3, Data Structures & Algorithms, Automation, Scripting
<span style="color:#EF4444; font-weight:700;">[DEVOPS & CI/CD]</span>    Git, GitHub, GitHub Actions CI/CD Workflows, GitHub Pages Cloud`,

    projects: `<strong style="color:#F8FAFC;">1. Kashmir Kesar Kingdom Pvt. Ltd. (Flagship B2B/B2C Web Platform)</strong>
   • Commercial export web platform with multi-currency engine & B2B RFQ estimator
   • 95% bandwidth payload optimization (48MB down to 2.4MB)
   • Live: <a href="https://uzair0123.github.io/kashmir-kesar-kingdom/" target="_blank" style="color:#06B6D4;">uzair0123.github.io/kashmir-kesar-kingdom/</a>
   • GitHub: <a href="https://github.com/Uzair0123/kashmir-kesar-kingdom" target="_blank" style="color:#10B981;">github.com/Uzair0123/kashmir-kesar-kingdom</a>

<strong style="color:#F8FAFC;">2. Linux System Administration & Bash Automation Toolkit</strong>
   • Shell automation scripts for user auditing, log rotation & backup routines

<strong style="color:#F8FAFC;">3. Networking Protocol Labs & Analysis Suite</strong>
   • Hands-on packet capture analysis & subnetting infrastructure configurations`,

    neofetch: `<span style="color:#10B981;">        .---.        </span> <span style="color:#10B981; font-weight:700;">uzair@linux-workstation</span>
<span style="color:#10B981;">       /     \\       </span> -----------------------
<span style="color:#10B981;">      | () () |      </span> <strong style="color:#F8FAFC;">OS:</strong> Ubuntu 24.04 LTS (x86_64)
<span style="color:#10B981;">       \\  _  /       </span> <strong style="color:#F8FAFC;">Kernel:</strong> Linux 6.8.0-generic
<span style="color:#10B981;">        /   \\        </span> <strong style="color:#F8FAFC;">Shell:</strong> GNU bash 5.2.21
<span style="color:#10B981;">       /|   |\\       </span> <strong style="color:#F8FAFC;">Editor:</strong> Antigravity / Neovim / VS Code
<span style="color:#10B981;">      (_|   |_)      </span> <strong style="color:#F8FAFC;">Uptime:</strong> 99.99%
<span style="color:#10B981;">        '---'        </span> <strong style="color:#F8FAFC;">Status:</strong> Ready for Hire / Collaboration`,

    contact: `<strong style="color:#F8FAFC;">Direct Contact Channels:</strong>
  • <span style="color:#10B981;">Email:</span>     <a href="mailto:uzairteeli123456789@gmail.com" style="color:#06B6D4;">uzairteeli123456789@gmail.com</a>
  • <span style="color:#10B981;">WhatsApp:</span>  <a href="https://wa.me/919149543089" target="_blank" style="color:#06B6D4;">+91 91495 43089</a>
  • <span style="color:#10B981;">GitHub:</span>    <a href="https://github.com/Uzair0123" target="_blank" style="color:#06B6D4;">github.com/Uzair0123</a>
  • <span style="color:#10B981;">Location:</span>  Jammu & Kashmir, India`,

    "sudo hire": `<span style="color:#10B981; font-weight:700;">[AUTHENTICATION SUCCESSFUL]</span>
Access Granted: Initializing contact channel...
Redirecting to direct WhatsApp / Email channel to discuss your opportunity!`
  },

  init: function() {
    this.body = document.getElementById("terminalBody");
    this.input = document.getElementById("terminalInput");
    if (!this.body || !this.input) return;

    this.bindEvents();
    this.printInitialGreeting();
  },

  printInitialGreeting: function() {
    this.appendOutput(`<span style="color:#94A3B8;">Welcome to Uzair Sultan's Interactive Terminal v2.4 (Ubuntu x86_64)
Type '<span style="color:#10B981; font-weight:700;">help</span>' or click quick pills below to explore.</span>`);
  },

  bindEvents: function() {
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = this.input.value.trim().toLowerCase();
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
        window.open("mailto:uzairteeli123456789@gmail.com?subject=Job%20Opportunity%20Inquiry%20from%20Portfolio", "_blank");
      }, 1000);
      return;
    }

    const output = this.commands[cmd];
    if (output) {
      this.appendOutput(`<div class="term-output">${output}</div>`);
    } else {
      this.appendOutput(`<span style="color:#EF4444;">bash: command not found: ${cmd}. Type '<span style="color:#10B981;">help</span>' for a list of valid commands.</span>`);
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
