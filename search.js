"use strict";
/* ============ search ============ */
const SR={open:false,q:"",tab:"all",prev:null};const srEl=$("#search");
function openSearch(q,tab){Object.assign(SR,{open:true,q:q||"",tab:tab||"all",prev:document.activeElement});srEl.hidden=false;document.body.classList.add("locked");renderSearch();requestAnimationFrame(()=>srEl.classList.add("on"));setTimeout(()=>{const i=$("#sq");if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length)}},60)}
function closeSearch(silent){if(!SR.open)return;SR.open=false;srEl.classList.remove("on");if(!RF.open&&!OB.open)document.body.classList.remove("locked");setTimeout(()=>{if(!SR.open){srEl.hidden=true;srEl.innerHTML=""}},reduced.matches?0:300);if(!silent&&SR.prev&&SR.prev.focus)SR.prev.focus()}
function searchData(q){const n=norm(q),m=s=>norm(s).includes(n);
  const places=R.filter(r=>m(r.name)||m(L(CUIS[r.cuisine]))||m(BARRIS[r.barri])||m(r.street)||r.tags.some(x=>m(x))).sort((a,b)=>(norm(b.name).startsWith(n)-norm(a.name).startsWith(n))||b.score-a.score);
  const dishes=[];R.forEach(r=>{r.dishes.forEach(([d,c])=>{if(m(d))dishes.push({d,c,r})});if(r.board)[...r.board.p,...r.board.s].forEach(d=>{if(m(d)&&!dishes.some(x=>x.d===d&&x.r===r))dishes.push({d,c:0,r,menu:1})})});dishes.sort((a,b)=>b.c-a.c);
  const hoods=ALLB.filter(b=>m(BARRIS[b]));
  const lists=[...S.my.filter(l=>m(listName(l))).map(l=>({mine:1,l})),...LISTS.filter(l=>m(l.t[0])||m(l.t[1])||m(l.d[0])||m(l.d[1])||m(PID[l.by].n)).map(l=>({l}))];
  const people=PEOPLE.filter(p=>m(p.n)||m(p.h));return{places,dishes,hoods,lists,people}}
const rowPlace=(r,q)=>`<a class="mini" href="#r-${r.id}">${swatch(r)}<span><b>${hl(r.name,q)}</b><small>${L(CUIS[r.cuisine])} · ${SHORTB[r.barri]}${openNow(r)?" · "+t("open"):""}</small></span><span class="end">${scoreTag(r.score,{w:30,h:13})}</span></a>`;
const rowDish=(x,q)=>`<a class="mini" href="#r-${x.r.id}"><span class="sic">${I("dish")}</span><span><b>${hl(x.d,q)}</b><small>${t("at")} ${esc(x.r.name)}${x.menu?" · menú "+eur(x.r.menu):` · ${x.c} ${t("mentions")}`}</small></span></a>`;
const rowHood=(b,q)=>`<a class="mini" href="#explore" data-act="fdistgo" data-v="${b==="gracia"?"gracia":"eixample"}"><span class="sic">${I("pin")}</span><span><b>${hl(BARRIS[b],q)}</b><small>${t("places",R.filter(r=>r.barri===b).length)}</small></span></a>`;
const rowList=(x,q)=>x.mine?`<a class="mini" href="#my-${x.l.id}"><span class="sic">${I("lists")}</span><span><b>${hl(listName(x.l),q)}</b><small>${x.l.priv?t("private"):t("public")} · ${t("places",x.l.items.length)}</small></span></a>`:`<a class="mini" href="#list-${x.l.id}"><span class="sw" style="background:${x.l.lc}"></span><span><b>${hl(L(x.l.t),q)}</b><small>${t("by")} ${esc(PID[x.l.by].n)} · ${num(x.l.f)} ${t("followers")}</small></span></a>`;
const rowPerson=(p,q)=>`<a class="mini" href="#u-${p.id}">${pAv(p,44)}<span><b>${hl(p.n,q)}</b><small>${p.h} · ${t("match",pct(matchOf(p)))}</small></span></a>`;
function searchResults(){const q=SR.q.trim();
  if(!q){const sug=["menú","croquetes","phở","vermut","brunch","Gràcia","Núria","karaage"];
    return`<div class="grp"><h3>${t("s_try")}</h3><div class="chips">${sug.map(s=>`<button class="chip" type="button" data-act="sq" data-q="${esc(s)}">${esc(s)}</button>`).join("")}</div></div>
    <div class="grp"><h3>${t("trending")}</h3>${LISTS.slice().sort((a,b)=>b.f-a.f).slice(0,3).map(l=>rowList({l},"")).join("")}</div>
    <div class="grp"><h3>${t("peopleLike")}</h3>${PEOPLE.slice().sort((a,b)=>matchOf(b)-matchOf(a)).slice(0,3).map(p=>rowPerson(p,"")).join("")}</div>`}
  const d=searchData(q);const groups=[["places","s_places",d.places,rowPlace],["dishes","s_dishes",d.dishes,rowDish],["lists","s_lists",d.lists,rowList],["people","s_people",d.people,rowPerson],["hoods","s_hoods",d.hoods,rowHood]];
  const vis=groups.filter(g=>(SR.tab==="all"||SR.tab===g[0])&&g[2].length);if(!vis.length)return empty(t("s_none"));
  return vis.map(([k,lab,items,fn])=>`<div class="grp"><h3><span>${t(lab)} · ${items.length}</span>${SR.tab==="all"&&items.length>4?`<button type="button" data-act="stab" data-v="${k}">${t("seeAll")}</button>`:""}</h3>${items.slice(0,SR.tab==="all"?4:50).map(x=>fn(x,q)).join("")}</div>`).join("")}
function renderSearch(keep){const tabs=[["all","s_all"],["places","s_places"],["dishes","s_dishes"],["lists","s_lists"],["people","s_people"]];
  if(keep&&$("#sq")){$("#sres").innerHTML=searchResults();$$(".otabs [data-act=stab]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===SR.tab));return}
  srEl.innerHTML=`<div class="ohead"><button class="ib" type="button" data-act="closesearch" aria-label="${t("close")}">${I("back")}</button><label class="sbox">${I("search")}<span class="sr">${t("searchPh")}</span><input id="sq" type="search" autocomplete="off" enterkeyhint="search" placeholder="${t("searchPh")}" value="${esc(SR.q)}"></label></div>
  <div class="otabs" role="group">${tabs.map(([k,l])=>`<button class="chip" type="button" data-act="stab" data-v="${k}" aria-pressed="${SR.tab===k}">${t(l)}</button>`).join("")}</div>
  <div class="obody"><div class="oin" id="sres" aria-live="polite">${searchResults()}</div></div>`;
  $("#sq").addEventListener("input",e=>{SR.q=e.target.value;$("#sres").innerHTML=searchResults()})}

