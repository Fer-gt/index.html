
// Cursor + ring
const cursor = document.querySelector('.cursor');
const ring = document.querySelector('.cursor-ring');
let rx=innerWidth/2, ry=innerHeight/2, cx=rx, cy=ry;
addEventListener('mousemove', e=>{cx=e.clientX;cy=e.clientY;cursor.style.left=cx+'px';cursor.style.top=cy+'px';});
(function loop(){rx+=(cx-rx)*0.15;ry+=(cy-ry)*0.15;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
const interactive = 'a,button,.gi,.tab-btn,input,textarea,select';
document.addEventListener('mouseover', e=>{if(e.target.closest(interactive)){ring.style.width='60px';ring.style.height='60px';ring.style.borderColor='var(--gold)';}});
document.addEventListener('mouseout', e=>{if(e.target.closest(interactive)){ring.style.width='36px';ring.style.height='36px';ring.style.borderColor='color-mix(in oklab, var(--gold) 50%, transparent)';}});

// Scroll progress + nav scrolled + scroll-spy
const bar = document.querySelector('.progress-bar');
const nav = document.querySelector('nav.site-nav');
const navLinks = [...document.querySelectorAll('.nav-links a')];
const sectionIds = ['sobre-mi','experiencia','portafolio','habilidades','contacto'];
function onScroll(){
  const h=document.documentElement;
  const max=h.scrollHeight-h.clientHeight;
  bar.style.width = (max>0 ? (h.scrollTop/max)*100 : 0)+'%';
  if(h.scrollTop>50) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  let cur='';
  for(const id of sectionIds){const el=document.getElementById(id); if(el && el.getBoundingClientRect().top<=120) cur=id;}
  navLinks.forEach(a=>{a.classList.toggle('active', a.getAttribute('href')==='#'+cur);});
}
addEventListener('scroll', onScroll, {passive:true}); onScroll();

// Reveal-on-scroll
const io = new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Skill bars
const bio = new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.pct+'%';bio.unobserve(e.target);}});},{threshold:.3});
document.querySelectorAll('.skill-bar-fill').forEach(b=>bio.observe(b));

// Tabs
document.querySelectorAll('.tab-btn').forEach(b=>{
  b.addEventListener('click', ()=>{
    const k=b.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(x=>x.classList.toggle('active', x===b));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active', p.dataset.panel===k));
  });
});

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbTitle = document.getElementById('lb-title');
function openLB(src,title){lbImg.src=src; lbTitle.textContent=title; lb.style.display='flex'; document.body.style.overflow='hidden';}
function closeLB(){lb.style.display='none'; document.body.style.overflow='';}
document.querySelectorAll('button.gi').forEach(btn=>btn.addEventListener('click', ()=>openLB(btn.dataset.src, btn.dataset.title)));
lb.addEventListener('click', e=>{if(e.target===lb || e.target.id==='lb-close') closeLB();});
addEventListener('keydown', e=>{if(e.key==='Escape') closeLB();});

// Form demo
document.getElementById('contact-form').addEventListener('submit', e=>{
  e.preventDefault();
  alert('Gracias. Tu mensaje ha sido enviado (demo).');
  e.target.reset();
});
