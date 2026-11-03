/**
 * Uzair Sultan — DevOps & Cloud Infrastructure Portfolio
 * Systems & Cloud Architecture Blueprint Engine
 * ----------------------------------------------------------------------
 * 1. Interactive SVG Architecture Topology Switcher
 * 2. Live Component Inspector & Telemetry Matrix
 * 3. 3D Exploded Docker Multi-Stage Layer Engine
 * 4. Declarative Infrastructure-as-Code (IaC) Viewer
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // 1. TOPOLOGY DATA DICTIONARY
  // ═══════════════════════════════════════════════════════════════
  const systemBlueprints = {
    nexora: {
      title: "Nexora Quick-Commerce Distributed Cloud Topology",
      badge: "K8S MICROSERVICES // MULTI-AZ CLOUD",
      summary: "High-throughput mobile e-commerce platform engineered for sub-30ms cart operations, geographic CDN caching, and zero-downtime rolling deployments.",
      stats: {
        region: "AWS ap-south-1 (Mumbai)",
        ingress: "AWS ALB + NGINX Ingress Controller",
        availability: "99.99% Multi-AZ SLA",
        caching: "Redis Cluster (In-Memory Hot Carts)"
      },
      nodes: {
        client: {
          name: "Mobile Edge Client (Expo / React Native)",
          role: "Client Presentation Layer",
          protocol: "HTTPS / TLS 1.3 • WebSockets",
          redundancy: "Global Distributed Clients (iOS / Android)",
          health: "PWA Service Worker + SQLite Offline Cart Cache",
          metrics: "Avg Render Time: 16ms | Local Cache Hit: 94%"
        },
        cdn: {
          name: "AWS CloudFront Edge Distribution",
          role: "Global Static Asset & Image Acceleration",
          protocol: "Edge TLS 1.3 • HTTP/3 Enabled",
          redundancy: "450+ Points of Presence Worldwide",
          health: "Origin Failover Group to Secondary S3 Bucket",
          metrics: "Edge Cache Hit Ratio: 96.8% | Latency: 12ms"
        },
        alb: {
          name: "AWS Application Load Balancer (ALB)",
          role: "L7 Reverse Proxy & Ingress Traffic Dispatcher",
          protocol: "Port 443 (HTTPS) → Port 80 (Internal Target)",
          redundancy: "Active-Active across ap-south-1a & ap-south-1b",
          health: "HTTP /healthz every 5s • 2 Healthy Threshold",
          metrics: "Capacity: 15,000 req/sec | Ingress Latency: 1.2ms"
        },
        eks: {
          name: "AWS EKS Kubernetes Cluster (v1.30)",
          role: "Container Orchestration & Workload Execution",
          protocol: "Calico CNI • Mutual mTLS Service Mesh",
          redundancy: "Managed Node Groups (Spot + On-Demand)",
          health: "Kubelet Liveness & Readiness Probes (10s)",
          metrics: "Cluster Autoscaler: 3 → 8 Nodes | Pods: 18 Ready"
        },
        redis: {
          name: "Redis Enterprise Cluster (ElastiCache)",
          role: "In-Memory Session & Real-Time Cart State",
          protocol: "RESP3 Protocol • Port 6379 (VPC Peered)",
          redundancy: "Multi-AZ with Automatic Failover Primary/Replica",
          health: "Heartbeat PING every 1s • MaxMemory: allkeys-lru",
          metrics: "Read Latency: 0.35ms | Write Latency: 0.65ms"
        },
        db: {
          name: "Amazon Aurora PostgreSQL (Multi-AZ)",
          role: "System of Record & Transactional Ledger",
          protocol: "PostgreSQL v16 • Port 5432 (Private Subnet)",
          redundancy: "Synchronous Replication to Read Replica",
          health: "Automated Failover < 30s • Daily S3 Snapshots",
          metrics: "IOPS: 3,000 Provisioned | Connection Pool: PgBouncer"
        }
      }
    },

    kkk: {
      title: "Kashmir Kesar Kingdom Global Ingress & Edge Pipeline",
      badge: "GLOBAL E-COMMERCE // 95% ASSET COMPRESSION",
      summary: "Zero-framework, high-efficiency international export storefront optimized for high-latency mobile networks with automated CI/CD and CDN edge caching.",
      stats: {
        region: "Edge Anycast + AWS ap-south-1",
        ingress: "NGINX Reverse Proxy + Rate Limiter",
        availability: "100% Uptime Across 12 Countries",
        caching: "Brotli/Gzip Edge Caching + Service Worker"
      },
      nodes: {
        client: {
          name: "International Shoppers (Global Browser)",
          role: "Zero-Framework Modular Web Client",
          protocol: "HTTPS / TLS 1.3 • Modern ES6+ Native",
          redundancy: "Multi-Region Shopper Edge Traffic",
          health: "Zero Runtime Dependencies • Instant DOM Render",
          metrics: "Lighthouse Performance: 99/100 • First Paint: 0.4s"
        },
        dns: {
          name: "Route 53 & Cloudflare Anycast DNS",
          role: "Geo-Proximity Routing & DDoS Shield",
          protocol: "DNS over HTTPS (DoH) • Anycast BGP",
          redundancy: "Global Anycast Edge Network",
          health: "Sub-millisecond DNS Resolution Failover",
          metrics: "Global DNS Lookup: ~8ms • DDoS Scrubbing Active"
        },
        nginx: {
          name: "Hardened NGINX Reverse Proxy",
          role: "Brotli Compression, Security Headers & Rate Limiting",
          protocol: "HTTP/2 • Port 443 with HSTS & CSP",
          redundancy: "Dual NGINX Gateway Instances (Keepalived)",
          health: "Systemd watchdog • Active worker connection audit",
          metrics: "Asset Compression: 95% ratio • Memory: < 45MB"
        },
        currency: {
          name: "Dynamic Multi-Currency Converter Engine",
          role: "Real-Time Exchange Telemetry & Geo-IP Pricing",
          protocol: "REST API • In-Memory LocalStorage Cache",
          redundancy: "Fallback to Cached Daily Forex Rates",
          health: "API Rate-Limited Fallback Circuit Breaker",
          metrics: "Conversion Latency: < 1ms • 14 Currencies InSync"
        },
        storage: {
          name: "AWS S3 Cloud Storage Bucket",
          role: "Immutable High-Resolution Product Media Storage",
          protocol: "Signed S3 URLs • SSE-S3 AES-256 Encryption",
          redundancy: "Cross-Region S3 Replication (CRR)",
          health: "99.999999999% (11 9s) Data Durability",
          metrics: "Assets Served: 50,000+ • Zero Byte Loss"
        }
      }
    },

    sysinspect: {
      title: "sys-inspect Linux Kernel Telemetry & Socket Pipeline",
      badge: "SYSTEMS TELEMETRY // LINUX KERNEL DAEMON",
      summary: "Lightweight systems inspection utility probing raw /proc and /sys pseudo-filesystems to calculate CPU runqueue saturation and audit open socket states.",
      stats: {
        region: "Linux Kernel Host Level (Bare Metal / VM)",
        ingress: "Unix Domain Sockets & Local CLI",
        availability: "Sub-millisecond Kernel Inspection",
        caching: "Direct Memory Buffer & TSDB Exporter"
      },
      nodes: {
        kernel: {
          name: "Linux OS Kernel (/proc & /sys Primitives)",
          role: "Kernel Virtual Filesystem & Process State Table",
          protocol: "Direct POSIX VFS Syscalls (open, read, close)",
          redundancy: "OS-Level Kernel Core Architecture",
          health: "Non-blocking sysctl /proc/stat probe",
          metrics: "Probe Latency: 0.12ms | Zero Context Switches"
        },
        daemon: {
          name: "sys-inspect CLI Telemetry Daemon",
          role: "Metrics Aggregation, Zombie Detection & Socket Audit",
          protocol: "Native Bash & POSIX C Shell Execution",
          redundancy: "Systemd User/System Service Supervision",
          health: "Automatic Restart on Failure (Restart=on-failure)",
          metrics: "Binary Memory Footprint: < 8MB | CPU Overhead: 0.1%"
        },
        exporter: {
          name: "Prometheus Metric Exporter Endpoint",
          role: "OpenTelemetry & Prometheus Standard Matrix",
          protocol: "HTTP /metrics • Plaintext Exposition Format",
          redundancy: "Scraped by Local or Remote Prometheus Server",
          health: "Scrape Interval: 15s • Probe Timeout: 2s",
          metrics: "Custom Metrics: 42 system keys exported"
        },
        grafana: {
          name: "Grafana Real-Time Operations HUD",
          role: "Telemetry Dashboard & Alertmanager Dispatcher",
          protocol: "HTTPS Webhooks • Prometheus PromQL Queries",
          redundancy: "Persistent Dashboard State in SQLite/PostgreSQL",
          health: "Alert Rules: CPU > 85%, Zombie Procs > 0",
          metrics: "Refresh Rate: 5s • Instant P99 Saturation Alert"
        }
      }
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // 2. TOPOLOGY SWITCHER ENGINE
  // ═══════════════════════════════════════════════════════════════
  function initTopologySwitcher() {
    const tabs = document.querySelectorAll(".arch-system-tab");
    const containers = document.querySelectorAll(".topology-diagram-container");
    const sysTitle = document.getElementById("activeSystemTitle");
    const sysBadge = document.getElementById("activeSystemBadge");
    const sysSummary = document.getElementById("activeSystemSummary");
    const statRegion = document.getElementById("statRegion");
    const statIngress = document.getElementById("statIngress");
    const statAvailability = document.getElementById("statAvailability");
    const statCaching = document.getElementById("statCaching");

    if (!tabs.length) return;

    function switchSystem(systemKey) {
      const data = systemBlueprints[systemKey];
      if (!data) return;

      // Update tabs
      tabs.forEach((t) => {
        if (t.getAttribute("data-system") === systemKey) {
          t.classList.add("active");
        } else {
          t.classList.remove("active");
        }
      });

      // Update diagram visibility
      containers.forEach((c) => {
        if (c.getAttribute("data-system") === systemKey) {
          c.classList.add("active");
        } else {
          c.classList.remove("active");
        }
      });

      // Update textual telemetry
      if (sysTitle) sysTitle.textContent = data.title;
      if (sysBadge) sysBadge.textContent = data.badge;
      if (sysSummary) sysSummary.textContent = data.summary;
      if (statRegion) statRegion.textContent = data.stats.region;
      if (statIngress) statIngress.textContent = data.stats.ingress;
      if (statAvailability) statAvailability.textContent = data.stats.availability;
      if (statCaching) statCaching.textContent = data.stats.caching;

      // Set default inspector to first node
      const firstNodeKey = Object.keys(data.nodes)[0];
      if (firstNodeKey) {
        updateInspector(systemKey, firstNodeKey);
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const sys = tab.getAttribute("data-system");
        switchSystem(sys);
      });
    });

    // Check URL hash on page load (#topology-nexora, #topology-kkk, #topology-sysinspect)
    const hash = window.location.hash.replace("#topology-", "").toLowerCase();
    if (hash && systemBlueprints[hash]) {
      switchSystem(hash);
    } else {
      switchSystem("nexora");
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. NODE TELEMETRY INSPECTOR ENGINE
  // ═══════════════════════════════════════════════════════════════
  function updateInspector(systemKey, nodeKey) {
    const data = systemBlueprints[systemKey];
    if (!data || !data.nodes[nodeKey]) return;

    const node = data.nodes[nodeKey];

    const elName = document.getElementById("inspectNodeName");
    const elRole = document.getElementById("inspectNodeRole");
    const elProtocol = document.getElementById("inspectNodeProtocol");
    const elRedundancy = document.getElementById("inspectNodeRedundancy");
    const elHealth = document.getElementById("inspectNodeHealth");
    const elMetrics = document.getElementById("inspectNodeMetrics");

    if (elName) elName.textContent = node.name;
    if (elRole) elRole.textContent = node.role;
    if (elProtocol) elProtocol.textContent = node.protocol;
    if (elRedundancy) elRedundancy.textContent = node.redundancy;
    if (elHealth) elHealth.textContent = node.health;
    if (elMetrics) elMetrics.textContent = node.metrics;

    // Highlight node on SVG
    document.querySelectorAll(".topo-node").forEach((n) => {
      if (n.getAttribute("data-node") === nodeKey) {
        n.classList.add("active");
      } else {
        n.classList.remove("active");
      }
    });
  }

  function initNodeClickHandlers() {
    document.querySelectorAll(".topo-node").forEach((nodeEl) => {
      nodeEl.addEventListener("click", function () {
        const parentContainer = this.closest(".topology-diagram-container");
        const systemKey = parentContainer ? parentContainer.getAttribute("data-system") : "nexora";
        const nodeKey = this.getAttribute("data-node");
        updateInspector(systemKey, nodeKey);
      });

      nodeEl.addEventListener("pointerenter", function () {
        const parentContainer = this.closest(".topology-diagram-container");
        const systemKey = parentContainer ? parentContainer.getAttribute("data-system") : "nexora";
        const nodeKey = this.getAttribute("data-node");
        updateInspector(systemKey, nodeKey);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. 3D DOCKER MULTI-STAGE LAYER EXPLODER
  // ═══════════════════════════════════════════════════════════════
  function initDockerLayerExploder() {
    const layerCards = document.querySelectorAll(".docker-layer-slab");
    const infoHeader = document.getElementById("dockerLayerName");
    const infoSize = document.getElementById("dockerLayerSize");
    const infoPurpose = document.getElementById("dockerLayerPurpose");
    const infoSecurity = document.getElementById("dockerLayerSecurity");

    if (!layerCards.length) return;

    const layerMeta = {
      base: {
        name: "Stage 0: Base Operating System (Alpine v3.20.2 Minimal)",
        size: "5.42 MB",
        purpose: "Clean, stripped Alpine Linux root filesystem with minimal attack surface.",
        security: "Zero vulnerabilities • CVE Scanner: Passed (0 issues)"
      },
      builder: {
        name: "Stage 1: Multi-Stage Compiler & Build Toolchain",
        size: "385 MB (Purged from final image)",
        purpose: "Compiles source code, links static C/Go binaries, and optimizes assets.",
        security: "Compilers and headers completely discarded in final OCI artifact."
      },
      distroless: {
        name: "Stage 2: Google Distroless Non-Root Runtime Base",
        size: "2.38 MB",
        purpose: "Contains only application dependencies and SSL certificates. No bash, no curl, no package manager.",
        security: "Immune to arbitrary command execution exploits (zero shell binaries)."
      },
      binary: {
        name: "Stage 3: Statically Linked Application Binary (UID 10001)",
        size: "11.75 MB",
        purpose: "Stripped production binary executed under non-root unprivileged security context.",
        security: "Read-only root filesystem enabled • All Linux capabilities dropped (`drop: ALL`)."
      }
    };

    layerCards.forEach((card) => {
      card.addEventListener("click", () => {
        layerCards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");

        const key = card.getAttribute("data-layer");
        const meta = layerMeta[key];
        if (!meta) return;

        if (infoHeader) infoHeader.textContent = meta.name;
        if (infoSize) infoSize.textContent = `Size: ${meta.size}`;
        if (infoPurpose) infoPurpose.textContent = meta.purpose;
        if (infoSecurity) infoSecurity.textContent = meta.security;
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. DECLARATIVE INFRASTRUCTURE-AS-CODE (IaC) VIEWER
  // ═══════════════════════════════════════════════════════════════
  function initIaCViewer() {
    const tabs = document.querySelectorAll(".iac-file-tab");
    const panes = document.querySelectorAll(".iac-code-pane");
    const copyBtn = document.getElementById("copyIaCBtn");

    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const file = tab.getAttribute("data-file");

        tabs.forEach((t) => t.classList.remove("active"));
        panes.forEach((p) => p.classList.remove("active"));

        tab.classList.add("active");
        const activePane = document.getElementById(`iac-${file}`);
        if (activePane) activePane.classList.add("active");
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const activePane = document.querySelector(".iac-code-pane.active code");
        if (!activePane) return;

        const text = activePane.innerText || activePane.textContent;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = "Copied! ✓";
            setTimeout(() => {
              copyBtn.textContent = "Copy Manifest 📋";
            }, 2000);
          });
        }
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION ON DOM READY
  // ═══════════════════════════════════════════════════════════════
  function initArchitectureSuite() {
    initTopologySwitcher();
    initNodeClickHandlers();
    initDockerLayerExploder();
    initIaCViewer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initArchitectureSuite);
  } else {
    initArchitectureSuite();
  }
})();
