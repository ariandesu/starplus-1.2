// js/views-astronaut.js — Astronaut Role Views & Login Screen for STAR PLUS 1.2

(function() {
  window.AstronautViews = {
    
    // Screen 01: Login / Role Selection
    login: function() {
      return '<div class="login">' +
               '<div class="nasa-logo-top">NASA</div>' +
               '<div class="login-inner">' +
                 '<div class="login-title-box">' +
                   '<h1>STAR <span>PLUS</span> v1.2</h1>' +
                   '<div class="tag">Astronaut Health &amp; Mission Readiness System</div>' +
                   '<div class="sub">Deep Space Health Monitoring Platform • Mars Transit Mission</div>' +
                 '</div>' +
                 '<div class="roles">' +
                   '<div class="rolecard" onclick="S.login(\'astronaut\')">' +
                     '<div class="role-ic">' + window.icon('profile', 28) + '</div>' +
                     '<h3>Astronaut Portal</h3>' +
                     '<p>Personal vitals, health system status, daily check-ins &amp; exercise logs.</p>' +
                     '<button class="btn btn-p" style="margin-top:20px; width:100%;">Enter as Astronaut</button>' +
                   '</div>' +
                   '<div class="rolecard" onclick="S.login(\'staff\')">' +
                     '<div class="role-ic">' + window.icon('crew', 28) + '</div>' +
                     '<h3>Flight Surgeon</h3>' +
                     '<p>Crew health overview, medical diagnostics, triage alerts &amp; clinical logs.</p>' +
                     '<button class="btn btn-p" style="margin-top:20px; width:100%;">Enter as Flight Surgeon</button>' +
                   '</div>' +
                   '<div class="rolecard" onclick="S.login(\'control\')">' +
                     '<div class="role-ic">' + window.icon('control', 28) + '</div>' +
                     '<h3>Mission Control</h3>' +
                     '<p>Telemetry summary, environmental status, radiation monitoring &amp; mission readiness.</p>' +
                     '<button class="btn btn-p" style="margin-top:20px; width:100%;">Enter as Mission Control</button>' +
                   '</div>' +
                 '</div>' +
                 '<div class="login-footer-row">' +
                   '<span>Demo Environment • Synthetic Telemetry Data</span>' +
                   '<span>NASA Human Research Program • Version 1.2.0</span>' +
                 '</div>' +
               '</div>' +
             '</div>';
    },

    // Screen 02: Astronaut Overview
    overview: function() {
      return '<div class="head">' +
               '<div>' +
                 '<h2>Astronaut Health Overview</h2>' +
                 '<p>Personal readiness status, active telemetry and body scan</p>' +
               '</div>' +
               '<div class="tabs">' +
                 '<button class="tab ' + (S.range==='1D'?'on':'') + '" onclick="S.set({range:\'1D\'})">1D</button>' +
                 '<button class="tab ' + (S.range==='7D'?'on':'') + '" onclick="S.set({range:\'7D\'})">7D</button>' +
                 '<button class="tab ' + (S.range==='30D'?'on':'') + '" onclick="S.set({range:\'30D\'})">30D</button>' +
               '</div>' +
             '</div>' +

             '<!-- Stat Pills Row -->' +
             '<div class="stat-pills-row">' +
               window.statCard('Health Readiness Score', '87', '/100', 'overview', '#EAF3FF', '#1769E8') +
               window.statCard('Active Telemetry Alerts', '2', '', 'alerts', '#FEF6E9', '#F5A623') +
               window.statCard('Days in Transit', '184', 'SOLS', 'mission', '#E8F8F2', '#16B978') +
               window.statCard('Next Assessment In', '3', 'DAYS', 'assessments', '#F1EDFD', '#7657E8') +
             '</div>' +

             '<div class="ov-grid">' +
               '<!-- 3D Body Model Card -->' +
               '<div class="card">' +
                 '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">' +
                   '<div>' +
                     '<div style="font-size:16px; font-weight:700;">Full Body Telemetry</div>' +
                     '<div class="muted">Interactive 3D Anatomical Scan</div>' +
                   '</div>' +
                   window.pill('stable', 'ALL SYSTEMS NOMINAL') +
                 '</div>' +
                 '<div id="body-3d-canvas" class="canvas-3d-wrapper" style="height:340px; background:#F8FAFC; border-radius:12px; border:1px solid #E2E8F0;"></div>' +
               '</div>' +

               '<!-- Right Stack: Health Changes & Quick Actions -->' +
               '<div style="display:flex; flex-direction:column; gap:20px;">' +
                 '<div class="card">' +
                   '<div style="font-size:15px; font-weight:700; margin-bottom:14px;">Recent Health Changes</div>' +
                   CHANGES.map(function(c) {
                     var iconName = c.dir === 'up' ? 'arrowup' : (c.dir === 'down' ? 'arrowdown' : 'minus');
                     var iconColor = c.dir === 'up' ? '#16B978' : (c.dir === 'down' ? '#E94B5F' : '#64748B');
                     return '<div class="rowline">' +
                              '<div style="display:flex; align-items:center; gap:8px;">' +
                                '<span style="color:' + iconColor + ';">' + window.icon(iconName, 14) + '</span>' +
                                '<span style="font-weight:600;">' + c.name + '</span>' +
                              '</div>' +
                              '<span class="muted">' + c.delta + ' (' + c.val + ')</span>' +
                            '</div>';
                   }).join('') +
                 '</div>' +

                 '<div class="card">' +
                   '<div style="font-size:15px; font-weight:700; margin-bottom:12px;">Quick Actions</div>' +
                   '<div style="display:flex; flex-direction:column; gap:8px;">' +
                     '<button class="btn btn-p" onclick="S.set({view:\'assessment\', step:0})" style="justify-content:center;">' + window.icon('assessments', 16) + ' Start Cardiovascular Assessment</button>' +
                     '<button class="btn" onclick="S.set({view:\'wellness\'})" style="justify-content:center;">' + window.icon('wellness', 16) + ' Daily Wellness Check-in</button>' +
                     '<button class="btn" onclick="S.set({view:\'activity\'})" style="justify-content:center;">' + window.icon('activity', 16) + ' Log Workout Activity</button>' +
                   '</div>' +
                 '</div>' +
               '</div>' +
             '</div>' +

             '<!-- Recent Alerts -->' +
             '<div style="margin-top:24px;">' +
               '<div style="font-size:16px; font-weight:700; margin-bottom:12px;">Active Medical Alerts</div>' +
               ALERTS.slice(0, 2).map(window.alertRow).join('') +
             '</div>';
    },

    // Screen 03: Health Systems Grid
    systems: function() {
      return '<div class="head">' +
               '<div>' +
                 '<h2>Your Health Systems</h2>' +
                 '<p>Real-time organ telemetry and systemic health analysis</p>' +
               '</div>' +
             '</div>' +

             '<div class="sys-grid">' +
               SYSTEMS.map(function(sys) {
                 var pillHtml = window.pill(sys.status, sys.status.toUpperCase());
                 var miniCanvasId = 'mini-3d-' + sys.id;
                 return '<div class="card hover" onclick="S.set({view:\'system-detail\', sys:\'' + sys.id + '\'})">' +
                          '<div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">' +
                            '<div id="' + miniCanvasId + '" class="mini-3d-container"></div>' +
                            pillHtml +
                          '</div>' +
                          '<div style="font-size:16px; font-weight:700; color:#0F172A;">' + sys.name + '</div>' +
                          '<div class="muted" style="margin-top:2px;">' + sys.metrics + '</div>' +
                          '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; pt:10px; border-top:1px solid #E2E8F0;">' +
                            '<span style="font-size:11px; font-weight:700; color:#1769E8;">VIEW TELEMETRY &rarr;</span>' +
                            '<span style="font-size:11px; color:#94A3B8;">Updated 2m ago</span>' +
                          '</div>' +
                        '</div>';
               }).join('') +
             '</div>';
    },

    // Screen 04: System Detail View
    systemDetail: function() {
      var sysId = S.sys || 'cardiovascular';
      var sysObj = SYSTEMS.find(function(s) { return s.id === sysId; }) || SYSTEMS[0];
      var tab = S.subTab || 'overview';

      return '<div class="head">' +
               '<div>' +
                 '<div style="display:flex; align-items:center; gap:12px;">' +
                   '<button class="btn" onclick="S.set({view:\'systems\'})">&larr; Back to Systems</button>' +
                   '<h2>' + sysObj.name + ' System</h2>' +
                   window.pill(sysObj.status, sysObj.status.toUpperCase()) +
                 '</div>' +
                 '<p style="margin-top:6px;">Detailed sensor stream and diagnostic telemetry</p>' +
               '</div>' +
               '<div class="tabs">' +
                 '<button class="tab ' + (tab==='overview'?'on':'') + '" onclick="S.set({subTab:\'overview\'})">Overview</button>' +
                 '<button class="tab ' + (tab==='trends'?'on':'') + '" onclick="S.set({subTab:\'trends\'})">Trends</button>' +
                 '<button class="tab ' + (tab==='insights'?'on':'') + '" onclick="S.set({subTab:\'insights\'})">Insights</button>' +
                 '<button class="tab ' + (tab==='recommendations'?'on':'') + '" onclick="S.set({subTab:\'recommendations\'})">Recommendations</button>' +
               '</div>' +
             '</div>' +

             '<div class="two">' +
               '<!-- Left: 3D Organ Canvas -->' +
               '<div class="card">' +
                 '<div style="font-size:16px; font-weight:700; margin-bottom:12px;">3D Organ Telemetry Model</div>' +
                 '<div id="detail-3d-canvas" class="canvas-3d-wrapper" style="height:360px; background:#F8FAFC; border-radius:12px; border:1px solid #E2E8F0;"></div>' +
                 '<div style="text-align:center; margin-top:12px;" class="muted">Drag to rotate • Scroll to zoom 3D model</div>' +
               '</div>' +

               '<!-- Right Stack: Key Metrics & 7-Day Trend Chart -->' +
               '<div style="display:flex; flex-direction:column; gap:20px;">' +
                 '<div class="card">' +
                   '<div style="font-size:16px; font-weight:700; margin-bottom:14px;">Key Telemetry Parameters</div>' +
                   '<div class="four" style="margin-bottom:0;">' +
                     '<div style="background:#F8FAFC; padding:12px; border-radius:10px; border:1px solid #E2E8F0;">' +
                       '<div class="tile-label">Heart Rate</div>' +
                       '<div class="value" style="font-size:20px;">68 <span class="unit">bpm</span></div>' +
                     '</div>' +
                     '<div style="background:#F8FAFC; padding:12px; border-radius:10px; border:1px solid #E2E8F0;">' +
                       '<div class="tile-label">Blood Pressure</div>' +
                       '<div class="value" style="font-size:18px;">118/76</div>' +
                     '</div>' +
                     '<div style="background:#F8FAFC; padding:12px; border-radius:10px; border:1px solid #E2E8F0;">' +
                       '<div class="tile-label">HRV</div>' +
                       '<div class="value" style="font-size:20px;">64 <span class="unit">ms</span></div>' +
                     '</div>' +
                     '<div style="background:#F8FAFC; padding:12px; border-radius:10px; border:1px solid #E2E8F0;">' +
                       '<div class="tile-label">Recovery Score</div>' +
                       '<div class="value" style="font-size:18px; color:#16B978;">GOOD</div>' +
                     '</div>' +
                   '</div>' +
                 '</div>' +

                 '<div class="card">' +
                   '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">' +
                     '<div style="font-size:16px; font-weight:700;">7-Day Vital Trend Chart</div>' +
                     '<div class="tabs">' +
                       '<button class="tab ' + (S.range==='1D'?'on':'') + '" onclick="S.set({range:\'1D\'})">1D</button>' +
                       '<button class="tab ' + (S.range==='7D'?'on':'') + '" onclick="S.set({range:\'7D\'})">7D</button>' +
                       '<button class="tab ' + (S.range==='30D'?'on':'') + '" onclick="S.set({range:\'30D\'})">30D</button>' +
                     '</div>' +
                   '</div>' +
                   window.areaChart([64, 68, 66, 72, 70, 68, 67], DAYS, '#1769E8', 460, 160) +
                 '</div>' +
               '</div>' +
             '</div>';
    },

    // Screen 05: Vital Signs Grid
    vitals: function() {
      return '<div class="head">' +
               '<div>' +
                 '<h2>Vital Signs Stream</h2>' +
                 '<p>Continuous physiological telemetry streaming from suit biosensors</p>' +
               '</div>' +
               '<div class="tabs">' +
                 '<button class="tab ' + (S.range==='Live'?'on':'') + '" onclick="S.set({range:\'Live\'})">Live</button>' +
                 '<button class="tab ' + (S.range==='1D'?'on':'') + '" onclick="S.set({range:\'1D\'})">1D</button>' +
                 '<button class="tab ' + (S.range==='7D'?'on':'') + '" onclick="S.set({range:\'7D\'})">7D</button>' +
               '</div>' +
             '</div>' +

             '<div class="vit-grid">' +
               VITALS.map(function(v) {
                 return '<div class="card">' +
                          '<div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">' +
                            '<div>' +
                              '<div class="tile-label">' + v.name + '</div>' +
                              '<div class="value" style="margin-top:4px;">' + v.val + ' <span class="unit">' + v.unit + '</span></div>' +
                            '</div>' +
                            window.pill(v.status, v.status.toUpperCase()) +
                          '</div>' +
                          '<div style="margin-top:14px; background:#F8FAFC; border-radius:8px; padding:8px 4px 0 4px;">' +
                            window.sparkline(v.history, v.color, 240, 50, true) +
                          '</div>' +
                        '</div>';
               }).join('') +
             '</div>';
    },

    // Screen 06: Assessment Wizard
    assessment: function() {
      var step = S.step || 0;
      var pct = Math.round(((step + 1) / 4) * 100);

      var bodyContent = '';
      if (step === 0) {
        bodyContent = '<div style="text-align:center; padding:20px 0;">' +
                        '<div style="width:64px; height:64px; border-radius:50%; background:#EAF3FF; color:#1769E8; display:grid; place-items:center; margin:0 auto 16px;">' +
                          window.icon('heartpulse', 32) +
                        '</div>' +
                        '<h3 style="font-size:20px; font-weight:800;">Cardiovascular Protocol Setup</h3>' +
                        '<p style="max-width:440px; margin:8px auto; color:#64748B; font-size:13px;">' +
                          'This 4-step guided assessment collects precise blood pressure, pulse wave velocity, and HRV data for Mission Control medical records.' +
                        '</p>' +
                      '</div>';
      } else if (step === 1) {
        bodyContent = '<div style="padding:10px 0;">' +
                        '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">' +
                          '<span style="font-weight:700;">Blood Pressure Measurement</span>' +
                          window.pill('stable', 'CAPTURED') +
                        '</div>' +
                        '<div style="background:#F8FAFC; border-radius:12px; padding:24px; text-align:center; border:1px solid #E2E8F0;">' +
                          '<div class="tile-label">Systolic / Diastolic</div>' +
                          '<div style="font-size:42px; font-weight:900; color:#0F172A; margin:6px 0;">118 / 76 <span class="unit" style="font-size:16px;">mmHg</span></div>' +
                          '<div style="color:#16B978; font-weight:600; font-size:12px;">Optimal Range (Nominal Zero-G Adaptation)</div>' +
                        '</div>' +
                      '</div>';
      } else if (step === 2) {
        bodyContent = '<div style="padding:10px 0;">' +
                        '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">' +
                          '<span style="font-weight:700;">Heart Rate Variability (HRV)</span>' +
                          window.pill('stable', 'CAPTURED') +
                        '</div>' +
                        '<div style="background:#F8FAFC; border-radius:12px; padding:20px; border:1px solid #E2E8F0;">' +
                          '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">' +
                            '<span class="tile-label">Continuous ECG Waveform</span>' +
                            '<span style="font-size:22px; font-weight:800;">64 <span class="unit">ms</span></span>' +
                          '</div>' +
                          window.sparkline([60,65,58,72,64,68,62,69,64], '#1769E8', 420, 70, true) +
                        '</div>' +
                      '</div>';
      } else if (step === 3) {
        bodyContent = '<div style="padding:10px 0;">' +
                        '<h3 style="font-size:18px; font-weight:700; margin-bottom:14px;">Review Assessment Summary</h3>' +
                        '<div style="background:#F8FAFC; border-radius:12px; padding:16px; border:1px solid #E2E8F0;">' +
                          '<div class="rowline"><span>Blood Pressure</span><span style="font-weight:700;">118/76 mmHg</span></div>' +
                          '<div class="rowline"><span>Heart Rate Variability</span><span style="font-weight:700;">64 ms</span></div>' +
                          '<div class="rowline"><span>Resting Pulse</span><span style="font-weight:700;">68 bpm</span></div>' +
                          '<div class="rowline"><span>Autonomic Balance</span><span style="font-weight:700; color:#16B978;">Normal (0.84)</span></div>' +
                        '</div>' +
                      '</div>';
      }

      return '<div style="max-width:680px; margin:0 auto;">' +
               '<div class="card">' +
                 '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">' +
                   '<span style="font-size:14px; font-weight:700; color:#1769E8;">STEP ' + (step + 1) + ' OF 4</span>' +
                   '<span class="muted">' + pct + '% Complete</span>' +
                 '</div>' +
                 window.meterBar(step + 1, 4, '#1769E8') +
                 '<div style="margin-top:24px;">' + bodyContent + '</div>' +
                 '<div style="display:flex; justify-content:space-between; margin-top:32px; pt:16px; border-top:1px solid #E2E8F0;">' +
                   '<button class="btn" ' + (step===0?'disabled style="opacity:0.5;"':'onclick="S.stepBack()"') + '>&larr; Previous</button>' +
                   (step < 3 ?
                     '<button class="btn btn-p" onclick="S.stepNext()">Continue &rarr;</button>' :
                     '<button class="btn btn-green" onclick="S.submitAssessment()">Submit to Flight Surgeon ✓</button>') +
                 '</div>' +
               '</div>' +
             '</div>';
    },

    // Screen 07: Daily Wellness Check-in
    wellness: function() {
      return '<div class="head">' +
               '<div>' +
                 '<h2>Daily Wellness Check-in</h2>' +
                 '<p>Subjective wellbeing, mood, and cognitive readiness report</p>' +
               '</div>' +
             '</div>' +

             '<div style="max-width:760px; margin:0 auto; display:flex; flex-direction:column; gap:20px;">' +
               '<div class="card">' +
                 '<div style="font-size:15px; font-weight:700; margin-bottom:14px;">How are you feeling today?</div>' +
                 '<div class="moodrow">' +
                   MOODS.map(function(m, idx) {
                     var sel = S.mood === idx ? 'on' : '';
                     return '<button class="mood ' + sel + '" onclick="S.set({mood:' + idx + '})">' +
                              '<span style="font-size:28px;">' + m.icon + '</span>' +
                              '<span style="font-size:12px; font-weight:600;">' + m.label + '</span>' +
                            '</button>';
                   }).join('') +
                 '</div>' +
               '</div>' +

               '<div class="card">' +
                 '<div style="font-size:15px; font-weight:700; margin-bottom:16px;">Subjective Indicators</div>' +
                 '<div style="display:flex; flex-direction:column; gap:20px;">' +
                   SLIDERS.map(function(sl) {
                     var val = S.sliders ? (S.sliders[sl.id] || 50) : 50;
                     return '<div class="sliderrow">' +
                              '<span style="font-size:13px; font-weight:600;">' + sl.label + '</span>' +
                              '<input type="range" min="0" max="100" value="' + val + '" oninput="S.setSlider(\'' + sl.id + '\', this.value)">' +
                              '<span style="text-align:right; font-weight:700; color:#1769E8;">' + val + '%</span>' +
                            '</div>';
                   }).join('') +
                 '</div>' +
               '</div>' +

               '<div class="note-banner">' +
                 '<span style="font-size:20px;">💡</span>' +
                 '<div>' +
                   '<strong>System Notice:</strong> Your sleep score shows a 12% drop compared to baseline. Recommend 20min relaxation protocol before sleep cycle.' +
                 '</div>' +
               '</div>' +

               '<div style="text-align:right;">' +
                 '<button class="btn btn-p" style="padding:10px 24px;" onclick="alert(\'Wellness check-in logged successfully!\'); S.set({view:\'overview\'});">Submit Daily Log</button>' +
               '</div>' +
             '</div>';
    },

    // Screen 08: Space Radiation
    radiation: function() {
      return '<div class="head">' +
               '<div>' +
                 '<h2>Space Radiation Dosimetry</h2>' +
                 '<p>Active cosmic radiation monitoring and accumulated crew dosage</p>' +
               '</div>' +
             '</div>' +

             '<div class="two">' +
               '<!-- Left Col -->' +
               '<div style="display:flex; flex-direction:column; gap:20px;">' +
                 '<div class="card">' +
                   '<div class="tile-label">Current Ambient Exposure Rate</div>' +
                   '<div class="value" style="font-size:36px; margin:8px 0; color:#1769E8;">1.82 <span class="unit" style="font-size:16px;">mSv / day</span></div>' +
                   '<div style="margin-top:12px;">' +
                     '<div style="display:flex; justify-content:space-between; font-size:11px; font-weight:700; margin-bottom:4px;">' +
                       '<span>SAFE LEVEL</span>' +
                       '<span>ELEVATED</span>' +
                       '<span>CRITICAL</span>' +
                     '</div>' +
                     window.meterBar(1.82, 5.0, '#1769E8') +
                   '</div>' +
                 '</div>' +

                 '<div class="card">' +
                   '<div class="tile-label">Accumulated Mission Dose</div>' +
                   '<div class="value" style="font-size:36px; margin:8px 0;">214 <span class="unit" style="font-size:16px;">mSv</span></div>' +
                   '<div class="muted">35% of Career Safe Limit (600 mSv)</div>' +
                   '<div style="margin-top:12px;">' + window.meterBar(214, 600, '#16B978') + '</div>' +
                 '</div>' +
               '</div>' +

               '<!-- Right Col -->' +
               '<div style="display:flex; flex-direction:column; gap:20px;">' +
                 '<div class="card">' +
                   '<div style="font-size:15px; font-weight:700; margin-bottom:12px;">Space Weather &amp; Shielding</div>' +
                   '<div class="rowline"><span>Solar Particle Event Status</span>' + window.pill('stable', 'NOMINAL (QUIET SUN)') + '</div>' +
                   '<div class="rowline"><span>Habitat Storm Shelter Shielding</span>' + window.pill('stable', '100% OPERATIONAL') + '</div>' +
                   '<div class="rowline"><span>Galactic Cosmic Rays (GCR)</span>' + window.pill('monitoring', 'MODERATE SPECTRUM') + '</div>' +
                 '</div>' +

                 '<div class="card">' +
                   '<div style="font-size:15px; font-weight:700; margin-bottom:12px;">7-Day Dose Accumulation Chart</div>' +
                   window.areaChart([1.75, 1.80, 1.82, 1.79, 1.85, 1.81, 1.82], DAYS, '#7657E8', 460, 150) +
                 '</div>' +
               '</div>' +
             '</div>';
    },

    // Screen 09: Activity & Exercise
    activity: function() {
      return '<div class="head">' +
               '<div>' +
                 '<h2>Activity &amp; Countermeasure Workout</h2>' +
                 '<p>Daily zero-g physical exercise requirements to prevent bone loss</p>' +
               '</div>' +
             '</div>' +

             '<div class="two">' +
               '<div class="card" style="text-align:center;">' +
                 '<div style="font-size:16px; font-weight:700; margin-bottom:20px;">Daily Countermeasure Goal</div>' +
                 window.donutRing(82, '#16B978', 180, 16, '620 min', 'Completed / 750') +
                 '<div style="margin-top:20px; font-size:13px; color:#64748B;">' +
                   'Great job! You have reached 82% of your weekly zero-g physical protocol.' +
                 '</div>' +
               '</div>' +

               '<div class="card">' +
                 '<div style="font-size:16px; font-weight:700; margin-bottom:14px;">Today\'s Completed Sessions</div>' +
                 ACTS.map(function(act) {
                   return '<div style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid #E2E8F0;">' +
                            '<div style="display:flex; align-items:center; gap:12px;">' +
                              '<div style="width:36px; height:36px; border-radius:10px; background:#E8F8F2; color:#16B978; display:grid; place-items:center;">' +
                                window.icon('check', 18) +
                              '</div>' +
                              '<div>' +
                                '<div style="font-weight:700; font-size:14px;">' + act.name + '</div>' +
                                '<div style="font-size:12px; color:#64748B;">' + act.type + ' • ' + act.dur + ' min</div>' +
                              '</div>' +
                            '</div>' +
                            '<span style="font-weight:700; color:#1769E8;">' + act.cal + ' kcal</span>' +
                          '</div>';
                 }).join('') +
               '</div>' +
             '</div>';
    },

    // Screen 10: Action Center / Alerts
    alerts: function() {
      return '<div class="head">' +
               '<div>' +
                 '<h2>Action Center &amp; Alerts</h2>' +
                 '<p>Active medical notifications, triage warnings, and action items</p>' +
               '</div>' +
             '</div>' +

             '<div style="max-width:840px; margin:0 auto;">' +
               ALERTS.map(window.alertRow).join('') +
             '</div>';
    },

    // Screen 11: Mission Info
    mission: function() {
      return '<div class="head">' +
               '<div>' +
                 '<h2>Mission Metadata &amp; Orbit Path</h2>' +
                 '<p>Mars Transfer Telemetry • Spacecraft Environment</p>' +
               '</div>' +
             '</div>' +

             '<div style="display:flex; flex-direction:column; gap:20px;">' +
               '<!-- Hero Banner -->' +
               '<div class="mission-hero">' +
                 '<div class="mars-sphere"></div>' +
                 '<div style="position:relative; z-index:2; max-width:540px;">' +
                   '<div style="font-size:12px; font-weight:700; color:#38BDF8; letter-spacing:0.1em; text-transform:uppercase;">MISSION CONTROL STREAM</div>' +
                   '<h2 style="font-size:28px; font-weight:900; margin:6px 0 10px;">Mars Transit Phase II</h2>' +
                   '<p style="font-size:13px; color:rgba(255,255,255,0.8); line-height:1.6;">' +
                     'Spacecraft Hermes 1 is currently in interplanetary transit toward Mars insertion orbit. All life support systems nominal.' +
                   '</p>' +
                 '</div>' +
               '</div>' +

               '<div class="four">' +
                 '<div class="card"><div class="tile-label">Distance to Earth</div><div class="value">128.4M <span class="unit">km</span></div></div>' +
                 '<div class="card"><div class="tile-label">Comm Delay</div><div class="value">14.2 <span class="unit">min</span></div></div>' +
                 '<div class="card"><div class="tile-label">Cabin Pressure</div><div class="value">101.3 <span class="unit">kPa</span></div></div>' +
                 '<div class="card"><div class="tile-label">Cabin O₂ Level</div><div class="value">20.9 <span class="unit">%</span></div></div>' +
               '</div>' +
             '</div>';
    },

    // Screen 12: Profile & Settings
    profile: function() {
      return '<div class="head">' +
               '<div>' +
                 '<h2>Astronaut Profile &amp; Devices</h2>' +
                 '<p>Personal credentials, connected biosensors, and telemetry sync</p>' +
               '</div>' +
             '</div>' +

             '<div class="two">' +
               '<div class="card">' +
                 '<div style="display:flex; align-items:center; gap:16px; margin-bottom:20px;">' +
                   '<div style="width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, #0B192C, #1769E8); color:#FFF; display:grid; place-items:center; font-weight:800; font-size:22px;">' +
                     'AC' +
                   '</div>' +
                   '<div>' +
                     '<h3 style="font-size:18px; font-weight:800;">Alex Carter</h3>' +
                     '<div style="font-size:13px; color:#64748B;">Commander • AST-001</div>' +
                     '<div style="font-size:12px; color:#1769E8; font-weight:600; margin-top:2px;">Mission: Mars Transit I</div>' +
                   '</div>' +
                 '</div>' +
                 '<div class="rowline"><span>Age / Gender</span><span style="font-weight:600;">38 / Male</span></div>' +
                 '<div class="rowline"><span>Height / Weight</span><span style="font-weight:600;">182 cm / 78 kg</span></div>' +
                 '<div class="rowline"><span>Blood Type</span><span style="font-weight:600;">O Positive</span></div>' +
               '</div>' +

               '<div class="card">' +
                 '<div style="font-size:16px; font-weight:700; margin-bottom:14px;">Connected Telemetry Devices</div>' +
                 DEVICES.map(function(d) {
                   return '<div class="rowline">' +
                            '<div style="display:flex; align-items:center; gap:10px;">' +
                              '<span style="color:#1769E8;">' + window.icon('device', 16) + '</span>' +
                              '<span>' + d.name + '</span>' +
                            '</div>' +
                            window.pill('stable', 'CONNECTED') +
                          '</div>';
                 }).join('') +
               '</div>' +
             '</div>';
    }
  };
})();
