document.addEventListener("DOMContentLoaded", () => {

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ================= MOBILE VIDEO AUTOPLAY FALLBACK ================= */

  const heroVideo = document.getElementById("heroVideo");
  if (heroVideo) {
    // Add error handling for video loading
    heroVideo.addEventListener("error", () => {
      console.warn("Video failed to load");
    });

    // Try to play video
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video is playing
        })
        .catch(() => {
          // Autoplay failed, set up user interaction fallback
          document.addEventListener("click", () => {
            if (heroVideo.paused) {
              heroVideo.play().catch(() => {});
            }
          }, { once: true });
        });
    }
  }

  /* ================= INTERSECTION OBSERVER ================= */

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
        entry.target.classList.add("animated", "in-view");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe market cards
  document.querySelectorAll(".market-card").forEach(card => {
    observer.observe(card);
  });

  // Observe platform cards
  document.querySelectorAll(".platform-card").forEach(card => {
    observer.observe(card);
  });

  // Observe built section
  const builtSection = document.querySelector(".built-section");
  if (builtSection) {
    observer.observe(builtSection);
  }


  /* ================= MEGA MENU ================= */

  const menuToggle = document.getElementById("menuToggle");
  const megaMenu = document.getElementById("megaMenu");
  const megaLinks = document.querySelectorAll(".mega-menu a");

  let menuOpen = false;

  // Toggle menu on hamburger click
  menuToggle.addEventListener("click", () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
      megaMenu.classList.add("open");
      menuToggle.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      megaMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close menu on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) {
      menuOpen = false;
      megaMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close menu on link click
  megaLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuOpen = false;
      megaMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close menu on backdrop click
  megaMenu.addEventListener("click", (e) => {
    if (e.target === megaMenu) {
      menuOpen = false;
      megaMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });


  /* ================= STATS COUNTER ================= */

  const counters = document.querySelectorAll("[data-count]");
  const statsSection = document.querySelector(".stats-section");
  let counterStarted = false;

  function easeOutQuad(t) {
    // Use easing in final 15% of animation
    if (t < 0.85) return t;
    const remaining = t - 0.85;
    const remainingTime = 1 - 0.85;
    const eased = 1 - Math.pow(1 - (remaining / remainingTime), 2);
    return 0.85 + eased * 0.15;
  }

  function runCounters() {
    counters.forEach((counter, index) => {
      const target = +counter.dataset.count;
      let value = 0;
      const duration = 1500; // 1.5 seconds
      const fps = 60;
      const frameCount = Math.round(duration / (1000 / fps));
      let currentFrame = 0;

      counter.classList.add("counting");

      const interval = setInterval(() => {
        currentFrame++;
        const progress = currentFrame / frameCount;
        const easedProgress = easeOutQuad(progress);
        value = target * easedProgress;

        if (currentFrame >= frameCount) {
          counter.textContent = target.toLocaleString();
          // Label will fade in via CSS transition
          clearInterval(interval);
        } else {
          counter.textContent = Math.floor(value).toLocaleString();
        }
      }, 1000 / fps);
    });
  }

  // Trigger counters on scroll
  const triggerCounters = () => {
    if (!statsSection || counterStarted) return;
    if (statsSection.getBoundingClientRect().top < window.innerHeight - 100) {
      counterStarted = true;
      runCounters();
      window.removeEventListener("scroll", triggerCounters);
    }
  };

  window.addEventListener("scroll", triggerCounters);
  triggerCounters(); // Call once on load in case section is visible


  /* ================= LIGHTBOX ================= */

  const marketData = {
    capital: { 
      title: "Capital Markets", 
      cardText: "Institutional trading across equities and derivatives.",
      lightboxText: "We engage actively in digital asset markets, combining trading insight with advanced analytics and infrastructure. Our capabilities cover exchange connectivity, wallet integrations, market data ingestion, and quantitative trading systems across major cryptocurrencies and digital instruments. The focus remains on execution clarity, risk discipline, and scalable market access." 
    },
    digital: { 
      title: "Digital Assets", 
      cardText: "Quant-driven participation across crypto markets.",
      lightboxText: "Risk management is embedded at every level of our trading operations. Capitoline applies structured frameworks to monitor market, credit, liquidity, and exposure risks across portfolios. Advanced analytics and scenario modelling support informed decision-making, ensuring risk visibility and control across changing market conditions." 
    },
    risk: { 
      title: "Risk Management", 
      cardText: "Embedded exposure and portfolio risk frameworks.",
      lightboxText: "Risk management is embedded at every level of our trading operations. Capitoline applies structured frameworks to monitor market, credit, liquidity, and exposure risks across portfolios. Advanced analytics and scenario modelling support informed decision-making, ensuring risk visibility and control across changing market conditions." 
    },
    data: { 
      title: "Data & Analytics", 
      cardText: "Market data transformed into intelligence.",
      lightboxText: "High-quality data underpins effective trading decisions. Capitoline develops and operates structured data environments that consolidate market, trade, and risk information into actionable intelligence. Through advanced analytics and disciplined data governance, complex market data is transformed into decision-ready insights." 
    },
    ib: { 
      title: "Investment Banking", 
      cardText: "Capital markets transaction support.",
      lightboxText: "Capitoline’s experience extends across investment banking and market infrastructure workflows, including capital raising, transaction analysis, and secondary market operations. Our focus lies in supporting trading, pricing, and risk functions that underpin capital markets activity across equities, fixed income, currencies, and commodities." 
    },
    energy: { 
      title: "Energy & Commodities", 
      cardText: "Power and commodities trading focus.",
      lightboxText: "Energy and commodities form a core focus of Capitoline’s trading operations. We operate across power and commodity markets with deep understanding of market structure, congestion, pricing dynamics, and regulatory frameworks. Advanced analytics and trading systems support position visibility, risk management, and execution across physical and financial markets." 
    }
  };

  const cards = document.querySelectorAll(".market-card");
  const lightbox = document.getElementById("lightbox");
  const lbTitle = document.getElementById("lightbox-title");
  const lbText = document.getElementById("lightbox-text");
  const closeBtn = document.querySelector(".close-btn");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.market;
      lbTitle.textContent = marketData[key].title;
      lbText.textContent = marketData[key].lightboxText;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close lightbox on button click
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close lightbox on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close lightbox on backdrop click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  /* ================= JUMP TO TOP BUTTON ================= */

  const jumpToTopBtn = document.getElementById("jumpToTopBtn");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      jumpToTopBtn.classList.add("show");
    } else {
      jumpToTopBtn.classList.remove("show");
    }
  });

  // Smooth scroll to top
  jumpToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});
