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
  // INITIALIZATION ON DOM READY
  // ═══════════════════════════════════════════════════════════════
  function initLabs() {
    initK8sHpaSimulator();
    initHtopMonitor();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLabs);
  } else {
    initLabs();
  }
})();
