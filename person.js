"use strict";
/* ============ PERSON ============ */
function pageU(id){const p=PID[id];if(!p)return pageLists();const on=S.follow.has(id),m=pct(matchOf(p)),mine=myMap();
  const common=Object.keys(mine).filter(k=>p.rr[k]!=null).map(k=>({r:RID[k],a:mine[k],b:p.rr[k]}));
  const love=common.filter(x=>x.a>=.78&&x.b>=.78).sort((x,y)=>y.a+y.b-x.a-x.b);
  const picks=Object.entries(p.rr).filter(([k])=>mine[k]==null).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([k,v])=>RID[k]);
  const vsr=x=>`<a class="vsr" href="#r-${x.r.id}"><b>${esc(x.r.name)}</b><span class="v">${sc(x.a)}<small>${t("you")}</small></span><span class="v">${sc(x.b)}<small>${esc(p.n.split(" ")[0])}</small></span></a>`;
  const top=Object.entries(p.rr).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,v])=>mini(RID[k],scoreTag(v,{w:30,h:13})));const ls=LISTS.filter(l=>l.by===id);
  return`<section class="ucover" style="--pc:${p.c}"><div class="nav" style="display:flex"><button class="ib" type="button" data-act="back" aria-label="${t("back")}" style="background:rgba(0,0,0,.22);color:#fff">${I("back")}</button></div>
   <div class="who"><span class="av" style="background:#fff;color:${p.c};width:72px;height:72px;font-size:23px">${initials(p.n)}</span><div style="display:grid;gap:4px"><h1 class="x" tabindex="-1">${esc(p.n)}</h1><p style="font-weight:700;opacity:.9">${p.h} · ${p.local?esc(t("localBadge",SHORTB[p.barri])):t("visitorBadge")}</p></div></div>
   <p style="max-width:52ch">${esc(L(p.b))}</p>
   <div class="ustats"><div class="um"><b>${m}%</b><span>${t("matchWith")}</span><i class="mbar"><i style="width:${m}%"></i></i></div><div><b>${num(p.f+(on?1:0))}</b><span>${t("followers")}</span></div><div><b>${Object.keys(p.rr).length}</b><span>${t("p_smiles")}</span></div></div>
   ${followBtn(id,on,p.n)}</section>
  <div class="two" style="margin-top:14px"><section class="card pad"><h2>${t("bothLove")}</h2><div class="vs">${love.slice(0,4).map(vsr).join("")||`<p class="muted small">${t("guessNone")}</p>`}</div></section>
   <section class="card pad" style="padding-inline:8px"><h2 style="padding-inline:10px">${esc(t("theirPicks",p.n.split(" ")[0]))}</h2>${picks.map(r=>mini(r,`<span class="tag" style="background:var(--ink);color:var(--bg)">${t("predicted")} ${sc(predict(r).v)}</span>`)).join("")||`<p class="muted small" style="padding-inline:10px">${t("guessNone")}</p>`}</section></div>
  <div class="sh"><h2 class="x">${t("theirTop")}</h2></div><div class="card" style="padding:6px">${top.join("")}</div>
  ${ls.length?`<div class="sh"><h2 class="x">${t("theirLists")}</h2></div><div class="plgrid">${ls.map(plCard).join("")}</div>`:""}${foot()}`}

