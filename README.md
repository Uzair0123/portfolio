# ⚡ Uzair Sultan — Personal Portfolio & Interactive Cyber Terminal

[![Live Demo](https://img.shields.io/badge/Demo-uzair0123.github.io%2Fportfolio-58A6FF?style=for-the-badge&logo=google-chrome&logoColor=white)](https://uzair0123.github.io/portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Deploy-GitHub_Pages-success?style=for-the-badge&logo=githubactions&logoColor=white)](https://uzair0123.github.io/portfolio/)

An ultra-modern, dark glassmorphism personal portfolio and embedded Linux bash terminal simulator for **Uzair Sultan** (MCA Student, Aspiring Software & Systems Engineer, and Linux Enthusiast).

---

## 🌟 Key Features

* **🖥️ Interactive Bash Terminal Console:** A live Linux shell emulator supporting custom commands:
  * `whoami` — Displays identity, education, and career orientation.
  * `skills` — Renders an organized technical matrix of languages and tools.
  * `projects` — Shows active production and learning projects with repository links.
  * `neofetch` — Visual ASCII system overview.
  * `contact` — Quick developer connection links.
  * `sudo hire` — Interactive recruitment response.
  * `clear` / `help` — Terminal utility controls.
* **📊 Comprehensive Skills Matrix:** Demonstrating core competencies across Linux Administration, Computer Networking, Modern Web Architecture, Python, and DevOps fundamentals.
* **🚀 Production Projects Showcase:** Highlighting live commercial work (such as *Kashmir Kesar Kingdom Pvt. Ltd.*) and systems projects.
* **📱 Bulletproof Responsive Design:** 100% responsive across smartphones, tablets, laptops, and ultra-wide desktop displays.
* **⚙️ Automated GitHub Actions CI/CD:** Automated deployment pipeline publishing directly to GitHub Pages.

---

## 🛠️ Tech Stack

* **Frontend:** Semantic HTML5, Modern CSS3 (CSS Grid, Flexbox, Glassmorphism, CSS Custom Properties), Modular Vanilla JavaScript (ES6+).
* **Deployment & CI/CD:** GitHub Pages, GitHub Actions.
* **Performance:** 100% pure vanilla implementation with zero external JS framework overhead for sub-second load times.

---

## 📂 Project Structure

```
portfolio/
├── index.html              # Main Entry Point & Terminal Interface
├── assets/
│   ├── css/                # Glassmorphism design tokens & styles
│   ├── js/                 # Terminal logic & UI controllers
│   └── images/             # Profile & UI assets
├── docs/                   # Documentation & architecture notes
└── README.md               # Project documentation
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser
Simply double-click `index.html` in your file browser.

### Option 2: Local Web Server
```bash
git clone https://github.com/Uzair0123/portfolio.git
cd portfolio
python3 -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

---

## 💡 What I Learned

* Designing an interactive state machine for terminal command parsing and command history navigation.
* Creating modern UI aesthetics with pure CSS variables and glassmorphism without heavy UI libraries.
* Implementing automated GitHub Actions workflows for continuous deployment.
