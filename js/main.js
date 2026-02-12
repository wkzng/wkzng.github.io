/* ─── Mobile nav ─────────────────────────────────────── */
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  const isOpen = links.style.display === 'flex';
  links.style.display = isOpen ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'fixed';
  links.style.top = '64px';
  links.style.left = '0';
  links.style.right = '0';
  links.style.background = 'rgba(10,10,15,0.97)';
  links.style.padding = '1.5rem 2rem';
  links.style.borderBottom = '1px solid var(--border)';
  links.style.gap = '1.2rem';
  if (isOpen) links.style.display = 'none';
}

/* ─── Blog filter ────────────────────────────────────── */
function filterPosts(category, btn) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide posts
  const posts = document.querySelectorAll('.post-row[data-category]');
  posts.forEach(post => {
    if (category === 'all' || post.dataset.category === category) {
      post.style.display = 'grid';
      post.style.animation = 'fadeIn 0.3s ease forwards';
    } else {
      post.style.display = 'none';
    }
  });
}

/* ─── Fade-in on scroll ──────────────────────────────── */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.card, .post-row, .stat-box, .contact-link-row').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

/* ─── Stagger hero cards ─────────────────────────────── */
document.querySelectorAll('.topic-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateX(30px)';
  card.style.transition = `opacity 0.5s ease ${i * 0.1 + 0.2}s, transform 0.5s ease ${i * 0.1 + 0.2}s`;
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateX(0)';
  }, 50);
});

/* ─── Hero content fade-in ───────────────────────────── */
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  heroContent.style.opacity = '0';
  heroContent.style.transform = 'translateY(24px)';
  heroContent.style.transition = 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s';
  setTimeout(() => {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }, 50);
}

/* ─── Active nav highlight ───────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href && (href === currentPage || href.includes(currentPage))) {
    if (!link.classList.contains('nav-cta')) link.classList.add('active');
  }
});

// Inject CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .filter-btn { cursor: pointer; transition: all 0.2s; background: none; }
  .filter-btn.active { background: rgba(91,106,240,0.15) !important; color: var(--accent) !important; border-color: var(--accent) !important; }
  .filter-btn:hover { opacity: 0.8; }
`;
document.head.appendChild(style);
