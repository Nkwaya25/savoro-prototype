"use strict";
/* ============ placeholder data: every place, person, dish, take and number is invented ============ */
const BARRIS={santantoni:"Sant Antoni",nova:"Nova Esquerra de l'Eixample",antiga:"Antiga Esquerra de l'Eixample",dreta:"Dreta de l'Eixample",sagrada:"Sagrada Família",fortpienc:"Fort Pienc",gracia:"Vila de Gràcia"};
const SHORTB={santantoni:"Sant Antoni",nova:"Nova Esquerra",antiga:"Antiga Esquerra",dreta:"Dreta",sagrada:"Sagrada Família",fortpienc:"Fort Pienc",gracia:"Gràcia"};
const ALLB=["santantoni","nova","antiga","dreta","sagrada","fortpienc","gracia"];
const CUIS={catalan:["Catalan","Catalana"],tapas:["Tapas","Tapas"],seafood:["Seafood","Marisco"],grill:["Grill","Brasa"],asian:["Vietnamese","Vietnamita"],italian:["Italian","Italiana"],rice:["Rice","Arroces"],bakery:["Bakery","Panadería"],cafe:["Granja & café","Granja y café"],indian:["Indian","India"],japanese:["Japanese","Japonesa"],mexican:["Mexican","Mexicana"]};
const VIBES=[["menu",["Menú under €15","Menú por menos de 15 €"]],["vermut",["Vermut","Vermut"]],["terraza",["Terrace","Terraza"]],["brunch",["Breakfast & brunch","Desayuno y brunch"]],["date",["Date night","Para una cita"]],["solo",["Eating solo","Comer solo"]],["late",["Open late","Abierto hasta tarde"]],["cheap",["Cheap & good","Bueno y barato"]]];

const R=[
 {id:"xamfra",name:"La Fonda del Xamfrà",cuisine:"catalan",price:1,menu:13,block:"e:3:3",sL:.92,sV:.86,nL:441,nV:89,c1:"#E31C13",c2:"#FFE2A8",fg:"#FFF6EA",motif:"tomato",slots:"l",hours:"13:00–16:00",closed:0,street:"Carrer de Girona",tags:["menu","cheap","solo"],
  board:{p:["Escudella barrejada","Amanida de tomàquet i ventresca","Faves a la catalana"],s:["Fricandó amb moixernons","Lluç a la planxa","Botifarra amb mongetes"],d:["Mató amb mel","Crema catalana","Fruita"]},
  dishes:[["Fricandó",52],["Pa amb tomàquet",49],["Escudella barrejada",33],["Mató amb mel",21]],
  takes:[{u:"Carla S.",v:.95,lang:"en",loc:1,t:"Thirteen euros for three courses and the best fricandó in the Dreta. The corner table gets the light at two."},{u:"Oriol B.",v:.9,lang:"es",loc:1,t:"Comida de casa sin filtros de Instagram. El mató con miel me reconcilió con el lunes."},{u:"Hannah W.",v:.86,lang:"en",loc:1,t:"No menu in English and no need for one. Point at what the next table is having and smile back."}]},
 {id:"merce",name:"Bodega Mercè Vella",cuisine:"catalan",price:2,menu:14.5,block:"e:-10:-2",sL:.87,sV:.83,nL:318,nV:94,c1:"#8E1B10",c2:"#FFA800",fg:"#FFF1DE",motif:"pan",slots:"ld",hours:"13:00–16:00 · 20:00–23:30",closed:1,street:"Carrer del Parlament",tags:["menu","vermut","date"],
  board:{p:["Canelons de l'àvia","Crema de carbassa","Esqueixada"],s:["Bacallà amb samfaina","Galta de porc al vi negre","Truita amb suc"],d:["Crema cremada","Flam de la casa","Iogurt amb mel"]},
  dishes:[["Canelons de l'àvia",61],["Bacallà amb samfaina",38],["Crema cremada",27],["Truita amb suc",22]],
  takes:[{u:"Núria P.",v:.9,lang:"en",loc:1,t:"The canelons taste like a Sunday at my grandmother's, béchamel and all. Go at 13:30 or queue with half of Sant Antoni."},{u:"Marc R.",v:.8,lang:"es",loc:1,t:"Menú de 14,50 con vino y postre, sin trampa. El bacalao con samfaina es lo mejor de mi semana."},{u:"Aisha K.",v:.85,lang:"en",loc:1,t:"Loud, warm, perfectly unpretentious. The waiter called me reina and topped up my water without asking."}]},
 {id:"raco",name:"El Racó d'en Pau",cuisine:"tapas",price:1,menu:12,block:"g@sol",sL:.86,sV:.79,nL:301,nV:88,c1:"#3A1E4A",c2:"#FFA800",fg:"#F6ECFF",motif:"croqueta",slots:"ladn",hours:"12:00–01:30",closed:1,street:"Plaça del Sol",tags:["menu","terraza","vermut","late","cheap"],
  board:{p:["Amanida de cigrons","Gaspatxo","Patates braves"],s:["Croquetes de rostit","Truita de patates","Calamars a la romana"],d:["Flam","Fruita del temps"]},
  dishes:[["Croquetes de rostit",55],["Truita de patates",41],["Pebrots de Padró",23],["Bunyols de bacallà",19]],
  takes:[{u:"Pau G.",v:.88,lang:"es",loc:1,t:"Las croquetas de rostit son las de mi abuela, pero más crujientes. La terraza de la plaza es oro en octubre."},{u:"Chloé L.",v:.82,lang:"en",loc:0,t:"A proper Gràcia bar: tiles, football on mute, everyone knows everyone. The tortilla is runny in the middle, as it should be."},{u:"Biel F.",v:.84,lang:"ca",loc:1,t:"Menú de 12 euros a migdia i tapes fins tard. El millor de la vila sense fer soroll.",tr:{en:"A €12 lunch menu and tapas until late. The best of the neighbourhood, without the noise.",es:"Menú de 12 euros a mediodía y tapas hasta tarde. Lo mejor del barrio sin hacer ruido."}}]},
 {id:"lluna",name:"Forn Lluna Plena",cuisine:"bakery",price:1,menu:null,block:"g@verdi",sL:.88,sV:.85,nL:262,nV:82,c1:"#FFE7BE",c2:"#E31C13",fg:"#3A1A06",motif:"croissant",slots:"mla",hours:"07:30–19:00",closed:1,street:"Carrer de Verdi",tags:["brunch","solo","cheap"],
  dishes:[["Croissant de mantega",63],["Cafè d'especialitat",40],["Coca de vidre",31],["Ou benedict amb sobrassada",28]],
  takes:[{u:"Laia N.",v:.9,lang:"en",loc:1,t:"The butter croissant shatters exactly the way it should. Come before ten or the coca de vidre is gone."},{u:"Hugo M.",v:.86,lang:"es",loc:1,t:"El huevo benedict con sobrasada debería ser patrimonio. Café de especialidad sin postureo."},{u:"Priya S.",v:.85,lang:"en",loc:0,t:"My Saturday ritual. Small, bright, and the staff remember how you take your coffee."}]},
 {id:"saigon",name:"Kiosc Saigon Nou",cuisine:"asian",price:1,menu:11.5,block:"e:9:1",sL:.88,sV:.69,nL:251,nV:51,c1:"#1E5A3C",c2:"#FFA800",fg:"#EAF7EE",motif:"bowl",slots:"mlad",hours:"09:00–22:30",closed:2,street:"Carrer de Sardenya",tags:["menu","solo","cheap"],
  board:{p:["Rotlles d'estiu","Sopa miso de verdures","Amanida de papaia"],s:["Phở de vedella","Bánh mì de porc","Arròs amb pollastre caramel·litzat"],d:["Cafè amb llet condensada","Fruita"]},
  dishes:[["Phở de vedella",58],["Bánh mì de porc",47],["Cafè amb llet condensada",30],["Rotlles d'estiu",22]],
  takes:[{u:"Linh T.",v:.85,lang:"en",loc:1,t:"The broth is cooked overnight and you can taste every hour of it. The bánh mì bread is baked two streets away."},{u:"David O.",v:.8,lang:"es",loc:1,t:"Mi comida de los jueves desde hace un año. Rápido, barato y siempre con una sonrisa."},{u:"Greta S.",v:.66,lang:"en",loc:0,t:"Tiny and a bit hard to find. Good soup, but I expected more from the hype."}]},
 {id:"tendre",name:"Casa Tendre",cuisine:"tapas",price:1,menu:null,block:"e:-4:5",sL:.81,sV:.72,nL:209,nV:59,c1:"#FFA800",c2:"#B8140D",fg:"#2A0D08",motif:"glass",slots:"adn",hours:"18:00–02:00",closed:0,street:"Carrer d'Aribau",tags:["vermut","late","cheap"],
  dishes:[["Bombes picants",44],["Patates braves",35],["Anxoves de l'Escala",19],["Pebrots farcits",16]],
  takes:[{u:"Jordi V.",v:.8,lang:"ca",loc:1,t:"Les bombes piquen el just i les braves són de veritat. El millor racó per començar la nit.",tr:{en:"The bombas are just spicy enough and the bravas are the real thing. The best corner to start the night.",es:"Las bombas pican lo justo y las bravas son de verdad. El mejor rincón para empezar la noche."}},{u:"Lena M.",v:.7,lang:"en",loc:0,t:"Six stools and a mirror older than all of us. Order the bravas and stand by the door like a local."},{u:"Pau G.",v:.82,lang:"es",loc:1,t:"Para picar antes de cenar no hay nada mejor en la Esquerra. Cierra tarde y nunca pone mala cara."}]},
 {id:"granja",name:"Granja Teresa",cuisine:"cafe",price:1,menu:null,block:"e:1:2",sL:.84,sV:.78,nL:198,nV:63,c1:"#5A2A12",c2:"#FFD9A0",fg:"#FFF1E0",motif:"cup",slots:"ma",hours:"08:00–20:30",closed:0,street:"Carrer de Pau Claris",tags:["brunch","solo","cheap"],
  dishes:[["Xocolata desfeta amb melindros",48],["Ensaïmada",33],["Cafè amb llet",29],["Entrepà de truita",18]],
  takes:[{u:"Teresa B.",v:.88,lang:"ca",loc:1,t:"La xocolata desfeta és espessa de veritat. Els melindros, sucats, són la infància.",tr:{en:"The hot chocolate is properly thick. Dunked melindros are pure childhood.",es:"El chocolate a la taza es espeso de verdad. Los melindros, mojados, son la infancia."}},{u:"Sofia R.",v:.8,lang:"en",loc:1,t:"My afternoon office when the library closes. Quiet, warm, and the ensaïmada is enormous."},{u:"Raúl P.",v:.79,lang:"es",loc:1,t:"Merienda de las de antes, sin prisas. El camarero lleva cuarenta años y se nota."}]},
 {id:"ones",name:"Ones i Sal",cuisine:"seafood",price:3,menu:null,block:"e:2:4",sL:.83,sV:.84,nL:121,nV:69,c1:"#0F3550",c2:"#FFA800",fg:"#EAF4FA",motif:"fish",slots:"d",hours:"20:00–23:30",closed:1,street:"Carrer de València",tags:["date"],
  dishes:[["Gamba vermella",30],["Suquet de rap",28],["Ostres del Delta",17],["Fideuà negra",15]],
  takes:[{u:"Sergi T.",v:.85,lang:"es",loc:1,t:"Caro, pero la gamba roja justifica cada euro. Pide el suquet para compartir."},{u:"Maya L.",v:.8,lang:"en",loc:1,t:"Anniversary dinner, zero regrets. The staff walked us through the catch of the day like it was gossip."},{u:"Anna F.",v:.82,lang:"ca",loc:1,t:"Producte de llotja i cuina sense ego. Reserva amb temps, sobretot divendres.",tr:{en:"Fish-market produce and cooking without ego. Book ahead, especially on Fridays.",es:"Producto de lonja y cocina sin ego. Reserva con tiempo, sobre todo los viernes."}}]},
 {id:"arros",name:"Arrossaria Nou Sol",cuisine:"rice",price:2,menu:null,block:"e:8:5",sL:.82,sV:.78,nL:150,nV:71,c1:"#FFB21E",c2:"#8E1B10",fg:"#2A1206",motif:"rice",slots:"ld",hours:"13:00–16:00 · 20:00–23:00",closed:1,street:"Carrer de Mallorca",tags:["terraza","date"],
  dishes:[["Arròs negre",44],["Arròs de muntanya",31],["Fideuà",26],["All i oli",17]],
  takes:[{u:"Montse G.",v:.85,lang:"es",loc:1,t:"El arroz negro tiene socarrat de verdad, del que se rasca con la cuchara. Pide para dos y comparte el all i oli."},{u:"Tom B.",v:.78,lang:"en",loc:0,t:"We went before the Sagrada Família and forgot about the Sagrada Família. Rice for two easily feeds three."},{u:"Ivet R.",v:.8,lang:"ca",loc:1,t:"Arròs de muntanya amb gust de diumenge al Montseny. Cal reservar el cap de setmana.",tr:{en:"Mountain rice that tastes like a Sunday in the Montseny. Book at weekends.",es:"Arroz de montaña con sabor a domingo en el Montseny. Hay que reservar el fin de semana."}}]},
 {id:"mirall",name:"Izakaya Mirall",cuisine:"japanese",price:3,menu:null,block:"e:-11:3",sL:.74,sV:.86,nL:88,nV:62,c1:"#141110",c2:"#E31C13",fg:"#F7EFE6",motif:"sushi",slots:"dn",hours:"19:30–01:00",closed:1,street:"Carrer de Viladomat",tags:["date","late"],split:true,
  dishes:[["Karaage",29],["Nigiri de tonyina",25],["Gyoza de porc",22],["Mochi de iuzu",18]],
  takes:[{u:"Kenji A.",v:.95,lang:"en",loc:1,t:"The karaage is the best I've had in Barcelona, juicy and loud. The counter seats are the show."},{u:"Marina T.",v:.45,lang:"es",loc:1,t:"Bonito, pero 58 € por una cena pequeña. El karaage salva la noche, el resto no."},{u:"Joan E.",v:.79,lang:"ca",loc:1,t:"Petit, fosc i elegant. Ideal per a una nit tranquil·la de parella.",tr:{en:"Small, dark and elegant. Ideal for a quiet night for two.",es:"Pequeño, oscuro y elegante. Ideal para una noche tranquila en pareja."}}]},
 {id:"masala",name:"Masala Diagonal",cuisine:"indian",price:1,menu:10.9,block:"e:3:5:b",sL:.77,sV:.74,nL:140,nV:67,c1:"#5B1B5E",c2:"#FFA800",fg:"#FFEFD8",motif:"curry",slots:"ladn",hours:"12:00–02:00",closed:-1,street:"Avinguda Diagonal",tags:["menu","late","cheap","solo"],
  board:{p:["Samosa de verdures","Dal de llenties","Raita amb pa naan"],s:["Butter chicken","Chana masala","Biryani de xai"],d:["Lassi de mango","Kheer"]},
  dishes:[["Butter chicken",39],["Naan d'all",37],["Dal makhani",33],["Lassi de mango",20]],
  takes:[{u:"Arjun V.",v:.78,lang:"en",loc:1,t:"Dal makhani that tastes like it simmered all afternoon. The garlic naan arrives blistered and hot."},{u:"Clara M.",v:.74,lang:"es",loc:1,t:"Menú de 10,90 en plena Diagonal y abierto hasta tarde. El butter chicken es justo lo que buscas después de una noche larga."},{u:"Noah P.",v:.76,lang:"en",loc:0,t:"Not fancy, very kind. They adjusted the spice for my kid without a second thought."}]},
 {id:"fum",name:"Fum de Llenya",cuisine:"grill",price:2,menu:16.9,block:"e:-9:1",sL:.75,sV:.73,nL:163,nV:70,c1:"#2B1A12",c2:"#FF6B1A",fg:"#FFE7D1",motif:"flame",slots:"ld",hours:"13:00–16:00 · 20:00–23:30",closed:1,street:"Carrer del Comte d'Urgell",tags:["terraza"],
  board:{p:["Carxofes al caliu","Escalivada amb anxoves","Amanida verda"],s:["Botifarra a la brasa","Xai a la brasa (+3 €)","Verdures a la brasa"],d:["Crema catalana","Pinya"]},
  dishes:[["Botifarra a la brasa",41],["Carxofes al caliu",36],["Allioli de morter",30],["Entrecot de Girona",25]],
  takes:[{u:"Xavi M.",v:.75,lang:"es",loc:1,t:"La brasa huele desde la esquina y la botifarra llega con su allioli de mortero. Menú de 16,90, merece cada céntimo."},{u:"Elif D.",v:.7,lang:"en",loc:0,t:"Smoky, honest, a bit loud on Fridays. Get the artichokes even if you think you don't like artichokes."},{u:"Rosa C.",v:.78,lang:"ca",loc:1,t:"Les carxofes al caliu són de les millors que he menjat fora de casa. El servei, ràpid i amb gràcia.",tr:{en:"The ember-roasted artichokes are among the best I've had outside home. Quick, charming service.",es:"Las alcachofas a la brasa son de las mejores que he comido fuera de casa. El servicio, rápido y con gracia."}}]},
 {id:"taqueria",name:"Taqueria Xamfrà Sud",cuisine:"mexican",price:1,menu:9.9,block:"e:-9:-1",sL:.74,sV:.72,nL:131,nV:67,c1:"#1B6657",c2:"#FFA800",fg:"#EAFBF6",motif:"taco",slots:"ladn",hours:"12:30–01:00",closed:2,street:"Carrer del Comte Borrell",tags:["menu","late","cheap"],
  board:{p:["Guacamole amb totopos","Sopa de tortilla","Esquites"],s:["Tacos al pastor","Quesadilla de flor de carbassa","Enchiladas verdes"],d:["Orxata de la casa","Churros"]},
  dishes:[["Tacos al pastor",50],["Guacamole",26],["Quesadilla de flor",21],["Orxata de la casa",15]],
  takes:[{u:"Valeria H.",v:.75,lang:"es",loc:1,t:"Al pastor con su trompo y su piña, como en Ciudad de México. La horchata es casera y está muy fría."},{u:"Ben C.",v:.7,lang:"en",loc:0,t:"Cheap, cheerful, open late. The flor de calabaza quesadilla is the sleeper hit."},{u:"Mireia S.",v:.74,lang:"ca",loc:1,t:"Menú de 9,90 a Sant Antoni, impossible queixar-se. Els caps de setmana s'omple molt.",tr:{en:"A €9.90 menu in Sant Antoni, impossible to complain. It gets packed at weekends.",es:"Menú de 9,90 en Sant Antoni, imposible quejarse. Los fines de semana se llena mucho."}}]},
 {id:"rosella",name:"Trattoria Rosella",cuisine:"italian",price:2,menu:14.9,block:"e:-3:2",sL:.68,sV:.72,nL:110,nV:66,c1:"#F1E0C0",c2:"#E31C13",fg:"#3A1410",motif:"pasta",slots:"ld",hours:"13:00–15:30 · 20:00–23:00",closed:1,street:"Carrer d'Enric Granados",tags:["menu","terraza","date"],featured:true,
  board:{p:["Burrata amb tomàquet","Minestrone","Carpaccio de vedella"],s:["Cacio e pepe","Ragù del sabato","Risotto de bolets"],d:["Tiramisù","Panna cotta"]},
  dishes:[["Cacio e pepe",34],["Tiramisù",29],["Burrata",20],["Ragù del sabato",18]],
  takes:[{u:"Giulia R.",v:.7,lang:"en",loc:1,t:"Cacio e pepe done properly, glossy and not clumpy. Service was slow, but nobody seemed to mind."},{u:"Àlex P.",v:.65,lang:"ca",loc:1,t:"Bona pasta, ambient tranquil i un tiramisù generós. No és cap revelació, però hi tornaria.",tr:{en:"Good pasta, a calm room and a generous tiramisù. Not a revelation, but I'd come back.",es:"Buena pasta, ambiente tranquilo y un tiramisú generoso. No es ninguna revelación, pero volvería."}},{u:"Sam K.",v:.72,lang:"en",loc:0,t:"Solid weekday lunch at €14.90. The Saturday ragù is the reason to come back."}]},
 {id:"modernista",name:"Tapas Modernista",cuisine:"tapas",price:2,menu:null,block:"e:0:3",sL:.38,sV:.77,nL:61,nV:412,c1:"#F4C542",c2:"#8E1B10",fg:"#2A1206",motif:"rice",slots:"mladn",hours:"10:00–00:00",closed:-1,street:"Passeig de Gràcia",tags:["terraza","late"],
  dishes:[["Paella mixta",48],["Sangria de jarra",44],["Patatas bravas",31],["Croquetas variadas",20]],
  takes:[{u:"Megan T.",v:.85,lang:"en",loc:0,t:"Amazing spot right by the famous houses, huge jug of sangria and friendly waiters. Loved it!"},{u:"Laura V.",v:.3,lang:"es",loc:1,t:"Paella precocinada a 24 € en pleno paseo. Para eso, sube dos manzanas y come de verdad."},{u:"Jan K.",v:.42,lang:"en",loc:1,t:"Fine for a sangria with a view of the crowds. For food, walk ten minutes into Gràcia."}]}
];
R.forEach(r=>{r.n=r.nL+r.nV;r.score=(r.sL*r.nL+r.sV*r.nV)/r.n});
const RID=Object.fromEntries(R.map(r=>[r.id,r]));

const PEOPLE=[
 {id:"laia",n:"Laia Martí",h:"@laiamarti",c:"#B8140D",barri:"gracia",local:1,b:["Pastry first, questions later. Gràcia since forever.","Primero bollería, luego preguntas. De Gràcia de toda la vida."],f:612,bias:{bakery:.08,cafe:.06,japanese:-.05}},
 {id:"nuria",n:"Núria Puig",h:"@nuriaeats",c:"#C2410C",barri:"dreta",local:1,b:["Menú del día evangelist. Dreta, mostly.","Evangelista del menú del día. Sobre todo en la Dreta."],f:2140,bias:{catalan:.07,tapas:.03,seafood:-.04}},
 {id:"jordi",n:"Jordi Vidal",h:"@jordiv",c:"#8A5A00",barri:"antiga",local:1,b:["Anchovies, siphons, Sunday noon.","Anchoas, sifones y domingos a mediodía."],f:980,bias:{tapas:.08,grill:.04,italian:-.06}},
 {id:"maya",n:"Maya Lindqvist",h:"@maya.eats.bcn",c:"#3A1E4A",barri:"gracia",local:1,b:["Swede in Gràcia since 2021. Long dinners, low lights.","Sueca en Gràcia desde 2021. Cenas largas, luz baja."],f:1530,bias:{seafood:.06,japanese:-.1,italian:.05}},
 {id:"oriol",n:"Oriol Bassas",h:"@oriolb",c:"#0F3550",barri:"santantoni",local:1,b:["Only rates places older than him.","Solo puntúa sitios más viejos que él."],f:1205,bias:{catalan:.08,rice:.05,mexican:-.08,japanese:-.08}},
 {id:"aisha",n:"Aisha Khan",h:"@aishaafterdark",c:"#2B2320",barri:"nova",local:1,b:["After-midnight specialist.","Especialista después de medianoche."],f:1890,bias:{indian:.08,mexican:.06,catalan:-.05}},
 {id:"hannah",n:"Hannah Weber",h:"@hannahw",c:"#1E5A3C",barri:"fortpienc",local:1,b:["Moved from Hamburg last spring. Eating alone, happily.","Llegó de Hamburgo la primavera pasada. Comiendo sola, y feliz."],f:760,bias:{asian:.07,bakery:.04,seafood:-.04}}
];
const PID=Object.fromEntries(PEOPLE.map(p=>[p.id,p]));
PID.savoro={id:"savoro",n:"Savoro",team:true,c:"#E31C13"};

/* what friends posted (minutes ago) */
const FEED=[
 {p:"nuria",rid:"xamfra",v:.95,ago:14,lang:"es",t:"El fricandó de los lunes es religión. Llegad antes de las 14:00.",d:["Fricandó"]},
 {p:"laia",rid:"lluna",v:.92,ago:52,lang:"en",t:"Croissant still warm at 9:40. Run, don't walk.",d:["Croissant de mantega"]},
 {p:"jordi",rid:"tendre",v:.84,ago:130,lang:"ca",t:"Bombes i vermut abans de sopar. Pla perfecte de dimarts.",tr:{en:"Bombas and vermut before dinner. The perfect Tuesday plan.",es:"Bombas y vermut antes de cenar. Plan perfecto de martes."},d:["Bombes picants"]},
 {p:"aisha",rid:"masala",v:.8,ago:310,lang:"en",t:"2am butter chicken hits different. Staff still smiling at closing.",d:["Butter chicken","Naan d'all"]},
 {p:"maya",rid:"mirall",v:.55,ago:1200,lang:"en",t:"Gorgeous room, but €58 for a small dinner. The karaage carried the night.",d:["Karaage"]},
 {p:"oriol",rid:"merce",v:.93,ago:1500,lang:"es",t:"Canelones como los de casa. Ni uno más, ni uno menos.",d:["Canelons de l'àvia"]},
 {p:"hannah",rid:"saigon",v:.87,ago:2900,lang:"en",t:"Phở for one at the counter, zero awkwardness. My Thursday thing now.",d:["Phở de vedella"]}
];

const LISTS=[
 {id:"lunch15",t:["Menús under €15 that slap","Menús de menos de 15 € que lo petan"],d:["Real tablecloths, real puddings, under fifteen euros.","Mantel de verdad, postre de verdad y menos de quince euros."],by:"nuria",f:2140,lc:"#E31C13",items:["xamfra","raco","saigon","merce","masala","taqueria"]},
 {id:"late",t:["Kitchens open past midnight","Cocinas abiertas pasada la medianoche"],d:["For when the night got longer than planned.","Para cuando la noche se alarga más de lo previsto."],by:"aisha",f:1890,lc:"#2B2320",items:["masala","raco","taqueria","mirall","tendre"]},
 {id:"date",t:["First date, no pressure","Primera cita, sin presión"],d:["Low light, good food, easy exits.","Luz baja, buena comida y salidas fáciles."],by:"maya",f:1530,lc:"#3A1E4A",items:["ones","mirall","rosella","arros"]},
 {id:"abuela",t:["Cooks like my grandmother","Cocina como mi abuela"],d:["Slow food, no foam.","Cocina lenta, sin espumas."],by:"oriol",f:1205,lc:"#8E1B10",items:["xamfra","merce","arros","granja"]},
 {id:"vermut",t:["Vermut crawl, Esquerra to Gràcia","Ruta de vermut, de la Esquerra a Gràcia"],d:["Three stops, one long Sunday.","Tres paradas, un domingo largo."],by:"jordi",f:980,lc:"#8A5A00",items:["tendre","merce","raco"]},
 {id:"merienda",t:["Merienda worth the walk","Meriendas que valen el paseo"],d:["Thick chocolate, warm pastries, nowhere to be.","Chocolate espeso, bollería caliente y ninguna prisa."],by:"laia",f:640,lc:"#5A2A12",items:["granja","lluna","saigon"]},
 {id:"solo",t:["Eating alone, happily","Comer solo, y feliz"],d:["Counters, kind staff, no awkward two-tops.","Barras, gente amable y ninguna mesa incómoda."],by:"hannah",f:760,lc:"#1E5A3C",items:["saigon","lluna","tendre","masala"]}
];
 /* team lists: made by Savoro, never paid for. "kind" is the seed of future categories, shown as a small label for now */
LISTS.push(
 {id:"spoon",by:"savoro",kind:["Season","Temporada"],t:["Spoon food season","Temporada de cuchara"],d:["Escudella, canelons and rice for the first cold weeks.","Escudella, canelones y arroz para las primeras semanas de frío."],f:410,lc:"#1B1310",items:["xamfra","merce","arros","granja"]},
 {id:"under12",by:"savoro",kind:["Budget","Presupuesto"],t:["Lunch under €12","Comer por menos de 12 €"],d:["A proper lunch menú that still leaves change from twelve euros.","Un menú de verdad y aún te sobra algo de los doce euros."],f:530,lc:"#1B1310",items:["taqueria","masala","saigon","raco"]},
 {id:"before10",by:"savoro",kind:["Time of day","Hora"],t:["Open before 10","Abierto antes de las 10"],d:["Coffee and something warm before work.","Café y algo caliente antes de trabajar."],f:270,lc:"#1B1310",items:["lluna","granja","saigon"]},
 {id:"sunday",by:"savoro",kind:["Day","Día"],t:["Open on Sundays","Abierto en domingo"],d:["Kitchens that don't take Sunday off.","Cocinas que no libran el domingo."],f:350,lc:"#1B1310",items:["raco","merce","arros","masala","saigon","lluna"]});
const LID=Object.fromEntries(LISTS.map(l=>[l.id,l]));
const SEED_MY=[
 {id:"saved",sys:true,priv:true,items:["ones","lluna"]},
 {id:"friday",name:"Friday with Laia",priv:true,collab:["laia"],items:["mirall","arros"]},
 {id:"office",name:"Office lunches, Pg. de Gràcia",priv:false,items:["xamfra","masala","fum"]}
];
const SEED_RATINGS=[
 {rid:"merce",v:.9,take:"Canelons that end arguments.",d:["Canelons de l'àvia"],date:"2026-11-16"},
 {rid:"xamfra",v:.95,take:"Thirteen euros of pure happiness.",d:["Fricandó"],date:"2026-11-09"},
 {rid:"raco",v:.84,take:"Croquetes worth the queue.",d:["Croquetes de rostit"],date:"2026-11-02"},
 {rid:"tendre",v:.66,take:"Great bravas, slightly cramped.",d:["Patates braves"],date:"2026-10-26"},
 {rid:"modernista",v:.28,take:"Sangria with a view. That's it.",d:["Paella mixta"],date:"2026-10-19"}
];
/* closing days (0 = Sunday) spread so every day of the week has life */
Object.entries({merce:0,raco:2,ones:0,arros:3,fum:0,rosella:2,lluna:1,mirall:1}).forEach(([k,v])=>RID[k].closed=v);
