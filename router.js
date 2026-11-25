"use strict";
/* ============ router ============ */
const view=$("#view");let first=true;
const ROUTES=[[/^now$/,pageNow],[/^explore$/,pageExplore],[/^r-([\w-]+)$/,pageR],[/^lists$/,pageLists],[/^list-([\w-]+)$/,pageList],[/^my-([\w-]+)$/,pageMy],[/^u-([\w-]+)$/,pageU],[/^me$/,pageMe],[/^how$/,pageHow],[/^biz$/,pageBiz]];
function resolve(h){for(const[re,f]of ROUTES){const m=h.match(re);if(m)return()=>f(m[1])}return pageNow}
const current=()=>(location.hash||"").replace(/^#/,"")||"now";
function paint(){view.innerHTML=resolve(S.route)();bindView();renderChrome()}
function go(h){if(current()===h){scrollTo({top:0,behavior:reduced.matches?"auto":"smooth"});return}location.hash=h}
const STACK=[];
function route(){S.route=current();if(STACK[STACK.length-1]!==S.route)STACK.push(S.route);closeSearch(true);if(RF.open)closeRate(true);if(dlg.open)dlg.close();
  if(first||reduced.matches){paint();if(!first){scrollTo(0,0);focusTitle()}first=false;return}
  view.classList.add("out");setTimeout(()=>{paint();scrollTo(0,0);view.classList.remove("out");view.classList.add("in");void view.offsetWidth;view.classList.remove("in");focusTitle()},170)}
function focusTitle(){const h=$("h1",view);if(h)h.focus({preventScroll:true})}
function rerender(){const y=scrollY;paint();scrollTo(0,y)}
let toastT;function toast(msg){const el=$("#toast");el.innerHTML=smile(.85,{w:22,h:9,sw:3,c:"#FFA800"})+esc(msg);el.classList.add("on");clearTimeout(toastT);toastT=setTimeout(()=>el.classList.remove("on"),2300)}
function copy(text,msg){try{if(navigator.clipboard)navigator.clipboard.writeText(text).catch(()=>{})}catch(e){}toast(msg)}
const linkFor=v=>location.href.split("#")[0]+"#"+v;

