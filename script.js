// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));

  // Animated stat counters
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = '+' + current;
          }, 30);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counterObs.observe(el);
  });

  // Typewriter for hero name (home page only)
  const typed = document.querySelector('.typed-name');
  if (typed) {
    const text = typed.dataset.text || typed.textContent;
    typed.textContent = '';
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        typed.textContent = text.slice(0, i);
        i++;
        setTimeout(type, 70);
      } else {
        typed.classList.add('cursor-bold');
      }
    };
    type();
  }
});

// Contact form handler
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const status = document.getElementById('form-status');
  if (status) {
    status.textContent = 'Thanks — message captured. (Connect this form to an email service like Formspree to receive submissions.)';
    status.style.color = 'var(--accent)';
  }
  form.reset();
  return false;
}
