/**
 * Dark Ops Cloud Control Plane & Interactive Linux CLI
 * -------------------------------------------------------------
 * Multi-tab Linux / ZSH / TMUX / HTOP / Network-Logs emulator
 * with rapid boot sequence, command parsing, and live telemetry.
 */

const TerminalModule = {
  activeTab: 'zsh',
  history: [],
  historyIndex: -1,
  bootFinished: false,
  htopInterval: null,
  networkInterval: null,

  commands: {
    help: `Available Cloud Control & Linux Commands:
  • <span class="term-accent-purple">whoami</span>          - Identity, systems background & engineering role
  • <span class="term-accent-cyan">skills --list</span>   - 11-Domain infrastructure matrix (K8s, AWS, IaC, Linux)
  • <span class="term-accent-emerald">docker ps</span>       - Active containerized production projects & ports
  • <span class="term-accent-blue">kubectl get nodes</span> - Cluster topology, certifications & competency nodes
  • <span class="term-accent-amber">ping uzair</span>       - Dispatch ICMP probe & open contact gateway
  • <span class="term-accent-orange">curl -O resume.pdf</span>- Retrieve official engineer curriculum vitae
  • <span class="term-accent-purple">neofetch</span>        - System telemetry, kernel version & workstation specs
  • <span class="term-accent-emerald">uptime</span>          - Cluster availability, load averages & worker status
  • <span class="term-accent-cyan">tree</span>            - Visual directory hierarchy of repository modules
  • <span class="term-accent-red">sudo hire</span>       - Direct recruitment handshake (WhatsApp / Email)
  • <span class="term-accent-muted">clear</span>           - Flush the active terminal console buffer`,

    whoami: `<strong style="color:#F8FAFC;">Uzair Sultan</strong> — <span class="term-accent-emerald">System Architect // DevOps & Cloud Engineer</span>
<span style="color:#94A3B8;">Education:</span> MCA (IGNOU, Currently Pursuing) • BCA (University of Kashmir, 1st Class)
<span style="color:#94A3B8;">Location:</span> ap-south-1 (Srinagar / Remote) • <span class="term-accent-cyan">Status: READY FOR PRODUCTION DEPLOYMENT</span>

<span style="color:#CBD5E1;">Systems builder specializing in Linux internals (/proc, systemd, cgroups), Kubernetes container orchestration, Infrastructure-as-Code (Terraform), Cloud Architecture (AWS), and low-level computer networking protocols (TCP/IP, BGP, CIDR). Builds resilient, self-healing platforms with zero tolerance for downtime.</span>`,

    "skills --list": `<span class="term-accent-emerald">[1. LINUX & SYSTEMS]</span>      Ubuntu 24.04 LTS, Arch Linux, Systemd, Bash Scripting, Memory/Process Lifecycle, Grep/Sed/Awk
<span class="term-accent-cyan">[2. CONTAINERS & K8S]</span>     Docker, Docker Compose, Podman, Kubernetes (EKS/K3s), Helm, Ingress-Nginx
<span class="term-accent-orange">[3. AWS & CLOUD INFRA]</span>     VPC, EC2, S3, IAM (Least-Privilege), EKS, ALB, Route 53, CloudWatch, Lambda
<span class="term-accent-purple">[4. INFRASTRUCTURE AS CODE]</span> Terraform, HashiCorp HCL, Modular AWS Blueprints, State Locking
<span class="term-accent-emerald">[5. CI/CD & GITOPS]</span>         GitHub Actions, Automated Workflows, ArgoCD GitOps, Artifact Caching
<span class="term-accent-blue">[6. NETWORKING & PROTOCOLS]</span>  TCP/IP 4-Layer, OSI 7-Layer, Subnetting/CIDR, DNS Resolution, TLS 1.3, Wireshark
<span class="term-accent-amber">[7. PYTHON & AUTOMATION]</span>    Python 3, Boto3 AWS SDK, Automated Log Audit, Algorithm Optimization
<span class="term-accent-cyan">[8. OBSERVABILITY]</span>          Prometheus Scrapes, Grafana Dashboards, Node Exporter, Log Rotation
<span class="term-accent-red">[9. SECURITY & SECRETS]</span>     Zero-Trust, SSH Key Pairs, HashiCorp Vault Secrets, UFW/iptables Rules
<span class="term-accent-purple">[10. DISTRIBUTED STORAGE]</span>    PostgreSQL 16 High-Availability Standby, Redis In-Memory Caching
<span class="term-accent-emerald">[11. MOBILE & CLIENT APP]</span>   React Native 0.81, Expo SDK 54, Modern Modular ES6+ Architecture`,

    skills: `Type '<span class="term-accent-cyan">skills --list</span>' for full 11-Domain Infrastructure Matrix tree.`,

    "docker ps": `<span style="color:#94A3B8;">CONTAINER ID   IMAGE                               COMMAND                  CREATED         STATUS                    PORTS                     NAMES</span>
<span class="term-accent-cyan">a8f4c2190e31</span>   uzair/nexora:v1.0.0-release         "expo start --tunnel"    3 weeks ago     <span class="term-accent-emerald">Up 21 days (healthy)</span>      0.0.0.0:8081->8081/tcp    nexora-app
<span class="term-accent-cyan">b7190d4e5f22</span>   uzair/kashmir-kesar-kingdom:v2.4    "nginx -g 'daemon off'"  2 months ago    <span class="term-accent-emerald">Up 60 days (healthy)</span>      0.0.0.0:443->80/tcp       kkk-export-web
<span class="term-accent-cyan">c3392b1a8d05</span>   uzair/craver-fastfood:v1.4.2        "node server.js"         1 month ago     <span class="term-accent-emerald">Up 38 days (healthy)</span>      0.0.0.0:3000->3000/tcp    craver-order-engine
<span class="term-accent-cyan">d9910f8a3c44</span>   uzair/sys-inspect:latest            "sys-inspect --daemon"   12 days ago     <span class="term-accent-emerald">Up 12 days (healthy)</span>      127.0.0.1:9100->9100/tcp  sys-inspect-telemetry
<span class="term-accent-cyan">e4481c7e9b10</span>   uzair/network-lab:v3                "tcpdump -i eth0"        5 days ago      <span class="term-accent-emerald">Up 5 days</span>                 0.0.0.0:53->53/udp        net-packet-lab`,

    projects: `Forwarding to Docker Container Registry... Type '<span class="term-accent-emerald">docker ps</span>' or click [~/containers] in the HUD.`,

    "kubectl get nodes": `<span style="color:#94A3B8;">NAME                                         STATUS   ROLES           AGE    VERSION</span>
<span class="term-accent-emerald">ip-10-0-1-101.ap-south-1.compute.internal</span>    Ready    control-plane   180d   v1.30.2 (Ubuntu 24.04 LTS)
<span class="term-accent-emerald">ip-10-0-1-102.ap-south-1.compute.internal</span>    Ready    worker,node     180d   v1.30.2 (AMD Ryzen 5000)
<span class="term-accent-emerald">ip-10-0-1-103.ap-south-1.compute.internal</span>    Ready    worker,gpu      95d    v1.30.2 (NVIDIA GTX 1650)
<span class="term-accent-emerald">ip-10-0-1-104.ap-south-1.compute.internal</span>    Ready    worker,edge     42d    v1.30.2 (Expo-Mobile-Pod)

<span class="term-accent-cyan">CLUSTER HEALTH:</span> 4/4 Nodes Ready • Kubelet: Active • Flannel CNI: Operational • CoreDNS: Running`,

    "ping uzair": `<span class="term-accent-cyan">PING uzair.cloud (13.232.0.1): 56 data bytes</span>
64 bytes from 13.232.0.1: icmp_seq=0 ttl=64 time=0.042 ms
64 bytes from 13.232.0.1: icmp_seq=1 ttl=64 time=0.038 ms
64 bytes from 13.232.0.1: icmp_seq=2 ttl=64 time=0.040 ms
--- uzair.cloud ping statistics ---
3 packets transmitted, 3 received, <span class="term-accent-emerald">0% packet loss</span>, rtt min/avg/max = 0.038/0.040/0.042 ms
<span class="term-accent-emerald">Handshake Verified!</span> Opening Contact Terminal Gateway...`,

    "curl -O resume.pdf": `<span class="term-accent-cyan">% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current</span>
                                 <span class="term-accent-cyan">Dload  Upload   Total   Spent    Left  Speed</span>
100  428k  100  428k    0     0  2140k      0 --:--:-- --:--:-- --:--:-- 2140k
<span class="term-accent-emerald">[SUCCESS 200 OK]</span> Saved 'Uzair_Sultan_DevOps_Resume.pdf' to active storage.`,

    uptime: `<span class="term-accent-emerald">21:05:00 up 182 days, 14:32,  2 users,  load average: 0.14, 0.08, 0.05</span>
Cluster Pods: 12/12 Ready | Ingress: 0 5xx Errors | Network IO: 1.84 GB/s`,

    neofetch: `<span class="term-accent-emerald">         _nnnn_         </span> <strong style="color:#F8FAFC;">uzair@cloud-node-01</strong>
<span class="term-accent-emerald">        dGGGGMMb        </span> -------------------
<span class="term-accent-emerald">       @p~qp~~qMb       </span> <span style="color:#94A3B8;">OS:</span> Ubuntu 24.04 LTS x86_64
<span class="term-accent-emerald">       M|@||@) M|       </span> <span style="color:#94A3B8;">Host:</span> AWS EKS / Hybrid Linux Cluster
<span class="term-accent-emerald">       @,----.JM|       </span> <span style="color:#94A3B8;">Kernel:</span> 6.8.0-sysadmin-production
<span class="term-accent-emerald">      (<span style="color:#F59E0B;">'</span>_..--.._<span style="color:#F59E0B;">'</span>)      </span> <span style="color:#94A3B8;">Uptime:</span> 182 days, 14 hours
<span class="term-accent-emerald">       /========\\       </span> <span style="color:#94A3B8;">Shell:</span> zsh 5.9 (tmux 3.4)
<span class="term-accent-emerald">      / || \/ || \\      </span> <span style="color:#94A3B8;">Container Runtime:</span> containerd://1.7.15 / Docker 26.0
<span class="term-accent-emerald">     |  ||    ||  |     </span> <span style="color:#94A3B8;">Orchestrator:</span> Kubernetes v1.30.2
<span class="term-accent-emerald">     |__\\____//__|     </span> <span style="color:#94A3B8;">IaC:</span> Terraform v1.8.4
<span class="term-accent-emerald">     (____/\____)     </span> <span style="color:#94A3B8;">Memory:</span> 3420MiB / 15890MiB (21%)`,

    tree: `<span class="term-accent-cyan">uzair-portfolio/</span>
├── <span class="term-accent-purple">infrastructure/</span>
│   ├── terraform/ (vpc.tf, eks.tf, alb.tf)
│   ├── k8s-manifests/ (deployments, services, ingress)
│   └── docker/ (multi-stage alpine containers)
├── <span class="term-accent-emerald">projects/</span>
│   ├── nexora-mobile/ (React Native 0.81, Expo Router)
│   ├── kashmir-kesar-kingdom/ (95% asset compression, PWA)
│   ├── craver-fastfood/ (ES6+ modular, CI/CD)
│   └── sys-inspect/ (Linux /proc telemetry CLI)
└── <span class="term-accent-orange">telemetry/</span> (Prometheus, Grafana, Node-Exporter)
<span class="term-accent-muted">4 directories, 18 files</span>`,

    "sudo hire": `<span class="term-accent-emerald">[AUTH GRANTED]</span> Root elevation confirmed. Initiating direct recruitment bridge...
<span class="term-accent-cyan">WhatsApp:</span> +91 7889446114
<span class="term-accent-purple">Email:</span> uzairteeli123456789@gmail.com
<span class="term-accent-amber">GitHub:</span> https://github.com/Uzair0123
Launching instant WhatsApp channel...`
  },

  bootLogs: [
    { text: "[OK] Initializing Terraform state backend (AWS S3 + DynamoDB lock)...", delay: 200 },
    { text: "[OK] Mounting Docker daemon socket (/var/run/docker.sock)...", delay: 450 },
    { text: "[OK] Establishing BGP peering & VPC transit gateway routes (10.0.0.0/16)...", delay: 750 },
    { text: "[OK] Kubelet connected: 4/4 nodes Ready across ap-south-1a & 1b...", delay: 1050 },
    { text: "[OK] Ingress-NGINX controller active with TLS 1.3 certificates...", delay: 1300 },
    { text: "⚡ <strong style='color:#10B981;'>Cloud Control Cluster Ready.</strong> Type '<span class='term-accent-cyan'>help</span>' or tap quick-chips below.", delay: 1550 }
  ],

  init: function() {
    this.container = document.getElementById("terminalApp");
    this.body = document.getElementById("terminalBody");
    this.input = document.getElementById("terminalInput");
    this.tabZsh = document.getElementById("tabZsh");
    this.tabHtop = document.getElementById("tabHtop");
    this.tabLogs = document.getElementById("tabLogs");
    this.htopView = document.getElementById("terminalHtopView");
    this.logsView = document.getElementById("terminalLogsView");
    this.zshView = document.getElementById("terminalZshView");

    if (!this.body || !this.input) return;

    this.bindEvents();
    this.runBootSequence();
  },

  runBootSequence: function() {
    this.body.innerHTML = "";
    this.bootLogs.forEach((log) => {
      setTimeout(() => {
        const line = document.createElement("div");
        line.className = "term-boot-line";
        line.innerHTML = log.text;
        this.body.appendChild(line);
        this.body.scrollTop = this.body.scrollHeight;
      }, log.delay);
    });

    setTimeout(() => {
      this.bootFinished = true;
      if (this.input) {
        this.input.focus({ preventScroll: true });
      }
    }, 1650);
  },

  bindEvents: function() {
    // Tab switching
    if (this.tabZsh) {
      this.tabZsh.addEventListener("click", () => this.switchTab('zsh'));
    }
    if (this.tabHtop) {
      this.tabHtop.addEventListener("click", () => this.switchTab('htop'));
    }
    if (this.tabLogs) {
      this.tabLogs.addEventListener("click", () => this.switchTab('logs'));
    }

    // Terminal Input Navigation & Execution
    this.input.addEventListener("keydown", (e) => {
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
          const validCmds = Object.keys(this.commands);
          const matches = validCmds.filter(c => c.startsWith(current));
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

    // Quick Command Chips
    document.querySelectorAll(".term-chip[data-cmd]").forEach(chip => {
      chip.addEventListener("click", (e) => {
        const cmd = e.currentTarget.dataset.cmd;
        if (cmd) {
          this.switchTab('zsh');
          this.executeCommand(cmd.toLowerCase());
        }
      });
    });

    // Click anywhere in terminal card to focus input
    const termCard = document.querySelector(".terminal-window-card");
    if (termCard) {
      termCard.addEventListener("click", () => {
        if (this.activeTab === 'zsh' && this.input) {
          this.input.focus({ preventScroll: true });
        }
      });
    }
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
      this.stopHtopSimulation();
      this.stopNetworkSimulation();
      if (this.input) this.input.focus({ preventScroll: true });
    } else if (tabName === 'htop') {
      if (this.tabHtop) this.tabHtop.classList.add("active");
      if (this.htopView) this.htopView.style.display = "block";
      this.stopNetworkSimulation();
      this.startHtopSimulation();
    } else if (tabName === 'logs') {
      if (this.tabLogs) this.tabLogs.classList.add("active");
      if (this.logsView) this.logsView.style.display = "block";
      this.stopHtopSimulation();
      this.startNetworkSimulation();
    }
  },

  startHtopSimulation: function() {
    if (this.htopInterval) return;
    this.updateHtopView();
    this.htopInterval = setInterval(() => this.updateHtopView(), 1200);
  },

  stopHtopSimulation: function() {
    if (this.htopInterval) {
      clearInterval(this.htopInterval);
      this.htopInterval = null;
    }
  },

  updateHtopView: function() {
    if (!this.htopView) return;
    const cpu1 = Math.floor(12 + Math.random() * 25);
    const cpu2 = Math.floor(18 + Math.random() * 32);
    const cpu3 = Math.floor(8 + Math.random() * 20);
    const cpu4 = Math.floor(22 + Math.random() * 40);
    const memMb = Math.floor(3200 + Math.random() * 400);

    const makeBar = (pct, colorClass) => {
      const barsCount = Math.floor(pct / 5);
      const filled = "|".repeat(barsCount);
      const empty = " ".repeat(20 - barsCount);
      return `[<span class="${colorClass}">${filled}</span>${empty} ${pct}%]`;
    };

    this.htopView.innerHTML = `
<div class="htop-grid">
  <div>0 ${makeBar(cpu1, 'term-accent-emerald')} Tasks: 48, 128 thr; 1 running</div>
  <div>1 ${makeBar(cpu2, 'term-accent-cyan')} Load average: 0.18 0.12 0.08</div>
  <div>2 ${makeBar(cpu3, 'term-accent-purple')} Uptime: 182 days, 14:32:05</div>
  <div>3 ${makeBar(cpu4, 'term-accent-orange')} Cluster: ap-south-1 (Production)</div>
  <div style="grid-column: 1 / -1; margin-top: 0.4rem;">
    Mem [${makeBar(Math.floor((memMb / 16000) * 100), 'term-accent-emerald')} ${memMb}M/15.8G]  Swp [<span class="term-accent-muted">[                    ]</span> 0K/8.00G]
  </div>
</div>
<div class="htop-table-header">
  <span>PID</span><span>USER</span><span>PRI</span><span>NI</span><span>VIRT</span><span>RES</span><span>SHR</span><span>S</span><span>CPU%</span><span>MEM%</span><span>COMMAND</span>
</div>
<div class="htop-table-body">
  <div class="htop-row"><span>1402</span><span>root</span><span>20</span><span>0</span><span>1.4G</span><span>248M</span><span>64M</span><span class="term-accent-emerald">S</span><span>8.2</span><span>1.5</span><span>dockerd -H fd:// --containerd=/run/containerd</span></div>
  <div class="htop-row"><span>2189</span><span>uzair</span><span>20</span><span>0</span><span>980M</span><span>184M</span><span>48M</span><span class="term-accent-emerald">S</span><span>5.4</span><span>1.1</span><span>k3s server --disable=traefik</span></div>
  <div class="htop-row"><span>3894</span><span>uzair</span><span>20</span><span>0</span><span>620M</span><span>112M</span><span>36M</span><span class="term-accent-emerald">S</span><span>3.1</span><span>0.7</span><span>node /srv/projects/craver/server.js</span></div>
  <div class="htop-row"><span>4102</span><span>nginx</span><span>20</span><span>0</span><span>145M</span><span>38M</span><span>18M</span><span class="term-accent-emerald">S</span><span>1.8</span><span>0.2</span><span>nginx: worker process (kashmir-kesar)</span></div>
  <div class="htop-row"><span>5510</span><span>uzair</span><span>20</span><span>0</span><span>210M</span><span>54M</span><span>22M</span><span class="term-accent-emerald">R</span><span>1.2</span><span>0.3</span><span>sys-inspect --kernel-telemetry --json</span></div>
  <div class="htop-row"><span>6012</span><span>uzair</span><span>20</span><span>0</span><span>84M</span><span>18M</span><span>10M</span><span class="term-accent-emerald">S</span><span>0.4</span><span>0.1</span><span>zsh (tmux: cloud-control-session)</span></div>
</div>
`;
  },

  startNetworkSimulation: function() {
    if (this.networkInterval) return;
    this.networkLogsBuffer = [
      `[${new Date().toISOString().substring(11, 19)}] [INGRESS] TLS 1.3 Handshake completed with Cloudflare edge proxy`,
      `[${new Date().toISOString().substring(11, 19)}] [K8S] Pod 'uzair/api:v1' liveness probe HTTP 200 OK (latency: 1.4ms)`,
      `[${new Date().toISOString().substring(11, 19)}] [ROUTER] BGP KeepAlive acknowledged on ASN 64512 (ap-south-1)`,
      `[${new Date().toISOString().substring(11, 19)}] [SECURITY] Inbound packet evaluated by UFW: ACCEPT TCP:443 SRC:0.0.0.0/0`,
      `[${new Date().toISOString().substring(11, 19)}] [GRAFANA] Prometheus scrape target /metrics: 24 metrics indexed in 8ms`
    ];
    this.renderNetworkLogs();

    this.networkInterval = setInterval(() => {
      const now = new Date().toISOString().substring(11, 19);
      const sampleEvents = [
        `[${now}] [INGRESS] HTTP GET /api/v1/health 200 OK (0.8ms) via ALB-ap-south-1`,
        `[${now}] [DOCKER] Container 'nexora-app' health check passed (0 restarts)`,
        `[${now}] [TERRAFORM] Remote state lock verified on DynamoDB (hash: 4e96c15)`,
        `[${now}] [REDIS] Cache hit for key 'session:cluster:telemetry' (0.2ms)`,
        `[${now}] [PROMETHEUS] Node-exporter reports CPU temperature: 48°C (Normal)`,
        `[${now}] [GITOPS] ArgoCD sync state: InSync (revision: main/4e96c15)`
      ];
      const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      this.networkLogsBuffer.push(randomEvent);
      if (this.networkLogsBuffer.length > 25) this.networkLogsBuffer.shift();
      this.renderNetworkLogs();
    }, 1800);
  },

  stopNetworkSimulation: function() {
    if (this.networkInterval) {
      clearInterval(this.networkInterval);
      this.networkInterval = null;
    }
  },

  renderNetworkLogs: function() {
    if (!this.logsView) return;
    this.logsView.innerHTML = `
<div class="network-logs-stream">
  <div class="term-accent-emerald" style="margin-bottom:0.4rem; font-weight:700;">● STREAMING LIVE INGRESS & ROUTING TELEMETRY (TCP/IP 443 / BGP):</div>
  ${this.networkLogsBuffer.map(log => `<div class="net-log-line">${log}</div>`).join('')}
</div>`;
    this.logsView.scrollTop = this.logsView.scrollHeight;
  },

  executeCommand: function(cmd) {
    if (!cmd) return;

    // Echo command line
    this.appendOutput(`<div class="term-echo-line"><span class="term-prompt">uzair@cloud-node-01:~$</span> <span class="term-cmd-text">${cmd}</span></div>`);

    if (cmd === "clear") {
      this.body.innerHTML = "";
      return;
    }

    if (cmd === "ping uzair") {
      this.appendOutput(`<div class="term-output">${this.commands["ping uzair"]}</div>`);
      setTimeout(() => {
        const contactSec = document.getElementById("contact") || document.getElementById("init-contact");
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: "smooth" });
          const nameInput = document.getElementById("senderName");
          if (nameInput) nameInput.focus();
        }
      }, 900);
      return;
    }

    if (cmd === "curl -o resume.pdf" || cmd === "curl resume.pdf" || cmd === "resume") {
      this.appendOutput(`<div class="term-output">${this.commands["curl -O resume.pdf"]}</div>`);
      if (window.triggerResumeModal) {
        window.triggerResumeModal();
      }
      return;
    }

    if (cmd === "sudo hire") {
      this.appendOutput(`<div class="term-output">${this.commands["sudo hire"]}</div>`);
      setTimeout(() => {
        window.open("https://wa.me/917889446114?text=Hi%20Uzair,%20I%20saw%20your%20Cloud%20Control%20portfolio%20and%20would%20like%20to%20discuss%20an%20engineering%20opportunity!", "_blank");
      }, 1200);
      return;
    }

    if (cmd === "docker ps" || cmd === "kubectl get projects") {
      const output = this.commands["docker ps"];
      this.appendOutput(`<div class="term-output">${output}</div>`);
      return;
    }

    const output = this.commands[cmd];
    if (output) {
      this.appendOutput(`<div class="term-output">${output}</div>`);
    } else {
      this.appendOutput(`<div class="term-output term-error">zsh: command not found: ${cmd}. Type '<span class="term-accent-cyan">help</span>' for available cloud commands.</div>`);
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
