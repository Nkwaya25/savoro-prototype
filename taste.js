"use strict";
/* ============ taste engine (all client-side, on placeholder data) ============ */
PEOPLE.forEach(p=>{const rand=rng(hash(p.id));p.rr={};R.forEach(r=>{if(rand()<.74){const base=p.local?r.sL:r.sV;p.rr[r.id]=clamp(base+(p.bias[r.cuisine]||0)+(rand()+rand()-1)*.13,.05,.99)}})});
FEED.forEach(f=>PID[f.p].rr[f.rid]=f.v);
Object.assign(PID.maya.rr,{mirall:.55});Object.assign(PID.oriol.rr,{mirall:.4,taqueria:.5});Object.assign(PID.laia.rr,{mirall:.93,modernista:.25});
const myMap=()=>{const m={};S.ratings.forEach(x=>m[x.rid]=x.v);return m};
function matchOf(p){const m=myMap();const common=Object.keys(m).filter(k=>p.rr[k]!=null);if(common.length<2)return .58;const md=common.reduce((s,k)=>s+Math.abs(m[k]-p.rr[k]),0)/common.length;return clamp(1-md*2.6,.22,.98)}
const pct=v=>Math.round(v*100);
function predict(r){const mine=myMap()[r.id];if(mine!=null)return{v:mine,own:true,basis:[]};
  const ppl=PEOPLE.filter(p=>p.rr[r.id]!=null).map(p=>({p,m:matchOf(p),v:p.rr[r.id]})).sort((a,b)=>b.m-a.m);
  let sw=0,sv=0;ppl.forEach(x=>{const w=Math.pow(x.m,4);sw+=w;sv+=w*x.v});
  const pv=sw?sv/sw:r.sL;const v=(pv*sw*3+r.sL)/(sw*3+1);return{v,own:false,basis:ppl.slice(0,3)}}
function friendScore(r){const fs=[...S.follow].map(id=>PID[id]).filter(p=>p&&p.rr[r.id]!=null);if(!fs.length)return null;return{v:fs.reduce((s,p)=>s+p.rr[r.id],0)/fs.length,n:fs.length,ppl:fs}}
function badge(r){if(r.n<5)return["new","Nuevo"];if(r.sV-r.sL>.2)return["warn",t("bPass")];if(r.split)return["split",t("bSplit")];if(r.sL-r.sV>.12)return["loc",t("bSecret")];if(r.sL>=.86)return["loc",t("bLove")];return null}
const shown=r=>S.f.locals?r.sL:r.score;
const isTrap=r=>r.sV-r.sL>.2;
/* how busy: a typical-day curve per place plus today's deviation (stands in for check-ins and one-tap reports) */
const gauss=(h,c,w)=>Math.exp(-((h-c)**2)/w);
function busyCurve(r){const rand=rng(hash(r.id+"busy")),v=[];for(let h=0;h<24;h++){const s=LET[slotAt(h+.5)];let b=0;if(r.slots.includes(s)){
  b=Math.max(r.slots.includes("m")?gauss(h,9.5,3):0,r.slots.includes("l")?gauss(h,14,2.5):0,r.slots.includes("a")?.55*gauss(h,18,4):0,r.slots.includes("d")?gauss(h,21.5,2.5):0,r.slots.includes("n")?.8*Math.max(gauss(h,0,3),gauss(h,24,3)):0);b=clamp((.18+.82*b)*(.85+rand()*.3))}v.push(b)}return v}
function busyNow(r){if(!openNow(r))return null;const h=Math.floor(hourNow())%24,usual=busyCurve(r)[h];const ratio=.6+rng(hash(r.id+today()+":"+h))()*.85;
  return{h,usual,now:clamp(usual*ratio),k:ratio<.85?"less":ratio>1.2?"more":"usual"}}
const stamps=()=>new Set(S.ratings.map(x=>RID[x.rid].barri));
const discovered=()=>new Set(S.ratings.map(x=>RID[x.rid].block));
const myRanked=()=>S.ratings.slice().sort((a,b)=>b.v-a.v);
/* weekly streak: consecutive Monday-start weeks with at least one smile, ending this week (or last week if this one is still empty) */
const weekIdx=d=>Math.floor((new Date(d+"T12:00:00").getTime()/864e5+3)/7);
function streak(rs){const ws=new Set((rs||S.ratings).map(x=>weekIdx(x.date)));let w=weekIdx(new Date().toISOString().slice(0,10));if(!ws.has(w))w--;let n=0;while(ws.has(w)){n++;w--}return n}
const MILES=[[5,["Regular","Habitual"]],[10,["Known at the bar","Te conocen en la barra"]],[20,["Barri guide","Guía del barrio"]],[30,["Off the beaten path","Fuera de ruta"]],[50,["Local legend","Leyenda local"]],[100,["Walking menú","Menú andante"]],[200,["Cerdà himself","El mismísimo Cerdà"]]];

