// js/views-staff.js — Medical Officer & Mission Control Views for STAR PLUS 1.2

(function() {
  window.StaffViews = {

    // Screen 13: Medical Officer — Crew Overview
    staffOverview: function() {
      return '<div class="head">' +
               '<div>' +
                 '<div style="display:flex; align-items:center; gap:12px;">' +
                   '<h2>Crew Health Overview</h2>' +
                   window.pill('stable', '4 / 4 OPERATIONAL') +
                 '</div>' +
                 '<p style="margin-top:4px;">Medical Officer Diagnostic Console • Real-time Crew Monitoring</p>' +
               '</div>' +
             '</div>' +

             '<!-- 4 Crew Cards Grid -->' +
             '<div class="sys-grid" style="margin-bottom:24px;">' +
               CREW.map(function(c) {
                 var isActive = S.crewId === c.id;
                 return window.crewCard(c, isActive);
               }).join('') +
             '</div>' +

             '<!-- 7-Day Health Timeline -->' +
             '<div class="card">' +
               '<div style="font-size:16px; font-weight:700; margin-bottom:16px;">Crew Status Timeline (Past 7 Days)</div>' +
               CREW_TL.map(function(ctl) {
                 return '<div class="tl-row">' +
                          '<div class="tl-name">' + ctl.name + '</div>' +
                          '<div class="tl-dots">' +
                            ctl.dots.map(function(dotColor) {
                              return '<span class="tl-dot" style="background:' + dotColor + ';"></span>';
                            }).join('') +
                          '</div>' +
                        '</div>';
               }).join('') +
             '</div>';
    },

    // Screen 14: Medical Officer — Crew Detail (J. Kim)
    crewDetail: function() {
      var crewId = S.crewId || 'AST-002';
      var c = CREW.find(function(item) { return item.id === crewId; }) || CREW[1];

      return '<div class="head">' +
               '<div>' +
                 '<div style="display:flex; align-items:center; gap:12px;">' +
                   '<button class="btn" onclick="S.set({view:\'staff-overview\'})">&larr; Back to Crew</button>' +
                   '<h2>' + c.name + ' Telemetry</h2>' +
                   window.pill(c.status, c.status.toUpperCase()) +
                 '</div>' +
                 '<p style="margin-top:4px;">' + c.role + ' • ID: ' + c.id + '</p>' +
               '</div>' +
             '</div>' +

             '<div class="two">' +
               '<!-- Multi-line Vital Chart -->' +
               '<div class="card">' +
                 '<div style="font-size:16px; font-weight:700; margin-bottom:14px;">7-Day Multi-Metric Telemetry Chart</div>' +
                 window.multiLineChart([
                   { color: '#E94B5F', data: [72, 74, 78, 80, 76, 75, 74] },
                   { color: '#1769E8', data: [118, 120, 124, 122, 119, 118, 117] },
                   { color: '#16B978', data: [98, 98, 97, 98, 98, 99, 98] }
                 ], DAYS, 480, 200) +
                 '<div style="display:flex; justify-content:center; gap:20px; margin-top:14px; font-size:12px; font-weight:600;">' +
                   '<span style="color:#E94B5F;">● Heart Rate (bpm)</span>' +
                   '<span style="color:#1769E8;">● Systolic BP (mmHg)</span>' +
                   '<span style="color:#16B978;">● SpO₂ (%)</span>' +
                 '</div>' +
               '</div>' +

               '<!-- Recent Events List -->' +
               '<div class="card">' +
                 '<div style="font-size:16px; font-weight:700; margin-bottom:14px;">Clinical Events &amp; Observations</div>' +
                 EVENTS.map(function(ev) {
                   return '<div class="rowline">' +
                            '<div>' +
                              '<div style="font-weight:700;">' + ev.title + '</div>' +
                              '<div style="font-size:11px; color:#94A3B8;">' + ev.time + ' • ' + ev.desc + '</div>' +
                            '</div>' +
                            window.pill(ev.status, ev.status.toUpperCase()) +
                          '</div>';
                 }).join('') +
               '</div>' +
             '</div>';
    },

    // Screen 15: Mission Control Overview
    controlOverview: function() {
      return '<div class="head">' +
               '<div>' +
                 '<h2>Mission Control Global Dashboard</h2>' +
                 '<p>Spacecraft Systems, Life Support &amp; Environmental Telemetry</p>' +
               '</div>' +
             '</div>' +

             '<div class="ov-grid">' +
               '<div style="display:flex; flex-direction:column; gap:20px;">' +
                 '<!-- Overall Health -->' +
                 '<div class="card">' +
                   '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">' +
                     '<span style="font-size:16px; font-weight:700;">Overall Fleet Health Index</span>' +
                     '<span style="font-size:24px; font-weight:900; color:#1769E8;">88%</span>' +
                   '</div>' +
                   window.meterBar(88, 100, '#1769E8') +
                 '</div>' +

                 '<!-- Environment metrics -->' +
                 '<div class="card">' +
                   '<div style="font-size:16px; font-weight:700; margin-bottom:14px;">Hab Environmental Parameters</div>' +
                   '<div class="four">' +
                     '<div style="background:#F8FAFC; padding:12px; border-radius:10px; border:1px solid #E2E8F0;">' +
                       '<div class="tile-label">Radiation Rate</div>' +
                       '<div class="value" style="font-size:18px;">1.82 <span class="unit">mSv</span></div>' +
                       '<div style="margin-top:4px;">' + window.pill('stable', 'NOMINAL') + '</div>' +
                     '</div>' +
                     '<div style="background:#F8FAFC; padding:12px; border-radius:10px; border:1px solid #E2E8F0;">' +
                       '<div class="tile-label">Atmosphere CO₂</div>' +
                       '<div class="value" style="font-size:18px;">0.31 <span class="unit">%</span></div>' +
                       '<div style="margin-top:4px;">' + window.pill('stable', 'NOMINAL') + '</div>' +
                     '</div>' +
                     '<div style="background:#F8FAFC; padding:12px; border-radius:10px; border:1px solid #E2E8F0;">' +
                       '<div class="tile-label">Hab Temp</div>' +
                       '<div class="value" style="font-size:18px;">21.4 <span class="unit">°C</span></div>' +
                       '<div style="margin-top:4px;">' + window.pill('stable', 'NOMINAL') + '</div>' +
                     '</div>' +
                     '<div style="background:#F8FAFC; padding:12px; border-radius:10px; border:1px solid #E2E8F0;">' +
                       '<div class="tile-label">Relative Humidity</div>' +
                       '<div class="value" style="font-size:18px;">44 <span class="unit">%</span></div>' +
                       '<div style="margin-top:4px;">' + window.pill('stable', 'NOMINAL') + '</div>' +
                     '</div>' +
                   '</div>' +
                 '</div>' +
               '</div>' +

               '<!-- Right Column: Mission Hero -->' +
               '<div class="card mission-hero" style="min-height:300px;">' +
                 '<div class="mars-sphere"></div>' +
                 '<div style="position:relative; z-index:2;">' +
                   '<div style="font-size:12px; font-weight:700; color:#38BDF8;">MARS TRANSIT TRAJECTORY</div>' +
                   '<h3 style="font-size:24px; font-weight:900; margin:8px 0 14px;">DAY 184 OF 912</h3>' +
                   '<div class="rowline" style="border-color:rgba(255,255,255,0.15); color:#FFF;"><span>Distance</span><span style="font-weight:700;">128.4M km</span></div>' +
                   '<div class="rowline" style="border-color:rgba(255,255,255,0.15); color:#FFF;"><span>Comm Lag</span><span style="font-weight:700;">14.2 min</span></div>' +
                   '<div class="rowline" style="border-color:rgba(255,255,255,0.15); color:#FFF;"><span>Trajectory Delta-V</span><span style="font-weight:700; color:#38BDF8;">0.00 m/s (On Track)</span></div>' +
                 '</div>' +
               '</div>' +
             '</div>';
    }
  };
})();
