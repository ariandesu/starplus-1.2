// js/data.js — Core Mission Telemetry & Clinical Data for STAR PLUS 1.2

const DAYS = ['Sol 178', 'Sol 179', 'Sol 180', 'Sol 181', 'Sol 182', 'Sol 183', 'Sol 184'];

const HEX = {
  Stable: '#16B978',
  Attention: '#F5A623',
  Monitoring: '#1769E8',
  Critical: '#E94B5F'
};

// Crew biographical & medical records
const CREW = [
  {
    id: 'carter',
    name: 'Alex Carter',
    role: 'Commander',
    sid: 'AST-001',
    avatar: 'AC',
    status: 'stable',
    statusLabel: 'Nominal / Flight Ready',
    age: 38,
    gender: 'Male',
    height: '182 cm',
    weight: '78.4 kg',
    bloodType: 'O+',
    evaHours: 19.5,
    evaCount: 3,
    workoutMin: 620,
    hr: '68 bpm',
    bp: '118/76',
    spo2: '98%',
    temp: '36.8°C',
    rr: '14 br/min',
    readiness: 94,
    radiation: '214 mSv',
    emergencyContact: 'Elena Carter (Spouse) • Houston, TX',
    series: [62, 63, 62, 63, 62, 63, 62]
  },
  {
    id: 'kim',
    name: 'J. Kim',
    role: 'Mission Specialist',
    sid: 'AST-002',
    avatar: 'JK',
    status: 'attention',
    statusLabel: 'Monitoring • Mild Dehydration',
    age: 34,
    gender: 'Female',
    height: '168 cm',
    weight: '61.2 kg',
    bloodType: 'A+',
    evaHours: 12.0,
    evaCount: 2,
    workoutMin: 490,
    hr: '74 bpm',
    bp: '124/80',
    spo2: '97%',
    temp: '37.1°C',
    rr: '16 br/min',
    readiness: 78,
    radiation: '242 mSv',
    emergencyContact: 'Dr. Jin-Woo Kim (Father) • Seoul, KR',
    series: [60, 61, 63, 64, 66, 68, 67]
  },
  {
    id: 'silva',
    name: 'M. Silva',
    role: 'Flight Engineer',
    sid: 'AST-003',
    avatar: 'MS',
    status: 'stable',
    statusLabel: 'Nominal / High Endurance',
    age: 41,
    gender: 'Male',
    height: '176 cm',
    weight: '74.8 kg',
    bloodType: 'B+',
    evaHours: 24.0,
    evaCount: 4,
    workoutMin: 680,
    hr: '64 bpm',
    bp: '116/74',
    spo2: '99%',
    temp: '36.7°C',
    rr: '13 br/min',
    readiness: 91,
    radiation: '208 mSv',
    emergencyContact: 'Lucia Silva (Spouse) • Lisbon, PT',
    series: [70, 69, 70, 71, 70, 70, 69]
  },
  {
    id: 'chen',
    name: 'L. Chen',
    role: 'Science Officer',
    sid: 'AST-004',
    avatar: 'LC',
    status: 'stable',
    statusLabel: 'Nominal / Optimal Sleep',
    age: 36,
    gender: 'Female',
    height: '170 cm',
    weight: '63.0 kg',
    bloodType: 'AB+',
    evaHours: 16.5,
    evaCount: 2,
    workoutMin: 610,
    hr: '62 bpm',
    bp: '114/72',
    spo2: '98%',
    temp: '36.6°C',
    rr: '14 br/min',
    readiness: 95,
    radiation: '201 mSv',
    emergencyContact: 'Hao Chen (Brother) • Vancouver, CA',
    series: [58, 59, 58, 60, 59, 58, 59]
  }
];

// Range labels generator
function getRangeLabels(range) {
  if (range === '1D') {
    return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
  } else if (range === '30D') {
    return ['Sol 155', 'Sol 160', 'Sol 165', 'Sol 170', 'Sol 175', 'Sol 180', 'Sol 184'];
  } else if (range === 'Live') {
    return ['T-60s', 'T-50s', 'T-40s', 'T-30s', 'T-20s', 'T-10s', 'T-00s'];
  }
  // Default 7D
  return ['Sol 178', 'Sol 179', 'Sol 180', 'Sol 181', 'Sol 182', 'Sol 183', 'Sol 184'];
}

// Crew Telemetry multi-range data store
const CREW_TELEMETRY_MAP = {
  carter: {
    '1D': {
      readiness: 96,
      alertsCount: 1,
      hr: '66 bpm',
      bp: '120/78',
      spo2: '99%',
      temp: '36.8°C',
      rr: '14 br/min',
      hrv: '68 ms',
      glucose: '94 mg/dL',
      cortisol: '11.4 µg/dL',
      lactate: '1.0 mmol/L',
      doseRate: '1.79 mSv/d',
      doseAcc: '1.79 mSv',
      sleepHrs: '7.8 hrs',
      workoutMin: '90 min',
      hrSeries: [54, 52, 58, 72, 85, 128, 66],
      readinessSeries: [94, 94, 95, 95, 96, 96, 96],
      radSeries: [1.75, 1.76, 1.78, 1.80, 1.82, 1.80, 1.79],
      changes: [
        { name: 'Resting Heart Rate', delta: '-2 bpm (66 bpm)', val: 'Optimal 0G Rest', dir: 'down' },
        { name: 'SpO₂ Saturation', delta: '+1% (99%)', val: 'Full Pulmonary Flow', dir: 'up' },
        { name: 'ARED Loading Session', delta: '650 kg Equiv', val: 'Completed 100%', dir: 'up' },
        { name: 'Stress / Cortisol', delta: '-0.4 µg/dL', val: '11.4 µg/dL Nominal', dir: 'down' }
      ]
    },
    '7D': {
      readiness: 94,
      alertsCount: 2,
      hr: '68 bpm',
      bp: '118/76',
      spo2: '98%',
      temp: '36.8°C',
      rr: '14 br/min',
      hrv: '64 ms',
      glucose: '92 mg/dL',
      cortisol: '11.8 µg/dL',
      lactate: '1.1 mmol/L',
      doseRate: '1.82 mSv/d',
      doseAcc: '12.74 mSv',
      sleepHrs: '7.4 hrs',
      workoutMin: '620 min',
      hrSeries: [64, 68, 66, 72, 70, 68, 67],
      readinessSeries: [92, 94, 91, 95, 93, 94, 94],
      radSeries: [1.75, 1.80, 1.82, 1.79, 1.85, 1.81, 1.82],
      changes: [
        { name: '7-Day Mean Pulse', delta: '+2% (68 bpm)', val: 'Microgravity Baseline', dir: 'up' },
        { name: 'Weekly Sleep Average', delta: '+0.4 hrs', val: '7.4 hrs/night', dir: 'up' },
        { name: 'Weekly Exercise Min', delta: '620 / 700 min', val: '88% Protocol Match', dir: 'up' },
        { name: 'Ambient Rad Exposure', delta: '+12.7 mSv', val: '1.82 mSv/d Average', dir: 'flat' }
      ]
    },
    '30D': {
      readiness: 91,
      alertsCount: 5,
      hr: '65 bpm',
      bp: '116/74',
      spo2: '98%',
      temp: '36.7°C',
      rr: '14 br/min',
      hrv: '62 ms',
      glucose: '90 mg/dL',
      cortisol: '12.2 µg/dL',
      lactate: '1.2 mmol/L',
      doseRate: '1.81 mSv/d',
      doseAcc: '54.6 mSv',
      sleepHrs: '7.2 hrs',
      workoutMin: '2,580 min',
      hrSeries: [62, 64, 63, 67, 65, 68, 65],
      readinessSeries: [88, 90, 89, 93, 92, 94, 91],
      radSeries: [1.70, 1.74, 1.78, 1.84, 1.82, 1.80, 1.81],
      changes: [
        { name: '30-Day Bone Mineral', delta: '-0.8% BMD', val: 'Lumbar Preservation', dir: 'down' },
        { name: 'VO₂ Max Aerobic Retention', delta: '94.2% Baseline', val: 'CEVIS Stabilized', dir: 'up' },
        { name: 'Cumulative Radiation', delta: '214 mSv Total', val: '35% NASA Career Limit', dir: 'flat' },
        { name: 'Circadian Coherence', delta: '92% Phase Match', val: 'Suprachiasmatic Sync', dir: 'up' }
      ]
    },
    'Live': {
      readiness: 96,
      alertsCount: 1,
      hr: '68 bpm',
      bp: '118/76',
      spo2: '98%',
      temp: '36.8°C',
      rr: '14 br/min',
      hrv: '64 ms',
      glucose: '92 mg/dL',
      cortisol: '11.8 µg/dL',
      lactate: '1.1 mmol/L',
      doseRate: '1.82 mSv/d',
      doseAcc: '214 mSv',
      sleepHrs: '7.4 hrs',
      workoutMin: '620 min',
      hrSeries: [66, 68, 67, 69, 68, 67, 68],
      readinessSeries: [95, 96, 96, 95, 96, 96, 96],
      radSeries: [1.81, 1.82, 1.82, 1.83, 1.82, 1.82, 1.82],
      changes: [
        { name: 'Instant Heart Rate', delta: '68 bpm', val: 'Sinus Rhythm', dir: 'flat' },
        { name: 'SpO₂ Live Waveform', delta: '98.4%', val: 'Plethysmograph OK', dir: 'up' }
      ]
    }
  },
  kim: {
    '1D': {
      readiness: 74,
      alertsCount: 3,
      hr: '78 bpm',
      bp: '126/82',
      spo2: '97%',
      temp: '37.2°C',
      rr: '17 br/min',
      hrv: '48 ms',
      glucose: '108 mg/dL',
      cortisol: '16.2 µg/dL',
      lactate: '1.8 mmol/L',
      doseRate: '1.86 mSv/d',
      doseAcc: '1.86 mSv',
      sleepHrs: '4.8 hrs',
      workoutMin: '45 min',
      hrSeries: [68, 66, 72, 84, 95, 142, 78],
      readinessSeries: [80, 78, 76, 75, 74, 74, 74],
      radSeries: [1.82, 1.84, 1.85, 1.87, 1.86, 1.86, 1.86],
      changes: [
        { name: 'Resting Pulse Elevated', delta: '+8 bpm (78 bpm)', val: 'Dehydration Trigger', dir: 'up' },
        { name: 'Nightly Sleep Duration', delta: '-2.7 hrs (4.8 hrs)', val: 'Circadian Debt', dir: 'down' },
        { name: 'Serum Cortisol Spike', delta: '+3.4 µg/dL', val: '16.2 µg/dL High', dir: 'up' },
        { name: 'Urine Specific Gravity', delta: '1.028 SG', val: 'Prescribed +1.2L H₂O', dir: 'down' }
      ]
    },
    '7D': {
      readiness: 78,
      alertsCount: 4,
      hr: '74 bpm',
      bp: '124/80',
      spo2: '97%',
      temp: '37.1°C',
      rr: '16 br/min',
      hrv: '52 ms',
      glucose: '104 mg/dL',
      cortisol: '15.4 µg/dL',
      lactate: '1.6 mmol/L',
      doseRate: '1.85 mSv/d',
      doseAcc: '12.95 mSv',
      sleepHrs: '5.6 hrs',
      workoutMin: '490 min',
      hrSeries: [60, 61, 63, 66, 72, 76, 74],
      readinessSeries: [88, 86, 84, 80, 75, 76, 78],
      radSeries: [1.78, 1.82, 1.88, 1.84, 1.90, 1.86, 1.85],
      changes: [
        { name: 'Weekly Resting Pulse', delta: '+12% Trend', val: '74 bpm Avg', dir: 'up' },
        { name: 'Weekly Sleep Deficit', delta: '-1.8 hrs/sol', val: '5.6 hrs Average', dir: 'down' },
        { name: 'Countermeasure Compliance', delta: '70% Protocol', val: '490 / 700 min', dir: 'down' },
        { name: 'Total Radiation', delta: '242 mSv', val: '40% Career Limit', dir: 'flat' }
      ]
    },
    '30D': {
      readiness: 82,
      alertsCount: 8,
      hr: '69 bpm',
      bp: '120/78',
      spo2: '98%',
      temp: '36.9°C',
      rr: '15 br/min',
      hrv: '56 ms',
      glucose: '98 mg/dL',
      cortisol: '14.0 µg/dL',
      lactate: '1.4 mmol/L',
      doseRate: '1.84 mSv/d',
      doseAcc: '55.2 mSv',
      sleepHrs: '6.4 hrs',
      workoutMin: '2,140 min',
      hrSeries: [60, 62, 63, 65, 68, 72, 69],
      readinessSeries: [85, 86, 84, 82, 80, 81, 82],
      radSeries: [1.75, 1.78, 1.82, 1.88, 1.86, 1.84, 1.84],
      changes: [
        { name: '30-Day Bone Mass', delta: '-1.4% BMD', val: 'Calcitonin Adjusted', dir: 'down' },
        { name: 'Aerobic VO₂ Retention', delta: '89.5% Baseline', val: 'Requires CEVIS boost', dir: 'down' },
        { name: 'Cumulative Radiation', delta: '242 mSv Total', val: 'EVA Dose Accumulation', dir: 'flat' },
        { name: 'Psychological Cohesion', delta: '88/100 Pts', val: 'Good Crew Dynamics', dir: 'up' }
      ]
    },
    'Live': {
      readiness: 74,
      alertsCount: 3,
      hr: '78 bpm',
      bp: '126/82',
      spo2: '97%',
      temp: '37.2°C',
      rr: '17 br/min',
      hrv: '48 ms',
      glucose: '108 mg/dL',
      cortisol: '16.2 µg/dL',
      lactate: '1.8 mmol/L',
      doseRate: '1.86 mSv/d',
      doseAcc: '242 mSv',
      sleepHrs: '4.8 hrs',
      workoutMin: '490 min',
      hrSeries: [76, 78, 77, 79, 78, 77, 78],
      readinessSeries: [74, 74, 75, 74, 74, 74, 74],
      radSeries: [1.85, 1.86, 1.86, 1.87, 1.86, 1.86, 1.86],
      changes: [
        { name: 'Live Heart Rate', delta: '78 bpm (Tachycardia Tendency)', val: 'Attention', dir: 'up' },
        { name: 'Live SpO₂', delta: '97.1%', val: 'Acceptable', dir: 'flat' }
      ]
    }
  },
  silva: {
    '1D': {
      readiness: 92,
      alertsCount: 0,
      hr: '62 bpm',
      bp: '114/72',
      spo2: '99%',
      temp: '36.7°C',
      rr: '13 br/min',
      hrv: '72 ms',
      glucose: '88 mg/dL',
      cortisol: '10.4 µg/dL',
      lactate: '0.9 mmol/L',
      doseRate: '1.77 mSv/d',
      doseAcc: '1.77 mSv',
      sleepHrs: '7.9 hrs',
      workoutMin: '95 min',
      hrSeries: [52, 50, 54, 68, 78, 120, 62],
      readinessSeries: [91, 91, 92, 92, 92, 92, 92],
      radSeries: [1.74, 1.75, 1.76, 1.78, 1.79, 1.77, 1.77],
      changes: [
        { name: 'Resting Pulse', delta: '-2 bpm (62 bpm)', val: 'Athletic Baseline', dir: 'down' },
        { name: 'Oxygen Saturation', delta: '99% SpO₂', val: 'Peak Diffusion', dir: 'up' },
        { name: 'ARED Loading Session', delta: '700 kg Equiv', val: '100% Target Met', dir: 'up' },
        { name: 'Stress / Cortisol', delta: '10.4 µg/dL', val: 'Calm & Focused', dir: 'down' }
      ]
    },
    '7D': {
      readiness: 91,
      alertsCount: 1,
      hr: '64 bpm',
      bp: '116/74',
      spo2: '99%',
      temp: '36.7°C',
      rr: '13 br/min',
      hrv: '68 ms',
      glucose: '89 mg/dL',
      cortisol: '10.8 µg/dL',
      lactate: '1.0 mmol/L',
      doseRate: '1.80 mSv/d',
      doseAcc: '12.60 mSv',
      sleepHrs: '7.6 hrs',
      workoutMin: '680 min',
      hrSeries: [70, 69, 70, 71, 70, 70, 64],
      readinessSeries: [90, 91, 90, 92, 91, 91, 91],
      radSeries: [1.72, 1.76, 1.80, 1.78, 1.82, 1.79, 1.80],
      changes: [
        { name: 'Weekly Mean HR', delta: '64 bpm', val: 'Highly Stable', dir: 'flat' },
        { name: 'Countermeasure Compliance', delta: '97% Target', val: '680 / 700 min', dir: 'up' },
        { name: 'Muscle Mass Retention', delta: '96.5% Baseline', val: 'ARED Resistance Nominal', dir: 'up' },
        { name: 'Total Radiation', delta: '208 mSv', val: '34% Career Limit', dir: 'flat' }
      ]
    },
    '30D': {
      readiness: 89,
      alertsCount: 3,
      hr: '66 bpm',
      bp: '118/76',
      spo2: '99%',
      temp: '36.7°C',
      rr: '14 br/min',
      hrv: '65 ms',
      glucose: '91 mg/dL',
      cortisol: '11.2 µg/dL',
      lactate: '1.1 mmol/L',
      doseRate: '1.79 mSv/d',
      doseAcc: '53.7 mSv',
      sleepHrs: '7.5 hrs',
      workoutMin: '2,740 min',
      hrSeries: [68, 67, 69, 70, 68, 69, 66],
      readinessSeries: [88, 89, 88, 90, 89, 89, 89],
      radSeries: [1.68, 1.72, 1.76, 1.82, 1.80, 1.79, 1.79],
      changes: [
        { name: '30-Day Bone Mineral', delta: '-0.6% BMD', val: 'Excellent Retention', dir: 'down' },
        { name: 'Aerobic VO₂ Retention', delta: '96.8% Baseline', val: 'CEVIS High Tier', dir: 'up' },
        { name: 'Cumulative Radiation', delta: '208 mSv Total', val: 'Minimal Exposure', dir: 'flat' },
        { name: 'EVA Operational Hours', delta: '24.0 hrs', val: '4 EVAs Completed', dir: 'up' }
      ]
    },
    'Live': {
      readiness: 92,
      alertsCount: 0,
      hr: '64 bpm',
      bp: '116/74',
      spo2: '99%',
      temp: '36.7°C',
      rr: '13 br/min',
      hrv: '68 ms',
      glucose: '89 mg/dL',
      cortisol: '10.8 µg/dL',
      lactate: '1.0 mmol/L',
      doseRate: '1.80 mSv/d',
      doseAcc: '208 mSv',
      sleepHrs: '7.6 hrs',
      workoutMin: '680 min',
      hrSeries: [63, 64, 64, 65, 64, 63, 64],
      readinessSeries: [92, 92, 92, 92, 92, 92, 92],
      radSeries: [1.79, 1.80, 1.80, 1.81, 1.80, 1.80, 1.80],
      changes: [
        { name: 'Live Heart Rate', delta: '64 bpm', val: 'Stable Sinus', dir: 'flat' },
        { name: 'Live SpO₂', delta: '99.0%', val: 'Optimal', dir: 'up' }
      ]
    }
  },
  chen: {
    '1D': {
      readiness: 95,
      alertsCount: 0,
      hr: '60 bpm',
      bp: '112/70',
      spo2: '98%',
      temp: '36.6°C',
      rr: '14 br/min',
      hrv: '74 ms',
      glucose: '90 mg/dL',
      cortisol: '9.8 µg/dL',
      lactate: '0.8 mmol/L',
      doseRate: '1.76 mSv/d',
      doseAcc: '1.76 mSv',
      sleepHrs: '8.2 hrs',
      workoutMin: '85 min',
      hrSeries: [50, 48, 52, 65, 75, 115, 60],
      readinessSeries: [94, 94, 95, 95, 95, 95, 95],
      radSeries: [1.72, 1.74, 1.75, 1.78, 1.77, 1.76, 1.76],
      changes: [
        { name: 'Resting Pulse', delta: '60 bpm', val: 'Deep Recovery', dir: 'down' },
        { name: 'Sleep Architecture', delta: '8.2 hrs (24% REM)', val: 'Superb Sleep Quality', dir: 'up' },
        { name: 'Cognitive Score', delta: '95 Pts', val: 'Reaction 198 ms', dir: 'up' },
        { name: 'Stress / Cortisol', delta: '9.8 µg/dL', val: 'Low Stress Nominal', dir: 'down' }
      ]
    },
    '7D': {
      readiness: 95,
      alertsCount: 0,
      hr: '62 bpm',
      bp: '114/72',
      spo2: '98%',
      temp: '36.6°C',
      rr: '14 br/min',
      hrv: '70 ms',
      glucose: '91 mg/dL',
      cortisol: '10.2 µg/dL',
      lactate: '0.9 mmol/L',
      doseRate: '1.78 mSv/d',
      doseAcc: '12.46 mSv',
      sleepHrs: '8.0 hrs',
      workoutMin: '610 min',
      hrSeries: [58, 59, 58, 60, 59, 58, 62],
      readinessSeries: [95, 94, 96, 93, 95, 94, 95],
      radSeries: [1.70, 1.74, 1.78, 1.76, 1.81, 1.77, 1.78],
      changes: [
        { name: 'Weekly Mean HR', delta: '62 bpm', val: 'Highly Stable', dir: 'flat' },
        { name: 'Weekly Sleep Average', delta: '8.0 hrs/night', val: 'Optimal Circadian', dir: 'up' },
        { name: 'Countermeasure Compliance', delta: '87% Target', val: '610 / 700 min', dir: 'up' },
        { name: 'Total Radiation', delta: '201 mSv', val: '33% Career Limit', dir: 'flat' }
      ]
    },
    '30D': {
      readiness: 93,
      alertsCount: 2,
      hr: '61 bpm',
      bp: '113/71',
      spo2: '98%',
      temp: '36.6°C',
      rr: '14 br/min',
      hrv: '68 ms',
      glucose: '89 mg/dL',
      cortisol: '10.5 µg/dL',
      lactate: '1.0 mmol/L',
      doseRate: '1.77 mSv/d',
      doseAcc: '53.1 mSv',
      sleepHrs: '7.8 hrs',
      workoutMin: '2,510 min',
      hrSeries: [59, 60, 58, 61, 60, 59, 61],
      readinessSeries: [93, 94, 92, 93, 94, 93, 93],
      radSeries: [1.66, 1.70, 1.74, 1.80, 1.78, 1.76, 1.77],
      changes: [
        { name: '30-Day Bone Mineral', delta: '-0.7% BMD', val: 'Nominal Preservation', dir: 'down' },
        { name: 'Cognitive Readiness', delta: '94 Pts Average', val: 'Top Performance', dir: 'up' },
        { name: 'Cumulative Radiation', delta: '201 mSv Total', val: 'Shielding Optimal', dir: 'flat' },
        { name: 'Science Protocol Logs', delta: '100% On-Time', val: 'Lab Operations Nom', dir: 'up' }
      ]
    },
    'Live': {
      readiness: 95,
      alertsCount: 0,
      hr: '62 bpm',
      bp: '114/72',
      spo2: '98%',
      temp: '36.6°C',
      rr: '14 br/min',
      hrv: '70 ms',
      glucose: '91 mg/dL',
      cortisol: '10.2 µg/dL',
      lactate: '0.9 mmol/L',
      doseRate: '1.78 mSv/d',
      doseAcc: '201 mSv',
      sleepHrs: '8.0 hrs',
      workoutMin: '610 min',
      hrSeries: [61, 62, 62, 63, 62, 61, 62],
      readinessSeries: [95, 95, 95, 95, 95, 95, 95],
      radSeries: [1.77, 1.78, 1.78, 1.79, 1.78, 1.78, 1.78],
      changes: [
        { name: 'Live Heart Rate', delta: '62 bpm', val: 'Sinus Rhythm', dir: 'flat' },
        { name: 'Live SpO₂', delta: '98.2%', val: 'Optimal', dir: 'up' }
      ]
    }
  }
};

// Getter helper for crew telemetry
function getTelemetry(crewId, range) {
  var cid = crewId || 'carter';
  var rng = range || '7D';
  if (!CREW_TELEMETRY_MAP[cid]) cid = 'carter';
  if (!CREW_TELEMETRY_MAP[cid][rng]) rng = '7D';
  return CREW_TELEMETRY_MAP[cid][rng];
}

function getCrewData(crewId) {
  var cid = crewId || 'carter';
  return CREW.find(function(c) { return c.id === cid; }) || CREW[0];
}

// Generate dynamic vitals list for any crew & range
function getCrewVitals(crewId, range) {
  var t = getTelemetry(crewId, range);
  var rng = range || '7D';
  var c = getCrewData(crewId);
  var isAttention = c.status === 'attention';

  return [
    {
      name: 'Heart Rate',
      label: 'Heart Rate',
      val: t.hr.replace(' bpm', ''),
      value: t.hr.replace(' bpm', ''),
      unit: 'bpm',
      status: isAttention ? 'attention' : 'stable',
      color: '#E94B5F',
      history: t.hrSeries,
      series: t.hrSeries
    },
    {
      name: 'Blood Pressure',
      label: 'Blood Pressure',
      val: t.bp,
      value: t.bp,
      unit: 'mmHg',
      status: 'stable',
      color: '#1769E8',
      history: [116, 118, 117, 119, 118, 117, 118],
      series: [116, 118, 117, 119, 118, 117, 118]
    },
    {
      name: 'SpO₂ Saturation',
      label: 'SpO₂ Saturation',
      val: t.spo2.replace('%', ''),
      value: t.spo2.replace('%', ''),
      unit: '%',
      status: 'stable',
      color: '#16B978',
      history: [97, 98, 98, 97, 98, 98, 98],
      series: [97, 98, 98, 97, 98, 98, 98]
    },
    {
      name: 'Respiratory Rate',
      label: 'Respiratory Rate',
      val: t.rr.replace(' br/min', ''),
      value: t.rr.replace(' br/min', ''),
      unit: 'br/min',
      status: 'stable',
      color: '#7657E8',
      history: [13, 14, 14, 13, 15, 14, 14],
      series: [13, 14, 14, 13, 15, 14, 14]
    },
    {
      name: 'Core Temperature',
      label: 'Core Temperature',
      val: t.temp.replace('°C', ''),
      value: t.temp.replace('°C', ''),
      unit: '°C',
      status: 'stable',
      color: '#38BDF8',
      history: [36.5, 36.6, 36.6, 36.7, 36.6, 36.5, 36.6],
      series: [36.5, 36.6, 36.6, 36.7, 36.6, 36.5, 36.6]
    },
    {
      name: 'HRV (RMSSD)',
      label: 'HRV (RMSSD)',
      val: t.hrv.replace(' ms', ''),
      value: t.hrv.replace(' ms', ''),
      unit: 'ms',
      status: isAttention ? 'attention' : 'stable',
      color: '#16B978',
      history: [58, 60, 62, 61, 64, 63, 64],
      series: [58, 60, 62, 61, 64, 63, 64]
    },
    {
      name: 'Blood Glucose',
      label: 'Blood Glucose',
      val: t.glucose.replace(' mg/dL', ''),
      value: t.glucose.replace(' mg/dL', ''),
      unit: 'mg/dL',
      status: 'stable',
      color: '#F5A623',
      history: [90, 92, 91, 94, 93, 92, 92],
      series: [90, 92, 91, 94, 93, 92, 92]
    },
    {
      name: 'Serum Cortisol',
      label: 'Serum Cortisol',
      val: t.cortisol.replace(' µg/dL', ''),
      value: t.cortisol.replace(' µg/dL', ''),
      unit: 'µg/dL',
      status: isAttention ? 'attention' : 'stable',
      color: '#E94B5F',
      history: [10, 11, 11, 12, 11, 12, 11],
      series: [10, 11, 11, 12, 11, 12, 11]
    }
  ];
}

// Generate dynamic systems list
function getCrewSystems(crewId, range) {
  var t = getTelemetry(crewId, range);
  var rng = range || '7D';
  var c = getCrewData(crewId);
  var isKim = c.id === 'kim';

  return [
    {
      id: 'cardiovascular',
      name: 'Cardiovascular',
      icon: 'heart',
      status: isKim ? 'Attention' : 'Stable',
      tags: 'Heart rate, BP, HRV, Stroke Volume',
      metrics: 'Heart Rate: ' + t.hr + ' • BP: ' + t.bp + ' mmHg • HRV: ' + t.hrv,
      blurb: 'Heart rate, blood pressure, heart-rate variability and cardiovascular stroke volume.',
      model: 'models/organs/realistic_human_heart.glb',
      miniModel: 'models/organs/VH_M_Heart.glb',
      cameraPos: [0, 0, 2.4],
      series: t.hrSeries,
      chartTitle: rng + ' Mean Resting Heart Rate (bpm)',
      chartUnit: 'bpm',
      chartData: t.hrSeries,
      parameters: [
        { label: 'Heart Rate', val: t.hr.replace(' bpm', ''), unit: 'bpm', status: isKim ? 'Attention' : 'Stable', delta: isKim ? '+8 bpm' : '-2 bpm' },
        { label: 'Blood Pressure', val: t.bp, unit: 'mmHg', status: 'Stable', delta: 'Nominal' },
        { label: 'HRV (RMSSD)', val: t.hrv.replace(' ms', ''), unit: 'ms', status: isKim ? 'Attention' : 'Stable', delta: isKim ? '-12 ms' : '+4 ms' },
        { label: 'Stroke Volume', val: isKim ? '74' : '84', unit: 'mL', status: 'Stable', delta: '-3%' }
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
      metrics: 'SpO₂: ' + t.spo2 + ' • Resp Rate: ' + t.rr + ' • Tidal Vol: 520 mL',
      blurb: 'Blood oxygen saturation, respiratory rate, alveolar diffusion and pulmonary compliance.',
      model: 'models/organs/realistic_human_lungs.glb',
      miniModel: 'models/organs/VH_M_Lung.glb',
      cameraPos: [0, 0, 2.6],
      series: [97, 98, 98, 97, 98, 98, 98],
      chartTitle: rng + ' Blood Oxygen Saturation SpO₂ (%)',
      chartUnit: '%',
      chartData: [97, 98, 98, 97, 98, 98, 98],
      parameters: [
        { label: 'SpO₂ Saturation', val: t.spo2.replace('%', ''), unit: '%', status: 'Stable', delta: 'Nominal' },
        { label: 'Resp Rate', val: t.rr.replace(' br/min', ''), unit: 'br/min', status: 'Stable', delta: '0 br/min' },
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
      status: isKim ? 'Attention' : 'Stable',
      tags: 'Cognitive, balance, EEG',
      metrics: 'Cognitive: ' + (isKim ? '82' : '91') + ' pts • Reaction: ' + (isKim ? '248' : '212') + ' ms • Balance: 94 pts',
      blurb: 'Cognitive performance, balance, reaction time, EEG rhythms and vestibular neuro-adaptation.',
      model: 'models/organs/realistic_human_brain.glb',
      miniModel: 'models/organs/Allen_M_Brain.glb',
      cameraPos: [0, 0, 2.5],
      series: isKim ? [86, 84, 82, 80, 81, 82, 82] : [88, 90, 89, 91, 90, 92, 91],
      chartTitle: rng + ' Cognitive Performance Score (pts)',
      chartUnit: 'pts',
      chartData: isKim ? [86, 84, 82, 80, 81, 82, 82] : [88, 90, 89, 91, 90, 92, 91],
      parameters: [
        { label: 'Cognitive Score', val: isKim ? '82' : '91', unit: 'pts', status: isKim ? 'Attention' : 'Stable', delta: isKim ? '-6 pts' : '+1 pt' },
        { label: 'Reaction Time', val: isKim ? '248' : '212', unit: 'ms', status: isKim ? 'Attention' : 'Stable', delta: isKim ? '+24 ms' : '-8 ms' },
        { label: 'Vestibular Balance', val: '94', unit: 'pts', status: 'Stable', delta: '+3 pts' },
        { label: 'EEG Alpha Power', val: '8.4', unit: 'µV²', status: 'Stable', delta: 'Nominal' }
      ],
      insights: [
        { title: 'Space Motion Sickness (SMS) Resolution', text: 'Neurovestibular otolith adaptation is complete. Saccadic eye movement and visual tracking latency within envelope.' },
        { title: 'Sleep Spindle Density & Coherence', text: 'NREM Stage 3 delta wave coherence supports procedural memory consolidation during transit.' }
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
      chartTitle: rng + ' Skeletal Loading Compliance (%)',
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
      status: isKim ? 'Attention' : 'Monitoring',
      tags: 'WBC, CRP, cortisol, T-cells',
      metrics: 'WBC Count: 6.4 k/µL • CRP: 0.8 mg/L • Cortisol: ' + t.cortisol,
      blurb: 'Immune markers, inflammatory cytokine load, endocrine balance and microgravity infection resistance.',
      model: 'models/organs/Endocrine.glb',
      miniModel: 'models/organs/Endocrine.glb',
      cameraPos: [0, 0, 2.5],
      series: isKim ? [62, 60, 58, 64, 62, 60, 59] : [70, 72, 71, 69, 70, 68, 69],
      chartTitle: rng + ' Immune Competence Score',
      chartUnit: 'pts',
      chartData: isKim ? [62, 60, 58, 64, 62, 60, 59] : [70, 72, 71, 69, 70, 68, 69],
      parameters: [
        { label: 'WBC Count', val: '6.4', unit: 'k/µL', status: 'Stable', delta: 'Nominal' },
        { label: 'C-Reactive Protein', val: '0.8', unit: 'mg/L', status: 'Stable', delta: '-0.2' },
        { label: 'Salivary Cortisol', val: t.cortisol.replace(' µg/dL', ''), unit: 'µg/dL', status: isKim ? 'Attention' : 'Monitoring', delta: isKim ? '+3.4' : '+0.8' },
        { label: 'T-Cell Activation', val: isKim ? '81' : '88', unit: '%', status: 'Monitoring', delta: '-3%' }
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
      status: isKim ? 'Attention' : 'Stable',
      tags: 'Sleep duration, REM, circadian shift',
      metrics: 'Sleep: ' + t.sleepHrs + ' • Stress: ' + (isKim ? '48' : '26') + ' pts • Circadian: ' + (isKim ? '-55 min' : '-12 min'),
      blurb: 'Sleep-wake architecture, cognitive workload, circadian alignment and stress resilience.',
      model: 'models/organs/sleep_astronaut.glb',
      miniModel: 'models/organs/sleep_astronaut.glb',
      cameraPos: [0, 0, 2.6],
      series: isKim ? [5.2, 5.0, 4.8, 4.6, 5.0, 4.8, 4.8] : [7.2, 7.4, 7.5, 7.1, 7.6, 7.8, 7.4],
      chartTitle: rng + ' Nightly Sleep Duration (Hours)',
      chartUnit: 'hrs',
      chartData: isKim ? [5.2, 5.0, 4.8, 4.6, 5.0, 4.8, 4.8] : [7.2, 7.4, 7.5, 7.1, 7.6, 7.8, 7.4],
      parameters: [
        { label: 'Sleep Duration', val: t.sleepHrs.replace(' hrs', ''), unit: 'hrs', status: isKim ? 'Attention' : 'Stable', delta: isKim ? '-2.7 hrs' : '+0.4 hrs' },
        { label: 'Stress Index', val: isKim ? '48' : '26', unit: 'pts', status: isKim ? 'Attention' : 'Stable', delta: isKim ? '+18 pts' : '-2 pts' },
        { label: 'REM Percentage', val: isKim ? '14' : '22', unit: '%', status: isKim ? 'Attention' : 'Stable', delta: isKim ? '-8%' : 'Nominal' },
        { label: 'Circadian Phase', val: isKim ? '-55' : '-12', unit: 'min', status: isKim ? 'Attention' : 'Stable', delta: isKim ? '-42 min' : 'Nominal' }
      ],
      insights: [
        { title: 'Circadian Desynchrony Detection', text: 'Recent mission timeline compression shifted sleep onset by ' + (isKim ? '55 minutes' : '12 minutes') + '.' },
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
      metrics: 'Dose Rate: ' + t.doseRate + ' • Career: ' + c.radiation + ' (35%)',
      blurb: 'Cumulative cosmic ray dose, solar particle event exposure, and tissue organ weighting factors.',
      model: 'models/organs/realistic_human_skeleton.glb',
      miniModel: 'models/organs/Skeleton.glb',
      cameraPos: [0, 0, 3.2],
      series: t.radSeries,
      chartTitle: rng + ' Cosmic Radiation Exposure Rate (mSv/day)',
      chartUnit: 'mSv',
      chartData: t.radSeries,
      parameters: [
        { label: 'Dose Rate', val: t.doseRate.replace(' mSv/d', ''), unit: 'mSv/d', status: 'Monitoring', delta: '+0.04' },
        { label: 'Cumulative Career', val: c.radiation.replace(' mSv', ''), unit: 'mSv', status: 'Stable', delta: '35% Limit' },
        { label: 'SPE Shielding', val: '99.4', unit: '%', status: 'Stable', delta: 'Nominal' },
        { label: 'Stem Cell Index', val: '96', unit: '%', status: 'Stable', delta: 'Nominal' }
      ],
      insights: [
        { title: 'Galactic Cosmic Ray (GCR) Baseline', text: 'Interplanetary cruise background radiation is averaging ' + t.doseRate + '. Water-wall shielding attenuation is nominal.' },
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
      chartTitle: rng + ' ECLSS Habitability Index (%)',
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
}

// Fallback arrays for backward compatibility
const SYSTEMS = getCrewSystems('carter', '7D');
const VITALS = getCrewVitals('carter', '7D');
const CHANGES = getTelemetry('carter', '7D').changes;

const ALERTS = [
  {
    id: 'sleep',
    title: 'Sleep Recovery Trend Reduced',
    status: 'attention',
    time: '12m ago',
    desc: 'Sleep duration dropped to 4.8 hrs over recent sols. Recommend circadian protocol adjustment.',
    icon: 'sleep'
  },
  {
    id: 'cardio',
    title: 'Resting Pulse Deviation (+8 bpm)',
    status: 'attention',
    time: '45m ago',
    desc: 'Resting pulse reached 74 bpm during rest cycle. Complete guided cardiovascular assessment.',
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
    desc: 'Completed 650 kg-equivalent zero-g resistance protocol with 100% telemetry adherence.',
    status: 'stable'
  }
];

const ACTS = [
  { name: 'ARED Heavy Resistance', type: 'Strength / Countermeasure', dur: 45, cal: 340, emoji: '&#128170;' },
  { name: 'T2 Treadmill Vibration Isolation', type: 'Cardio Protocol', dur: 35, cal: 280, emoji: '&#127939;' },
  { name: 'CEVIS Cycle Ergometer', type: 'VO₂ Max Maintenance', dur: 25, cal: 210, emoji: '&#128692;' }
];

const MISSION = {
  sol: 'Sol-184',
  day: 184,
  total: 912,
  name: 'Mars Transit Phase II',
  distance: '128.4M km',
  delay: '14.2 min',
  phase: 'Interplanetary Cruise',
  progress: 20
};

const DEVICES = [
  { name: 'BioMonitor Smart Chest Strap (BLE 5.2)', type: 'ECG / Respiration', emoji: '&#129706;' },
  { name: 'Continuous Interstitial Glucose Patch', type: 'Metabolic', emoji: '&#129656;' },
  { name: 'Astronaut Sleep EEG Headband', type: 'Neuro / Somnography', emoji: '&#129504;' },
  { name: 'Active Personal Dosimeter (GCR/SPE)', type: 'Radiation', emoji: '&#9762;' }
];

// W3Schools HTML Emojis for Mood Selection (https://www.w3schools.com/html/html_emojis.asp)
const MOODS = [
  { label: 'Energized', icon: '&#129321;', emojiCode: '&#129321;', symbol: '🤩', color: '#16B978', desc: 'Peak Physical & Cognitive Drive' },
  { label: 'Good', icon: '&#128522;', emojiCode: '&#128522;', symbol: '😊', color: '#7CC243', desc: 'Balanced & Mentally Focused' },
  { label: 'Neutral', icon: '&#128528;', emojiCode: '&#128528;', symbol: '😐', color: '#F5A623', desc: 'Steady Baseline Routine' },
  { label: 'Fatigued', icon: '&#129393;', emojiCode: '&#129393;', symbol: '🥱', color: '#F97316', desc: 'Mild Sleep Debt / Low Energy' },
  { label: 'Exhausted', icon: '&#128555;', emojiCode: '&#128555;', symbol: '😫', color: '#E94B5F', desc: 'High Stress / Physical Depletion' }
];

// Subjective Sliders with W3Schools HTML Emojis & Descriptions
const SLIDERS = [
  {
    id: 'energy',
    label: 'Physical Energy Level',
    emoji: '&#9889;',
    minEmoji: '&#128564;',
    maxEmoji: '&#128170;',
    minLabel: 'Exhausted',
    maxLabel: 'Peak Power',
    defaultVal: 85,
    color: '#1769E8'
  },
  {
    id: 'stress',
    label: 'Mission Cognitive Stress',
    emoji: '&#129504;',
    minEmoji: '&#129496;',
    maxEmoji: '&#129327;',
    minLabel: 'Calm & Zen',
    maxLabel: 'High Overload',
    defaultVal: 25,
    color: '#E94B5F'
  },
  {
    id: 'sleep',
    label: 'Sleep Restfulness & Quality',
    emoji: '&#127769;',
    minEmoji: '&#129393;',
    maxEmoji: '&#128564;',
    minLabel: 'Broken / Restless',
    maxLabel: 'Deep Zero-G REM',
    defaultVal: 80,
    color: '#7657E8'
  },
  {
    id: 'workload',
    label: 'Daily Operational Workload',
    emoji: '&#128640;',
    minEmoji: '&#9749;',
    maxEmoji: '&#128736;&#65039;',
    minLabel: 'Light Monitoring',
    maxLabel: 'Intensive EVA',
    defaultVal: 65,
    color: '#16B978'
  },
  {
    id: 'hydration',
    label: 'Fluid Balance & Hydration',
    emoji: '&#128167;',
    minEmoji: '&#127964;&#65039;',
    maxEmoji: '&#128167;',
    minLabel: 'Fluid Deficit',
    maxLabel: 'Fully Hydrated',
    defaultVal: 90,
    color: '#38BDF8'
  },
  {
    id: 'appetite',
    label: 'Appetite & Caloric Intake',
    emoji: '&#127822;',
    minEmoji: '&#129367;',
    maxEmoji: '&#127860;',
    minLabel: 'Low Appetite',
    maxLabel: '100% Caloric Goal',
    defaultVal: 85,
    color: '#F5A623'
  }
];

// Zero-G Symptom checklist with HTML emojis
const ZERO_G_SYMPTOMS = [
  { id: 'sans', label: 'Visual Clarity / SANS', emoji: '&#128065;&#65039;', desc: 'No intraocular blur' },
  { id: 'spine', label: 'Spinal Elongation Ache', emoji: '&#129460;', desc: 'Mild lower lumbar stretch' },
  { id: 'vestibular', label: 'Vestibular / Motion Stability', emoji: '&#129322;', desc: 'Zero motion sickness' },
  { id: 'acoustic', label: 'Hab Acoustic Noise Comfort', emoji: '&#128066;', desc: 'Cabin fan noise nominal' }
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

// Export to window for global access
window.DAYS = DAYS;
window.HEX = HEX;
window.CREW = CREW;
window.SYSTEMS = SYSTEMS;
window.VITALS = VITALS;
window.CHANGES = CHANGES;
window.ALERTS = ALERTS;
window.CREW_TL = CREW_TL;
window.EVENTS = EVENTS;
window.ACTS = ACTS;
window.MISSION = MISSION;
window.DEVICES = DEVICES;
window.MOODS = MOODS;
window.SLIDERS = SLIDERS;
window.ZERO_G_SYMPTOMS = ZERO_G_SYMPTOMS;
window.PROFILE = PROFILE;
window.getRangeLabels = getRangeLabels;
window.getTelemetry = getTelemetry;
window.getCrewData = getCrewData;
window.getCrewVitals = getCrewVitals;
window.getCrewSystems = getCrewSystems;
