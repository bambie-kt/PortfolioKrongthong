// Simple scroll effect
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.classList.add('show');
    }
  });
});
