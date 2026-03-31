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

// ================= SIMPLE GALLERY SLIDER =================
let current = 0;
const slides = document.querySelectorAll('.gallery-slide');

function showSlide(index) {
  if (!slides.length) return;
  slides.forEach(slide => slide.style.display = 'none');
  slides[index].style.display = 'block';
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

if (slides.length) {
  showSlide(current);
  setInterval(nextSlide, 4000);
}

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