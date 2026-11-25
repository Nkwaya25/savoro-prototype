"use strict";
/* ============ chrome ============ */
const logo=()=>`<a class="logo" href="#now" aria-label="Savoro">savor<span class="o">o<svg viewBox="0 0 20 8" aria-hidden="true"><path d="M2 1.5 Q10 11 18 1.5" fill="none" stroke="#FFA800" stroke-width="2.8" stroke-linecap="round"/></svg></span></a>`;
const NAV=[["now","now"],["explore","explore"],["rate",""],["lists","lists"],["me","me"]];
function section(){const h=S.route;if(/^(explore|r-)/.test(h))return"explore";if(/^(lists|list-|my-|u-)/.test(h))return"lists";if(h==="me")return"me";if(h==="how"||h==="biz")return"me";return"now"}
function renderChrome(){document.documentElement.lang=S.lang;const sec=section();
  $("#rail").innerHTML=logo()+NAV.filter(n=>n[0]!=="rate").map(([k,h])=>`<a class="nv${sec===k?" on":""}" href="#${h}" ${sec===k?'aria-current="page"':""}>${I(k)}<span>${t(k)}</span></a>`).join("")+
    `<button class="btn" type="button" data-act="rate">${t("rate")} ${arcI()}</button><div class="foot2"><a class="nv" href="#how">${I("how")}<span>${t("how")}</span></a><a class="nv" href="#biz">${I("biz")}<span>${t("biz")}</span></a><button class="nv" type="button" data-act="settings">${I("gear")}<span>${t("settings")}</span></button></div>`;
  $("#top").innerHTML=`${logo()}<button class="sbar" type="button" data-act="search">${I("search")}<span>${t("searchPh")}</span><kbd>/</kbd></button><span class="here"><i></i>${SHORTB[S.me.barri]||"BCN"} · ${nowLabel()}</span><button class="ib" type="button" data-act="search" aria-label="${t("searchPh")}">${I("search")}</button>`;
  $("#tabs").innerHTML=NAV.map(([k,h])=>k==="rate"?`<button class="fab" type="button" data-act="rate" aria-label="${t("rate")}"><span class="bub">${I("rate")}</span>${t("rate")}</button>`:`<a href="#${h}" class="${sec===k?"on":""}" ${sec===k?'aria-current="page"':""}>${I(k)}<span>${t(k)}</span></a>`).join("")}
const foot=()=>`<footer class="foot"><p>${t("placeholder")}</p><a href="#how">${t("how")}</a><a href="#biz">${t("biz")}</a><button class="lab" type="button" data-act="settings" style="min-height:44px">${t("settings")}</button></footer>`;

/* ============ components ============ */
const saveBtn=(r,cls)=>`<button class="save${cls?" "+cls:""}" type="button" data-act="saveto" data-id="${r.id}" aria-pressed="${isSaved(r.id)}" aria-label="${t("saveTo")}: ${esc(r.name)}">${I("bm")}</button>`;
const isSaved=id=>S.my.some(l=>l.items.includes(id));
const listName=l=>l.sys?t("savedName"):l.name;
const MYID=()=>Object.fromEntries(S.my.map(l=>[l.id,l]));
const price=r=>"€".repeat(r.price);
function badgeTag(r){const b=badge(r);return b?`<span class="tag ${b[0]}">${esc(b[1])}</span>`:""}
const openTag=r=>{const st=hoursState(r).st;return st==="closed"?"":`<span class="tag open${st==="open"?"":" soon"}">${hoursText(r)}</span>`};
const menuTag=r=>r.menu&&r.menu<15?`<span class="tag">Menú ${eur(r.menu)}</span>`:"";
function busyTag(r){const b=busyNow(r);if(!b||b.k==="usual")return"";return`<span class="tag ${b.k==="less"?"calm":"busy"}">${b.k==="less"?t("busyLess"):t("busyMore")}</span>`}
function friendAvs(r,max){const f=friendScore(r);if(!f)return"";return`<span class="avs" title="${esc(f.ppl.map(p=>p.n).join(", "))}">${f.ppl.slice(0,max||3).map(p=>pAv(p)).join("")}</span>`}
function vibeOk(r,v){if(!v)return true;if(v==="menu")return!!(r.menu&&r.menu<15);return r.tags.includes(v)}
function row(r,rank,o){o=o||{};const feat=!!o.feat;const v=shown(r);const pr=S.f.sort==="for"?predict(r):null;
  return`<article class="card prow${feat?" feat":""}" data-block="${r.block}"><a class="cl" href="#r-${r.id}"><span class="sr">${esc(r.name)}</span></a>
  <span class="rk">${feat?"":rank}</span>${swatch(r,"lg")}
  <div class="bodyc">${feat?`<span class="paid" style="color:#8A5A00"><i></i>${t("paidSlot")}</span>`:""}<h3>${esc(r.name)}</h3><p class="mt">${L(CUIS[r.cuisine])} · ${price(r)} · ${SHORTB[r.barri]}</p>
   <div class="ln">${scoreTag(v)}<small class="muted small">${num(S.f.locals?r.nL:r.n)} ${S.f.locals?t("locals"):t("smiles")}</small>${pr&&!pr.own?`<span class="tag" style="background:var(--ink);color:var(--bg)">${t("predicted")} ${sc(pr.v)}</span>`:""}${friendAvs(r)}</div>
   <div class="tl">${badgeTag(r)}${openTag(r)}${busyTag(r)}${menuTag(r)}</div></div>
  ${o.remove?`<button class="save" type="button" data-act="removefrom" data-list="${o.remove}" data-id="${r.id}" aria-label="${t("remove")}: ${esc(r.name)}">${I("close")}</button>`:saveBtn(r)}
  ${feat?`<p class="fnote">${t("paidNote")}</p>`:""}</article>`}
function feedText(f,i){const k="f"+i,on=S.tr[k]&&f.tr;return{txt:on?f.tr[S.lang]:f.t,lang:on?S.lang:f.lang,on}}
function post(f,i){const p=PID[f.p],r=RID[f.rid],x=feedText(f,i);
  return`<article class="card post"><div class="hd"><a href="#u-${p.id}" aria-label="${esc(p.n)}">${pAv(p,40)}</a><p class="who"><a href="#u-${p.id}"><b>${esc(p.n.split(" ")[0])}</b></a> ${t("smiledAt")} <a href="#r-${r.id}"><b>${esc(r.name)}</b></a><small>${t("ago",f.ago)} · ${SHORTB[r.barri]} · <span class="match">${t("match",pct(matchOf(p)))}</span></small></p><span class="sm">${smile(f.v,{w:34,h:15})}<span class="num">${sc(f.v)}</span></span></div>
  <div class="body"><a href="#r-${r.id}" aria-hidden="true" tabindex="-1">${swatch(r)}</a><p class="take" lang="${x.lang}">${esc(x.txt)}</p></div>
  <div class="acts">${f.d.map(d=>`<span class="tag">${esc(d)}</span>`).join("")}${f.tr?`<button class="lab" type="button" data-act="trfeed" data-i="${i}" style="min-height:36px;color:var(--acc)">${x.on?t("original"):t("translate")}</button>`:""}<span class="sp"></span><button class="chip" type="button" data-act="saveto" data-id="${r.id}" aria-pressed="${isSaved(r.id)}">${I("bm")}${t("wantGo")}</button></div></article>`}
function board(r,big){const closedT=r.closed===today(),s=slot(),soon=s==="morning"&&!closedT,off=closedT||(!boardLive()&&!soon);const b=r.board;
  const chalk=closedT?t("chalkClosed"):soon?t("chalkSoon"):off?t("chalkTmrw"):"";
  return`<article class="board${off?" off":""}${big?" bigboard":""}">${big?"":`<a class="cl" href="#r-${r.id}"><span class="sr">${esc(r.name)}</span></a>`}
  <div class="bt"><p class="bn">${!big&&S.favs.has(r.id)?`<span class="favmark">${t("youFollow")}</span>`:""}${big?t("todayMenu"):esc(r.name)}<small>${big?esc(t("boardSub")):`${SHORTB[r.barri]} · ${r.closed===today()?t("closed"):"13:00–16:00"}`}</small></p><span class="pr">${eur(r.menu)}</span></div>
  <p class="course"><b>${t("first")}</b>${b.p.map(esc).join(" · ")}</p><p class="course"><b>${t("second")}</b>${b.s.map(esc).join(" · ")}</p><p class="course"><b>${t("dessert")}</b>${b.d.map(esc).join(" · ")}</p><p class="incl">+ ${t("incl")}</p>${chalk&&!big?`<span class="tmrw">${chalk}</span>`:""}</article>`}
function forYouCard(r){const p=predict(r),top=p.basis[0];
  return`<a class="card foryou" href="#r-${r.id}" style="--c1:${r.c1}"><div class="art">${motif(r)}<span class="pred"><small>${t("predicted")}</small><b>${smile(p.v,{w:30,h:13,sw:3.4,c:"#F29400"})}${sc(p.v)}</b></span></div>
  <div class="tb"><b>${esc(r.name)}</b><small>${L(CUIS[r.cuisine])} · ${price(r)} · ${SHORTB[r.barri]}</small>${top?`<span class="why">${pAv(top.p,22)}${esc(t("because",top.p.n.split(" ")[0],pct(top.m)))}</span>`:""}</div></a>`}
function coverHTML(items,lc,title,count){const four=items.slice(0,4);while(four.length<4&&items.length)four.push(items[four.length%items.length]);
  return`<div class="cover" style="--lc:${lc}"><div class="mos">${four.map(i=>{const r=RID[i];return`<span style="background:${r.c1}">${motif(r)}</span>`}).join("")}</div><span class="cnt">${count}</span><b>${esc(title)}</b></div>`}
function plCard(l){const p=PID[l.by],f=S.lists.has(l.id);
  return`<div class="pl${p.team?" team":""}"><a class="cl" href="#list-${l.id}"><span class="sr">${esc(L(l.t))}</span></a>${coverHTML(l.items,l.lc,L(l.t),l.items.length)}${l.kind?`<span class="kind">${esc(L(l.kind))}</span>`:""}<p class="meta">${t("by")} <b>${esc(p.n.split(" ")[0])}</b> · ${num(l.f+(f?1:0))} ${t("followers")}${f?` · <span style="color:var(--acc);font-weight:800">${t("following")}</span>`:""}</p></div>`}
function myCard(l){const col=l.sys?"#E31C13":l.priv?"#3B2A20":"#0F3550";
  const cov=l.items.length?coverHTML(l.items,col,listName(l),l.items.length):`<div class="cover" style="--lc:${col}"><span class="cnt">0</span><b>${esc(listName(l))}</b></div>`;
  return`<div class="pl"><a class="cl" href="#my-${l.id}"><span class="sr">${esc(listName(l))}</span></a>${cov}<p class="meta">${l.priv?I("lock").replace("<svg",'<svg width="13" height="13" style="display:inline;vertical-align:-1px"'):I("globe").replace("<svg",'<svg width="13" height="13" style="display:inline;vertical-align:-1px"')} ${l.priv?t("private"):t("public")}${l.collab?` · ${t("withYou")} ${l.collab.map(id=>PID[id]?PID[id].n.split(" ")[0]:id).join(", ")}`:""}</p></div>`}
function personRow(p,o){o=o||{};const on=S.follow.has(p.id);
  return`<div class="person"><a class="cl" href="#u-${p.id}"><span class="sr">${esc(p.n)}</span></a>${pAv(p)}<span class="pi"><b>${esc(p.n)}</b><small>${p.local?esc(SHORTB[p.barri]):t("visitorBadge")} <span class="match">· ${t("match",pct(matchOf(p)))}</span></small></span>${followBtn(p.id,on,p.n)}</div>`}
const followBtn=(id,on,label,act)=>`<button class="follow" type="button" data-act="${act||"followp"}" data-id="${id}" aria-pressed="${on}" aria-label="${on?t("following"):t("follow")}: ${esc(label)}">${on?t("following"):t("follow")}</button>`;
function mini(r,end){return`<a class="mini" href="#r-${r.id}">${swatch(r)}<span><b>${esc(r.name)}</b><small>${L(CUIS[r.cuisine])} · ${price(r)} · ${hoursText(r)}</small></span><span class="end">${end||scoreTag(r.score,{w:30,h:13})}</span></a>`}
const empty=(h,p,btn)=>`<div class="empty">${smile(0,{w:110,h:40,sw:6})}<b>${h}</b>${p?`<p>${p}</p>`:""}${btn||""}</div>`;
function sponsoredBanner(){const es=S.lang==="es";return`<aside class="banner" aria-label="${t("sponsoredEn")}"><div class="art" aria-hidden="true"><svg viewBox="0 0 220 140" preserveAspectRatio="xMidYMid slice"><circle cx="170" cy="30" r="70" fill="#C9F27A" opacity=".85"/><path d="M50 62h80v22a40 40 0 0 1-80 0z" fill="#EFF5E8"/><path d="M130 70q22 0 20 14t-22 13" fill="none" stroke="#EFF5E8" stroke-width="7"/><path d="M74 48q8-12 0-24M100 48q8-12 0-24" stroke="#EFF5E8" stroke-width="4" fill="none" stroke-linecap="round"/></svg></div>
  <div class="bb"><span class="paid" style="justify-self:start">${t("sponsored")}</span><h3>${es?"Cafès Sitjà abre tostadero en Sant Antoni":"Cafès Sitjà opens a roastery in Sant Antoni"}</h3><p>${es?"Catas gratis los sábados por la mañana. Trae tu taza.":"Free tastings on Saturday mornings. Bring your own cup."}</p><a href="#how">${es?"Por qué ves esto":"Why you're seeing this"} →</a></div></aside>`}

