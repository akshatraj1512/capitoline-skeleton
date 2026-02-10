document.addEventListener("DOMContentLoaded", () => {

  /* ================= REVEAL ================= */

  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll(){
    reveals.forEach(el=>{
      const top = el.getBoundingClientRect().top;
      if(top < window.innerHeight - 100){
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();


  /* ================= STATS COUNTER ================= */

  const counters = document.querySelectorAll("[data-count]");
  const statsSection = document.querySelector(".stats-section");
  let started = false;

  function runCounters(){
    counters.forEach(counter=>{
      const target = +counter.dataset.count;
      let value = 0;
      const step = target / 150;

      const interval = setInterval(()=>{
        value += step;
        if(value >= target){
          counter.textContent = target.toLocaleString();
          clearInterval(interval);
        } else {
          counter.textContent = Math.floor(value).toLocaleString();
        }
      },15);
    });
  }

  window.addEventListener("scroll",()=>{
    if(!statsSection || started) return;
    if(statsSection.getBoundingClientRect().top < window.innerHeight-100){
      started = true;
      runCounters();
    }
  });


  /* ================= LIGHTBOX ================= */

  const marketData = {
    capital:{title:"Capital Markets",text:"Institutional trading across equities and derivatives."},
    digital:{title:"Digital Assets",text:"Quant-driven participation across crypto markets."},
    risk:{title:"Risk Management",text:"Embedded exposure and portfolio risk frameworks."},
    data:{title:"Data & Analytics",text:"Market data transformed into intelligence."},
    ib:{title:"Investment Banking",text:"Capital markets transaction support."},
    energy:{title:"Energy & Commodities",text:"Power and commodities trading focus."}
  };

  const cards = document.querySelectorAll(".market-card");
  const lightbox = document.getElementById("lightbox");
  const lbTitle = document.getElementById("lightbox-title");
  const lbText = document.getElementById("lightbox-text");
  const closeBtn = document.querySelector(".close-btn");

  cards.forEach(card=>{
    card.addEventListener("click",()=>{
      const key = card.dataset.market;
      lbTitle.textContent = marketData[key].title;
      lbText.textContent = marketData[key].text;
      lightbox.classList.add("active");
      document.body.style.overflow="hidden";
    });
  });

  closeBtn.addEventListener("click",()=>{
    lightbox.classList.remove("active");
    document.body.style.overflow="";
  });

  lightbox.addEventListener("click",(e)=>{
    if(e.target===lightbox){
      lightbox.classList.remove("active");
      document.body.style.overflow="";
    }
  });


/* ================= MEGA MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const megaMenu = document.getElementById("megaMenu");

let menuOpen = false;

menuToggle.addEventListener("click", () => {

  menuOpen = !menuOpen;

  if(menuOpen){
    megaMenu.classList.add("open");
    menuToggle.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    megaMenu.classList.remove("open");
    menuToggle.classList.remove("active");
    document.body.style.overflow = "";
  }

});

})