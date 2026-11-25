"use strict";
/* ============ RESTAURANT ============ */
function scoreFor(r,who){if(who==="locals")return{v:r.sL,n:r.nL};if(who==="visitors")return{v:r.sV,n:r.nV};if(who==="friends"){const f=friendScore(r);return f?{v:f.v,n:f.n}:{v:r.score,n:0}}return{v:r.score,n:r.n}}
function curveSVG(v,seed,spread){const rand=rng(seed),W=420,H=190;let s=`<svg class="curve" viewBox="0 0 ${W} ${H}" aria-hidden="true">`;for(let i=0;i<28;i++){const g=(rand()+rand()+rand()-1.5)*(spread||.42);s+=`<path class="ind" d="${smilePath(clamp(v+g),W,H,20)}"/>`}return s+`<path class="avg" d="${smilePath(v,W,H,20)}"/></svg>`}
function histHTML(v,n,seed,spread){const rand=rng(seed),b=[0,0,0,0,0];const m=Math.max(n,40);for(let i=0;i<m;i++){const x=clamp(v+(rand()+rand()+rand()-1.5)*(spread||.42));b[Math.min(4,Math.floor(x*5))]++}const mx=Math.max(...b)||1;
  return`<div class="hist" role="img" aria-label="${t("words").map((w,i)=>`${w}: ${Math.round(b[i]/m*100)}%`).join(", ")}">${b.map((c,i)=>`<div><span style="height:${Math.max(4,c/mx*58)}px;animation-delay:${i*.06}s"></span>${t("words")[i]}</div>`).join("")}</div>`}
function verdict(r){const l=sc(r.sL),v=sc(r.sV);if(r.sV-r.sL>.2)return t("vPass",l,v);if(r.split)return t("vSplit");if(r.sL-r.sV>.12)return t("vSecret",l,v);return t("vEven",l,v)}
function scoreBox(r,who){const s=scoreFor(r,who),f=friendScore(r),spread=r.split?.7:who==="visitors"?.5:.4;const seed=hash(r.id+who);
  const tabs=[["everyone","everyone"],["locals","locals"],["visitors","visitors"]].concat(f?[["friends","friends"]]:[]);
  return`<div class="seg" role="group" aria-label="${t("everyone")}">${tabs.map(([k,l])=>`<button type="button" data-act="who" data-id="${r.id}" data-v="${k}" aria-pressed="${who===k}">${t(l)[0].toUpperCase()+t(l).slice(1)}</button>`).join("")}</div>
  <div class="top3"><span class="n num">${sc(s.v)}<small> /10</small></span><span class="w">${wordOf(s.v)}<small>${num(s.n)} ${who==="everyone"?t("smiles"):t(who)}</small></span></div>
  ${curveSVG(s.v,seed,spread)}<p class="small muted">${t("curveCap",num(s.n))}</p>
  <div class="compare">${[["locals",r.sL,""],["visitors",r.sV," vis"]].concat(f?[["friends",f.v,""]]:[]).map(([k,v,c])=>`<div class="cmp${c}"><span>${t(k)[0].toUpperCase()+t(k).slice(1)}</span><span class="bar"><i style="width:${v*100}%"></i></span><b class="num">${sc(v)}</b></div>`).join("")}</div>
  <div class="verdict">${smile(r.sL,{w:40,h:18})}<p>${esc(verdict(r))}</p></div>
  <div><p class="lab" style="margin-bottom:8px">${t("distribution")}</p>${histHTML(s.v,s.n,seed,spread)}</div>`}
function takeHTML(r,k,i){const key=r.id+i,on=S.tr[key]&&k.tr;const txt=on?k.tr[S.lang]:k.t;
  return`<figure class="tk"><blockquote><p lang="${on?S.lang:k.lang}">${esc(txt)}</p></blockquote><figcaption class="by"><span class="av" style="background:${["#B8140D","#8A5A00","#1E5A3C","#3A1E4A","#0F3550"][i%5]};width:26px;height:26px;font-size:.6rem">${initials(k.u)}</span>${esc(k.u)} ${smile(k.v,{w:30,h:13,sw:3.2})}<b style="color:var(--ink)">${sc(k.v)}</b><span class="lg">${t("langs")[on?S.lang:k.lang]}</span>${k.loc?`<span class="tag loc" style="padding:2px 8px">${t("local")}</span>`:`<span class="tag" style="padding:2px 8px">${t("visitor")}</span>`}${k.tr?`<button class="tr" type="button" data-act="translate" data-id="${r.id}" data-i="${i}">${on?t("original"):t("translate")}</button>`:""}</figcaption></figure>`}
function busyCard(r){const c=busyCurve(r),b=busyNow(r),hrs=[];for(let h=8;h<26;h++)hrs.push(h%24);const mx=Math.max(...c,.01);
  const lab=b?(b.k==="less"?t("busyLess"):b.k==="more"?t("busyMore"):t("busyUsual")):t("closedNow");
  return`<section class="card pad"><h2>${t("busyT")}</h2><p class="busyline"><span class="bdot ${b?b.k:"off"}"></span><b>${lab}</b>${b?` · ${t("busyNow")} ${nowLabel()}`:""}</p>
  <div class="pt" role="img" aria-label="${esc(lab)}">${hrs.map(h=>{const u=c[h]/mx*100,cur=b&&h===b.h;return`<div class="ptc${cur?" cur":""}"><i class="u" style="height:${Math.max(3,u)}%"></i>${cur?`<i class="n" style="height:${Math.max(4,b.now/mx*100)}%"></i>`:""}<small>${h%3===0?String(h).padStart(2,"0"):""}</small></div>`}).join("")}</div>
  ${b?`<p class="lab" style="margin:14px 0 8px">${t("busyAsk")}</p><div class="chips">${t("busyOpts").map((o,i)=>`<button class="chip" type="button" data-act="busyrep" data-v="${i}">${o}</button>`).join("")}</div>`:""}
  <p class="small muted" style="margin-top:10px">${t("busyNote")}</p></section>`}
function dirURL(r){return"https://www.google.com/maps/dir/?api=1&travelmode=walking&destination="+encodeURIComponent(r.name+", "+r.street+", Barcelona")}
function hoursRows(r){const days=S.lang==="es"?["dom","lun","mar","mié","jue","vie","sáb"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],td=today();return[1,2,3,4,5,6,0].map(d=>`<tr class="${d===td?"td":""}"><td>${days[d]}</td><td>${d===r.closed?t("closed"):r.hours}</td></tr>`).join("")}
function pageR(id){const r=RID[id];if(!r)return pageNow();const p=predict(r),f=friendScore(r),max=Math.max(...r.dishes.map(d=>d[1]));const inL=LISTS.filter(l=>l.items.includes(r.id));
  const takes=r.takes.map((k,i)=>[k,i]);
  return`<section class="rhero" style="--c1:${r.c1};--fg:${r.fg}">${motif(r,"big")}
   <div class="nav"><button class="ib" type="button" data-act="back" aria-label="${t("back")}">${I("back")}</button><span class="sp"></span><button class="ib" type="button" data-act="copylink" data-v="r-${r.id}" aria-label="${t("share")}">${I("link")}</button>${saveBtn(r)}</div>
   <div style="display:grid;gap:10px"><p class="mt"><span>${SHORTB[r.barri]}</span><span>${L(CUIS[r.cuisine])}</span></p><h1 class="x" tabindex="-1">${esc(r.name)}</h1>
   <p class="mt"><span>${price(r)}</span>${r.menu?`<span>Menú ${eur(r.menu)}</span>`:""}<span>${hoursText(r)}</span></p>
   <div class="tl">${badgeTag(r)}${f?`<span class="tag" style="background:rgba(0,0,0,.25);color:inherit">${friendAvs(r)} ${t("friendsBeen",f.n)}</span>`:""}</div>
   <button class="follow onhero" type="button" data-act="fav" data-id="${r.id}" aria-pressed="${S.favs.has(r.id)}">${S.favs.has(r.id)?t("following"):"+ "+t("followPlace")}</button></div></section>
  <div class="rgrid"><div class="col">
   <section class="card pad scorebox" id="scorebox">${scoreBox(r,S.f.locals?"locals":"everyone")}</section>
   <div class="predict"><span class="pn num">${sc(p.v)}</span><p><b>${p.own?t("yours"):t("yourGuess")}</b><br>${p.own?wordOf(p.v):p.basis.length?esc(t("guessWhy",p.basis.length,p.basis.map(x=>`${x.p.n.split(" ")[0]} ${pct(x.m)}%`).join(", "))):t("guessNone")}</p></div>
   <div class="ctas"><button class="btn" type="button" data-act="rate" data-id="${r.id}">${t("rateThis")} ${arcI()}</button><button class="btn ghost" type="button" data-act="saveto" data-id="${r.id}">${I("bm")}${t("wantGo")}</button></div>
   ${r.board?board(r,true):""}
   <section class="card pad"><h2>${t("takes")}</h2><div class="takes">${takes.map(([k,i])=>takeHTML(r,k,i)).join("")}</div><p class="small muted" style="margin-top:10px">${t("takesNote")}</p></section>
   <section class="card pad"><h2>${t("orders")}</h2><div class="orders">${r.dishes.map(([d,n],i)=>`<div class="ord"><b>${esc(d)}</b><small>${n} ${t("mentions")}</small><span class="bar"><i style="width:${n/max*100}%;animation-delay:${i*.07}s"></i></span></div>`).join("")}</div></section>
  </div><aside class="col">
   ${busyCard(r)}
   ${f?`<section class="card pad"><h2>${t("friendsBeen",f.n)}</h2><div class="friendsbeen">${f.ppl.map(pp=>`<a class="fb" href="#u-${pp.id}">${pAv(pp,28)}${esc(pp.n.split(" ")[0])} ${smile(pp.rr[r.id],{w:24,h:10,sw:3})}<span class="num">${sc(pp.rr[r.id])}</span></a>`).join("")}</div></section>`:""}
   <section class="card pad"><h2>${t("hours")}</h2><table class="hours"><tbody>${hoursRows(r)}</tbody></table></section>
   <section class="card pad"><h2 style="margin:0">${t("where")}</h2><p class="small" style="margin-top:6px"><b>${esc(r.street)}</b><br><span class="muted">${BARRIS[r.barri]}, Barcelona</span></p>
    <div class="minimap">${mapSVG({mode:"hl",vb:blockBox(BID[r.block],300),hl:new Set([r.block]),bare:true})}</div>
    <a class="btn wide" href="${dirURL(r)}" target="_blank" rel="noopener">${I("nav")} ${t("directions")}</a><p class="small muted" style="margin-top:6px">${t("dirNote")}</p></section>
   ${inL.length?`<section class="card pad"><h2>${t("inLists")}</h2>${inL.map(l=>`<a class="mini" href="#list-${l.id}"><span class="sw" style="background:${l.lc}"></span><span><b>${esc(L(l.t))}</b><small>${t("by")} ${esc(PID[l.by].n)}</small></span></a>`).join("")}</section>`:""}
   <button class="linkrow muted" type="button" data-act="wrong">${I("flag")}${t("wrong")}</button>
  </aside></div>${foot()}`}

