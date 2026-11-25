"use strict";
/* ============ view bindings ============ */
function bindView(){
  const hm=$("#homeMap");if(hm){bindHomeMap(hm);syncYou($("svg",hm))}
  const em=$("#exMap svg");if(em){applyVB(em,EX.vb||startVB(),false);bindExMap(em);bindRowSync()}
}
