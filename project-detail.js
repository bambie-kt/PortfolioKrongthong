// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function () {
  const elementsToAnimate = document.querySelectorAll('.section, .sidebar-card, .related-card, .highlight-box');
  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });

  // Staggered animation for highlight boxes
  const highlightBoxes = document.querySelectorAll('.highlight-box');
  highlightBoxes.forEach((box, index) => {
    setTimeout(() => {
      box.style.opacity = '1';
      box.style.transform = 'translateY(0)';
    }, index * 150 + 300);
  });

  // Staggered animation for related cards
  const relatedCards = document.querySelectorAll('.related-card');
  relatedCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200 + 500);
  });

  // Animate tech tags
  const techTags = document.querySelectorAll('.tech-tag');
  techTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.9)';
    tag.style.transition = 'all 0.4s ease';
    setTimeout(() => {
      tag.style.opacity = '1';
      tag.style.transform = 'scale(1)';
    }, index * 100 + 400);
  });

  // Init helpers
  createScrollProgress();
  addRippleEffect();
});

// Loading animation for hero section
window.addEventListener('load', function () {
  const headerContent = document.querySelector('.header-content');
  const backBtn = document.querySelector('.back-btn');

  if (headerContent) {
    headerContent.style.opacity = '0';
    headerContent.style.transform = 'translateY(30px)';
    headerContent.style.transition = 'all 1s ease';
    setTimeout(() => {
      headerContent.style.opacity = '1';
      headerContent.style.transform = 'translateY(0)';
    }, 300);
  }

  if (backBtn) {
    backBtn.style.opacity = '0';
    backBtn.style.transform = 'translateX(-20px)';
    backBtn.style.transition = 'all 0.8s ease';
    setTimeout(() => {
      backBtn.style.opacity = '1';
      backBtn.style.transform = 'translateX(0)';
    }, 500);
  }
});

// Scroll progress (monochrome)
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = [
    'position:fixed',
    'top:0',
    'left:0',
    'width:0%',
    'height:3px',
    // Minimal black/grey gradient to match theme
    'background:linear-gradient(90deg,#111,#444)',
    'z-index:9999',
    'transition:width 0.1s ease'
  ].join(';');
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Parallax effect for project header (clamped)
window.addEventListener('scroll', () => {
  const header = document.querySelector('.project-header');
  if (!header) return;
  const scrolled = window.pageYOffset;
  const limit = Math.max(0, header.offsetHeight);
  if (scrolled < limit) {
    header.style.willChange = 'transform';
    header.style.transform = `translateY(${scrolled * 0.4}px)`;
  } else {
    header.style.transform = 'translateY(0)';
    header.style.willChange = 'auto';
  }
});

// Hover effects for navigation
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () { this.style.transform = 'translateY(-2px)'; });
    link.addEventListener('mouseleave', function () { this.style.transform = 'translateY(0)'; });
  });
});

// Click ripple effect for buttons
function addRippleEffect() {
  const buttons = document.querySelectorAll('.project-link, .related-link, .back-btn');
  buttons.forEach(button => {
    button.style.position = button.style.position || 'relative';
    button.style.overflow = 'hidden';
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      Object.assign(ripple.style, {
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        width: '12px',
        height: '12px',
        background: 'rgba(17,17,17,.25)',
        borderRadius: '999px',
        transform: 'translate(-50%,-50%) scale(1)',
        animation: 'ripple 600ms ease-out'
      });
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  // Keyframes (inject once)
  if (!document.getElementById('ripple-keyframes')) {
    const style = document.createElement('style');
    style.id = 'ripple-keyframes';
    style.textContent = `@keyframes ripple{from{opacity:.35;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-50%) scale(12)}}`;
    document.head.appendChild(style);
  }
}
