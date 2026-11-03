/**
 * OLED Cyber-Cinema Interactive Terminal & Auto-Typing Engine
 * -------------------------------------------------------------
 * Linux / ZSH / TMUX / HTOP emulator with 1-click pill typewriter
 * auto-exec, tab switching, and rich ANSI infrastructure telemetry.
 */

const TerminalModule = {
  activeTab: 'zsh',
  history: [],
  historyIndex: -1,
  isTypingAuto: false,

  commands: {
    help: `Available Learning Lab & Linux Diagnostic Commands:
  • <span style="color:#A855F7;">whoami</span>          - Candidate identity & educational standing
  • <span style="color:#00F5A0;">sys-inspect</span>     - Run local Linux kernel /proc telemetry scan
  • <span style="color:#00F5A0;">docker ps</span>       - Active containerized services in local Docker lab
  • <span style="color:#38BDF8;">k8s lab</span>         - Kubernetes learning lab & pod topology model
  • <span style="color:#FF8A00;">skills</span>          - Transparent three-level skills matrix
  • <span style="color:#00F5A0;">certs</span>           - Verified academic degrees & course certificates
  • <span style="color:#38BDF8;">ping uzair</span>       - Dispatch reachability check to contact gateway
  • <span style="color:#64748B;">clear</span>            - Flush the active terminal console buffer`,

    whoami: `<strong style="color:#F8FAFC;">Uzair Sultan</strong> — <span style="color:#00F5A0; font-weight:700;">MCA Student | Linux &amp; IT Infrastructure | DevOps Fundamentals</span>
<span style="color:#94A3B8;">Education:</span> Master of Computer Applications (MCA, IGNOU) • BCA (University of Kashmir, 1st Class Distinction)
<span style="color:#94A3B8;">Certifications:</span> Docker Essentials (IBM Cognitive Class) • DevOps &amp; CI/CD Automation (Mltio University)
<span style="color:#94A3B8;">Host Workstation:</span> Arch Linux x86_64 • <span style="color:#38BDF8;">Kernel:</span> 6.8+ • <span style="color:#00F5A0;">Container Engine:</span> Docker Engine &amp; Compose

<span style="color:#CBD5E1;">Systems builder focused on Linux administration, /proc kernel metrics, networking fundamentals (TCP/IP, sockets), Docker containerization, and defensive Bash automation. Seeking IT Infrastructure, Linux SysAdmin, and DevOps Internships.</span>`,

    "sys-inspect": `<strong style="color:#00F5A0;">=== LINUX SYSTEM &amp; NETWORK HEALTH INSPECTOR (sys-inspect) ===</strong>
<span style="color:#F8FAFC;">[CPU &amp; Memory Health]</span>
Load Average (1m, 5m, 15m) : 0.24, 0.18, 0.14
Memory Utilization         : <span style="color:#00F5A0;">[OK] 32.4%</span> (Parsed directly from /proc/meminfo)

<span style="color:#F8FAFC;">[Storage &amp; Inode Health (Root /)]</span>
Disk Block Usage           : <span style="color:#00F5A0;">[OK] 42%</span> (/dev/nvme0n1p2)
Inode Usage                : <span style="color:#00F5A0;">[OK] 18%</span> (Root filesystem healthy)

<span style="color:#F8FAFC;">[Network &amp; Connectivity]</span>
Listening Sockets (TCP/UDP): 8 ports open (ss -tuln audit)
DNS Resolution Check       : <span style="color:#00F5A0;">[OK] (google.com resolved via getent hosts)</span>

<span style="color:#F8FAFC;">[Process Health &amp; Zombie Detection]</span>
Zombie Processes Detected  : <span style="color:#00F5A0;">[OK] 0</span> (ps -eo stat scan clean)`,

    certs: `<strong style="color:#F8FAFC;">Verified Academic &amp; Course Credentials:</strong>
  • <span style="color:#00F5A0; font-weight:700;">Bachelor of Computer Applications (BCA)</span>
    Institution: <span style="color:#F8FAFC;">University of Kashmir</span> • 2021 — 2024
    Honors: <span style="color:#00F5A0;">First Class Distinction</span> • Focus: Operating Systems, Relational DBs, Computer Networks.

  • <span style="color:#38BDF8; font-weight:700;">Docker Essentials: A Developer Introduction</span>
    Issuer: <span style="color:#F8FAFC;">Cognitive Class (IBM Developer Skills Network)</span> • Issued: <span style="color:#00F5A0;">Oct 2026</span>
    Credential ID: <span style="color:#A855F7;">963031e61d0745338ded287cf0331aff</span>
    Focus: Docker container execution, image layers, and microservices containerization.

  • <span style="color:#A855F7; font-weight:700;">DevOps &amp; CI/CD Automation</span>
    Issuer: <span style="color:#F8FAFC;">Mltio University</span> • Issued: <span style="color:#00F5A0;">Oct 2026</span>
    Credential ID: <span style="color:#A855F7;">MU-ACAD-2026-EZYAPPYZ</span>
    Focus: Automated GitHub Actions pipelines, security gates, and continuous delivery.`,

    certifications: `<strong style="color:#F8FAFC;">Verified Academic &amp; Course Credentials:</strong>
  • <span style="color:#00F5A0; font-weight:700;">Bachelor of Computer Applications (BCA)</span>
    Institution: <span style="color:#F8FAFC;">University of Kashmir</span> • 2021 — 2024
    Honors: <span style="color:#00F5A0;">First Class Distinction</span> • Focus: Operating Systems, Relational DBs, Computer Networks.

  • <span style="color:#38BDF8; font-weight:700;">Docker Essentials: A Developer Introduction</span>
    Issuer: <span style="color:#F8FAFC;">Cognitive Class (IBM Developer Skills Network)</span> • Issued: <span style="color:#00F5A0;">Oct 2026</span>
    Credential ID: <span style="color:#A855F7;">963031e61d0745338ded287cf0331aff</span>
    Focus: Docker container execution, image layers, and microservices containerization.

  • <span style="color:#A855F7; font-weight:700;">DevOps &amp; CI/CD Automation</span>
    Issuer: <span style="color:#F8FAFC;">Mltio University</span> • Issued: <span style="color:#00F5A0;">Oct 2026</span>
    Credential ID: <span style="color:#A855F7;">MU-ACAD-2026-EZYAPPYZ</span>
    Focus: Automated GitHub Actions pipelines, security gates, and continuous delivery.`,

    "docker ps": `<span style="color:#94A3B8;">CONTAINER ID   IMAGE                          COMMAND               STATUS                    PORTS                    NAMES</span>
<span style="color:#38BDF8;">c3392b1a8d05</span>   craver-restaurant:latest       "nginx -g 'daemon'"   <span style="color:#00F5A0;">Up 4 hours (healthy)</span>      0.0.0.0:8085->80/tcp     craver-web
<span style="color:#38BDF8;">a8f4c2190e31</span>   craver-api:latest              "python app.py"       <span style="color:#00F5A0;">Up 4 hours (healthy)</span>      0.0.0.0:5000->5000/tcp   craver-api
<span style="color:#38BDF8;">b7190d4e5f22</span>   redis:alpine                   "redis-server"        <span style="color:#00F5A0;">Up 4 hours</span>                6379/tcp (internal net)  craver-db
<span style="color:#38BDF8;">d9910f8a3c44</span>   ollama/ollama:latest           "ollama serve"        <span style="color:#00F5A0;">Up 4 hours (healthy)</span>      11434/tcp                craver-ai

<span style="color:#38BDF8;">NETWORK BRIDGE:</span> restaurant-net (isolated backend, internal service discovery active)`,

    "k8s lab": `<strong style="color:#38BDF8;">[KUBERNETES CONCEPTUAL LEARNING LAB]</strong>
<span style="color:#94A3B8;">Type:</span> Architectural Simulation &amp; Learning Topology (Minikube / K3s lab model)
<span style="color:#94A3B8;">Topology:</span> 1 Control-Plane Node • 2 Worker Nodes (Simulated Multi-Zone Lab)
<span style="color:#94A3B8;">Study Primitives:</span>
  • Pod replica pools &amp; Horizontal Pod Autoscaler (HPA) policies
  • Ingress-NGINX routing &amp; NodePort/ClusterIP service abstractions
  • Chaos Monkey resilience simulations (node evictions &amp; pod self-healing)
<span style="color:#00F5A0;">Status: Ready for interactive experimentation in ~/labs.</span>`,

    "k8s cluster": `<strong style="color:#38BDF8;">[KUBERNETES CONCEPTUAL LEARNING LAB]</strong>
<span style="color:#94A3B8;">Type:</span> Architectural Simulation &amp; Learning Topology (Minikube / K3s lab model)
<span style="color:#94A3B8;">Topology:</span> 1 Control-Plane Node • 2 Worker Nodes (Simulated Multi-Zone Lab)
<span style="color:#94A3B8;">Study Primitives:</span>
  • Pod replica pools &amp; Horizontal Pod Autoscaler (HPA) policies
  • Ingress-NGINX routing &amp; NodePort/ClusterIP service abstractions
  • Chaos Monkey resilience simulations (node evictions &amp; pod self-healing)
<span style="color:#00F5A0;">Status: Ready for interactive experimentation in ~/labs.</span>`,

    "kubectl get nodes": `<strong style="color:#38BDF8;">[KUBERNETES CONCEPTUAL LEARNING LAB]</strong>
<span style="color:#94A3B8;">NAME                                         STATUS   ROLES           VERSION</span>
<span style="color:#00F5A0;">k8s-lab-control-plane</span>                        Ready    control-plane   v1.30.2 (Minikube/K3s)
<span style="color:#00F5A0;">k8s-lab-worker-01</span>                            Ready    worker          v1.30.2 (AMD Ryzen)
<span style="color:#00F5A0;">k8s-lab-worker-02</span>                            Ready    worker          v1.30.2 (AMD Ryzen)

<span style="color:#38BDF8;">LAB TOPOLOGY:</span> 3/3 Nodes Ready • Educational model for studying Pod scheduling &amp; HPA.`,

    "aws stack": `<span style="color:#FF8A00;">AWS ARCHITECTURE STUDY ROADMAP</span>
├── <span style="color:#38BDF8;">VPC Fundamentals:</span> CIDR blocks (10.0.0.0/16), Public/Private subnets, IGW &amp; NAT Gateways
├── <span style="color:#00F5A0;">Compute &amp; Security:</span> EC2 instance lifecycles, Security Groups, IAM least-privilege roles
├── <span style="color:#A855F7;">Storage &amp; Delivery:</span> S3 bucket policies, versioning, and CloudFront CDN integration
└── <span style="color:#00F5A0;">Status:</span> Active theoretical &amp; lab study in MCA cloud computing curriculum.`,

    "ping uzair": `<span style="color:#38BDF8;">PING uzair.gateway: 56 data bytes</span>
64 bytes from uzair.gateway: icmp_seq=0 ttl=64 time=0.042 ms
64 bytes from uzair.gateway: icmp_seq=1 ttl=64 time=0.038 ms
<span style="color:#00F5A0;">--- 0% packet loss, verified reachability. Routing to Contact Gateway...</span>`,

    resume: `<span style="color:#38BDF8;">Opening official curriculum vitae dossier...</span>
<span style="color:#00F5A0;">[200 OK]</span> Verified. Navigating to credentials dossier.`,

    skills: `<strong style="color:#00F5A0;">[LEVEL 1: PRACTISED &amp; BUILT]</strong>
Linux Systems (/proc, systemd, storage, permissions) • Defensive Bash (set -euo pipefail) • Networking (TCP/IP, DNS, ss) • Docker &amp; Compose • Git &amp; GitHub Actions CI/CD • NGINX • Python basics.

<strong style="color:#38BDF8;">[LEVEL 2: CURRENTLY LEARNING]</strong>
AWS Core Infrastructure (VPC, Subnets, EC2, S3, IAM) • Kubernetes Architecture (Control plane, Pods, Deployments, Services, HPA) • Terraform IaC (HCL syntax, state).

<strong style="color:#A855F7;">[LEVEL 3: EXPLORING NEXT]</strong>
Production Container Orchestration • Ansible Configuration Management • Prometheus &amp; Grafana Observability • Zero-Trust Cloud Security.`
  },

  init: function() {
    this.container = document.getElementById("heroTerminal");
    this.body = document.getElementById("termBody");
    this.input = document.getElementById("terminal-input") || document.getElementById("termInput");
    this.output = document.getElementById("terminal-output");
    this.tabZsh = document.getElementById("tabZsh");
    this.tabHtop = document.getElementById("tabHtop");
    this.tabLogs = document.getElementById("tabLogs");
    this.zshView = document.getElementById("termZshView");
    this.htopView = document.getElementById("termHtopView");
    this.logsView = document.getElementById("termLogsView");

    if (!this.body || !this.input) return;

    this.bindEvents();
    this.initialBootGreeting();
  },

  initialBootGreeting: function() {
    this.body.innerHTML = `
      <div style="color:#38BDF8; margin-bottom:0.4rem;">[BOOT] Initializing Linux Learning Lab environment...</div>
      <div style="color:#00F5A0; margin-bottom:0.6rem;">⚡ <strong style="color:#FFF;">Uzair Sultan Systems Console Online.</strong> Type '<span style="color:#38BDF8;">help</span>' or tap 1-click pills below.</div>
    `;
  },

  bindEvents: function() {
    // Tab switching
    if (this.tabZsh) this.tabZsh.addEventListener("click", () => this.switchTab('zsh'));
    if (this.tabHtop) this.tabHtop.addEventListener("click", () => this.switchTab('htop'));
    if (this.tabLogs) this.tabLogs.addEventListener("click", () => this.switchTab('logs'));

    // Input Execution
    this.input.addEventListener("keydown", (e) => {
      if (this.isTypingAuto) return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this.history.length && this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        } else if (this.historyIndex === 0) {
          this.historyIndex = -1;
          this.input.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        const current = this.input.value.trim().toLowerCase();
        if (current) {
          const matches = Object.keys(this.commands).filter(c => c.startsWith(current));
          if (matches.length === 1) {
            this.input.value = matches[0];
          }
        }
      } else if (e.key === "Enter") {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = -1;
        }
        this.executeCommand(cmd.toLowerCase());
        this.input.value = "";
      }
    });

    // 1-Click Interactive Command Pills (Typewriter Animation)
    document.querySelectorAll(".pill-cmd-btn[data-cmd]").forEach(pill => {
      pill.addEventListener("click", (e) => {
        const cmd = e.currentTarget.dataset.cmd;
        if (cmd) {
          this.switchTab('zsh');
          this.typeAndExecute(cmd.toLowerCase());
        }
      });
    });

    // Terminal window focus
    const termCard = document.querySelector(".hero-glass-terminal");
    if (termCard) {
      termCard.addEventListener("click", () => {
        if (this.activeTab === 'zsh' && this.input && !this.isTypingAuto) {
          this.input.focus({ preventScroll: true });
        }
      });
    }
  },

  typeAndExecute: function(cmd) {
    if (this.isTypingAuto) return;
    this.isTypingAuto = true;
    this.input.value = "";
    let i = 0;

    const interval = setInterval(() => {
      if (i < cmd.length) {
        this.input.value += cmd.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.history.push(cmd);
          this.historyIndex = -1;
          this.executeCommand(cmd);
          this.input.value = "";
          this.isTypingAuto = false;
        }, 150);
      }
    }, 28);
  },

  switchTab: function(tabName) {
    this.activeTab = tabName;
    [this.tabZsh, this.tabHtop, this.tabLogs].forEach(tab => {
      if (tab) tab.classList.remove("active");
    });
    [this.zshView, this.htopView, this.logsView].forEach(view => {
      if (view) view.style.display = "none";
    });

    if (tabName === 'zsh') {
      if (this.tabZsh) this.tabZsh.classList.add("active");
      if (this.zshView) this.zshView.style.display = "flex";
      this.stopHtop();
      this.stopNetworkLogs();
      if (this.input) this.input.focus({ preventScroll: true });
    } else if (tabName === 'htop') {
      if (this.tabHtop) this.tabHtop.classList.add("active");
      if (this.htopView) this.htopView.style.display = "block";
      this.stopNetworkLogs();
      this.startHtop();
    } else if (tabName === 'logs') {
      if (this.tabLogs) this.tabLogs.classList.add("active");
      if (this.logsView) this.logsView.style.display = "block";
      this.stopHtop();
      this.startNetworkLogs();
    }
  },

  startHtop: function() {
    if (this.htopTimer) return;
    this.renderHtop();
    this.htopTimer = setInterval(() => this.renderHtop(), 1200);
  },

  stopHtop: function() {
    if (this.htopTimer) {
      clearInterval(this.htopTimer);
      this.htopTimer = null;
    }
  },

  renderHtop: function() {
    if (!this.htopView) return;
    const cpu1 = Math.floor(12 + Math.random() * 25);
    const cpu2 = Math.floor(18 + Math.random() * 32);
    const cpu3 = Math.floor(8 + Math.random() * 20);
    const cpu4 = Math.floor(20 + Math.random() * 35);
    const memMb = Math.floor(3420 + Math.random() * 350);

    const bar = (pct, color) => {
      const count = Math.floor(pct / 6);
      return `[<span style="color:${color};">${"|".repeat(count)}</span>${" ".repeat(16 - count)} ${pct}%]`;
    };

    this.htopView.innerHTML = `
<div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem; padding-bottom:0.75rem; border-bottom:1px dashed rgba(255,255,255,0.15); margin-bottom:0.75rem; font-size:0.74rem;">
  <div>0 ${bar(cpu1, '#00F5A0')} Tasks: 48, 1 running</div>
  <div>1 ${bar(cpu2, '#38BDF8')} Load: 0.24 0.18 0.14</div>
  <div>2 ${bar(cpu3, '#A855F7')} Host: Arch Linux x86_64</div>
  <div>3 ${bar(cpu4, '#FF8A00')} Mode: Systems Learning Lab</div>
  <div style="grid-column: 1 / -1; margin-top:0.3rem;">
    Mem [${bar(Math.floor((memMb / 16000) * 100), '#00F5A0')} ${memMb}M/15.8G]  Swp [ 0K/8.00G]
  </div>
</div>
<div style="display:grid; grid-template-columns:50px 60px 40px 60px 60px 50px 1fr; gap:0.4rem; background:#0284C7; color:#000; font-weight:700; padding:0.2rem 0.4rem; font-size:0.7rem;">
  <span>PID</span><span>USER</span><span>PRI</span><span>VIRT</span><span>RES</span><span>CPU%</span><span>COMMAND</span>
</div>
<div style="font-size:0.7rem; line-height:1.5; margin-top:0.3rem;">
  <div style="display:grid; grid-template-columns:50px 60px 40px 60px 60px 50px 1fr; gap:0.4rem; padding:0.15rem 0.4rem;">
    <span>1402</span><span>root</span><span>20</span><span>1.4G</span><span>248M</span><span style="color:#00F5A0;">4.2</span><span>dockerd -H fd://</span>
  </div>
  <div style="display:grid; grid-template-columns:50px 60px 40px 60px 60px 50px 1fr; gap:0.4rem; padding:0.15rem 0.4rem;">
    <span>2189</span><span>uzair</span><span>20</span><span>320M</span><span>94M</span><span style="color:#00F5A0;">2.1</span><span>python3 backend/app.py</span>
  </div>
  <div style="display:grid; grid-template-columns:50px 60px 40px 60px 60px 50px 1fr; gap:0.4rem; padding:0.15rem 0.4rem;">
    <span>3894</span><span>uzair</span><span>20</span><span>48M</span><span>16M</span><span style="color:#00F5A0;">1.5</span><span>bash sys-inspect.sh</span>
  </div>
  <div style="display:grid; grid-template-columns:50px 60px 40px 60px 60px 50px 1fr; gap:0.4rem; padding:0.15rem 0.4rem;">
    <span>4102</span><span>nginx</span><span>20</span><span>145M</span><span>38M</span><span style="color:#00F5A0;">1.2</span><span>nginx: worker process</span>
  </div>
</div>
`;
  },

  startNetworkLogs: function() {
    if (this.logsTimer) return;
    this.logBuffer = [
      `[SYS-INSPECT] /proc/loadavg read: 0.24, 0.18, 0.14 (1m, 5m, 15m)`,
      `[DOCKER] Container 'craver-web' healthy (port 8085->80)`,
      `[NETWORK] Sockets audit: 8 listening TCP/UDP ports detected via ss`,
      `[SECURITY] UFW state: Active • Default incoming deny policy in place`,
      `[DNS] getent hosts google.com: resolved successfully`
    ];
    this.renderLogs();

    this.logsTimer = setInterval(() => {
      const now = new Date().toISOString().substring(11, 19);
      const events = [
        `[${now}] [SYS-INSPECT] Memory usage: 32.4% computed from /proc/meminfo`,
        `[${now}] [DOCKER] Container 'craver-api' health check HTTP 200 OK`,
        `[${now}] [NGINX] Reverse proxy upstream health check passed`,
        `[${now}] [ACTIONS] GitHub Actions CI runner: Trivy scan passed (0 CVEs)`,
        `[${now}] [STORAGE] Root filesystem / block usage: 42% (healthy)`
      ];
      this.logBuffer.push(events[Math.floor(Math.random() * events.length)]);
      if (this.logBuffer.length > 20) this.logBuffer.shift();
      this.renderLogs();
    }, 1800);
  },

  stopNetworkLogs: function() {
    if (this.logsTimer) {
      clearInterval(this.logsTimer);
      this.logsTimer = null;
    }
  },

  renderLogs: function() {
    if (!this.logsView) return;
    this.logsView.innerHTML = `
      <div style="color:#00F5A0; font-weight:700; margin-bottom:0.5rem; font-size:0.75rem;">● LIVE INGRESS & ROUTING LOGS:</div>
      ${this.logBuffer.map(l => `<div style="color:#94A3B8; font-size:0.75rem; margin-bottom:0.35rem; border-left:2px solid #38BDF8; padding-left:0.5rem;">${l}</div>`).join('')}
    `;
    this.logsView.scrollTop = this.logsView.scrollHeight;
  },

  executeCommand: function(cmd) {
    if (!cmd) return;

    this.appendOutput(`<div class="term-echo-line"><span class="term-prompt">uzair@cloud-node-01:~$</span> <span class="term-cmd-text">${cmd}</span></div>`);

    if (cmd === "clear") {
      this.body.innerHTML = "";
      return;
    }

    if (cmd === "ping uzair") {
      this.appendOutput(`<div class="term-output">${this.commands["ping uzair"]}</div>`);
      setTimeout(() => {
        const contactSec = document.getElementById("contact");
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: "smooth" });
          const nameInput = document.getElementById("senderName");
          if (nameInput) nameInput.focus();
        }
      }, 700);
      return;
    }

    if (cmd === "resume" || cmd === "curl -o resume.pdf") {
      this.appendOutput(`<div class="term-output">${this.commands["resume"]}</div>`);
      if (window.triggerResumeModal) window.triggerResumeModal();
      return;
    }

    const output = this.commands[cmd];
    if (output) {
      this.appendOutput(`<div class="term-output">${output}</div>`);
    } else {
      this.appendOutput(`<div class="term-output" style="color:#EF4444;">zsh: command not found: ${cmd}. Type '<span style="color:#00F5A0;">help</span>' or tap quick-pills.</div>`);
    }

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
