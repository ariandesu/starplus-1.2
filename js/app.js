// js/app.js
function render(){
 var html;
 if(!S.role)html=loginHTML();
 else{
  var content;
  if(S.role==='astronaut'){
   if(S.view==='systems')content=vSystems();
   else if(S.view==='system')content=vSystem();
   else if(S.view==='vitals')content=vVitals();
   else if(S.view==='activity')content=vActivity();
   else if(S.view==='wellness')content=vWellness();
   else if(S.view==='radiation')content=vRadiation();
   else if(S.view==='assessments')content=vAssessments();
   else if(S.view==='alerts')content=vAlerts();
   else if(S.view==='mission')content=vMission();
   else if(S.view==='profile')content=vProfile();
   else content=vOverview();
  }else if(S.role==='medical'){
   content=S.view==='crew'?vCrewDetail():vMedicalOverview();
  }else{
   content=vControl(S.view);
  }
  html=shellHTML(content);
 }
 document.getElementById('app').innerHTML=html;
 tick();
}
function tick(){var el=document.getElementById('clock');if(el)el.textContent=new Date().toUTCString().slice(17,25)+' UTC'}
setInterval(tick,1000);
render();