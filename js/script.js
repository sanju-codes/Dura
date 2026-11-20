/* DURA ROOF - polished, accessible site interactions */
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  // Mobile navigation
  if (menuBtn && navLinks) {
    menuBtn.setAttribute("role", "button");
    menuBtn.setAttribute("tabindex", "0");
    menuBtn.setAttribute("aria-label", "Toggle navigation");
    menuBtn.setAttribute("aria-expanded", "false");

    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
      }
    };

    menuBtn.addEventListener("click", toggleMenu);
    menuBtn.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleMenu();
      }
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        const icon = menuBtn.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });
    document.addEventListener("click", event => {
      if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
        navLinks.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Header elevation on scroll
  const header = document.querySelector("header");
  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Smooth in-page links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const selector = link.getAttribute("href");
      if (!selector || selector === "#") return;
      const target = document.querySelector(selector);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Animated statistics, triggered once when visible
  const stats = document.querySelector(".stats");
  if (stats && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      stats.querySelectorAll("h2").forEach(counter => {
        const original = counter.textContent.trim();
        const number = Number.parseInt(original.replace(/[^0-9]/g, ""), 10);
        if (!Number.isFinite(number)) return;
        const suffix = original.includes("%") ? "%" : (original.includes("+") ? "+" : "");
        const duration = 1100;
        const startTime = performance.now();
        const animate = now => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(number * eased) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      });
      counterObserver.disconnect();
    }, { threshold: 0.25 });
    counterObserver.observe(stats);
  }

  // Scroll reveal with a safe no-JS fallback
  const revealItems = document.querySelectorAll(
    ".feature-card, .product-card, .gallery-grid img, .testimonial-box, .about-content, .about-image"
  );
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach(item => item.classList.add("reveal-pending"));
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  // Gallery lightbox
  document.querySelectorAll(".gallery-grid img").forEach(img => {
    img.addEventListener("click", () => {
      const lightbox = document.createElement("div");
      lightbox.className = "dura-lightbox";
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.setAttribute("aria-label", img.alt || "Project image");
      const fullImage = document.createElement("img");
      fullImage.src = img.currentSrc || img.src;
      fullImage.alt = img.alt || "Dura Roof project";
      const close = document.createElement("button");
      close.type = "button";
      close.className = "dura-lightbox-close";
      close.setAttribute("aria-label", "Close image");
      close.textContent = "×";
      lightbox.append(close, fullImage);
      document.body.appendChild(lightbox);
      document.body.style.overflow = "hidden";
      const closeLightbox = () => {
        lightbox.remove();
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onKey);
      };
      const onKey = event => { if (event.key === "Escape") closeLightbox(); };
      close.addEventListener("click", closeLightbox);
      lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
      });
      document.addEventListener("keydown", onKey);
    });
  });

  // FAQ accordion
  document.querySelectorAll(".faq-question").forEach(question => {
    question.setAttribute("aria-expanded", "false");
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const isOpen = question.classList.toggle("active");
      question.setAttribute("aria-expanded", String(isOpen));
      if (answer) answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : null;
    });
  });

  // Factory outlet carousel - safely initialise only where it exists
  const carousel = document.getElementById("factoryCarousel");
  if (carousel) {
    const cards = [...carousel.querySelectorAll(".factory-card")];
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const dots = [...document.querySelectorAll(".dot")];
    let index = 0;
    let timer = null;

    const cardStep = () => cards[0] ? cards[0].getBoundingClientRect().width + 25 : 300;
    const goTo = nextIndex => {
      if (!cards.length) return;
      index = (nextIndex + cards.length) % cards.length;
      carousel.scrollTo({ left: index * cardStep(), behavior: "smooth" });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === index);
        dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
      });
    };
    if (prev) prev.addEventListener("click", () => goTo(index - 1));
    if (next) next.addEventListener("click", () => goTo(index + 1));
    dots.forEach((dot, dotIndex) => dot.addEventListener("click", () => goTo(dotIndex)));

    const stop = () => { if (timer) window.clearInterval(timer); timer = null; };
    const start = () => {
      stop();
      if (cards.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        timer = window.setInterval(() => goTo(index + 1), 5000);
      }
    };
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
    let touchStart = 0;
    carousel.addEventListener("touchstart", event => {
      touchStart = event.changedTouches[0].clientX;
      stop();
    }, { passive: true });
    carousel.addEventListener("touchend", event => {
      const delta = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(delta) > 45) goTo(index + (delta < 0 ? 1 : -1));
      start();
    }, { passive: true });
    goTo(0);
    start();
  }

  // Back-to-top control
  const topButton = document.createElement("button");
  topButton.type = "button";
  topButton.className = "dura-back-top";
  topButton.setAttribute("aria-label", "Back to top");
  topButton.textContent = "↑";
  document.body.appendChild(topButton);
  const updateTopButton = () => topButton.classList.toggle("is-visible", window.scrollY > 450);
  updateTopButton();
  window.addEventListener("scroll", updateTopButton, { passive: true });
  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
