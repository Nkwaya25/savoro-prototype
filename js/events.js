"use strict";
/* ============ events ============ */
document.addEventListener("click",e=>{const el=e.target.closest("[data-act]");if(!el)return;const a=el.dataset.act,id=el.dataset.id;
  switch(a){
  case"search":e.preventDefault();openSearch(el.dataset.q,el.dataset.tab);break;
  case"closesearch":closeSearch();break;
  case"stab":SR.tab=el.dataset.v;renderSearch(true);break;
  case"sq":SR.q=el.dataset.q;$("#sq").value=SR.q;$("#sres").innerHTML=searchResults();$("#sq").focus();break;
  case"settings":openSettings();break;
  case"closedlg":dlg.close();break;
  case"setlang":S.lang=el.dataset.v;store.set("lang",S.lang);rerender();openSettings();break;
  case"setbanner":S.banner=el.dataset.v;store.set("banner",S.banner);applyTheme();rerender();openSettings();break;
  case"setdisp":S.display=el.dataset.v;store.set("display",S.display);applyTheme();rerender();openSettings();break;
  case"seen":S.seen[el.dataset.v]=1;persist();{const c=el.closest(".explain");if(c)c.remove()}break;
  case"fav":e.preventDefault();S.favs.has(id)?(S.favs.delete(id),toast(t("toastUnfollow"))):(S.favs.add(id),toast(t("favOn")));persist();rerender();break;
  case"busyrep":$$("[data-act=busyrep]").forEach(b=>b.setAttribute("aria-pressed",b===el));toast(t("busyThanks"));break;
  case"mzoom":mapZoom(el.dataset.v);break;
  case"mreset":mapReset();break;
  case"mlocate":mapLocate();break;
  case"exblock":{const b=BID[id];if(S.f.dist!=="all"&&(S.f.dist==="gracia")!==(b.d==="gracia"))S.f.dist="all";EX.block=id;EX.vb=fitVB(b.cx,b.cy,300);break}
  case"ptog":S.pv[el.dataset.v]=!S.pv[el.dataset.v];el.setAttribute("aria-checked",!!S.pv[el.dataset.v]);persist();break;
  case"acc":toast(t("protoToast"));break;
  case"rmphoto":delete S.me.photo;persist();dlg.dataset.dirty=1;openSettings();break;
  case"setsim":S.sim=el.dataset.v||null;store.set("sim",S.sim);applyTheme();rerender();openSettings();break;
  case"replay":dlg.close();openOnb();break;
  case"resetdata":store.clear();S.my=JSON.parse(JSON.stringify(SEED_MY));S.ratings=JSON.parse(JSON.stringify(SEED_RATINGS));S.follow=new Set(["laia","nuria","jordi","oriol","aisha"]);S.lists=new Set(["lunch15"]);S.invites=3;S.me={name:"Pau Serra",barri:"dreta",local:true,handle:"pauserra"};S.onboarded=true;persist();dlg.close();rerender();toast(t("resetDone"));break;
  case"rate":e.preventDefault();openRate(id||null);break;
  case"back":{STACK.pop();const prev=STACK.pop()||"now";go(prev);break}
  case"saveto":e.preventDefault();e.stopPropagation();openSaveTo(id);break;
  case"togglein":{const l=MYID()[el.dataset.list];const i=l.items.indexOf(id);if(i>=0){l.items.splice(i,1);toast(t("toastRemoved",listName(l)))}else{l.items.push(id);toast(t("toastSaved",listName(l)))}persist();openSaveTo(id);break}
  case"newlist":Object.assign(CF,{name:"",priv:true,collab:false,rid:el.dataset.rid||null});openCreate();break;
  case"cfpriv":CF.priv=el.dataset.v==="1";$$("[data-act=cfpriv]",dlg).forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===(CF.priv?"1":"0")));break;
  case"cfcollab":CF.collab=!CF.collab;el.setAttribute("aria-checked",CF.collab);break;
  case"create":createList();break;
  case"togglepub":{const l=MYID()[id];l.priv=!l.priv;persist();toast(l.priv?t("toastPrivate"):t("toastPublic"));rerender();break}
  case"removefrom":{e.preventDefault();const l=MYID()[el.dataset.list];l.items=l.items.filter(x=>x!==id);persist();toast(t("toastRemoved",listName(l)));rerender();break}
  case"copylink":copy(linkFor(el.dataset.v),t("linkCopied"));break;
  case"invite":if(S.invites>0){S.invites--;persist();copy(el.dataset.v,t("codeCopied"));rerender()}break;
  case"followl":e.preventDefault();S.lists.has(id)?(S.lists.delete(id),toast(t("toastUnfollow"))):(S.lists.add(id),toast(t("toastFollow")));persist();OB.open?renderOnb():rerender();break;
  case"followp":e.preventDefault();S.follow.has(id)?(S.follow.delete(id),toast(t("toastUnfollow"))):(S.follow.add(id),toast(t("toastFollow")));persist();OB.open?renderOnb():rerender();break;
  case"translate":{const k=id+el.dataset.i;S.tr[k]=!S.tr[k];const r=RID[id],i=+el.dataset.i;el.closest(".tk").outerHTML=takeHTML(r,r.takes[i],i);break}
  case"trfeed":{const i=+el.dataset.i;S.tr["f"+i]=!S.tr["f"+i];el.closest(".post").outerHTML=post(FEED[i],i);break}
  case"who":{const box=$("#scorebox");if(box)box.innerHTML=scoreBox(RID[id],el.dataset.v);break}
  case"wrong":toast(t("wrongT"));break;
  case"toast":toast(el.dataset.v);break;
  case"vibe":S.f=Object.assign(S.f,{vibe:el.dataset.v==="locals"?null:el.dataset.v,locals:el.dataset.v==="locals",open:false});break;
  case"fvibe":S.f.vibe=S.f.vibe===el.dataset.v?null:el.dataset.v;refreshExplore();break;
  case"fsort":S.f.sort=el.dataset.v;refreshExplore();break;
  case"flocals":S.f.locals=!S.f.locals;refreshExplore();break;
  case"fopen":S.f.open=!S.f.open;refreshExplore();break;
  case"fdist":S.f.dist=el.dataset.v;EX.block=null;EX.vb=null;refreshExplore();break;
  case"fdistgo":S.f.dist=el.dataset.v;EX.block=null;EX.vb=null;break;
  case"freset":Object.assign(S.f,{vibe:null,dist:"all",open:false,locals:false});EX.block=null;EX.vb=null;refreshExplore();break;
  case"pick":RF.rid=id;$$(".pick",rateEl).forEach(p=>{const on=p.dataset.id===id;p.setAttribute("aria-checked",on);p.querySelector(".tick").innerHTML=on?I("check"):""});$("[data-act=rnext]",rateEl).disabled=false;{const mine=myMap()[id];RF.v=mine!=null?mine:.5}break;
  case"dish":{const d=el.dataset.d;RF.dishes.has(d)?RF.dishes.delete(d):RF.dishes.add(d);el.setAttribute("aria-pressed",RF.dishes.has(d));break}
  case"duel":duel(el.dataset.v);break;
  case"rnext":rateNext();break;
  case"rback":RF.step=RF.step===4&&RF.used.length===0?2:RF.step===4?3:RF.step-1;if(RF.step===3){RF.used.pop();RF.round=Math.max(0,RF.round-1);RF.cand=duelCandidate()}renderRate();break;
  case"rclose":closeRate();break;
  case"ranother":clearTimeout(RF.auto);Object.assign(RF,{intro:true,step:1,rid:null,v:.5,take:"",dishes:new Set(),q:"",used:[],cand:null,round:0,stamp:false,block:false,from:1});renderRate();break;
  case"olang":S.lang=S.lang==="es"?"en":"es";store.set("lang",S.lang);renderOnb();renderChrome();break;
  case"onext":onbNext();break;
  case"oback":OB.step=Math.max(0,OB.step-1);renderOnb();break;
  case"oskip":S.onboarded=true;persist();closeOnb();break;
  case"obarri":if(el.dataset.v==="visit"){OB.local=false}else{OB.local=true;OB.barri=el.dataset.v}renderOnb();break;
  case"ocal":{const v=el.dataset.v==="x"?"x":+el.dataset.v;OB.cal[id]=OB.cal[id]===v?undefined:v;if(OB.cal[id]===undefined)delete OB.cal[id];const y=$(".obd",obEl).scrollTop;renderOnb();$(".obd",obEl).scrollTop=y;break}
  case"ofinish":onbFinish();break;
  }});
srEl.addEventListener("click",e=>{if(e.target.closest("a[href]"))closeSearch(true)});
rateEl.addEventListener("click",e=>{if(e.target.closest("a[href]"))closeRate(true)});
document.addEventListener("dblclick",e=>{if(e.target.closest(".pick"))rateNext()});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){if(RF.open){e.preventDefault();closeRate();return}if(SR.open){e.preventDefault();closeSearch();return}}
  if(e.key==="/"&&!RF.open&&!SR.open&&!OB.open&&!dlg.open&&!/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();openSearch()}
  const ov=RF.open?rateEl:SR.open?srEl:OB.open?obEl:null;
  if(e.key==="Tab"&&ov){const f=$$('button:not([disabled]),a[href],input,textarea,[tabindex="0"]',ov).filter(x=>x.offsetParent!==null);if(!f.length)return;const a=f[0],z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
addEventListener("scroll",()=>$("#top").classList.toggle("sc",scrollY>6),{passive:true});
addEventListener("hashchange",route);
/* every minute: follow the time of day, and repaint the map when a kitchen opens, closes or enters its last hour */
const openSig=()=>R.map(r=>hoursState(r).st[0]).join("");let lastSig=openSig();
setInterval(()=>{const sig=openSig(),moved=sig!==lastSig;lastSig=sig;
  if(!S.sim&&document.documentElement.dataset.mood!==palette()){applyTheme();rerender()}
  else if(moved&&S.route==="now"&&!RF.open&&!SR.open&&!dlg.open)rerender();
  else if(moved&&S.route==="explore")refreshExplore();
  else renderChrome()},60000);
applyTheme();route();if(!S.onboarded)openOnb();

