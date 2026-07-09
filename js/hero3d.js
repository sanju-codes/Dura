/*==================================================
DURA ROOF PREMIUM V3
hero3d.js
==================================================*/

"use strict";

/*==================================================
CANVAS
==================================================*/

const canvas = document.getElementById("three-canvas");

if (canvas && typeof THREE !== "undefined") {

const scene = new THREE.Scene();

scene.background = null;

/*==================================================
CAMERA
==================================================*/

const camera = new THREE.PerspectiveCamera(

45,

canvas.clientWidth / canvas.clientHeight,

0.1,

1000

);

camera.position.set(0, 1.2, 5);

/*==================================================
RENDERER
==================================================*/

const renderer = new THREE.WebGLRenderer({

canvas: canvas,

alpha: true,

antialias: true

});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(

canvas.clientWidth,

canvas.clientHeight

);

renderer.outputColorSpace = THREE.SRGBColorSpace;

/*==================================================
LIGHTS
==================================================*/

const ambient = new THREE.AmbientLight(

0xffffff,

2.5

);

scene.add(ambient);

const sun = new THREE.DirectionalLight(

0xffffff,

4

);

sun.position.set(5, 8, 5);

scene.add(sun);

const rim = new THREE.DirectionalLight(

0x18C964,

2

);

rim.position.set(-5, 2, -5);

scene.add(rim);

/*==================================================
PLACEHOLDER OBJECT
(Remove after GLB model)
==================================================*/

const geometry = new THREE.BoxGeometry(

3,

0.12,

1.1

);

const material = new THREE.MeshPhysicalMaterial({

color:0xffffff,

roughness:.15,

metalness:.25,

clearcoat:1,

clearcoatRoughness:.05

});

const sheet = new THREE.Mesh(

geometry,

material

);

scene.add(sheet);

/*==================================================
FLOATING ANIMATION
==================================================*/

function animate(){

requestAnimationFrame(animate);

sheet.rotation.y += 0.003;

sheet.position.y =

Math.sin(Date.now()*0.0015)*0.12;

renderer.render(scene,camera);

}

animate();

/*==================================================
RESIZE
==================================================*/

window.addEventListener("resize",()=>{

camera.aspect =

canvas.clientWidth /

canvas.clientHeight;

camera.updateProjectionMatrix();

renderer.setSize(

canvas.clientWidth,

canvas.clientHeight

);

});

}

/*==================================================
GLB MODEL LOADER
==================================================*/

if(typeof THREE.GLTFLoader !== "undefined"){

const loader = new THREE.GLTFLoader();

let roofModel = null;

loader.load(

"models/upvc-sheet.glb",

(gltf)=>{

roofModel = gltf.scene;

roofModel.scale.set(2.2,2.2,2.2);

roofModel.position.set(0,0,0);

roofModel.rotation.set(0,0.3,0);

scene.remove(sheet);

scene.add(roofModel);

},

undefined,

(error)=>{

console.warn("GLB Model not found.",error);

}

);

/*==================================================
MOUSE ROTATION
==================================================*/

window.addEventListener("mousemove",(e)=>{

if(!roofModel) return;

const x=(e.clientX/window.innerWidth-.5)*0.6;

const y=(e.clientY/window.innerHeight-.5)*0.3;

roofModel.rotation.y=x;

roofModel.rotation.x=-y;

});

/*==================================================
GSAP HERO ANIMATION
==================================================*/

if(typeof gsap!=="undefined"){

gsap.from(roofModel?.position||{},{

y:-1,

duration:1.8,

ease:"power3.out"

});

}

/*==================================================
FLOATING MOTION
==================================================*/

const clock=new THREE.Clock();

function animateModel(){

requestAnimationFrame(animateModel);

const t=clock.getElapsedTime();

if(roofModel){

roofModel.position.y=Math.sin(t*1.5)*0.12;

roofModel.rotation.z=Math.sin(t)*0.03;

}

}

animateModel();

}

/*==================================================
RAIN MODE
==================================================*/

const rainButton=document.querySelector('[data-weather="rain"]');

const sunButton=document.querySelector('[data-weather="sun"]');

rainButton?.addEventListener("click",()=>{

renderer.toneMappingExposure=0.75;

ambient.intensity=1.6;

sun.intensity=1.2;

});

sunButton?.addEventListener("click",()=>{

renderer.toneMappingExposure=1.2;

ambient.intensity=2.5;

sun.intensity=4;

});

/*==================================================
AUTO ROTATE
==================================================*/

setInterval(()=>{

if(!roofModel) return;

gsap.to(roofModel.rotation,{

y:roofModel.rotation.y+Math.PI*2,

duration:25,

ease:"none"

});

},25000);

/*==================================================
SHADOW
==================================================*/

renderer.shadowMap.enabled=true;

renderer.shadowMap.type=THREE.PCFSoftShadowMap;

sun.castShadow=true;

/*==================================================
END
==================================================*/

console.log(

"%cThree.js Hero Ready",

"color:#18C964;font-size:18px;font-weight:bold"

);

