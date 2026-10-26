(function(){
 const menuBtn=document.getElementById('menu-btn');const mobile=document.getElementById('mobile-nav');
 menuBtn?.addEventListener('click',()=>{const on=mobile.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(on));menuBtn.textContent=on?'✕':'☰';});
 const regionToggle=document.getElementById('region-toggle');regionToggle?.addEventListener('click',()=>{let wrap=regionToggle.parentElement;let open=wrap.classList.toggle('open');regionToggle.setAttribute('aria-expanded',String(open));});
 document.addEventListener('click',e=>{if(regionToggle&&!regionToggle.parentElement.contains(e.target)){regionToggle.parentElement.classList.remove('open');regionToggle.setAttribute('aria-expanded','false');}});
 const search=document.getElementById('food-search');if(search){let cards=[...document.querySelectorAll('.country-card')];search.addEventListener('input',()=>{const term=search.value.trim().toLowerCase();let visible=0;cards.forEach(c=>{let show=c.dataset.search.includes(term);c.hidden=!show;if(show)visible++});document.getElementById('empty-state').hidden=visible>0;});}
 const recipes={
 asia:[['rice noodles','fish','lemongrass','onion','banana stem (optional)'],['rice noodles','tamarind sauce','egg','tofu or shrimp','bean sprouts'],['duck','five-spice powder','thin pancakes','spring onions','hoisin-style sauce'],['chicken','jasmine rice','ginger','garlic','chili sauce'],['basmati rice','mixed spices','onion','yogurt','chicken or vegetables']],
 };
 // Region content is embedded into the HTML page as a JSON island by the site builder.
 const payload=document.getElementById('region-data');let regionData=null;try{if(payload)regionData=JSON.parse(payload.textContent)}catch(e){console.warn('Recipe data unavailable',e)}
 const back=document.createElement('div');back.className='modal-backdrop';back.hidden=true;back.setAttribute('role','presentation');document.body.appendChild(back);
 function close(){back.hidden=true;back.replaceChildren();document.body.classList.remove('no-scroll');}
 function recipe(idx){if(!regionData)return;const d=regionData.countries[idx];if(!d)return;const [country,food,emoji,desc,history,why,ingredients,steps]=d;
 const box=document.createElement('div');box.className='modal';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-label',food+' recipe');
 const head=document.createElement('div');head.className='modal-header';const info=document.createElement('div');const tag=document.createElement('span');tag.className='eyebrow';tag.textContent=emoji+' '+country.toUpperCase();const title=document.createElement('h2');title.textContent=food;info.append(tag,title);const exit=document.createElement('button');exit.type='button';exit.className='modal-close';exit.textContent='×';exit.setAttribute('aria-label','Close recipe');exit.onclick=close;head.append(info,exit);
 const body=document.createElement('div');body.className='modal-body';const paragraph=document.createElement('p');paragraph.textContent=desc;body.appendChild(paragraph);
 const add=(heading,texts,ordered)=>{let h=document.createElement('h3');h.textContent=heading;body.appendChild(h);if(Array.isArray(texts)){let list=document.createElement(ordered?'ol':'ul');texts.forEach(t=>{let li=document.createElement('li');li.textContent=t;list.appendChild(li)});body.appendChild(list)}else{let t=document.createElement('p');t.textContent=texts;body.appendChild(t)}};
 add('Food history',history);add('Why it is famous',why);add('Ingredients (simplified)',ingredients);add('How to make it',steps,true);
 const linkbox=document.createElement('div');linkbox.className='modal-video';[['▶ Find YouTube recipes','https://www.youtube.com/results?search_query='+encodeURIComponent(food+' '+country+' traditional recipe')],['↗ Explore food history','https://www.google.com/search?q='+encodeURIComponent(food+' '+country+' culinary history')]].forEach(([label,url])=>{const a=document.createElement('a');a.className='btn outline';a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;linkbox.appendChild(a)});body.appendChild(linkbox);box.append(head,body);back.append(box);back.hidden=false;document.body.classList.add('no-scroll');exit.focus();}
 document.querySelectorAll('.recipe-btn').forEach(btn=>btn.addEventListener('click',()=>recipe(Number(btn.dataset.index))));
 back.addEventListener('click',e=>{if(e.target===back)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!back.hidden)close()});
})();
