/**
 * SSR — Homepage Controller (index.html)
 * Renders the shared layout and initializes scroll-reveal animations.
 */

import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader("home");
  renderFooter();

  initScrollReveal();
});

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback: reveal everything immediately
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}
