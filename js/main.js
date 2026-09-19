/* ==========================================================================
   BAS-SOFTWARE SOLUTIONS | Main JavaScript Controller
   Lead Developer & Architect: Bilal Shah
   Direct WhatsApp Contact: +92 348 5511763 (0348-5511763)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Official Contact WhatsApp
  const BAS_OFFICIAL_WHATSAPP = '923485511763';
  const BAS_PHONE_DISPLAY = '0348-5511763';

  // ==========================================================================
  // 1. Mobile Navigation Drawer Controller
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileNavToggle');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileDrawerOverlay');

  const openDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
  };

  const closeDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeDrawer);
  }

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Close drawer when clicking any link inside it
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }

  // ==========================================================================
  // 2. Interactive Terminal Tabs
  // ==========================================================================
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const terminalBodies = document.querySelectorAll('.terminal-body-tab');
  const terminalCopyBtn = document.getElementById('terminalCopyBtn');

  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTabId = tab.getAttribute('data-tab');
      if (!targetTabId) return;

      // Update Tab state
      terminalTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update Body state
      terminalBodies.forEach(body => {
        body.classList.remove('active');
        if (body.id === targetTabId) {
          body.classList.add('active');
        }
      });
    });
  });

  // Terminal Copy Button
  if (terminalCopyBtn) {
    terminalCopyBtn.addEventListener('click', () => {
      const activeTab = document.querySelector('.terminal-body-tab.active .terminal-code-block');
      if (activeTab) {
        const textToCopy = activeTab.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('✅ Code snippet copied to clipboard!');
          const originalHTML = terminalCopyBtn.innerHTML;
          terminalCopyBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span class="copy-label">Copied</span>';
          setTimeout(() => {
            terminalCopyBtn.innerHTML = originalHTML;
          }, 2000);
        }).catch(() => {
          showToast('📋 Press Cmd/Ctrl+C to copy snippet');
        });
      }
    });
  }

  // ==========================================================================
  // 3. Toast Notification System
  // ==========================================================================
  const toastElement = document.getElementById('toastNotification');
  let toastTimeout = null;

  window.showToast = (message, duration = 3000) => {
    if (!toastElement) return;
    toastElement.textContent = message;
    toastElement.classList.add('active');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastElement.classList.remove('active');
    }, duration);
  };

  // Quick Copy Phone helper
  window.copyContactPhone = () => {
    navigator.clipboard.writeText(BAS_PHONE_DISPLAY).then(() => {
      showToast(`✅ Copied Bilal Shah's phone: ${BAS_PHONE_DISPLAY}`);
    }).catch(() => {
      showToast(`📞 Direct Phone: ${BAS_PHONE_DISPLAY}`);
    });
  };

  // ==========================================================================
  // 4. Header Scroll Transparency & Elevation
  // ==========================================================================
  const header = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.style.background = 'rgba(7, 10, 18, 0.96)';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
    } else {
      header.style.background = 'rgba(7, 10, 18, 0.88)';
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ==========================================================================
  // 5. Dynamic Project Inquiry & WhatsApp Form
  // ==========================================================================
  const inquiryForm = document.getElementById('inquiryForm');
  const formStatusMsg = document.getElementById('formStatusMsg');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value.trim();
      const contact = document.getElementById('clientContact')?.value.trim();
      const details = document.getElementById('projectDetails')?.value.trim();

      if (!name || !contact || !details) {
        if (formStatusMsg) {
          formStatusMsg.textContent = '⚠️ Please fill out all required fields marked with *';
          formStatusMsg.className = 'form-status-msg error';
        }
        return;
      }

      const company = document.getElementById('clientCompany')?.value.trim() || 'Business / Individual';
      const projectType = document.getElementById('projectType')?.value || 'Company Software / Website';
      const budget = document.getElementById('projectBudget')?.value || 'Flexible / To Be Discussed';

      // Compose structured, professional WhatsApp message
      const message =
        `👋 *Hello Bilal Shah (BAS-Software Solutions)!*\n\n` +
        `I would like to hire you for a custom software / web development project.\n\n` +
        `👤 *Client Name:* ${name}\n` +
        `🏢 *Company / Business:* ${company}\n` +
        `📞 *Contact Number:* ${contact}\n` +
        `💼 *Service Required:* ${projectType}\n` +
        `💰 *Estimated Budget:* ${budget}\n\n` +
        `📝 *Project Overview & Requirements:*\n${details}\n\n` +
        `*(Sent via BAS-Software Solutions Developer Platform)*`;

      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${BAS_OFFICIAL_WHATSAPP}?text=${encodedMsg}`;

      if (formStatusMsg) {
        formStatusMsg.textContent = '🚀 Opening WhatsApp with your project specifications... Please tap Send!';
        formStatusMsg.className = 'form-status-msg success';
      }

      showToast('🚀 Opening WhatsApp...');

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 400);
    });
  }

  // ==========================================================================
  // 6. Direct WhatsApp Chat Launcher
  // ==========================================================================
  window.openDirectWhatsApp = (serviceName = 'Software / Website Development') => {
    const text = encodeURIComponent(
      `Hi Bilal Shah (BAS-Software Solutions)! I visited your developer platform and I would like to discuss a project regarding: ${serviceName}. Please share your consultation & availability.`
    );
    window.open(`https://wa.me/${BAS_OFFICIAL_WHATSAPP}?text=${text}`, '_blank');
  };

  // ==========================================================================
  // 7. Smooth Scroll with Dynamic Header Height Offset
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = header ? header.getBoundingClientRect().height : 70;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 10);

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ==========================================================================
  // 8. Animated Number Counters via IntersectionObserver
  // ==========================================================================
  const statsSection = document.querySelector('.hero-stats-row');
  const counters = document.querySelectorAll('.stat-count');
  let animated = false;

  const runCounters = () => {
    if (animated) return;
    animated = true;

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target') || 0;
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 25));

      const updateCount = () => {
        count += step;
        if (count < target) {
          counter.innerText = count;
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  if ('IntersectionObserver' in window && statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  } else {
    // Fallback if observer not supported
    runCounters();
  }
});
