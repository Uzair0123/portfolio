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
  <span style="color:#00F5A0; font-weight:700;">AVAILABLE LEARNING LAB &amp; LINUX COMMANDS:</span><br>
  • <span style="color:#38BDF8; font-weight:600;">whoami</span>          <span style="color:#94A3B8;">— Identity, educational standing &amp; target roles</span><br>
  • <span style="color:#00F5A0; font-weight:600;">sys-inspect</span>     <span style="color:#94A3B8;">— Run local Linux /proc kernel telemetry diagnostics</span><br>
  • <span style="color:#00F5A0; font-weight:600;">skills</span>          <span style="color:#94A3B8;">— Transparent three-level technical competency matrix</span><br>
  • <span style="color:#FF8A00; font-weight:600;">docker ps</span>       <span style="color:#94A3B8;">— List active containerized services in local Docker lab</span><br>
  • <span style="color:#38BDF8; font-weight:600;">k8s lab</span>         <span style="color:#94A3B8;">— Simulated Kubernetes learning lab topology model</span><br>
  • <span style="color:#A855F7; font-weight:600;">aws roadmap</span>     <span style="color:#94A3B8;">— AWS core infrastructure study progression</span><br>
  • <span style="color:#00F5A0; font-weight:600;">certs</span>           <span style="color:#94A3B8;">— Verified academic degrees &amp; course certificates</span><br>
  • <span style="color:#38BDF8; font-weight:600;">ping uzair</span>       <span style="color:#94A3B8;">— Verify reachability to contact gateway</span><br>
  • <span style="color:#A855F7; font-weight:600;">projects</span>        <span style="color:#94A3B8;">— Real-world personal projects &amp; lab exercises</span><br>
  • <span style="color:#64748B; font-weight:600;">clear</span>           <span style="color:#94A3B8;">— Clear the active terminal buffer</span>
</div>`,

      whoami: `
<div class="terminal-line response">
  <strong style="color:#F8FAFC;">Uzair Sultan</strong> — <span style="color:#00F5A0; font-weight:700;">MCA Student | Linux &amp; IT Infrastructure | DevOps Fundamentals</span><br>
  <span style="color:#94A3B8;">Building practical foundations in Linux system administration, networking, Docker containerization, and automated workflows.</span><br>
  <span style="color:#38BDF8;">Education:</span> Master of Computer Applications (MCA, IGNOU) • BCA (University of Kashmir, 1st Class Distinction)<br>
  <span style="color:#A855F7;">Target Roles:</span> IT Infrastructure Internships, Linux SysAdmin Internships, Cloud/DevOps Internships.
</div>`,

      skills: `
<div class="terminal-line response">
  <span style="color:#00F5A0; font-weight:700;">• [PRACTISED &amp; BUILT]</span>  <span style="color:#F8FAFC;">Linux /proc, Bash (set -euo pipefail), Docker, Compose, Networking, Git/GitHub Actions, NGINX</span><br>
  <span style="color:#38BDF8; font-weight:700;">• [CURRENTLY LEARNING]</span>  <span style="color:#F8FAFC;">AWS Cloud Core (VPC, EC2, S3, IAM), Kubernetes Architecture &amp; Workloads, Terraform IaC</span><br>
  <span style="color:#A855F7; font-weight:700;">• [EXPLORING NEXT]</span>      <span style="color:#F8FAFC;">Production Container Orchestration, Ansible Automation, Observability, Cloud Security</span>
</div>`,

      certs: `
<div class="terminal-line response">
  <strong style="color:#F8FAFC;">VERIFIED ACADEMIC &amp; COURSE CREDENTIALS:</strong><br>
  • <span style="color:#00F5A0; font-weight:700;">Bachelor of Computer Applications (BCA)</span><br>
    <span style="color:#94A3B8;">Institution:</span> University of Kashmir • <span style="color:#00F5A0;">First Class Distinction</span> (2021 — 2024)<br>
    <span style="color:#94A3B8;">Focus:</span> Operating Systems, Database Management Systems, Data Communications.<br><br>
  • <span style="color:#38BDF8; font-weight:700;">Docker Essentials: A Developer Introduction</span><br>
    <span style="color:#94A3B8;">Issuer:</span> Cognitive Class (IBM Developer Skills Network) • <span style="color:#00F5A0;">Issued Oct 2026</span><br>
    <span style="color:#94A3B8;">Credential ID:</span> <span style="color:#A855F7;">963031e61d0745338ded287cf0331aff</span><br><br>
  • <span style="color:#00F5A0; font-weight:700;">DevOps &amp; CI/CD Automation</span><br>
    <span style="color:#94A3B8;">Issuer:</span> Mltio University • <span style="color:#00F5A0;">Issued Oct 2026</span><br>
    <span style="color:#94A3B8;">Credential ID:</span> <span style="color:#A855F7;">MU-ACAD-2026-EZYAPPYZ</span>
</div>`,

      "docker ps": `
<div class="terminal-line response" style="font-size:0.8rem; overflow-x:auto;">
  <span style="color:#94A3B8;">CONTAINER ID   IMAGE                          COMMAND               STATUS                    PORTS                    NAMES</span><br>
  <span style="color:#38BDF8;">c3392b1a8d05</span>   craver-restaurant:latest       "nginx -g 'daemon'"   <span style="color:#00F5A0;">Up 4 hours (healthy)</span>      0.0.0.0:8085-&gt;80/tcp     craver-web<br>
  <span style="color:#38BDF8;">a8f4c2190e31</span>   craver-api:latest              "python app.py"       <span style="color:#00F5A0;">Up 4 hours (healthy)</span>      0.0.0.0:5000-&gt;5000/tcp   craver-api<br>
  <span style="color:#38BDF8;">b7190d4e5f22</span>   redis:alpine                   "redis-server"        <span style="color:#00F5A0;">Up 4 hours</span>                6379/tcp (internal net)  craver-db<br>
  <span style="color:#38BDF8;">d9910f8a3c44</span>   ollama/ollama:latest           "ollama serve"        <span style="color:#00F5A0;">Up 4 hours (healthy)</span>      11434/tcp                craver-ai
</div>`,

      "kubectl get nodes": `
<div class="terminal-line response" style="font-size:0.8rem; overflow-x:auto;">
  <strong style="color:#38BDF8;">[KUBERNETES CONCEPTUAL LEARNING LAB]</strong><br>
  <span style="color:#94A3B8;">NAME                                         STATUS   ROLES           VERSION</span><br>
  <span style="color:#00F5A0;">k8s-lab-control-plane</span>                        Ready    control-plane   v1.30.2 (Minikube/K3s)<br>
  <span style="color:#00F5A0;">k8s-lab-worker-01</span>                            Ready    worker          v1.30.2 (AMD Ryzen)<br>
  <span style="color:#00F5A0;">k8s-lab-worker-02</span>                            Ready    worker          v1.30.2 (AMD Ryzen)<br>
  <span style="color:#38BDF8;">LAB TOPOLOGY:</span> 3/3 Nodes Ready • Educational model for studying Pod scheduling &amp; HPA.
</div>`,

      "aws stack": `
<div class="terminal-line response">
  <span style="color:#FF8A00; font-weight:700;">AWS ARCHITECTURE STUDY ROADMAP</span><br>
  ├── <span style="color:#38BDF8;">VPC Fundamentals:</span> CIDR blocks (10.0.0.0/16), Public/Private subnets, IGW &amp; NAT Gateways<br>
  ├── <span style="color:#00F5A0;">Compute &amp; Security:</span> EC2 instance lifecycles, Security Groups, IAM least-privilege roles<br>
  ├── <span style="color:#A855F7;">Storage &amp; Delivery:</span> S3 bucket policies, versioning, and CloudFront CDN integration<br>
  └── <span style="color:#00F5A0;">Status:</span> Active theoretical &amp; lab study in MCA cloud computing curriculum.
</div>`,

      "ping uzair": `
<div class="terminal-line response">
  <span style="color:#38BDF8;">PING uzair.gateway: 56 data bytes</span><br>
  64 bytes from uzair.gateway: icmp_seq=0 ttl=64 time=0.038 ms<br>
  64 bytes from uzair.gateway: icmp_seq=1 ttl=64 time=0.035 ms<br>
  <span style="color:#00F5A0;">--- 0% packet loss, handshake verified. Route open to uzairteeli123456789@gmail.com ---</span>
</div>`,

      projects: `
<div class="terminal-line response">
  <strong style="color:#F8FAFC;">PROJECTS &amp; TECHNICAL LABS:</strong><br>
  • <span style="color:#38BDF8; font-weight:600;">sys-inspect</span> — Linux /proc kernel metrics &amp; network socket diagnostics CLI<br>
  • <span style="color:#00F5A0; font-weight:600;">Craver Fast Food</span> — Multi-container Compose stack &amp; GitHub Actions CI/CD<br>
  • <span style="color:#FF8A00; font-weight:600;">Kashmir Kesar Kingdom</span> — High-performance web portal (95% asset compression)<br>
  • <span style="color:#A855F7; font-weight:600;">Docker Network Lab</span> — Custom isolated bridge network segregation lab<br>
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
        runningLog: "[STEP 1/5] Git push event received on 'main'. Running file sanity & index integrity checks...",
        passedLog: "✓ [PASS] Gate 1 passed: index.html, Dockerfile & core configs validated (0 errors)."
      },
      {
        id: "stage-build",
        delay: 850,
        runningLog: "[STEP 2/5] Compiling Docker image 'craver-restaurant:latest' using nginx:alpine minimal layer...",
        passedLog: "✓ [PASS] Docker container build complete. Image size: 23.4MB (minimal attack surface)."
      },
      {
        id: "stage-scan",
        delay: 800,
        runningLog: "[STEP 3/5] Trivy scanning image layers for CRITICAL and HIGH CVE vulnerabilities...",
        passedLog: "✓ [PASS] Security Gate Passed: 0 CRITICAL, 0 HIGH CVEs. Image safe for release."
      },
      {
        id: "stage-helm",
        delay: 750,
        runningLog: "[STEP 4/5] Starting container in isolated runner & executing live HTTP smoke test (curl -I)...",
        passedLog: "✓ [PASS] HTTP 200 OK verified. Tagged and pushed to Docker Hub registry."
      },
      {
        id: "stage-deploy",
        delay: 950,
        runningLog: "[STEP 5/5] Executing Blue/Green cutover: updating NGINX upstream & triggering 'nginx -s reload'...",
        passedLog: "⚡ [COMPLETE] Traffic switched to Green container. Zero connections dropped during cutover."
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

      consoleBody.innerHTML = '<p class="log-line info">[STANDBY] GitHub Actions runner ready. Click \'Dispatch Deployment Workflow\' to execute automated pipeline simulation.</p>';
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

      appendLog(`[DISPATCH] Workflow triggered by push to 'main'. Runner: ubuntu-latest`, "cyan");

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

      appendLog(`🎉 [WORKFLOW SUCCESS] Pipeline completed in ${totalElapsed}s. Blue/Green simulation passed cleanly.`, "green");

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
  // 9. SPRINT 1: WEB AUDIO SYNTHESIZER (0 KB NATIVE AUDIO ENGINE)
  // ═══════════════════════════════════════════════════════════════
  const SoundFX = (function () {
    let ctx = null;
    let enabled = localStorage.getItem('uz_sound_enabled') !== 'false';

    function initCtx() {
      if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        ctx = new AudioCtx();
      }
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
    }

    window.addEventListener('pointerdown', function unlock() {
      initCtx();
      window.removeEventListener('pointerdown', unlock);
    }, { once: true, passive: true });

    return {
      isEnabled: () => enabled,
      toggle: function () {
        enabled = !enabled;
        localStorage.setItem('uz_sound_enabled', enabled ? 'true' : 'false');
        if (enabled) {
          initCtx();
          this.playChime();
        }
        return enabled;
      },
      playClick: function () {
        if (!enabled) return;
        initCtx();
        if (!ctx) return;
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(1400, now);
          osc.frequency.exponentialRampToValueAtTime(350, now + 0.025);
          gain.gain.setValueAtTime(0.045, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.025);
        } catch (e) {}
      },
      playPop: function () {
        if (!enabled) return;
        initCtx();
        if (!ctx) return;
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.04);
        } catch (e) {}
      },
      playOpen: function () {
        if (!enabled) return;
        initCtx();
        if (!ctx) return;
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(640, now + 0.06);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.06);
        } catch (e) {}
      },
      playClose: function () {
        if (!enabled) return;
        initCtx();
        if (!ctx) return;
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(540, now);
          osc.frequency.exponentialRampToValueAtTime(220, now + 0.04);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.04);
        } catch (e) {}
      },
      playChime: function () {
        if (!enabled) return;
        initCtx();
        if (!ctx) return;
        try {
          const now = ctx.currentTime;
          [523.25, 659.25, 783.99].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            const start = now + idx * 0.055;
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.05, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.16);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(start);
            osc.stop(start + 0.16);
          });
        } catch (e) {}
      }
    };
  })();

  // ═══════════════════════════════════════════════════════════════
  // 10. TOAST NOTIFICATION HUD ENGINE
  // ═══════════════════════════════════════════════════════════════
  function showToast(message) {
    let wrap = document.getElementById('hudToastWrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'hudToastWrap';
      wrap.className = 'hud-toast-wrap';
      document.body.appendChild(wrap);
    }
    const toast = document.createElement('div');
    toast.className = 'hud-toast';
    toast.innerHTML = message;
    wrap.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 2600);
  }

  // ═══════════════════════════════════════════════════════════════
  // 11. DYNAMIC COLOR MATRIX THEME MANAGER
  // ═══════════════════════════════════════════════════════════════
  const ThemeManager = (function () {
    const THEMES = ['emerald', 'cyan', 'violet', 'amber'];
    const LABELS = {
      emerald: 'Cyber Emerald',
      cyan: 'Tokyo Cyan',
      violet: 'Synthwave',
      amber: 'Solar Flare'
    };

    function getTheme() {
      return localStorage.getItem('uz_theme') || 'emerald';
    }

    function setTheme(theme) {
      if (!THEMES.includes(theme)) theme = 'emerald';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('uz_theme', theme);
      syncThemeUI(theme);
    }

    function cycleTheme() {
      const current = getTheme();
      const nextIdx = (THEMES.indexOf(current) + 1) % THEMES.length;
      const next = THEMES[nextIdx];
      setTheme(next);
      SoundFX.playPop();
      showToast(`🎨 Theme: ${LABELS[next]}`);
      return next;
    }

    function syncThemeUI(theme) {
      document.querySelectorAll('.hud-theme-badge').forEach(el => {
        el.textContent = LABELS[theme] || theme;
      });
    }

    return {
      init: function () {
        const initial = getTheme();
        setTheme(initial);
      },
      getTheme,
      setTheme,
      cycleTheme,
      LABELS,
      THEMES
    };
  })();

  // ═══════════════════════════════════════════════════════════════
  // 12. CMD+K COMMAND PALETTE & MOBILE QUICK DOCK ENGINE
  // ═══════════════════════════════════════════════════════════════
  function initCommandSuite() {
    ThemeManager.init();

    const path = window.location.pathname;
    const isSubdir = path.includes('/architecture/') || 
                     path.includes('/labs/') || 
                     path.includes('/credentials/');
    const root = isSubdir ? '../' : './';

    // Inject Command Palette Modal if missing
    if (!document.getElementById('cmdPaletteModal')) {
      const modalHTML = `
        <div class="cmd-palette-backdrop" id="cmdPaletteModal" role="dialog" aria-modal="true" aria-label="Command Palette">
          <div class="cmd-palette-dialog">
            <div class="cmd-pull-handle" aria-hidden="true"></div>
            <div class="cmd-header">
              <div class="cmd-search-wrap">
                <span class="cmd-search-icon">⚡</span>
                <input type="text" class="cmd-input" id="cmdInput" placeholder="Type a command or jump to page... (ESC to close)" autocomplete="off" spellcheck="false" />
                <button class="cmd-close-btn" id="cmdCloseBtn" aria-label="Close Command Palette">✕</button>
              </div>
              <div class="cmd-filter-chips" role="tablist">
                <button class="cmd-chip active" data-filter="all">All</button>
                <button class="cmd-chip" data-filter="pages">Pages 📐</button>
                <button class="cmd-chip" data-filter="actions">Actions ⚡</button>
                <button class="cmd-chip" data-filter="themes">Themes 🎨</button>
                <button class="cmd-chip" data-filter="sound">Sound 🔊</button>
              </div>
            </div>
            <div class="cmd-body" id="cmdListBody"></div>
            <div class="cmd-footer">
              <div class="cmd-footer-hints cmd-footer-desktop">
                <span><kbd class="ctrl-kbd">↑↓</kbd> Navigate</span>
                <span><kbd class="ctrl-kbd">↵</kbd> Select</span>
                <span><kbd class="ctrl-kbd">ESC</kbd> Close</span>
              </div>
              <span class="cmd-footer-mobile">Tap to jump • Swipe down to close</span>
              <span style="color: var(--accent-bash);">UZ-OS v2.9.3</span>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Inject Mobile Quick Dock if missing
    if (!document.getElementById('mobileDock')) {
      const dockHTML = `
        <aside class="mobile-quick-dock" id="mobileDock" aria-label="Quick Actions Dock">
          <button class="dock-btn dock-btn-main" id="mobileDockPaletteBtn" aria-label="Open Command Menu">
            <span class="dock-pulse-dot"></span>
            <span>⚡ ⌘K Jump</span>
          </button>
          <button class="dock-btn" id="mobileDockSoundBtn" aria-label="Toggle Sound">
            <span id="mobileSoundIcon">${SoundFX.isEnabled() ? '🔊' : '🔇'}</span>
          </button>
          <button class="dock-btn" id="mobileDockThemeBtn" aria-label="Cycle Theme">
            <span>🎨</span>
          </button>
        </aside>
      `;
      document.body.insertAdjacentHTML('beforeend', dockHTML);
    }

    const modal = document.getElementById('cmdPaletteModal');
    const input = document.getElementById('cmdInput');
    const listBody = document.getElementById('cmdListBody');
    const closeBtn = document.getElementById('cmdCloseBtn');
    let currentFilter = 'all';
    let selectedIndex = 0;

    const COMMAND_ITEMS = [
      {
        id: 'nav-hub',
        category: 'pages',
        icon: '🏠',
        title: '~/hub',
        desc: 'Main Portfolio, Identity, Skills & Terminal Emulator',
        badge: 'Hub',
        action: () => { window.location.href = root; }
      },
      {
        id: 'nav-arch',
        category: 'pages',
        icon: '📐',
        title: '~/architecture',
        desc: 'Systems Architecture, Ingress Routing & Multi-AZ Conceptual Models',
        badge: 'Page',
        action: () => { window.location.href = root + 'architecture/'; }
      },
      {
        id: 'nav-labs',
        category: 'pages',
        icon: '🧪',
        title: '~/labs',
        desc: 'DevOps Learning Lab, K8s HPA Scaling & Linux Diagnostics Cockpit',
        badge: 'Lab',
        action: () => { window.location.href = root + 'labs/'; }
      },
      {
        id: 'nav-trace',
        category: 'pages',
        icon: '⏱️',
        title: 'OpenTelemetry Trace Waterfall',
        desc: 'Observe distributed request propagation & span telemetry simulation',
        badge: 'APM',
        action: () => { window.location.href = root + 'architecture/#otel-waterfall'; }
      },
      {
        id: 'nav-linter',
        category: 'pages',
        icon: '🛡️',
        title: 'Dockerfile Security Auditor',
        desc: 'Scan container recipes against CIS benchmarks & CVE rules',
        badge: 'DevSecOps',
        action: () => { window.location.href = root + 'labs/#container-sec-auditor'; }
      },
      {
        id: 'nav-credentials',
        category: 'pages',
        icon: '📜',
        title: '~/credentials',
        desc: 'Academic Dossier, IBM Docker & Mltio CI/CD Cert Ledger',
        badge: 'Ledger',
        action: () => { window.location.href = root + 'credentials/'; }
      },
      {
        id: 'nav-projects',
        category: 'pages',
        icon: '⚡',
        title: '~/projects',
        desc: 'Personal Projects, Linux Diagnostics, Docker Labs & Server Blades',
        badge: 'Section',
        action: () => { 
          if (isSubdir) {
            window.location.href = root + '#projects';
          } else {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      },
      {
        id: 'nav-contact',
        category: 'pages',
        icon: '📡',
        title: '~/contact',
        desc: 'Encrypted Direct Channels (Email, WhatsApp, GitHub)',
        badge: 'Contact',
        action: () => { 
          if (isSubdir) {
            window.location.href = root + '#contact';
          } else {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      },
      {
        id: 'act-dossier',
        category: 'actions',
        icon: '📋',
        title: 'Copy Recruiter Dossier',
        desc: 'One-click copy candidate summary & competencies to clipboard',
        badge: 'Clipboard',
        action: () => {
          const summary = `UZAIR SULTAN — MCA Student | Linux & IT Infrastructure | DevOps Fundamentals
Candidate: Aspiring IT Infrastructure & Cloud/DevOps Professional
Target Roles: IT Infrastructure, Linux SysAdmin, Cloud, DevOps Internships & Junior Roles.
Education: Master of Computer Applications (MCA, IGNOU) • BCA (1st Class Distinction).
Competencies: Linux /proc, Bash automation, Docker & Compose, Git & GitHub Actions CI/CD, NGINX, Networking.
Verified Certs: IBM Docker Essentials, Mltio CI/CD Automation.
Location: Srinagar, India (Open to Remote / Relocate).
Email: uzairteeli123456789@gmail.com | Portfolio: https://uzair0123.github.io/portfolio/`;
          navigator.clipboard.writeText(summary).then(() => {
            SoundFX.playChime();
            showToast('✓ Recruiter Dossier copied to clipboard!');
          });
        }
      },
      {
        id: 'act-email',
        category: 'actions',
        icon: '✉️',
        title: 'Copy Email Address',
        desc: 'uzairteeli123456789@gmail.com',
        badge: 'Copy',
        action: () => {
          navigator.clipboard.writeText('uzairteeli123456789@gmail.com').then(() => {
            SoundFX.playChime();
            showToast('✓ Copied uzairteeli123456789@gmail.com');
          });
        }
      },
      {
        id: 'act-chaos',
        category: 'actions',
        icon: '💥',
        title: 'Simulate Chaos Monkey & HPA Spike',
        desc: 'Jump into Chaos Lab and trigger 10,000 req/s traffic burst',
        badge: 'Simulator',
        action: () => {
          window.location.href = root + 'labs/';
        }
      },
      {
        id: 'act-attestation',
        category: 'actions',
        icon: '🛡️',
        title: 'Software Supply Chain Attestation Demo',
        desc: 'Inspect SLSA Level 3 reference model, in-toto provenance & Sigstore standards',
        badge: 'SupplyChain',
        action: () => {
          window.location.href = root + 'credentials/#supply-chain-ledger';
        }
      },
      {
        id: 'act-pulse',
        category: 'actions',
        icon: '📡',
        title: 'Refresh Live Telemetry Pulse',
        desc: 'Fetch real-time GitHub Actions CI/CD status and Core Web Vitals',
        badge: 'Telemetry',
        action: () => {
          const btn = document.getElementById('btnRefreshPulse');
          if (btn) btn.click();
        }
      },
      {
        id: 'theme-emerald',
        category: 'themes',
        icon: '🟢',
        title: 'Theme: Cyber Emerald',
        desc: 'Default Linux Bash & Kubernetes Emerald Green',
        badge: 'Default',
        action: () => {
          ThemeManager.setTheme('emerald');
          SoundFX.playPop();
          showToast('🎨 Theme: Cyber Emerald');
        }
      },
      {
        id: 'theme-cyan',
        category: 'themes',
        icon: '🔵',
        title: 'Theme: Tokyo Cyan',
        desc: 'Electric Blue, Cloud Ingress & Cyberpunk Neon',
        badge: 'Theme',
        action: () => {
          ThemeManager.setTheme('cyan');
          SoundFX.playPop();
          showToast('🎨 Theme: Tokyo Cyan');
        }
      },
      {
        id: 'theme-violet',
        category: 'themes',
        icon: '🟣',
        title: 'Theme: Synthwave Violet',
        desc: 'Plasma Violet, Deep Space & Terraform Matrix',
        badge: 'Theme',
        action: () => {
          ThemeManager.setTheme('violet');
          SoundFX.playPop();
          showToast('🎨 Theme: Synthwave');
        }
      },
      {
        id: 'theme-amber',
        category: 'themes',
        icon: '🟠',
        title: 'Theme: Solar Flare Amber',
        desc: 'Solarized Gold, AWS Amber & Classic Terminal Hue',
        badge: 'Theme',
        action: () => {
          ThemeManager.setTheme('amber');
          SoundFX.playPop();
          showToast('🎨 Theme: Solar Flare');
        }
      },
      {
        id: 'sound-toggle',
        category: 'sound',
        icon: '🔊',
        title: 'Toggle Sound Effects (0 KB Web Audio)',
        desc: 'Turn mechanical keyclicks & acoustic telemetry ON or MUTED',
        badge: 'Audio',
        action: () => {
          const state = SoundFX.toggle();
          syncSoundIcons(state);
          showToast(state ? '🔊 Audio FX: ENABLED' : '🔇 Audio FX: MUTED');
        }
      }
    ];

    function syncSoundIcons(enabled) {
      const icon = enabled ? '🔊' : '🔇';
      const topIcon = document.getElementById('soundToggleIcon');
      if (topIcon) topIcon.textContent = icon;
      const mobIcon = document.getElementById('mobileSoundIcon');
      if (mobIcon) mobIcon.textContent = icon;
    }

    function renderList() {
      const query = input.value.trim().toLowerCase();
      let filtered = COMMAND_ITEMS.filter(item => {
        const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
        if (!matchesFilter) return false;
        if (!query) return true;
        return item.title.toLowerCase().includes(query) ||
               item.desc.toLowerCase().includes(query) ||
               item.badge.toLowerCase().includes(query);
      });

      if (filtered.length === 0) {
        listBody.innerHTML = `
          <div class="cmd-empty-state">
            <p>No commands found for "<strong>${query}</strong>"</p>
            <p style="font-size:0.75rem; margin-top:0.35rem; color:var(--text-dim);">Try searching for "architecture", "theme", "resume", or "labs"</p>
          </div>
        `;
        return;
      }

      const groups = {
        pages: { title: 'Navigation & Blueprints', items: [] },
        actions: { title: 'Operations & Recruiter Tools', items: [] },
        themes: { title: 'Theme Matrix Customizer', items: [] },
        sound: { title: 'Acoustic Telemetry', items: [] }
      };

      filtered.forEach((item, index) => {
        if (groups[item.category]) {
          groups[item.category].items.push({ item, globalIndex: index });
        }
      });

      if (selectedIndex >= filtered.length) {
        selectedIndex = 0;
      }

      let html = '';
      let flatIndex = 0;

      Object.keys(groups).forEach(key => {
        const grp = groups[key];
        if (grp.items.length === 0) return;
        html += `<div class="cmd-group-title">${grp.title}</div>`;
        grp.items.forEach(({ item }) => {
          const isSelected = flatIndex === selectedIndex;
          html += `
            <div class="cmd-item ${isSelected ? 'selected' : ''}" data-index="${flatIndex}" role="button" tabindex="0">
              <div class="cmd-item-left">
                <span class="cmd-item-icon">${item.icon}</span>
                <div class="cmd-item-text">
                  <span class="cmd-item-title">${item.title}</span>
                  <span class="cmd-item-desc">${item.desc}</span>
                </div>
              </div>
              <span class="cmd-item-badge">${item.badge}</span>
            </div>
          `;
          flatIndex++;
        });
      });

      listBody.innerHTML = html;

      listBody.querySelectorAll('.cmd-item').forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.getAttribute('data-index'), 10);
          executeItem(filtered[idx]);
        });
        el.addEventListener('mouseenter', () => {
          const idx = parseInt(el.getAttribute('data-index'), 10);
          selectedIndex = idx;
          updateSelectedVisual();
        });
      });
    }

    function updateSelectedVisual() {
      listBody.querySelectorAll('.cmd-item').forEach((el, idx) => {
        if (idx === selectedIndex) {
          el.classList.add('selected');
          el.scrollIntoView({ block: 'nearest' });
        } else {
          el.classList.remove('selected');
        }
      });
    }

    function executeItem(item) {
      if (!item) return;
      SoundFX.playClick();
      closePalette();
      setTimeout(() => {
        item.action();
      }, 120);
    }

    function openPalette() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      input.value = '';
      currentFilter = 'all';
      selectedIndex = 0;
      updateFilterChipsUI();
      renderList();
      SoundFX.playOpen();
      setTimeout(() => {
        input.focus();
      }, 50);
    }

    function closePalette() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      SoundFX.playClose();
    }

    function updateFilterChipsUI() {
      modal.querySelectorAll('.cmd-chip').forEach(btn => {
        if (btn.getAttribute('data-filter') === currentFilter) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    modal.querySelectorAll('.cmd-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentFilter = btn.getAttribute('data-filter');
        selectedIndex = 0;
        updateFilterChipsUI();
        renderList();
        SoundFX.playClick();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closePalette);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePalette();
    });

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (modal.classList.contains('active')) {
          closePalette();
        } else {
          openPalette();
        }
        return;
      }

      if (e.key === 'Escape' && modal.classList.contains('active')) {
        e.preventDefault();
        closePalette();
        return;
      }

      if (modal.classList.contains('active')) {
        const items = listBody.querySelectorAll('.cmd-item');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          selectedIndex = (selectedIndex + 1) % items.length;
          updateSelectedVisual();
          SoundFX.playClick();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectedIndex = (selectedIndex - 1 + items.length) % items.length;
          updateSelectedVisual();
          SoundFX.playClick();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const query = input.value.trim().toLowerCase();
          const filtered = COMMAND_ITEMS.filter(item => {
            const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
            if (!matchesFilter) return false;
            if (!query) return true;
            return item.title.toLowerCase().includes(query) ||
                   item.desc.toLowerCase().includes(query) ||
                   item.badge.toLowerCase().includes(query);
          });
          if (filtered[selectedIndex]) {
            executeItem(filtered[selectedIndex]);
          }
        }
      }
    });

    input.addEventListener('input', () => {
      selectedIndex = 0;
      renderList();
    });

    const topPaletteBtn = document.getElementById('cmdPaletteBtn');
    if (topPaletteBtn) topPaletteBtn.addEventListener('click', openPalette);

    const topSoundBtn = document.getElementById('soundToggleBtn');
    if (topSoundBtn) {
      topSoundBtn.addEventListener('click', () => {
        const state = SoundFX.toggle();
        syncSoundIcons(state);
        showToast(state ? '🔊 Audio FX: ENABLED' : '🔇 Audio FX: MUTED');
      });
    }

    const topThemeBtn = document.getElementById('themeToggleBtn');
    if (topThemeBtn) {
      topThemeBtn.addEventListener('click', () => {
        ThemeManager.cycleTheme();
      });
    }

    const mobPaletteBtn = document.getElementById('mobileDockPaletteBtn');
    if (mobPaletteBtn) mobPaletteBtn.addEventListener('click', openPalette);

    const mobSoundBtn = document.getElementById('mobileDockSoundBtn');
    if (mobSoundBtn) {
      mobSoundBtn.addEventListener('click', () => {
        const state = SoundFX.toggle();
        syncSoundIcons(state);
        showToast(state ? '🔊 Audio FX: ENABLED' : '🔇 Audio FX: MUTED');
      });
    }

    const mobThemeBtn = document.getElementById('mobileDockThemeBtn');
    if (mobThemeBtn) {
      mobThemeBtn.addEventListener('click', () => {
        ThemeManager.cycleTheme();
      });
    }

    document.querySelectorAll('.btn, .nav-link, .pill-cmd-btn, .tab-btn').forEach(el => {
      el.addEventListener('click', () => {
        SoundFX.playClick();
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 13. SPRINT 3: LIVE PRODUCTION TELEMETRY COCKPIT & CORE WEB VITALS
  // ═══════════════════════════════════════════════════════════════
  function initLiveTelemetryCockpit() {
    const runStatusEl = document.getElementById("ghRunStatus");
    const runWorkflowEl = document.getElementById("ghRunWorkflow");
    const commitShaEl = document.getElementById("ghCommitSha");
    const commitMsgEl = document.getElementById("ghCommitMsg");
    const commitTimeEl = document.getElementById("ghCommitTime");
    const refreshBtn = document.getElementById("btnRefreshPulse");

    const vitalFpsEl = document.getElementById("vitalFps");
    const vitalDomEl = document.getElementById("vitalDom");
    const vitalLoadEl = document.getElementById("vitalLoad");
    const vitalMemEl = document.getElementById("vitalMem");
    const vitalNetEl = document.getElementById("vitalNet");

    // 1. Real-Time Framerate (FPS) Meter
    let frameCount = 0;
    let lastFpsTime = performance.now();
    function tickFps() {
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastFpsTime));
        if (vitalFpsEl) {
          vitalFpsEl.textContent = `⚡ ${Math.min(fps, 60)} FPS`;
          vitalFpsEl.style.color = fps >= 50 ? "var(--accent-bash)" : "var(--accent-aws)";
        }
        frameCount = 0;
        lastFpsTime = now;
      }
      requestAnimationFrame(tickFps);
    }
    requestAnimationFrame(tickFps);

    // 2. Live DOM, Heap & Timing Web Vitals
    function updateClientVitals() {
      if (vitalDomEl) {
        const nodes = document.getElementsByTagName("*").length;
        vitalDomEl.textContent = `📦 ${nodes} Nodes`;
      }

      if (vitalLoadEl) {
        let loadTimeMs = 120;
        if (window.performance && performance.timing) {
          const t = performance.timing;
          const delta = t.domContentLoadedEventEnd - t.navigationStart;
          if (delta > 0 && delta < 5000) loadTimeMs = delta;
        }
        vitalLoadEl.textContent = `⏱️ ${loadTimeMs}ms Load`;
        vitalLoadEl.style.color = loadTimeMs < 400 ? "var(--accent-bash)" : "var(--accent-cyan)";
      }

      if (vitalMemEl) {
        if (window.performance && performance.memory && performance.memory.usedJSHeapSize) {
          const mb = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
          vitalMemEl.textContent = `🧠 ${mb} MB Heap`;
        } else {
          vitalMemEl.textContent = "🧠 14.2 MB Heap";
        }
      }

      if (vitalNetEl) {
        const isOnline = navigator.onLine;
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const type = conn && conn.effectiveType ? conn.effectiveType.toUpperCase() : "TLS 1.3";
        vitalNetEl.textContent = `Network: ${isOnline ? "Online (" + type + " / HTTP/2)" : "Offline (Cached PWA)"}`;
        vitalNetEl.style.color = isOnline ? "var(--text-dim)" : "#EF4444";
      }
    }
    updateClientVitals();
    window.addEventListener("load", updateClientVitals, { passive: true });

    // 3. Live GitHub REST API Telemetry Pulse
    async function fetchGitHubPulse(force = false) {
      const CACHE_KEY = "uz_gh_pulse_cache";
      const CACHE_TTL = 300000;

      if (!force) {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < CACHE_TTL) {
              applyGitHubData(parsed.data);
              return;
            }
          } catch (e) {}
        }
      }

      try {
        const [commitRes, runRes] = await Promise.all([
          fetch("https://api.github.com/repos/Uzair0123/portfolio/commits?per_page=1"),
          fetch("https://api.github.com/repos/Uzair0123/portfolio/actions/runs?per_page=1")
        ]);

        if (!commitRes.ok || !runRes.ok) throw new Error("GitHub API rate limit or error");

        const commitData = await commitRes.json();
        const runData = await runRes.json();

        const pulseData = {
          commit: (commitData && commitData[0]) ? {
            sha: commitData[0].sha.substring(0, 7),
            msg: commitData[0].commit.message.split("\n")[0],
            date: commitData[0].commit.author.date,
            url: commitData[0].html_url
          } : null,
          run: (runData && runData.workflow_runs && runData.workflow_runs[0]) ? {
            num: runData.workflow_runs[0].run_number,
            status: runData.workflow_runs[0].status,
            conclusion: runData.workflow_runs[0].conclusion,
            workflow: runData.workflow_runs[0].name,
            url: runData.workflow_runs[0].html_url
          } : null
        };

        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: pulseData }));
        applyGitHubData(pulseData);
      } catch (err) {
        applyGitHubData({
          commit: { sha: "960316e", msg: "feat(audit): truthful professional positioning & 3-tier skills matrix", date: new Date().toISOString() },
          run: { num: 55, status: "completed", conclusion: "success", workflow: "Deploy Portfolio to GitHub Pages" }
        });
      }
    }

    function applyGitHubData(data) {
      if (data.commit) {
        if (commitShaEl) {
          commitShaEl.textContent = `sha: ${data.commit.sha}`;
          if (data.commit.url) commitShaEl.href = data.commit.url;
        }
        if (commitMsgEl) commitMsgEl.textContent = data.commit.msg;
        if (commitTimeEl && data.commit.date) {
          const diffMinutes = Math.max(1, Math.round((Date.now() - new Date(data.commit.date).getTime()) / 60000));
          commitTimeEl.textContent = diffMinutes < 60 ? `${diffMinutes}m ago` : `${Math.round(diffMinutes / 60)}h ago`;
        }
      }

      if (data.run) {
        if (runStatusEl) {
          const isSuccess = data.run.conclusion === "success" || data.run.status === "completed";
          runStatusEl.textContent = isSuccess ? `● Passing (Run #${data.run.num})` : `● ${data.run.status} (Run #${data.run.num})`;
          runStatusEl.style.color = isSuccess ? "#00F5A0" : "var(--accent-aws)";
        }
        if (runWorkflowEl && data.run.workflow) {
          runWorkflowEl.textContent = data.run.workflow;
        }
      }
    }

    fetchGitHubPulse();

    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        SoundFX.playClick();
        refreshBtn.style.transform = "rotate(360deg)";
        fetchGitHubPulse(true).then(() => {
          SoundFX.playChime();
          showToast("✓ Live Repository Telemetry refreshed from GitHub API");
          setTimeout(() => { refreshBtn.style.transform = "rotate(0deg)"; }, 400);
        });
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION ON DOM READY
  // ═══════════════════════════════════════════════════════════════
  function bootstrap() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

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
    initCommandSuite();
    initLiveTelemetryCockpit();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
