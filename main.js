// ═══════════════════════════════════════════
// CRÉATION KIK — Enhanced Animations v3
// ═══════════════════════════════════════════

(function(){
  'use strict';

  // ─── SCROLL REVEAL ───
  const reveals = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.reveal-rotate');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(el => obs.observe(el));

  // ─── NAV ───
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
    });
  });

  // ─── CUSTOM CURSOR (dot + ring) ───
  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, dx = 0, dy = 0;

  if (window.matchMedia('(pointer:fine)').matches && dot && ring) {
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function animateCursor() {
      dx += (mx - dx) * 0.15;
      dy += (my - dy) * 0.15;
      dot.style.left = mx - 4 + 'px';
      dot.style.top = my - 4 + 'px';
      ring.style.left = dx - 18 + 'px';
      ring.style.top = dy - 18 + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a,button,.btn,.gallery-item,.service-card,.video-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.style.transform = 'scale(2.5)';
        ring.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.style.transform = 'scale(1)';
        ring.classList.remove('hover');
      });
    });
  }

  // ─── SMOOTH SCROLL ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if(t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ─── PARALLAX IMAGES ───
  const parallaxImgs = document.querySelectorAll('.parallax-img img');
  function updateParallax() {
    parallaxImgs.forEach(img => {
      const rect = img.parentElement.getBoundingClientRect();
      if(rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        img.style.transform = `translateY(${(progress - 0.5) * -60}px)`;
      }
    });
  }
  window.addEventListener('scroll', updateParallax, { passive: true });

  // ─── PARALLAX BG (quote sections) ───
  const parallaxBg = document.getElementById('parallaxBg');
  const parallaxSection = document.getElementById('parallaxQuote');
  if(parallaxBg && parallaxSection) {
    window.addEventListener('scroll', () => {
      const rect = parallaxSection.getBoundingClientRect();
      if(rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        parallaxBg.style.transform = `translateY(${(progress - 0.5) * 80}px) scale(1.1)`;
      }
    }, { passive: true });
  }

  // ─── COUNTER ANIMATION ───
  const counters = document.querySelectorAll('[data-count]');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = 'true';
        const target = parseInt(e.target.dataset.count);
        const suffix = e.target.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          e.target.textContent = Math.round(target * ease) + suffix;
          if(p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObs.observe(el));

  // ─── TILT EFFECT on cards ───
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    });
    card.addEventListener('mouseenter', () => { card.style.transition = 'transform 0.1s'; });
  });

  // ─── MAGNETIC BUTTONS ───
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });

  // ─── LIGHTBOX ───
  const lightbox = document.getElementById('lightbox');
  if(lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.lightbox-close');
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', () => {
        lbImg.src = img.dataset.full || img.src;
        lightbox.classList.add('active');
      });
    });
    lightbox.addEventListener('click', e => {
      if(e.target === lightbox || e.target === lbClose) lightbox.classList.remove('active');
    });
    if(lbClose) lbClose.addEventListener('click', () => lightbox.classList.remove('active'));
    document.addEventListener('keydown', e => { if(e.key === 'Escape') lightbox.classList.remove('active'); });
  }

  // ─── SPLIT TEXT ANIMATION ───
  document.querySelectorAll('.split-text').forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';
    let delay = 0;
    for(let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.classList.add('char');
      span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      span.style.animationDelay = delay + 's';
      el.appendChild(span);
      if(text[i] !== ' ') delay += 0.03;
    }
  });

  // ─── SCROLL PROGRESS BAR ───
  const progressBar = document.getElementById('scrollProgress');
  if(progressBar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = `scaleX(${window.scrollY / h})`;
    }, { passive: true });
  }

})();
