"use strict";
/* ============ state ============ */
const S={
  lang:store.get("lang",(navigator.language||"en").toLowerCase().startsWith("es")?"es":"en"),
  display:store.get("display","auto"),banner:store.get("banner","red"),sim:store.get("sim",null),
  onboarded:store.get("onboarded",false),
  me:store.get("me",{name:"Pau Serra",barri:"dreta",local:true,handle:"pauserra"}),
  follow:new Set(store.get("follow",["laia","nuria","jordi","oriol","aisha"])),
  lists:new Set(store.get("lists",["lunch15"])),
  my:store.get("my",SEED_MY),ratings:store.get("ratings",SEED_RATINGS),
  invites:store.get("invites",3),favs:new Set(store.get("favs",["xamfra","raco"])),seen:store.get("seen",{}),
  pv:store.get("pv",{public:true,barri:true,match:true,discover:true,nFriends:true,nMenus:true,nStreak:false}),
  f:{vibe:null,dist:"all",sort:"smile",locals:false,open:false,cuisine:"all"},
  zoom:null,tr:{},route:"now"
};
function persist(){store.set("follow",[...S.follow]);store.set("lists",[...S.lists]);store.set("my",S.my);store.set("ratings",S.ratings);store.set("me",S.me);store.set("invites",S.invites);store.set("onboarded",S.onboarded);store.set("favs",[...S.favs]);store.set("seen",S.seen);store.set("pv",S.pv)}

