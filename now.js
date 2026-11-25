"use strict";
/* ============ NOW ============ */
function pageNow(){const s=slot(),ask=t("ask")[moment()];const openN=R.filter(openNow).length;
  const boards=R.filter(r=>r.board).sort((a,b)=>(S.favs.has(b.id)-S.favs.has(a.id))||(a.closed===today())-(b.closed===today())||a.menu-b.menu);
  const fy=R.filter(r=>myMap()[r.id]==null&&r.id!=="modernista").map(r=>[r,predict(r).v]).sort((a,b)=>b[1]-a[1]).slice(0,6).map(x=>x[0]);
  const feed=FEED.map((f,i)=>[f,i]).filter(([f])=>S.follow.has(f.p));
  const trending=LISTS.filter(l=>l.by!=="savoro").sort((a,b)=>b.f-a.f);
  return`<section class="hello"><p class="greet">${smile(.75,{w:24,h:10,sw:3})}${t("slots")[s]} · ${esc(t("greet")[s])}</p>
   <h1 class="x" tabindex="-1"><button type="button" data-act="search">${esc(ask[0])}<span class="q">${esc(ask[1])}</span></button></h1></section>
  ${S.seen.smiles?"":`<div class="card explain"><div class="ex3" aria-hidden="true">${[.12,.55,.95].map(v=>`<span>${smile(v,{w:50,h:22,sw:5})}<b class="num">${sc(v)}</b><small>${wordOf(v)}</small></span>`).join("")}</div><p><b>${t("explainH")}</b> ${t("explainP")}</p><button class="ib" type="button" data-act="seen" data-v="smiles" aria-label="${t("close")}">${I("close")}</button></div>`}
  <div class="homegrid"><div>
   <a class="livemap" id="homeMap" href="#explore" aria-label="${t("mapOpen")}: ${t("kitchensOpen",openN)}">${mapSVG({vb:NOW_VB,you:true,cls:"still"})}
    <div class="mov" aria-hidden="true"><span class="pill"><i class="live"></i>${t("aliveNow")} · ${nowLabel()}</span><span class="pill">${t("kitchensOpen",openN)}</span></div>
    <div class="legend" aria-hidden="true"><span class="lg"><i class="sw s-open"></i>${t("lg_open")}</span><span class="lg"><i class="sw s-soon"></i>${t("lg_soon")}</span><span class="lg"><i class="sw s-closed"></i>${t("lg_closed")}</span><span class="lg me"><i class="you-dot"></i>${t("lg_you")}</span><span class="go">${ic('<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>')}</span></div></a>
   <p class="small muted" style="margin:8px 2px 0">${t("mapNote")}</p>
   <div class="chips row" style="margin-top:12px">${VIBES.map(([k,lab])=>`<a class="chip" href="#explore" data-act="vibe" data-v="${k}">${esc(L(lab))}</a>`).join("")}<a class="chip" href="#explore" data-act="vibe" data-v="locals"><span class="dot"></span>${t("localsOnly")}</a></div>
  </div><div class="rightcol">
   <div class="sh" style="margin-top:6px"><h2 class="x">${t("friendsEating")}</h2><a href="#me">${t("friendsT")}</a></div>
   <div class="feed">${feed.slice(0,4).map(([f,i])=>post(f,i)).join("")||empty(t("friendsT"),t("o_doneP"),`<a class="btn sm" href="#lists">${t("peopleLike")}</a>`)}</div>
  </div></div>
  <div class="sh"><div><h2 class="x">${t("boardT")}</h2><p>${boardLive()?t("boardSub"):slot()==="morning"?t("boardSoon"):t("boardOff")}</p></div></div>
  <div class="strip">${boards.map(r=>board(r)).join("")}</div>
  <div class="sh"><div><h2 class="x">${t("forYou")}</h2><p>${t("forYouSub")}</p></div></div>
  <div class="strip" style="grid-auto-columns:min(66%,250px)">${fy.map(forYouCard).join("")}</div>
  ${feed.length>4?`<div class="sh"><h2 class="x">${t("friendsEating")}</h2></div><div class="feed" style="max-width:680px">${feed.slice(4).map(([f,i])=>post(f,i)).join("")}</div>`:""}
  <div class="sh"><h2 class="x">${t("trending")}</h2><a href="#lists">${t("seeAll")}</a></div>
  <div class="strip" style="grid-auto-columns:min(44%,210px)">${trending.map(plCard).join("")}</div>
  ${sponsoredBanner()}${foot()}`}

