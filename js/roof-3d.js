import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

(() => {
  const canvas=document.getElementById("duraRoofCanvas");
  const host=document.getElementById("duraRoofViewer");
  const loading=document.getElementById("roofLoading");
  if(!canvas||!host) return;
  try {
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(34,1,.1,100);
    camera.position.set(7.8,6.1,9.5);
    const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.18;
    scene.add(new THREE.HemisphereLight(0xe8f5ff,0x26352c,2.15));
    const key=new THREE.DirectionalLight(0xfff2d9,3.2);key.position.set(5,9,7);key.castShadow=true;key.shadow.mapSize.set(1024,1024);scene.add(key);
    const rim=new THREE.DirectionalLight(0x8ac9ff,2.1);rim.position.set(-7,4,-5);scene.add(rim);
    const model=new THREE.Group();scene.add(model);
    const ground=new THREE.Mesh(new THREE.CircleGeometry(6.3,80),new THREE.MeshStandardMaterial({color:0x14271f,roughness:.9}));ground.rotation.x=-Math.PI/2;ground.position.y=-.1;ground.receiveShadow=true;model.add(ground);
    const wallMat=new THREE.MeshStandardMaterial({color:0xe1dfd3,roughness:.88});
    const house=new THREE.Mesh(new THREE.BoxGeometry(4.15,2.05,4.8),wallMat);house.position.y=1.02;house.castShadow=true;house.receiveShadow=true;model.add(house);
    const dark=new THREE.MeshStandardMaterial({color:0x34443b,roughness:.8});
    const door=new THREE.Mesh(new THREE.BoxGeometry(.85,1.55,.07),dark);door.position.set(.75,.78,2.44);model.add(door);
    const winMat=new THREE.MeshStandardMaterial({color:0x7eaaa7,metalness:.25,roughness:.2});
    for(const x of [-1.15,1.15]){const win=new THREE.Mesh(new THREE.BoxGeometry(.8,.72,.08),winMat);win.position.set(x,1.28,2.45);model.add(win);}

    // Three-layer Cool Roof: blue coated steel, insulating core and silver foil underside.
    const steelMat=new THREE.MeshStandardMaterial({color:0x079bd5,metalness:.58,roughness:.28,side:THREE.DoubleSide});
    const insulationMat=new THREE.MeshStandardMaterial({color:0x555b5d,metalness:.08,roughness:.92,side:THREE.DoubleSide});
    const foilMat=new THREE.MeshStandardMaterial({color:0xc5cbd0,metalness:.78,roughness:.3,side:THREE.DoubleSide});
    const edgeMat=new THREE.MeshStandardMaterial({color:0x174e70,metalness:.48,roughness:.3});
    const angle=Math.atan2(1.35,2.35),slope=Math.sqrt(2.35*2.35+1.35*1.35),panelCount=5,panelWidth=4.95/panelCount;
    function makeLayer(side,index,drop,material,ribScale){
      const z0=-2.475+index*panelWidth,rows=48,cols=64,positions=[],uv=[],indices=[];
      for(let i=0;i<=rows;i++){
        const u=i/rows*slope;
        for(let j=0;j<=cols;j++){
          const z=z0+j/cols*panelWidth;
          const rib=Math.cos((z-z0)/panelWidth*Math.PI*8)*.052*ribScale;
          const x=side*(u*Math.cos(angle));
          const y=3.4-u*Math.sin(angle)-drop+rib;
          positions.push(x,y,z);uv.push(i/rows,j/cols);
        }
      }
      for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;indices.push(a,b,a+1,b,b+1,a+1);}
      const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));g.setAttribute("uv",new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();
      const mesh=new THREE.Mesh(g,material);mesh.castShadow=true;mesh.receiveShadow=true;model.add(mesh);
    }
    for(let side of [-1,1])for(let i=0;i<panelCount;i++){
      makeLayer(side,i,.205,foilMat,.72);
      makeLayer(side,i,.105,insulationMat,.86);
      makeLayer(side,i,0,steelMat,1);
      const fascia=new THREE.Mesh(new THREE.BoxGeometry(.15,.24,panelWidth+.015),edgeMat);
      fascia.position.set(side*2.35,2.05-.08,-2.475+(i+.5)*panelWidth);fascia.castShadow=true;model.add(fascia);
    }
    // Ridge cap and perimeter trims.
    const ridge=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,5.12,20),edgeMat);ridge.rotation.x=Math.PI/2;ridge.position.set(0,3.43,0);model.add(ridge);
    for(let side of [-1,1]){const trim=new THREE.Mesh(new THREE.BoxGeometry(.15,.24,5.08),edgeMat);trim.position.set(side*2.35,1.96,0);model.add(trim);}
    // Fasteners on the blue steel top sheet.
    const boltMat=new THREE.MeshStandardMaterial({color:0xe2e8ed,metalness:.85,roughness:.2});
    for(let side of [-1,1])for(let z=-2.2;z<=2.21;z+=.55){const bolt=new THREE.Mesh(new THREE.SphereGeometry(.035,8,6),boltMat);bolt.position.set(side*1.78,3.4-1.02+Math.cos((z+2.475)/panelWidth*Math.PI*8)*.052,z);model.add(bolt);}
    model.rotation.y=-.35;
    let targetRotY=-.35,targetRotX=0,dragging=false,lastX=0,lastY=0,autoRotate=true;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(reduced)autoRotate=false;
    const resize=()=>{const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
    new ResizeObserver(resize).observe(host);resize();
    canvas.addEventListener("pointerdown",e=>{dragging=true;autoRotate=false;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId);});
    canvas.addEventListener("pointermove",e=>{if(!dragging)return;targetRotY+=(e.clientX-lastX)*.009;targetRotX=Math.max(-.32,Math.min(.38,targetRotX+(e.clientY-lastY)*.006));lastX=e.clientX;lastY=e.clientY;});
    const stopDrag=()=>{dragging=false;};canvas.addEventListener("pointerup",stopDrag);canvas.addEventListener("pointercancel",stopDrag);
    canvas.addEventListener("wheel",e=>{e.preventDefault();camera.position.multiplyScalar(e.deltaY>0?1.06:.94);const d=camera.position.length();if(d<6.5)camera.position.setLength(6.5);if(d>17)camera.position.setLength(17);},{passive:false});
    const reset=document.getElementById("roofReset");if(reset)reset.addEventListener("click",()=>{targetRotY=-.35;targetRotX=0;camera.position.set(7.8,6.1,9.5);autoRotate=true;});
    if(loading)loading.classList.add("is-hidden");
    const clock=new THREE.Clock();
    const animate=()=>{requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);if(autoRotate&&!dragging)targetRotY+=dt*.12;model.rotation.y+=(targetRotY-model.rotation.y)*.08;model.rotation.x+=(targetRotX-model.rotation.x)*.08;renderer.render(scene,camera);};animate();
  } catch(error){console.error("DURA ROOF 3D viewer:",error);if(loading){loading.textContent="3D preview could not load. Please check your internet connection.";loading.classList.remove("is-hidden");}}
})();
