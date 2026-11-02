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
    help: `Available Cloud Control & Linux Commands:
  • <span style="color:#A855F7;">whoami</span>          - Systems identity & technical orientation
  • <span style="color:#00F5A0;">docker ps</span>       - Active containerized production workloads & ports
  • <span style="color:#38BDF8;">k8s cluster</span>     - EKS node topology, pods & cluster status
  • <span style="color:#FF8A00;">aws stack</span>       - AWS VPC, subnets, EC2, ALB & S3 telemetry
  • <span style="color:#38BDF8;">ping uzair</span>       - Dispatch ICMP probe & open contact gateway
  • <span style="color:#00F5A0;">resume</span>           - Retrieve official engineer curriculum vitae (PDF)
  • <span style="color:#A855F7;">skills</span>           - 11-Domain infrastructure matrix summary
  • <span style="color:#64748B;">clear</span>            - Flush the active terminal console buffer`,

    whoami: `<strong style="color:#F8FAFC;">Uzair Sultan</strong> — <span style="color:#00F5A0; font-weight:700;">System Architect // DevOps & Cloud Engineer</span>
<span style="color:#94A3B8;">Education:</span> MCA (IGNOU, Started 2026 — Present) • BCA (University of Kashmir, 1st Class)
<span style="color:#94A3B8;">Host Cluster:</span> AWS EKS (Kubernetes v1.30.2) • <span style="color:#38BDF8;">Kernel:</span> Linux 6.8.0-sysadmin x86_64

<span style="color:#CBD5E1;">Systems builder focused on Linux kernel internals, Kubernetes orchestration, declarative Terraform infrastructure, and computer networking. Delivering fault-tolerant, self-healing platforms with zero tolerance for downtime.</span>`,

    "docker ps": `<span style="color:#94A3B8;">CONTAINER ID   IMAGE                               COMMAND               STATUS                    PORTS                     NAMES</span>
<span style="color:#38BDF8;">a8f4c2190e31</span>   uzair/nexora:v1.0.0                 "expo-start"          <span style="color:#00F5A0;">Up 21 days (healthy)</span>      0.0.0.0:8081->8081/tcp    nexora-app
<span style="color:#38BDF8;">b7190d4e5f22</span>   uzair/kashmir-kesar-kingdom:v2.4    "nginx -g 'daemon'"   <span style="color:#00F5A0;">Up 60 days (healthy)</span>      0.0.0.0:443->80/tcp       kkk-export-web
<span style="color:#38BDF8;">c3392b1a8d05</span>   uzair/craver-fastfood:v1.4.2        "node server.js"      <span style="color:#00F5A0;">Up 38 days (healthy)</span>      0.0.0.0:3000->3000/tcp    craver-order-engine
<span style="color:#38BDF8;">d9910f8a3c44</span>   uzair/sys-inspect:latest            "sys-inspect"         <span style="color:#00F5A0;">Up 12 days (healthy)</span>      127.0.0.1:9100->9100/tcp  sys-inspect-telemetry
<span style="color:#38BDF8;">e4481c7e9b10</span>   uzair/network-lab:v3                "tcpdump -i eth0"     <span style="color:#00F5A0;">Up 5 days</span>                 0.0.0.0:53->53/udp        net-packet-lab`,

    "k8s cluster": `<span style="color:#94A3B8;">NODE NAME                                    STATUS   ROLES           AGE    VERSION</span>
<span style="color:#00F5A0;">ip-10-0-1-101.ap-south-1.compute.internal</span>    Ready    control-plane   180d   v1.30.2 (Ubuntu 24.04 LTS)
<span style="color:#00F5A0;">ip-10-0-1-102.ap-south-1.compute.internal</span>    Ready    worker,node     180d   v1.30.2 (AMD Ryzen 5000)
<span style="color:#00F5A0;">ip-10-0-1-103.ap-south-1.compute.internal</span>    Ready    worker,gpu      95d    v1.30.2 (NVIDIA GTX 1650)
<span style="color:#00F5A0;">ip-10-0-1-104.ap-south-1.compute.internal</span>    Ready    worker,edge     42d    v1.30.2 (Expo-Mobile-Pod)

<span style="color:#38BDF8;">POD HEALTH:</span> 12/12 Pods InSync • Ingress-NGINX: Active • CoreDNS: Running • Flannel CNI: 0 errors`,

    "kubectl get nodes": `<span style="color:#94A3B8;">NAME                                         STATUS   ROLES           AGE    VERSION</span>
<span style="color:#00F5A0;">ip-10-0-1-101.ap-south-1.compute.internal</span>    Ready    control-plane   180d   v1.30.2 (Ubuntu 24.04 LTS)
<span style="color:#00F5A0;">ip-10-0-1-102.ap-south-1.compute.internal</span>    Ready    worker,node     180d   v1.30.2 (AMD Ryzen 5000)
<span style="color:#00F5A0;">ip-10-0-1-103.ap-south-1.compute.internal</span>    Ready    worker,gpu      95d    v1.30.2 (NVIDIA GTX 1650)

<span style="color:#38BDF8;">CLUSTER:</span> 4/4 Nodes Ready • Ready for production workloads.`,

    "aws stack": `<span style="color:#FF8A00;">AWS TOPOLOGY // REGION: ap-south-1</span>
├── <span style="color:#38BDF8;">VPC:</span> vpc-0a4b9c1d (CIDR: 10.0.0.0/16)
│   ├── Public Subnets (ap-south-1a & 1b) -> Internet Gateway + ALB
│   └── Private Subnets (ap-south-1a & 1b) -> NAT Gateway + EKS Nodes
├── <span style="color:#00F5A0;">EKS Cluster:</span> portfolio-eks (Kubernetes v1.30.2, Managed NodeGroups)
├── <span style="color:#A855F7;">Storage:</span> S3 bucket 'uzair-vault-artifacts' with CloudFront CDN
└── <span style="color:#00F5A0;">Security:</span> IAM Least-Privilege Role Boundaries + KMS Encryption`,

    "ping uzair": `<span style="color:#38BDF8;">PING uzair.cloud (13.232.0.1): 56 data bytes</span>
64 bytes from 13.232.0.1: icmp_seq=0 ttl=64 time=0.042 ms
64 bytes from 13.232.0.1: icmp_seq=1 ttl=64 time=0.038 ms
64 bytes from 13.232.0.1: icmp_seq=2 ttl=64 time=0.040 ms
<span style="color:#00F5A0;">--- 0% packet loss, handshake verified. Routing to Contact Gateway...</span>`,

    resume: `<span style="color:#38BDF8;">Retrieving official curriculum vitae artifact via S3 CDN...</span>
<span style="color:#00F5A0;">[200 OK]</span> Download Verified. Opening resume modal...`,

    skills: `<span style="color:#00F5A0;">[CONTAINERS & K8S]</span> Docker, Kubernetes, Helm, Ingress-NGINX
<span style="color:#FF8A00;">[AWS CLOUD INFRA]</span>  VPC, EC2, S3, IAM, EKS, ALB, CloudWatch
<span style="color:#A855F7;">[INFRASTRUCTURE]</span>   Terraform HCL, GitOps (ArgoCD), GitHub Actions
<span style="color:#00F5A0;">[LINUX & NETWORKS]</span> Ubuntu, Arch, Bash, Systemd, TCP/IP, Wireshark, BGP
<span style="color:#38BDF8;">[CLIENT & MOBILE]</span>  React Native 0.81, Expo SDK 54, Modern Web PWA`
  },

  init: function() {
    this.container = document.getElementById("heroTerminal");
    this.body = document.getElementById("termBody");
    this.input = document.getElementById("termInput");
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
      <div style="color:#38BDF8; margin-bottom:0.4rem;">[BOOT] Initializing Cloud Control CLI session on ap-south-1...</div>
      <div style="color:#00F5A0; margin-bottom:0.6rem;">⚡ <strong style="color:#FFF;">Uzair Sultan DevOps Node Online.</strong> Type '<span style="color:#38BDF8;">help</span>' or tap 1-click pills below.</div>
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
  <div>1 ${bar(cpu2, '#38BDF8')} Load: 0.18 0.12 0.08</div>
  <div>2 ${bar(cpu3, '#A855F7')} Uptime: 182 days, 14:32:05</div>
  <div>3 ${bar(cpu4, '#FF8A00')} Cluster: ap-south-1 (Production)</div>
  <div style="grid-column: 1 / -1; margin-top:0.3rem;">
    Mem [${bar(Math.floor((memMb / 16000) * 100), '#00F5A0')} ${memMb}M/15.8G]  Swp [ 0K/8.00G]
  </div>
</div>
<div style="display:grid; grid-template-columns:50px 60px 40px 60px 60px 50px 1fr; gap:0.4rem; background:#0284C7; color:#000; font-weight:700; padding:0.2rem 0.4rem; font-size:0.7rem;">
  <span>PID</span><span>USER</span><span>PRI</span><span>VIRT</span><span>RES</span><span>CPU%</span><span>COMMAND</span>
</div>
<div style="font-size:0.7rem; line-height:1.5; margin-top:0.3rem;">
  <div style="display:grid; grid-template-columns:50px 60px 40px 60px 60px 50px 1fr; gap:0.4rem; padding:0.15rem 0.4rem;">
    <span>1402</span><span>root</span><span>20</span><span>1.4G</span><span>248M</span><span style="color:#00F5A0;">8.2</span><span>dockerd -H fd://</span>
  </div>
  <div style="display:grid; grid-template-columns:50px 60px 40px 60px 60px 50px 1fr; gap:0.4rem; padding:0.15rem 0.4rem;">
    <span>2189</span><span>uzair</span><span>20</span><span>980M</span><span>184M</span><span style="color:#00F5A0;">5.4</span><span>k3s server --disable=traefik</span>
  </div>
  <div style="display:grid; grid-template-columns:50px 60px 40px 60px 60px 50px 1fr; gap:0.4rem; padding:0.15rem 0.4rem;">
    <span>3894</span><span>uzair</span><span>20</span><span>620M</span><span>112M</span><span style="color:#00F5A0;">3.1</span><span>node /srv/craver/server.js</span>
  </div>
  <div style="display:grid; grid-template-columns:50px 60px 40px 60px 60px 50px 1fr; gap:0.4rem; padding:0.15rem 0.4rem;">
    <span>4102</span><span>nginx</span><span>20</span><span>145M</span><span>38M</span><span style="color:#00F5A0;">1.8</span><span>nginx: worker (kashmir-kesar)</span>
  </div>
</div>
`;
  },

  startNetworkLogs: function() {
    if (this.logsTimer) return;
    this.logBuffer = [
      `[INGRESS] TLS 1.3 Handshake completed with Cloudflare Edge Anycast`,
      `[K8S] Pod 'uzair/api:v1' liveness probe HTTP 200 OK (latency: 1.2ms)`,
      `[ROUTER] BGP KeepAlive acknowledged on ASN 64512 (ap-south-1)`,
      `[SECURITY] Inbound packet evaluated by UFW: ACCEPT TCP:443`,
      `[PROMETHEUS] Target /metrics: 28 metrics indexed in 6ms`
    ];
    this.renderLogs();

    this.logsTimer = setInterval(() => {
      const now = new Date().toISOString().substring(11, 19);
      const events = [
        `[${now}] [INGRESS] HTTP GET /api/v1/health 200 OK (0.8ms) via AWS ALB`,
        `[${now}] [DOCKER] Container 'nexora-app' health check passed (0 restarts)`,
        `[${now}] [TERRAFORM] Remote state lock verified on DynamoDB (hash: 5a3d7aa)`,
        `[${now}] [REDIS] Cache hit for key 'cluster:telemetry' (0.2ms)`,
        `[${now}] [GITOPS] ArgoCD sync state: InSync (revision: main/5a3d7aa)`
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
