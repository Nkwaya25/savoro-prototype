"use strict";
/* ============ helpers ============ */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const reduced=matchMedia("(prefers-reduced-motion: reduce)");
const darkPref=matchMedia("(prefers-color-scheme: dark)");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm=s=>String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
const store={get(k,d){try{const v=localStorage.getItem("savoro3:"+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem("savoro3:"+k,JSON.stringify(v))}catch(e){}},clear(){try{Object.keys(localStorage).filter(k=>k.startsWith("savoro3:")).forEach(k=>localStorage.removeItem(k))}catch(e){}}};
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
function hexToRgb(h){h=h.trim().replace("#","");if(h.length===3)h=h.split("").map(c=>c+c).join("");const n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255]}
function mix(a,b,k){const A=hexToRgb(a),B=hexToRgb(b);return"rgb("+A.map((v,i)=>Math.round(v+(B[i]-v)*k)).join(",")+")"}
const initials=n=>n.split(" ").map(p=>p[0]).join("").slice(0,2).toUpperCase();
function hl(text,q){if(!q)return esc(text);const n=norm(text),i=n.indexOf(norm(q));if(i<0)return esc(text);return esc(text.slice(0,i))+"<mark>"+esc(text.slice(i,i+q.length))+"</mark>"+esc(text.slice(i+q.length))}

