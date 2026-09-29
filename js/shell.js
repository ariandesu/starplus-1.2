// js/shell.js
var NAV={
astronaut:[['Main',[['overview','Overview','layout'],['systems','Health Systems','heart']]],['Health',[['vitals','Vitals','activity'],['activity','Activity','dumbbell'],['wellness','Wellness','smile'],['radiation','Radiation','radiation']]],['Care',[['assessments','Assessments','clipboard'],['alerts','Alerts','bell']]],['Ops',[['mission','Mission','rocket'],['profile','Profile','user']]]],
medical:[['Clinical',[['overview','Crew Overview','users'],['crew','Crew Member','user']]]],
control:[['Operations',[['overview','Overview','layout'],['environment','Environment','cloudsun'],['reports','Reports','file']]]]};
var ROLE_LABEL={astronaut:'Astronaut',medical:'Medical Officer',control:'Mission Control'};
function shellHTML(content){
 var nav='';NAV[S.role].forEach(function(g){nav+='<div class="navgroup">'+g[0]+'</div>';g[1].forEach(function(it){nav+='<button class="navitem'+((S.view===it[0]||(S.view==='system'&&it[0]==='systems'))?' on':'')+'" onclick="go(\''+it[0]+'\')">'+icon(it[2],15)+' '+it[1]+'</button>'})});
 return '<div class="app"><aside class="sidebar"><div class="side-logo"><div class="logo-dot">+</div><div class="side-title">STAR PLUS</div></div><nav>'+nav+'</nav><div class="side-foot">Version 1.0.0 · Demo</div></aside>'+
 '<div class="main"><header class="topbar"><div class="left"><span style="font-weight:600;color:var(--navy)">Mission '+MISSION.sol+'</span><span>Day '+MISSION.day+' / '+MISSION.total+'</span><span class="chip"><span class="mars-dot"></span>'+MISSION.name+'</span></div>'+
 '<div class="right"><span class="rolebadge">'+ROLE_LABEL[S.role]+'</span><span id="clock" style="font-family:monospace"></span><button class="iconbtn" title="Sign out" onclick="logout()">'+icon('logout',15)+'</button></div></header>'+
 '<main class="content">'+content+'</main></div></div>';
}
function loginHTML(){
 var roles=[['astronaut','Astronaut','Personal Health Monitoring','heartpulse','astronaut01'],['medical','Medical Officer','Crew Health Management','stethoscope','medical01'],['control','Mission Control','Operational Overview · ECLSS','gauge','control01']];
 var rc='';roles.forEach(function(r){rc+='<button class="rolecard" onclick="login(\''+r[0]+'\')"><div class="role-ic">'+icon(r[3],18)+'</div><h3>'+r[1]+'</h3><p>'+r[2]+'</p><div class="cred">'+r[4]+' / demo123</div></button>'});
 return '<div class="login">'+astronautArt()+'<div class="login-inner"><div class="logo-badge">'+icon('rocket',22)+'</div><h1>STAR <span>PLUS</span></h1><p class="tag">Astronaut Health & Mission Readiness</p><p class="sub">Know your body. Understand the change. Take the right action.</p><div class="roles">'+rc+'</div><p class="foot">Demo Environment — Synthetic Data · Version 1.0.0</p></div></div>';
}