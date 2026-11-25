"use strict";
/* ============ smile primitives ============ */
function smilePath(v,w,h,pad,sq){pad=pad||6;sq=sq||0;const x0=pad+sq,x1=w-pad-sq,base=h*.3,y0=base-v*h*.12,cy=base+v*h*.95;return`M${x0.toFixed(1)} ${y0.toFixed(1)} Q${w/2} ${cy.toFixed(1)} ${x1.toFixed(1)} ${y0.toFixed(1)}`}
function smile(v,o){o=o||{};const w=o.w||40,h=o.h||17,sw=o.sw||3.6;return`<svg class="smile" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true" style="overflow:visible;flex:none"><path d="${smilePath(v,w,h,sw)}" fill="none" stroke="${o.c||"var(--smile)"}" stroke-width="${sw}" stroke-linecap="round"/></svg>`}
const arcI=()=>`<svg class="arc" viewBox="0 0 20 9" aria-hidden="true" style="overflow:visible"><path d="M2 2 Q10 12 18 2" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>`;
const sc=v=>(v*10).toFixed(1).replace(".",S.lang==="es"?",":".");
const wordOf=v=>t("words")[Math.min(4,Math.floor(clamp(v)*5))];
const eur=n=>S.lang==="es"?n.toFixed(2).replace(".",",").replace(",00","")+" €":"€"+n.toFixed(2).replace(".00","");
const num=n=>n.toLocaleString(S.lang==="es"?"es-ES":"en-GB");
const scoreTag=(v,o)=>`<span class="sc">${smile(v,o)}<b class="num">${sc(v)}</b></span>`;

/* ============ icons ============ */
const ic=(d,c,extra)=>`<svg ${c?`class="${c}" `:""}viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra||""}>${d}</svg>`;
const IC={
 now:'<path d="M8.5 3h7L21 8.5v7L15.5 21h-7L3 15.5v-7z"/><path d="M8.5 13q3.5 3.2 7 0"/>',
 explore:'<path d="M12 2.5l3 3-3 3-3-3z"/><path d="M5.5 9l3 3-3 3-3-3z"/><path d="M18.5 9l3 3-3 3-3-3z"/><path d="M12 15.5l3 3-3 3-3-3z"/>',
 rate:'<path d="M4 9q8 11 16 0" stroke-width="2.8"/>',
 lists:'<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><path d="M14 17h6M17 14v6"/>',
 me:'<rect x="4" y="3" width="16" height="18" rx="3"/><circle cx="12" cy="10" r="3"/><path d="M8.5 16.5q3.5 2.2 7 0"/>',
 biz:'<path d="M4 10v10h16V10"/><path d="M3 10l2-6h14l2 6"/><path d="M3 10q2.25 2 4.5 0t4.5 0 4.5 0 4.5 0"/>',
 how:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r=".6" fill="currentColor"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
 close:'<path d="M6 6l12 12M18 6L6 18"/>',back:'<path d="M15 5l-7 7 7 7"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
 lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
 nav:'<path d="M3 11l18-8-8 18-2-8z"/>',pin:'<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
 dish:'<circle cx="12" cy="13" r="7"/><path d="M3 20h18M12 3v3"/>',down:'<path d="M12 5v14M6 13l6 6 6-6"/>',check:'<path d="M5 12l5 5L20 7"/>',
 bm:'<path d="M6 3h12v18l-6-4-6 4z"/>',flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',route:'<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
 up:'<path d="M12 19V5M6 11l6-6 6 6"/>',eq:'<path d="M5 9h14M5 15h14"/>',spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>'
};
const I=(k,c)=>ic(IC[k],c);

/* ============ motifs (illustrated placeholders until real photos) ============ */
function motif(r,cls){const a=r.c2,f=r.fg,b=r.c1;let g="";switch(r.motif){
 case"pan":g=`<ellipse cx="100" cy="120" rx="78" ry="30" fill="${a}"/><ellipse cx="100" cy="112" rx="66" ry="22" fill="${b}" opacity=".55"/><rect x="168" y="104" width="30" height="12" rx="6" fill="${a}"/><circle cx="78" cy="108" r="10" fill="${f}"/><circle cx="104" cy="114" r="12" fill="${f}" opacity=".85"/><circle cx="126" cy="104" r="8" fill="${f}"/><path d="M60 70q10-20 0-36M98 66q10-20 0-36M136 70q10-20 0-36" stroke="${f}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>`;break;
 case"glass":g=`<rect x="34" y="112" width="132" height="12" rx="6" fill="${f}" opacity=".7"/>${[[60,90],[100,80],[140,94]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="24" ry="20" fill="${a}"/><circle cx="${x-6}" cy="${y-6}" r="5" fill="${b}" opacity=".6"/>`).join("")}<path d="M100 60v-26M92 40q8-10 16 0" stroke="${f}" stroke-width="5" stroke-linecap="round" fill="none"/>`;break;
 case"tomato":g=`<rect x="30" y="86" width="130" height="70" rx="22" fill="${a}" transform="rotate(-8 95 120)"/><circle cx="140" cy="72" r="38" fill="${f}"/><path d="M128 38q12 8 24 0M140 34v12" stroke="#2F7A3B" stroke-width="6" stroke-linecap="round"/><path d="M50 112q16 10 34-2q18-10 36 2" stroke="${b}" stroke-width="6" fill="none" opacity=".5" stroke-linecap="round"/>`;break;
 case"fish":g=`<path d="M30 100q50-56 116 0q-66 56-116 0z" fill="${a}"/><path d="M146 100l38-30v60z" fill="${a}"/><circle cx="62" cy="92" r="7" fill="${b}"/><path d="M84 78q14 22 0 44M106 76q14 24 0 48" stroke="${b}" stroke-width="4" fill="none" opacity=".45"/><path d="M40 150q20-10 40 0t40 0 40 0" stroke="${f}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>`;break;
 case"flame":g=`<path d="M100 22q42 44 34 94q-6 46-34 54q-38-8-40-50q-2-30 18-50q-2 26 14 30q-10-40 8-78z" fill="${a}"/><path d="M100 96q22 22 12 50q-8 14-14 16q-18-6-16-26q2-18 18-40z" fill="${f}"/><path d="M40 178h120" stroke="${f}" stroke-width="8" stroke-linecap="round"/>`;break;
 case"bowl":g=`<path d="M28 100h144q-8 70-72 70t-72-70z" fill="${a}"/><path d="M28 100h144" stroke="${f}" stroke-width="6" stroke-linecap="round"/><path d="M110 92l60-70M124 94l52-62" stroke="${f}" stroke-width="5" stroke-linecap="round"/><path d="M62 74q10-16 0-32M90 74q10-16 0-32" stroke="${f}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".65"/>`;break;
 case"pasta":g=`<circle cx="100" cy="108" r="76" fill="${f}" opacity=".18"/><circle cx="100" cy="108" r="60" fill="${a}"/><path d="M100 108m-8 0a8 8 0 1 1 16 0a16 16 0 1 1-32 0a24 24 0 1 1 48 0a32 32 0 1 1-64 0" fill="none" stroke="${b}" stroke-width="5" stroke-linecap="round"/><path d="M150 30l-30 60" stroke="${a}" stroke-width="6" stroke-linecap="round"/>`;break;
 case"rice":g=`<ellipse cx="100" cy="112" rx="84" ry="54" fill="${a}"/><ellipse cx="100" cy="106" rx="70" ry="42" fill="${f}" opacity=".22"/>${[[70,96],[96,118],[124,98],[84,128],[136,120],[110,88]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="${b}"/>`).join("")}<path d="M118 70l26-16 6 22z" fill="#FFE36B"/><rect x="10" y="104" width="22" height="12" rx="6" fill="${a}"/><rect x="168" y="104" width="22" height="12" rx="6" fill="${a}"/>`;break;
 case"croqueta":g=`${[[64,92,-20],[110,120,10],[140,80,30]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="34" ry="20" fill="${a}" transform="rotate(${r} ${x} ${y})"/><ellipse cx="${x-6}" cy="${y-5}" rx="14" ry="6" fill="${f}" opacity=".35" transform="rotate(${r} ${x} ${y})"/>`).join("")}<path d="M30 160h140" stroke="${f}" stroke-width="6" stroke-linecap="round" opacity=".6"/>`;break;
 case"croissant":g=`<path d="M24 120q20-70 76-74q56 4 76 74q-26-16-40-12q-10-30-36-32q-26 2-36 32q-14-4-40 12z" fill="${a}"/><path d="M70 80l12 34M100 66v40M130 80l-12 34" stroke="${b}" stroke-width="5" stroke-linecap="round" opacity=".45"/><circle cx="160" cy="160" r="16" fill="none" stroke="${a}" stroke-width="5"/>`;break;
 case"curry":g=`<path d="M30 104h140q-6 60-70 60t-70-60z" fill="${a}"/><ellipse cx="100" cy="104" rx="70" ry="14" fill="${f}" opacity=".85"/><path d="M128 38q24 6 22 36q-2 18-12 22q4-30-16-40z" fill="#E31C13"/><path d="M128 38q-4-10 4-16" stroke="#2F7A3B" stroke-width="5" stroke-linecap="round" fill="none"/>`;break;
 case"sushi":g=`${[[40,90],[96,104],[150,88]].map(([x,y])=>`<rect x="${x-26}" y="${y}" width="52" height="34" rx="14" fill="${f}"/><rect x="${x-28}" y="${y-14}" width="56" height="24" rx="12" fill="${a}"/>`).join("")}<path d="M30 160l140-20M36 172l140-20" stroke="${f}" stroke-width="5" stroke-linecap="round" opacity=".7"/>`;break;
 case"taco":g=`<path d="M24 140a76 76 0 0 1 152 0z" fill="${a}"/><path d="M40 136q10-30 28-24q10-26 32-18q22-12 34 12q20-6 26 30" fill="none" stroke="${f}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><circle cx="76" cy="118" r="7" fill="#E31C13"/><circle cx="124" cy="112" r="7" fill="#E31C13"/><path d="M24 140h152" stroke="${f}" stroke-width="5"/>`;break;
 case"cup":g=`<ellipse cx="96" cy="150" rx="74" ry="16" fill="${f}" opacity=".35"/><path d="M44 80h104v30a52 52 0 0 1-104 0z" fill="${a}"/><path d="M148 92q28 0 26 20t-30 18" fill="none" stroke="${a}" stroke-width="9"/><ellipse cx="96" cy="80" rx="52" ry="10" fill="${b}"/><path d="M76 60q10-14 0-30M104 60q10-14 0-30" stroke="${f}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>`;break;
}return`<svg ${cls?`class="${cls}" `:""}viewBox="0 0 200 200" aria-hidden="true">${g}</svg>`}
const swatch=(r,cls)=>`<span class="sw${cls?" "+cls:""}" style="background:${r.c1}">${motif(r)}</span>`;
const pAv=(p,sz)=>`<span class="av" style="background:${p.c}${sz?`;width:${sz}px;height:${sz}px;font-size:${Math.round(sz*.32)}px`:""}">${initials(p.n)}</span>`;
const meAv=sz=>S.me.photo?`<span class="av" role="img" aria-label="${esc(S.me.name)}" style="background:#FFA800 url('${S.me.photo}') center/cover${sz?`;width:${sz}px;height:${sz}px`:""}"></span>`:`<span class="av" style="background:#FFA800;color:#3A0A06${sz?`;width:${sz}px;height:${sz}px;font-size:${Math.round(sz*.32)}px`:""}">${initials(S.me.name)}</span>`;

