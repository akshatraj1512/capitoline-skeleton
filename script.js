const counters = document.querySelectorAll('.stat-number');

const runCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;

    const update = () => {
      const increment = target / 120;

      if(count < target){
        count += increment;
        counter.innerText = Math.floor(count).toLocaleString();
        setTimeout(update, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    update();
  });
};

window.addEventListener('load', runCounters);
