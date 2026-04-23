// ================= MOBILE MENU TOGGLE =================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    }
  });
}

// ================= DROPDOWN =================
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdown = toggle.closest('.dropdown');

      document.querySelectorAll('.dropdown').forEach(dd => {
        if (dd !== dropdown) dd.classList.remove('active');
      });

      dropdown.classList.toggle('active');
    }
  });
});

// ================= SMOOTH SCROLL FIXED =================
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // ❌ Skip empty or external links
    if (!href || href === '#' || href.startsWith('http')) {
      return;
    }

    // ✔ Only internal scroll links
    if (href.startsWith('#')) {
      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ================= GALLERY LIGHTBOX =================
const images = document.querySelectorAll(".gallery-thumb img");

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  document.getElementById("lightboxOverlay").style.display = "flex";
  showImage();
}

function showImage() {
  const img = images[currentIndex];
  document.getElementById("lbMainImg").src = img.src;
  document.getElementById("lbMainCaption").innerText = img.alt;
  document.getElementById("lbMainCounter").innerText = `${currentIndex + 1} / ${images.length}`;
}

function changeLightbox(step) {
  currentIndex += step;

  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  showImage();
}

function closeLightbox() {
  document.getElementById("lightboxOverlay").style.display = "none";
}

function closeLightboxOutside(e) {
  if (e.target.id === "lightboxOverlay") {
    closeLightbox();
  }
}

function updateLightbox() {
  const item = galleryImages[lbCurrentIndex];
  document.getElementById('lbMainImg').src = item.src;
  document.getElementById('lbMainImg').alt = item.caption;
  document.getElementById('lbMainCaption').textContent = item.caption;
  document.getElementById('lbMainCounter').textContent = (lbCurrentIndex + 1) + ' / ' + galleryImages.length;
}

document.addEventListener('keydown', function(e) {
  const overlay = document.getElementById('lightboxOverlay');
  if (!overlay || !overlay.classList.contains('active')) return;
  if (e.key === 'ArrowRight') changeLightbox(1);
  if (e.key === 'ArrowLeft')  changeLightbox(-1);
  if (e.key === 'Escape')     closeLightbox();
});

// ================= BACK TO TOP =================
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ================= SIMPLE ANIMATION =================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

document.querySelectorAll('.card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = '0.5s';
  observer.observe(el);
});

console.log("✅ Script Loaded Successfully");