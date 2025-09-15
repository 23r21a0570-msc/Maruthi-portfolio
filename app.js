// Global Variables & State Management
let isLoaded = false;
let currentSection = "home";
let mouse = { x: 0, y: 0 };
let particles = [];
let neuralNodes = [];
let connections = [];
let quantumTrail = [];

// Canvas contexts
let particleCanvas, neuralCanvas, particleCtx, neuralCtx;

// Performance tracking
let lastTime = 0;
let fps = 0;
let frameCount = 0;

// Initialize everything when DOM loads
document.addEventListener("DOMContentLoaded", function () {
  initializeQuantumPortfolio();
});

// Main initialization function
function initializeQuantumPortfolio() {
  console.log("🚀 Initializing Quantum Portfolio...");

  setupCanvases();
  setupParticleUniverse();
  setupNeuralNetwork();
  setupQuantumLoader();
  setupHolographicNavigation();
  setupOrbitalNavigation();
  setupMouseTracking();
  setupScrollEffects();
  setupQuantumAvatar();
  setupSkillsGalaxy();
  setupProjectInteractions();
  setupTimelineJourney();
  setupMissionControl();
  setupPerformanceOptimizations();

  // Start the quantum loader sequence
  startQuantumSequence();
}

// Quantum Loader System
function setupQuantumLoader() {
  const loader = document.getElementById("quantum-loader");
  const progressBar = document.querySelector(".quantum-progress-bar");

  // Simulate loading progress
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        completeQuantumLoad();
      }, 500);
    }
    if (progressBar) {
      progressBar.style.width = progress + "%";
    }
  }, 150);
}

function startQuantumSequence() {
  // Add quantum particles to loader
  createQuantumLoadParticles();
}

function createQuantumLoadParticles() {
  const quantumCore = document.querySelector(".quantum-particles");
  if (!quantumCore) return;

  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");
      particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: var(--color-primary);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: quantumBurst 2s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
      quantumCore.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 2000);
    }, i * 100);
  }
}

function completeQuantumLoad() {
  const loader = document.getElementById("quantum-loader");
  if (loader) {
    loader.classList.add("hidden");
    setTimeout(() => {
      loader.remove();
      initializeMainExperience();
    }, 1000);
  }
}

function initializeMainExperience() {
  isLoaded = true;
  startParticleAnimation();
  startNeuralAnimation();
  initializeCounters();
  triggerRevealAnimations();

  console.log("✨ Quantum Portfolio Fully Loaded!");

  // Console easter egg
  console.log(`
    🌌 QUANTUM PORTFOLIO ACTIVATED 🌌
    
    █▀█ █░█ ▄▀█ █▄░█ ▀█▀ █░█ █▀▄▀█
    ▀▀█ █▄█ █▀█ █░▀█ ░█░ █▄█ █░▀░█
    
    ╔═══════════════════════════════════╗
    ║  Welcome to Maruthi's Universe!   ║
    ║                                   ║
    ║  🚀 Advanced 3D Interactions      ║
    ║  🌟 Particle Physics Engine       ║
    ║  🛸 Neural Network Visualization  ║
    ║  ⚡ Quantum Animation System      ║
    ║                                   ║
    ║  Ready to explore the cosmos?     ║
    ╚═══════════════════════════════════╝
    
    Built with passion for innovation 💫
    `);
}

// Canvas Setup
function setupCanvases() {
  particleCanvas = document.getElementById("particle-universe");
  neuralCanvas = document.getElementById("neural-network");

  if (particleCanvas && neuralCanvas) {
    particleCtx = particleCanvas.getContext("2d");
    neuralCtx = neuralCanvas.getContext("2d");

    resizeCanvases();
    window.addEventListener("resize", debounce(resizeCanvases, 250));
  }
}

function resizeCanvases() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (particleCanvas && neuralCanvas) {
    particleCanvas.width = width;
    particleCanvas.height = height;
    neuralCanvas.width = width;
    neuralCanvas.height = height;

    // Reinitialize particles and neural network
    setupParticleUniverse();
    setupNeuralNetwork();
  }
}

// Advanced Particle Universe
function setupParticleUniverse() {
  particles = [];
  const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));

  for (let i = 0; i < particleCount; i++) {
    particles.push(createParticle());
  }
}

function createParticle() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`,
    life: 1,
    maxLife: Math.random() * 1000 + 500,
    connections: 0,
  };
}

function startParticleAnimation() {
  function animateParticles(currentTime) {
    if (!isLoaded || !particleCtx) return;

    // Calculate FPS
    if (currentTime - lastTime >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastTime = currentTime;
    }
    frameCount++;

    particleCtx.fillStyle = "rgba(31, 33, 33, 0.02)";
    particleCtx.fillRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach((particle, index) => {
      updateParticle(particle);
      drawParticle(particle);

      // Draw connections
      particle.connections = 0;
      for (let i = index + 1; i < particles.length; i++) {
        const other = particles[i];
        const distance = getDistance(particle, other);

        if (
          distance < 120 &&
          particle.connections < 3 &&
          other.connections < 3
        ) {
          drawConnection(particle, other, distance);
          particle.connections++;
          other.connections++;
        }
      }

      // Mouse interaction
      const mouseDistance = getDistance(particle, mouse);
      if (mouseDistance < 150) {
        const force = (150 - mouseDistance) / 150;
        const angle = Math.atan2(particle.y - mouse.y, particle.x - mouse.x);
        particle.vx += Math.cos(angle) * force * 0.02;
        particle.vy += Math.sin(angle) * force * 0.02;
      }
    });

    requestAnimationFrame(animateParticles);
  }

  requestAnimationFrame(animateParticles);
}

function updateParticle(particle) {
  particle.x += particle.vx;
  particle.y += particle.vy;

  // Boundary collision with bounce
  if (particle.x <= 0 || particle.x >= particleCanvas.width) {
    particle.vx *= -0.8;
    particle.x = Math.max(0, Math.min(particleCanvas.width, particle.x));
  }
  if (particle.y <= 0 || particle.y >= particleCanvas.height) {
    particle.vy *= -0.8;
    particle.y = Math.max(0, Math.min(particleCanvas.height, particle.y));
  }

  // Apply slight friction
  particle.vx *= 0.999;
  particle.vy *= 0.999;

  // Update life
  particle.life += 1;
  if (particle.life > particle.maxLife) {
    resetParticle(particle);
  }
}

function drawParticle(particle) {
  particleCtx.save();
  particleCtx.globalAlpha = particle.opacity;

  // Draw particle with glow effect
  const gradient = particleCtx.createRadialGradient(
    particle.x,
    particle.y,
    0,
    particle.x,
    particle.y,
    particle.size * 2
  );
  gradient.addColorStop(0, particle.color);
  gradient.addColorStop(1, "transparent");

  particleCtx.fillStyle = gradient;
  particleCtx.beginPath();
  particleCtx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
  particleCtx.fill();

  particleCtx.restore();
}

function drawConnection(particle1, particle2, distance) {
  const opacity = Math.max(0, ((120 - distance) / 120) * 0.3);

  particleCtx.save();
  particleCtx.globalAlpha = opacity;
  particleCtx.strokeStyle = "#21808D";
  particleCtx.lineWidth = 1;
  particleCtx.beginPath();
  particleCtx.moveTo(particle1.x, particle1.y);
  particleCtx.lineTo(particle2.x, particle2.y);
  particleCtx.stroke();
  particleCtx.restore();
}

function resetParticle(particle) {
  particle.x = Math.random() * window.innerWidth;
  particle.y = Math.random() * window.innerHeight;
  particle.vx = (Math.random() - 0.5) * 0.8;
  particle.vy = (Math.random() - 0.5) * 0.8;
  particle.life = 0;
  particle.opacity = Math.random() * 0.8 + 0.2;
}

// Neural Network Background
function setupNeuralNetwork() {
  neuralNodes = [];
  connections = [];

  const nodeCount = Math.min(50, Math.floor(window.innerWidth / 30));

  for (let i = 0; i < nodeCount; i++) {
    neuralNodes.push(createNeuralNode());
  }

  // Create connections
  neuralNodes.forEach((node, index) => {
    for (let i = index + 1; i < neuralNodes.length; i++) {
      const other = neuralNodes[i];
      const distance = getDistance(node, other);

      if (distance < 200 && Math.random() > 0.7) {
        connections.push({
          from: node,
          to: other,
          strength: Math.random(),
          activity: Math.random(),
        });
      }
    }
  });
}

function createNeuralNode() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 4 + 2,
    activity: Math.random(),
    pulse: 0,
  };
}

function startNeuralAnimation() {
  function animateNeural() {
    if (!isLoaded || !neuralCtx) return;

    neuralCtx.fillStyle = "rgba(31, 33, 33, 0.01)";
    neuralCtx.fillRect(0, 0, neuralCanvas.width, neuralCanvas.height);

    // Update and draw connections
    connections.forEach((connection) => {
      connection.activity += (Math.random() - 0.5) * 0.02;
      connection.activity = Math.max(0, Math.min(1, connection.activity));

      drawNeuralConnection(connection);
    });

    // Update and draw nodes
    neuralNodes.forEach((node) => {
      updateNeuralNode(node);
      drawNeuralNode(node);
    });

    requestAnimationFrame(animateNeural);
  }

  requestAnimationFrame(animateNeural);
}

function updateNeuralNode(node) {
  node.x += node.vx;
  node.y += node.vy;

  // Wrap around screen
  if (node.x < 0) node.x = neuralCanvas.width;
  if (node.x > neuralCanvas.width) node.x = 0;
  if (node.y < 0) node.y = neuralCanvas.height;
  if (node.y > neuralCanvas.height) node.y = 0;

  node.pulse += 0.05;
  node.activity = Math.sin(node.pulse) * 0.5 + 0.5;
}

function drawNeuralNode(node) {
  neuralCtx.save();
  neuralCtx.globalAlpha = 0.6 * node.activity;

  const gradient = neuralCtx.createRadialGradient(
    node.x,
    node.y,
    0,
    node.x,
    node.y,
    node.size
  );
  gradient.addColorStop(0, "#21808D");
  gradient.addColorStop(1, "transparent");

  neuralCtx.fillStyle = gradient;
  neuralCtx.beginPath();
  neuralCtx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
  neuralCtx.fill();

  neuralCtx.restore();
}

function drawNeuralConnection(connection) {
  neuralCtx.save();
  neuralCtx.globalAlpha = 0.2 * connection.activity;
  neuralCtx.strokeStyle = "#21808D";
  neuralCtx.lineWidth = 0.5;

  neuralCtx.beginPath();
  neuralCtx.moveTo(connection.from.x, connection.from.y);
  neuralCtx.lineTo(connection.to.x, connection.to.y);
  neuralCtx.stroke();

  neuralCtx.restore();
}

// Mouse Tracking & Quantum Trail
function setupMouseTracking() {
  const trailContainer = document.getElementById("quantum-trail");

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Create quantum trail
    createQuantumTrail(e.clientX, e.clientY, trailContainer);

    // Update avatar tracking
    updateAvatarTracking(e.clientX, e.clientY);
  });
}

function createQuantumTrail(x, y, container) {
  if (!container) return;

  const trail = document.createElement("div");
  trail.className = "trail-quantum";
  trail.style.left = x + "px";
  trail.style.top = y + "px";

  container.appendChild(trail);

  // Limit trail particles
  while (container.children.length > 15) {
    container.removeChild(container.firstChild);
  }
}

// Holographic Navigation
function setupHolographicNavigation() {
  const holoNav = document.getElementById("holo-nav");
  const holoMenu = document.getElementById("holo-menu");
  const holoBurger = document.getElementById("holo-burger");
  const holoLinks = document.querySelectorAll(".holo-link");

  // Mobile menu toggle
  if (holoBurger && holoMenu) {
    holoBurger.addEventListener("click", () => {
      holoBurger.classList.toggle("active");
      holoMenu.classList.toggle("active");
    });
  }

  // Navigation links
  holoLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute("data-section");
      navigateToSection(targetSection);

      // Close mobile menu
      if (holoBurger && holoMenu) {
        holoBurger.classList.remove("active");
        holoMenu.classList.remove("active");
      }
    });
  });

  // Scroll navbar effect
  window.addEventListener(
    "scroll",
    debounce(() => {
      if (window.pageYOffset > 100) {
        holoNav?.classList.add("scrolled");
      } else {
        holoNav?.classList.remove("scrolled");
      }
    }, 10)
  );
}

// Orbital Navigation System
function setupOrbitalNavigation() {
  const planets = document.querySelectorAll(".planet");

  planets.forEach((planet) => {
    planet.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = planet.getAttribute("data-section");
      navigateToSection(targetSection);
    });
  });
}

function navigateToSection(sectionId) {
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Scroll Effects & Section Detection
function setupScrollEffects() {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");

        // Update navigation states
        const sectionId = entry.target.id;
        updateActiveNavigation(sectionId);

        // Trigger specific animations
        handleSectionAnimations(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and reveal elements
  const observableElements = document.querySelectorAll(`
        .dimension,
        [data-reveal],
        .achievement-orb,
        .project-station,
        .timeline-station
    `);

  observableElements.forEach((el) => observer.observe(el));
}

function updateActiveNavigation(sectionId) {
  currentSection = sectionId;

  // Update holo navigation
  document.querySelectorAll(".holo-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-section") === sectionId) {
      link.classList.add("active");
    }
  });

  // Update orbital navigation
  document.querySelectorAll(".planet").forEach((planet) => {
    planet.classList.remove("active");
    if (planet.getAttribute("data-section") === sectionId) {
      planet.classList.add("active");
    }
  });

  // Update timeline ship position
  updateTimelineShip();
}

function handleSectionAnimations(section) {
  const sectionId = section.id;

  switch (sectionId) {
    case "skills":
      animateSkillPlanets();
      break;
    case "projects":
      animateProjectStations();
      break;
    case "timeline":
      animateTimeline();
      break;
    case "about":
      animateAchievementOrbs();
      break;
  }
}

// Quantum Avatar System
function setupQuantumAvatar() {
  const avatar = document.getElementById("quantum-avatar");
  if (!avatar) return;

  avatar.addEventListener("mouseenter", () => {
    avatar.style.transform = "scale(1.1) rotateY(10deg)";
  });

  avatar.addEventListener("mouseleave", () => {
    avatar.style.transform = "scale(1) rotateY(0deg)";
  });
}

function updateAvatarTracking(mouseX, mouseY) {
  const avatar = document.getElementById("quantum-avatar");
  if (!avatar) return;

  const rect = avatar.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = (mouseX - centerX) / 100;
  const deltaY = (mouseY - centerY) / 100;

  const maxRotation = 15;
  const rotateY = Math.max(-maxRotation, Math.min(maxRotation, deltaX));
  const rotateX = Math.max(-maxRotation, Math.min(maxRotation, -deltaY));

  avatar.style.transform = `
        perspective(1000px) 
        rotateY(${rotateY}deg) 
        rotateX(${rotateX}deg)
        translateZ(${Math.abs(deltaX) + Math.abs(deltaY)}px)
    `;
}

// Skills Galaxy Interactions
function setupSkillsGalaxy() {
  const skillPlanets = document.querySelectorAll(".skill-planet");

  skillPlanets.forEach((planet) => {
    planet.addEventListener("mouseenter", () => {
      planet.style.animationPlayState = "paused";
      createSkillParticles(planet);
    });

    planet.addEventListener("mouseleave", () => {
      planet.style.animationPlayState = "running";
    });

    planet.addEventListener("click", () => {
      expandSkillDetails(planet);
    });
  });
}

function animateSkillPlanets() {
  const skillPlanets = document.querySelectorAll(".skill-planet");

  skillPlanets.forEach((planet, index) => {
    setTimeout(() => {
      planet.style.opacity = "1";
      planet.style.transform = "scale(1)";

      // Add entrance animation
      planet.style.animation = `
                skillPlanetEntrance 1s ease-out forwards,
                planetRotate 8s linear infinite ${1 + index * 0.5}s
            `;
    }, index * 200);
  });
}

function createSkillParticles(planet) {
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

    const rect = planet.getBoundingClientRect();
    particle.style.left = rect.left + rect.width / 2 + "px";
    particle.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(particle);

    // Animate particle
    const angle = (i / 5) * Math.PI * 2;
    const distance = 50 + Math.random() * 30;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;

    particle
      .animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 },
        ],
        {
          duration: 800 + Math.random() * 400,
          easing: "ease-out",
        }
      )
      .addEventListener("finish", () => {
        document.body.removeChild(particle);
      });
  }
}

function expandSkillDetails(planet) {
  const skillName = planet.getAttribute("data-skill");
  const skillLevel = planet.getAttribute("data-level");

  // Create modal or expanded view
  console.log(`Expanding details for ${skillName} (Level: ${skillLevel}%)`);
}

// Project Interactions
function setupProjectInteractions() {
  const projectStations = document.querySelectorAll(".project-station");

  projectStations.forEach((station) => {
    station.addEventListener("mouseenter", () => {
      createProjectParticles(station);
    });

    station.addEventListener("click", () => {
      enterProjectDimension(station);
    });
  });
}

function animateProjectStations() {
  const stations = document.querySelectorAll(".project-station");

  stations.forEach((station, index) => {
    setTimeout(() => {
      station.classList.add("reveal");
      station.style.animation = `projectStationEntrance 1s ease-out forwards`;
    }, index * 150);
  });
}

function createProjectParticles(station) {
  const rect = station.getBoundingClientRect();

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

    particle.style.left = rect.left + Math.random() * rect.width + "px";
    particle.style.top = rect.top + Math.random() * rect.height + "px";

    document.body.appendChild(particle);

    particle
      .animate(
        [
          { transform: "scale(1)", opacity: 1 },
          { transform: "scale(0)", opacity: 0 },
        ],
        {
          duration: 1000 + Math.random() * 500,
          easing: "ease-out",
        }
      )
      .addEventListener("finish", () => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      });
  }
}

function enterProjectDimension(station) {
  console.log("Entering project dimension...", station);
  // Could trigger a modal or detailed view
}

// Timeline Journey Animation
function setupTimelineJourney() {
  const timeShip = document.getElementById("time-ship");
  if (!timeShip) return;

  updateTimelineShip();
}

function updateTimelineShip() {
  const timeShip = document.getElementById("time-ship");
  const timelineStations = document.querySelectorAll(".timeline-station");

  if (!timeShip || !timelineStations.length) return;

  let activeStation = null;
  timelineStations.forEach((station) => {
    if (station.classList.contains("reveal")) {
      activeStation = station;
    }
  });

  if (activeStation) {
    const rect = activeStation.getBoundingClientRect();
    const containerRect = document
      .querySelector(".spacetime-corridor")
      .getBoundingClientRect();
    const relativeTop = rect.top - containerRect.top;

    timeShip.style.transform = `translateY(${relativeTop + 25}px)`;
  }
}

function animateTimeline() {
  const stations = document.querySelectorAll(".timeline-station");

  stations.forEach((station, index) => {
    setTimeout(() => {
      station.classList.add("reveal");
      createTimelineParticles(station);
    }, index * 300);
  });
}

function createTimelineParticles(station) {
  const portal = station.querySelector(".station-portal");
  if (!portal) return;

  const rect = portal.getBoundingClientRect();

  for (let i = 0; i < 6; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

    particle.style.left = rect.left + rect.width / 2 + "px";
    particle.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(particle);

    const angle = (i / 6) * Math.PI * 2;
    const distance = 30 + Math.random() * 20;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;

    particle
      .animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 },
        ],
        {
          duration: 1200,
          easing: "ease-out",
        }
      )
      .addEventListener("finish", () => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      });
  }
}

// Mission Control System
function setupMissionControl() {
  const missionForm = document.getElementById("mission-form");
  const formControls = document.querySelectorAll(".form-control");

  if (missionForm) {
    missionForm.addEventListener("submit", handleMissionLaunch);
  }

  // Enhanced form interactions
  formControls.forEach((control) => {
    control.addEventListener("focus", () => {
      control.parentElement.classList.add("field-active");
      createFieldScanEffect(control);
    });

    control.addEventListener("blur", () => {
      control.parentElement.classList.remove("field-active");
    });
  });
}

function createFieldScanEffect(field) {
  const particles = [];
  const rect = field.getBoundingClientRect();

  for (let i = 0; i < 5; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

    particle.style.left = rect.left + "px";
    particle.style.top = rect.top + Math.random() * rect.height + "px";

    document.body.appendChild(particle);

    particle
      .animate(
        [
          { transform: "translateX(0)", opacity: 1 },
          { transform: `translateX(${rect.width}px)`, opacity: 0 },
        ],
        {
          duration: 800,
          easing: "ease-out",
          delay: i * 100,
        }
      )
      .addEventListener("finish", () => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      });
  }
}

function handleMissionLaunch(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const launchBtn = e.target.querySelector(".launch-btn");
  const originalText = launchBtn.querySelector(".btn-text").textContent;

  // Launch sequence
  launchBtn.querySelector(".btn-text").textContent = "LAUNCHING...";
  launchBtn.disabled = true;

  createLaunchParticles(launchBtn);

  // Simulate transmission
  setTimeout(() => {
    showMissionSuccess();
    e.target.reset();
    launchBtn.querySelector(".btn-text").textContent = originalText;
    launchBtn.disabled = false;
  }, 3000);
}

function createLaunchParticles(button) {
  const rect = button.getBoundingClientRect();

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

    particle.style.left = rect.left + rect.width / 2 + "px";
    particle.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 100;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;

    particle
      .animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 },
        ],
        {
          duration: 1500 + Math.random() * 1000,
          easing: "ease-out",
        }
      )
      .addEventListener("finish", () => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      });
  }
}

function showMissionSuccess() {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--color-success), #1a6b73);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.5s ease;
        max-width: 350px;
    `;

  notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas fa-satellite-dish" style="font-size: 24px;"></i>
            <div>
                <h4 style="margin: 0 0 4px 0; font-size: 16px;">🚀 Transmission Successful!</h4>
                <p style="margin: 0; font-size: 14px; opacity: 0.9;">Your message has been launched into the quantum network. Expect a reply within 24 hours!</p>
            </div>
        </div>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 500);
  }, 5000);
}

// Counter Animations
function initializeCounters() {
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    animateCounter(counter, target);
  });
}

function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

function animateAchievementOrbs() {
  const orbs = document.querySelectorAll(".achievement-orb");

  orbs.forEach((orb, index) => {
    setTimeout(() => {
      orb.classList.add("reveal");

      const counter = orb.querySelector("[data-count]");
      if (counter) {
        const target = parseInt(counter.getAttribute("data-count"));
        animateCounter(counter, target);
      }
    }, index * 300);
  });
}

// Performance Optimizations
function setupPerformanceOptimizations() {
  // Intersection Observer for performance
  const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  });

  // Observe resource-heavy elements
  document.querySelectorAll(".skill-planet, .project-station").forEach((el) => {
    performanceObserver.observe(el);
  });

  // Debounce resize events
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvases, 250);
  });

  // Reduce motion for accessibility
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.setProperty("--animation-duration", "0.01s");
    particles = particles.slice(0, 20); // Reduce particles
  }
}

function triggerRevealAnimations() {
  setTimeout(() => {
    const revealElements = document.querySelectorAll("[data-reveal]");
    revealElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("reveal");
      }, index * 100);
    });
  }, 500);
}

// Utility Functions
function getDistance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (e.target.matches("input, textarea")) return;

  switch (e.key.toLowerCase()) {
    case "h":
      navigateToSection("home");
      break;
    case "a":
      navigateToSection("about");
      break;
    case "s":
      navigateToSection("skills");
      break;
    case "p":
      navigateToSection("projects");
      break;
    case "t":
      navigateToSection("timeline");
      break;
    case "c":
      navigateToSection("contact");
      break;
    case "escape":
      // Close any open modals or menus
      document.querySelector(".holo-burger.active")?.classList.remove("active");
      document.querySelector(".holo-menu.active")?.classList.remove("active");
      break;
  }
});

// Error Handling
window.addEventListener("error", (e) => {
  console.error("Portfolio Error:", e.error);
  // Graceful fallback
  if (!isLoaded) {
    setTimeout(completeQuantumLoad, 1000);
  }
});

// Visibility Change Handling
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations when tab is not visible
    particles.forEach((p) => (p.vx = p.vy = 0));
  } else {
    // Resume animations
    setupParticleUniverse();
  }
});

// Add dynamic styles for animations
const style = document.createElement("style");
style.textContent = `
    @keyframes quantumBurst {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) translate(${
              Math.random() * 200 - 100
            }px, ${Math.random() * 200 - 100}px) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes skillPlanetEntrance {
        from {
            opacity: 0;
            transform: scale(0) rotate(180deg);
        }
        to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }
    
    @keyframes projectStationEntrance {
        from {
            opacity: 0;
            transform: translateY(50px) rotateX(45deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }
    }
`;
document.head.appendChild(style);

// Export for debugging
window.QuantumPortfolio = {
  particles,
  neuralNodes,
  currentSection,
  navigateToSection,
  mouse,
  isLoaded,
};

console.log("🌌 Quantum Portfolio System Initialized! 🌌");
