// js/data.js — Core Mission Telemetry & Clinical Data for STAR PLUS 1.2

const DAYS = ['Oct 10', 'Oct 11', 'Oct 12', 'Oct 13', 'Oct 14', 'Oct 15', 'Oct 16'];

const HEX = {
  Stable: '#16B978',
  Attention: '#F5A623',
  Monitoring: '#1769E8',
  Critical: '#E94B5F'
};

const SYSTEMS = [
  {
    id: 'cardiovascular',
    name: 'Cardiovascular',
    icon: 'heart',
    status: 'Stable',
    tags: 'Heart rate, BP, HRV',
    metrics: 'Heart Rate: 68 bpm • BP: 118/76 mmHg • HRV: 64 ms',
    blurb: 'Heart rate, blood pressure, heart-rate variability and cardiovascular fitness.',
    model: 'models/organs/realistic_human_heart.glb',
    series: [64, 66, 65, 68, 67, 69, 68]
  },
  {
    id: 'respiratory',
    name: 'Respiratory',
    icon: 'lung',
    status: 'Stable',
    tags: 'SpO₂, respiratory rate',
    metrics: 'SpO₂: 98% • Resp Rate: 14 br/min • Tidal Vol: 520 mL',
    blurb: 'Blood oxygen saturation, respiratory rate and pulmonary function.',
    model: 'models/organs/VH_M_Lung.glb',
    series: [97, 98, 98, 97, 98, 98, 98]
  },
  {
    id: 'neurological',
    name: 'Neurological',
    icon: 'brain',
    status: 'Stable',
    tags: 'Cognitive, balance',
    metrics: 'Cognitive: 91 pts • Reaction: 212 ms • Balance: 94 pts',
    blurb: 'Cognitive performance, balance, reaction time and vestibular function.',
    model: 'models/organs/Allen_M_Brain.glb',
    series: [88, 90, 89, 91, 90, 92, 91]
  },
  {
    id: 'musculoskeletal',
    name: 'Musculoskeletal',
    icon: 'bone',
    status: 'Attention',
    tags: 'Bone, muscle, exercise',
    metrics: 'Bone Mineral: -1.2% • Muscle Mass: 92% • Strength: 88 pts',
    blurb: 'Bone density, muscle mass, strength and exercise countermeasures.',
    model: 'models/organs/Skeleton.glb',
    series: [82, 80, 78, 77, 75, 74, 72]
  },
  {
    id: 'immune',
    name: 'Immune',
    icon: 'shield',
    status: 'Monitoring',
    tags: 'Immune markers, WBC',
    metrics: 'WBC Count: 6.4 k/µL • CRP: 0.8 mg/L • Stress Marker: Nominal',
    blurb: 'Immune markers, inflammation load and infection risk in microgravity.',
    model: 'models/organs/Endocrine.glb',
    series: [70, 72, 71, 69, 70, 68, 69]
  },
  {
    id: 'behavioral',
    name: 'Behavioral',
    icon: 'sleep',
    status: 'Attention',
    tags: 'Sleep, stress, mood',
    metrics: 'Sleep: 6.2 hrs • Stress: 26 pts • Circadian: -42 min',
    blurb: 'Sleep-wake cycle, stress index, mood and cognitive workload.',
    model: 'models/organs/sleep_astronaut.glb',
    series: [60, 58, 55, 52, 50, 52, 49]
  },
  {
    id: 'radiation',
    name: 'Radiation Dosimetry',
    icon: 'radiation',
    status: 'Monitoring',
    tags: 'Exposure, dose rate',
    metrics: 'Dose Rate: 1.82 mSv/day • Career: 214 mSv (35%)',
    blurb: 'Cumulative dose, dose rate and solar particle event exposure.',
    model: 'models/organs/realistic_human_skeleton.glb',
    series: [1.6, 1.7, 1.9, 1.8, 2.0, 1.9, 1.8]
  },
  {
    id: 'environmental',
    name: 'Hab Environmental',
    icon: 'cloud',
    status: 'Stable',
    tags: 'Atmosphere, CO₂, temp',
    metrics: 'Cabin O₂: 20.9% • CO₂: 0.31% • Temp: 21.4°C',
    blurb: 'Cabin atmosphere, CO₂ partial pressure, temperature and humidity.',
    model: 'models/organs/realistic_human_skeleton.glb',
    series: [98, 98, 97, 98, 98, 98, 98]
  }
];

const VITALS = [
  {
    name: 'Heart Rate',
    label: 'Heart Rate',
    val: '68',
    value: '68',
    unit: 'bpm',
    status: 'stable',
    color: '#E94B5F',
    history: [62, 65, 64, 68, 66, 70, 68, 67, 69, 68],
    series: [62, 65, 64, 68, 66, 70, 68, 67, 69, 68]
  },
  {
    name: 'Blood Pressure',
    label: 'Blood Pressure',
    val: '118 / 76',
    value: '118 / 76',
    unit: 'mmHg',
    status: 'stable',
    color: '#1769E8',
    history: [116, 118, 117, 119, 118, 117, 118, 119, 118, 118],
    series: [116, 118, 117, 119, 118, 117, 118, 119, 118, 118]
  },
  {
    name: 'SpO₂ Saturation',
    label: 'SpO₂ Saturation',
    val: '98',
    value: '98',
    unit: '%',
    status: 'stable',
    color: '#16B978',
    history: [97, 98, 98, 97, 98, 98, 97, 98, 98, 98],
    series: [97, 98, 98, 97, 98, 98, 97, 98, 98, 98]
  },
  {
    name: 'Respiratory Rate',
    label: 'Respiratory Rate',
    val: '14',
    value: '14',
    unit: 'br/min',
    status: 'stable',
    color: '#7657E8',
    history: [13, 14, 14, 13, 15, 14, 14, 13, 14, 14],
    series: [13, 14, 14, 13, 15, 14, 14, 13, 14, 14]
  },
  {
    name: 'Core Temperature',
    label: 'Core Temperature',
    val: '36.6',
    value: '36.6',
    unit: '°C',
    status: 'stable',
    color: '#38BDF8',
    history: [36.5, 36.6, 36.6, 36.7, 36.6, 36.5, 36.6, 36.6, 36.7, 36.6],
    series: [36.5, 36.6, 36.6, 36.7, 36.6, 36.5, 36.6, 36.6, 36.7, 36.6]
  },
  {
    name: 'HRV (RMSSD)',
    label: 'HRV (RMSSD)',
    val: '64',
    value: '64',
    unit: 'ms',
    status: 'stable',
    color: '#16B978',
    history: [58, 60, 62, 61, 64, 63, 65, 64, 63, 64],
    series: [58, 60, 62, 61, 64, 63, 65, 64, 63, 64]
  }
];

const CHANGES = [
  { name: 'Resting HR', delta: '+6%', val: '68 bpm', dir: 'up' },
  { name: 'Sleep Duration', delta: '-18%', val: '6.2 hrs', dir: 'down' },
  { name: 'Daily Workout', delta: '+12%', val: '620 min', dir: 'up' },
  { name: 'Stress Index', delta: 'Nominal', val: '26 pts', dir: 'flat' }
];

const ALERTS = [
  {
    id: 'sleep',
    title: 'Sleep Recovery Trend Reduced',
    status: 'attention',
    time: '12m ago',
    desc: 'Sleep duration dropped to 4.8 hrs over the last 3 sols. Recommend circadian protocol adjustment.',
    icon: 'sleep'
  },
  {
    id: 'cardio',
    title: 'Resting Pulse Deviation (+6%)',
    status: 'attention',
    time: '45m ago',
    desc: 'Resting pulse reached 68 bpm during rest cycle. Complete guided cardiovascular assessment.',
    icon: 'heart'
  },
  {
    id: 'rad',
    title: 'Solar Particle Event (SPE) Alert',
    status: 'monitoring',
    time: '2h ago',
    desc: 'Solar flare detected by external magnetometers. Background GCR elevated to 1.82 mSv/day.',
    icon: 'radiation'
  }
];

const CREW = [
  {
    id: 'carter',
    name: 'Alex Carter',
    role: 'Commander',
    sid: 'AST-001',
    status: 'stable',
    hr: '68 bpm',
    bp: '118/76',
    spo2: '98%',
    series: [62, 63, 62, 63, 62, 63, 62]
  },
  {
    id: 'kim',
    name: 'J. Kim',
    role: 'Mission Specialist',
    sid: 'AST-002',
    status: 'attention',
    hr: '74 bpm',
    bp: '124/80',
    spo2: '97%',
    series: [60, 61, 63, 64, 66, 68, 67]
  },
  {
    id: 'silva',
    name: 'M. Silva',
    role: 'Flight Engineer',
    sid: 'AST-003',
    status: 'stable',
    hr: '64 bpm',
    bp: '116/74',
    spo2: '99%',
    series: [70, 69, 70, 71, 70, 70, 69]
  },
  {
    id: 'chen',
    name: 'L. Chen',
    role: 'Science Officer',
    sid: 'AST-004',
    status: 'stable',
    hr: '62 bpm',
    bp: '114/72',
    spo2: '98%',
    series: [58, 59, 58, 60, 59, 58, 59]
  }
];

const CREW_TL = [
  {
    name: 'A. Carter (CDR)',
    dots: ['#16B978', '#16B978', '#1769E8', '#16B978', '#16B978', '#16B978', '#16B978']
  },
  {
    name: 'J. Kim (MS-1)',
    dots: ['#16B978', '#16B978', '#F5A623', '#F5A623', '#1769E8', '#F5A623', '#F5A623']
  },
  {
    name: 'M. Silva (FE)',
    dots: ['#16B978', '#16B978', '#16B978', '#1769E8', '#16B978', '#16B978', '#16B978']
  },
  {
    name: 'L. Chen (SO)',
    dots: ['#1769E8', '#16B978', '#16B978', '#16B978', '#16B978', '#1769E8', '#16B978']
  }
];

const EVENTS = [
  {
    title: 'Resting HR Elevated (+8 bpm)',
    time: 'Oct 16, 08:30 UTC',
    desc: 'Resting pulse reached 74 bpm during sleep cycle. Biomarkers indicate mild dehydration.',
    status: 'attention'
  },
  {
    title: 'Sleep Duration Protocol Underflow',
    time: 'Oct 15, 06:15 UTC',
    desc: 'Recorded 4.8 hrs sleep vs 7.5 hrs target. Melatonin regimen prescribed.',
    status: 'attention'
  },
  {
    title: 'ARED Resistance Workout Logged',
    time: 'Oct 14, 16:40 UTC',
    desc: 'Completed 600 kg-equivalent zero-g resistance protocol with 100% telemetry adherence.',
    status: 'stable'
  }
];

const ACTS = [
  { name: 'ARED Heavy Resistance', type: 'Strength / Countermeasure', dur: 45, cal: 340 },
  { name: 'T2 Treadmill Vibration Isolation', type: 'Cardio Protocol', dur: 35, cal: 280 },
  { name: 'CEVIS Cycle Ergometer', type: 'VO₂ Max Maintenance', dur: 25, cal: 210 }
];

const MISSION = {
  sol: 'Sol-07',
  day: 184,
  total: 912,
  name: 'Mars Transit Phase II',
  distance: '128.4M km',
  delay: '14.2 min',
  phase: 'Interplanetary Cruise',
  progress: 20
};

const DEVICES = [
  { name: 'BioMonitor Smart Chest Strap (BLE 5.2)', type: 'ECG / Respiration' },
  { name: 'Continuous Interstitial Glucose Patch', type: 'Metabolic' },
  { name: 'Astronaut Sleep EEG Headband', type: 'Neuro / Somnography' },
  { name: 'Active Personal Dosimeter (GCR/SPE)', type: 'Radiation' }
];

const MOODS = [
  { label: 'Energized', icon: 'smileplus', color: '#16B978' },
  { label: 'Good', icon: 'smile', color: '#7CC243' },
  { label: 'Neutral', icon: 'meh', color: '#F5A623' },
  { label: 'Fatigued', icon: 'frown', color: '#F97316' },
  { label: 'Exhausted', icon: 'angry', color: '#E94B5F' }
];

const SLIDERS = [
  { id: 'energy', label: 'Physical Energy Level', minLabel: 'Exhausted', maxLabel: 'Peak Energy', defaultVal: 75, color: '#1769E8' },
  { id: 'stress', label: 'Mission Cognitive Stress', minLabel: 'Calm / Relaxed', maxLabel: 'High Pressure', defaultVal: 30, color: '#1769E8' },
  { id: 'sleep', label: 'Sleep Quality & Rest', minLabel: 'Restless', maxLabel: 'Deep Rest', defaultVal: 65, color: '#F5A623' },
  { id: 'workload', label: 'Daily Operational Workload', minLabel: 'Light', maxLabel: 'Heavy EVA', defaultVal: 70, color: '#E94B5F' }
];
