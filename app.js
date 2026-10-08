'use strict';
const $=selector=>document.querySelector(selector);
const all=selector=>[...document.querySelectorAll(selector)];
const steps=[
 {id:'context',index:'STEP 01 / FIND THE STARTING POINT',title:'Put the question<br>on the table.',copy:'Give your challenge some context. What are you trying to solve? Who might it matter to? Start with what you know.',outcome:'A clearer design challenge.',preview:`<h4 class="preview-title">What are we exploring today?</h4><div class="preview-label">What are you trying to solve?</div><div class="preview-field goal">Help new users find their first “aha” moment in the first five minutes.</div><div class="preview-label">Who are you designing for? <span class="optional">optional</span></div><div class="preview-field">Product designers trying a new collaborative tool.</div>`},
 {id:'decompose',index:'STEP 02 / MAKE ROOM FOR ANSWERS',title:'Make a big challenge<br>a little more possible.',copy:'Break the brief into questions you can actually explore. “How might we…” leaves the door open to more than one answer.',outcome:'Questions worth exploring.',preview:`<h4 class="preview-title">Big challenge. Better questions.</h4><div class="preview-hmw"><span>01</span>How might we make the first step feel effortless?</div><div class="preview-hmw"><span>02</span>How might we create a little moment of delight?</div><div class="preview-hmw"><span>03</span>How might we give people a reason to return?</div>`},
 {id:'ideate',index:'STEP 03 / FOLLOW A DIFFERENT THREAD',title:'Let one thought<br>lead to another.',copy:'Give every idea a place to land. Explore six different perspectives, connect the threads, and leave a little space for the unexpected.',outcome:'A richer field of possibilities.',preview:`<div class="preview-notes"><div class="preview-note"><span>USER</span>One real task instead of a long product tour.</div><div class="preview-note"><span>TECH</span>A ready-to-edit project, tailored to their role.</div><div class="preview-note"><span>BUSINESS</span>Let people feel the value before signing up.</div><div class="preview-note"><span>EMOTION</span>A small celebration for that very first win.</div><div class="preview-note"><span>WILDCARD</span>What if onboarding felt like a conversation?</div><div class="preview-note"><span>CONSTRAINT</span>One core action. A first win in 60 seconds.</div></div>`},
 {id:'map',index:'STEP 04 / FIND A DIRECTION',title:'See what’s worth<br>trying next.',copy:'Compare your ideas on two dimensions. Place them on the map, capture your reasons, and choose a direction you can explain.',outcome:'A next step, with a reason behind it.',preview:`<div class="preview-map"><div class="preview-quadrant">Quick wins</div><div class="preview-quadrant">Big bets</div><div class="preview-quadrant">Nice to have</div><div class="preview-quadrant">Reconsider</div><div class="map-example">One real task. One first win.</div><div class="map-example two">Celebrate small progress.</div><div class="map-example three">A project tailored to you.</div></div><div class="map-axis">LESS EFFORT ······················· MORE EFFORT</div>`}
];
function setStep(index,moveFocus=false){
 const step=steps[index];if(!step)return;
 all('[data-step]').forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;if(i===index&&moveFocus)tab.focus();});
 $('#method-panel').setAttribute('aria-labelledby','tab-'+step.id);
 $('#method-name').innerHTML=step.title;$('#method-copy').textContent=step.copy;$('#method-outcome p').textContent=step.outcome;
 const preview=$('#product-preview');preview.classList.remove('changing');preview.innerHTML=step.preview;void preview.offsetWidth;preview.classList.add('changing');
 all('.window-pagination i').forEach((dot,i)=>dot.classList.toggle('current',i===index));
}
all('[data-step]').forEach((tab,index)=>{
 tab.addEventListener('click',()=>setStep(index));
 tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%steps.length;else if(e.key==='ArrowLeft')next=(index+steps.length-1)%steps.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=steps.length-1;else return;e.preventDefault();setStep(next,true);});
});
setStep(0);
const perspectives=[
 {id:'user',name:'User',question:'What would make a first-time user feel confident enough to begin?',caption:'Start with the person on the other side.',color:'#daeaff'},
 {id:'emotion',name:'Emotion',question:'How could that first interaction feel a little less intimidating?',caption:'Make space for how it feels.',color:'#fbe0e9'},
 {id:'business',name:'Business',question:'What first moment of value would give someone a reason to return?',caption:'Connect a human win to a product goal.',color:'#ffe6c5'},
 {id:'tech',name:'Tech',question:'What could we quietly simplify before the user even needs to ask?',caption:'Let the technology remove a little friction.',color:'#e9dfff'},
 {id:'constraint',name:'Constraint',question:'If we could improve only one minute, where would we spend it?',caption:'A useful limit can open a new possibility.',color:'#e8ebf0'},
 {id:'wildcard',name:'Wildcard',question:'What if onboarding felt more like a good conversation than a checklist?',caption:'Borrow a thought from somewhere unexpected.',color:'#e1f2d3'}
];
let activePerspective=0;
function setPerspective(index){
 const face=perspectives[index];if(!face)return;activePerspective=index;
 all('[data-face]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.face===face.id)));
 $('#face-name').textContent=face.name+' perspective';$('#face-question').textContent=face.question;$('#face-caption').textContent=face.caption;$('#perspective-card').style.background=face.color;
}
setPerspective(0);
all('[data-face]').forEach(button=>button.addEventListener('click',()=>setPerspective(perspectives.findIndex(face=>face.id===button.dataset.face))));
$('#next-perspective').addEventListener('click',()=>setPerspective((activePerspective+1)%perspectives.length));
const menu=$('.menu-toggle'),nav=$('#main-nav');
function setMenu(open,restoreFocus=false){menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');nav.classList.toggle('is-open',open);if(restoreFocus)menu.focus();}
menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true')setMenu(false,true);});
document.addEventListener('click',e=>{if(menu.getAttribute('aria-expanded')==='true'&&!e.target.closest('.site-header'))setMenu(false);});
window.matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)setMenu(false);});
// Align section content beneath the sticky header, including direct URL hashes.
function scrollToSection(hash,behavior='smooth'){
 const section=hash&&hash!=='#'?document.getElementById(hash.slice(1)):null;
 if(hash&&hash!=='#'&&!section)return;
 const target=section?.matches('section')?(section.querySelector('.section-kicker')||section.querySelector('h2')||section):section;
 const headerHeight=$('.site-header').getBoundingClientRect().height;
 const top=target?Math.max(0,window.scrollY+target.getBoundingClientRect().top-headerHeight-28):0;
 window.scrollTo({top,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':behavior});
}
let anchorUsed=false;
all('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
 if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 const hash=link.getAttribute('href');
 if(hash!=='#'&&!document.getElementById(hash.slice(1)))return;
 event.preventDefault();anchorUsed=true;setMenu(false);
 const address=hash==='#'?location.pathname+location.search:hash;
 if(location.hash!==(hash==='#'?'':hash))history.pushState(null,'',address);
 scrollToSection(hash);
}));
window.addEventListener('popstate',()=>scrollToSection(location.hash,'instant'));
window.addEventListener('hashchange',()=>scrollToSection(location.hash));
const initialHash=location.hash;
const pageReady=document.readyState==='complete'?Promise.resolve():new Promise(resolve=>window.addEventListener('load',resolve,{once:true}));
Promise.all([pageReady,document.fonts?.ready]).then(()=>{
 if(initialHash&&location.hash===initialHash&&!anchorUsed)scrollToSection(initialHash,'instant');
});
$('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.12});
 all('.about-grid,.principles,.section-heading,.companion-grid,.start-section').forEach(section=>observer.observe(section));
}
