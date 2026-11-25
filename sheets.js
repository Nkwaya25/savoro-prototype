"use strict";
/* ============ sheets ============ */
const dlg=$("#dlg");
function openSheet(html,label){dlg.innerHTML=`<div class="shin"><div class="grab"></div>${html}</div>`;dlg.setAttribute("aria-label",label);if(!dlg.open)dlg.showModal()}
const shHead=h=>`<div class="shh"><h2 class="x">${h}</h2><button class="ib solid" type="button" data-act="closedlg" aria-label="${t("close")}">${I("close")}</button></div>`;
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
dlg.addEventListener("close",()=>{if(dlg.dataset.dirty){delete dlg.dataset.dirty;rerender()}});
function openBlock(id){const b=BID[id],st=blockState(b),lv=st==="none"?SHORTB[b.barri]:t("lg_"+st);
  const near=R.filter(r=>r.barri===b.barri&&openNow(r)&&r.block!==id).slice(0,3);
  openSheet(`${shHead(lv)}<p class="lab">${t("blockIn")} ${BARRIS[b.barri]}</p>
   ${b.rs.length?b.rs.map(r=>mini(r)).join(""):""}${!b.rs.some(openNow)?`<p class="small muted">${t("blockQuiet")}</p>${near.map(r=>mini(r)).join("")}`:""}
   <a class="btn ghost" href="#explore" data-act="exblock" data-id="${id}">${I("search")}${t("zoomBtn")}</a>`,lv)}
function openSaveTo(rid){const r=RID[rid];
  openSheet(`${shHead(t("saveTo"))}<div class="mini" style="pointer-events:none">${swatch(r)}<span><b>${esc(r.name)}</b><small>${SHORTB[r.barri]}</small></span></div>
  <div style="display:grid;gap:8px" role="group" aria-label="${t("yourLists")}">${S.my.map(l=>{const on=l.items.includes(rid);return`<button class="opt" type="button" role="checkbox" data-act="togglein" data-list="${l.id}" data-id="${rid}" aria-checked="${on}"><span class="lc" style="background:${l.sys?"#E31C13":l.priv?"#3B2A20":"#0F3550"}">${I(l.sys?"bm":"lists")}</span><span><b>${esc(listName(l))}</b><small>${l.priv?t("private"):t("public")} · ${t("places",l.items.length)}</small></span><span class="box">${on?I("check"):""}</span></button>`}).join("")}</div>
  <button class="btn ghost" type="button" data-act="newlist" data-rid="${rid}">${I("plus")}${t("newList")}</button><button class="btn" type="button" data-act="closedlg">${t("doneB")} ${arcI()}</button>`,t("saveTo"));dlg.dataset.dirty=1}
const CF={name:"",priv:true,collab:false,rid:null};
function openCreate(){openSheet(`${shHead(t("newList"))}<div class="field"><label for="lname">${t("listName")}</label><input id="lname" maxlength="50" placeholder="${t("listNamePh")}" value="${esc(CF.name)}" autocomplete="off"></div>
  <div class="field"><span class="fl">${t("visibility")}</span><div class="seg" role="group"><button type="button" data-act="cfpriv" data-v="1" aria-pressed="${CF.priv}">${I("lock")}${t("private")}</button><button type="button" data-act="cfpriv" data-v="0" aria-pressed="${!CF.priv}">${I("globe")}${t("public")}</button></div></div>
  <button class="switch" type="button" role="switch" data-act="cfcollab" aria-checked="${CF.collab}"><span class="tr"></span>${t("collabT")}</button>
  <button class="btn" type="button" data-act="create" ${CF.name.trim()?"":"disabled"}>${t("create")} ${arcI()}</button>`,t("newList"));
  const n=$("#lname");n.addEventListener("input",()=>{CF.name=n.value;$("[data-act=create]",dlg).disabled=!n.value.trim()});n.addEventListener("keydown",e=>{if(e.key==="Enter"&&n.value.trim()){e.preventDefault();createList()}});setTimeout(()=>n.focus(),60)}
function createList(){const l={id:"l"+Date.now().toString(36),name:CF.name.trim().slice(0,50),priv:CF.priv,items:CF.rid?[CF.rid]:[]};if(CF.collab)l.collab=["laia"];S.my.push(l);persist();toast(t("toastCreated"));
  if(CF.rid)openSaveTo(CF.rid);else{dlg.close();go("my-"+l.id)}}
function openSettings(){const radio=(k,lab,sub)=>`<button class="opt" type="button" role="radio" data-act="setdisp" data-v="${k}" aria-checked="${S.display===k}"><span><b>${lab}</b>${sub?`<small>${sub}</small>`:""}</span><span class="box" style="border-radius:50%">${S.display===k?I("check"):""}</span></button>`;
  const tog=(k,lab,sub)=>`<button class="switch wide" type="button" role="switch" data-act="ptog" data-v="${k}" aria-checked="${!!S.pv[k]}"><span class="tr"></span><span>${lab}${sub?`<br><small class="muted" style="font-weight:500">${sub}</small>`:""}</span></button>`;
  openSheet(`${shHead(t("settings"))}
  <div class="sgrp" style="border:0;padding-top:0"><h3>${t("set_profile")}</h3>
   <div class="avrow">${meAv(72)}<div style="display:grid;gap:8px"><label class="btn ghost sm" style="cursor:pointer">${I("plus")}${t("set_photo")}<input id="avfile" type="file" accept="image/*" class="sr"></label>${S.me.photo?`<button class="lab" type="button" data-act="rmphoto" style="min-height:36px;text-align:left">${t("set_rmphoto")}</button>`:""}</div></div>
   <div class="field"><label for="sname">${t("set_name")}</label><input id="sname" value="${esc(S.me.name)}" maxlength="40" autocomplete="name"></div>
   <div class="field"><label for="shandle">${t("set_handle")}</label><input id="shandle" value="@${esc(S.me.handle||"pauserra")}" maxlength="24" autocomplete="username"></div>
   <div class="field"><label for="sbio">${t("set_bio")}</label><input id="sbio" value="${esc(S.me.bio||"")}" maxlength="80" placeholder="${t("set_bioPh")}"></div>
   <div class="field"><label for="sbarri">${t("set_barri")}</label><select id="sbarri">${ALLB.map(b=>`<option value="${b}" ${S.me.local&&S.me.barri===b?"selected":""}>${BARRIS[b]}</option>`).join("")}<option value="visit" ${!S.me.local?"selected":""}>${t("o_visit")}</option></select></div></div>
  <div class="sgrp"><h3>${t("set_privacy")}</h3>${tog("public",t("pv_public"),t("pv_publicS"))}${tog("barri",t("pv_barri"))}${tog("match",t("pv_match"))}${tog("discover",t("pv_discover"))}<p class="small muted">${I("lock").replace("<svg",'<svg width="14" height="14" style="display:inline;vertical-align:-2px"')} ${t("pv_note")}</p></div>
  <div class="sgrp"><h3>${t("set_notif")}</h3>${tog("nFriends",t("nt_friends"))}${tog("nMenus",t("nt_menus"))}${tog("nStreak",t("nt_streak"))}</div>
  <div class="sgrp"><h3>${t("set_lang")}</h3><div class="seg" role="group"><button type="button" data-act="setlang" data-v="es" aria-pressed="${S.lang==="es"}">Español</button><button type="button" data-act="setlang" data-v="en" aria-pressed="${S.lang==="en"}">English</button></div></div>
  <div class="sgrp"><h3>${t("set_display")}</h3>${radio("auto",t("disp_auto"),t("disp_autoS"))}${radio("light",t("disp_light"))}${radio("dark",t("disp_dark"))}</div>
  <div class="sgrp"><h3>${t("set_banner")}</h3><div class="bans" role="radiogroup" aria-label="${t("set_banner")}">${[["red",t("ban_red")],["ink",t("ban_ink")],["time",t("ban_time"),t("ban_timeS")]].map(([k,lab,sub])=>`<button class="opt" type="button" role="radio" data-act="setbanner" data-v="${k}" aria-checked="${S.banner===k}"><span class="bsw b-${k}" aria-hidden="true"></span><span><b>${lab}</b>${sub?`<small>${sub}</small>`:""}</span><span class="box" style="border-radius:50%">${S.banner===k?I("check"):""}</span></button>`).join("")}</div></div>
  <div class="sgrp"><h3>${t("set_account")}</h3><div class="field"><label for="semail">${t("set_email")}</label><input id="semail" type="email" value="pau@example.com" autocomplete="email"></div>
   <button class="linkrow" type="button" data-act="acc">${I("down")}${t("acc_export")}</button><button class="linkrow" type="button" data-act="acc">${I("back")}${t("acc_signout")}</button><button class="linkrow" type="button" data-act="acc" style="color:var(--acc)">${I("close")}${t("acc_delete")}</button></div>
  <div class="sgrp"><div class="proto"><p class="lab" style="color:var(--ink)">${t("proto")}</p><div class="seg" role="group"><button type="button" data-act="setsim" data-v="" aria-pressed="${!S.sim}">${t("live")}</button>${MOMENTS.map(m=>`<button type="button" data-act="setsim" data-v="${m}" aria-pressed="${S.sim===m}">${t("moments")[m]}</button>`).join("")}</div><p class="small muted">${t("protoP")}</p>
   <button class="linkrow" type="button" data-act="replay">${I("spark")}${t("replay")}</button><button class="linkrow" type="button" data-act="resetdata">${I("close")}${t("resetData")}</button></div></div>
  <div class="sgrp"><a class="linkrow" href="#how">${I("how")}${t("how")}</a><a class="linkrow" href="#biz">${I("biz")}${t("biz")}</a><p class="small muted">${t("placeholder")}</p></div>`,t("settings"));
  const keep=(id,fn)=>$(id).addEventListener("change",e=>{fn(e.target.value);persist();dlg.dataset.dirty=1});
  keep("#sname",v=>{S.me.name=v.trim()||"Pau Serra"});keep("#shandle",v=>{S.me.handle=v.replace(/[^\w.]/g,"").slice(0,24)||"pauserra"});keep("#sbio",v=>{S.me.bio=v.trim().slice(0,80)});
  keep("#sbarri",v=>{if(v==="visit")S.me.local=false;else{S.me.local=true;S.me.barri=v}})}
/* profile photo: shrink to 192px so it fits in local storage */
function setPhoto(file){if(!file||!/^image\//.test(file.type))return;const fr=new FileReader();fr.onload=()=>{const img=new Image();img.onload=()=>{const c=document.createElement("canvas"),s=192;c.width=c.height=s;const x=c.getContext("2d"),m=Math.min(img.width,img.height);x.drawImage(img,(img.width-m)/2,(img.height-m)/2,m,m,0,0,s,s);
  const prev=S.me.photo;S.me.photo=c.toDataURL("image/jpeg",.82);try{localStorage.setItem("savoro3:me",JSON.stringify(S.me))}catch(e){}toast(t("photoSaved"));dlg.dataset.dirty=1;openSettings()};img.src=fr.result};fr.readAsDataURL(file)}
document.addEventListener("change",e=>{if(e.target.id==="avfile")setPhoto(e.target.files[0])});

