import{i as f,a as g,N as h}from"./assets/vendor-11a3a5a6.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const b="42278399-485b72b195d854376bf6ad4cf",L="https://pixabay.com/api/",l=document.getElementById("search-form"),y=document.querySelector(".gallery"),d=document.querySelector(".load-more");let i=1,c="";l.addEventListener("submit",v);d.addEventListener("click",w);async function v(s){if(s.preventDefault(),i=1,d.style.display="none",c=s.target.searchQuery.value.trim(),!c){f.error({title:"Error",message:"Please enter a search query",position:"topCenter"});return}try{const r=await g.get(L,{params:{key:b,q:c,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:40}}),{data:o}=r;if(o.hits.length===0){l.reset(),h.Notify.info("Sorry, there are no images matching your search query. Please try again.",{position:"center-top"});return}E(o.hits),o.totalHits>40?d.style.display="block":h.Notify.warning("We're sorry, but you've reached the end of search results.",{position:"center-top"})}catch{l.reset(),f.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topCenter"})}}async function w(){i++;try{const s=await g.get(L,{params:{key:b,q:c,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:40}}),{data:r}=s;E(r.hits),(i-1)*40+r.hits.length>=r.totalHits&&(d.style.display="none",h.Notify.warning("We're sorry, but you've reached the end of search results.",{position:"center-top"}))}catch{f.error({title:"Error",message:"Sorry, but you've reached the end of search results.",position:"topCenter"})}}function E(s){l.reset(),i===1&&(y.innerHTML="");const r=document.createDocumentFragment();s.forEach(o=>{const n=document.createElement("div");n.classList.add("photo-card");const e=document.createElement("img");e.src=o.webformatURL,e.alt=o.tags,e.loading="lazy";const t=document.createElement("div");t.classList.add("info");const a=document.createElement("p");a.classList.add("info-item"),a.innerHTML=`<b>Likes:</b> ${o.likes}`;const p=document.createElement("p");p.classList.add("info-item"),p.innerHTML=`<b>Views:</b> ${o.views}`;const u=document.createElement("p");u.classList.add("info-item"),u.innerHTML=`<b>Comments:</b> ${o.comments}`;const m=document.createElement("p");m.classList.add("info-item"),m.innerHTML=`<b>Downloads:</b> ${o.downloads}`,t.appendChild(a),t.appendChild(p),t.appendChild(u),t.appendChild(m),n.appendChild(e),n.appendChild(t),r.appendChild(n)}),y.appendChild(r)}
//# sourceMappingURL=commonHelpers.js.map