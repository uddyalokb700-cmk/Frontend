/**
 * INTERACTIVE CYBERNETIC CANVAS BACKGROUND
 * Uddyalok Biswas Portfolio
 * Renders an optimized 60fps particle constellation and interactive cyber grid
 */

(function () {
  const canvas = document.getElementById('canvas-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };
  let animationFrameId;
  let isVisible = true;

  // Particle configuration
  const PARTICLE_COUNT_DESKTOP = 65;
  const PARTICLE_COUNT_MOBILE = 28;
  const MAX_CONNECT_DISTANCE = 130;

  function initDimensions() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.8;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 20 + 2;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.colorType = Math.random();
      // Color variations: Cyan (65%), Violet (25%), Emerald (10%)
      if (this.colorType < 0.65) {
        this.color = 'rgba(0, 240, 255, ';
      } else if (this.colorType < 0.9) {
        this.color = 'rgba(139, 92, 246, ';
      } else {
        this.color = 'rgba(0, 255, 157, ';
      }
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around bounds
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse interactive push / pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density * 0.4;
          const directionY = forceDirectionY * force * this.density * 0.4;

          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const count = window.innerWidth < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_CONNECT_DISTANCE) {
          const opacity = (1 - dist / MAX_CONNECT_DISTANCE) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Draw subtle digital coordinates / perspective grid
  function drawCyberGrid() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
    ctx.lineWidth = 1;
    const gridSize = 100;

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  function animate() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    drawCyberGrid();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    drawConnections();

    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    initDimensions();
    createParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Visibility API for battery and performance optimization
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isVisible = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      isVisible = true;
      animate();
    }
  });

  // Init
  initDimensions();
  createParticles();
  animate();
})();
