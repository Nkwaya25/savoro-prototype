"use strict";
/* ============ rate flow: where → bend → duel → take → done ============ */
const RF={open:false,step:1,rid:null,v:.5,take:"",dishes:new Set(),q:"",used:[],cand:null,round:0,stamp:false,block:false,from:null};
const rateEl=$("#rate");
function duelCandidate(){const others=myRanked().filter(x=>x.rid!==RF.rid&&!RF.used.includes(x.rid));if(!others.length)return null;return others.sort((a,b)=>Math.abs(a.v-RF.v)-Math.abs(b.v-RF.v))[0]}
function openRate(rid){closeSearch(true);if(dlg.open)dlg.close();Object.assign(RF,{open:true,step:rid?2:1,rid:rid||null,v:.5,take:"",dishes:new Set(),q:"",used:[],cand:null,round:0,stamp:false,block:false,from:rid?2:1,prev:document.activeElement});
  RF.intro=true;
  rateEl.hidden=false;document.body.classList.add("locked");renderRate();requestAnimationFrame(()=>rateEl.classList.add("on"))}
function closeRate(silent){if(!RF.open)return;RF.open=false;clearTimeout(RF.auto);rateEl.classList.remove("on");if(!OB.open)document.body.classList.remove("locked");setTimeout(()=>{if(!RF.open){rateEl.hidden=true;rateEl.innerHTML=""}},reduced.matches?0:320);if(!silent&&RF.prev&&RF.prev.focus)RF.prev.focus()}
function pickList(){const q=norm(RF.q.trim());const saved=new Set(S.my.flatMap(l=>l.items));
  let rs=R.filter(r=>!q||norm(r.name).includes(q)||norm(BARRIS[r.barri]).includes(q)||norm(L(CUIS[r.cuisine])).includes(q));
  if(!q)rs=rs.sort((a,b)=>saved.has(b.id)-saved.has(a.id));
  return rs.length?rs.map(r=>`<button class="pick" type="button" role="radio" data-act="pick" data-id="${r.id}" aria-checked="${RF.rid===r.id}">${swatch(r)}<span><b>${esc(r.name)}</b><small>${SHORTB[r.barri]} · ${L(CUIS[r.cuisine])}${!q&&saved.has(r.id)?" · "+t("r_saved"):""}</small></span><span class="tick">${RF.rid===r.id?I("check"):""}</span></button>`).join(""):empty(t("noMatch"))}
const STEPS=[1,2,3,4];
function renderRate(){const st=RF.step,r=RID[RF.rid];rateEl.style.setProperty("--v",st===2||st===5?RF.v:0);
  const prog=STEPS.map(i=>`<svg class="${i<st?"done":i===st?"cur":""}" viewBox="0 0 40 15"><path d="M4 4 Q20 ${i<st?19:8} 36 4"/></svg>`).join("");let body="",ft="";
  if(st===1)body=`<h2 class="x" id="rtitle">${two("r_where")}</h2><p class="sub">${t("r_whereSub")}</p><label class="sbox soft">${I("search")}<span class="sr">${t("r_search")}</span><input id="rq" type="search" autocomplete="off" placeholder="${t("r_search")}" value="${esc(RF.q)}"></label><div class="picks" id="picks" role="radiogroup" aria-label="${t("r_search")}">${pickList()}</div>`;
  if(st===2)body=`<p class="ey">${swatch(r)} ${esc(r.name)}</p><h2 class="x" id="rtitle">${two("r_bend")}</h2><p class="sub">${t("r_bendSub")}</p><div class="stage"><div id="bigSmile"></div><div class="vd"><div class="w" id="vw">${wordOf(RF.v)}</div><div class="n" id="vn">${sc(RF.v)} / 10</div>${RF.rid&&myMap()[RF.rid]!=null?`<div class="last">${esc(t("r_last",sc(myMap()[RF.rid])))}</div>`:""}</div><p class="hint">${I("down")}${t("r_drag")}</p></div>`;
  if(st===3){const c=RF.cand,cr=RID[c.rid];body=`<p class="ey">${esc(r.name)} · ${smile(RF.v,{w:28,h:12,sw:3})} ${sc(RF.v)}</p><h2 class="x" id="rtitle">${two("r_duel")}</h2><p class="sub">${esc(t("r_duelSub",cr.name))}</p>
    <div class="duel"><button class="dc" type="button" data-act="duel" data-v="better" style="--c1:${r.c1};--fg:${r.fg}">${motif(r,"m")}<span class="yours">${t("r_this")}</span><b>${esc(r.name)}</b><small>${I("up").replace("<svg",'<svg width="14" height="14" style="display:inline;vertical-align:-2px"')} ${S.lang==="es"?"Mejor":"Better"}</small></button>
    <button class="dc" type="button" data-act="duel" data-v="worse" style="--c1:${cr.c1};--fg:${cr.fg}">${motif(cr,"m")}<span class="yours">${sc(c.v)}</span><b>${esc(cr.name)}</b><small>${I("up").replace("<svg",'<svg width="14" height="14" style="display:inline;vertical-align:-2px"')} ${S.lang==="es"?"Mejor":"Better"}</small></button></div>
    <button class="btn ghost sm same" type="button" data-act="duel" data-v="same">${I("eq")}${t("r_same")}</button>`}
  if(st===4)body=`<p class="ey">${esc(r.name)} · ${smile(RF.v,{w:28,h:12,sw:3})} ${sc(RF.v)}</p><h2 class="x" id="rtitle">${two("r_take")}</h2><p class="sub">${t("r_takeSub")}</p><label class="sr" for="rtake">${t("r_take").join("")}</label><textarea id="rtake" class="takebox" maxlength="120" rows="2" placeholder="${t("r_ph")}">${esc(RF.take)}</textarea><p class="counter" id="rcount">${RF.take.length}/120</p>
    <div class="chips">${r.dishes.map(([d])=>`<button class="chip" type="button" data-act="dish" data-d="${esc(d)}" aria-pressed="${RF.dishes.has(d)}">${esc(d)}</button>`).join("")}${[...RF.dishes].filter(d=>!r.dishes.some(x=>x[0]===d)).map(d=>`<button class="chip" type="button" data-act="dish" data-d="${esc(d)}" aria-pressed="true">${esc(d)}</button>`).join("")}</div><label class="sbox soft">${I("plus")}<span class="sr">${t("r_add")}</span><input id="radd" type="text" placeholder="${t("r_add")}" autocomplete="off"></label>`;
  if(st===5){const rk=myRanked(),k=rk.findIndex(x=>x.rid===r.id)+1,n=S.ratings.length,pn=RF.prevN,upd=RF.upd;
    const rays=[...Array(14)].map((_,i)=>{const a=i*360/14+(i%2?8:-4),col=["#FFA800","#E8381A",r.c2][i%3],d=-(88+(i%3)*16);return`<g transform="rotate(${a.toFixed(1)})"><path class="ray" d="M-12 0 Q0 15 12 0" stroke="${col}" style="--d:${d}px;animation-delay:${(.26+(i%2)*.06).toFixed(2)}s"/></g>`}).join("")+[...Array(8)].map((_,i)=>`<g transform="rotate(${i*45+22})"><circle class="ray dot" r="4.2" fill="${i%2?"#FFA800":r.c2}" style="--d:-${60+(i%2)*30}px;animation-delay:.34s"/></g>`).join("");
    const sNow=streak(),sUp=sNow>RF.streakBefore;
    const base=(MILES.filter(m=>m[0]<=pn).pop()||[0])[0],tgt=(MILES.find(m=>m[0]>pn)||[pn+50,["",""]]),hit=!upd&&n>=tgt[0];
    const from=(pn-base)/(tgt[0]-base)*100,to=Math.min(100,(n-base)/(tgt[0]-base)*100);
    const wins=[];
    if(sNow>=2||sUp)wins.push(`<span class="wchip"><span class="wk">${[...Array(Math.min(sNow,6))].map((_,i,arr)=>`<i class="${sUp&&i===arr.length-1?"new":""}"></i>`).join("")}</span>${t("w_streak",sNow)}</span>`);
    if(RF.block)wins.push(`<span class="wchip"><svg class="oct" viewBox="0 0 40 40" aria-hidden="true"><polygon points="12,1 28,1 39,12 39,28 28,39 12,39 1,28 1,12"/></svg>${t("w_block")}</span>`);
    if(RF.stamp)wins.push(`<span class="wchip">${stampHTML(r.barri,true,true,0).replace('class="stamp','class="stamp mini')}${esc(t("w_stamp",SHORTB[r.barri]))}</span>`);
    body=`<div class="win" style="--c1:${r.c1};--fg:${r.fg}"><div class="burst" aria-hidden="true"><svg class="rays" viewBox="-110 -110 220 220">${rays}</svg>
      <div class="medal"><svg class="ms" viewBox="0 0 100 46"><path d="${smilePath(RF.v,100,46,8)}" pathLength="1"/></svg><span class="msn num">${sc(RF.v)}</span></div></div>
     <h2 class="x" id="rtitle">${upd?t("w_updated"):`${t("w_smile")} <span class="odo"><span><b>#${pn}</b><b>#${n}</b></span></span>`}</h2>
     <p class="sub"><b style="color:var(--ink)">${esc(r.name)}</b> · ${esc(t("w_rank",k,n))}</p>
     ${wins.length?`<div class="wins">${wins.map((w,i)=>w.replace('class="wchip"',`class="wchip" style="--i:${i}"`)).join("")}</div>`:""}
     ${upd?"":`<div class="mile${hit?" hit":""}"><div class="mt"><span>${hit?esc(t("w_unlock",L(tgt[1]))):esc(t("w_next",tgt[0]-n,L(tgt[1])))}</span><span class="num">${n}/${tgt[0]}</span></div><span class="mbar2"><i style="--from:${from.toFixed(1)}%;--to:${to.toFixed(1)}%"></i></span></div>`}</div>`}
  if(st<5)ft=`${st>RF.from?`<button class="btn ghost" type="button" data-act="rback">${t("back")}</button>`:"<span></span>"}${st===3?"<span></span>":`<button class="btn" type="button" data-act="rnext" ${st===1&&!RF.rid?"disabled":""}>${st===4?t("submit"):t("next")} ${arcI()}</button>`}`;
  else ft=`<button class="btn ghost" type="button" data-act="ranother">${I("plus")}${t("w_another")}</button><button class="btn done" type="button" data-act="rclose"><span>${t("w_done")}</span><i class="cd"></i></button>`;
  rateEl.innerHTML=`<div class="rhd"><span class="sr" aria-live="polite">${st<5?t("step",st,4):t("r_done")}</span><button class="ib" type="button" data-act="rclose" aria-label="${t("close")}">${I("close")}</button><div class="prog" aria-hidden="true">${prog}</div><span class="num" style="width:44px;text-align:right;font-weight:850;font-size:.85rem;color:var(--muted)">${Math.min(st,4)}/4</span></div><div class="rbd"><div class="rin">${body}</div></div><div class="rft">${ft}</div>`;
  if(st===1){const q=$("#rq");q.addEventListener("input",()=>{RF.q=q.value;$("#picks").innerHTML=pickList()});setTimeout(()=>q.focus(),60)}
  if(st===2){const intro=RF.intro;RF.intro=false;mountSmile($("#bigSmile"),RF.v,(v,preview)=>{if(!preview)RF.v=v;$("#vw").textContent=wordOf(v);$("#vn").textContent=sc(v)+" / 10";rateEl.style.setProperty("--v",v)},true,{intro,last:myMap()[RF.rid]});setTimeout(()=>{const f=$(".bigsmile",rateEl);if(f)f.focus({preventScroll:true})},80)}
  if(st===4){const ta=$("#rtake");ta.addEventListener("input",()=>{RF.take=ta.value.replace(/\n/g," ");$("#rcount").textContent=RF.take.length+"/120"});ta.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitRating()}});
    const a=$("#radd");a.addEventListener("keydown",e=>{if(e.key==="Enter"&&a.value.trim()){e.preventDefault();RF.dishes.add(a.value.trim().slice(0,40));renderRate();$("#radd").focus()}})}
  rateEl.classList.toggle("winning",st===5);rateEl.classList.remove("held");clearTimeout(RF.auto);
  if(st===5){if(!reduced.matches)setTimeout(()=>{try{navigator.vibrate&&navigator.vibrate([12,70,22])}catch(e){}},300);RF.auto=setTimeout(()=>{if(RF.open&&RF.step===5)closeRate()},6800)}
  $(".rbd",rateEl).scrollTop=0}
/* touching the win screen keeps it open (cancels the auto-close) */
rateEl.addEventListener("pointerdown",e=>{if(RF.step===5&&!e.target.closest("[data-act=rclose]")){clearTimeout(RF.auto);rateEl.classList.add("held")}});
function rateNext(){if(RF.step===1&&!RF.rid)return;if(RF.step===2){RF.cand=duelCandidate();RF.step=RF.cand?3:4;renderRate();return}if(RF.step===4){submitRating();return}RF.step++;renderRate()}
function duel(choice){const c=RF.cand;RF.used.push(c.rid);
  if(choice==="better"&&RF.v<=c.v)RF.v=Math.min(.99,c.v+.03);else if(choice==="worse"&&RF.v>=c.v)RF.v=Math.max(.01,c.v-.03);else if(choice==="same")RF.v=c.v;
  RF.round++;RF.cand=RF.round<2?duelCandidate():null;if(RF.cand&&Math.abs(RF.cand.v-RF.v)>.3)RF.cand=null;RF.step=RF.cand?3:4;renderRate()}
function submitRating(){const r=RID[RF.rid];RF.stamp=!stamps().has(r.barri);RF.block=!discovered().has(r.block);RF.upd=S.ratings.some(x=>x.rid===r.id);RF.prevN=S.ratings.length;RF.streakBefore=streak();
  S.ratings=S.ratings.filter(x=>x.rid!==r.id);S.ratings.push({rid:r.id,v:RF.v,take:RF.take.trim()||wordOf(RF.v),d:[...RF.dishes],date:new Date().toISOString().slice(0,10)});persist();RF.step=5;renderRate();paint()}
function mountSmile(host,init,onChange,interactive,opt){opt=opt||{};
  const W=380,H=230,BASE=64;const geo=(v,sq)=>{const x0=30+sq,x1=W-30-sq,y0=BASE-v*26,cy=BASE+v*250;return{d:`M${x0.toFixed(1)} ${y0.toFixed(1)} Q${W/2} ${cy.toFixed(1)} ${x1.toFixed(1)} ${y0.toFixed(1)}`,mx:W/2,my:(y0+cy)/2}};
  const HAND="M-5 4a5 5 0 0 1 10 0v17h1a4 4 0 0 1 8 1v1a4 4 0 0 1 7 2v14c0 10-7 17-17 17h-5c-6 0-10-3-13-8l-8-13a4.5 4.5 0 0 1 7.5-5l4.5 5V4z";
  host.innerHTML=`<svg class="bigsmile" viewBox="0 0 ${W} ${H}" ${interactive?`role="slider" tabindex="0" aria-label="${t("r_slider")}" aria-valuemin="0" aria-valuemax="10"`:'aria-hidden="true"'}><path class="track" d="${geo(1,0).d}"/><path class="track" d="${geo(0,0).d}"/>${opt.last!=null?`<path class="lastarc" d="${geo(opt.last,0).d}"/>`:""}<path class="arc" d=""/>${interactive?`<g class="ghost" aria-hidden="true"><path class="garc" d=""/><g class="ghand"><circle class="tap" r="12"/><path d="${HAND}"/></g></g><circle class="knob" r="14"/>`:""}</svg>`;
  const svg=host.firstChild,arc=$(".arc",svg),knob=$(".knob",svg);
  let target=init,cur=init,vel=0,drag=false,raf=0,last=0,lastIdx=Math.floor(init*5),lastY=0,dy=0;
  function draw(){const ten=clamp(Math.abs(target-cur)*3),sq=(drag?8:0)+ten*22,g=geo(cur,sq);arc.setAttribute("d",g.d);arc.setAttribute("stroke-width",(16+ten*6+(drag?2:0)).toFixed(1));if(knob){knob.setAttribute("cx",g.mx);knob.setAttribute("cy",g.my.toFixed(1))}}
  function tick(ts){const dt=last?Math.min(.033,(ts-last)/1000):.016;last=ts;const k=drag?620:380,c=drag?38:21;vel+=(k*(target-cur)-c*vel)*dt;cur+=vel*dt;draw();
    if(!drag&&Math.abs(vel)<.002&&Math.abs(target-cur)<.002){cur=target;draw();raf=0;last=0;return}raf=requestAnimationFrame(tick)}
  function kick(){if(reduced.matches){cur=target;draw();return}if(!raf){last=0;raf=requestAnimationFrame(tick)}}
  function set(v,quiet){target=clamp(v);const idx=Math.min(4,Math.floor(target*5));if(idx!==lastIdx){lastIdx=idx;if(!quiet&&navigator.vibrate)try{navigator.vibrate(6)}catch(e){}}
    show(target);kick()}
  function show(v,preview){svg.setAttribute("aria-valuenow",(v*10).toFixed(1));svg.setAttribute("aria-valuetext",`${sc(v)}, ${wordOf(v)}`);if(onChange)onChange(v,preview)}
  const toV=e=>{const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const q=p.matrixTransform(svg.getScreenCTM().inverse());return(q.y-BASE)/112};
  if(interactive&&opt.intro&&!reduced.matches){/* intro: 5 → 3 → 7 → 5 in under a second, always landing exactly on the start value, so the gesture explains itself */
    let touched=false,gRaf=0,iRaf=0;const ghost=$(".ghost",svg),gArc=$(".garc",svg),gHand=$(".ghand",svg);
    const lo=clamp(init-.2,.02,.98),hi=clamp(init+.2,.02,.98),KEYS=[[0,init],[230,lo],[520,hi],[780,init]],END=780,ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
    const t0=performance.now()+200;
    (function step(n){if(touched||!svg.isConnected)return;const el=n-t0;if(el<0){iRaf=requestAnimationFrame(step);return}
      let v=init;if(el<END)for(let i=0;i<KEYS.length-1;i++){const[ta,va]=KEYS[i],[tb,vb]=KEYS[i+1];if(el<=tb){v=va+(vb-va)*ease((el-ta)/(tb-ta));break}}
      cur=target=v;vel=0;draw();
      if(el<END){show(v,true);iRaf=requestAnimationFrame(step)}else{cur=target=init;draw();show(init,false)}})(performance.now());
    function startGhost(){if(touched||!svg.isConnected)return;ghost.classList.add("on");const g0=performance.now();
      (function loop(n){if(touched||!svg.isConnected){ghost.classList.remove("on");return}const ph=((n-g0)%2400)/2400,e=ph<.5?ph*2:2-ph*2,s=e*e*(3-2*e),g=geo(init+(1-init)*.85*s,0);
        gArc.setAttribute("d",g.d);gHand.setAttribute("transform",`translate(${g.mx} ${g.my.toFixed(1)})`);gRaf=requestAnimationFrame(loop)})(g0)}
    const gT=setTimeout(startGhost,3600);
    const stop=()=>{if(touched)return;touched=true;cancelAnimationFrame(iRaf);clearTimeout(gT);cancelAnimationFrame(gRaf);ghost.classList.remove("on");target=cur};
    svg.addEventListener("pointerdown",stop);svg.addEventListener("keydown",stop)}
  if(interactive){
    svg.addEventListener("pointerdown",e=>{drag=true;try{svg.setPointerCapture(e.pointerId)}catch(err){}lastY=e.clientY;set(toV(e));e.preventDefault()});
    svg.addEventListener("pointermove",e=>{if(!drag)return;dy=e.clientY-lastY;lastY=e.clientY;set(toV(e))});
    const up=()=>{if(!drag)return;drag=false;vel+=clamp(dy*.06,-2,2);kick()};svg.addEventListener("pointerup",up);svg.addEventListener("pointercancel",up);
    svg.addEventListener("keydown",e=>{const m={ArrowDown:.05,ArrowRight:.05,ArrowUp:-.05,ArrowLeft:-.05,PageDown:.2,PageUp:-.2}[e.key];
      if(m!=null){e.preventDefault();vel+=m*4;set(target+m)}else if(e.key==="Home"){e.preventDefault();set(0)}else if(e.key==="End"){e.preventDefault();set(1)}else if(e.key==="Enter"){e.preventDefault();rateNext()}});
    svg.setAttribute("aria-valuenow",(init*10).toFixed(1));svg.setAttribute("aria-valuetext",`${sc(init)}, ${wordOf(init)}`)}
  draw()}

