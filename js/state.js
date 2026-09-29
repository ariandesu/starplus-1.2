// js/state.js
var S={role:null,view:'overview',systemId:null,crewId:'kim',tabs:{},dismissed:[],step:1,mood:2,sliders:SLIDERS.map(function(s){return s[3]}),anom:{},why:false,submitted:false};
function t(k,d){return S.tabs[k]!==undefined?S.tabs[k]:d}
function setTab(k,v){S.tabs[k]=v;render()}
function login(r){S.role=r;S.view='overview';render()}
function logout(){S.role=null;render()}
function go(v){S.view=v;S.systemId=null;render()}
function openSystem(id){S.systemId=id;S.view='system';render()}
function openCrew(id){S.crewId=id;S.view='crew';render()}
function dismissAlert(id){if(S.dismissed.indexOf(id)<0)S.dismissed.push(id);render()}
function stepNext(){S.step=Math.min(3,S.step+1);render()}
function stepBack(){S.step=Math.max(0,S.step-1);render()}
function setMood(i){S.mood=i;render()}
function slideVal(i,v){S.sliders[i]=+v}
function submitWellness(){S.submitted=true;render()}
function toggleAnom(id){S.anom[id]=!S.anom[id];render()}
function setWhy(v){S.why=v;render()}