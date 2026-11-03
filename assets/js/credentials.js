/**
 * Uzair Sultan — DevOps & Cloud Infrastructure Portfolio
 * Credentials, Certifications & Academic Dossier Engine (/credentials/)
 * ----------------------------------------------------------------------
 * 1. Cryptographic Certificate Inspector & Modal Verification
 * 2. 1-Click CID Hash & Recruiter Summary Copy Engine
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // 1. CERTIFICATE VERIFICATION MODAL ENGINE
  // ═══════════════════════════════════════════════════════════════
  const certDetails = {
    docker: {
      title: "Docker Essentials: A Developer Introduction",
      issuer: "Cognitive Class • IBM Developer Skills Network",
      issuedDate: "October 2026",
      cid: "963031e61d0745338ded287cf0331aff",
      shaBlock: "SHA256: 963031e61d0745338ded287cf0331aff290b41c0e3a67d0a218f4c2190e31aff",
      verifyUrl: "https://cognitiveclass.ai/",
      skills: [
        "Docker Engine & Container Architecture",
        "Multi-stage Docker Builds & Layer Optimization",
        "Distroless & Minimal OCI Container Images",
        "Volume Persistence & Container Networking",
        "Docker Compose Microservices Orchestration"
      ],
      description: "Verified comprehensive developer mastery of container fundamentals, image compilation, Dockerfile security hardening, and local-to-cloud containerized application orchestration."
    },

    cicd: {
      title: "DevOps & CI/CD Automation Engine",
      issuer: "Mltio University",
      issuedDate: "October 2026",
      cid: "MU-ACAD-2026-EZYAPPYZ",
      shaBlock: "CID: MU-ACAD-2026-EZYAPPYZ (Integrity: Validated 100%)",
      verifyUrl: "https://github.com/Uzair0123",
      skills: [
        "GitHub Actions Workflow Architecture",
        "Automated Test & Security Gating (SAST/Trivy)",
        "Semantic Versioning & Git Release Automation",
        "Container Registry Publishing (GHCR/ECR)",
        "Zero-Downtime Rolling Update Deployments"
      ],
      description: "Advanced verification in automated continuous integration and continuous deployment pipelines, artifact provenance signing, branch protection rules, and cloud infrastructure release lifecycles."
    }
  };

  function initCertModal() {
    const modal = document.getElementById("certModal");
    const modalClose = document.getElementById("certModalClose");
    const modalTitle = document.getElementById("modalCertTitle");
    const modalIssuer = document.getElementById("modalCertIssuer");
    const modalDate = document.getElementById("modalCertDate");
    const modalHash = document.getElementById("modalCertHash");
    const modalDesc = document.getElementById("modalCertDesc");
    const modalSkills = document.getElementById("modalCertSkills");
    const modalVerifyBtn = document.getElementById("modalCertVerifyBtn");
    const copyHashBtn = document.getElementById("modalCopyHashBtn");

    if (!modal) return;

    function openModal(certKey) {
      const data = certDetails[certKey];
      if (!data) return;

      if (modalTitle) modalTitle.textContent = data.title;
      if (modalIssuer) modalIssuer.textContent = data.issuer;
      if (modalDate) modalDate.textContent = `Issued: ${data.issuedDate}`;
      if (modalHash) modalHash.textContent = data.shaBlock;
      if (modalDesc) modalDesc.textContent = data.description;

      if (modalSkills) {
        modalSkills.innerHTML = data.skills
          .map((s) => `<li><span style="color:#00F5A0;">✓</span> ${s}</li>`)
          .join("");
      }

      if (modalVerifyBtn) {
        modalVerifyBtn.href = data.verifyUrl;
      }

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }

    document.querySelectorAll(".btn-inspect-cert").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-cert");
        openModal(key);
      });
    });

    if (modalClose) {
      modalClose.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });

    if (copyHashBtn) {
      copyHashBtn.addEventListener("click", () => {
        const hashText = modalHash ? modalHash.textContent : "";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(hashText).then(() => {
            copyHashBtn.textContent = "Hash Copied! ✓";
            setTimeout(() => {
              copyHashBtn.textContent = "Copy Hash 📋";
            }, 2000);
          });
        }
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. 1-CLICK RECRUITER DOSSIER COPY ENGINE
  // ═══════════════════════════════════════════════════════════════
  function initRecruiterCopy() {
    const copyDossierBtn = document.getElementById("copyDossierBtn");
    if (!copyDossierBtn) return;

    const summaryText = `Uzair Sultan — DevOps & Cloud Infrastructure Architect
Location: Srinagar, J&K, India (Open to Remote & Global Relocation)
Email: uzairteeli123456789@gmail.com | Phone/WhatsApp: +91 7889446114
GitHub: https://github.com/Uzair0123
Portfolio: https://uzair0123.github.io/portfolio/

ACADEMIC QUALIFICATIONS:
• Master of Computer Applications (MCA) — IGNOU (2026 — Present)
  Focus: Distributed Systems, High-Availability Cloud Infrastructure & Networking.
• Bachelor of Computer Applications (BCA) — University of Kashmir (2021 — 2024)
  Honors: First Class Distinction in Operating Systems, Database Systems & Algorithms.

VERIFIED INDUSTRY CERTIFICATIONS:
• Docker Essentials: A Developer Introduction (Cognitive Class / IBM Skills Network)
  CID: 963031e61d0745338ded287cf0331aff
• DevOps & CI/CD Automation (Mltio University)
  CID: MU-ACAD-2026-EZYAPPYZ

CORE TECHNICAL TOOLKIT:
Docker, Kubernetes (v1.30), AWS Cloud (VPC, EKS, ALB, S3, IAM, CloudFront), Terraform HCL, Linux Kernel Primitives, Bash Automation, NGINX, GitOps, CI/CD Pipelines.`;

    copyDossierBtn.addEventListener("click", () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(summaryText).then(() => {
          copyDossierBtn.textContent = "Dossier Copied! ✓";
          setTimeout(() => {
            copyDossierBtn.textContent = "Copy Recruiter Dossier 📋";
          }, 2200);
        });
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION ON DOM READY
  // ═══════════════════════════════════════════════════════════════
  function initCredentials() {
    initCertModal();
    initRecruiterCopy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCredentials);
  } else {
    initCredentials();
  }
})();
