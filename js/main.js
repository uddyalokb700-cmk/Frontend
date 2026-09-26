/**
 * MAIN INTERACTION ENGINE
 * Uddyalok Biswas — Dark Futuristic Portfolio
 * Handles Navigation, Filtering, Modals, Audio Effects, Toasts, Form, and Telemetry
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Audio Synthesis (Subtle Futuristic Micro-Tones via Web Audio API)
  // ------------------------------------------------------------------------
  let audioCtx = null;
  let isSoundEnabled = false;
  const soundToggleBtn = document.getElementById('sound-toggle-btn');

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
  }

  function playCyberTone(freq = 440, type = 'sine', duration = 0.08, gainVal = 0.03) {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (err) {
      // Audio playback silently guarded
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudioContext();
      isSoundEnabled = !isSoundEnabled;
      soundToggleBtn.classList.toggle('active', isSoundEnabled);
      soundToggleBtn.setAttribute('title', isSoundEnabled ? 'Mute Cyber Audio' : 'Enable Cyber Audio');
      
      const icon = soundToggleBtn.querySelector('svg');
      if (icon) {
        if (isSoundEnabled) {
          icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08"></path>`;
          playCyberTone(880, 'sine', 0.12, 0.05);
          showToast('🔊 Audio synthesis enabled');
        } else {
          icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;
          showToast('🔇 Audio synthesis muted');
        }
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. Custom Cursor Follower (Desktop only)
  // ------------------------------------------------------------------------
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverables = document.querySelectorAll('a, button, .bento-card, .skill-pill, .filter-btn, .project-card, .cert-item');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        playCyberTone(580, 'triangle', 0.04, 0.02);
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. Header Scroll Effect & Active Section Spy
  // ------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 4. Mobile Menu Drawer
  // ------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      playCyberTone(isOpen ? 660 : 440, 'sine', 0.06, 0.03);
    });

    // Close on link click
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5. Projects Rendering & Filter System
  // ------------------------------------------------------------------------
  const projectsGrid = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function renderProjects(filter = 'all') {
    if (!projectsGrid || typeof PROJECTS_DATA === 'undefined') return;

    projectsGrid.innerHTML = '';

    const filtered = filter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => {
          if (filter === 'data') return p.category === 'data' || p.tags.includes('SQL') || p.tags.includes('Data Analytics');
          if (filter === 'ai') return p.category === 'ai' || p.tags.includes('AI');
          if (filter === 'hackathons') return p.category === 'hackathons' || p.tags.includes('Hackathons');
          if (filter === 'ui/ux') return p.category === 'ui/ux' || p.tags.includes('UI/UX');
          if (filter === 'web') return p.tags.includes('Frontend Dev') || p.tags.includes('React') || p.category === 'web';
          return p.category === filter;
        });

    filtered.forEach((project) => {
      const card = document.createElement('div');
      card.className = 'project-card hud-box reveal-init revealed';
      card.setAttribute('data-id', project.id);

      const tagsHtml = project.tags
        .slice(0, 4)
        .map((tag) => `<span class="tech-tag">${tag}</span>`)
        .join('');

      card.innerHTML = `
        <div class="project-media-box">
          <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy" />
          <div class="project-status-tag">
            <span class="cyber-badge ${project.statusClass}">
              <span class="status-dot"></span> ${project.status}
            </span>
          </div>
        </div>
        <div class="project-body">
          <div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-summary">${project.summary}</p>
            <div class="project-tags">${tagsHtml}</div>
          </div>
          <div class="project-actions">
            <button class="btn btn-primary btn-sm view-details-btn" data-project-id="${project.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              View Case Details
            </button>
            <a href="https://github.com/uddyalokbiswas" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm btn-icon-only" title="GitHub Repository">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        </div>
      `;

      projectsGrid.appendChild(card);
    });

    // Attach click listeners to new modal buttons
    attachProjectModalTriggers();
  }

  // Filter Buttons Action
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      playCyberTone(720, 'sine', 0.05, 0.03);
      renderProjects(filterValue);
    });
  });

  // ------------------------------------------------------------------------
  // 6. Project Modal Deep-Dive Window
  // ------------------------------------------------------------------------
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalContainer = document.getElementById('modal-content-container');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openProjectModal(projectId) {
    if (!modalOverlay || !modalContainer || typeof PROJECTS_DATA === 'undefined') return;
    const project = PROJECTS_DATA.find((p) => p.id === projectId);
    if (!project) return;

    playCyberTone(800, 'sine', 0.08, 0.04);

    const highlightsList = project.modal.highlights
      .map((h) => `<li style="margin-bottom: 0.5rem; display: flex; gap: 0.6rem;"><span style="color: var(--cyan-neon);">▹</span> <span>${h}</span></li>`)
      .join('');

    const stackTags = project.modal.stack
      .map((s) => `<span class="tech-tag" style="background: rgba(0, 240, 255, 0.08); border-color: var(--border-cyan); color: var(--cyan-neon);">${s}</span>`)
      .join('');

    modalContainer.innerHTML = `
      <div style="padding: 2.2rem;">
        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem;">
            <span class="cyber-badge ${project.statusClass}">${project.status}</span>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">// CASE STUDY</span>
          </div>
          <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: var(--text-primary); margin-bottom: 0.4rem;">
            ${project.modal.headline}
          </h2>
        </div>

        <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.8rem; border: 1px solid var(--border-subtle); background: #000;">
          <img src="${project.image}" alt="${project.title}" style="width: 100%; height: auto; display: block; max-height: 380px; object-fit: cover;" />
        </div>

        <div style="margin-bottom: 1.8rem;">
          <h4 style="font-family: var(--font-display); font-size: 1.1rem; color: var(--cyan-neon); margin-bottom: 0.6rem;">Architecture & Overview</h4>
          <p style="color: var(--text-secondary); line-height: 1.65; font-size: 0.98rem;">${project.modal.overview}</p>
        </div>

        <div style="margin-bottom: 1.8rem;">
          <h4 style="font-family: var(--font-display); font-size: 1.1rem; color: var(--cyan-neon); margin-bottom: 0.8rem;">Key Highlights & Outcomes</h4>
          <ul style="list-style: none; padding: 0; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.55;">
            ${highlightsList}
          </ul>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-family: var(--font-display); font-size: 1.1rem; color: var(--cyan-neon); margin-bottom: 0.8rem;">Tech Stack & Tooling</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${stackTags}</div>
        </div>

        <div style="display: flex; align-items: center; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
          <a href="https://github.com/uddyalokbiswas" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            View Repository
          </a>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('modal-close-btn').click();">
            Close Window
          </button>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    playCyberTone(380, 'sine', 0.05, 0.03);
  }

  function attachProjectModalTriggers() {
    document.querySelectorAll('.view-details-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const pid = btn.getAttribute('data-project-id');
        openProjectModal(pid);
      });
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

  // ------------------------------------------------------------------------
  // 7. 1-Click Copy Email Feature with Toast Feedback
  // ------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const contactEmailText = 'uddyalok.biswas@example.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(contactEmailText).then(() => {
        playCyberTone(950, 'sine', 0.1, 0.05);
        showToast(`📋 Copied "${contactEmailText}" to clipboard!`);
      }).catch(() => {
        showToast(`Email: ${contactEmailText}`);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 8. EmailJS Integration & Live Gmail Transmission
  // ------------------------------------------------------------------------
  const EMAILJS_PUBLIC_KEY = 'PIvugVpkRDp2Nz5J2';
  const EMAILJS_SERVICE_ID = 'service_j1k5q7q';
  const EMAILJS_TEMPLATE_ID = 'template_xdj4ge9';

  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    try {
      emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      console.log('EmailJS initialized successfully.');
    } catch (e) {
      console.error('EmailJS init error:', e);
    }
  }

  const contactForm = document.getElementById('portfolio-contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  if (contactForm && formSubmitBtn) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('⚠️ Please fill out all required fields.');
        playCyberTone(320, 'square', 0.1, 0.04);
        return;
      }

      // Update button state to transmitting
      const originalText = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-orbital">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
        Transmitting to Gmail...
      `;
      playCyberTone(600, 'sine', 0.08, 0.03);

      // Map all standard EmailJS parameter variations so templates match automatically
      const templateParams = {
        name: name,
        from_name: name,
        user_name: name,
        email: email,
        from_email: email,
        user_email: email,
        reply_to: email,
        message: message,
        subject: `New Portfolio Message from ${name}`,
        time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      };

      if (typeof emailjs !== 'undefined') {
        emailjs
          .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
          .then(function (response) {
            console.log('EmailJS Success:', response.status, response.text);
            formSubmitBtn.innerHTML = `✓ Sent to Gmail!`;
            formSubmitBtn.style.background = 'var(--emerald-neon)';
            formSubmitBtn.style.color = '#000';
            playCyberTone(1050, 'sine', 0.18, 0.06);
            showToast(`⚡ Message delivered directly to Uddyalok's Gmail!`);
            contactForm.reset();

            setTimeout(() => {
              formSubmitBtn.disabled = false;
              formSubmitBtn.innerHTML = originalText;
              formSubmitBtn.style.background = '';
              formSubmitBtn.style.color = '';
            }, 4000);
          })
          .catch(function (error) {
            console.error('EmailJS Transmission Error:', error);
            formSubmitBtn.disabled = false;
            formSubmitBtn.innerHTML = originalText;
            playCyberTone(300, 'sawtooth', 0.15, 0.05);
            showToast(`⚠️ Transmission failed: ${error.text || error.message || 'Please check EmailJS settings'}`);
          });
      } else {
        // Fallback simulation if offline
        setTimeout(() => {
          formSubmitBtn.innerHTML = `✓ Message Sent Successfully!`;
          formSubmitBtn.style.background = 'var(--emerald-neon)';
          formSubmitBtn.style.color = '#000';
          showToast(`⚡ Thank you, ${name}! Your message has been received.`);
          contactForm.reset();

          setTimeout(() => {
            formSubmitBtn.disabled = false;
            formSubmitBtn.innerHTML = originalText;
            formSubmitBtn.style.background = '';
            formSubmitBtn.style.color = '';
          }, 4000);
        }, 1200);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 9. Toast Notification System
  // ------------------------------------------------------------------------
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="color: var(--cyan-neon);">⚡</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  // ------------------------------------------------------------------------
  // 10. Live IST Telemetry Clock (Indian Standard Time)
  // ------------------------------------------------------------------------
  const liveClockEl = document.getElementById('live-clock-time');

  function updateClock() {
    if (!liveClockEl) return;
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const formatter = new Intl.DateTimeFormat([], options);
    liveClockEl.textContent = formatter.format(new Date()) + ' IST';
  }

  setInterval(updateClock, 1000);
  updateClock();

  // ------------------------------------------------------------------------
  // 11. Intersection Observer for Scroll Reveals
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-init');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));

  // ------------------------------------------------------------------------
  // 12. Initial Project Render
  // ------------------------------------------------------------------------
  renderProjects('all');
});
