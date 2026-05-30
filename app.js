/* ============================================
   BAZAAR LIQUIDATIONS — App Logic
   Treasure-hunt interactivity, deals, reviews
   ============================================ */

'use strict';

// ---------- Featured Deals Data ----------
const deals = [
  {
    id: 1,
    title: 'Sony WH-1000XM5 Headphones',
    category: 'Electronics',
    emoji: '🎧',
    original: 349.99,
    current: 79.99,
    stock: 'Only 3 left!',
    lowStock: true
  },
  {
    id: 2,
    title: 'KitchenAid Artisan Stand Mixer',
    category: 'Kitchen',
    emoji: '🍳',
    original: 449.99,
    current: 129.99,
    stock: 'Only 5 left!',
    lowStock: true
  },
  {
    id: 3,
    title: 'Dyson V15 Detect Cordless Vacuum',
    category: 'Home Goods',
    emoji: '🧹',
    original: 749.99,
    current: 199.99,
    stock: 'In stock',
    lowStock: false
  },
  {
    id: 4,
    title: 'LEGO Star Wars Millennium Falcon',
    category: 'Toys & Games',
    emoji: '🧸',
    original: 169.99,
    current: 49.99,
    stock: 'In stock',
    lowStock: false
  },
  {
    id: 5,
    title: 'Nintendo Switch OLED Console',
    category: 'Electronics',
    emoji: '🎮',
    original: 349.99,
    current: 89.99,
    stock: 'Only 2 left!',
    lowStock: true
  },
  {
    id: 6,
    title: 'Vitamix A3500 Blender',
    category: 'Kitchen',
    emoji: '🥤',
    original: 649.99,
    current: 179.99,
    stock: 'In stock',
    lowStock: false
  },
  {
    id: 7,
    title: 'Bose QuietComfort Earbuds II',
    category: 'Electronics',
    emoji: '🔊',
    original: 279.99,
    current: 69.99,
    stock: 'Only 4 left!',
    lowStock: true
  },
  {
    id: 8,
    title: 'Nespresso Vertuo Next Coffee Machine',
    category: 'Kitchen',
    emoji: '☕',
    original: 179.99,
    current: 39.99,
    stock: 'In stock',
    lowStock: false
  }
];

function getSavingsPercent(original, current) {
  return Math.round(((original - current) / original) * 100);
}

function renderDeals() {
  const grid = document.getElementById('dealsGrid');
  if (!grid) return;

  grid.innerHTML = deals.map(deal => `
    <div class="deal-card animate-in" style="animation-delay: ${deals.indexOf(deal) * 0.1}s">
      <div class="deal-badge ${deal.lowStock ? 'deal-badge-flash' : ''}">
        ${getSavingsPercent(deal.original, deal.current)}% OFF
      </div>
      <div class="deal-img">${deal.emoji}</div>
      <div class="deal-body">
        <div class="deal-category">${deal.category}</div>
        <h3 class="deal-title">${deal.title}</h3>
        <div class="deal-prices">
          <span class="deal-price-original">$${deal.original.toFixed(2)}</span>
          <span class="deal-price-current">$${deal.current.toFixed(2)}</span>
          <span class="deal-price-savings">Save $${(deal.original - deal.current).toFixed(2)}</span>
        </div>
        <div class="deal-stock ${deal.lowStock ? 'low' : ''}">
          ${deal.lowStock ? '⚡' : '✓'} ${deal.stock}
        </div>
      </div>
    </div>
  `).join('');
}

// ---------- Reviews Carousel ----------
const reviews = [
  {
    stars: 5,
    text: 'I walked in for a charger and walked out with a $700 espresso machine for $180. This place is dangerous for my wallet in the best way.',
    author: 'Sarah M.',
    date: '2 weeks ago'
  },
  {
    stars: 5,
    text: 'The inventory changes constantly. I go twice a week and find something new every time. Found a Dyson vacuum for $200 — retail is $750!',
    author: 'James T.',
    date: '1 month ago'
  },
  {
    stars: 5,
    text: 'As a reseller, this is my secret weapon. Brand-name electronics at prices I can actually flip for a profit. Been coming here for 2 years.',
    author: 'David K.',
    date: '3 weeks ago'
  },
  {
    stars: 5,
    text: 'Bought a full set of KitchenAid attachments for what one would cost at the mall. Staff was super helpful too. New favorite store!',
    author: 'Linda R.',
    date: '1 week ago'
  }
];

let currentReview = 0;

function renderReviews() {
  const track = document.getElementById('reviewsTrack');
  const dots = document.getElementById('reviewDots');
  if (!track || !dots) return;

  track.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-card-inner">
        <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-author">${r.author}</div>
        <div class="review-date">${r.date}</div>
      </div>
    </div>
  `).join('');

  dots.innerHTML = reviews.map((_, i) => `
    <button class="review-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Review ${i + 1}"></button>
  `).join('');
}

function goToReview(index) {
  const track = document.getElementById('reviewsTrack');
  const dots = document.querySelectorAll('.review-dot');
  if (!track) return;

  currentReview = Math.max(0, Math.min(index, reviews.length - 1));
  track.style.transform = `translateX(-${currentReview * 100}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentReview);
  });
}

// ---------- Count-up Animation ----------
function animateCounters() {
  const counters = document.querySelectorAll('.stat-value[data-count]');

  counters.forEach(counter => {
    const target = parseFloat(counter.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      counter.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(update);
  });
}

// ---------- Hero Particles ----------
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const count = 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.opacity = Math.random() * 0.5 + 0.1;

    container.appendChild(particle);
  }
}

// ---------- Intersection Observer for Animations ----------
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Count-up when stats section comes into view
        if (entry.target.classList.contains('hero-stats')) {
          animateCounters();
        }
        // Don't unobserve — allow re-animation on scroll
      }
    });
  }, { threshold: 0.2 });

  // Elements to animate on scroll
  document.querySelectorAll('.section-header, .step, .cat-card, .store-card, .deal-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Also observe stats
  const stats = document.querySelector('.hero-stats');
  if (stats) {
    stats.style.opacity = '0';
    observer.observe(stats);
  }
}

// ---------- Mobile Menu ----------
function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---------- Header Scroll Effect ----------
function setupHeaderScroll() {
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    if (current > 100) {
      header.style.background = 'rgba(29, 27, 27, 0.98)';
    } else {
      header.style.background = 'rgba(29, 27, 27, 0.92)';
    }

    lastScroll = current;
  }, { passive: true });
}

// ---------- Newsletter Form ----------
function setupNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value.trim();

    if (!email) return;

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = '✓ You\'re In!';
    btn.style.background = 'var(--brand-success)';
    btn.style.borderColor = 'var(--brand-success)';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
    }, 3000);

    // Track in console for now (analytics placeholder)
    console.log('Newsletter signup:', email);
  });
}

// ---------- Review Controls ----------
function setupReviewControls() {
  const prev = document.getElementById('reviewPrev');
  const next = document.getElementById('reviewNext');
  const dotsContainer = document.getElementById('reviewDots');

  if (!prev || !next || !dotsContainer) return;

  prev.addEventListener('click', () => {
    goToReview(currentReview - 1);
  });

  next.addEventListener('click', () => {
    goToReview(currentReview + 1);
  });

  dotsContainer.addEventListener('click', (e) => {
    const dot = e.target.closest('.review-dot');
    if (!dot) return;
    goToReview(parseInt(dot.dataset.index));
  });

  // Auto-advance reviews every 5 seconds
  let interval = setInterval(() => {
    goToReview(currentReview + 1);
  }, 5000);

  // Pause on hover
  const carousel = document.getElementById('reviewsCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        goToReview(currentReview + 1);
      }, 5000);
    });
  }
}

// ---------- Category Click ----------
function setupCategories() {
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      // Scroll to deals section
      document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' });
      // Highlight deals matching category (visual feedback)
      const dealCards = document.querySelectorAll('.deal-card');
      dealCards.forEach(deal => {
        const cat = deal.querySelector('.deal-category')?.textContent?.toLowerCase() || '';
        if (cat.includes(category) || category === 'all') {
          deal.style.transform = 'scale(1.05)';
          deal.style.boxShadow = '0 8px 30px rgba(230, 57, 70, 0.2)';
          setTimeout(() => {
            deal.style.transform = '';
            deal.style.boxShadow = '';
          }, 1000);
        }
      });
    });
  });
}

// ---------- Smooth scroll offset for fixed header ----------
function setupSmoothScrollFix() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  renderDeals();
  renderReviews();
  setupMobileMenu();
  setupHeaderScroll();
  setupNewsletter();
  setupReviewControls();
  setupCategories();
  setupScrollAnimations();
  setupSmoothScrollFix();

  // Trigger initial count-up if visible
  setTimeout(() => {
    const hero = document.querySelector('.hero');
    if (hero && hero.getBoundingClientRect().top < window.innerHeight) {
      animateCounters();
    }
  }, 1000);
});