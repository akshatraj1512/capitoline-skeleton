/* ================= REVEAL ON SCROLL ================= */

const revealElements = document.querySelectorAll(".reveal");

function handleReveal() {
  const triggerPoint = window.innerHeight - 100;

  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);


/* ================= STATS COUNTER ================= */

const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function startCounters() {
  counters.forEach(counter => {
    const target = Number(counter.dataset.count);
    let current = 0;
    const increment = target / 120;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        counter.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current).toLocaleString();
      }
    }, 15);
  });
}

function checkStatsVisibility() {
  const statsSection = document.querySelector(".stats-section");
  if (!statsSection || countersStarted) return;

  const position = statsSection.getBoundingClientRect().top;

  if (position < window.innerHeight - 120) {
    countersStarted = true;
    startCounters();
  }
}

window.addEventListener("scroll", checkStatsVisibility);


/* ================= MARKETS LIGHTBOX ================= */

const marketData = {
  capital: {
    title: "Capital Markets",
    text: "Active participation across global capital markets, supporting institutional trading, execution workflows, and market infrastructure."
  },
  digital: {
    title: "Digital Assets",
    text: "Quant-driven engagement in digital asset markets with advanced analytics and scalable execution capabilities."
  },
  risk: {
    title: "Risk Management",
    text: "Embedded risk frameworks providing portfolio-level visibility and disciplined exposure control."
  },
  data: {
    title: "Data & Analytics",
    text: "Structured data environments transforming complex market data into actionable intelligence."
  },
  ib: {
    title: "Investment Banking",
    text: "Support across capital raising, transaction analysis, and secondary market operations."
  },
  energy: {
    title: "Energy & Commodities",
    text: "Focused trading across power and commodity markets driven by market structure expertise."
  }
};

const marketCards = document.querySelectorAll(".market-card");
const lightbox = document.getElementById("lightbox");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxText = document.getElementById("lightbox-text");
const closeBtn = document.querySelector(".close-btn");

marketCards.forEach(card => {
  card.addEventListener("click", () => {
    const key = card.dataset.market;
    if (!marketData[key]) return;

    lightboxTitle.textContent = marketData[key].title;
    lightboxText.textContent = marketData[key].text;
    lightbox.classList.add("active");
  });
});

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}

if (lightbox) {
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
}