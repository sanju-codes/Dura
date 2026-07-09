/*==================================================
DURA ROOF PREMIUM V2
script.js
PART 1
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
      MOBILE MENU
    ==============================*/

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            menuBtn.classList.toggle("active");

        });

    }


    /*==============================
      STICKY HEADER
    ==============================*/

    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });


    /*==============================
      SMOOTH SCROLL
    ==============================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

            navLinks.classList.remove("active");

        });

    });


    /*==============================
      HERO FADE IN
    ==============================*/

    const hero = document.querySelector(".hero-content");

    if (hero) {

        hero.classList.add("fade-in");

    }

});

/*==================================================
COUNTER ANIMATION
==================================================*/

const counters = document.querySelectorAll("[data-target]");

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let count = 0;

        const speed = target / 120;

        const update = () => {

            count += speed;

            if (count < target) {

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target + "+";

            }

        };

        update();

    });

};

const counterSection = document.querySelector(".counter-section");

if (counterSection) {

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounter();

                counterObserver.disconnect();

            }

        });

    }, {

        threshold:0.4

    });

    counterObserver.observe(counterSection);

}


/*==================================================
SCROLL REVEAL
==================================================*/

const revealElements = document.querySelectorAll(

".section-title,.feature-card,.about-item,.product-card,.gallery-item,.testimonial-card,.factory-card,.counter-box"

);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{

    threshold:0.15

});

revealElements.forEach(el=>{

    el.classList.add("reveal");

    revealObserver.observe(el);

});


/*==================================================
ACTIVE MENU
==================================================*/

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;

        const height=section.offsetHeight;

        if(pageYOffset>=top){

            current=section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});

/*==================================================
GALLERY LIGHTBOX
==================================================*/

const galleryImages = document.querySelectorAll(".gallery-item img");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        const overlay = document.createElement("div");
        overlay.className = "lightbox";

        overlay.innerHTML = `
            <span class="close-lightbox">&times;</span>
            <img src="${img.src}" alt="">
        `;

        document.body.appendChild(overlay);

        document.body.style.overflow = "hidden";

        overlay.addEventListener("click", (e) => {

            if (
                e.target.classList.contains("lightbox") ||
                e.target.classList.contains("close-lightbox")
            ) {

                overlay.remove();

                document.body.style.overflow = "";

            }

        });

    });

});


/*==================================================
TESTIMONIAL AUTO SLIDER
==================================================*/

const testimonialSlider = document.querySelector(".testimonial-slider");

if (testimonialSlider) {

    let index = 0;

    setInterval(() => {

        const cards = testimonialSlider.children;

        if (cards.length <= 1) return;

        testimonialSlider.appendChild(cards[0]);

        index++;

    }, 4000);

}


/*==================================================
BACK TO TOP
==================================================*/

const backTop = document.createElement("button");

backTop.className = "back-top";

backTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(backTop);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});

backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*==================================================
PARALLAX HERO
==================================================*/

const heroVideo = document.querySelector(".hero-video");

window.addEventListener("scroll", () => {

    if (heroVideo) {

        heroVideo.style.transform =
            `translateY(${window.scrollY * 0.25}px)`;

    }

});


/*==================================================
BUTTON RIPPLE EFFECT
==================================================*/

document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";

        ripple.style.top = (e.clientY - rect.top) + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/*==================================================
PRELOADER
==================================================*/

window.addEventListener("load", () => {

    const loader = document.querySelector(".preloader");

    if (loader) {

        loader.classList.add("hide");

        setTimeout(() => {

            loader.remove();

        }, 600);

    }

});


/*==================================================
CONSOLE MESSAGE
==================================================*/

console.log("%cDura Roof Premium v2 Loaded",
"color:#22C55E;font-size:18px;font-weight:bold;");
