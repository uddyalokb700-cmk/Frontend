# ⚡ Uddyalok Biswas — Futuristic Developer & Data Science Portfolio

<div align="center">

![Portfolio Banner](assets/images/uddyalok-reading-portrait.jpg)

### **Intelligent • Intuitive • Scalable Digital Experiences**

[![License: MIT](https://img.shields.io/badge/License-MIT-00f0ff.svg?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript ES6+](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-8B5CF6?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

[**🌐 Live Demo**](http://localhost:8000) • [**💼 LinkedIn**](https://linkedin.com/in/uddyalokbiswas) • [**🐙 GitHub**](https://github.com/uddyalokbiswas) • [**⚡ Devfolio**](https://devfolio.co/@uddyalok)

</div>

---

## 🌌 Overview

This repository houses the personal portfolio website of **Uddyalok Biswas**, a 2nd-year B.Tech CSE (Data Science) undergraduate at **Narula Institute of Technology** (Batch 2025–2029).

Built with high-contrast obsidian dark aesthetics, neon cyan/purple/emerald HUD elements, smooth micro-interactions, and high-performance vanilla web technologies, the portfolio bridges data science intelligence, intuitive UI/UX design, and full-stack web engineering.

---

## ✨ Key Features

- **🪐 60 FPS Interactive Cyber Canvas**: Custom HTML5 Canvas particle constellation background reacting dynamically to mouse movement and window resize (`js/canvas-bg.js`).
- **🔮 Futuristic HUD & Glassmorphism Design System**: Built with CSS custom properties (design tokens), neon glow effects, scanline textures, and cyber brackets (`css/tokens.css`, `css/components.css`).
- **🎵 Real-Time Web Audio API Synthesis**: Optional ambient audio feedback synthesized in-browser with sine/triangle waves upon UI interactions and toggling.
- **📂 Dynamic Filterable Project Showcase**: Filter projects by Data & SQL, AI/ML, Web Dev, UI/UX, and Hackathons with real-time DOM transitions and interactive deep-dive modal dialogs (`js/projects-data.js`).
- **🎯 Custom Dual Cursor**: Smooth lagging cursor outline with interactive hover scaling on desktop viewports.
- **⏱️ Live Telemetry & IST Clock**: Real-time status indicators and synchronized Kolkata IST digital clock in the footer.
- **✉️ Working Contact Transmission**: Contact form integrated with **EmailJS** for direct inbox message delivery, complemented by a one-click clipboard copy feature.
- **📱 100% Responsive**: Fully responsive layout optimized for mobile screens, tablets, ultra-wide desktop monitors, and touch-enabled devices.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies & Tools |
| :--- | :--- |
| **Markup & Semantics** | Semantic HTML5, OpenGraph Meta Tags, Accessible ARIA standards |
| **Styling & Design System** | Modern Vanilla CSS, CSS Grid & Bento Layouts, CSS Custom Variables, Keyframe Animations |
| **Interactivity & Logic** | Modern JavaScript (ES6+ Modules, Web Audio API, IntersectionObserver, Canvas API) |
| **Typography** | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Headings), [Outfit](https://fonts.google.com/specimen/Outfit) (Body), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Telemetry & Code) |
| **Integrations** | [EmailJS](https://www.emailjs.com/) Browser SDK for serverless email dispatching |

---

## 📁 Repository Structure

```tree
Frontend/
├── index.html              # Main single-page portfolio layout & structure
├── README.md               # Detailed project documentation
├── .gitignore              # Git ignore rules for OS and temp files
├── css/
│   ├── tokens.css          # Design system tokens (colors, gradients, typography, glow effects)
│   ├── animations.css      # Keyframes, floating animations, cyber pulse & scanlines
│   ├── components.css      # Buttons, badges, bento cards, hud boxes, modals, toasts
│   └── main.css            # Layout grids, sections, navigation bar, responsive media queries
├── js/
│   ├── canvas-bg.js        # 60fps constellation particles canvas background engine
│   ├── projects-data.js    # Central data store for projects, tags, and modal metadata
│   └── main.js             # Core interaction engine (Audio, Cursor, Modals, Filter, Form, Clock)
└── assets/
    └── images/             # Project showcase mockups, graphics, and portrait imagery
        ├── uddyalok-portrait.jpg
        ├── fin-ai.jpg
        ├── customer-analytics.jpg
        ├── ecopulse-hackathon.jpg
        └── nexus-uiux.jpg
```

---

## 🚀 Featured Projects Highlighted

1. **Customer Feedback Behaviour Analytics**
   - *Domain:* SQL • Python • Data Analytics • Cohort Analysis
   - *Summary:* Analyzed 24,000+ feedback records using SQL optimization and Python to determine churn factors and boost retention insights by 18%.
2. **Fin AI App — Intelligent Financial Assistant**
   - *Domain:* AI • Python API • Machine Learning • Full-Stack
   - *Summary:* Real-time market analytics, neural 6-month portfolio forecasting, and contextual financial advisory assistant.
3. **EcoPulse — Smart Sustainability Platform**
   - *Domain:* Hackathons • IoT Telemetry • WebGL • React
   - *Summary:* 36-hour rapid prototype providing real-time carbon footprint visualization and 3D geospatial renewable energy penetration maps.
4. **Nexus — Dark Futuristic UI/UX Design System**
   - *Domain:* UI/UX Design • Design Tokens • Figma • Frontend Dev
   - *Summary:* Modular design system featuring 120+ component variants, WCAG AAA compliant contrast, and cyber aesthetic tokens.

---

## 💻 Local Development Setup

No complex build pipelines or external dependencies are required. You can run the site locally using any standard static server:

### Option 1: Python Built-in Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/uddyalokb700-cmk/Frontend.git
cd Frontend

# Start local HTTP server
python3 -m http.server 8000
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

### Option 2: Node.js `serve` / `live-server`
```bash
# Using npx serve
npx serve .

# Or using live-server for auto-reloading
npx live-server
```

---

## ⚙️ Customization & Configuration

### 1. Updating Projects Data
Edit [`js/projects-data.js`](js/projects-data.js) to add, modify, or remove projects. The UI and filter tabs will automatically re-render dynamically:
```javascript
{
  id: 'your-project-id',
  title: 'Project Title',
  category: 'data', // Options: 'data', 'ai', 'web', 'ui/ux', 'hackathons'
  status: 'Completed',
  statusClass: 'cyber-badge-emerald',
  image: 'assets/images/your-image.jpg',
  summary: 'Brief description of your project...',
  tags: ['Python', 'SQL', 'React'],
  modal: {
    headline: 'Full Project Headline',
    overview: 'In-depth breakdown of the project architecture and impact...',
    highlights: ['Key milestone 1', 'Key milestone 2'],
    stack: ['Tech 1', 'Tech 2'],
    github: 'https://github.com/your-username/project',
    demo: 'https://your-demo-link.com'
  }
}
```

### 2. Contact Form (EmailJS) Configuration
To connect the contact form to your personal email, update your public key and template IDs in [`js/main.js`](js/main.js):
```javascript
emailjs.init({
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
});
```

---

## 📬 Contact & Connect

- **Name:** Uddyalok Biswas
- **Institution:** Narula Institute of Technology (B.Tech CSE Data Science '29)
- **Email:** [contact.uddyalok@gmail.com](mailto:contact.uddyalok@gmail.com)
- **GitHub:** [@uddyalokbiswas](https://github.com/uddyalokbiswas)
- **LinkedIn:** [linkedin.com/in/uddyalokbiswas](https://linkedin.com/in/uddyalokbiswas)

---

<div align="center">
  <sub>Designed & Developed with precision by <strong>Uddyalok Biswas</strong> © 2026. All rights reserved.</sub>
</div>