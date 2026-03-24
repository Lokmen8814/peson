/* ============================================
   IMAGO LEISURE — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Nav Toggle ----
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      // Animate hamburger
      const bars = navToggle.querySelectorAll('.nav-toggle__bar');
      if (nav.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
      }
    });
  }

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-item__answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // ---- Scroll to Top ----
  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Header background on scroll ----
  const header = document.getElementById('header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.borderBottomColor = 'rgba(42, 42, 42, 0.8)';
      } else {
        header.style.background = 'rgba(10, 10, 10, 0.85)';
        header.style.borderBottomColor = 'rgba(31, 31, 31, 1)';
      }
    });
  }

  // ---- Promo Popup (show after 2s, only once per session) ----
  const popup = document.getElementById('promoPopup');
  const popupClose = document.getElementById('popupClose');

  if (popup && popupClose) {
    if (!sessionStorage.getItem('promoPopupShown')) {
      setTimeout(() => {
        popup.classList.add('active');
        sessionStorage.setItem('promoPopupShown', 'true');
      }, 2000);
    }

    popupClose.addEventListener('click', () => {
      popup.classList.remove('active');
    });

    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('active');
      }
    });
  }

  // ---- Scroll Animations (Intersection Observer) ----
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // ---- Contact Form (basic handler) ----
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const phone = document.getElementById('phone')?.value || '';
      const service = document.getElementById('service')?.value || '';
      const message = document.getElementById('message')?.value || '';

      // Build WhatsApp message as fallback
      const waText = `Hello, I am ${name}.%0A%0AEmail: ${email}%0APhone: ${phone}%0AService: ${service}%0A%0A${message}`;
      const waUrl = `https://wa.me/60189131392?text=${encodeURIComponent(waText)}`;

      // Open WhatsApp with pre-filled message
      window.open(waUrl, '_blank');
    });
  }

});
