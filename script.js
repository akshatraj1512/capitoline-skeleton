// Smooth scroll (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Stats counter with typing effect
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText.replace(/,/g, '');

    const increment = Math.ceil(target / 200);

    if (current < target) {
      counter.innerText = Math.min(current + increment, target).toLocaleString();
      setTimeout(updateCount, 20);
    }
  };

  updateCount();
});
