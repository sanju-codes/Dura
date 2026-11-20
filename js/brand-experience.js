(() => {
 const nav=document.getElementById('dxNav');
 const menu=document.getElementById('dxMenu');
 if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));menu.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.innerHTML='<i class="fa-solid fa-bars"></i>';}));}
 const targets=document.querySelectorAll('.dx-story,.dx-products,.dx-difference,.dx-projects,.dx-cta,.dx-benefits article,.dx-product-card,.dx-project-gallery figure');
 if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.12});targets.forEach(el=>{el.classList.add('dx-reveal');io.observe(el);});}else targets.forEach(el=>el.classList.add('is-visible'));

 const enquiry=document.getElementById('dxEnquiryForm');
 if(enquiry){enquiry.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(enquiry);const message=['DURA ROOF WEBSITE ENQUIRY','Name: '+data.get('name'),'Phone: '+data.get('phone'),'Product: '+data.get('product'),'District: '+(data.get('district')||'Not provided'),'Project details: '+(data.get('details')||'Not provided')].join('\\n');const url='https://wa.me/919400670260?text='+encodeURIComponent(message);window.open(url,'_blank','noopener,noreferrer');});}

 // Show one promotional poster 10 seconds after page load.
 const ad=document.getElementById('dxAdPopup');
 const adClose=document.getElementById('dxAdClose');
 const adExplore=document.getElementById('dxAdExplore');
 if(ad){const openAd=()=>{ad.classList.add('is-open');ad.setAttribute('aria-hidden','false');document.body.classList.add('dx-ad-visible');};const closeAd=()=>{ad.classList.remove('is-open');ad.setAttribute('aria-hidden','true');document.body.classList.remove('dx-ad-visible');};const adTimer=window.setTimeout(openAd,10000);if(adClose)adClose.addEventListener('click',closeAd);ad.addEventListener('click',event=>{if(event.target===ad)closeAd();});if(adExplore)adExplore.addEventListener('click',closeAd);document.addEventListener('keydown',event=>{if(event.key==='Escape'&&ad.classList.contains('is-open'))closeAd();});}
})();