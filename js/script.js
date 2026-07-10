/* ==========================================
   DURA ROOF - SCRIPT.JS
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       MOBILE MENU TOGGLE
    =============================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            if (navLinks.classList.contains("active")) {

                navLinks.style.display = "flex";
                navLinks.style.flexDirection = "column";
                navLinks.style.position = "absolute";
                navLinks.style.top = "95px";
                navLinks.style.left = "0";
                navLinks.style.width = "100%";
                navLinks.style.background = "#fff";
                navLinks.style.padding = "25px";
                navLinks.style.boxShadow = "0 10px 25px rgba(0,0,0,.1)";
                navLinks.style.gap = "20px";

            } else {

                navLinks.removeAttribute("style");

            }

        });

    }


    /* ===============================
       STICKY HEADER EFFECT
    =============================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.12)";

            header.style.background = "#fff";

        }

        else {

            header.style.boxShadow =
                "0 2px 15px rgba(0,0,0,.08)";

        }

    });


    /* ===============================
       SMOOTH SCROLL
    =============================== */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#")
                return;

            const target =
                document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });


    /* ===============================
       COUNTER ANIMATION
    =============================== */

    const counters = document.querySelectorAll(".stats h2");

    let counterStarted = false;

    function runCounter() {

        counters.forEach(counter => {

            let value =
                counter.innerText.replace("+", "")
                                 .replace("%", "");

            value = parseInt(value);

            let start = 0;

            const increment = value / 100;

            const timer = setInterval(() => {

                start += increment;

                if (start >= value) {

                    start = value;

                    clearInterval(timer);

                }

                if (counter.innerText.includes("%")) {

                    counter.innerText =
                        Math.floor(start) + "%";

                }

                else {

                    counter.innerText =
                        Math.floor(start) + "+";

                }

            }, 20);

        });

    }

    window.addEventListener("scroll", () => {

        const stats = document.querySelector(".stats");

        if (!stats) return;

        const pos = stats.offsetTop - 300;

        if (window.scrollY > pos && !counterStarted) {

            counterStarted = true;

            runCounter();

        }

    });



    /* ===============================
       GALLERY LIGHTBOX
    =============================== */

    const galleryImages =
        document.querySelectorAll(".gallery-grid img");

    galleryImages.forEach(img => {

        img.addEventListener("click", () => {

            const overlay =
                document.createElement("div");

            overlay.style.position = "fixed";
            overlay.style.left = "0";
            overlay.style.top = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.background =
                "rgba(0,0,0,.9)";
            overlay.style.display = "flex";
            overlay.style.justifyContent =
                "center";
            overlay.style.alignItems =
                "center";
            overlay.style.zIndex = "99999";

            const image =
                document.createElement("img");

            image.src = img.src;

            image.style.maxWidth = "90%";
            image.style.maxHeight = "90%";
            image.style.borderRadius = "15px";

            overlay.appendChild(image);

            document.body.appendChild(overlay);

            overlay.addEventListener("click", () => {

                overlay.remove();

            });

        });

    });


    /* ===============================
       SCROLL REVEAL ANIMATION
    =============================== */

    const revealElements =
        document.querySelectorAll(

            ".feature-card, \
             .product-card, \
             .gallery-grid img, \
             .testimonial-box, \
             .about-content, \
             .about-image"

        );

    revealElements.forEach(el => {

        el.style.opacity = "0";

        el.style.transform =
            "translateY(40px)";

        el.style.transition =
            "all .8s ease";

    });

    function revealOnScroll() {

        revealElements.forEach(el => {

            const top =
                el.getBoundingClientRect().top;

            const screen =
                window.innerHeight - 100;

            if (top < screen) {

                el.style.opacity = "1";

                el.style.transform =
                    "translateY(0)";

            }

        });

    }

    window.addEventListener(

        "scroll",

        revealOnScroll

    );

    revealOnScroll();



    /* ===============================
       FAQ ACCORDION
    =============================== */

    const faqQuestions =

        document.querySelectorAll(

            ".faq-question"

        );

    faqQuestions.forEach(item => {

        item.addEventListener("click",

            function () {

                this.classList.toggle("active");

                const answer =

                    this.nextElementSibling;

                if (

                    answer.style.maxHeight

                ) {

                    answer.style.maxHeight = null;

                }

                else {

                    answer.style.maxHeight =

                        answer.scrollHeight +

                        "px";

                }

            }

        );

    });


   /* ===========================
   FACTORY OUTLETS CAROUSEL
=========================== */

const carousel = document.getElementById("factoryCarousel");
const cards = document.querySelectorAll(".factory-card");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");

let index = 0;
let autoSlide;

const cardWidth = () => cards[0].offsetWidth + 25;

// Scroll to Card
function goToSlide(i) {

    if (i < 0)
        index = cards.length - 1;
    else if (i >= cards.length)
        index = 0;
    else
        index = i;

    carousel.scrollTo({
        left: index * cardWidth(),
        behavior: "smooth"
    });

    updateDots();
}

// Update Dots
function updateDots() {

    dots.forEach(dot => dot.classList.remove("active"));

    if (dots[index]) {
        dots[index].classList.add("active");
    }
}

// Next
nextBtn.addEventListener("click", () => {
    goToSlide(index + 1);
});

// Previous
prevBtn.addEventListener("click", () => {
    goToSlide(index - 1);
});

// Dot Click
dots.forEach((dot, i) => {

    dot.addEventListener("click", () => {

        goToSlide(i);

    });

});

// Auto Slide
function startAutoSlide() {

    autoSlide = setInterval(() => {

        goToSlide(index + 1);

    }, 3500);

}

function stopAutoSlide() {

    clearInterval(autoSlide);

}

startAutoSlide();

// Pause on Hover
carousel.addEventListener("mouseenter", stopAutoSlide);

carousel.addEventListener("mouseleave", startAutoSlide);

// =====================
// Swipe Support
// =====================

let startX = 0;
let endX = 0;

carousel.addEventListener("touchstart", e => {

    stopAutoSlide();

    startX = e.touches[0].clientX;

});

carousel.addEventListener("touchend", e => {

    endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {

        goToSlide(index + 1);

    } else if (endX - startX > 50) {

        goToSlide(index - 1);

    }

    startAutoSlide();

});

// =====================
// Mouse Drag
// =====================

let isDown = false;
let dragStart;

carousel.addEventListener("mousedown", e => {

    isDown = true;

    dragStart = e.pageX;

    stopAutoSlide();

});

carousel.addEventListener("mouseup", e => {

    if (!isDown) return;

    isDown = false;

    const diff = e.pageX - dragStart;

    if (diff < -60) {

        goToSlide(index + 1);

    } else if (diff > 60) {

        goToSlide(index - 1);

    }

    startAutoSlide();

});

carousel.addEventListener("mouseleave", () => {

    isDown = false;

});

// Responsive
window.addEventListener("resize", () => {

    goToSlide(index);

});

// Initial
goToSlide(0);
   

    /* ===============================
       BACK TO TOP BUTTON
    =============================== */

    const topBtn =

        document.createElement("button");

    topBtn.innerHTML = "↑";

    topBtn.style.position = "fixed";

    topBtn.style.bottom = "95px";

    topBtn.style.right = "25px";

    topBtn.style.width = "50px";

    topBtn.style.height = "50px";

    topBtn.style.border = "none";

    topBtn.style.borderRadius = "50%";

    topBtn.style.background = "#0f7d3a";

    topBtn.style.color = "#fff";

    topBtn.style.fontSize = "22px";

    topBtn.style.cursor = "pointer";

    topBtn.style.display = "none";

    topBtn.style.zIndex = "999";

    topBtn.style.boxShadow =

        "0 5px 20px rgba(0,0,0,.2)";

    document.body.appendChild(topBtn);


    window.addEventListener("scroll",

        () => {

            if (

                window.scrollY > 400

            ) {

                topBtn.style.display =

                    "block";

            }

            else {

                topBtn.style.display =

                    "none";

            }

        }

    );


    topBtn.addEventListener(

        "click",

        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

    );


});

/* ==========================================
   END OF SCRIPT.JS
========================================== */
