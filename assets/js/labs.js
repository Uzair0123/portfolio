/**
 * Uzair Sultan — DevOps & Cloud Infrastructure Portfolio
 * Interactive DevOps Cockpit & Systems Simulators Engine (/labs/)
 * ----------------------------------------------------------------------
 * 1. Kubernetes Horizontal Pod Autoscaler (HPA) & Chaos Monkey Sandbox
 * 2. Live Linux htop Systems Performance Cockpit
 * 3. Interactive CI/CD GitOps Pipeline DAG Engine
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // 1. KUBERNETES HPA & CHAOS MONKEY SIMULATOR
  // ═══════════════════════════════════════════════════════════════
  function initK8sHpaSimulator() {
    const btnInject = document.getElementById("k8sBtnInject");
    const btnDrain = document.getElementById("k8sBtnDrain");
    const btnReset = document.getElementById("k8sBtnReset");

    const cpuGauge = document.getElementById("k8sCpuGauge");
    const cpuText = document.getElementById("k8sCpuText");
    const rpsText = document.getElementById("k8sRpsText");
    const replicasText = document.getElementById("k8sReplicasText");
    const statusBadge = document.getElementById("k8sStatusBadge");
    const consoleLogs = document.getElementById("k8sConsoleLogs");

    const worker1Node = document.getElementById("k8sWorker1Node");
    const worker2Node = document.getElementById("k8sWorker2Node");
    const worker2Status = document.getElementById("k8sWorker2Status");
    const podsGrid = document.getElementById("k8sPodsGrid");

    if (!btnInject || !podsGrid) return;

    let isBusy = false;
    let isSpiked = false;
    let isDrained = false;

    function appendK8sLog(msg, type = "info") {
      if (!consoleLogs) return;
      const p = document.createElement("p");
      p.className = `k8s-log-line ${type}`;
      const time = new Date().toTimeString().split(" ")[0];
      p.innerHTML = `<span class="log-time">[${time}]</span> ${msg}`;
      consoleLogs.appendChild(p);
      consoleLogs.scrollTop = consoleLogs.scrollHeight;
    }

    async function injectTrafficSpike() {
      if (isBusy || isSpiked) return;
      isBusy = true;
      isSpiked = true;

      btnInject.disabled = true;
      btnInject.classList.add("disabled");

      appendK8sLog("⚡ [TRAFFIC INJECTOR] Dispatched 10,000 req/sec from 14 edge ingress endpoints...", "cyan");

      // Spike CPU & RPS
      if (rpsText) rpsText.textContent = "10,240 req/s";
      if (cpuText) cpuText.textContent = "88%";
      if (cpuGauge) {
        cpuGauge.style.width = "88%";
        cpuGauge.style.background = "#EF4444"; // Alert Red
      }
      if (statusBadge) {
        statusBadge.className = "k8s-status-badge alert";
        statusBadge.textContent = "ALARM: CPU THRESHOLD BREACHED (88% > 70%)";
      }

      await new Promise((r) => setTimeout(r, 650));
      appendK8sLog("⚠️ [METRICS SERVER] Pod CPU utilization exceeded HPA policy threshold (70%). Triggering scale event...", "amber");

      await new Promise((r) => setTimeout(r, 700));
      appendK8sLog("☸️ [HPA CONTROLLER] HorizontalPodAutoscaler 'api-gateway-hpa' scaling deployment: 3 → 6 replicas.", "green");

      // Spawn 3 new pods dynamically
      const newPods = [
        { id: "pod-4", name: "pod/api-gateway-8c11d", node: isDrained ? "worker-01" : "worker-02" },
        { id: "pod-5", name: "pod/api-gateway-8c11e", node: "worker-01" },
        { id: "pod-6", name: "pod/api-gateway-8c11f", node: isDrained ? "worker-01" : "worker-02" }
      ];

      for (let i = 0; i < newPods.length; i++) {
        await new Promise((r) => setTimeout(r, 400));
        const p = newPods[i];
        appendK8sLog(`[KUBE SCHEDULER] Assigned ${p.name} to ${p.node} (status: ContainerCreating)...`, "cyan");

        const podEl = document.createElement("div");
        podEl.className = "k8s-pod-card spawning";
        podEl.id = p.id;
        podEl.setAttribute("data-node", p.node);
        podEl.innerHTML = `
          <div class="pod-card-header">
            <span class="pod-pulse-dot pending"></span>
            <span class="pod-name">${p.name}</span>
          </div>
          <div class="pod-card-meta">
            <span class="pod-host">${p.node}</span>
            <span class="pod-status-text">Creating...</span>
          </div>
        `;
        podsGrid.appendChild(podEl);
      }

      await new Promise((r) => setTimeout(r, 600));

      // Transition new pods to Running
      newPods.forEach((p) => {
        const el = document.getElementById(p.id);
        if (el) {
          el.classList.remove("spawning");
          el.classList.add("healthy");
          const dot = el.querySelector(".pod-pulse-dot");
          const statusTxt = el.querySelector(".pod-status-text");
          if (dot) dot.className = "pod-pulse-dot ready";
          if (statusTxt) statusTxt.textContent = "Running (Ready 1/1)";
        }
      });

      appendK8sLog("✓ [HEALTH CHECKS] 6/6 pods passed liveness & readiness probes. Load balancing active.", "green");

      // Stabilize CPU to healthy zone
      await new Promise((r) => setTimeout(r, 500));
      if (cpuText) cpuText.textContent = "34%";
      if (cpuGauge) {
        cpuGauge.style.width = "34%";
        cpuGauge.style.background = "#00F5A0"; // Green
      }
      if (replicasText) replicasText.textContent = "6 / 6 Ready";
      if (statusBadge) {
        statusBadge.className = "k8s-status-badge healthy";
        statusBadge.textContent = "STABLE: 6/6 REPLICAS BALANCED (0% PACKET LOSS)";
      }

      appendK8sLog("🎉 [AUTOSCALER INSYNC] Traffic distributed across 6 pods. Average latency stabilized at 1.4ms.", "green");
      isBusy = false;
    }

    async function drainWorkerNode() {
      if (isBusy || isDrained) return;
      isBusy = true;
      isDrained = true;

      btnDrain.disabled = true;
      btnDrain.classList.add("disabled");

      appendK8sLog("💥 [CHAOS MONKEY] Node eviction dispatched: Simulating fatal hardware failure on worker-node-02...", "amber");

      if (worker2Node) {
        worker2Node.classList.add("node-drained");
      }
      if (worker2Status) {
        worker2Status.className = "node-badge cordon";
        worker2Status.textContent = "SchedulingDisabled";
      }

      await new Promise((r) => setTimeout(r, 600));
      appendK8sLog("⚠️ [NODE CONTROLLER] worker-node-02 marked NotReady / Cordoned. Evicting active pods...", "amber");

      // Find all pods currently on worker-02 and migrate them
      const worker2Pods = document.querySelectorAll('.k8s-pod-card[data-node="worker-02"]');
      for (let i = 0; i < worker2Pods.length; i++) {
        const pod = worker2Pods[i];
        const podName = pod.querySelector(".pod-name").textContent;

        pod.classList.add("evicting");
        appendK8sLog(`[RESCHEDULING] Evicting ${podName} from worker-02 → rescheduling on worker-node-01...`, "cyan");

        await new Promise((r) => setTimeout(r, 450));
        pod.setAttribute("data-node", "worker-01");
        pod.classList.remove("evicting");
        pod.classList.add("migrated");

        const hostEl = pod.querySelector(".pod-host");
        if (hostEl) hostEl.textContent = "worker-01";
      }

      await new Promise((r) => setTimeout(r, 500));
      appendK8sLog("✓ [SELF-HEALING COMPLETE] All pod replicas evacuated to surviving node with 0 downtime.", "green");

      if (statusBadge) {
        statusBadge.className = "k8s-status-badge healthy";
        statusBadge.textContent = "RESILIENT: PODS ACTIVE ON SURVIVING WORKER-01";
      }

      isBusy = false;
    }

    function resetCluster() {
      if (isBusy) return;

      isSpiked = false;
      isDrained = false;

      btnInject.disabled = false;
      btnInject.classList.remove("disabled");
      btnDrain.disabled = false;
      btnDrain.classList.remove("disabled");

      // Restore gauges
      if (cpuText) cpuText.textContent = "18%";
      if (cpuGauge) {
        cpuGauge.style.width = "18%";
        cpuGauge.style.background = "#00F5A0";
      }
      if (rpsText) rpsText.textContent = "1,200 req/s";
      if (replicasText) replicasText.textContent = "3 / 3 Ready";

      if (worker2Node) worker2Node.classList.remove("node-drained");
      if (worker2Status) {
        worker2Status.className = "node-badge ready";
        worker2Status.textContent = "Ready (v1.30.2)";
      }

      // Reset pods to initial 3
      podsGrid.innerHTML = `
        <div class="k8s-pod-card healthy" id="pod-1" data-node="worker-01">
          <div class="pod-card-header">
            <span class="pod-pulse-dot ready"></span>
            <span class="pod-name">pod/api-gateway-7f9a1</span>
          </div>
          <div class="pod-card-meta">
            <span class="pod-host">worker-01</span>
            <span class="pod-status-text">Running (Ready 1/1)</span>
          </div>
        </div>

        <div class="k8s-pod-card healthy" id="pod-2" data-node="worker-02">
          <div class="pod-card-header">
            <span class="pod-pulse-dot ready"></span>
            <span class="pod-name">pod/api-gateway-7f9a2</span>
          </div>
          <div class="pod-card-meta">
            <span class="pod-host">worker-02</span>
            <span class="pod-status-text">Running (Ready 1/1)</span>
          </div>
        </div>

        <div class="k8s-pod-card healthy" id="pod-3" data-node="worker-01">
          <div class="pod-card-header">
            <span class="pod-pulse-dot ready"></span>
            <span class="pod-name">pod/api-gateway-7f9a3</span>
          </div>
          <div class="pod-card-meta">
            <span class="pod-host">worker-01</span>
            <span class="pod-status-text">Running (Ready 1/1)</span>
          </div>
        </div>
      `;

      if (statusBadge) {
        statusBadge.className = "k8s-status-badge ready";
        statusBadge.textContent = "CLUSTER STANDBY: 3 REPLICAS INSYNC";
      }

      appendK8sLog("↺ [RESET] Cluster state restored to nominal baseline. HPA target: 3 pods.", "cyan");
    }

    btnInject.addEventListener("click", injectTrafficSpike);
    btnDrain.addEventListener("click", drainWorkerNode);
    btnReset.addEventListener("click", resetCluster);
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. LIVE LINUX HTOP SYSTEMS PERFORMANCE COCKPIT
  // ═══════════════════════════════════════════════════════════════
  function initHtopMonitor() {
    const htopContainer = document.getElementById("htopCockpit");
    const toggleBtn = document.getElementById("htopToggleBtn");
    const loadAvgEl = document.getElementById("htopLoadAvg");
    const memMeterEl = document.getElementById("htopMemMeter");
    const memBarEl = document.getElementById("htopMemBar");

    if (!htopContainer) return;

    let isStreaming = true;
    let timer = null;

    const baseCores = [28, 42, 19, 36, 52, 24, 38, 45];

    function updateHtopTelemetry() {
      if (!isStreaming) return;

      // Update 8 CPU Core Meters
      for (let i = 1; i <= 8; i++) {
        const bar = document.getElementById(`htopCoreBar${i}`);
        const text = document.getElementById(`htopCoreVal${i}`);
        if (bar && text) {
          const delta = (Math.random() - 0.5) * 14;
          let val = Math.round(Math.min(94, Math.max(12, baseCores[i - 1] + delta)));
          bar.style.width = `${val}%`;
          if (val > 75) {
            bar.style.background = "#EF4444";
          } else if (val > 45) {
            bar.style.background = "#38BDF8";
          } else {
            bar.style.background = "#00F5A0";
          }
          text.textContent = `${val}%`;
        }
      }

      // Update Memory
      const memDelta = (Math.random() - 0.5) * 0.15;
      const memVal = (4.18 + memDelta).toFixed(2);
      if (memMeterEl) memMeterEl.textContent = `${memVal}G / 16.0G`;
      if (memBarEl) memBarEl.style.width = `${(memVal / 16.0 * 100).toFixed(1)}%`;

      // Update Load Average
      if (loadAvgEl) {
        const l1 = (0.35 + (Math.random() * 0.1)).toFixed(2);
        const l2 = (0.41 + (Math.random() * 0.08)).toFixed(2);
        const l3 = (0.38 + (Math.random() * 0.05)).toFixed(2);
        loadAvgEl.textContent = `${l1}, ${l2}, ${l3}`;
      }
    }

    timer = setInterval(updateHtopTelemetry, 650);

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        isStreaming = !isStreaming;
        if (isStreaming) {
          toggleBtn.textContent = "Pause Telemetry ⏸";
          toggleBtn.classList.remove("paused");
        } else {
          toggleBtn.textContent = "Resume Stream ▶";
          toggleBtn.classList.add("paused");
        }
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. DOCKERFILE SECURITY & CIS BENCHMARK AUDITOR (HADOLINT AST)
  // ═══════════════════════════════════════════════════════════════
  function initDockerfileLinter() {
    const input = document.getElementById("dockerfileInput");
    const linesCount = document.getElementById("linterLinesCount");
    const gradeSeal = document.getElementById("linterGradeSeal");
    const gradeLetter = document.getElementById("linterGradeLetter");
    const gradeScore = document.getElementById("linterGradeScore");
    const verdict = document.getElementById("linterVerdict");
    const countCritical = document.getElementById("countCritical");
    const countWarning = document.getElementById("countWarning");
    const countPassed = document.getElementById("countPassed");
    const estSize = document.getElementById("linterEstSize");
    const box = document.getElementById("linterViolationsBox");

    const presetInsecure = document.getElementById("presetInsecureBtn");
    const presetHardened = document.getElementById("presetHardenedBtn");
    const presetClear = document.getElementById("presetClearBtn");

    if (!input || !box) return;

    const PRESET_INSECURE = `FROM node:latest
WORKDIR /app
ENV AWS_SECRET_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
COPY . .
RUN apt-get update && apt-get install -y curl wget
ADD https://example.com/runtime.tar.gz /tmp/runtime.tar.gz
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]`;

    const PRESET_HARDENED = `# Stage 1: Ephemeral Build Pipeline
FROM node:20.14.0-alpine3.20 AS builder
WORKDIR /build
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Distroless Minimal Non-Root Runtime
FROM gcr.io/distroless/nodejs20-debian12:nonroot
WORKDIR /app
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/node_modules ./node_modules
USER 10001:10001
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD ["/nodejs/bin/node", "-e", "require('http').get('http://localhost:3000/healthz', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"]
CMD ["dist/server.js"]`;

    function runAudit() {
      const code = input.value;
      const lines = code.split("\n");
      if (linesCount) linesCount.textContent = `${lines.length} lines`;

      const violations = [];
      let hasUser = false;
      let hasHealthcheck = false;
      let isDistroless = false;

      lines.forEach((line, idx) => {
        const lineNum = idx + 1;
        const trimmed = line.trim();

        if (/distroless/i.test(trimmed)) {
          isDistroless = true;
        }

        // Rule: DL3006 / CIS 4.2 - :latest tag
        if (/^FROM\s+[\w./-]+:latest\b/i.test(trimmed)) {
          violations.push({
            code: "DL3006",
            cis: "CIS 4.2",
            severity: "warning",
            line: lineNum,
            title: "Mutable image tag ':latest' detected",
            desc: "Using ':latest' creates unpredictable builds across environments and leaves pipelines open to upstream supply chain drift.",
            fix: "Pin immutable semantic digest or explicit tag (e.g. node:20-alpine)",
            action: () => {
              input.value = input.value.replace(/:latest\b/g, ":20.14.0-alpine3.20");
              runAudit();
            }
          });
        }

        // Rule: CIS 4.7 - Secret in ENV / ARG
        if (/^(ENV|ARG)\s+.*(SECRET|KEY|PASSWORD|TOKEN|AUTH)=/i.test(trimmed)) {
          violations.push({
            code: "CIS 4.7",
            cis: "CIS 4.7",
            severity: "critical",
            line: lineNum,
            title: "Hardcoded credential detected in ENV instruction",
            desc: "Environment secrets are baked into immutable image metadata layers and remain inspectable via 'docker inspect'.",
            fix: "Inject via Kubernetes Secrets / HashiCorp Vault at runtime",
            action: () => {
              input.value = input.value.replace(/ENV\s+.*(SECRET|KEY|PASSWORD|TOKEN).*\n?/i, "# Secrets mounted via K8s Secret volume at runtime\n");
              runAudit();
            }
          });
        }

        // Rule: DL3020 / CIS 4.4 - ADD instead of COPY
        if (/^ADD\s+/i.test(trimmed) && !/ADD\s+--chown/i.test(trimmed)) {
          violations.push({
            code: "DL3020",
            cis: "CIS 4.4",
            severity: "warning",
            line: lineNum,
            title: "Insecure 'ADD' instruction used instead of 'COPY'",
            desc: "'ADD' auto-extracts archives and fetches remote URLs without hash verification, introducing SSRF vulnerabilities.",
            fix: "Use 'COPY' for local files or curl with checksum for remote tarballs",
            action: () => {
              input.value = input.value.replace(/^ADD\s+/gm, "COPY ");
              runAudit();
            }
          });
        }

        // Rule: DL3009 - apt-get lists cached
        if (/apt-get\s+install/i.test(trimmed) && !/rm\s+-rf\s+\/var\/lib\/apt\/lists/i.test(code)) {
          violations.push({
            code: "DL3009",
            cis: "CIS 4.3",
            severity: "warning",
            line: lineNum,
            title: "Apt package cache not cleaned up after install",
            desc: "Package manager index caches bloat the image filesystem by 35MB+ and increase attack surface.",
            fix: "Append '&& rm -rf /var/lib/apt/lists/*'",
            action: () => {
              input.value = input.value.replace(/(apt-get\s+install.*?)(\n|$)/i, "$1 && rm -rf /var/lib/apt/lists/*$2");
              runAudit();
            }
          });
        }

        // Track USER directive
        if (/^USER\s+/i.test(trimmed)) {
          const userVal = trimmed.replace(/^USER\s+/i, "").trim();
          if (userVal !== "0" && userVal !== "root") {
            hasUser = true;
          }
        }

        // Track HEALTHCHECK
        if (/^HEALTHCHECK\s+/i.test(trimmed)) {
          hasHealthcheck = true;
        }
      });

      // Rule: DL3002 / CIS 4.1 - Root execution
      if (!hasUser && !isDistroless) {
        violations.push({
          code: "DL3002",
          cis: "CIS 4.1",
          severity: "critical",
          line: lines.length,
          title: "Container executes with Root UID 0 privilege",
          desc: "Processes running as root can break out of container sandboxes if Linux kernel namespace exploits exist.",
          fix: "Add unprivileged user 'USER 10001:10001'",
          action: () => {
            input.value += "\nUSER 10001:10001";
            runAudit();
          }
        });
      }

      // Rule: CIS 4.6 - Missing Healthcheck
      if (!hasHealthcheck) {
        violations.push({
          code: "CIS 4.6",
          cis: "CIS 4.6",
          severity: "warning",
          line: lines.length,
          title: "Missing HEALTHCHECK instruction",
          desc: "Without a healthcheck probe, container engines cannot detect deadlocked or zombie background processes.",
          fix: "Define HEALTHCHECK --interval=30s probe",
          action: () => {
            input.value += '\nHEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/healthz || exit 1';
            runAudit();
          }
        });
      }

      // Calculate Score
      let score = 100;
      let criticals = 0;
      let warnings = 0;

      violations.forEach(v => {
        if (v.severity === "critical") {
          score -= 32;
          criticals++;
        } else {
          score -= 14;
          warnings++;
        }
      });

      score = Math.max(0, score);
      const passed = Math.max(0, 8 - (criticals + warnings));

      let grade = "F";
      let verdictText = "❌ CRITICAL SECURITY VULNERABILITIES";
      let sealClass = "";

      if (score >= 95) {
        grade = "A+";
        verdictText = "🛡️ CIS BENCHMARK PRODUCTION COMPLIANT";
        sealClass = "pass";
      } else if (score >= 80) {
        grade = "B";
        verdictText = "🟡 MINOR SECURITY WARNINGS";
      } else if (score >= 60) {
        grade = "C";
        verdictText = "🟠 SUBOPTIMAL CONTAINER CONFIGURATION";
      } else {
        grade = "F";
        verdictText = "❌ CRITICAL SECURITY VULNERABILITIES";
      }

      if (gradeLetter) gradeLetter.textContent = grade;
      if (gradeScore) gradeScore.textContent = `${score} / 100`;
      if (verdict) verdict.textContent = verdictText;

      if (gradeSeal) {
        gradeSeal.className = `linter-grade-seal ${sealClass}`;
        gradeSeal.style.borderColor = score >= 90 ? "var(--accent-bash)" : (score >= 65 ? "var(--accent-aws)" : "#EF4444");
        gradeSeal.style.color = score >= 90 ? "var(--accent-bash)" : (score >= 65 ? "var(--accent-aws)" : "#EF4444");
        gradeSeal.style.boxShadow = score >= 90 ? "0 0 20px var(--glow-primary)" : "0 0 20px rgba(239, 68, 68, 0.3)";
      }

      if (countCritical) countCritical.textContent = `🔴 ${criticals} Critical`;
      if (countWarning) countWarning.textContent = `🟠 ${warnings} Warnings`;
      if (countPassed) countPassed.textContent = `🟢 ${passed} Passed`;

      if (estSize) {
        estSize.textContent = isDistroless
          ? "Est. Layer Size: ~18.4 MB (Distroless Minimal)"
          : (score < 50 ? "Est. Layer Size: ~840 MB (Unoptimized)" : "Est. Layer Size: ~124 MB (Alpine)");
      }

      box.innerHTML = "";
      if (violations.length === 0) {
        box.innerHTML = `
          <div style="text-align:center; padding: 2.5rem 1rem; color: var(--accent-bash); font-family: var(--font-mono); font-size: 0.85rem;">
            ✓ 0 Vulnerabilities Detected • Ready for Production Kubernetes Deployment
          </div>
        `;
        return;
      }

      violations.forEach(v => {
        const card = document.createElement("div");
        card.className = `violation-card ${v.severity}`;

        const badgeColor = v.severity === "critical" ? "background:rgba(239,68,68,0.2); color:#EF4444;" : "background:rgba(255,138,0,0.2); color:#FF8A00;";

        card.innerHTML = `
          <div class="violation-header">
            <span class="violation-code">${v.code} (${v.cis})</span>
            <span class="violation-badge" style="${badgeColor}">${v.severity.toUpperCase()}</span>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 600; color: #FFFFFF;">${v.title}</div>
          <p class="violation-desc">${v.desc}</p>
          <div class="violation-action-row">
            <span class="violation-line-ref">Line ${v.line} • Recommended: ${v.fix}</span>
            <button type="button" class="btn-apply-fix">Apply Fix 🪄</button>
          </div>
        `;

        card.querySelector(".btn-apply-fix").addEventListener("click", () => {
          v.action();
        });

        box.appendChild(card);
      });
    }

    input.addEventListener("input", runAudit);

    if (presetInsecure) {
      presetInsecure.addEventListener("click", () => {
        presetInsecure.classList.add("active");
        if (presetHardened) presetHardened.classList.remove("active");
        input.value = PRESET_INSECURE;
        runAudit();
      });
    }

    if (presetHardened) {
      presetHardened.addEventListener("click", () => {
        presetHardened.classList.add("active");
        if (presetInsecure) presetInsecure.classList.remove("active");
        input.value = PRESET_HARDENED;
        runAudit();
      });
    }

    if (presetClear) {
      presetClear.addEventListener("click", () => {
        if (presetInsecure) presetInsecure.classList.remove("active");
        if (presetHardened) presetHardened.classList.remove("active");
        input.value = "FROM alpine:3.20\nCMD [\"echo\", \"hello\"]";
        runAudit();
      });
    }

    input.value = PRESET_INSECURE;
    runAudit();
  }

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION ON DOM READY
  // ═══════════════════════════════════════════════════════════════
  function initLabs() {
    initK8sHpaSimulator();
    initHtopMonitor();
    initDockerfileLinter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLabs);
  } else {
    initLabs();
  }
})();
