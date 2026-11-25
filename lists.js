"use strict";
/* ============ LISTS ============ */
function pageLists(){const fl=LISTS.filter(l=>S.lists.has(l.id)),team=LISTS.filter(l=>l.by==="savoro"),disc=LISTS.filter(l=>!S.lists.has(l.id)&&l.by!=="savoro");const ppl=PEOPLE.slice().sort((a,b)=>matchOf(b)-matchOf(a));
  return`<section class="exhead"><h1 class="x" tabindex="-1">${t("l_t")}</h1><p class="muted" style="max-width:60ch">${t("l_lede")}</p></section>
  <div class="sh"><h2 class="x">${t("yourLists")}</h2></div>
  <div class="plgrid">${S.my.map(myCard).join("")}<button class="newpl" type="button" data-act="newlist"><span class="plus">${I("plus")}</span><b>${t("newList")}</b><span class="small muted">${t("newListSub")}</span></button></div>
  ${fl.length?`<div class="sh"><h2 class="x">${t("followingLists")}</h2></div><div class="plgrid">${fl.map(plCard).join("")}</div>`:""}
  <div class="sh"><div><h2 class="x">${t("fromSavoro")}</h2><p>${t("fromSavoroSub")}</p></div></div><div class="strip" style="grid-auto-columns:min(44%,210px)">${team.map(plCard).join("")}</div>
  <div class="sh"><h2 class="x">${t("peopleLike")}</h2></div><div class="card people" style="padding:6px">${ppl.map(p=>personRow(p)).join("")}</div>
  <div class="sh"><h2 class="x">${t("fromLocals")}</h2></div><div class="plgrid">${disc.map(plCard).join("")}</div>${sponsoredBanner()}${foot()}`}
function routeURL(ids){const pts=ids.map(i=>{const r=RID[i];return encodeURIComponent(r.name+", "+r.street+", Barcelona")});if(pts.length<2)return dirURL(RID[ids[0]]);
  return`https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=${pts[0]}&destination=${pts[pts.length-1]}${pts.length>2?"&waypoints="+pts.slice(1,-1).join("%7C"):""}`}
function pageList(id){const l=LID[id];if(!l)return pageLists();const f=S.lists.has(l.id),p=PID[l.by];
  return`<a class="chip" href="#lists" style="margin-top:10px">${I("back")}${t("lists")}</a>
  <section class="lhero">${coverHTML(l.items,l.lc,L(l.t),l.items.length)}<div style="display:grid;gap:10px"><h1 class="x" tabindex="-1">${esc(L(l.t))}</h1><p class="muted">${esc(L(l.d))}</p>
   ${p.team?`<div class="person" style="padding:6px 0"><span class="av team" aria-hidden="true">${smile(.85,{w:26,h:11,sw:3.4,c:"#fff"})}</span><span class="pi"><b>${t("savoroTeam")}</b><small>${num(l.f+(f?1:0))} ${t("followers")} · ${esc(L(l.kind))}</small></span></div><p class="small muted">${t("teamNote")}</p>`:`<div class="person" style="padding:6px 0"><a class="cl" href="#u-${p.id}"><span class="sr">${esc(p.n)}</span></a>${pAv(p)}<span class="pi"><b>${esc(p.n)}</b><small>${num(l.f+(f?1:0))} ${t("followers")} · <span class="match">${t("match",pct(matchOf(p)))}</span></small></span></div>`}
   <div class="acts">${followBtn(l.id,f,L(l.t),"followl")}<button class="chip" type="button" data-act="copylink" data-v="list-${l.id}">${I("link")}${t("share")}</button><a class="chip" href="${routeURL(l.items)}" target="_blank" rel="noopener">${I("route")}${t("route")}</a></div></div></section>
  <div class="rows" style="margin-top:18px;max-width:760px">${l.items.map((i,n)=>row(RID[i],n+1)).join("")}</div>${foot()}`}
function pageMy(id){const l=MYID()[id];if(!l)return pageLists();
  return`<a class="chip" href="#lists" style="margin-top:10px">${I("back")}${t("lists")}</a>
  <section class="lhero">${l.items.length?coverHTML(l.items,l.sys?"#E31C13":"#3B2A20",listName(l),l.items.length):`<div class="cover" style="--lc:#3B2A20"><span class="cnt">0</span><b>${esc(listName(l))}</b></div>`}
   <div style="display:grid;gap:10px"><h1 class="x" tabindex="-1">${esc(listName(l))}</h1>
   <p class="muted">${l.sys?t("savedDesc"):t("places",l.items.length)}${l.collab?` · ${t("withYou")} ${l.collab.map(i=>PID[i]?PID[i].n:i).join(", ")}`:""}</p>
   ${l.collab?`<span class="avs">${meAv()}${l.collab.map(i=>PID[i]?pAv(PID[i]):"").join("")}</span>`:""}
   ${l.sys?"":`<div class="acts"><button class="switch" type="button" role="switch" data-act="togglepub" data-id="${l.id}" aria-checked="${!l.priv}"><span class="tr"></span>${t("makePublic")}</button>${l.priv?"":`<button class="chip" type="button" data-act="copylink" data-v="my-${l.id}">${I("link")}${t("share")}</button>`}${l.items.length>1?`<a class="chip" href="${routeURL(l.items)}" target="_blank" rel="noopener">${I("route")}${t("route")}</a>`:""}</div>`}</div></section>
  ${!l.sys&&l.priv&&l.items.length>=3?`<div class="callout">${smile(.9,{w:44,h:19,sw:5})}<p><b>${t("publishH")}</b><br><span class="muted">${t("publishP")}</span></p><button class="btn sm" type="button" data-act="togglepub" data-id="${l.id}">${I("globe")}${t("publish")}</button></div>`:""}
  <div class="rows" style="margin-top:18px;max-width:760px">${l.items.length?l.items.map((i,n)=>row(RID[i],n+1,{remove:l.id})).join(""):empty(t("emptyList"),t("emptyListP"),`<a class="btn sm" href="#explore">${t("goExplore")} ${arcI()}</a>`)}</div>${foot()}`}

