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
  // 5. OPENTELEMETRY DISTRIBUTED TRACE WATERFALL ENGINE
  // ═══════════════════════════════════════════════════════════════
  function initDistributedTraceEngine() {
    const scenarioBtns = document.querySelectorAll(".trace-pill-btn");
    const faultBtns = document.querySelectorAll(".trace-fault-btn");
    const metaId = document.getElementById("traceMetaId");
    const metaDuration = document.getElementById("traceMetaDuration");
    const metaSpans = document.getElementById("traceMetaSpans");
    const metaStatus = document.getElementById("traceMetaStatus");
    const spansList = document.getElementById("traceSpansList");
    const ruler = document.getElementById("traceRuler");

    const drawer = document.getElementById("traceSpanDrawer");
    const drawerTitle = document.getElementById("drawerSpanTitle");
    const drawerDuration = document.getElementById("drawerSpanDuration");
    const drawerGrid = document.getElementById("drawerAttrGrid");

    if (!spansList) return;

    let currentScenario = "checkout";
    let currentFault = "normal";

    const TRACE_DATA = {
      checkout: {
        id: "4bf92f3577b34da6a3ce929d0e0e4736",
        normal: {
          totalDuration: 38.4,
          status: "200 OK (HTTP/2)",
          spans: [
            { id: "s1", name: "ingress-gateway: POST /checkout", service: "Cloudflare / ALB", depth: 0, start: 0, duration: 38.4, color: "#38BDF8",
              attrs: { "http.method": "POST", "http.route": "/checkout", "http.status_code": "200", "net.peer.ip": "157.240.22.35", "tls.cipher": "TLS_AES_128_GCM_SHA256", "span.kind": "SERVER" } },
            { id: "s2", name: "envoy-proxy: route_cluster", service: "Envoy L7 Mesh", depth: 1, start: 1.8, duration: 34.6, color: "#00F5A0",
              attrs: { "envoy.route": "order_service_cluster", "cluster.name": "k8s-pod-vpc", "upstream.local_address": "10.0.12.84:8080", "span.kind": "INTERNAL" } },
            { id: "s3", name: "auth-service: jwt_verify_claims", service: "Go Auth0 Pod", depth: 2, start: 3.2, duration: 5.8, color: "#A855F7",
              attrs: { "auth.type": "RS256 Bearer", "auth.claims.sub": "usr_99812", "rpc.method": "VerifyToken", "span.kind": "SERVER" } },
            { id: "s4", name: "redis-cluster: GET session:usr_99812", service: "Redis In-Memory", depth: 3, start: 4.8, duration: 1.2, color: "#FF8A00",
              attrs: { "db.system": "redis", "db.operation": "GET", "db.redis.flags": "CACHE_HIT", "net.peer.name": "redis-prod.ap-south-1.cache.aws", "span.kind": "CLIENT" } },
            { id: "s5", name: "order-service: process_payment_txn", service: "Node / K8s Pod", depth: 2, start: 10.2, duration: 25.4, color: "#38BDF8",
              attrs: { "order.id": "ord_8849102", "order.currency": "INR", "order.total": "4,299", "k8s.pod.name": "order-service-78b9c-x24", "span.kind": "SERVER" } },
            { id: "s6", name: "postgres-aurora: INSERT INTO orders", service: "PostgreSQL 16", depth: 3, start: 13.5, duration: 12.4, color: "#FF8A00",
              attrs: { "db.system": "postgresql", "db.statement": "INSERT INTO orders (id, user_id, amount) VALUES ($1, $2, $3) RETURNING id;", "db.name": "nexora_prod", "span.kind": "CLIENT" } },
            { id: "s7", name: "kafka-cluster: emit OrderCreated", service: "Apache Kafka", depth: 3, start: 29.8, duration: 2.8, color: "#A855F7",
              attrs: { "messaging.system": "kafka", "messaging.destination": "orders.v1.events", "messaging.partition": "2", "span.kind": "PRODUCER" } }
          ]
        },
        slow: {
          totalDuration: 412.8,
          status: "200 OK (⚠️ p99 Latency Spill)",
          spans: [
            { id: "s1", name: "ingress-gateway: POST /checkout", service: "Cloudflare / ALB", depth: 0, start: 0, duration: 412.8, color: "#FF8A00",
              attrs: { "http.method": "POST", "http.status_code": "200", "trace.warning": "p99 latency threshold exceeded (>100ms)", "span.kind": "SERVER" } },
            { id: "s2", name: "envoy-proxy: route_cluster", service: "Envoy L7 Mesh", depth: 1, start: 2.2, duration: 408.2, color: "#FF8A00",
              attrs: { "envoy.route": "order_service_cluster", "span.kind": "INTERNAL" } },
            { id: "s3", name: "auth-service: jwt_verify_claims", service: "Go Auth0 Pod", depth: 2, start: 3.5, duration: 6.1, color: "#00F5A0",
              attrs: { "auth.type": "RS256 Bearer", "span.kind": "SERVER" } },
            { id: "s4", name: "redis-cluster: GET session:usr_99812", service: "Redis In-Memory", depth: 3, start: 5.1, duration: 1.4, color: "#00F5A0",
              attrs: { "db.system": "redis", "span.kind": "CLIENT" } },
            { id: "s5", name: "order-service: process_payment_txn", service: "Node / K8s Pod", depth: 2, start: 11.2, duration: 396.4, color: "#FF8A00",
              attrs: { "order.id": "ord_8849102", "span.kind": "SERVER" } },
            { id: "s6", name: "postgres-aurora: INSERT INTO orders (ROW LOCK CONTENTION)", service: "PostgreSQL 16", depth: 3, start: 14.8, duration: 382.6, color: "#EF4444",
              attrs: { "db.system": "postgresql", "db.statement": "SELECT * FROM inventory WHERE item_id = $1 FOR UPDATE;", "db.warning": "Lock wait timeout avoidance / vacuum lock", "span.kind": "CLIENT" } },
            { id: "s7", name: "kafka-cluster: emit OrderCreated", service: "Apache Kafka", depth: 3, start: 404.2, duration: 3.4, color: "#A855F7",
              attrs: { "messaging.destination": "orders.v1.events", "span.kind": "PRODUCER" } }
          ]
        },
        timeout: {
          totalDuration: 1520.0,
          status: "504 GATEWAY TIMEOUT ❌",
          spans: [
            { id: "s1", name: "ingress-gateway: POST /checkout", service: "Cloudflare / ALB", depth: 0, start: 0, duration: 1520.0, color: "#EF4444",
              attrs: { "http.method": "POST", "http.status_code": "504", "error": "Gateway Timeout", "span.kind": "SERVER" } },
            { id: "s2", name: "envoy-proxy: route_cluster", service: "Envoy L7 Mesh", depth: 1, start: 2.5, duration: 1512.0, color: "#EF4444",
              attrs: { "envoy.error": "upstream_request_timeout", "envoy.circuit_breaker": "OPEN", "span.kind": "INTERNAL" } },
            { id: "s3", name: "payment-gateway: POST /v1/charges (Attempt 1)", service: "Stripe API Client", depth: 2, start: 10.0, duration: 500.0, color: "#EF4444",
              attrs: { "http.status_code": "ETIMEDOUT", "retry.count": "1/3", "span.kind": "CLIENT" } },
            { id: "s4", name: "payment-gateway: POST /v1/charges (Backoff Retry 2)", service: "Stripe API Client", depth: 2, start: 512.0, duration: 1000.0, color: "#EF4444",
              attrs: { "http.status_code": "ECONNRESET", "retry.count": "2/3", "circuit.state": "TRIPPED", "span.kind": "CLIENT" } }
          ]
        }
      },
      auth: {
        id: "77d298aa90c411ba24fef01a88bb9910",
        normal: {
          totalDuration: 18.2,
          status: "200 OK (HTTP/2)",
          spans: [
            { id: "a1", name: "ingress-alb: POST /auth/token", service: "AWS ALB", depth: 0, start: 0, duration: 18.2, color: "#38BDF8",
              attrs: { "http.method": "POST", "http.status_code": "200", "span.kind": "SERVER" } },
            { id: "a2", name: "auth-gateway: rate_limit_check", service: "Envoy RateLimiter", depth: 1, start: 1.2, duration: 2.4, color: "#00F5A0",
              attrs: { "ratelimit.remaining": "98", "ratelimit.limit": "100", "span.kind": "INTERNAL" } },
            { id: "a3", name: "vault-kms: sign_jwt_ed25519", service: "HashiCorp Vault", depth: 1, start: 4.8, duration: 9.8, color: "#A855F7",
              attrs: { "kms.key_id": "kms-jwt-ed25519-v2", "crypto.algorithm": "Ed25519", "span.kind": "CLIENT" } },
            { id: "a4", name: "redis: SETEX refresh_token", service: "Redis Cluster", depth: 1, start: 15.4, duration: 1.8, color: "#FF8A00",
              attrs: { "db.operation": "SETEX", "db.ttl": "604800", "span.kind": "CLIENT" } }
          ]
        },
        slow: {
          totalDuration: 280.4,
          status: "200 OK (KMS Latency)",
          spans: [
            { id: "a1", name: "ingress-alb: POST /auth/token", service: "AWS ALB", depth: 0, start: 0, duration: 280.4, color: "#FF8A00",
              attrs: { "http.method": "POST", "span.kind": "SERVER" } },
            { id: "a2", name: "vault-kms: sign_jwt_ed25519", service: "HashiCorp Vault", depth: 1, start: 3.4, duration: 272.0, color: "#FF8A00",
              attrs: { "kms.warning": "Hardware Security Module (HSM) entropy replenishment wait", "span.kind": "CLIENT" } }
          ]
        },
        timeout: {
          totalDuration: 1000.0,
          status: "503 SERVICE UNAVAILABLE ❌",
          spans: [
            { id: "a1", name: "ingress-alb: POST /auth/token", service: "AWS ALB", depth: 0, start: 0, duration: 1000.0, color: "#EF4444",
              attrs: { "http.status_code": "503", "error": "Auth Provider Unreachable", "span.kind": "SERVER" } }
          ]
        }
      },
      metrics: {
        id: "99ea0144f88c9910d55e88419bcf1234",
        normal: {
          totalDuration: 14.5,
          status: "200 OK (HTTP/2)",
          spans: [
            { id: "m1", name: "prometheus-agent: GET /telemetry", service: "Prometheus Collector", depth: 0, start: 0, duration: 14.5, color: "#38BDF8",
              attrs: { "http.route": "/telemetry", "span.kind": "SERVER" } },
            { id: "m2", name: "sys-inspect: scrape_kernel_vfs", service: "sys-inspect Daemon", depth: 1, start: 1.5, duration: 7.2, color: "#00F5A0",
              attrs: { "vfs.path": "/proc/net/tcp", "metrics.count": "184", "span.kind": "INTERNAL" } },
            { id: "m3", name: "cgroup-parser: mem_cpu_metrics", service: "CGroup v2 Controller", depth: 2, start: 3.2, duration: 3.8, color: "#A855F7",
              attrs: { "cgroup.version": "v2", "span.kind": "INTERNAL" } },
            { id: "m4", name: "tsdb: write_wal_block", service: "Prometheus TSDB", depth: 1, start: 9.8, duration: 4.2, color: "#FF8A00",
              attrs: { "tsdb.series_added": "64", "wal.fsync": "true", "span.kind": "CLIENT" } }
          ]
        },
        slow: {
          totalDuration: 185.0,
          status: "200 OK (TSDB Disk Flush Delay)",
          spans: [
            { id: "m1", name: "prometheus-agent: GET /telemetry", service: "Prometheus Collector", depth: 0, start: 0, duration: 185.0, color: "#FF8A00",
              attrs: { "http.status_code": "200", "span.kind": "SERVER" } },
            { id: "m4", name: "tsdb: write_wal_block (EBS IOPS Throttled)", service: "Prometheus TSDB", depth: 1, start: 4.2, duration: 178.0, color: "#FF8A00",
              attrs: { "io.warning": "gp3 volume baseline IOPS burst exhausted", "span.kind": "CLIENT" } }
          ]
        },
        timeout: {
          totalDuration: 800.0,
          status: "504 SCRAPE TIMEOUT ❌",
          spans: [
            { id: "m1", name: "prometheus-agent: GET /telemetry", service: "Prometheus Collector", depth: 0, start: 0, duration: 800.0, color: "#EF4444",
              attrs: { "http.status_code": "504", "error": "Context Deadline Exceeded (800ms)", "span.kind": "SERVER" } }
          ]
        }
      }
    };

    function updateRuler(totalTime) {
      if (!ruler) return;
      const step = totalTime / 4;
      ruler.innerHTML = `
        <span>0ms</span>
        <span>${(step).toFixed(1)}ms</span>
        <span>${(step * 2).toFixed(1)}ms</span>
        <span>${(step * 3).toFixed(1)}ms</span>
        <span>${totalTime.toFixed(1)}ms</span>
      `;
    }

    function renderTrace() {
      const scenario = TRACE_DATA[currentScenario] || TRACE_DATA.checkout;
      const data = scenario[currentFault] || scenario.normal;

      if (metaId) metaId.textContent = scenario.id.substring(0, 16) + '...';
      if (metaDuration) {
        metaDuration.textContent = `${data.totalDuration.toFixed(1)} ms`;
        metaDuration.style.color = currentFault === "normal" ? "var(--accent-bash)" : (currentFault === "slow" ? "var(--accent-aws)" : "#EF4444");
      }
      if (metaSpans) metaSpans.textContent = `${data.spans.length} Spans (${new Set(data.spans.map(s => s.service)).size} Services)`;
      if (metaStatus) {
        metaStatus.textContent = data.status;
        metaStatus.style.color = currentFault === "normal" ? "var(--accent-bash)" : (currentFault === "slow" ? "var(--accent-aws)" : "#EF4444");
      }

      updateRuler(data.totalDuration);

      spansList.innerHTML = "";

      data.spans.forEach((span, index) => {
        const leftPercent = (span.start / data.totalDuration) * 100;
        const widthPercent = Math.max((span.duration / data.totalDuration) * 100, 3.5);

        const row = document.createElement("div");
        row.className = `trace-span-row ${index === 0 ? "active" : ""}`;
        row.setAttribute("data-span-id", span.id);

        const indentSpaces = "&nbsp;".repeat(span.depth * 3);
        const branchSymbol = span.depth > 0 ? "└──&nbsp;" : "";

        row.innerHTML = `
          <div class="trace-span-info">
            <span class="trace-span-depth">${indentSpaces}${branchSymbol}</span>
            <span class="trace-service-badge" style="border-color: ${span.color}; color: ${span.color};">${span.service}</span>
            <span class="trace-span-name" title="${span.name}">${span.name.split(': ')[1] || span.name}</span>
          </div>
          <div class="trace-bar-track">
            <div class="trace-bar-fill" style="left: ${leftPercent}%; width: ${widthPercent}%; background-color: ${span.color};">
              <span>${span.duration.toFixed(1)}ms</span>
            </div>
          </div>
        `;

        row.addEventListener("click", () => {
          document.querySelectorAll(".trace-span-row").forEach(r => r.classList.remove("active"));
          row.classList.add("active");
          showSpanDetails(span, data.totalDuration);
        });

        spansList.appendChild(row);
      });

      if (data.spans.length > 0) {
        showSpanDetails(data.spans[0], data.totalDuration);
      }
    }

    function showSpanDetails(span, totalDuration) {
      if (!drawer) return;
      drawer.classList.add("active");

      if (drawerTitle) drawerTitle.textContent = `${span.service}: ${span.name}`;
      if (drawerDuration) {
        const pct = ((span.duration / totalDuration) * 100).toFixed(1);
        drawerDuration.textContent = `${span.duration.toFixed(1)} ms (${pct}% of total trace)`;
        drawerDuration.style.borderColor = span.color;
        drawerDuration.style.color = span.color;
      }

      if (drawerGrid) {
        let attrsHTML = `
          <div class="trace-attr-item">
            <span class="trace-attr-key">span.id</span>
            <span class="trace-attr-val">${span.id}_${Math.random().toString(36).substr(2, 9)}</span>
          </div>
          <div class="trace-attr-item">
            <span class="trace-attr-key">service.name</span>
            <span class="trace-attr-val">${span.service}</span>
          </div>
          <div class="trace-attr-item">
            <span class="trace-attr-key">traceparent (W3C)</span>
            <span class="trace-attr-val">00-4bf92f3577b34da6a3ce929d0e0e4736-${span.id}00000000-01</span>
          </div>
        `;

        Object.keys(span.attrs || {}).forEach(k => {
          attrsHTML += `
            <div class="trace-attr-item">
              <span class="trace-attr-key">${k}</span>
              <span class="trace-attr-val">${span.attrs[k]}</span>
            </div>
          `;
        });

        drawerGrid.innerHTML = attrsHTML;
      }
    }

    scenarioBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        scenarioBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentScenario = btn.getAttribute("data-scenario");
        renderTrace();
      });
    });

    faultBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        faultBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFault = btn.getAttribute("data-fault");
        renderTrace();
      });
    });

    renderTrace();
  }

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION ON DOM READY
  // ═══════════════════════════════════════════════════════════════
  function initArchitectureSuite() {
    initTopologySwitcher();
    initNodeClickHandlers();
    initDockerLayerExploder();
    initIaCViewer();
    initDistributedTraceEngine();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initArchitectureSuite);
  } else {
    initArchitectureSuite();
  }
})();
