// Three.js Background Animation
let scene, camera, renderer, particles;

function initThreeJS() {
  const canvas = document.getElementById("hero-canvas");
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    canvas.offsetWidth / canvas.offsetHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  // Create particles
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];

  for (let i = 0; i < 1000; i++) {
    vertices.push(
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000
    );
    colors.push(Math.random(), Math.random(), 1);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({ size: 3, vertexColors: true });
  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  camera.position.z = 1000;

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  particles.rotation.x += 0.001;
  particles.rotation.y += 0.002;
  renderer.render(scene, camera);
}

// Carousel functionality
let slideIndex = 1;

function nextSlide() {
  slideIndex++;
  if (slideIndex > 4) slideIndex = 1;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  if (slideIndex < 1) slideIndex = 4;
  showSlide(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  showSlide(slideIndex);
}

function showSlide(n) {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");

  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[n - 1].classList.add("active");
  dots[n - 1].classList.add("active");
}

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const themeText = themeToggle.textContent.trim().replace(themeIcon.textContent.trim(), '').trim();

// Check for saved theme preference or use default (dark mode)
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  themeIcon.className = 'fas fa-moon';
  themeToggle.innerHTML = `<i class="fas fa-moon"></i>`;
}

// Toggle theme function
themeToggle.addEventListener('click', () => {
  // Toggle light mode class on body
  document.body.classList.toggle('light-mode');
  
  // Update icon and text based on current mode
  if (document.body.classList.contains('light-mode')) {
    themeIcon.className = 'fas fa-moon';
    themeToggle.innerHTML = `<i class="fas fa-moon"></i>`;
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.className = 'fas fa-sun';
    themeToggle.innerHTML = `<i class="fas fa-sun"></i>`;
    localStorage.setItem('theme', 'dark');
  }
});

// Initialize Three.js when page loads
window.addEventListener("load", initThreeJS);

// Handle window resize
window.addEventListener("resize", () => {
  const canvas = document.getElementById("hero-canvas");
  camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
});
