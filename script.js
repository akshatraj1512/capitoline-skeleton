/* ================= REVEAL ANIMATION ================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const trigger = window.innerHeight - 100;

    if (top < trigger) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // run once on load


/* ================= STATS COUNTER ================= */

const counters = document.querySelectorAll("[data-count]");
let started = false;

function runCounters() {
  counters.forEach(counter => {
    const target = +counter.dataset.count;
    let count = 0;
    const step = target / 150;

    const interval = setInterval(() => {
      count += step;

      if (count >= target) {
        counter.innerText = target.toLocaleString();
        clearInterval(interval);
      } else {
        counter.innerText = Math.floor(count).toLocaleString();
      }
    }, 15);
  });
}

window.addEventListener("scroll", () => {
  const section = document.querySelector(".stats-section");
  if (!section || started) return;

  const position = section.getBoundingClientRect().top;
  if (position < window.innerHeight - 100) {
    started = true;
    runCounters();
  }
});

const marketData = {
  capital: {
    title: "Capital Markets",
    text: "Capitoline operates across global capital markets with a trading-led approach. Our teams support institutional trading, execution workflows, and market infrastructure across equities and derivatives."
  },

  digital: {
    title: "Digital Assets",
    text: "Active engagement in digital asset markets combining trading insight, quantitative analytics, exchange connectivity, and scalable execution systems."
  },

  risk: {
    title: "Risk Management",
    text: "Risk frameworks embedded at every stage of the trading process, providing portfolio-level visibility, scenario analysis, and disciplined exposure control."
  },

  data: {
    title: "Data & Analytics",
    text: "Structured data environments and advanced analytics transforming complex market data into decision-ready trading intelligence."
  },

  ib: {
    title: "Investment Banking",
    text: "Experience across capital raising, transaction analysis, and secondary market operations supporting institutional trading environments."
  },

  energy: {
    title: "Energy & Commodities",
    text: "Core focus on power and commodity markets, combining market structure expertise with analytics-driven trading and risk control."
  }
};

const cards = document.querySelectorAll(".market-card");
const lightbox = document.getElementById("lightbox");
const lbTitle = document.getElementById("lightbox-title");
const lbText = document.getElementById("lightbox-text");
const closeBtn = document.querySelector(".close-btn");

cards.forEach(card=>{
  card.addEventListener("click",()=>{
    const key = card.dataset.market;
    lbTitle.innerText = marketData[key].title;
    lbText.innerText = marketData[key].text;
    lightbox.classList.add("active");
  });
});

closeBtn.addEventListener("click",()=>{
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click",(e)=>{
  if(e.target === lightbox){
    lightbox.classList.remove("active");
  }
});
