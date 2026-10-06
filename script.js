document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  const faders = document.querySelectorAll('.fade-up');
  const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -30px 0px" };
  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach(fader => { appearOnScroll.observe(fader); });

  const norm = p => "/" + p.split("/").pop().replace(/\.html$/, "").replace(/^index$/, "");
  const currentPath = norm(window.location.pathname);
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (norm(href) === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Visitors forwarded from the old goods-hub.co domain see a one-line rename notice.
(function () {
  if (!/[?&]from=goods-hub\b/.test(location.search)) return;
  var bar = document.createElement('div');
  bar.className = 'rename-notice';
  bar.setAttribute('role', 'status');
  bar.innerHTML = '<span><strong>Goods Hub Limited</strong> is now <strong>GEXO Supply and Trading Limited</strong>. Same services, new name.</span>' +
    '<button type="button" aria-label="Close">&times;</button>';
  bar.querySelector('button').addEventListener('click', function () { bar.remove(); });
  document.body.insertBefore(bar, document.body.firstChild);
  requestAnimationFrame(function () { if (window.scrollY < 120) window.scrollTo(0, 0); });
  history.replaceState(null, '', location.pathname + location.hash);
})();
