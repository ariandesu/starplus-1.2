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
    tags: 'Heart rate, BP, HRV, Stroke Volume',
    metrics: 'Heart Rate: 68 bpm • BP: 118/76 mmHg • HRV: 64 ms',
    blurb: 'Heart rate, blood pressure, heart-rate variability and cardiovascular stroke volume.',
    model: 'models/organs/realistic_human_heart.glb',
    miniModel: 'models/organs/VH_M_Heart.glb',
    cameraPos: [0, 0, 2.4],
    series: [64, 66, 65, 68, 67, 69, 68],
    chartTitle: '7-Day Mean Resting Heart Rate (bpm)',
    chartUnit: 'bpm',
    chartData: [64, 68, 66, 72, 70, 68, 67],
    parameters: [
      { label: 'Heart Rate', val: '68', unit: 'bpm', status: 'Stable', delta: '+2 bpm' },
      { label: 'Blood Pressure', val: '118/76', unit: 'mmHg', status: 'Stable', delta: 'Nominal' },
      { label: 'HRV (RMSSD)', val: '64', unit: 'ms', status: 'Stable', delta: '+4 ms' },
      { label: 'Stroke Volume', val: '84', unit: 'mL', status: 'Stable', delta: '-3%' }
    ],
    insights: [
      { title: 'Microgravity Fluid Shift Stabilization', text: 'Cephalad fluid redistribution has reached equilibrium. Left ventricular stroke volume and arterial compliance remain nominal.' },
      { title: 'Aerobic Capacity (VO₂ Max)', text: 'VO₂ max retention is 94.2% relative to terrestrial baseline, maintained via daily CEVIS cycle protocols.' }
    ],
    recommendations: [
      'Maintain daily 30-min CEVIS cycle ergometer protocol at 75% max HR.',
      'Target daily fluid intake of 2.8 L with electrolyte mineral packs.'
    ]
  },
  {
    id: 'respiratory',
    name: 'Respiratory',
    icon: 'lung',
    status: 'Stable',
    tags: 'SpO₂, resp rate, tidal volume',
    metrics: 'SpO₂: 98% • Resp Rate: 14 br/min • Tidal Vol: 520 mL',
    blurb: 'Blood oxygen saturation, respiratory rate, alveolar diffusion and pulmonary compliance.',
    model: 'models/organs/realistic_human_lungs.glb',
    miniModel: 'models/organs/VH_M_Lung.glb',
    cameraPos: [0, 0, 2.6],
    series: [97, 98, 98, 97, 98, 98, 98],
    chartTitle: '7-Day Blood Oxygen Saturation SpO₂ (%)',
    chartUnit: '%',
    chartData: [97, 98, 98, 97, 98, 98, 98],
    parameters: [
      { label: 'SpO₂ Saturation', val: '98', unit: '%', status: 'Stable', delta: 'Nominal' },
      { label: 'Resp Rate', val: '14', unit: 'br/min', status: 'Stable', delta: '0 br/min' },
      { label: 'Tidal Volume', val: '520', unit: 'mL', status: 'Stable', delta: '+15 mL' },
      { label: 'Alveolar Diffusion', val: '99.1', unit: '%', status: 'Stable', delta: 'Nominal' }
    ],
    insights: [
      { title: 'Pulmonary Ventilation-Perfusion (V/Q)', text: 'Alveolar gas exchange in 0G is optimal. No signs of airway constriction or trace particulate aerosol irritation.' },
      { title: 'EVA Suit Hyperoxia Tolerance', text: 'During simulated EVA pressure cycles (4.3 psi 100% O₂), respiratory compliance remained within 98% nominal.' }
    ],
    recommendations: [
      'Inspect cabin HEPA filter flow velocity and trace particulate sensors on Sol 185.',
      'Perform weekly spirometry assessment via the BioMonitor smart chest harness.'
    ]
  },
  {
    id: 'neurological',
    name: 'Neurological',
    icon: 'brain',
    status: 'Stable',
    tags: 'Cognitive, balance, EEG',
    metrics: 'Cognitive: 91 pts • Reaction: 212 ms • Balance: 94 pts',
    blurb: 'Cognitive performance, balance, reaction time, EEG rhythms and vestibular neuro-adaptation.',
    model: 'models/organs/realistic_human_brain.glb',
    miniModel: 'models/organs/Allen_M_Brain.glb',
    cameraPos: [0, 0, 2.5],
    series: [88, 90, 89, 91, 90, 92, 91],
    chartTitle: '7-Day Cognitive Performance Score (pts)',
    chartUnit: 'pts',
    chartData: [88, 90, 89, 91, 90, 92, 91],
    parameters: [
      { label: 'Cognitive Score', val: '91', unit: 'pts', status: 'Stable', delta: '+1 pt' },
      { label: 'Reaction Time', val: '212', unit: 'ms', status: 'Stable', delta: '-8 ms' },
      { label: 'Vestibular Balance', val: '94', unit: 'pts', status: 'Stable', delta: '+3 pts' },
      { label: 'EEG Alpha Power', val: '8.4', unit: 'µV²', status: 'Stable', delta: 'Nominal' }
    ],
    insights: [
      { title: 'Space Motion Sickness (SMS) Resolution', text: 'Neurovestibular otolith adaptation is complete. Saccadic eye movement and visual tracking latency improved to 212 ms.' },
      { title: 'Sleep Spindle Density & Coherence', text: 'NREM Stage 3 delta wave coherence is healthy, supporting procedural memory consolidation during transit.' }
    ],
    recommendations: [
      'Complete 10-minute VR neurocognitive calibration before scheduled airlock ingress.',
      'Maintain 22:00 UTC cabin light dimming to reinforce suprachiasmatic circadian rhythm.'
    ]
  },
  {
    id: 'musculoskeletal',
    name: 'Musculoskeletal',
    icon: 'bone',
    status: 'Attention',
    tags: 'Bone mineral, muscle mass, ARED',
    metrics: 'Bone Mineral: -1.2% • Muscle Mass: 92% • Strength: 88 pts',
    blurb: 'Bone mineral density, muscle volume retention, biomechanical strength and resistive loading.',
    model: 'models/organs/realistic_human_skeleton.glb',
    miniModel: 'models/organs/Skeleton.glb',
    cameraPos: [0, 0, 3.2],
    series: [82, 80, 78, 77, 75, 74, 72],
    chartTitle: '7-Day Skeletal Loading Compliance (%)',
    chartUnit: '%',
    chartData: [82, 80, 78, 77, 75, 74, 72],
    parameters: [
      { label: 'Bone Mineral Density', val: '-1.2', unit: '%', status: 'Attention', delta: '-0.3%' },
      { label: 'Muscle Volume', val: '92', unit: '%', status: 'Attention', delta: '-1.5%' },
      { label: 'Grip Strength', val: '46', unit: 'kg', status: 'Stable', delta: '-1 kg' },
      { label: 'ARED Load Score', val: '96', unit: '%', status: 'Stable', delta: '+4%' }
    ],
    insights: [
      { title: 'Calcaneus & Lumbar Osteoclast Activity', text: 'Biomarkers show mild calcium turnover increase. Calcaneus bone mineral density is down 1.2% from launch baseline.' },
      { title: 'Anti-Gravity Muscle Preservation', text: 'Soleus and gastrocnemius muscle volume retention is within expected envelope under ARED heavy resistive loading.' }
    ],
    recommendations: [
      'Increase ARED deadlift and squat resistance target to 650 kg-equivalent.',
      'Administer weekly oral bisphosphonate and 2000 IU vitamin D3 countermeasure dose.'
    ]
  },
  {
    id: 'immune',
    name: 'Immune & Endocrine',
    icon: 'shield',
    status: 'Monitoring',
    tags: 'WBC, CRP, cortisol, T-cells',
    metrics: 'WBC Count: 6.4 k/µL • CRP: 0.8 mg/L • Stress Marker: Nominal',
    blurb: 'Immune markers, inflammatory cytokine load, endocrine balance and microgravity infection resistance.',
    model: 'models/organs/Endocrine.glb',
    miniModel: 'models/organs/Endocrine.glb',
    cameraPos: [0, 0, 2.5],
    series: [70, 72, 71, 69, 70, 68, 69],
    chartTitle: '7-Day Immune Competence Score',
    chartUnit: 'pts',
    chartData: [70, 72, 71, 69, 70, 68, 69],
    parameters: [
      { label: 'WBC Count', val: '6.4', unit: 'k/µL', status: 'Stable', delta: 'Nominal' },
      { label: 'C-Reactive Protein', val: '0.8', unit: 'mg/L', status: 'Stable', delta: '-0.2' },
      { label: 'Salivary Cortisol', val: '12.4', unit: 'nmol/L', status: 'Monitoring', delta: '+1.1' },
      { label: 'T-Cell Activation', val: '88', unit: '%', status: 'Monitoring', delta: '-3%' }
    ],
    insights: [
      { title: 'Cytokine Profile & Latent Virus Suppression', text: 'EBV and CMV antibody titers are suppressed and stable. No clinical viral reactivation observed in telemetry.' },
      { title: 'Microgravity T-Cell Signaling', text: 'CD4+/CD8+ lymphocyte ratio shows typical microgravity shift with mild suppression under high workload sols.' }
    ],
    recommendations: [
      'Continue prophylactic multi-strain probiotic regimen and antioxidant nutritional pack.',
      'Run automated capillary blood count cartridge on Sol 186.'
    ]
  },
  {
    id: 'behavioral',
    name: 'Behavioral & Circadian',
    icon: 'sleep',
    status: 'Attention',
    tags: 'Sleep duration, REM, circadian shift',
    metrics: 'Sleep: 6.2 hrs • Stress: 26 pts • Circadian: -42 min',
    blurb: 'Sleep-wake architecture, cognitive workload, circadian alignment and stress resilience.',
    model: 'models/organs/sleep_astronaut.glb',
    miniModel: 'models/organs/sleep_astronaut.glb',
    cameraPos: [0, 0, 2.6],
    series: [60, 58, 55, 52, 50, 52, 49],
    chartTitle: '7-Day Nightly Sleep Duration (Hours)',
    chartUnit: 'hrs',
    chartData: [7.2, 6.8, 6.5, 5.8, 6.0, 5.4, 6.2],
    parameters: [
      { label: 'Sleep Duration', val: '6.2', unit: 'hrs', status: 'Attention', delta: '-1.3 hrs' },
      { label: 'Stress Index', val: '26', unit: 'pts', status: 'Stable', delta: '+2 pts' },
      { label: 'REM Percentage', val: '22', unit: '%', status: 'Stable', delta: 'Nominal' },
      { label: 'Circadian Phase', val: '-42', unit: 'min', status: 'Attention', delta: '-12 min' }
    ],
    insights: [
      { title: 'Circadian Desynchrony Detection', text: 'Recent mission timeline compression shifted sleep onset by 42 minutes, causing slight REM sleep debt.' },
      { title: 'Psychological Cohesion Index', text: 'Crew cohesion, team interaction sentiment, and morale metrics remain high at 92/100.' }
    ],
    recommendations: [
      'Activate 460nm blue-enriched circadian lighting in crew sleep pod at 06:00 UTC.',
      'Administer 0.5 mg micro-dose sublingual melatonin 30 minutes before sleep.'
    ]
  },
  {
    id: 'radiation',
    name: 'Radiation Dosimetry',
    icon: 'radiation',
    status: 'Monitoring',
    tags: 'GCR dose, SPE flare, career limit',
    metrics: 'Dose Rate: 1.82 mSv/day • Career: 214 mSv (35%)',
    blurb: 'Cumulative cosmic ray dose, solar particle event exposure, and tissue organ weighting factors.',
    model: 'models/organs/realistic_human_skeleton.glb',
    miniModel: 'models/organs/Skeleton.glb',
    cameraPos: [0, 0, 3.2],
    series: [1.6, 1.7, 1.9, 1.8, 2.0, 1.9, 1.8],
    chartTitle: '7-Day Cosmic Radiation Dose Rate (mSv/day)',
    chartUnit: 'mSv',
    chartData: [1.6, 1.7, 1.9, 1.8, 2.0, 1.9, 1.8],
    parameters: [
      { label: 'Dose Rate', val: '1.82', unit: 'mSv/d', status: 'Monitoring', delta: '+0.12' },
      { label: 'Cumulative Career', val: '214', unit: 'mSv', status: 'Stable', delta: '35% Limit' },
      { label: 'SPE Shielding', val: '99.4', unit: '%', status: 'Stable', delta: 'Nominal' },
      { label: 'Stem Cell Index', val: '96', unit: '%', status: 'Stable', delta: 'Nominal' }
    ],
    insights: [
      { title: 'Galactic Cosmic Ray (GCR) Baseline', text: 'Interplanetary cruise background radiation is averaging 1.82 mSv/day. Water-wall shielding attenuation is nominal.' },
      { title: 'Tissue Weighting (H_T) Margins', text: 'Hematopoietic bone marrow and ocular lens dosimeter readings are well within NASA 600 mSv career margins.' }
    ],
    recommendations: [
      'Maintain storm-shelter positioning during high-altitude coronal mass ejection alerts.',
      'Inspect personal dosimeter passive luminescence crystals on Sol 190.'
    ]
  },
  {
    id: 'environmental',
    name: 'Hab Environmental',
    icon: 'cloud',
    status: 'Stable',
    tags: 'Cabin O₂, CO₂, temperature, pressure',
    metrics: 'Cabin O₂: 20.9% • CO₂: 0.31% • Temp: 21.4°C',
    blurb: 'Cabin atmosphere, CO₂ partial pressure, ambient temperature, humidity and closed-loop ECLSS.',
    model: 'models/organs/realistic_human_skeleton.glb',
    miniModel: 'models/organs/Skeleton.glb',
    cameraPos: [0, 0, 3.2],
    series: [98, 98, 97, 98, 98, 98, 98],
    chartTitle: '7-Day ECLSS Habitability Index (%)',
    chartUnit: '%',
    chartData: [98, 98, 97, 98, 98, 98, 98],
    parameters: [
      { label: 'Cabin O₂', val: '20.9', unit: '%', status: 'Stable', delta: 'Nominal' },
      { label: 'Atmosphere CO₂', val: '0.31', unit: '%', status: 'Stable', delta: '-0.02%' },
      { label: 'Cabin Temp', val: '21.4', unit: '°C', status: 'Stable', delta: '+0.2°C' },
      { label: 'Relative Humidity', val: '44', unit: '%', status: 'Stable', delta: 'Nominal' }
    ],
    insights: [
      { title: 'ECLSS Closed-Loop Recovery', text: 'Sabatier reactor CO₂ reduction and water recovery loop operating at 94.8% closed-loop efficiency.' },
      { title: 'Acoustic & Pressure Nominal', text: 'Cabin ambient noise level is 52 dBA, well below the 60 dBA sleep interference threshold.' }
    ],
    recommendations: [
      'Cycle trace contaminant catalytic oxidizer bed on Sol 188.',
      'Calibrate cabin ultrasonic atmospheric leak detection array.'
    ]
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

const PROFILE = {
  name: 'Alex Carter',
  rank: 'Commander',
  id: 'AST-001',
  mission: 'ARES-V Mars Expedition',
  avatar: 'AC',
  daysInSpace: 184,
  evaCount: 3,
  evaHours: 19.5,
  bloodType: 'O+'
};
