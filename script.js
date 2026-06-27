/* ============================================================
   KIMT BAREILLY — UPGRADED script.js
   Scroll Reveal + Counter Animation + All Features
   ============================================================ */

// ================= SCROLL REVEAL =================
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-fade, .reveal-zoom'
  );

  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
})();

// ================= COUNTER ANIMATION =================
(function initCounters() {
  const countEls = document.querySelectorAll('.count-num');
  const heroNums = document.querySelectorAll('.hstat-num');
  const allCounters = [...countEls, ...heroNums];

  if (!allCounters.length) return;

  function animateCount(el, target, duration) {
    const start = performance.now();
    const isYear = target >= 2000;
    const startVal = isYear ? target - 5 : 0;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * eased);
      el.textContent = current.toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString('en-IN');
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        animateCount(el, target, 1800);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  allCounters.forEach(el => observer.observe(el));
})();

// ================= MOBILE MENU (DRAWER) =================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenuWrapper   = document.querySelector('.nav-menu-wrapper');

function closeMobileMenu() {
  if (!navMenuWrapper) return;
  navMenuWrapper.classList.remove('menu-open');
  mobileMenuToggle?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  document.querySelectorAll('.dropdown.active').forEach(dd => dd.classList.remove('active'));
}

function openMobileMenu() {
  if (!navMenuWrapper) return;
  navMenuWrapper.classList.add('menu-open');
  mobileMenuToggle?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

if (mobileMenuToggle && navMenuWrapper) {
  mobileMenuToggle.addEventListener('click', () => {
    navMenuWrapper.classList.contains('menu-open') ? closeMobileMenu() : openMobileMenu();
  });
}

// Tap on backdrop closes drawer
if (navMenuWrapper) {
  navMenuWrapper.addEventListener('click', e => {
    if (e.target === navMenuWrapper) closeMobileMenu();
  });
}

// Close on nav link tap
document.querySelectorAll('.nav-menu > li > a:not(.dropdown-toggle)').forEach(link => {
  link.addEventListener('click', () => closeMobileMenu());
});

// ================= DROPDOWN =================
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', e => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      e.stopPropagation();
      const dropdown = toggle.closest('.dropdown');
      document.querySelectorAll('.dropdown').forEach(dd => {
        if (dd !== dropdown) dd.classList.remove('active');
      });
      dropdown.classList.toggle('active');
    }
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 992) closeMobileMenu();
});

// ================= NAVBAR SCROLL CLASS =================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
}, { passive: true });

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = document.querySelector('.navbar')?.offsetHeight || 70;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navH,
        behavior: 'smooth'
      });
    }
  });
});

// ================= GALLERY LIGHTBOX =================
const galleryImages = document.querySelectorAll('.gallery-thumb img');
let lbCurrentIndex = 0;

function openLightbox(index) {
  lbCurrentIndex = index;
  const overlay = document.getElementById('lightboxOverlay');
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  showLightboxImage();
}

function showLightboxImage() {
  const img = galleryImages[lbCurrentIndex];
  if (!img) return;
  const mainImg = document.getElementById('lbMainImg');
  mainImg.style.opacity = '0';
  mainImg.style.transform = 'scale(0.92)';
  setTimeout(() => {
    mainImg.src = img.src;
    mainImg.alt = img.alt;
    document.getElementById('lbMainCaption').innerText = img.alt || '';
    document.getElementById('lbMainCounter').innerText = `${lbCurrentIndex + 1} / ${galleryImages.length}`;
    mainImg.style.opacity = '1';
    mainImg.style.transform = 'scale(1)';
    mainImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  }, 80);
}

function changeLightbox(step) {
  lbCurrentIndex = (lbCurrentIndex + step + galleryImages.length) % galleryImages.length;
  showLightboxImage();
}

function closeLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function closeLightboxOutside(e) {
  if (e.target.id === 'lightboxOverlay') closeLightbox();
}

// Touch swipe support for lightbox
let lbTouchStartX = 0;
const lbOverlay = document.getElementById('lightboxOverlay');
if (lbOverlay) {
  lbOverlay.addEventListener('touchstart', e => { lbTouchStartX = e.touches[0].clientX; }, { passive: true });
  lbOverlay.addEventListener('touchend', e => {
    const diff = lbTouchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) changeLightbox(diff > 0 ? 1 : -1);
  }, { passive: true });
}

document.addEventListener('keydown', e => {
  const overlay = document.getElementById('lightboxOverlay');
  if (!overlay?.classList.contains('active')) return;
  if (e.key === 'ArrowRight') changeLightbox(1);
  if (e.key === 'ArrowLeft')  changeLightbox(-1);
  if (e.key === 'Escape')     closeLightbox();
});

// ================= BACK TO TOP =================
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ================= AI FAQ CHATBOT =================
const FAQ_DB = [
  {
    keywords: ['admission', 'apply', 'how to join', 'enroll', 'enrol', 'process'],
    answer: "Admission is simple:\n1) Fill the application form (online or offline)\n2) Submit required documents\n3) Document verification by our committee\n4) Pay fees to confirm your seat.\n\nTap 'Apply Now' at the top of the page to start!"
  },
  {
    keywords: ['fee', 'fees', 'cost', 'price', 'charges', 'installment', 'scholarship'],
    answer: "KIMT offers an affordable fee structure with:\n✓ Installment facility\n✓ Scholarships for meritorious students\n✓ No hidden charges\n\nExact fees vary by course. Call +91 9084147587 or email kimtiinfo@gmail.com for specific details."
  },
  {
    keywords: ['course', 'courses', 'program', 'programs', 'degree', 'bca', 'bba', 'mba', 'bcom', 'b.com', 'ba', 'bsc', 'b.sc', 'mca', 'btech', 'b.tech', 'paramedical'],
    answer: "We offer 100+ courses across 8 faculties:\n• Commerce & Management (B.Com/BBA/MBA)\n• Humanities & Social Science\n• Science\n• Engineering & Technology (BCA/MCA/B.Tech)\n• ParaMedical Science\n• Library & Info Science\n• Agriculture Science\n• Vocational Education\n\nScroll to 'Courses Offered' for full details!"
  },
  {
    keywords: ['facility', 'facilities', 'lab', 'library', 'hostel', 'transport', 'infrastructure', 'classroom'],
    answer: "Our campus has:\n📚 Central Library\n🔬 Modern Labs\n🖥️ Smart Classrooms\n⚽ Sports Facilities\n🏥 Health Services\n🚌 Transportation\n💼 Placement Cell\n\nCheck the 'Campus Facilities' section for more!"
  },
  {
    keywords: ['placement', 'job', 'career', 'company', 'salary', 'internship'],
    answer: "KIMT provides 95% placement support with:\n• Dedicated Placement Cell\n• Career guidance sessions\n• Internship opportunities\n• Top company tie-ups\n• Resume & interview preparation"
  },
  {
    keywords: ['contact', 'phone', 'number', 'call', 'email', 'mail'],
    answer: "📞 +91 9084147587\n📧 kimtiinfo@gmail.com\n\nOffice Hours:\nMon–Fri: 9 AM – 5 PM\nSaturday: 9 AM – 2 PM\n\nOr chat with us on WhatsApp — just say 'WhatsApp'!"
  },
  {
    keywords: ['address', 'location', 'where', 'campus', 'route', 'directions', 'distance'],
    answer: "📍 Aonla–Sirauli Road, Near Vishanpuri Bagiya Churaha, Sona, Sirauli, Bareilly (UP) - 243303\n\nApprox. 25 KM from Bareilly on the Aonla–Moradabad–Delhi route. Transport facility available!"
  },
  {
    keywords: ['timing', 'hours', 'open', 'time', 'office', 'schedule'],
    answer: "⏰ Office Hours:\nMonday–Friday: 9:00 AM – 5:00 PM\nSaturday: 9:00 AM – 2:00 PM\nSunday: Closed"
  },
  {
    keywords: ['whatsapp', 'human', 'agent', 'talk to someone', 'counselor', 'counsellor'],
    answer: "Opening WhatsApp for you to chat directly with our admission team!"
  }
];

const FAQ_FALLBACK = "I'm not sure about that, but our team can help! Call us at +91 9084147587 or email kimtiinfo@gmail.com. Want me to open WhatsApp for you?";

const chatbotToggle    = document.getElementById('chatbotToggle');
const chatbotPanel     = document.getElementById('chatbotPanel');
const chatbotClose     = document.getElementById('chatbotClose');
const chatbotMessages  = document.getElementById('chatbotMessages');
const chatbotQuickReplies = document.getElementById('chatbotQuickReplies');
const chatbotForm      = document.getElementById('chatbotForm');
const chatbotInput     = document.getElementById('chatbotInput');

const QUICK_REPLY_OPTIONS = ['Admission Process', 'Courses Offered', 'Fees Structure', 'Facilities', 'Placement Support', 'Contact Us'];
let chatbotGreeted = false;

function addChatMessage(text, sender) {
  if (!chatbotMessages) return;
  const bubble = document.createElement('div');
  bubble.className = `chat-msg ${sender}`;
  bubble.style.whiteSpace = 'pre-wrap';
  bubble.textContent = text;
  bubble.style.opacity = '0';
  bubble.style.transform = 'translateY(8px)';
  chatbotMessages.appendChild(bubble);
  requestAnimationFrame(() => {
    bubble.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    bubble.style.opacity = '1';
    bubble.style.transform = 'translateY(0)';
  });
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function renderQuickReplies() {
  if (!chatbotQuickReplies) return;
  chatbotQuickReplies.innerHTML = '';
  QUICK_REPLY_OPTIONS.forEach(label => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip-btn';
    chip.textContent = label;
    chip.addEventListener('click', () => handleUserQuery(label));
    chatbotQuickReplies.appendChild(chip);
  });
}

function findBestAnswer(query) {
  const q = query.toLowerCase();
  let best = null, bestScore = 0;
  FAQ_DB.forEach(entry => {
    let score = entry.keywords.reduce((s, kw) => s + (q.includes(kw) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = entry; }
  });
  return best ? best.answer : FAQ_FALLBACK;
}

function handleUserQuery(query) {
  addChatMessage(query, 'user');
  const typingBubble = document.createElement('div');
  typingBubble.className = 'chat-msg bot';
  typingBubble.innerHTML = '<em style="color:#94a3b8">Typing…</em>';
  chatbotMessages.appendChild(typingBubble);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  setTimeout(() => {
    typingBubble.remove();
    const answer = findBestAnswer(query);
    addChatMessage(answer, 'bot');

    if (/whatsapp/i.test(query) || answer === FAQ_FALLBACK) {
      const link = document.createElement('a');
      link.href = `https://wa.me/919084147587?text=${encodeURIComponent('Hello, I have a question: ' + query)}`;
      link.target = '_blank';
      link.className = 'chip-btn';
      link.style.cssText = 'display:inline-block;margin-top:6px;text-decoration:none;';
      link.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp';
      chatbotMessages.appendChild(link);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  }, 600);
}

if (chatbotToggle && chatbotPanel) {
  chatbotToggle.addEventListener('click', () => {
    const isOpen = chatbotPanel.classList.contains('open');
    chatbotPanel.classList.toggle('open');
    chatbotToggle.setAttribute('aria-expanded', String(!isOpen));
    chatbotPanel.setAttribute('aria-hidden', String(isOpen));

    if (!isOpen && !chatbotGreeted) {
      chatbotGreeted = true;
      renderQuickReplies();
      setTimeout(() => {
        addChatMessage("Namaste! 🙏 I'm the KIMT Assistant. Ask me about admission, courses, fees, or facilities — or tap a quick option below.", 'bot');
      }, 200);
    }
  });

  chatbotClose?.addEventListener('click', () => {
    chatbotPanel.classList.remove('open');
    chatbotToggle.setAttribute('aria-expanded', 'false');
    chatbotPanel.setAttribute('aria-hidden', 'true');
  });

  chatbotForm?.addEventListener('submit', e => {
    e.preventDefault();
    const value = chatbotInput?.value.trim();
    if (!value) return;
    handleUserQuery(value);
    chatbotInput.value = '';
  });
}

// ================= QUICK INQUIRY FORM =================
const EMAILJS_CONFIG = {
  publicKey:       'QsPaAy9OtO3UaWtfX',
  serviceId:       'service_2gh0c6w',
  adminTemplateId: 'template_2krxpac',
  studentTemplateId: 'template_eq3qp1q'
};

function isEmailJsConfigured() {
  return Object.values(EMAILJS_CONFIG).every(v => v && !v.startsWith('YOUR_EMAILJS'));
}

const inquiryForm = document.getElementById('inquiryForm');

function setFieldError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);
  if (input)   input.classList.toggle('invalid', Boolean(message));
  if (errorEl) errorEl.textContent = message || '';
}

function validateInquiryForm() {
  let valid = true;

  const name = document.getElementById('inqName').value.trim();
  if (name.length < 2) {
    setFieldError('inqName', 'errName', 'Please enter your full name.');
    valid = false;
  } else setFieldError('inqName', 'errName', '');

  const phone = document.getElementById('inqPhone').value.trim();
  if (!/^[6-9]\d{9}$/.test(phone)) {
    setFieldError('inqPhone', 'errPhone', 'Enter a valid 10-digit mobile number.');
    valid = false;
  } else setFieldError('inqPhone', 'errPhone', '');

  const email = document.getElementById('inqEmail').value.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFieldError('inqEmail', 'errEmail', 'Enter a valid email address.');
    valid = false;
  } else setFieldError('inqEmail', 'errEmail', '');

  return valid;
}

if (inquiryForm) {
  inquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const statusEl  = document.getElementById('inquiryStatus');
    const submitBtn = document.getElementById('inquirySubmitBtn');

    statusEl.textContent = '';
    statusEl.className = 'inquiry-status';

    if (!validateInquiryForm()) {
      statusEl.textContent = 'Please fix the highlighted fields above.';
      statusEl.classList.add('error');
      return;
    }

    const data = {
      name:    document.getElementById('inqName').value.trim(),
      phone:   document.getElementById('inqPhone').value.trim(),
      email:   document.getElementById('inqEmail').value.trim() || 'Not provided',
      course:  document.getElementById('inqCourse').value || 'Not specified',
      message: document.getElementById('inqMessage').value.trim() || 'No additional message'
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    const waText = `New Inquiry from Website%0AName: ${data.name}%0APhone: ${data.phone}%0AEmail: ${data.email}%0ACourse: ${data.course}%0AMessage: ${data.message}`;
    window.open(`https://wa.me/919084147587?text=${waText}`, '_blank');

    if (isEmailJsConfigured() && window.emailjs) {
      emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
      const sends = [emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.adminTemplateId, data)];
      if (data.email !== 'Not provided') {
        sends.push(emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.studentTemplateId, data));
      }
      Promise.all(sends)
        .then(() => console.log('✅ EmailJS sent successfully'))
        .catch(err => console.error('❌ EmailJS error:', err));
    }

    statusEl.textContent = '✅ Thanks! WhatsApp has opened with your details — just tap Send. Our team will reach out shortly.';
    statusEl.classList.add('success');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Inquiry';
    inquiryForm.reset();
  });
}

console.log('✅ KIMT Script Loaded Successfully');
