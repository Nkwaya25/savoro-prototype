"use strict";
/* explore map: tap a block to zoom in on it, then pinch, drag or use the buttons.
   The Now card is one big tap target: no drag, no pinch, so the page scrolls straight through it. */
const EX={vb:null,block:null};
const baseVB=()=>DIST_VB[S.f.dist];
/* Explore opens on the same framing as the Now card; "Whole map" zooms out to everything */
const startVB=()=>S.f.dist==="all"?NOW_VB:baseVB();
function fitVB(cx,cy,w){const b=baseVB(),r=b[3]/b[2];w=clamp(w,150,b[2]);const h=w*r;cx=clamp(cx,b[0]+w/2*.4,b[0]+b[2]-w/2*.4);cy=clamp(cy,b[1]+h/2*.4,b[1]+b[3]-h/2*.4);return[cx-w/2,cy-h/2,w,h]}
const curVB=svg=>{const v=svg.viewBox.baseVal;return[v.x,v.y,v.width,v.height]};
const zoomedIn=box=>box[2]<baseVB()[2]*.95;
function toSvg(svg,x,y){const p=svg.createSVGPoint();p.x=x;p.y=y;const q=p.matrixTransform(svg.getScreenCTM().inverse());return[q.x,q.y]}
function applyVB(svg,box,anim){const z=zoomedIn(box);EX.vb=z?box:null;const host=$("#exMap");if(host)host.classList.toggle("zin",z);svg.classList.toggle("zoomed",box[2]<620);svg.classList.toggle("mid",box[2]<1500);svg.style.touchAction=z?"none":"pan-y";
  if(anim)zoomTo(svg,box);else{svg.setAttribute("viewBox",box.map(n=>n.toFixed(1)).join(" "));syncYou(svg)}}
function selectBlock(id){const svg=$("#exMap svg"),b=BID[id];if(!svg)return;EX.block=id;applyVB(svg,fitVB(b.cx,b.cy,300),true);
  $$("#exMap .blk").forEach(g=>g.classList.toggle("sel",g.dataset.block===id));$("#rows").innerHTML=rowsHTML();bindRowSync()}
function mapReset(){const svg=$("#exMap svg");EX.block=null;if(svg){applyVB(svg,baseVB(),true);$$("#exMap .blk").forEach(g=>g.classList.remove("sel"))}const r=$("#rows");if(r){r.innerHTML=rowsHTML();bindRowSync()}}
function bindExMap(svg){const pts=new Map();let start=null,moved=false,pinch=null;
  svg.addEventListener("pointerdown",e=>{pts.set(e.pointerId,{x:e.clientX,y:e.clientY});try{svg.setPointerCapture(e.pointerId)}catch(err){}
    if(pts.size===1){start={x:e.clientX,y:e.clientY,vb:curVB(svg)};moved=false}
    if(pts.size===2){const[a,b]=[...pts.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y)||1,vb:curVB(svg),mid:toSvg(svg,(a.x+b.x)/2,(a.y+b.y)/2)};moved=true}});
  svg.addEventListener("pointermove",e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pinch&&pts.size===2){const[a,b]=[...pts.values()],k=pinch.d/(Math.hypot(a.x-b.x,a.y-b.y)||1),vb=pinch.vb,m=pinch.mid;
      applyVB(svg,fitVB(m[0]+(vb[0]+vb[2]/2-m[0])*k,m[1]+(vb[1]+vb[3]/2-m[1])*k,vb[2]*k),false);return}
    if(start){const dx=e.clientX-start.x,dy=e.clientY-start.y;if(!moved&&Math.hypot(dx,dy)>6)moved=true;
      if(moved&&zoomedIn(start.vb)){const k=start.vb[2]/svg.getBoundingClientRect().width;applyVB(svg,fitVB(start.vb[0]+start.vb[2]/2-dx*k,start.vb[1]+start.vb[3]/2-dy*k,start.vb[2]),false)}}});
  const end=e=>{const had=pts.has(e.pointerId);pts.delete(e.pointerId);if(pts.size<2)pinch=null;
    if(!pts.size&&had&&start&&!moved&&e.type==="pointerup"){const el=document.elementFromPoint(e.clientX,e.clientY),g=el&&el.closest&&el.closest(".blk");if(g)selectBlock(g.dataset.block);else{const p=toSvg(svg,e.clientX,e.clientY),b=blockNear(p[0],p[1],30);if(b)selectBlock(b.id)}}
    if(!pts.size)start=null};
  svg.addEventListener("pointerup",end);svg.addEventListener("pointercancel",end);
  svg.addEventListener("keydown",e=>{const g=e.target.closest(".blk");if(g&&(e.key==="Enter"||e.key===" ")){e.preventDefault();selectBlock(g.dataset.block)}});
  svg.addEventListener("wheel",e=>{if(!e.ctrlKey&&!zoomedIn(curVB(svg)))return;e.preventDefault();const p=toSvg(svg,e.clientX,e.clientY),vb=curVB(svg),k=e.deltaY>0?1.15:1/1.15;
    applyVB(svg,fitVB(p[0]+(vb[0]+vb[2]/2-p[0])*k,p[1]+(vb[1]+vb[3]/2-p[1])*k,vb[2]*k),false)},{passive:false})}
function mapZoom(dir){const svg=$("#exMap svg");if(!svg)return;const vb=curVB(svg),k=dir==="in"?.6:1.65;applyVB(svg,fitVB(vb[0]+vb[2]/2,vb[1]+vb[3]/2,vb[2]*k),true)}
function bindHomeMap(host){host.addEventListener("click",e=>{const svg=$("svg",host);if(!svg)return;
  let b=null,p=null;if(e.detail!==0){p=toSvg(svg,e.clientX,e.clientY);const g=document.elementFromPoint(e.clientX,e.clientY);const hit=g&&g.closest&&g.closest(".blk");b=hit?BID[hit.dataset.block]:blockNear(p[0],p[1],34)}
  const inDist=(x,y)=>{const v=DIST_VB[S.f.dist];return x>=v[0]&&x<=v[0]+v[2]&&y>=v[1]&&y<=v[1]+v[3]};
  if(b){if(S.f.dist!=="all"&&(S.f.dist==="gracia")!==(b.d==="gracia"))S.f.dist="all";EX.block=b.id;EX.vb=fitVB(b.cx,b.cy,300)}
  else if(p){if(!inDist(p[0],p[1]))S.f.dist="all";EX.block=null;EX.vb=fitVB(p[0],p[1],760)}
  else{EX.block=null;EX.vb=null}})}
function mapLocate(){const done=(msg,pt)=>{LOC.real=pt||null;toast(msg);const svg=$("#exMap svg");if(svg){const[x,y]=youAt();EX.block=null;refreshExplore();applyVB($("#exMap svg"),fitVB(x,y,520),true)}};
  if(!navigator.geolocation)return done(t("locOff"));
  navigator.geolocation.getCurrentPosition(pos=>{const pt=geoToSvg(pos.coords.latitude,pos.coords.longitude);onMap(pt)?done(t("locOn"),pt):done(t("locOut"))},()=>done(t("locOff")),{enableHighAccuracy:true,timeout:8000,maximumAge:60000})}
function bindRowSync(){const list=$("#rows");if(!list)return;const sync=c=>$$("#exMap .blk").forEach(g=>g.classList.toggle("sel",(!!c&&g.dataset.block===c.dataset.block)||g.dataset.block===EX.block));
  list.addEventListener("pointerover",e=>sync(e.target.closest(".prow")));list.addEventListener("pointerleave",()=>sync(null));list.addEventListener("focusin",e=>sync(e.target.closest(".prow")))}
function refreshExplore(){const r=$("#rows");if(!r)return;r.innerHTML=rowsHTML();
  $$("[data-act=fvibe]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===S.f.vibe));$$("[data-act=fsort]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===S.f.sort));$$("[data-act=fdist]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===S.f.dist));
  const l=$("[data-act=flocals]");if(l)l.setAttribute("aria-checked",S.f.locals);const o=$("[data-act=fopen]");if(o)o.setAttribute("aria-checked",S.f.open);
  const host=$("#exMap");if(host){const ids=new Set(filtered().map(x=>x.block));host.innerHTML=exMapHTML(ids);const svg=$("svg",host);applyVB(svg,EX.vb||startVB(),false);if(EX.block)$$(".blk",svg).forEach(g=>g.classList.toggle("sel",g.dataset.block===EX.block));bindExMap(svg)}
  bindRowSync()}

