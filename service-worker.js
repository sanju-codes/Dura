/*==================================================
DURA ROOF PREMIUM V3
SERVICE WORKER
==================================================*/

const CACHE_NAME = "dura-roof-v1.0.0";

const STATIC_CACHE = [

"/",
"/index.html",

"/css/style.css",

"/js/script.js",
"/js/hero3d.js",

"/manifest.json",

"/images/logo-white.png",
"/images/about-premium.webp",

"/videos/hero.mp4"

];

/*==================================================
INSTALL
==================================================*/

self.addEventListener("install",(event)=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>{

return cache.addAll(STATIC_CACHE);

})

);

self.skipWaiting();

});

/*==================================================
ACTIVATE
==================================================*/

self.addEventListener("activate",(event)=>{

event.waitUntil(

caches.keys()

.then(keys=>{

return Promise.all(

keys.map(key=>{

if(key!==CACHE_NAME){

return caches.delete(key);

}

})

);

})

);

self.clients.claim();

});

/*==================================================
FETCH
(Cache First → Network Fallback)
==================================================*/

self.addEventListener("fetch",(event)=>{

if(event.request.method!=="GET") return;

event.respondWith(

caches.match(event.request)

.then(cacheResponse=>{

if(cacheResponse){

return cacheResponse;

}

return fetch(event.request)

.then(networkResponse=>{

const cloned=networkResponse.clone();

caches.open(CACHE_NAME)

.then(cache=>{

cache.put(event.request,cloned);

});

return networkResponse;

})

.catch(()=>{

return caches.match("/index.html");

});

})

);

});

/*==================================================
BACKGROUND UPDATE
==================================================*/

self.addEventListener("message",(event)=>{

if(event.data==="skipWaiting"){

self.skipWaiting();

}

});

/*==================================================
SYNC
==================================================*/

self.addEventListener("sync",(event)=>{

if(event.tag==="sync-enquiry"){

event.waitUntil(

Promise.resolve()

);

}

});

/*==================================================
PUSH
==================================================*/

self.addEventListener("push",(event)=>{

const data=event.data

?event.data.text()

:"New Update Available";

event.waitUntil(

self.registration.showNotification(

"Dura Roof",

{

body:data,

icon:"icons/icon-192.png",

badge:"icons/icon-192.png"

}

)

);

});

/*==================================================
NOTIFICATION CLICK
==================================================*/

self.addEventListener(

"notificationclick",

(event)=>{

event.notification.close();

event.waitUntil(

clients.openWindow("/")

);

}

);

console.log("Service Worker Loaded");

