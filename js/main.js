/* ============================================
   FitMeals — Main JavaScript
   Scroll animations, counters, parallax, interactions
   ============================================ */

(function () {
  'use strict';

  // ---- DOM Ready ----
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupLoadAnimations();
    setupScrollAnimations();
    setupNav();
    setupMobileMenu();
    setupProgressBar();
    setupParallax();
    setupCounters();
    setupMockupBars();
    setupMockupScoreCounters();
    setupSmoothScroll();
  }

  // ---- Load Animations ----
  function setupLoadAnimations() {
    const els = document.querySelectorAll('.animate-on-load');
    els.forEach(el => {
      const delay = el.getAttribute('data-delay') || 0;
      el.style.setProperty('--delay', delay);
    });
  }

  // ---- Scroll-triggered Reveal Animations ----
  function setupScrollAnimations() {
    const revealElements = document.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right, .reveal-scale'
    );

    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute('data-delay') || 0;
            el.style.transitionDelay = delay + 'ms';
            el.classList.add('visible');
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach(el => observer.observe(el));
  }

  // ---- Sticky Nav ----
  function setupNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let lastScroll = 0;

    function onScroll() {
      const scrollY = window.scrollY;
      if (scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile Menu ----
  function setupMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Progress Bar ----
  function setupProgressBar() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ---- Parallax Effects ----
  function setupParallax() {
    // Placeholder — no parallax shapes currently in use
  }

  // ---- Animated Counters ----
  function setupCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ---- Mockup Progress Bars ----
  function setupMockupBars() {
    const bars = document.querySelectorAll('.mockup-bar-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            if (width) {
              setTimeout(() => {
                bar.style.width = width + '%';
              }, 300);
            }
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );

    bars.forEach(bar => observer.observe(bar));
  }

  // ---- Mockup Score Counters ----
  function setupMockupScoreCounters() {
    const scores = document.querySelectorAll('.mockup-score-number');
    if (!scores.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    scores.forEach(score => observer.observe(score));
  }

  // ---- Smooth Scroll for Anchor Links ----
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

})();
