/* ==========================================================================
   BAS-SOFTWARE SOLUTIONS | Main JavaScript Controller
   Lead Developer & Architect: Bilal Shah
   Direct WhatsApp Solution: +92 348 5511763 (0348-5511763)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Official Contact WhatsApp
  const BAS_OFFICIAL_WHATSAPP = '923485511763';

  // Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('mobile-open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Header Scroll Shadow / Transparency Effect
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(7, 10, 18, 0.96)';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
    } else {
      header.style.background = 'rgba(7, 10, 18, 0.85)';
      header.style.boxShadow = 'none';
    }
  });

  // Dynamic WhatsApp Message Generator for Project Inquiries
  const inquiryForm = document.getElementById('inquiryForm');
  const formStatusMsg = document.getElementById('formStatusMsg');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('clientName')?.value.trim() || 'Valued Client';
      const company = document.getElementById('clientCompany')?.value.trim() || 'Individual / Business';
      const contact = document.getElementById('clientContact')?.value.trim() || '';
      const email = document.getElementById('clientEmail')?.value.trim() || '';
      const projectType = document.getElementById('projectType')?.value || 'Company Software / Website';
      const budget = document.getElementById('projectBudget')?.value || 'To Be Discussed';
      const details = document.getElementById('projectDetails')?.value.trim() || 'I am looking for software/website development services.';

      // Compose structured, professional WhatsApp message
      const message = `👋 *Hello Bilal Shah (BAS-Software Solutions)!*\n\n` +
        `I would like to hire you for a software / web development project.\n\n` +
        `👤 *Client Name:* ${name}\n` +
        `🏢 *Company / Business:* ${company}\n` +
        `📞 *Contact Number:* ${contact}\n` +
        `✉️ *Email:* ${email}\n` +
        `💼 *Service Required:* ${projectType}\n` +
        `💰 *Estimated Budget:* ${budget}\n\n` +
        `📝 *Project Overview & Requirements:*\n${details}\n\n` +
        `*(Sent via BAS-Software Solutions Portfolio & Services Showcase)*`;

      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${BAS_OFFICIAL_WHATSAPP}?text=${encodedMsg}`;

      if (formStatusMsg) {
        formStatusMsg.textContent = '🚀 Opening WhatsApp with your project details... Please press Send in WhatsApp!';
        formStatusMsg.classList.add('success');
      }

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 500);
    });
  }

  // Quick Action: Pre-composed Direct WhatsApp Chat with Bilal Shah
  window.openDirectWhatsApp = (serviceName = 'Software / Website Development') => {
    const text = encodeURIComponent(`Hi Bilal Shah (BAS-Software Solutions)! I visited your portfolio and I would like to discuss a project regarding: ${serviceName}. Please share your consultation & availability.`);
    window.open(`https://wa.me/${BAS_OFFICIAL_WHATSAPP}?text=${text}`, '_blank');
  };

  // Smooth scroll for all on-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Animated Number Counters on Scroll
  const counters = document.querySelectorAll('.stat-count');
  let animated = false;

  const animateCounters = () => {
    if (animated) return;
    const statsSection = document.querySelector('.hero-stats-row');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      animated = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target / 30;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
    }
  };

  window.addEventListener('scroll', animateCounters);
  animateCounters(); // Initial check
});
