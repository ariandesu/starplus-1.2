// js/data.js
const DAYS=['Oct 10','Oct 11','Oct 12','Oct 13','Oct 14','Oct 15','Oct 16'];
const HEX={Stable:'#16B978',Attention:'#F5A623',Monitoring:'#1769E8',Critical:'#E94B5F'};
const SYSTEMS=[
{id:'cardiovascular',name:'Cardiovascular',icon:'heart',status:'Stable',tags:'Heart rate, BP, HRV',blurb:'Heart rate, blood pressure, heart-rate variability and cardiovascular fitness.',metrics:[['Heart Rate','68','bpm'],['Blood Pressure','118 / 76','mmHg'],['HRV','64','ms'],['Recovery','Good','']],series:[64,66,65,68,67,69,68]},
{id:'respiratory',name:'Respiratory',icon:'wind',status:'Stable',tags:'SpO₂, respiratory rate',blurb:'Blood oxygen saturation, respiratory rate and pulmonary function.',metrics:[['SpO₂','98','%'],['Respiratory Rate','14','br/min'],['Recovery','Good','']],series:[97,98,98,97,98,98,98]},
{id:'neurological',name:'Neurological',icon:'brain',status:'Stable',tags:'Cognitive, balance',blurb:'Cognitive performance, balance, reaction time and vestibular function.',metrics:[['Cognitive Score','91','pts'],['Balance','94','pts'],['Reaction Time','212','ms']],series:[88,90,89,91,90,92,91]},
{id:'musculoskeletal',name:'Musculoskeletal',icon:'bone',status:'Attention',tags:'Bone, muscle, exercise',blurb:'Bone density, muscle mass, strength and exercise countermeasures.',metrics:[['Muscle Mass','92','%'],['Strength','88','pts'],['Recovery','Fair','']],series:[82,80,78,77,75,74,72]},
{id:'immune',name:'Immune',icon:'shieldcheck',status:'Monitoring',tags:'Immune markers',blurb:'Immune markers, inflammation load and infection risk.',metrics:[['Immune Markers','Within range',''],['Inflammation','Low','']],series:[70,72,71,69,70,68,69]},
{id:'behavioral',name:'Behavioral',icon:'smile',status:'Attention',tags:'Sleep, stress, mood',blurb:'Sleep-wake cycle, stress index, mood and cognitive workload.',metrics:[['Sleep','6.2','h'],['Stress Index','26',''],['Mood','Good','']],series:[60,58,55,52,50,52,49]},
{id:'radiation',name:'Radiation',icon:'radiation',status:'Monitoring',tags:'Exposure, dose',blurb:'Cumulative dose, dose rate and solar particle event exposure.',metrics:[['Current Dose Rate','1.82','mSv'],['Accumulated','214','mSv']],series:[1.6,1.7,1.9,1.8,2.0,1.9,1.8]},
{id:'environmental',name:'Environmental',icon:'cloudsun',status:'Stable',tags:'Atmosphere, CO₂, temp',blurb:'Cabin atmosphere, CO₂ partial pressure, temperature and humidity.',metrics:[['CO₂','2.4','mmHg'],['Temperature','22.1','°C'],['O₂ Concentration','20.9','%']],series:[98,98,97,98,98,98,98]}
];
const VITALS=[
{label:'Heart Rate',value:'68',unit:'bpm',color:'#E94B5F',series:[62,65,64,68,66,70,68,67,69,68]},
{label:'Blood Pressure',value:'118 / 76',unit:'mmHg',color:'#1769E8',series:[116,118,117,119,118,117,118,119,118,118]},
{label:'SpO₂',value:'98',unit:'%',color:'#16B978',series:[97,98,98,97,98,98,97,98,98,98]},
{label:'Respiratory Rate',value:'14',unit:'br/min',color:'#7657E8',series:[13,14,14,13,15,14,14,13,14,14]},
{label:'Body Temperature',value:'36.6',unit:'°C',color:'#38BDF8',series:[36.5,36.6,36.6,36.7,36.6,36.5,36.6,36.6,36.7,36.6]},
{label:'HRV',value:'64',unit:'ms',color:'#16B978',series:[58,60,62,61,64,63,65,64,63,64]}
];
const CHANGES=[['Resting HR','+6%','bad','up'],['Sleep Duration','-18%','bad','down'],['Activity','+12%','good','up'],['Stress','Stable','neutral','flat']];
const ALERTS=[
{id:'sleep',title:'Sleep Recovery',status:'Attention',bucket:'Action Required',icon:'moon',goTo:'wellness',primary:'Review',bullets:['Sleep duration has decreased over 3 days.','Review today’s sleep schedule and complete recovery assessment.']},
{id:'cardio',title:'Cardiovascular',status:'Attention',bucket:'Action Required',icon:'heart',goTo:'assessments',primary:'Start Assessment',bullets:['Resting HR is above recent baseline.','Complete cardiovascular assessment.']},
{id:'rad',title:'Radiation Monitoring',status:'Monitoring',bucket:'Monitoring',icon:'radiation',goTo:'radiation',primary:'View Details',bullets:['Solar activity increased.','Continue monitoring exposure levels.']}
];
const CREW=[
{id:'carter',name:'A. Carter',full:'Alex Carter',role:'Commander',sid:'AST-001',status:'Stable',adh:'98% signals',series:[62,63,62,63,62,63,62]},
{id:'kim',name:'J. Kim',full:'J. Kim',role:'Mission Specialist',sid:'AST-002',status:'Attention',adh:'94% signals',series:[60,61,63,64,66,68,67]},
{id:'silva',name:'M. Silva',full:'M. Silva',role:'Flight Engineer',sid:'AST-003',status:'Stable',adh:'97% signals',series:[70,69,70,71,70,70,69]},
{id:'chen',name:'L. Chen',full:'L. Chen',role:'Science Officer',sid:'AST-004',status:'Stable',adh:'96% signals',series:[58,59,58,60,59,58,59]}
];
const CREW_TL={carter:['Stable','Stable','Monitoring','Stable','Stable','Stable','Stable'],kim:['Stable','Stable','Attention','Attention','Monitoring','Attention','Attention'],silva:['Stable','Stable','Stable','Monitoring','Stable','Stable','Stable'],chen:['Monitoring','Stable','Stable','Stable','Stable','Monitoring','Stable']};
const EVENTS=[['Oct 16','Resting HR increased by 11%','Attention'],['Oct 15','Sleep duration decreased by 18%','Attention'],['Oct 14','Completed cardiovascular assessment','Stable']];
const WATCH=[['Sleep Duration','-19%','4.8 h current vs 7.5 h baseline','reduced'],['Resting Heart Rate','+8%','65 bpm current vs 60 bpm baseline','elevated'],['Exercise Performance','-11%','82 pts current vs 92 pts baseline','reduced'],['Stress Index','+17%','26 current vs 22 baseline','elevated'],['Reaction Time','+9%','229 ms current vs 210 ms baseline','elevated']];
const ENV=[['rad','Radiation','radiation'],['co2','CO₂ Level','wind'],['o2','O₂ Concentration','droplets'],['temp','Temperature','thermometer']];
const ACTS=[['Resistance Training','20 min'],['Cardiovascular Treadmill','30 min'],['Flexibility Stretching','10 min']];
const MISSION={sol:'Sol-07',day:184,total:912,name:'Mars Transit',distance:'128.4 million km',delay:'6–22 minutes',phase:'Cruise',progress:20};
const DEVICES=[['Wearable Sensor','watch'],['Blood Pressure Monitor','gauge'],['Sleep Monitor','moon'],['Radiation Dosimeter','radiation']];
const STEPS=['Consent & Setup','Blood Pressure','Heart Rate Variability','Review & Submit'];
const MOODS=[['Very Good','smileplus','#16B978'],['Good','smile','#7CC243'],['Neutral','meh','#F5A623'],['Tired','frown','#F97316'],['Poor','angry','#E94B5F']];
const SLIDERS=[['Energy','Low','High',55,'#1769E8'],['Stress','Low','High',62,'#1769E8'],['Sleep Quality','Poor','Good',45,'#F5A623'],['Workload','Light','Heavy',78,'#E94B5F']];