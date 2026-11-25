"use strict";
/* ============ time of day ============ */
/* three moments drive the look (day, evening, night); finer meal slots only drive copy and opening hours */
const MOMENTS=["day","evening","night"];
const LET={morning:"m",lunch:"l",afternoon:"a",dinner:"d",late:"n"};
const SIMH={day:13.75,evening:21.25,night:0.75};
if(!MOMENTS.includes(S.sim))S.sim=null;
function hourNow(){if(S.sim)return SIMH[S.sim];const d=new Date();return d.getHours()+d.getMinutes()/60}
const slotAt=h=>h<6?"late":h<12?"morning":h<16?"lunch":h<20?"afternoon":h<23?"dinner":"late";
const slot=()=>slotAt(hourNow());
const momentOf=h=>h>=6&&h<17?"day":h>=17?"evening":"night";
const moment=()=>S.sim||momentOf(hourNow());
function nowLabel(){const h=hourNow();return String(Math.floor(h)).padStart(2,"0")+":"+String(Math.floor(h%1*60+.001)).padStart(2,"0")}
function palette(){if(S.display==="light")return"day";if(S.display==="dark")return"late";return{day:"day",evening:"dinner",night:"late"}[moment()]}
function applyTheme(){const m=palette();document.documentElement.dataset.mood=m;document.documentElement.dataset.banner=["red","ink","time"].includes(S.banner)?S.banner:"red";$('meta[name="theme-color"]').setAttribute("content",{day:"#E31C13",dinner:"#2A0A08",late:"#110D0C"}[m])}
const today=()=>new Date().getDay();
/* opening hours: parsed from r.hours ("13:00–16:00 · 20:00–23:30"); a close before the open means past midnight */
const hm=x=>{const[a,b]=x.trim().split(":").map(Number);return a+(b||0)/60};
const fmtH=h=>{h=((h%24)+24)%24;return String(Math.floor(h)).padStart(2,"0")+":"+String(Math.round(h%1*60)).padStart(2,"0")};
function spans(r,day){if(r.closed===day)return[];return r.hours.split(" · ").map(seg=>{const[o,c]=seg.split("–").map(hm);return[o,c<=o?c+24:c]})}
/* status at the current (or simulated) hour: open | closing (within 1 h) | opening (within 1 h) | closed, the same 1-hour window Google Maps uses */
const SOON=1;
function hoursState(r){const h=hourNow(),d=today(),prev=(d+6)%7;
  const iv=[...spans(r,d),...spans(r,prev).map(([o,c])=>[o-24,c-24])];
  const on=iv.find(([o,c])=>h>=o&&h<c);
  if(on)return{st:c2s(on[1]-h),at:fmtH(on[1])};
  const next=iv.filter(([o])=>o>h).sort((a,b)=>a[0]-b[0])[0]||spans(r,(d+1)%7).map(([o,c])=>[o+24,c+24])[0];
  if(next&&next[0]-h<=SOON)return{st:"opening",at:fmtH(next[0])};
  return{st:"closed",at:next?fmtH(next[0]):null}}
const c2s=left=>left<=SOON?"closing":"open";
function openNow(r){const s=hoursState(r).st;return s==="open"||s==="closing"}
function closesAt(r){return hoursState(r).at||""}
function hoursText(r){const h=hoursState(r);return h.st==="open"?t("openUntil",h.at):h.st==="closing"?t("closesSoon",h.at):h.st==="opening"?t("opensSoon",h.at):t("closedNow")}
const boardLive=()=>slot()==="lunch";

