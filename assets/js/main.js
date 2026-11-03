/**
 * Uzair Sultan — DevOps & Cloud Infrastructure Portfolio
 * Phase 5: Cinematic Motion (GSAP, ScrollTrigger & Lenis)
 * ----------------------------------------------------------------------
 * 1. 60FPS Interactive HTML5 Network Topology Canvas (#network-bg)
 * 2. Interactive macOS/Linux Terminal Emulator (#terminal-input & #terminal-output)
 * 3. 1-Click Command Pills Dispatcher (.pill-cmd-btn)
 * 4. Lenis Smooth Scrolling Orchestration
 * 5. GSAP Hero Entrance Timeline Choreography
 * 6. 3D Magnetic Avatar Tilt (Vanilla JS + GSAP)
 * 7. Bento Grid & Projects ScrollTrigger (Cascade Reveal)
 * 8. Responsive Performance via gsap.matchMedia()
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // 1. CLOUD NETWORK TOPOLOGY BACKGROUND CANVAS (GOD-TIER ENGINE)
  // ═══════════════════════════════════════════════════════════════
  function initNetworkTopologyCanvas() {
    const canvas = document.getElementById("network-bg");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 18 : 64;
    const maxDistance = isMobile ? 90 : 140;

    let mouse = { x: -9999, y: -9999, vx: 0, vy: 0, lastX: 0, lastY: 0 };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Track mouse on desktop for magnetic deflection & 3D parallax
    window.addEventListener("pointermove", (e) => {
      mouse.vx = e.clientX - (mouse.lastX || e.clientX);
      mouse.vy = e.clientY - (mouse.lastY || e.clientY);
      mouse.lastX = mouse.x = e.clientX;
      mouse.lastY = mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener("pointerleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    // Color palette: Cyber Emerald (#00F5A0), Electric Cyan (#38BDF8), Tech Violet (#818CF8), Cloud Amber (#FF8A00)
    const palette = [
      { r: 0, g: 245, b: 160 },   // Cyber Emerald
      { r: 56, g: 189, b: 248 },  // Electric Cyan
      { r: 129, g: 140, b: 248 }, // Tech Violet
      { r: 255, g: 138, b: 0 }    // Cloud Amber
    ];

    // ── 1. Cloud Network Node Particles ──────────────────────────
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const col = palette[i % 2];
      particles.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        baseVx: (Math.random() - 0.5) * 0.45,
        baseVy: (Math.random() - 0.5) * 0.45,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        color: col
      });
    }

    // ── 2. Quantum Telemetry Stardust Field ───────────────────────
    const stardustCount = isMobile ? 12 : 44;
    const stardust = [];
    for (let s = 0; s < stardustCount; s++) {
      stardust.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        r: Math.random() * 0.8 + 0.6,
        baseVy: -(Math.random() * 0.25 + 0.1),
        vy: -(Math.random() * 0.25 + 0.1),
        vx: 0,
        seed: Math.random() * Math.PI * 2,
        color: palette[s % palette.length]
      });
    }

    // ── 3. Ascending Telemetry Matrix Glyphs ───────────────────────
    const glyphWords = [
      "SYN", "ACK", "0x7F", "200 OK", "10.0.1.1", "λ", "TCP/IP",
      "OCI", "v1.30.2", "443/TLS", "UDP", "ETag", "99.99%", "git commit", "HEALTHY"
    ];
    const glyphCount = isMobile ? 4 : 13;
    const glyphs = [];
    for (let g = 0; g < glyphCount; g++) {
      glyphs.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        vy: -(Math.random() * 0.35 + 0.22),
        text: glyphWords[g % glyphWords.length],
        color: palette[g % palette.length],
        pulse: Math.random() * Math.PI * 2
      });
    }

    // ── 4. 3D Floating Isometric Polyhedra (Dual: Cubes & Octahedrons) ──
    const cubeVertices = [
      [-1, -1, -1], [ 1, -1, -1], [ 1,  1, -1], [-1,  1, -1],
      [-1, -1,  1], [ 1, -1,  1], [ 1,  1,  1], [-1,  1,  1]
    ];
    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    const octaVertices = [
      [ 0, -1.25,  0],
      [ 1,  0,     0],
      [ 0,  0,     1],
      [-1,  0,     0],
      [ 0,  0,    -1],
      [ 0,  1.25,  0]
    ];
    const octaEdges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 2], [2, 3], [3, 4], [4, 1],
      [5, 1], [5, 2], [5, 3], [5, 4]
    ];

    const polyhedraCount = isMobile ? 1 : 7;
    const polyhedra = [];
    for (let p = 0; p < polyhedraCount; p++) {
      const isCube = p % 2 === 0;
      polyhedra.push({
        type: isCube ? "cube" : "octa",
        vertices: isCube ? cubeVertices : octaVertices,
        edges: isCube ? cubeEdges : octaEdges,
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        z: Math.random() * 240 + 150,
        size: isCube ? (Math.random() * 16 + (isMobile ? 18 : 28)) : (Math.random() * 14 + (isMobile ? 16 : 24)),
        rx: Math.random() * Math.PI * 2,
        ry: Math.random() * Math.PI * 2,
        rz: Math.random() * Math.PI * 2,
        vrx: (Math.random() - 0.5) * 0.007 + 0.003,
        vry: (Math.random() - 0.5) * 0.007 + 0.004,
        vrz: (Math.random() - 0.5) * 0.005,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -(Math.random() * 0.25 + 0.14),
        color: palette[p % palette.length],
        pulse: Math.random() * Math.PI * 2
      });
    }

    function project3D(v, poly, parallaxX, parallaxY) {
      const [vx, vy, vz] = v;
      const s = poly.size;
      const x0 = vx * s;
      const y0 = vy * s;
      const z0 = vz * s;

      const cx = Math.cos(poly.rx), sx = Math.sin(poly.rx);
      const y1 = y0 * cx - z0 * sx;
      const z1 = y0 * sx + z0 * cx;

      const cy = Math.cos(poly.ry), sy = Math.sin(poly.ry);
      const x2 = x0 * cy + z1 * sy;
      const z2 = -x0 * sy + z1 * cy;

      const cz = Math.cos(poly.rz), sz = Math.sin(poly.rz);
      const x3 = x2 * cz - y1 * sz;
      const y3 = x2 * sz + y1 * cz;

      const fov = 350;
      const totalZ = z2 + poly.z;
      const scale = fov / (fov + totalZ);

      return {
        x: (poly.x + parallaxX) + x3 * scale,
        y: (poly.y + parallaxY) + y3 * scale,
        z: totalZ,
        scale: scale
      };
    }

    // ── 5. Photon Data Packets & Hexagonal Radar Waves ───────────
    const packets = [];
    const maxPackets = isMobile ? 6 : 14;

    function spawnPacket(p1Index, p2Index, color) {
      if (packets.length >= maxPackets) return;
      packets.push({
        from: p1Index,
        to: p2Index,
        progress: 0,
        speed: Math.random() * 0.02 + 0.015,
        color: color
      });
    }

    const ripples = [];
    let frameCount = 0;

    function spawnRipple(x, y, color) {
      if (ripples.length >= 4) return;
      ripples.push({
        x: x,
        y: y,
        radius: 4,
        maxRadius: Math.random() * 25 + 45,
        alpha: 0.6,
        color: color
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      frameCount++;

      const hasMouse = mouse.x > 0 && mouse.y > 0;
      const mouseParallaxX = hasMouse ? (mouse.x - width / 2) * 0.025 : 0;
      const mouseParallaxY = hasMouse ? (mouse.y - height / 2) * 0.025 : 0;

      // ── Liquid Floating Wave Ribbons (Desktop High-Power) ────
      if (!isMobile) {
        const waveTime = frameCount * 0.015;
        ctx.beginPath();
        ctx.moveTo(0, height * 0.35);
        for (let x = 0; x <= width; x += 25) {
          const y = height * 0.35 + Math.sin(x * 0.003 + waveTime) * 45 + Math.cos(x * 0.006 + waveTime * 0.8) * 25;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, height * 0.68);
        for (let x = 0; x <= width; x += 25) {
          const y = height * 0.68 + Math.sin(x * 0.0025 - waveTime * 0.9) * 55 + Math.cos(x * 0.005 + waveTime * 0.5) * 30;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(0, 245, 160, 0.12)";
        ctx.lineWidth = 3.5;
        ctx.stroke();
      }

      // ── A. Render 3D Floating Polyhedra (Depth Layer 2) ────────
      for (let p = 0; p < polyhedra.length; p++) {
        const poly = polyhedra[p];
        poly.rx += poly.vrx;
        poly.ry += poly.vry;
        poly.rz += poly.vrz;
        poly.pulse += 0.02;

        poly.x += poly.vx;
        poly.y += poly.vy;

        if (poly.y < -120) {
          poly.y = height + 100;
          poly.x = Math.random() * width;
        } else if (poly.y > height + 120) {
          poly.y = -100;
          poly.x = Math.random() * width;
        }
        if (poly.x < -120) poly.x = width + 100;
        else if (poly.x > width + 120) poly.x = -100;

        const projected = poly.vertices.map((v) => project3D(v, poly, mouseParallaxX, mouseParallaxY));
        const baseAlpha = 0.65 + Math.sin(poly.pulse) * 0.15;
        const colStr = `${poly.color.r}, ${poly.color.g}, ${poly.color.b}`;

        // Draw wireframe edges
        ctx.beginPath();
        for (let e = 0; e < poly.edges.length; e++) {
          const [i1, i2] = poly.edges[e];
          const p1 = projected[i1];
          const p2 = projected[i2];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.strokeStyle = `rgba(${colStr}, ${baseAlpha})`;
        ctx.lineWidth = 1.25;
        ctx.stroke();

        if (poly.type === "cube") {
          // Internal server rack chassis diagonal
          ctx.beginPath();
          ctx.moveTo(projected[0].x, projected[0].y);
          ctx.lineTo(projected[2].x, projected[2].y);
          ctx.moveTo(projected[4].x, projected[4].y);
          ctx.lineTo(projected[6].x, projected[6].y);
          ctx.strokeStyle = `rgba(${colStr}, ${baseAlpha * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          // Octahedron internal core axis
          ctx.beginPath();
          ctx.moveTo(projected[0].x, projected[0].y);
          ctx.lineTo(projected[5].x, projected[5].y);
          ctx.strokeStyle = `rgba(${colStr}, ${baseAlpha * 0.55})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }

        // Glowing vertex pins
        for (let v = 0; v < projected.length; v++) {
          const pv = projected[v];
          ctx.beginPath();
          ctx.arc(pv.x, pv.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colStr}, ${Math.min(1, baseAlpha + 0.3)})`;
          ctx.fill();
        }
      }

      // ── B. Render Quantum Telemetry Stardust ────────────────────
      for (let s = 0; s < stardust.length; s++) {
        const d = stardust[s];
        d.seed += 0.02;
        d.y += d.vy;
        d.x += Math.sin(d.seed) * 0.25 + d.vx;

        // Mouse magnetic deflection on stardust
        if (hasMouse) {
          const mdx = d.x - mouse.x;
          const mdy = d.y - mouse.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (dist < 130 && dist > 1) {
            const force = (1 - dist / 130) * 1.8;
            d.vx += (mdx / dist) * force;
          }
        }
        d.vx *= 0.92;

        if (d.y < -10) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }

        const alpha = 0.45 + Math.sin(d.seed) * 0.3;
        ctx.beginPath();
        ctx.arc(d.x, d.y, Math.max(1, d.r), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${d.color.r}, ${d.color.g}, ${d.color.b}, ${alpha})`;
        ctx.fill();
      }

      // ── C. Render Ascending Telemetry Matrix Glyphs ─────────────
      ctx.font = "600 11px 'JetBrains Mono', 'Fira Code', monospace";
      for (let g = 0; g < glyphs.length; g++) {
        const gl = glyphs[g];
        gl.y += gl.vy;
        gl.pulse += 0.025;

        if (gl.y < -20) {
          gl.y = height + 20;
          gl.x = Math.random() * width;
          gl.text = glyphWords[Math.floor(Math.random() * glyphWords.length)];
        }

        // Natural fade in at bottom, fade out at top
        const vertFactor = Math.sin((gl.y / height) * Math.PI);
        const gAlpha = Math.max(0.3, Math.min(0.75, vertFactor * 0.75 + Math.sin(gl.pulse) * 0.15));

        ctx.fillStyle = `rgba(${gl.color.r}, ${gl.color.g}, ${gl.color.b}, ${gAlpha})`;
        ctx.fillText(gl.text, gl.x, gl.y);
      }

      // ── D. Render Cloud Network Node Mesh + Magnetic Deflection ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Magnetic Deflection from cursor
        if (hasMouse) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (dist < 130 && dist > 1) {
            const repulse = (1 - dist / 130) * 2.2;
            p.vx += (mdx / dist) * repulse;
            p.vy += (mdy / dist) * repulse;
          }
        }

        // Dampen velocity back to base trajectory
        p.vx = p.vx * 0.94 + p.baseVx * 0.06;
        p.vy = p.vy * 0.94 + p.baseVy * 0.06;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.85)`;
        ctx.fill();

        // Connect nearby particles with thin network lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Randomly dispatch photon packets along connected edge
            if (Math.random() < 0.0025) {
              spawnPacket(i, j, p.color);
            }
          }
        }

        // Laser line to mouse
        if (hasMouse) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < 160) {
            const mAlpha = (1 - mDist / 160) * 0.65;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // ── E. Periodic Hexagonal Radar Waves ────────────────────────
      if (frameCount % 90 === 0 && particles.length > 0) {
        const randP = particles[Math.floor(Math.random() * particles.length)];
        spawnRipple(randP.x, randP.y, randP.color);
      }

      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 0.75;
        rip.alpha = (1 - rip.radius / rip.maxRadius) * 0.55;

        if (rip.alpha <= 0.01 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
          continue;
        }

        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const angle = (k * Math.PI) / 3;
          const hx = rip.x + rip.radius * Math.cos(angle);
          const hy = rip.y + rip.radius * Math.sin(angle);
          if (k === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${rip.color.r}, ${rip.color.g}, ${rip.color.b}, ${rip.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── F. Render Photon Data Packets ────────────────────────────
      for (let pIdx = packets.length - 1; pIdx >= 0; pIdx--) {
        const pkt = packets[pIdx];
        const pA = particles[pkt.from];
        const pB = particles[pkt.to];

        if (!pA || !pB) {
          packets.splice(pIdx, 1);
          continue;
        }

        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          packets.splice(pIdx, 1);
          continue;
        }

        const curX = pA.x + (pB.x - pA.x) * pkt.progress;
        const curY = pA.y + (pB.y - pA.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pkt.color.r}, ${pkt.color.g}, ${pkt.color.b}, 1)`;
        ctx.fill();

        const tailProgress = Math.max(0, pkt.progress - 0.12);
        const tailX = pA.x + (pB.x - pA.x) * tailProgress;
        const tailY = pA.y + (pB.y - pA.y) * tailProgress;
        ctx.beginPath();
        ctx.moveTo(curX, curY);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = `rgba(${pkt.color.r}, ${pkt.color.g}, ${pkt.color.b}, 0.7)`;
        ctx.lineWidth = 2.4;
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. INTERACTIVE TERMINAL ENGINE
  // ═══════════════════════════════════════════════════════════════
  function initInteractiveTerminal() {
    const termBody = document.getElementById("termBody");
    const termOutput = document.getElementById("terminal-output");
    const termInput = document.getElementById("terminal-input");
    const pills = document.querySelectorAll(".pill-cmd-btn");

    if (!termBody || !termInput || !termOutput) return;

    // Command History
    const history = [];
    let historyIndex = -1;

    // Helper: Escape HTML to prevent XSS
    function escapeHTML(str) {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // Scroll terminal to latest output line
    function scrollToBottom() {
      termBody.scrollTop = termBody.scrollHeight;
    }

    // Command dictionary responses
    const commands = {
      help: `
<div class="terminal-line response">
  <span style="color:#00F5A0; font-weight:700;">AVAILABLE CLOUD CONTROL &amp; LINUX COMMANDS:</span><br>
  • <span style="color:#38BDF8; font-weight:600;">whoami</span>          <span style="color:#94A3B8;">— Identity, engineering background &amp; philosophy</span><br>
  • <span style="color:#00F5A0; font-weight:600;">skills</span>          <span style="color:#94A3B8;">— Core technology stack &amp; engineering pillars</span><br>
  • <span style="color:#FF8A00; font-weight:600;">docker ps</span>       <span style="color:#94A3B8;">— List active containerized microservices &amp; ports</span><br>
  • <span style="color:#38BDF8; font-weight:600;">kubectl get nodes</span> <span style="color:#94A3B8;">— Inspect Kubernetes cluster nodes &amp; topology</span><br>
  • <span style="color:#A855F7; font-weight:600;">aws stack</span>       <span style="color:#94A3B8;">— AWS VPC, EKS, ALB &amp; CloudFront infrastructure</span><br>
  • <span style="color:#00F5A0; font-weight:600;">certs</span>           <span style="color:#94A3B8;">— Verified industry certifications &amp; credentials</span><br>
  • <span style="color:#38BDF8; font-weight:600;">ping uzair</span>       <span style="color:#94A3B8;">— Test low-latency connection to contact gateway</span><br>
  • <span style="color:#A855F7; font-weight:600;">projects</span>        <span style="color:#94A3B8;">— Production architecture systems &amp; deployments</span><br>
  • <span style="color:#64748B; font-weight:600;">clear</span>           <span style="color:#94A3B8;">— Clear the active terminal buffer</span>
</div>`,

      whoami: `
<div class="terminal-line response">
  <strong style="color:#F8FAFC;">Uzair Sultan</strong> — <span style="color:#00F5A0; font-weight:700;">DevOps &amp; Cloud Infrastructure Architect</span><br>
  <span style="color:#94A3B8;">From Linux kernel systems to cloud infrastructure, I turn code into automated, production-ready deployments.</span><br>
  <span style="color:#38BDF8;">Education:</span> Master of Computer Applications (IGNOU, Started 2026 — Present) • BCA (1st Class)<br>
  <span style="color:#A855F7;">Mission:</span> Building self-healing, zero-downtime platforms with declarative IaC and hardened security.
</div>`,

      skills: `
<div class="terminal-line response">
  <span style="color:#00F5A0; font-weight:700;">• [CONTAINERS &amp; K8S]</span>  <span style="color:#F8FAFC;">Docker, Multi-stage Builds, Kubernetes, Helm, Ingress-NGINX</span><br>
  <span style="color:#FF8A00; font-weight:700;">• [AWS CLOUD INFRA]</span>   <span style="color:#F8FAFC;">VPC, EC2, S3, IAM, EKS, ALB, Route 53, CloudWatch</span><br>
  <span style="color:#A855F7; font-weight:700;">• [INFRASTRUCTURE]</span>    <span style="color:#F8FAFC;">Terraform HCL, GitOps (ArgoCD), GitHub Actions, Ansible</span><br>
  <span style="color:#00F5A0; font-weight:700;">• [LINUX &amp; NETWORKS]</span>  <span style="color:#F8FAFC;">Ubuntu, Arch, Bash Scripting, Systemd, TCP/IP, Wireshark, BGP</span><br>
  <span style="color:#38BDF8; font-weight:700;">• [CI/CD &amp; DEVOPS]</span>    <span style="color:#F8FAFC;">Automated Linting, Security Scanning, Zero-Downtime Rollouts</span>
</div>`,

      certs: `
<div class="terminal-line response">
  <strong style="color:#F8FAFC;">VERIFIED INDUSTRY CERTIFICATIONS:</strong><br>
  • <span style="color:#38BDF8; font-weight:700;">Docker Essentials: A Developer Introduction</span><br>
    <span style="color:#94A3B8;">Issuer:</span> Cognitive Class (IBM Developer Skills Network) • <span style="color:#00F5A0;">Issued Oct 2026</span><br>
    <span style="color:#94A3B8;">Credential ID:</span> <span style="color:#A855F7;">963031e61d0745338ded287cf0331aff</span><br>
    <span style="color:#94A3B8;">Focus:</span> Containerization, Docker images, and modern microservices workflows.<br><br>
  • <span style="color:#00F5A0; font-weight:700;">DevOps &amp; CI/CD Automation</span><br>
    <span style="color:#94A3B8;">Issuer:</span> Mltio University • <span style="color:#00F5A0;">Issued Oct 2026</span><br>
    <span style="color:#94A3B8;">Credential ID:</span> <span style="color:#A855F7;">MU-ACAD-2026-EZYAPPYZ</span><br>
    <span style="color:#94A3B8;">Focus:</span> Automated delivery pipelines, testing gates, and infrastructure orchestration.
</div>`,

      "docker ps": `
<div class="terminal-line response" style="font-size:0.8rem; overflow-x:auto;">
  <span style="color:#94A3B8;">CONTAINER ID   IMAGE                               COMMAND               STATUS                    PORTS                     NAMES</span><br>
  <span style="color:#38BDF8;">a8f4c2190e31</span>   uzair/nexora:v1.0.0                 "expo-start"          <span style="color:#00F5A0;">Up 21 days (healthy)</span>      0.0.0.0:8081-&gt;8081/tcp    nexora-app<br>
  <span style="color:#38BDF8;">b7190d4e5f22</span>   uzair/kashmir-kesar-kingdom:v2.4    "nginx -g 'daemon'"   <span style="color:#00F5A0;">Up 60 days (healthy)</span>      0.0.0.0:443-&gt;80/tcp       kkk-export-web<br>
  <span style="color:#38BDF8;">c3392b1a8d05</span>   uzair/craver-fastfood:v1.4.2        "node server.js"      <span style="color:#00F5A0;">Up 38 days (healthy)</span>      0.0.0.0:3000-&gt;3000/tcp    craver-order-engine<br>
  <span style="color:#38BDF8;">d9910f8a3c44</span>   uzair/sys-inspect:latest            "sys-inspect"         <span style="color:#00F5A0;">Up 12 days (healthy)</span>      127.0.0.1:9100-&gt;9100/tcp  sys-inspect-telemetry
</div>`,

      "kubectl get nodes": `
<div class="terminal-line response" style="font-size:0.8rem; overflow-x:auto;">
  <span style="color:#94A3B8;">NAME                                         STATUS   ROLES           AGE    VERSION</span><br>
  <span style="color:#00F5A0;">ip-10-0-1-101.ap-south-1.compute.internal</span>    Ready    control-plane   180d   v1.30.2 (Ubuntu 24.04 LTS)<br>
  <span style="color:#00F5A0;">ip-10-0-1-102.ap-south-1.compute.internal</span>    Ready    worker,node     180d   v1.30.2 (AMD Ryzen 5000)<br>
  <span style="color:#00F5A0;">ip-10-0-1-103.ap-south-1.compute.internal</span>    Ready    worker,gpu      95d    v1.30.2 (NVIDIA GTX 1650)<br>
  <span style="color:#38BDF8;">CLUSTER STATUS:</span> 3/3 Nodes Ready • 12/12 Pods InSync • Ingress-NGINX: Active • Flannel CNI: 0 errors
</div>`,

      "aws stack": `
<div class="terminal-line response">
  <span style="color:#FF8A00; font-weight:700;">AWS TOPOLOGY // REGION: ap-south-1 (Mumbai)</span><br>
  ├── <span style="color:#38BDF8;">VPC:</span> vpc-0a4b9c1d (CIDR: 10.0.0.0/16)<br>
  │   ├── Public Subnets (ap-south-1a &amp; 1b) -&gt; Internet Gateway + Application Load Balancer<br>
  │   └── Private Subnets (ap-south-1a &amp; 1b) -&gt; NAT Gateway + EKS Managed Nodes<br>
  ├── <span style="color:#00F5A0;">EKS Cluster:</span> portfolio-eks (v1.30.2, Multi-AZ)<br>
  ├── <span style="color:#A855F7;">Storage &amp; CDN:</span> S3 bucket 'uzair-vault-artifacts' with CloudFront Edge Caching<br>
  └── <span style="color:#00F5A0;">Security:</span> IAM Least-Privilege Role Policies + AWS Secrets Manager
</div>`,

      "ping uzair": `
<div class="terminal-line response">
  <span style="color:#38BDF8;">PING uzair.cloud (13.232.0.1): 56 data bytes</span><br>
  64 bytes from 13.232.0.1: icmp_seq=0 ttl=64 time=0.038 ms<br>
  64 bytes from 13.232.0.1: icmp_seq=1 ttl=64 time=0.035 ms<br>
  64 bytes from 13.232.0.1: icmp_seq=2 ttl=64 time=0.037 ms<br>
  <span style="color:#00F5A0;">--- 0% packet loss, handshake verified. Route open to uzairteeli123456789@gmail.com ---</span>
</div>`,

      projects: `
<div class="terminal-line response">
  <strong style="color:#F8FAFC;">PRODUCTION ARCHITECTURE PROJECTS:</strong><br>
  • <span style="color:#38BDF8; font-weight:600;">Nexora Mobile App</span> — React Native 0.81 &amp; Expo SDK 54 cross-platform client<br>
  • <span style="color:#00F5A0; font-weight:600;">Kashmir Kesar Kingdom</span> — Global export e-commerce architecture (NGINX, AWS)<br>
  • <span style="color:#FF8A00; font-weight:600;">Craver Fastfood</span> — High-throughput food ordering engine (Node.js, React)<br>
  • <span style="color:#A855F7; font-weight:600;">Sys-Inspect Telemetry</span> — Linux node exporter and system inspection utility<br>
  <span style="color:#94A3B8;">(Tip: Scroll down to #projects or type 'docker ps' to see active containers)</span>
</div>`
    };

    // Aliases
    commands["k8s nodes"] = commands["kubectl get nodes"];
    commands["kubectl"] = commands["kubectl get nodes"];
    commands["certifications"] = commands["certs"];
    commands["resume"] = `
<div class="terminal-line response">
  <span style="color:#38BDF8;">Fetching official Curriculum Vitae artifact...</span><br>
  <span style="color:#00F5A0;">[200 OK]</span> Resume verified. Navigating to contact gateway...
</div>`;

    // Execute given command string
    function executeCommand(rawCmd) {
      const trimmed = (rawCmd || "").trim();
      if (!trimmed) return;

      // Add to history
      history.push(trimmed);
      historyIndex = -1;

      // Echo command line into output
      const cmdEcho = document.createElement("p");
      cmdEcho.className = "terminal-line";
      cmdEcho.innerHTML = `<span class="prompt">uzair@cloud-node-01:~$</span> <span class="command">${escapeHTML(trimmed)}</span>`;
      termOutput.appendChild(cmdEcho);

      const normalized = trimmed.toLowerCase();

      if (normalized === "clear") {
        termOutput.innerHTML = "";
      } else if (commands[normalized]) {
        const respContainer = document.createElement("div");
        respContainer.innerHTML = commands[normalized];
        termOutput.appendChild(respContainer);
      } else {
        const err = document.createElement("p");
        err.className = "terminal-line response";
        err.style.color = "#EF4444";
        err.innerHTML = `zsh: command not found: <strong style="color:#F8FAFC;">${escapeHTML(trimmed)}</strong>. Type '<span style="color:#00F5A0; cursor:pointer;" onclick="document.getElementById('terminal-input').value='help'; document.getElementById('terminal-input').dispatchEvent(new KeyboardEvent('keydown', {key:'Enter'}));">help</span>' for available commands.`;
        termOutput.appendChild(err);
      }

      scrollToBottom();
    }

    // Input keyboard event listener
    termInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = termInput.value;
        termInput.value = "";
        executeCommand(cmd);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length > 0 && historyIndex < history.length - 1) {
          historyIndex++;
          termInput.value = history[history.length - 1 - historyIndex];
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          termInput.value = history[history.length - 1 - historyIndex];
        } else if (historyIndex === 0) {
          historyIndex = -1;
          termInput.value = "";
        }
      }
    });

    // 1-Click Command Pills binding
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const cmd = pill.getAttribute("data-cmd") || pill.textContent.replace(/^[^\w]+/, '').trim();
        if (cmd) {
          termInput.value = "";
          executeCommand(cmd);
          termInput.focus();
        }
      });
    });

    // Focus input when user clicks anywhere inside the terminal body
    termBody.addEventListener("click", () => {
      termInput.focus();
    });

    // Initial scroll
    scrollToBottom();
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. LENIS CINEMATIC SMOOTH SCROLL INITIALIZATION
  // ═══════════════════════════════════════════════════════════════
  function initLenisSmoothScroll() {
    if (typeof window.Lenis === "undefined") return null;

    // Keep 100% native momentum scrolling on mobile touch screens for maximum 120Hz/60Hz smoothness
    if (window.innerWidth < 768) {
      return null;
    }

    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    });

    // Sync Lenis with GSAP ScrollTrigger if present
    if (typeof window.ScrollTrigger !== "undefined") {
      lenis.on("scroll", window.ScrollTrigger.update);
    }

    // Tie Lenis into the requestAnimationFrame loop alongside GSAP ticker
    if (typeof window.gsap !== "undefined") {
      window.gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return lenis;
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. GSAP CINEMATIC CHOREOGRAPHY & SCROLLTRIGGER
  // ═══════════════════════════════════════════════════════════════
  function initCinematicMotion() {
    if (typeof window.gsap === "undefined") return;

    if (typeof window.ScrollTrigger !== "undefined") {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    const mm = window.gsap.matchMedia();

    // ─────────────────────────────────────────────────────────────
    // Desktop & Tablet Viewports (>= 768px): Full Cinematic Suite
    // ─────────────────────────────────────────────────────────────
    mm.add("(min-width: 768px)", () => {
      // 1. Hero Entrance Timeline Choreography
      const heroTl = window.gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1
      });

      // Top HUD dropping down from y: -20 with opacity: 0
      heroTl.from(".status-nav", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "transform,opacity"
      });

      // Pop Avatar into view with elastic easing
      heroTl.from(".hero-avatar-wrap", {
        scale: 0.4,
        opacity: 0,
        duration: 1.1,
        ease: "elastic.out(1, 0.5)",
        clearProps: "transform,opacity"
      }, "-=0.5");

      // Stagger Hero text sliding up from y: 40 with opacity: 0 & slight rotation (2deg)
      heroTl.from([".hero-name-glamour", ".hero-tagline-creed", ".hero-role-sub", ".hero-bio", ".hero-actions"], {
        y: 40,
        opacity: 0,
        rotation: 2,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity,rotation"
      }, "-=0.7");

      // Slide Terminal window in from the right (x: 50, opacity: 0)
      heroTl.from([".terminal-container", ".terminal-1click-pills"], {
        x: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity"
      }, "-=0.6");

      // 2. 3D Magnetic Avatar Tilt (Vanilla JS + GSAP)
      const avatarWrap = document.querySelector(".hero-avatar-wrap");
      const avatar = document.querySelector(".hero-avatar");
      if (avatarWrap && avatar) {
        window.gsap.set(avatarWrap, { transformPerspective: 1000 });

        const onMouseMove = (e) => {
          const rect = avatarWrap.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const xNorm = (x / rect.width - 0.5) * 2;
          const yNorm = (y / rect.height - 0.5) * 2;

          window.gsap.to(avatar, {
            rotateY: xNorm * 18,
            rotateX: -yNorm * 18,
            scale: 1.06,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto"
          });
        };

        const onMouseLeave = () => {
          window.gsap.to(avatar, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto"
          });
        };

        avatarWrap.addEventListener("mousemove", onMouseMove);
        avatarWrap.addEventListener("mouseleave", onMouseLeave);
      }

      // 3. Bento Grid ScrollTrigger (Cascade Reveal with stagger: 0.1)
      const bentoGrid = document.querySelector(".bento-grid");
      const bentoCards = document.querySelectorAll(".bento-card");
      if (bentoGrid && bentoCards.length > 0) {
        window.gsap.from(bentoCards, {
          scrollTrigger: {
            trigger: bentoGrid,
            start: "top 85%",
            once: true
          },
          y: 50,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity"
        });
      }

      // 4. CI/CD Pipeline Section ScrollTrigger
      const pipelineCard = document.querySelector(".pipeline-card");
      if (pipelineCard) {
        window.gsap.from(pipelineCard, {
          scrollTrigger: {
            trigger: pipelineCard,
            start: "top 85%",
            once: true
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity"
        });
      }

      // 5. Projects Grid ScrollTrigger (Cascade Reveal with stagger: 0.1)
      const projectsGrid = document.querySelector(".projects-grid");
      const projectCards = document.querySelectorAll(".project-card, .server-blade-card");
      if (projectsGrid && projectCards.length > 0) {
        window.gsap.from(projectCards, {
          scrollTrigger: {
            trigger: projectsGrid,
            start: "top 85%",
            once: true
          },
          y: 50,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity"
        });
      }

      // 6. Experience / Credentials Git Commit Ledger Cascade Reveal
      const expGrid = document.querySelector(".commit-ledger-timeline, .experience-grid");
      const expCards = document.querySelectorAll(".commit-node-entry, .experience-card");
      if (expGrid && expCards.length > 0) {
        window.gsap.from(expCards, {
          scrollTrigger: {
            trigger: expGrid,
            start: "top 85%",
            once: true
          },
          y: 40,
          opacity: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform,opacity"
        });
      }

      // 7. Communication Gateways Grid Cascade Reveal
      const channelsGrid = document.querySelector(".channels-gateway-grid");
      const channelTiles = document.querySelectorAll(".channel-tile");
      if (channelsGrid && channelTiles.length > 0) {
        window.gsap.from(channelTiles, {
          scrollTrigger: {
            trigger: channelsGrid,
            start: "top 85%",
            once: true
          },
          y: 35,
          opacity: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity"
        });
      }

      // 8. Section-Reactive Chromatic Auroras (Atmospheric Dynamic Glow)
      const auroraProfiles = [
        { id: "#about", em: 1.0, cy: 0.8, vi: 0.6, am: 0.4 },
        { id: "#skills", em: 0.5, cy: 1.2, vi: 0.9, am: 0.4 },
        { id: "#pipeline", em: 0.6, cy: 0.7, vi: 1.2, am: 0.4 },
        { id: "#projects", em: 0.5, cy: 0.7, vi: 0.5, am: 1.3 },
        { id: "#experience", em: 1.1, cy: 0.9, vi: 0.8, am: 0.4 },
        { id: "#contact", em: 0.7, cy: 1.1, vi: 0.6, am: 1.0 }
      ];

      auroraProfiles.forEach((prof) => {
        const targetEl = document.querySelector(prof.id);
        if (!targetEl) return;
        window.ScrollTrigger.create({
          trigger: targetEl,
          start: "top center",
          end: "bottom center",
          onEnter: () => applyAuroraProfile(prof),
          onEnterBack: () => applyAuroraProfile(prof)
        });
      });

      function applyAuroraProfile(p) {
        const blobEm = document.querySelector(".blob-emerald, .orb-emerald");
        const blobCy = document.querySelector(".blob-cyan, .orb-cyan");
        const blobVi = document.querySelector(".blob-violet, .orb-violet");
        const blobAm = document.querySelector(".blob-amber, .orb-amber");
        if (blobEm) window.gsap.to(blobEm, { opacity: p.em * 0.65, duration: 1.2, overwrite: "auto" });
        if (blobCy) window.gsap.to(blobCy, { opacity: p.cy * 0.65, duration: 1.2, overwrite: "auto" });
        if (blobVi) window.gsap.to(blobVi, { opacity: p.vi * 0.65, duration: 1.2, overwrite: "auto" });
        if (blobAm) window.gsap.to(blobAm, { opacity: p.am * 0.65, duration: 1.2, overwrite: "auto" });
      }
    });

    // ─────────────────────────────────────────────────────────────
    // Mobile Screens (< 768px): Light, Fluid & Instant
    // ─────────────────────────────────────────────────────────────
    mm.add("(max-width: 767px)", () => {
      // Gentle, lightweight entrance without heavy ScrollTriggers
      window.gsap.from(".hero-identity", {
        opacity: 0,
        y: 25,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "all"
      });
      window.gsap.from(".hero-terminal", {
        opacity: 0,
        y: 25,
        duration: 0.6,
        delay: 0.1,
        ease: "power2.out",
        clearProps: "all"
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. SPECULAR SPOTLIGHT BORDER GLOW ENGINE (LINEAR.APP STYLE)
  // ═══════════════════════════════════════════════════════════════
  function initSpotlightCards() {
    const cards = document.querySelectorAll(
      ".bento-card, .project-card, .server-blade-card, .commit-node-card, .commit-node-entry, .channel-tile, .pipeline-card, .pipeline-stage, .experience-card"
    );
    if (!cards.length) return;

    cards.forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }, { passive: true });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 5.1. 3D HOLOGRAPHIC SPATIAL TILT ENGINE (DESKTOP >= 768px)
  // ═══════════════════════════════════════════════════════════════
  function initCard3DTilt() {
    if (typeof window.gsap === "undefined") return;

    const cards = document.querySelectorAll(
      ".bento-card, .project-card, .server-blade-card, .commit-node-card, .channel-tile, .pipeline-card"
    );
    if (!cards.length) return;

    cards.forEach((card) => {
      let bounds = null;

      card.addEventListener("pointerenter", () => {
        if (window.innerWidth < 768) return;
        bounds = card.getBoundingClientRect();
      }, { passive: true });

      card.addEventListener("pointermove", (e) => {
        if (window.innerWidth < 768) return;
        if (!bounds) bounds = card.getBoundingClientRect();

        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        // Normalized cursor offset: -0.5 to +0.5
        const normX = (mouseX / bounds.width) - 0.5;
        const normY = (mouseY / bounds.height) - 0.5;

        // Controlled, cinematic spatial tilt angles (max ~6.5 deg)
        const rotateX = -normY * 13;
        const rotateY = normX * 13;

        window.gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          y: -6,
          duration: 0.28,
          ease: "power1.out",
          transformPerspective: 1000,
          overwrite: "auto"
        });
      }, { passive: true });

      card.addEventListener("pointerleave", () => {
        if (window.innerWidth < 768) return;
        bounds = null;
        window.gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 0.75,
          ease: "elastic.out(1, 0.45)",
          transformPerspective: 1000,
          overwrite: "auto"
        });
      }, { passive: true });
    });

    // Reset inline transforms if viewport drops below 768px to keep mobile 100% native
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        cards.forEach((card) => {
          window.gsap.set(card, { clearProps: "rotateX,rotateY,y,transformPerspective" });
        });
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════════
  // 5.2. CYBERNETIC DECRYPTION SCRAMBLE ENGINE
  // ═══════════════════════════════════════════════════════════════
  function initDecryptionScramble() {
    const glyphs = "0123456789ABCDEFλ#$_<>%*+-=~/";

    function triggerScramble(el) {
      if (!el || el._isScrambling) return;

      const original = el.getAttribute("data-original-text") || el.textContent.trim();
      if (!el.getAttribute("data-original-text")) {
        el.setAttribute("data-original-text", original);
      }

      el._isScrambling = true;
      const len = original.length;
      let frame = 0;
      const totalFrames = 12;

      if (el._scrambleTimer) clearInterval(el._scrambleTimer);

      el._scrambleTimer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const lockedChars = Math.floor(progress * len);

        let result = "";
        for (let i = 0; i < len; i++) {
          const char = original[i];
          // Preserve spaces, brackets, hyphens, and delimiters for rock-solid stability
          if (
            char === " " ||
            char === "\n" ||
            char === "\t" ||
            char === "-" ||
            char === ">" ||
            char === "[" ||
            char === "]" ||
            char === ":" ||
            char === "—" ||
            char === "+" ||
            char === "(" ||
            char === ")" ||
            char === "/" ||
            char === "✓" ||
            char === "⎇" ||
            char === "●"
          ) {
            result += char;
            continue;
          }

          if (i < lockedChars) {
            result += char;
          } else {
            result += glyphs[Math.floor(Math.random() * glyphs.length)];
          }
        }

        el.textContent = result;

        if (frame >= totalFrames) {
          clearInterval(el._scrambleTimer);
          el._scrambleTimer = null;
          el.textContent = original;
          setTimeout(() => {
            el._isScrambling = false;
          }, 180);
        }
      }, 26);
    }

    // Direct element targets
    const directTargets = document.querySelectorAll(
      ".bento-card h3, .server-blade-card .project-title, .commit-node-card h3, .channel-value, .commit-hash-pill code"
    );

    directTargets.forEach((el) => {
      el.setAttribute("data-original-text", el.textContent.trim());

      el.addEventListener("pointerenter", () => {
        triggerScramble(el);
      }, { passive: true });
    });

    // Also trigger title scramble on parent card hover
    const parentCards = document.querySelectorAll(
      ".bento-card, .server-blade-card, .commit-node-card, .channel-tile"
    );

    parentCards.forEach((card) => {
      card.addEventListener("pointerenter", () => {
        const titleEl = card.querySelector("h3, .project-title, .channel-value, .commit-hash-pill code");
        if (titleEl) {
          triggerScramble(titleEl);
        }
      }, { passive: true });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 6. INTERACTIVE CI/CD GITOPS PIPELINE ENGINE
  // ═══════════════════════════════════════════════════════════════
  function initPipelineSimulator() {
    const dispatchBtn = document.getElementById("dispatchPipelineBtn");
    const resetBtn = document.getElementById("resetPipelineBtn");
    const statusBadge = document.getElementById("pipelineStatus");
    const timerDisplay = document.getElementById("pipelineTimer");
    const consoleBody = document.getElementById("pipelineConsoleLogs");

    if (!dispatchBtn || !consoleBody) return;

    let isRunning = false;
    let timerInterval = null;
    let startTime = 0;

    const stages = [
      {
        id: "stage-commit",
        delay: 700,
        runningLog: "[STEP 1/5] Git commit webhook received on main branch (SHA: 96adb24). Checking branch policies...",
        passedLog: "✓ [PASS] Semantic linter & GPG signature verified (0 errors). Dispatching OCI builder worker."
      },
      {
        id: "stage-build",
        delay: 850,
        runningLog: "[STEP 2/5] Compiling Docker multi-stage build 'uzair/cloud-app:v1.2.0'. Mounting layer cache...",
        passedLog: "✓ [PASS] Docker multi-arch image built (linux/amd64, linux/arm64). Image size: 48.2MB."
      },
      {
        id: "stage-scan",
        delay: 800,
        runningLog: "[STEP 3/5] Trivy scanning image layers for CVEs and SAST policy violations...",
        passedLog: "✓ [PASS] Security Gate Passed: 0 CRITICAL, 0 HIGH, 0 MEDIUM vulnerabilities detected."
      },
      {
        id: "stage-helm",
        delay: 750,
        runningLog: "[STEP 4/5] Packaging declarative Helm chart v1.2.0. Signing OCI artifact...",
        passedLog: "✓ [PASS] OCI bundle pushed to Amazon ECR (ap-south-1). Digest: sha256:8f4c2190e31."
      },
      {
        id: "stage-deploy",
        delay: 950,
        runningLog: "[STEP 5/5] ArgoCD detected target state diff. Initiating rolling update on EKS worker nodes...",
        passedLog: "⚡ [COMPLETE] 3/3 Pod replicas Ready (100% InSync). Ingress controller routes active. Zero downtime verified!"
      }
    ];

    function appendLog(text, type = "info") {
      const p = document.createElement("p");
      p.className = `log-line ${type}`;
      p.textContent = text;
      consoleBody.appendChild(p);
      consoleBody.scrollTop = consoleBody.scrollHeight;
    }

    function resetPipeline() {
      if (isRunning) return;
      clearInterval(timerInterval);
      if (timerDisplay) timerDisplay.textContent = "RUNTIME: 0.00s";

      stages.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) {
          el.classList.remove("running", "passed");
          const stateEl = el.querySelector(".stage-state");
          if (stateEl) stateEl.textContent = "STANDBY";
        }
      });

      if (statusBadge) {
        statusBadge.className = "pipeline-status-badge ready";
        statusBadge.textContent = "STATUS: STANDBY";
      }

      consoleBody.innerHTML = '<p class="log-line info">[STANDBY] Runner ready on \'ap-south-1a-eks-runner\'. Click \'Dispatch Deployment Workflow\' to execute.</p>';
      dispatchBtn.style.display = "inline-flex";
      dispatchBtn.disabled = false;
      if (resetBtn) resetBtn.style.display = "none";
    }

    async function runPipeline() {
      if (isRunning) return;
      isRunning = true;
      dispatchBtn.disabled = true;
      if (resetBtn) resetBtn.style.display = "none";

      if (statusBadge) {
        statusBadge.className = "pipeline-status-badge running";
        statusBadge.textContent = "STATUS: RUNNING WORKFLOW...";
      }

      consoleBody.innerHTML = "";
      startTime = Date.now();
      timerInterval = setInterval(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        if (timerDisplay) timerDisplay.textContent = `RUNTIME: ${elapsed}s`;
      }, 50);

      appendLog(`[DISPATCH] Workflow triggered by user on branch 'main'. Host: ap-south-1a`, "cyan");

      for (let i = 0; i < stages.length; i++) {
        const s = stages[i];
        const el = document.getElementById(s.id);
        const stateEl = el ? el.querySelector(".stage-state") : null;

        if (el) {
          el.classList.add("running");
          if (stateEl) stateEl.textContent = "RUNNING...";
        }

        appendLog(s.runningLog, "amber");
        await new Promise((resolve) => setTimeout(resolve, s.delay));

        if (el) {
          el.classList.remove("running");
          el.classList.add("passed");
          if (stateEl) stateEl.textContent = "PASSED ✓";
        }

        appendLog(s.passedLog, "green");
      }

      clearInterval(timerInterval);
      const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      if (timerDisplay) timerDisplay.textContent = `RUNTIME: ${totalElapsed}s`;

      if (statusBadge) {
        statusBadge.className = "pipeline-status-badge success";
        statusBadge.textContent = "STATUS: DEPLOYED (200 OK)";
      }

      appendLog(`🎉 [PIPELINE SUCCESS] Production cluster updated in ${totalElapsed}s with 0 downtime.`, "green");

      isRunning = false;
      dispatchBtn.style.display = "none";
      if (resetBtn) {
        resetBtn.style.display = "inline-flex";
        resetBtn.onclick = resetPipeline;
      }
    }

    dispatchBtn.addEventListener("click", runPipeline);
  }

  // ═══════════════════════════════════════════════════════════════
  // 7. DIRECT CHANNELS CLIPBOARD ENGINE
  // ═══════════════════════════════════════════════════════════════
  function initDirectChannelsClipboard() {
    const copyBtns = document.querySelectorAll(".copy-email-btn");
    copyBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const email = btn.getAttribute("data-email") || "uzairteeli123456789@gmail.com";
        const copyText = btn.querySelector(".copy-text");

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(() => {
            btn.classList.add("copied");
            if (copyText) copyText.textContent = "Copied! ✓";
            setTimeout(() => {
              btn.classList.remove("copied");
              if (copyText) copyText.textContent = "Copy";
            }, 2200);
          }).catch(() => fallbackCopy(email, btn, copyText));
        } else {
          fallbackCopy(email, btn, copyText);
        }
      });
    });

    function fallbackCopy(text, btn, copyText) {
      const tempInput = document.createElement("input");
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      btn.classList.add("copied");
      if (copyText) copyText.textContent = "Copied! ✓";
      setTimeout(() => {
        btn.classList.remove("copied");
        if (copyText) copyText.textContent = "Copy";
      }, 2200);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 8. SMOOTH ANCHOR NAVIGATION (LENIS INTEGRATED)
  // ═══════════════════════════════════════════════════════════════
  function initSmoothAnchorScroll(lenis) {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            if (lenis && typeof lenis.scrollTo === "function") {
              lenis.scrollTo(targetEl, { offset: -70 });
            } else {
              targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION ON DOM READY
  // ═══════════════════════════════════════════════════════════════
  function bootstrap() {
    initNetworkTopologyCanvas();
    initInteractiveTerminal();
    const lenis = initLenisSmoothScroll();
    initCinematicMotion();
    initSpotlightCards();
    initCard3DTilt();
    initDecryptionScramble();
    initPipelineSimulator();
    initDirectChannelsClipboard();
    initSmoothAnchorScroll(lenis);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
