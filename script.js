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
      e.stopImmediatePropagation(); // stop the smooth-scroll listener below from also firing on this same tap
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
  document.getElementById("lightboxOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
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
  document.getElementById("lightboxOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

function closeLightboxOutside(e) {
  if (e.target.id === "lightboxOverlay") {
    closeLightbox();
  }
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

// ================= AI FAQ CHATBOT (AUTOMATION) =================
// Edit this list to teach the assistant new answers — no coding knowledge needed,
// just add another {keywords:[...], answer:"..."} entry.
const FAQ_DB = [
  {
    keywords: ['admission', 'apply', 'how to join', 'enroll', 'enrol', 'process'],
    answer: "Admission is simple: 1) Fill the application form (online or offline) 2) Submit required documents 3) Document verification by our committee 4) Pay fees to confirm your seat. Tap 'Apply Now' at the top of the page to start, or I can connect you to our team on WhatsApp."
  },
  {
    keywords: ['fee', 'fees', 'cost', 'price', 'charges', 'installment', 'scholarship'],
    answer: "KIMT offers an affordable fee structure with installment facility and scholarships for meritorious students — no hidden charges. Exact fees vary by course, so please call +91 9084147587 or email kimtiinfo@gmail.com for your specific course's fee details."
  },
  {
    keywords: ['course', 'courses', 'program', 'programs', 'degree', 'bca', 'bba', 'mba', 'bcom', 'b.com', 'ba', 'bsc', 'b.sc', 'mca', 'btech', 'b.tech', 'paramedical'],
    answer: "We offer 100+ courses across Commerce & Management, Humanities & Social Science, Science, Engineering & Technology (BCA/MCA/B.Tech), ParaMedical Science, Library & Information Science, Agriculture Science, and Vocational Education. Scroll to the 'Courses Offered' section for full details."
  },
  {
    keywords: ['facility', 'facilities', 'lab', 'library', 'hostel', 'transport', 'infrastructure', 'classroom'],
    answer: "Our campus has Smart Classrooms, a Central Library, Modern Labs, Sports facilities, Health Services, Transportation, and a dedicated Placement Cell. Check the 'Campus Facilities' section for more."
  },
  {
    keywords: ['placement', 'job', 'career', 'company', 'salary', 'internship'],
    answer: "KIMT provides 95% placement support with a dedicated placement cell offering career guidance, internships, and tie-ups with top companies."
  },
  {
    keywords: ['contact', 'phone', 'number', 'call', 'email', 'mail'],
    answer: "You can reach us at +91 9084147587 or kimtiinfo@gmail.com. I can also open WhatsApp for you right now — just say 'WhatsApp'."
  },
  {
    keywords: ['address', 'location', 'where', 'campus', 'route', 'directions'],
    answer: "KIMT is located at Aonla–Sirauli Road, Near Vishanpuri Bagiya Churaha, Sona, Sirauli, Bareilly (UP) - 243303, about 25 KM from Bareilly on the Aonla–Moradabad–Delhi route."
  },
  {
    keywords: ['timing', 'hours', 'open', 'time', 'office'],
    answer: "Our office hours are Monday–Friday 9:00 AM–5:00 PM and Saturday 9:00 AM–2:00 PM."
  },
  {
    keywords: ['whatsapp', 'human', 'agent', 'talk to someone', 'counselor', 'counsellor'],
    answer: "Sure — opening WhatsApp for you so you can chat with our admission team directly."
  },
  {
    keywords: ['about', 'kimt', 'established', 'history', 'krishna institute'],
    answer: "Krishna Institute of Management and Technology (KIMT), established in 2020 under Krishna Welfare Educational Society, offers 100+ courses across Management, Engineering, Science, Arts, Commerce, ParaMedical and more, with 95% placement support."
  }
];

const FAQ_FALLBACK = "I don't have an exact answer for that yet, but our admission team can help right away — tap the WhatsApp button below or call +91 9084147587.";

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotPanel = document.getElementById('chatbotPanel');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotQuickReplies = document.getElementById('chatbotQuickReplies');
const chatbotForm = document.getElementById('chatbotForm');
const chatbotInput = document.getElementById('chatbotInput');

const QUICK_REPLY_OPTIONS = ['Admission Process', 'Courses Offered', 'Fees Structure', 'Facilities', 'Placement Support', 'Contact Us'];
let chatbotGreeted = false;

function addChatMessage(text, sender) {
  if (!chatbotMessages) return;
  const bubble = document.createElement('div');
  bubble.className = `chat-msg ${sender}`;
  bubble.textContent = text;
  chatbotMessages.appendChild(bubble);
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
  let best = null;
  let bestScore = 0;
  FAQ_DB.forEach(entry => {
    let score = 0;
    entry.keywords.forEach(kw => {
      if (q.includes(kw)) score += 1;
    });
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  });
  return best ? best.answer : FAQ_FALLBACK;
}

function handleUserQuery(query) {
  addChatMessage(query, 'user');
  const answer = findBestAnswer(query);
  setTimeout(() => {
    addChatMessage(answer, 'bot');
    if (/whatsapp/i.test(query) || answer === FAQ_FALLBACK) {
      addChatMessage("Tap here to continue on WhatsApp →", 'bot');
      const link = document.createElement('a');
      link.href = "https://wa.me/919084147587?text=" + encodeURIComponent("Hello, I have a question: " + query);
      link.target = "_blank";
      link.className = "chip-btn";
      link.style.display = "inline-block";
      link.style.marginTop = "-6px";
      link.style.textDecoration = "none";
      link.textContent = "💬 Continue on WhatsApp";
      chatbotMessages.appendChild(link);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  }, 350);
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
        addChatMessage("Hi! 👋 I'm the KIMT Assistant. Ask me about admission, courses, fees, facilities or placements — or tap a quick option below.", 'bot');
      }, 200);
    }
  });

  chatbotClose.addEventListener('click', () => {
    chatbotPanel.classList.remove('open');
    chatbotToggle.setAttribute('aria-expanded', 'false');
    chatbotPanel.setAttribute('aria-hidden', 'true');
  });

  chatbotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = chatbotInput.value.trim();
    if (!value) return;
    handleUserQuery(value);
    chatbotInput.value = '';
  });
}

// ================= QUICK INQUIRY FORM (AUTOMATION) =================
// To enable automatic EMAIL confirmations (in addition to the WhatsApp auto-fill,
// which always works with no setup), create a free account at https://www.emailjs.com
// and replace the 4 placeholder values below. Full steps are in AUTOMATION-SETUP.md.
const EMAILJS_CONFIG = {
  publicKey: 'QsPaAy9OtO3UaWtfX',
  serviceId: 'service_2gh0c6w',
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
  if (input) input.classList.toggle('invalid', Boolean(message));
  if (errorEl) errorEl.textContent = message || '';
}

function validateInquiryForm() {
  let valid = true;

  const name = document.getElementById('inqName').value.trim();
  if (name.length < 2) {
    setFieldError('inqName', 'errName', 'Please enter your full name.');
    valid = false;
  } else {
    setFieldError('inqName', 'errName', '');
  }

  const phone = document.getElementById('inqPhone').value.trim();
  if (!/^[6-9]\d{9}$/.test(phone)) {
    setFieldError('inqPhone', 'errPhone', 'Enter a valid 10-digit mobile number.');
    valid = false;
  } else {
    setFieldError('inqPhone', 'errPhone', '');
  }

  const email = document.getElementById('inqEmail').value.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFieldError('inqEmail', 'errEmail', 'Enter a valid email address.');
    valid = false;
  } else {
    setFieldError('inqEmail', 'errEmail', '');
  }

  return valid;
}

if (inquiryForm) {
  inquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const statusEl = document.getElementById('inquiryStatus');
    const submitBtn = document.getElementById('inquirySubmitBtn');
    statusEl.textContent = '';
    statusEl.className = 'inquiry-status';

    if (!validateInquiryForm()) {
      statusEl.textContent = 'Please fix the highlighted fields above.';
      statusEl.classList.add('error');
      return;
    }

    const data = {
      name: document.getElementById('inqName').value.trim(),
      phone: document.getElementById('inqPhone').value.trim(),
      email: document.getElementById('inqEmail').value.trim() || 'Not provided',
      course: document.getElementById('inqCourse').value || 'Not specified',
      message: document.getElementById('inqMessage').value.trim() || 'No additional message'
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // 1) Auto-fill & open WhatsApp to the college number (works instantly, no setup needed).
    //    Note: WhatsApp itself requires one final tap on "Send" inside the chat — no website
    //    can bypass that, it's a WhatsApp platform restriction, not a limitation of this site.
    const waText = `New Inquiry from Website%0AName: ${data.name}%0APhone: ${data.phone}%0AEmail: ${data.email}%0ACourse: ${data.course}%0AMessage: ${data.message}`;
    window.open(`https://wa.me/919084147587?text=${waText}`, '_blank');

    // 2) Auto-email confirmation (admin notification + student thank-you) via EmailJS,
    //    only runs once you've added your free EmailJS keys above.
    if (!isEmailJsConfigured()) {
      console.warn('EmailJS not configured yet — only WhatsApp will be sent. Check EMAILJS_CONFIG in script.js.');
    } else if (!window.emailjs) {
      console.error('EmailJS library did not load (check your internet connection / the <script> tag for the EmailJS CDN in index.html). Email was NOT sent.');
    } else {
      emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
      const adminSend = emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.adminTemplateId, data);
      const studentSend = data.email !== 'Not provided'
        ? emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.studentTemplateId, data)
        : Promise.resolve('skipped - no email provided');

      Promise.all([adminSend, studentSend])
        .then(results => console.log('✅ EmailJS sent successfully:', results))
        .catch(err => console.error('❌ EmailJS send FAILED (WhatsApp message was still sent). Full error below:', err));
    }

    statusEl.textContent = "Thanks! WhatsApp has opened with your details — just tap Send. Our team will also reach out shortly.";
    statusEl.classList.add('success');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Inquiry';
    inquiryForm.reset();
  });
}

console.log("✅ Script Loaded Successfully");
document.getElementById('chatbotToggle').onclick = function() {
    document.getElementById('chatbotPanel').classList.toggle('open');
};