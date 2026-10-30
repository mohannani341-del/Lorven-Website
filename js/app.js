const root=document.documentElement;
const themeButton=document.querySelector('#theme-toggle');
function setTheme(theme){root.dataset.theme=theme;const dark=theme==='dark';themeButton.textContent=dark?'☀':'☾';themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');themeButton.title=dark?'Switch to light mode':'Switch to dark mode';localStorage.setItem('lorven-theme',theme)}
setTheme(localStorage.getItem('lorven-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
function syncFooterThemeLabel(){const button=document.querySelector('#footer-theme-toggle');if(button)button.textContent=root.dataset.theme==='dark'?'Switch to light mode ☀':'Switch to dark mode ☾'}
syncFooterThemeLabel();
themeButton?.addEventListener('click',()=>{setTheme(root.dataset.theme==='dark'?'light':'dark');syncFooterThemeLabel()});
document.querySelector('#footer-theme-toggle')?.addEventListener('click',()=>{setTheme(root.dataset.theme==='dark'?'light':'dark');syncFooterThemeLabel()});
document.querySelector('#newsletter-form')?.addEventListener('submit',event=>{event.preventDefault();const note=document.querySelector('#newsletter-note');if(note)note.textContent='Thanks for your interest! Newsletter sign-up will be enabled when the mailing-list service is connected.';event.currentTarget.reset()});
const footerYear=document.querySelector('#footer-year');if(footerYear)footerYear.textContent=new Date().getFullYear();
const nav=document.querySelector('#main-nav');
function closeMenus(){document.querySelectorAll('.nav-dropdown.open').forEach(el=>el.classList.remove('open'));document.querySelectorAll('.nav-trigger[aria-expanded="true"]').forEach(el=>el.setAttribute('aria-expanded','false'))}
document.querySelector('#menu-toggle')?.addEventListener('click',()=>{nav.classList.toggle('open');document.querySelector('#menu-toggle').setAttribute('aria-label',nav.classList.contains('open')?'Close navigation':'Open navigation')});
// Desktop: menus are revealed by hover/focus only. Mobile: tap toggles the relevant submenu.
document.querySelectorAll('.nav-dropdown .nav-trigger').forEach(button=>button.addEventListener('click',e=>{
  const parent=button.closest('.nav-dropdown');
  if(window.matchMedia('(max-width: 720px)').matches){
    e.preventDefault(); const wasOpen=parent.classList.contains('open'); closeMenus();
    if(!wasOpen){parent.classList.add('open');button.setAttribute('aria-expanded','true')}
  } else if(button.dataset.pageLink){ location.href=button.dataset.pageLink; }
}));
document.querySelectorAll('.nav-trigger.nav-simple').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.pageLink)location.href=button.dataset.pageLink}));
document.addEventListener('click',e=>{if(!e.target.closest('.nav-dropdown'))closeMenus()});
document.querySelectorAll('.main-nav a[data-filter]').forEach(a=>a.addEventListener('click',()=>{sessionStorage.setItem('lorven-category',a.dataset.filter)}));
// Homepage counters animate from zero on every homepage load.
if(document.body.classList.contains('page-home')){
  document.querySelectorAll('.count-up').forEach(el=>{
    const target=Number(el.dataset.count||0);
    const suffix=el.dataset.suffix||'';
    const start=0;
    el.textContent=start.toLocaleString('en-IN')+suffix;
    const duration=1800;
    let begin=null;
    function tick(now){
      if(begin===null) begin=now;
      const p=Math.min((now-begin)/duration,1);
      const eased=1-Math.pow(1-p,3);
      const value=Math.round(start+(target-start)*eased);
      el.textContent=value.toLocaleString('en-IN')+suffix;
      if(p<1) requestAnimationFrame(tick);
      else el.textContent=target.toLocaleString('en-IN')+suffix;
    }
    requestAnimationFrame(tick);
  });
}
let allProducts=[];const grid=document.querySelector('#product-grid');const searchInput=document.querySelector('#product-search');const categorySelect=document.querySelector('#category-filter');
function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function setCategory(category){if(!categorySelect)return;const option=[...categorySelect.options].find(o=>o.value===category||o.textContent===category);categorySelect.value=option?option.value:'all';renderProducts()}
function renderProducts(){if(!grid||!searchInput||!categorySelect)return;const term=searchInput.value.toLowerCase().trim(),category=categorySelect.value;const filtered=allProducts.filter(p=>(category==='all'||p.category===category)&&(p.name+' '+p.detail+' '+p.category).toLowerCase().includes(term));grid.innerHTML=filtered.length?filtered.map(p=>`<article class="product-card"><button class="product-open" type="button" data-product-name="${escapeHtml(p.name)}" aria-label="View ${escapeHtml(p.name)} details"><div class="product-image"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/product-fallback.svg'"></div><div class="product-info"><span class="product-category">${escapeHtml(p.category)}</span><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.detail)}</p><span class="card-link">View product details ↗</span></div></button><div class="product-actions"><a href="${escapeHtml(p.source)}" target="_blank" rel="noreferrer">Official details ↗</a><a href="contact.html?product=${encodeURIComponent(p.name)}">Enquire ↗</a></div></article>`).join(''):'<p>No products match your search. Try another term or category.</p>';observeReveal()}
function observeReveal(){if(!('IntersectionObserver'in window)){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));return}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.category-card,.product-card,.capability-grid article').forEach(el=>{if(!el.classList.contains('reveal'))el.classList.add('reveal');observer.observe(el)})}
function fillEnquiryProduct(name){const select=document.querySelector('#enquiry-product');if(!select||!name)return;if(![...select.options].some(o=>o.value===name)){const o=document.createElement('option');o.value=name;o.textContent=name;select.add(o)}select.value=name}
if(grid)grid.addEventListener('click',e=>{const btn=e.target.closest('[data-product-name]');if(btn)location.href='product.html?product='+encodeURIComponent(btn.dataset.productName)});
searchInput?.addEventListener('input',renderProducts);categorySelect?.addEventListener('change',renderProducts);
document.querySelectorAll('.category-card[data-filter]').forEach(card=>card.addEventListener('click',()=>sessionStorage.setItem('lorven-category',card.dataset.filter)));
const track=document.querySelector('#testimonial-track');
const testimonialModal=document.querySelector('#testimonial-video-modal');
const testimonialPlayer=document.querySelector('#testimonial-modal-player');
if(track){
  const originalCards=Array.from(track.querySelectorAll('.video-testimonial-card'));
  // Duplicate the row once so the animation can wrap seamlessly without a visible jump.
  originalCards.forEach(card=>{const clone=card.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.querySelectorAll('button').forEach(button=>button.setAttribute('tabindex','-1'));track.appendChild(clone)});
  let lastFrame=0;let animationId=null;let pausedForModal=false;
  const speed=1428; // 21x the previous 68 px/s setting, as requested
  function animateTestimonials(timestamp){
    if(!lastFrame)lastFrame=timestamp;
    const delta=Math.min((timestamp-lastFrame)/1000,0.05);lastFrame=timestamp;
    if(!pausedForModal){
      const loopWidth=track.scrollWidth/2;
      track.scrollLeft+=speed*delta;
      if(loopWidth>0&&track.scrollLeft>=loopWidth)track.scrollLeft-=loopWidth;
    }
    animationId=requestAnimationFrame(animateTestimonials);
  }
  // Respect reduced-motion accessibility settings; otherwise start continuous auto-scroll immediately.
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)animationId=requestAnimationFrame(animateTestimonials);
  track.addEventListener('click',event=>{
    const button=event.target.closest('[data-testimonial-video]');
    if(!button||button.closest('[aria-hidden="true"]'))return;
    if(!testimonialModal||!testimonialPlayer)return;
    pausedForModal=true;
    const source=button.dataset.testimonialVideo;
    testimonialPlayer.pause();testimonialPlayer.src=source;testimonialPlayer.load();
    if(typeof testimonialModal.showModal==='function')testimonialModal.showModal();else testimonialModal.setAttribute('open','');
    const playAttempt=testimonialPlayer.play();if(playAttempt?.catch)playAttempt.catch(()=>{});
  });
  function closeTestimonialModal(){
    if(!testimonialModal)return;
    testimonialPlayer?.pause();
    if(typeof testimonialModal.close==='function')testimonialModal.close();else testimonialModal.removeAttribute('open');
    pausedForModal=false;lastFrame=0;
  }
  document.querySelector('#testimonial-modal-close')?.addEventListener('click',closeTestimonialModal);
  testimonialModal?.addEventListener('click',event=>{if(event.target===testimonialModal)closeTestimonialModal()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&testimonialModal?.open)closeTestimonialModal()});
}
fetch('assets/products.json').then(r=>{if(!r.ok)throw new Error('Catalog unavailable');return r.json()}).then(data=>{allProducts=data;if(grid){const remembered=sessionStorage.getItem('lorven-category');const urlCategory=new URLSearchParams(location.search).get('category');if(remembered||urlCategory)setCategory(urlCategory||remembered);else renderProducts()}const select=document.querySelector('#enquiry-product');data.forEach(p=>{if(select&&![...select.options].some(o=>o.value===p.name)){const option=document.createElement('option');option.value=p.name;option.textContent=p.name+' — '+p.category;select.add(option)}});const params=new URLSearchParams(location.search);const requested=params.get('product');if(document.body.classList.contains('page-contact'))fillEnquiryProduct(requested);if(document.body.classList.contains('page-detail')){const p=data.find(x=>x.name===requested)||data[0];const content=document.querySelector('#product-detail-content');if(content&&p){content.innerHTML=`<div class="detail-layout"><div class="detail-image"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" onerror="this.onerror=null;this.src='assets/product-fallback.svg'"></div><div class="detail-copy"><span class="kicker">${escapeHtml(p.category)}</span><h1>${escapeHtml(p.name)}</h1><p>${escapeHtml(p.detail)}</p><p class="detail-note">Contact our team to confirm the latest specifications, availability, certifications and compatible reagents for this product.</p><div class="detail-actions"><a class="btn btn-primary" href="contact.html?product=${encodeURIComponent(p.name)}">Enquire about this product ↗</a><a class="text-link" href="${escapeHtml(p.source)}" target="_blank" rel="noreferrer">Official product information ↗</a></div></div></div>`}}sessionStorage.removeItem('lorven-category')}).catch(()=>{if(grid)grid.innerHTML='<p>Could not load the local product catalog. Open this project through a local web server or deployed hosting.</p>'});
// Enquiry form opens a prefilled email. Use a backend/form service for reliable server-side delivery.
const form=document.querySelector('#enquiry-form');form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const subject=encodeURIComponent('Website enquiry: '+d.get('product'));const body=encodeURIComponent('New website enquiry\n\nName: '+d.get('name')+'\nCompany/Lab: '+(d.get('company')||'Not provided')+'\nEmail: '+d.get('email')+'\nPhone: '+d.get('phone')+'\nProduct: '+d.get('product')+'\nEnquiry type: '+d.get('enquiryType')+'\n\nMessage: '+d.get('message'));document.querySelector('#form-note').textContent='Your email application should open with the enquiry details. This prototype does not store submissions.';location.href='mailto:subbu@drntrbiosciences.com?subject='+subject+'&body='+body});
// The detail page uses a separate static URL and a product query parameter.
document.querySelector('#back-to-products')?.addEventListener('click',()=>location.href='products.html');
