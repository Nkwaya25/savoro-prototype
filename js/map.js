"use strict";
/* ============ city geometry ============
   Eixample: Cerdà's grid in metres (113.3 m blocks, 20 m streets, 15 m chamfers; Pg. de Gràcia 60 m,
   Pg. de Sant Joan and Gran Via 50 m), turned 45° to north, with Diagonal as one straight cut through it.
   Gràcia: its own smaller, irregular grid along Gran de Gràcia. Street order and barri limits follow the
   Ajuntament's barri boundaries. Positions are close, not surveyed: real block geometry arrives in Session 7.
   Grid coordinates: x counts streets from Pg. de Gràcia (0) towards Besòs, y counts streets from Gran Via (0)
   towards the mountain. A block (c,j) sits between streets c and c+1, and j and j+1. */
const MU=1.5,K=Math.SQRT1_2,BLK=113.3,CH=15;
const COLN={"-13":"Entença","-12":"Rocafort","-11":"Calàbria","-10":"Viladomat","-9":"Comte Borrell","-8":"Comte d'Urgell","-7":"Villarroel","-6":"Casanova","-5":"Muntaner","-4":"Aribau","-3":"Enric Granados","-2":"Balmes","-1":"Rambla de Catalunya",0:"Pg. de Gràcia",1:"Pau Claris",2:"Roger de Llúria",3:"Bruc",4:"Girona",5:"Bailèn",6:"Pg. de Sant Joan",7:"Roger de Flor",8:"Nàpols",9:"Sicília",10:"Sardenya",11:"Marina",12:"Lepant",13:"Padilla"};
const ROWN={0:"Gran Via",1:"Diputació",2:"Consell de Cent",3:"Aragó",4:"València",5:"Mallorca",6:"Provença",7:"Rosselló",8:"Còrsega",9:"París",10:"Londres"};
const ROWL={"-1":"Sepúlveda","-2":"Floridablanca","-3":"Manso","-4":"Tamarit"},ROWR={"-1":"Casp","-2":"Ausiàs Marc","-3":"Alí Bei","-4":"Ribes"};
const MAJOR=new Set(["Gran Via","Diagonal","Pg. de Gràcia","Pg. de Sant Joan","Aragó"]);
function axis(n,wide){const w=i=>wide[i]||20,p={0:0};for(let i=1;i<=n;i++)p[i]=p[i-1]+w(i-1)/2+BLK+w(i)/2;for(let i=-1;i>=-n;i--)p[i]=p[i+1]-w(i+1)/2-BLK-w(i)/2;
  const at=f=>{const a=Math.floor(f),b=a+1,k=f-a;return p[a]+(p[b]-p[a])*k};return{p,w,at}}
const AX=axis(18,{0:60,6:50}),AY=axis(18,{0:50});
const G=(i,j)=>[AX.at(i),AY.at(j)];
/* grid metres → SVG units, north up */
const OX=2400,OY=2000;
const TPm=(x,y)=>[OX+(x-y)*K/MU,OY-(x+y)*K/MU];
const TP=(i,j)=>TPm(...G(i,j));
const P=a=>a.map(q=>q.map(n=>n.toFixed(1)).join(",")).join(" ");
/* polygon helpers (grid metres) */
function clip(poly,f){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],fa=f(a),fb=f(b);
  if(fa>=0)out.push(a);if((fa>=0)!==(fb>=0)){const k=fa/(fa-fb);out.push([a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k])}}return out}
const area=p=>Math.abs(p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a[0]*b[1]-b[0]*a[1]},0))/2;
const cen=p=>{const n=p.length;return[p.reduce((s,q)=>s+q[0],0)/n,p.reduce((s,q)=>s+q[1],0)/n]};
function inside(pt,poly){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>pt[1])!==(b[1]>pt[1])&&pt[0]<(b[0]-a[0])*(pt[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
/* a straight line as a signed-distance function: positive on the left of a→b */
function line(a,b){const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy);return p=>(dx*(p[1]-a[1])-dy*(p[0]-a[0]))/L}
/* Diagonal: crosses Pg. de Gràcia between Rosselló and Còrsega, and cuts the Bailèn–Sant Joan block between València and Mallorca */
const DIAG_A=G(0,7.5),DIAG_B=G(5.5,4.5),fDiag=line(DIAG_A,DIAG_B),DIAG_W=50;
/* lower edge of the Eixample: Ronda de Sant Antoni, Pl. Universitat, Pl. Catalunya, Ronda de Sant Pere, Arc de Triomf */
const CV_EDGE=[[-17,-5.2],[-11,-4.6],[-8,-4.2],[-3.6,-.35],[-1.4,-1.25],[.35,-1.25],[6,-3.5],[8.5,-4.2],[12,-4.6],[17,-5]].map(q=>G(...q));
function fEdge(x){let k=CV_EDGE.findIndex((q,i)=>i<CV_EDGE.length-1&&x>=q[0]&&x<=CV_EDGE[i+1][0]);if(k<0)k=x<CV_EDGE[0][0]?0:CV_EDGE.length-2;return line(CV_EDGE[k],CV_EDGE[k+1])}
const edgeY=pt=>fEdge(pt[0])(pt);
/* Vila de Gràcia: Còrsega (or Diagonal where it runs higher), Via Augusta, Travessera de Dalt, Escorial, Travessera de Gràcia, Bailèn */
const GRACIA=[[-2.2,8.75],[5,8.08],[5,10.3],[6.9,9.7],[10.6,13.4],[3,18.5],[-.2,14.6]].map(q=>G(...q));
const CORSEGA=AY.at(8)+10;
const PLCAT_BOX=[[-1.45,-1.25],[.4,-1.25],[.4,-2.45],[-1.45,-2.45]].map(q=>G(...q));
function barriOf(c,j,above){if(c<-13||c>12)return null;
  if(j<0)return c<=-2?(c>=-12?"santantoni":null):c<=5?"dreta":c<=10?"fortpienc":null;
  if(above){if(c<=-3)return null;if(c<=5)return j<=7?"dreta":"_g";if(c<=9)return j<=6?"sagrada":null;return j<=7?"sagrada":null}
  if(c<=-9)return"nova";if(c<=-3)return"antiga";if(c<=5)return"dreta";if(c<=10)return j<3?"fortpienc":"sagrada";return null}
const BLOCKS=[],BID={},GHOSTS=[],PLAZAS=[],LABELS=[];
(function build(){const rand=rng(1859);
  const add=(arr,b)=>{b.pts=P(b.poly.map(p=>TPm(...p)));const c=TPm(...cen(b.poly));b.cx=c[0];b.cy=c[1];arr.push(b);if(arr===BLOCKS)BID[b.id]=b};
  /* Eixample */
  for(let c=-16;c<=15;c++)for(let j=-6;j<=13;j++){
    const x0=AX.p[c]+AX.w(c)/2,x1=AX.p[c+1]-AX.w(c+1)/2,y0=AY.p[j]+AY.w(j)/2,y1=AY.p[j+1]-AY.w(j+1)/2;
    let oct=[[x0+CH,y0],[x1-CH,y0],[x1,y0+CH],[x1,y1-CH],[x1-CH,y1],[x0+CH,y1],[x0,y1-CH],[x0,y0+CH]];
    const fe=fEdge((x0+x1)/2);oct=clip(oct,p=>fe(p)-10);if(oct.length<3)continue;
    const full=BLK*BLK,pieces=[["b",clip(oct,p=>-fDiag(p)-DIAG_W/2)],["a",clip(oct,p=>fDiag(p)-DIAG_W/2)]].filter(([,q])=>q.length>2&&area(q)>full*.07);
    pieces.forEach(([side,poly])=>{const barri=barriOf(c,j,side==="a"),mid=cen(poly);if(barri==="_g"||inside(mid,GRACIA))return;
      const id=`e:${c}:${j}${pieces.length>1?":"+side:""}`;
      if(barri)add(BLOCKS,{id,d:"eixample",barri,poly,c,j,seed:rand()});else add(GHOSTS,{id:"x"+id,poly})})}
  /* Gràcia: rows along Gran de Gràcia (bearing 345°), smaller blocks, narrow streets */
  const O=G(0,7.95),V=[.5,.866],U=[.866,-.5],gp=(u,v)=>[O[0]+u*U[0]+v*V[0],O[1]+u*U[1]+v*V[1]];
  const us=[-8];for(let u=-8;u>-330;){u-=70+rand()*24;us.unshift(u)}us.push(8);for(let u=8;u<1050;){u+=74+rand()*26;us.push(u)}
  const vs=[-60];for(let v=-60;v<1200;){v+=58+rand()*22;vs.push(v)}
  const TRAV=470;const SQ=[["Pl. de la Vila",230,330],["Pl. del Sol",150,560],["Pl. de la Revolució",420,430],["Pl. de la Virreina",560,680],["Pl. del Diamant",320,760]];
  const fC=p=>p[1]-CORSEGA,fD=p=>fDiag(p)-DIAG_W/2;
  for(let a=0;a<us.length-1;a++)for(let b=0;b<vs.length-1;b++){if(us[a]===-8)continue;
    let u0=us[a]+4.5,u1=us[a+1]-4.5,v0=vs[b]+4.5,v1=vs[b+1]-4.5;if(v0<TRAV+8&&v1>TRAV-8){if(v0>TRAV-30)v0=TRAV+8;else v1=TRAV-8}if(v1-v0<20)continue;
    const mu=(u0+u1)/2,mv=(v0+v1)/2;if(SQ.some(([,x,y])=>Math.abs(x-mu)<45&&Math.abs(y-mv)<38))continue;
    const j=()=>(rand()-.5)*9;let poly=[gp(u0+j(),v0+j()),gp(u1+j(),v0+j()),gp(u1+j(),v1+j()),gp(u0+j(),v1+j())];
    const m=cen(poly);poly=clip(clip(poly,fC),fD);if(poly.length<3||area(poly)<900)continue;
    const g={id:`g:${a}:${b}`,d:"gracia",barri:"gracia",poly,gu:mu,gv:mv,seed:rand()};
    if(inside(m,GRACIA))add(BLOCKS,g);else{g.id="x"+g.id;add(GHOSTS,g)}}
  SQ.forEach(([n,u,v])=>{const q=[gp(u-40,v-32),gp(u+40,v-32),gp(u+40,v+32),gp(u-40,v+32)];PLAZAS.push({n,pts:P(q.map(p=>TPm(...p))),at:TPm(...gp(u,v))})});
  /* Ciutat Vella below the Rondas: small, crooked, only as texture */
  for(let u=-2600;u<2600;u+=58)for(let v=-1400;v<200;v+=50){const x=u*K-v*K+(rand()-.5)*20,y=u*K+v*K+(rand()-.5)*20;
    const e=edgeY([x,y]);if(e>-14||e<-520||inside([x,y],PLCAT_BOX))continue;const r=17+rand()*9,rot=rand()*.6;
    const poly=[0,1,2,3].map(i=>{const t=rot+i*Math.PI/2+(rand()-.5)*.35;return[x+Math.cos(t)*r*1.35,y+Math.sin(t)*r]});
    add(GHOSTS,{id:"cv"+u+":"+v,poly,cv:1})}
  PLAZAS.push({n:"Pl. Catalunya",pts:P([[-1.35,-1.35],[.3,-1.35],[.3,-2.35],[-1.35,-2.35]].map(q=>TP(...q))),at:TP(-.52,-1.85),big:1});
  /* labels: [text, x, y, angle, major]; streets get their name on the axis, minor ones only show zoomed in */
  [[0,4.5],[0,-.5],[6,2.5],[6,-1.6],[-1,1.5],[-2,5.5],[-3,3.5],[-4,4.5],[-5,8.5],[-6,2.5],[-8,4.5],[-9,-2.4],[-10,1.5],[-11,6.5],[1,6.5],[2,2.5],[3,4.4],[4,1.5],[5,6.5],[7,1.5],[8,4.5],[9,1.5],[10,4.5],[11,6.5],[-8,10.5],[-4,9.6]]
    .forEach(([i,j])=>{const n=COLN[i];if(n)LABELS.push([n,...TP(i,j),45,MAJOR.has(n)])});
  [[0,-5.5],[0,3.5],[1,-1.5],[2,-6.5],[2,7.5],[3,-1.5],[3,7.5],[4,-6.5],[4,1.5],[5,-3.5],[5,8.5],[6,-6.5],[6,1.5],[7,-5.5],[7,2.5],[8,-6.5],[8,3.5],[9,-7.5],[10,-8.5]]
    .forEach(([j,i])=>{const n=ROWN[j];if(n)LABELS.push([n,...TP(i,j),-45,MAJOR.has(n)])});
  [[-1,-6.5],[-2,-10.5],[-3,-5.5],[-1,2.5],[-2,3.5],[-3,7.5]].forEach(([j,i])=>LABELS.push([(i<0?ROWL:ROWR)[j],...TP(i,j),-45,false]));
  {const a=TPm(...G(-6,9.6)),b=TPm(...G(9,1.4)),ang=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI;LABELS.push(["Diagonal",...TPm(...G(-4.8,9.4)),ang,true],["Diagonal",...TPm(...G(7.8,2.75)),ang,true])}
  {const p1=TPm(...gp(0,80)),p2=TPm(...gp(0,700)),ang=Math.atan2(p2[1]-p1[1],p2[0]-p1[0])*180/Math.PI;LABELS.push(["Gran de Gràcia",...TPm(...gp(0,300)),ang+180,false],["Trav. de Gràcia",...TPm(...gp(330,TRAV)),ang+90,false])}
  BLOCKS.forEach(b=>b.rs=[]);
})();
/* restaurants point at a block id; Gràcia ones at a spot in Gràcia's own frame */
const GSPOT={sol:[150,500],verdi:[380,620]};
R.forEach(r=>{let b=BID[r.block];if(!b&&r.block.startsWith("g@")){const[u,v]=GSPOT[r.block.slice(2)];b=BLOCKS.filter(x=>x.d==="gracia").sort((x,y)=>Math.hypot(x.gu-u,x.gv-v)-Math.hypot(y.gu-u,y.gv-v))[0];r.block=b.id}
  if(!b){console.warn("no block",r.id,r.block);b=BLOCKS[0];r.block=b.id}b.rs.push(r);r.barri=b.barri});
function bboxOf(list,pad){let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;list.forEach(b=>b.pts.split(" ").forEach(p=>{const[x,y]=p.split(",").map(Number);x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y)}));return[x0-pad,y0-pad,x1-x0+pad*2,y1-y0+pad*2]}
const VB=bboxOf(BLOCKS,40);
const DIST_VB={eixample:bboxOf(BLOCKS.filter(b=>b.d==="eixample"),30),gracia:bboxOf(BLOCKS.filter(b=>b.d==="gracia"),40),all:VB};
/* the Now card frames every block that has a place on it, kept close to square so it reads as a map, not a strip */
const NOW_VB=(()=>{const v=bboxOf(BLOCKS.filter(b=>b.rs.length),95);const cx=v[0]+v[2]/2,cy=v[1]+v[3]/2;let w=Math.max(v[2],1100),h=Math.max(v[3],1100);
  if(h>w*1.12)w=h/1.12;else if(w>h)h=w;return[cx-w/2,cy-h/2,w,h]})();
function blockBox(b,w){w=w||420;return[clamp(b.cx-w/2,VB[0],VB[0]+VB[2]-w),clamp(b.cy-w/2,VB[1],VB[1]+VB[3]-w),w,w]}
/* the map's only colour code: is a kitchen open on this block right now */
function blockState(b){if(!b.rs.length)return"none";const s=b.rs.map(r=>hoursState(r).st);return s.some(x=>x==="open")?"open":s.some(x=>x==="closing"||x==="opening")?"soon":"closed"}
const cssv=(n,d)=>getComputedStyle(document.documentElement).getPropertyValue(n).trim()||d;
/* warm ramp, kept for the Passport (your own map) */
function warm(v){const cold=cssv("--cold","#E6DED3");if(v<.18)return cold;const k=clamp((v-.18)/.82);return k<.6?mix(cold,"#FFA800",.3+k/.6*.7):mix("#FFA800","#E8381A",(k-.6)/.4)}
/* where you are: real position when you asked for it and you're on the map, otherwise a demo spot (Pau Claris × Aragó) */
const LOC={demo:TP(1,3),real:null};
const PLCAT=[41.3870,2.1700],PLCAT_G=G(-.52,-1.85);
function geoToSvg(lat,lng){const E=(lng-PLCAT[1])*111320*Math.cos(PLCAT[0]*Math.PI/180),N=(lat-PLCAT[0])*110950;return TPm(PLCAT_G[0]+(E+N)*K,PLCAT_G[1]+(N-E)*K)}
const onMap=p=>p[0]>VB[0]&&p[0]<VB[0]+VB[2]&&p[1]>VB[1]&&p[1]<VB[1]+VB[3];
const youAt=()=>LOC.real||LOC.demo;
function youSVG(k){const[x,y]=youAt();return`<g class="you" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${k.toFixed(3)})" aria-hidden="true"><circle class="halo" r="22"/><circle class="ring" r="9.5"/><circle class="dot" r="7"/></g>`}
function syncYou(svg){if(!svg)return;const g=$(".you",svg);if(!g)return;const w=svg.getBoundingClientRect().width;if(!w)return;const[x,y]=youAt();g.setAttribute("transform",`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(svg.viewBox.baseVal.width/w).toFixed(3)})`)}
const stLabel=s=>t("st_"+s);
/* mode: live (home/explore) | hl (highlight a set) | personal (passport) */
function mapSVG(o){o=o||{};const mode=o.mode||"live",hs=o.hl||null,vb=o.vb||VB,live=mode==="live";const disc=mode==="personal"?discovered():null;
  let s=`<svg class="citymap${o.cls?" "+o.cls:""}" viewBox="${vb.map(n=>+n.toFixed(1)).join(" ")}" ${o.label?`role="group" aria-label="${esc(o.label)}"`:'aria-hidden="true"'}>`;
  s+=`<rect class="land" x="${VB[0]-3000}" y="${VB[1]-3000}" width="${VB[2]+6000}" height="${VB[3]+6000}"/>`;
  s+=`<g class="ghosts">${GHOSTS.map(g=>`<polygon class="${g.cv?"cv":""}" points="${g.pts}"/>`).join("")}</g>`;
  s+=PLAZAS.map(p=>`<polygon class="plaza${p.big?" big":""}" points="${p.pts}"/>`).join("");
  BLOCKS.forEach(b=>{let cls="blk";
    if(live){cls+=" s-"+blockState(b);if(hs&&b.rs.length&&!hs.has(b.id))cls+=" dim"}
    else if(mode==="personal"){const on=disc.has(b.id);cls+=on?" s-mine":" ghost"}
    else{const on=hs&&hs.has(b.id);cls+=on?" s-mine":"";if(hs&&!on)cls+=" dim"}
    if(o.sel===b.id)cls+=" sel";
    const lab=o.interactive?`${SHORTB[b.barri]}${b.rs.length?`, ${stLabel(blockState(b))}: `+b.rs.map(r=>r.name).join(", "):""}`:"";
    s+=`<g class="${cls}" data-block="${b.id}" ${o.interactive?`tabindex="0" role="button" aria-label="${esc(lab)}"`:""}><polygon points="${b.pts}"/></g>`});
  if(!o.bare){const still=/still/.test(o.cls||""),seen=new Set();s+=LABELS.filter(([txt,,,,maj])=>!still||(maj&&!seen.has(txt)&&seen.add(txt))).map(([txt,x,y,a,maj])=>`<text class="mlabel${maj?" maj":""}" text-anchor="middle" transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${a.toFixed(1)})" dy="5">${esc(txt)}</text>`).join("");
    s+=PLAZAS.map(p=>`<text class="plabel${p.big?" maj":""}" text-anchor="middle" x="${p.at[0].toFixed(0)}" y="${p.at[1].toFixed(0)}" dy="4">${esc(p.n)}</text>`).join("");
    const gl=TP(.6,10.6),el=TP(-6.2,4.2),cv=TP(-3,-4.6);
    s+=`<text class="blabel" text-anchor="middle" x="${gl[0].toFixed(0)}" y="${gl[1].toFixed(0)}">Gràcia</text><text class="blabel" text-anchor="middle" x="${el[0].toFixed(0)}" y="${el[1].toFixed(0)}">Eixample</text><text class="slabel" text-anchor="middle" x="${cv[0].toFixed(0)}" y="${cv[1].toFixed(0)}">Ciutat Vella</text>`}
  if(mode==="personal")BLOCKS.forEach(b=>{if(!b.rs.length||!disc.has(b.id))return;let v=b.rs[0].score;const mine=S.ratings.filter(x=>RID[x.rid].block===b.id);if(mine.length)v=mine[mine.length-1].v;
    const x0=b.cx-16,x1=b.cx+16,y0=b.cy-4-v*3,cy=b.cy-4+v*20;s+=`<path class="bsmile" d="M${x0.toFixed(1)} ${y0.toFixed(1)} Q${b.cx.toFixed(1)} ${cy.toFixed(1)} ${x1.toFixed(1)} ${y0.toFixed(1)}"/>`});
  if(o.names)BLOCKS.forEach(b=>b.rs.forEach((r,i)=>{s+=`<text class="pname" x="${b.cx.toFixed(1)}" y="${(b.cy+4+i*13).toFixed(1)}" text-anchor="middle">${esc(r.name)}</text>`}));
  if(o.you)s+=youSVG(vb[2]/(o.youW||360));
  return s+"</svg>"}
/* which block is under an SVG point (taps that land in a street pick the nearest block) */
function blockNear(x,y,max){let best=null,bd=max||60;BLOCKS.forEach(b=>{const d=Math.hypot(b.cx-x,b.cy-y);if(d<bd){bd=d;best=b}});return best}
let zoomAnim=0;
function zoomTo(svg,box){if(!svg)return;const v=svg.viewBox.baseVal,f=[v.x,v.y,v.width,v.height];if(reduced.matches){svg.setAttribute("viewBox",box.join(" "));syncYou(svg);return}
  cancelAnimationFrame(zoomAnim);const t0=performance.now(),D=650,ease=x=>1-Math.pow(1-x,4);
  (function step(n){const k=ease(Math.min(1,(n-t0)/D));svg.setAttribute("viewBox",f.map((x,i)=>x+(box[i]-x)*k).join(" "));syncYou(svg);if(k<1)zoomAnim=requestAnimationFrame(step)})(t0)}
addEventListener("resize",()=>$$(".citymap").forEach(syncYou));
