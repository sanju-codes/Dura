/*==================================================
DURA ROOF PREMIUM V3
script.js
==================================================*/

"use strict";

/*==================================================
DOM
==================================================*/

const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const backToTop = document.getElementById("backToTop");
const preloader = document.querySelector(".preloader");
const counters = document.querySelectorAll(".counter");
const weatherBtns = document.querySelectorAll(".weather-btn");

/*==================================================
PRELOADER
==================================================*/

window.addEventListener("load", () => {

    if (preloader) {

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

        setTimeout(() => {

            preloader.remove();

        }, 600);

    }

});

/*==================================================
HEADER SCROLL
==================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/*==================================================
MOBILE MENU
==================================================*/

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuBtn.classList.toggle("active");

    });

}

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");

    });

});

/*==================================================
BACK TO TOP
==================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop?.addEventListener("click", () => {

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});

/*==================================================
LENIS SMOOTH SCROLL
==================================================*/

if(typeof Lenis !== "undefined"){

const lenis = new Lenis({

    duration:1.2,
    smoothWheel:true

});

function raf(time){

    lenis.raf(time);

    requestAnimationFrame(raf);

}

requestAnimationFrame(raf);

}

/*==================================================
GSAP REVEAL
==================================================*/

if(typeof gsap !== "undefined"){

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("section").forEach(section=>{

gsap.from(section,{

opacity:0,

y:80,

duration:1,

ease:"power3.out",

scrollTrigger:{

trigger:section,

start:"top 80%"

}

});

});

}

/*==================================================
COUNTER ANIMATION
==================================================*/

const counterObserver = new IntersectionObserver((entries) => {

entries.forEach(entry => {

if (!entry.isIntersecting) return;

const counter = entry.target;

const target = Number(counter.dataset.target);

let current = 0;

const increment = target / 120;

function updateCounter() {

current += increment;

if (current < target) {

counter.innerText = Math.floor(current);

requestAnimationFrame(updateCounter);

} else {

counter.innerText = target + "+";

}

}

updateCounter();

counterObserver.unobserve(counter);

});

},{

threshold:0.6

});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/*==================================================
SWIPER TESTIMONIAL
==================================================*/

if(typeof Swiper !== "undefined"){

new Swiper(".testimonial-slider",{

loop:true,

speed:900,

spaceBetween:30,

grabCursor:true,

autoplay:{

delay:3500,

disableOnInteraction:false

},

pagination:{

el:".swiper-pagination",

clickable:true

},

navigation:{

nextEl:".swiper-button-next",

prevEl:".swiper-button-prev"

},

breakpoints:{

0:{

slidesPerView:1

},

768:{

slidesPerView:2

},

1200:{

slidesPerView:3

}

}

});

}

/*==================================================
PRODUCT CARD TILT
==================================================*/

if(typeof VanillaTilt !== "undefined"){

VanillaTilt.init(

document.querySelectorAll(".product-card"),

{

max:10,

speed:500,

glare:true,

"max-glare":0.25,

scale:1.03

}

);

}

/*==================================================
ACTIVE NAV LINK
==================================================*/

const sections=document.querySelectorAll("section");

const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-150;

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
CUSTOM CURSOR
==================================================*/

const cursor=document.querySelector(".cursor");

const cursorBlur=document.querySelector(".cursor-blur");

if(cursor && cursorBlur){

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

cursorBlur.style.left=(e.clientX-15)+"px";

cursorBlur.style.top=(e.clientY-15)+"px";

});

}

/*==================================================
BUTTON HOVER EFFECT
==================================================*/

document.querySelectorAll(".btn-primary,.glass-btn").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-6px) scale(1.02)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="";

});

});

/*==================================================
WEATHER TOGGLE
==================================================*/

const rainLayer = document.querySelector(".rain-layer");
const heroLight = document.querySelector(".hero-light");

weatherBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

weatherBtns.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

const mode=btn.dataset.weather;

if(mode==="rain"){

rainLayer?.classList.add("active");

if(heroLight){

heroLight.style.opacity=".25";

}

}else{

rainLayer?.classList.remove("active");

if(heroLight){

heroLight.style.opacity="1";

}

}

});

});

/*==================================================
FLOATING PARTICLES
==================================================*/

const particleContainer=document.getElementById("particles");

if(particleContainer){

for(let i=0;i<35;i++){

const particle=document.createElement("span");

particle.style.left=Math.random()*100+"%";

particle.style.bottom="-30px";

particle.style.animationDuration=

(6+Math.random()*8)+"s";

particle.style.animationDelay=

(Math.random()*5)+"s";

particle.style.opacity=Math.random();

particleContainer.appendChild(particle);

}

}

/*==================================================
CONTACT FORM
==================================================*/

const enquiryForm=document.getElementById("enquiryForm");

if(enquiryForm){

enquiryForm.addEventListener("submit",function(e){

e.preventDefault();

const data=new FormData(this);

const name=data.get("name");

const phone=data.get("phone");

const email=data.get("email");

const product=data.get("product");

const message=data.get("message");

const text=

`*NEW ENQUIRY*%0A%0A`+

`Name : ${name}%0A`+

`Phone : ${phone}%0A`+

`Email : ${email}%0A`+

`Product : ${product}%0A%0A`+

`${message}`;

window.open(

`https://wa.me/919947502447?text=${text}`,

"_blank"

);

this.reset();

});

}

/*==================================================
GALLERY LIGHTBOX
==================================================*/

document.querySelectorAll(".gallery-item img").forEach(img=>{

img.addEventListener("click",()=>{

const overlay=document.createElement("div");

overlay.style.position="fixed";

overlay.style.inset="0";

overlay.style.background="rgba(0,0,0,.92)";

overlay.style.display="flex";

overlay.style.alignItems="center";

overlay.style.justifyContent="center";

overlay.style.zIndex="999999";

overlay.style.cursor="zoom-out";

const image=document.createElement("img");

image.src=img.src;

image.style.maxWidth="90%";

image.style.maxHeight="90%";

image.style.borderRadius="18px";

overlay.appendChild(image);

document.body.appendChild(overlay);

overlay.onclick=()=>overlay.remove();

});

});

/*==================================================
PAGE TRANSITION
==================================================*/

document.querySelectorAll("a").forEach(link=>{

if(

link.hostname===window.location.hostname &&

!link.hasAttribute("target") &&

link.getAttribute("href") &&

!link.getAttribute("href").startsWith("#")

){

link.addEventListener("click",function(e){

e.preventDefault();

document.body.style.opacity="0";

document.body.style.transition=".35s";

setTimeout(()=>{

window.location=this.href;

},350);

});

}

});

window.addEventListener("pageshow",()=>{

document.body.style.opacity="1";

});

/*==================================================
LAZY IMAGE EFFECT
==================================================*/

const lazyImages=document.querySelectorAll("img");

const imageObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

imageObserver.unobserve(entry.target);

}

});

});

lazyImages.forEach(img=>{

imageObserver.observe(img);

});

/*==================================================
CONSOLE
==================================================*/

console.log(

"%cDURA ROOF PREMIUM V3",

"color:#18C964;font-size:22px;font-weight:bold;"

);

console.log(

"%cWebsite Developed Successfully",

"color:white;font-size:14px;"

);

