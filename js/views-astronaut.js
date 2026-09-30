// js/views-astronaut.js — Complete Astronaut Section Views for STAR PLUS 1.2
// Exactly aligned with reference mockups (Home, My Health, 3D Body, Missions, Learn, NASA Data)

(function() {
  window.V = window.V || {};
  window.AstronautViews = window.AstronautViews || {};

  // Helper: Render Crew Switcher Bar
  function renderCrewBar(activeId) {
    var crewList = window.CREW || [];
    var cards = crewList.map(function(c) {
      var active = (c.id === activeId) ? 'active' : '';
      var statusColor = c.status === 'stable' ? 'color:var(--emerald);' : (c.status === 'attention' ? 'color:var(--amber);' : 'color:var(--azure);');
      return '<div class="crew-quick-card ' + active + '" onclick="S.switchCrew(\'' + c.id + '\')">' +
               '<div class="crew-card-avatar">' + c.avatar + '</div>' +
               '<div class="crew-card-info">' +
                 '<div class="crew-card-name">' + c.name + ' <span style="font-size:10px; opacity:0.75;">(' + c.sid + ')</span></div>' +
                 '<div class="crew-card-sub">' +
                   '<span>' + c.role + '</span>' +
                   '<span style="' + statusColor + '">• ' + (c.status === 'stable' ? 'Nominal' : 'Attention') + '</span>' +
                 '</div>' +
               '</div>' +
               '<div class="crew-card-readiness" style="background:var(--primary-light); color:var(--primary);">' +
                 c.readiness + '%' +
               '</div>' +
             '</div>';
    }).join('');

    return '<div class="crew-quick-bar">' + cards + '</div>';
  }

  // Helper: Render Date Range Selector
  function renderRangeTabs(activeRange) {
    var ranges = ['1D', '7D', '30D', 'Live'];
    var tabs = ranges.map(function(r) {
      var active = (r === activeRange) ? 'active' : '';
      return '<button class="range-tab-btn ' + active + '" onclick="S.setRange(\'' + r + '\')">' + r + '</button>';
    }).join('');

    return '<div class="range-tabs-row">' +
             '<div class="range-tabs-group">' + tabs + '</div>' +
             '<div class="custom-date-filter-box">' +
               '<span style="font-size:11px; font-weight:700; color:var(--text-secondary);">' + window.icon('calendar', 12) + ' Range:</span>' +
               '<input type="date" class="custom-date-input" id="date-from" value="2026-09-24">' +
               '<span style="font-size:11px; color:var(--text-secondary);">to</span>' +
               '<input type="date" class="custom-date-input" id="date-to" value="2026-09-30">' +
               '<button class="date-apply-btn" onclick="S.setRange(\'7D\')">Apply</button>' +
             '</div>' +
           '</div>';
  }

  // 0. LOGIN PORTAL VIEW
  var loginView = function() {
    return '<div class="login-wrapper animate-fade-in" style="min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#F8FAFC; padding:24px;">' +
             '<div style="text-align:center; max-width:540px; margin-bottom:32px;">' +
               '<div style="display:inline-flex; align-items:center; gap:10px; background:#EFF6FF; border:1px solid #BFDBFE; padding:6px 14px; border-radius:999px; margin-bottom:14px;">' +
                 '<span style="font-size:14px;">🚀</span>' +
                 '<span style="font-size:12px; font-weight:800; color:#1D4ED8; letter-spacing:0.05em;">STAR+ MISSION CONTROL • ARES V</span>' +
               '</div>' +
               '<h1 style="font-size:32px; font-weight:900; color:#0F172A; letter-spacing:-0.03em; margin-bottom:8px;">Deep Space Health Telemetry</h1>' +
               '<p style="font-size:14px; color:#64748B;">Select your operational role portal to access real-time biometrics, 3D anatomical models, and clinical mission controls.</p>' +
             '</div>' +
             '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:20px; width:100%; max-width:880px;">' +
               '<!-- Astronaut Role -->' +
               '<div class="card" onclick="S.login(\'astronaut\')" style="padding:24px; cursor:pointer; text-align:center; transition:all 0.2s ease; border:2px solid transparent;" onmouseover="this.style.borderColor=\'#0071E3\'; this.style.transform=\'translateY(-4px)\'" onmouseout="this.style.borderColor=\'transparent\'; this.style.transform=\'none\'">' +
                 '<div style="font-size:42px; margin-bottom:12px;">👨🚀</div>' +
                 '<h3 style="font-size:18px; font-weight:800; color:#0F172A; margin-bottom:6px;">Astronaut Portal</h3>' +
                 '<p style="font-size:12px; color:#64748B; margin-bottom:16px;">Personal 3D organ telemetry, continuous vitals, daily wellness checks &amp; countermeasures.</p>' +
                 '<button class="btn btn-primary" style="width:100%;">Enter Astronaut Portal →</button>' +
               '</div>' +
               '<!-- Medical Officer Role -->' +
               '<div class="card" onclick="S.login(\'staff\')" style="padding:24px; cursor:pointer; text-align:center; transition:all 0.2s ease; border:2px solid transparent;" onmouseover="this.style.borderColor=\'#10B981\'; this.style.transform=\'translateY(-4px)\'" onmouseout="this.style.borderColor=\'transparent\'; this.style.transform=\'none\'">' +
                 '<div style="font-size:42px; margin-bottom:12px;">🩺</div>' +
                 '<h3 style="font-size:18px; font-weight:800; color:#0F172A; margin-bottom:6px;">Flight Surgeon / Medical</h3>' +
                 '<p style="font-size:12px; color:#64748B; margin-bottom:16px;">Fleet-wide 4-crew monitoring, multi-system diagnostics, dosimetry &amp; intervention alerts.</p>' +
                 '<button class="btn" style="width:100%; background:#10B981; color:#fff;">Enter Medical Console →</button>' +
               '</div>' +
               '<!-- Mission Control Role -->' +
               '<div class="card" onclick="S.login(\'control\')" style="padding:24px; cursor:pointer; text-align:center; transition:all 0.2s ease; border:2px solid transparent;" onmouseover="this.style.borderColor=\'#6366F1\'; this.style.transform=\'translateY(-4px)\'" onmouseout="this.style.borderColor=\'transparent\'; this.style.transform=\'none\'">' +
                 '<div style="font-size:42px; margin-bottom:12px;">🛰️</div>' +
                 '<h3 style="font-size:18px; font-weight:800; color:#0F172A; margin-bottom:6px;">Mission Control</h3>' +
                 '<p style="font-size:12px; color:#64748B; margin-bottom:16px;">Interplanetary transit status, ECLSS environmental telemetry &amp; DSN comms latency.</p>' +
                 '<button class="btn" style="width:100%; background:#6366F1; color:#fff;">Enter Flight Deck →</button>' +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 1. HOME VIEW (SCREENSHOT 1 — HOME DASHBOARD)
  var overviewView = function() {
    var cid = S.crewId || 'carter';
    var rng = S.range || '7D';
    var t = window.getTelemetry ? window.getTelemetry(cid, rng) : { hr: '72 bpm', bp: '118/76', spo2: '98%', temp: '36.6°C', readiness: 94 };
    var c = window.getCrewData ? window.getCrewData(cid) : { name: 'Alex Carter', sid: 'AST-001' };

    return '<div class="view-home animate-fade-in">' +
             '<!-- Crew Quick Selector Bar -->' +
             renderCrewBar(cid) +

             '<!-- Top Hero Mascot Banner & Mission Status -->' +
             '<div class="home-hero-grid">' +
               '<!-- Left Mascot Greeting -->' +
               '<div class="mascot-greeting-card card">' +
                 '<div class="mascot-left-avatar">' +
                   window.mascotAvatar(68) +
                 '</div>' +
                 '<div class="mascot-speech-bubble">' +
                   '<div class="mascot-bubble-title">Hi Astronaut! 👋</div>' +
                   '<div class="mascot-bubble-text">Your body is doing great today. Keep following your daily plan to stay healthy and strong in microgravity!</div>' +
                 '</div>' +
               '</div>' +

               '<!-- Right Mission Status Card -->' +
               '<div class="mission-status-card card">' +
                 '<div class="mission-status-header">' +
                   '<div class="status-title-group">' +
                     '<span class="status-icon-badge">' + window.icon('rocket', 14) + '</span>' +
                     '<span class="status-title-text">Mission Status</span>' +
                   '</div>' +
                   '<span class="orbit-badge">ISS • Low Earth Orbit</span>' +
                 '</div>' +
                 '<div class="mission-status-body">' +
                   '<div class="mission-day-highlight">' +
                     '<div class="day-large">Day 183 <span class="day-total">/ 365</span></div>' +
                     '<div class="day-sub-countdown">199 days remaining</div>' +
                   '</div>' +
                   '<div class="mission-progress-bar-wrap">' +
                     '<div class="mission-progress-bar-fill" style="width:50%;"></div>' +
                   '</div>' +
                   '<div class="mission-env-row">' +
                     '<span class="env-item"><strong>Alt:</strong> ~400 km</span>' +
                     '<span class="env-item"><strong>Speed:</strong> 27,600 km/h</span>' +
                     '<span class="env-item"><strong>Gravity:</strong> 0 g</span>' +
                   '</div>' +
                 '</div>' +
               '</div>' +
             '</div>' +

             '<!-- Real-time Vitals Ribbon (6 Cards) -->' +
             '<div class="vitals-ribbon-grid">' +
               '<!-- 1. Heart Rate -->' +
               '<div class="vital-tile card" onclick="S.openSys(\'cardiovascular\')">' +
                 '<div class="vital-tile-head">' +
                   '<span class="vital-name">Heart Rate</span>' +
                   '<span class="vital-badge badge-normal">Normal</span>' +
                 '</div>' +
                 '<div class="vital-main-val">72 <span class="vital-unit">bpm</span></div>' +
                 '<div class="vital-sparkline-box">' +
                   '<svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none"><path d="M0,16 Q15,4 30,14 T60,8 T100,12" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/></svg>' +
                 '</div>' +
               '</div>' +

               '<!-- 2. Oxygen Level -->' +
               '<div class="vital-tile card" onclick="S.openSys(\'respiratory\')">' +
                 '<div class="vital-tile-head">' +
                   '<span class="vital-name">Oxygen Level</span>' +
                   '<span class="vital-badge badge-normal">Normal</span>' +
                 '</div>' +
                 '<div class="vital-main-val">98 <span class="vital-unit">%</span></div>' +
                 '<div class="vital-sparkline-box">' +
                   '<svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none"><path d="M0,12 Q25,8 50,14 T100,10" fill="none" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/></svg>' +
                 '</div>' +
               '</div>' +

               '<!-- 3. Bone Health -->' +
               '<div class="vital-tile card" onclick="S.openSys(\'musculoskeletal\')">' +
                 '<div class="vital-tile-head">' +
                   '<span class="vital-name">Bone Health</span>' +
                   '<span class="vital-badge badge-normal">Stable</span>' +
                 '</div>' +
                 '<div class="vital-main-val">Good <span class="vital-unit">Score</span></div>' +
                 '<div class="vital-sparkline-box">' +
                   '<svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none"><path d="M0,14 Q30,10 60,12 T100,10" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/></svg>' +
                 '</div>' +
               '</div>' +

               '<!-- 4. Mood & Focus -->' +
               '<div class="vital-tile card" onclick="S.set({view:\'wellness\'})">' +
                 '<div class="vital-tile-head">' +
                   '<span class="vital-name">Mood &amp; Focus</span>' +
                   '<span class="vital-badge badge-purple">Focused</span>' +
                 '</div>' +
                 '<div class="vital-main-val">Good <span class="vital-unit">High</span></div>' +
                 '<div class="vital-sparkline-box">' +
                   '<svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none"><path d="M0,15 Q20,6 45,12 T100,8" fill="none" stroke="#8B5CF6" stroke-width="2.5" stroke-linecap="round"/></svg>' +
                 '</div>' +
               '</div>' +

               '<!-- 5. Immune System -->' +
               '<div class="vital-tile card" onclick="S.openSys(\'immune\')">' +
                 '<div class="vital-tile-head">' +
                   '<span class="vital-name">Immune System</span>' +
                   '<span class="vital-badge badge-normal">Stable</span>' +
                 '</div>' +
                 '<div class="vital-main-val">Normal <span class="vital-unit">Optimal</span></div>' +
                 '<div class="vital-sparkline-box">' +
                   '<svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none"><path d="M0,12 Q30,15 65,8 T100,10" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/></svg>' +
                 '</div>' +
               '</div>' +

               '<!-- 6. Radiation Level -->' +
               '<div class="vital-tile card" onclick="S.set({view:\'radiation\'})">' +
                 '<div class="vital-tile-head">' +
                   '<span class="vital-name">Radiation Level</span>' +
                   '<span class="vital-badge badge-normal">Safe</span>' +
                 '</div>' +
                 '<div class="vital-main-val">0.21 <span class="vital-unit">mSv/d</span></div>' +
                 '<div class="vital-sparkline-box">' +
                   '<svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none"><path d="M0,18 Q40,16 70,14 T100,15" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/></svg>' +
                 '</div>' +
               '</div>' +
             '</div>' +

             '<!-- Main 2-Column Grid -->' +
             '<div class="home-main-grid">' +
               '<!-- Left Column -->' +
               '<div class="home-left-col">' +
                 '<!-- Today\'s Plan Card -->' +
                 '<div class="todays-plan-card card">' +
                   '<div class="plan-card-head">' +
                     '<div class="plan-title-group">' +
                       '<span class="plan-icon">' + window.icon('calendar', 16) + '</span>' +
                       '<span class="plan-title">Today\'s Plan</span>' +
                     '</div>' +
                     '<span class="plan-progress-pill">3/5 completed (60%)</span>' +
                   '</div>' +
                   '<div class="plan-progress-bar"><div class="plan-bar-fill" style="width:60%;"></div></div>' +

                   '<div class="plan-items-list">' +
                     '<div class="plan-item completed">' +
                       '<div class="plan-item-left">' +
                         '<span class="item-status-icon">' + window.icon('checkcircle', 16) + '</span>' +
                         '<div class="item-text-group">' +
                           '<div class="item-title">Exercise Session (30 min cardio)</div>' +
                           '<div class="item-sub">T2 Treadmill microgravity interval protocol</div>' +
                         '</div>' +
                       '</div>' +
                       '<span class="plan-status-tag tag-done">Completed</span>' +
                     '</div>' +

                     '<div class="plan-item completed">' +
                       '<div class="plan-item-left">' +
                         '<span class="item-status-icon">' + window.icon('checkcircle', 16) + '</span>' +
                         '<div class="item-text-group">' +
                           '<div class="item-title">Hydration Target (500ml water)</div>' +
                           '<div class="item-sub">Electrolyte balance supplement pouch</div>' +
                         '</div>' +
                       '</div>' +
                       '<span class="plan-status-tag tag-done">Completed</span>' +
                     '</div>' +

                     '<div class="plan-item">' +
                       '<div class="plan-item-left">' +
                         '<span class="item-status-icon pending">' + window.icon('gamepad', 16) + '</span>' +
                         '<div class="item-text-group">' +
                           '<div class="item-title">Cognitive Game (Pattern memory test)</div>' +
                           '<div class="item-sub">Executive function &amp; reaction assessment</div>' +
                         '</div>' +
                       '</div>' +
                       '<button class="btn btn-sm btn-primary" onclick="S.set({view:\'assessment\'})">Play Now</button>' +
                     '</div>' +

                     '<div class="plan-item">' +
                       '<div class="plan-item-left">' +
                         '<span class="item-status-icon pending">' + window.icon('wellness', 16) + '</span>' +
                         '<div class="item-text-group">' +
                           '<div class="item-title">Health Check (Check vitals &amp; mood)</div>' +
                           '<div class="item-sub">Daily psych &amp; sleep rating logger</div>' +
                         '</div>' +
                       '</div>' +
                       '<button class="btn btn-sm btn-outline" onclick="S.set({view:\'wellness\'})">5 min</button>' +
                     '</div>' +

                     '<div class="plan-item">' +
                       '<div class="plan-item-left">' +
                         '<span class="item-status-icon pending">' + window.icon('sleep', 16) + '</span>' +
                         '<div class="item-text-group">' +
                           '<div class="item-title">Sleep Prep (Dim cabin lights)</div>' +
                           '<div class="item-sub">Circadian lighting cycle countdown</div>' +
                         '</div>' +
                       '</div>' +
                       '<button class="btn btn-sm btn-secondary" onclick="window.toast(\'Sleep circadian lighting protocol queued for 21:00 UTC\', \'info\')">Tonight</button>' +
                     '</div>' +
                   '</div>' +
                 '</div>' +

                 '<!-- Lower Sub-Grid: Quick Insights & Space Environment -->' +
                 '<div class="home-subgrid">' +
                   '<!-- Quick Insights Card -->' +
                   '<div class="quick-insights-card card">' +
                     '<div class="insights-head">' +
                       '<span class="insights-title">' + window.icon('sparkles', 15) + ' Quick Insights</span>' +
                       '<div class="insights-nav-arrows">' +
                         '<button class="arrow-mini-btn" onclick="window.toast(\'Showing prior insight\', \'info\')">‹</button>' +
                         '<button class="arrow-mini-btn" onclick="window.toast(\'Showing next insight\', \'info\')">›</button>' +
                       '</div>' +
                     '</div>' +
                     '<div class="insights-body">' +
                       '<p class="insight-text">Your heart is beating at a healthy rate. 👍 This means your heart is working well and efficiently delivering oxygen throughout your body in microgravity.</p>' +
                     '</div>' +
                   '</div>' +

                   '<!-- Space Environment Card -->' +
                   '<div class="space-env-card card" onclick="S.set({view:\'nasa-data\'})" style="cursor:pointer;">' +
                     '<div class="env-card-head">' +
                       '<span class="env-card-title">' + window.icon('nasadata', 15) + ' Space Environment</span>' +
                       '<span class="nasa-live-badge">Live NASA DONKI</span>' +
                     '</div>' +
                     '<div class="env-stats-list">' +
                       '<div class="env-stat-row"><span>Solar Activity</span><strong style="color:var(--emerald);">Quiet</strong></div>' +
                       '<div class="env-stat-row"><span>Radiation Level</span><strong style="color:var(--emerald);">0.21 mSv/day</strong></div>' +
                       '<div class="env-stat-row"><span>Space Weather</span><strong style="color:var(--azure);">No major activity</strong></div>' +
                     '</div>' +
                   '</div>' +
                 '</div>' +
               '</div>' +

               '<!-- Right Column: 3D Body Explorer Card -->' +
               '<div class="home-right-col">' +
                 '<div class="body-explorer-card card">' +
                   '<div class="explorer-card-head">' +
                     '<div class="explorer-title-group">' +
                       '<span class="explorer-icon">' + window.icon('body', 16) + '</span>' +
                       '<span class="explorer-title">3D Body Explorer</span>' +
                     '</div>' +
                     '<span class="explorer-tagline">Real-time Holographic Scan</span>' +
                   '</div>' +

                   '<div class="body-scan-viewport">' +
                     '<!-- Full Body Scan Image with Leader Line Callouts -->' +
                     '<div class="body-scan-image-wrap">' +
                       '<img src="assets/images/full_body_telemetry.png" alt="Full Body Telemetry Scan" class="body-scan-img">' +
                       '<!-- Left Callout Pins -->' +
                       '<div class="body-callout-pin callout-brain" onclick="S.openSys(\'neurological\')">' +
                         '<div class="pin-dot"></div>' +
                         '<div class="pin-card">' +
                           '<div class="pin-title">Brain</div>' +
                           '<div class="pin-desc">Sleep, mood, focus</div>' +
                         '</div>' +
                       '</div>' +
                       '<div class="body-callout-pin callout-lungs" onclick="S.openSys(\'respiratory\')">' +
                         '<div class="pin-dot"></div>' +
                         '<div class="pin-card">' +
                           '<div class="pin-title">Lungs</div>' +
                           '<div class="pin-desc">Breathing in space</div>' +
                         '</div>' +
                       '</div>' +
                       '<div class="body-callout-pin callout-heart" onclick="S.openSys(\'cardiovascular\')">' +
                         '<div class="pin-dot"></div>' +
                         '<div class="pin-card">' +
                           '<div class="pin-title">Heart</div>' +
                           '<div class="pin-desc">Blood flow changes</div>' +
                         '</div>' +
                       '</div>' +

                       '<!-- Right Callout Pins -->' +
                       '<div class="body-callout-pin callout-bones" onclick="S.openSys(\'musculoskeletal\')">' +
                         '<div class="pin-dot"></div>' +
                         '<div class="pin-card">' +
                           '<div class="pin-title">Bones</div>' +
                           '<div class="pin-desc">Get weaker in space</div>' +
                         '</div>' +
                       '</div>' +
                       '<div class="body-callout-pin callout-muscles" onclick="S.openSys(\'musculoskeletal\')">' +
                         '<div class="pin-dot"></div>' +
                         '<div class="pin-card">' +
                           '<div class="pin-title">Muscles</div>' +
                           '<div class="pin-desc">Need special exercise</div>' +
                         '</div>' +
                       '</div>' +
                       '<div class="body-callout-pin callout-immune" onclick="S.openSys(\'immune\')">' +
                         '<div class="pin-dot"></div>' +
                         '<div class="pin-card">' +
                           '<div class="pin-title">Immune System</div>' +
                           '<div class="pin-desc">Works differently</div>' +
                         '</div>' +
                       '</div>' +
                     '</div>' +
                   '</div>' +

                   '<button class="btn btn-primary open-3d-cta-btn" onclick="S.set({view:\'system-detail\', sys:\'cardiovascular\'})">' +
                     'Open 3D Body Explorer →' +
                   '</button>' +
                 '</div>' +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 2. MY HEALTH VIEW (SCREENSHOT 2 — MY HEALTH)
  var systemsView = function() {
    var cid = S.crewId || 'carter';
    var rng = S.range || '7D';
    var activeSys = S.sys || 'cardiovascular';

    var sysList = [
      { id: 'neurological', name: 'Brain', icon: 'brain', desc: 'Sleep, mood, focus' },
      { id: 'eyes', name: 'Eyes', icon: 'eye', desc: 'SANS & vision changes' },
      { id: 'respiratory', name: 'Lungs', icon: 'lungs', desc: 'Breathing in space' },
      { id: 'cardiovascular', name: 'Heart', icon: 'heart', desc: 'Blood flow changes' },
      { id: 'digestive', name: 'Digestive', icon: 'digestive', desc: 'Appetite & hydration' },
      { id: 'musculoskeletal', name: 'Bones', icon: 'bones', desc: 'Bone mineral loss' },
      { id: 'muscles', name: 'Muscles', icon: 'muscles', desc: 'Atrophy countermeasures' },
      { id: 'immune', name: 'Immune', icon: 'immune', desc: 'Cellular regulation' }
    ];

    var systemPillsLeft = sysList.slice(0, 4).map(function(s) {
      var isSel = (s.id === activeSys || (s.id === 'cardiovascular' && activeSys === 'cardiovascular'));
      var activeClass = isSel ? 'selected' : '';
      return '<button class="body-sys-pill ' + activeClass + '" onclick="S.set({sys:\'' + s.id + '\'})">' +
               window.icon(s.icon, 15) + ' <span>' + s.name + '</span>' +
             '</button>';
    }).join('');

    var systemPillsRight = sysList.slice(4).map(function(s) {
      var isSel = (s.id === activeSys);
      var activeClass = isSel ? 'selected' : '';
      return '<button class="body-sys-pill ' + activeClass + '" onclick="S.set({sys:\'' + s.id + '\'})">' +
               window.icon(s.icon, 15) + ' <span>' + s.name + '</span>' +
             '</button>';
    }).join('');

    return '<div class="view-my-health animate-fade-in">' +
             '<!-- Crew Selector Bar -->' +
             renderCrewBar(cid) +

             '<!-- Top Vitals Ribbon -->' +
             '<div class="vitals-ribbon-grid">' +
               '<div class="vital-tile card"><div class="vital-tile-head"><span class="vital-name">Heart Rate</span><span class="vital-badge badge-normal">Normal</span></div><div class="vital-main-val">72 <span class="vital-unit">bpm</span></div></div>' +
               '<div class="vital-tile card"><div class="vital-tile-head"><span class="vital-name">Oxygen Level</span><span class="vital-badge badge-normal">Normal</span></div><div class="vital-main-val">98 <span class="vital-unit">%</span></div></div>' +
               '<div class="vital-tile card"><div class="vital-tile-head"><span class="vital-name">Bone Health</span><span class="vital-badge badge-normal">Stable</span></div><div class="vital-main-val">Good <span class="vital-unit">Score</span></div></div>' +
               '<div class="vital-tile card"><div class="vital-tile-head"><span class="vital-name">Mood &amp; Focus</span><span class="vital-badge badge-purple">Focused</span></div><div class="vital-main-val">Good <span class="vital-unit">High</span></div></div>' +
               '<div class="vital-tile card"><div class="vital-tile-head"><span class="vital-name">Immune System</span><span class="vital-badge badge-normal">Stable</span></div><div class="vital-main-val">Normal <span class="vital-unit">Optimal</span></div></div>' +
               '<div class="vital-tile card"><div class="vital-tile-head"><span class="vital-name">Radiation</span><span class="vital-badge badge-normal">Safe</span></div><div class="vital-main-val">Low <span class="vital-unit">0.21 mSv</span></div></div>' +
             '</div>' +

             '<!-- Main 3-Column Spatial Grid for My Health -->' +
             '<div class="health-main-layout-grid">' +
               '<!-- Left Interactive Hologram Panel -->' +
               '<div class="health-hologram-card card">' +
                 '<div class="hologram-head">' +
                   '<span class="hologram-title">' + window.icon('body', 16) + ' Interactive Body</span>' +
                   '<span class="hologram-sub">Select any organ</span>' +
                 '</div>' +

                 '<div class="hologram-viewport-container">' +
                   '<div class="sys-pills-col left">' + systemPillsLeft + '</div>' +
                   '<div class="hologram-center-img-wrap">' +
                     '<img src="assets/images/full_body_telemetry.png" alt="Body Telemetry Hologram" class="hologram-img">' +
                   '</div>' +
                   '<div class="sys-pills-col right">' + systemPillsRight + '</div>' +
                 '</div>' +

                 '<div class="hologram-mascot-tip">' +
                   window.mascotAvatar(36) +
                   '<span class="tip-text">Click on any body part to see your health data! It’s easy!</span>' +
                 '</div>' +

                 '<div class="hologram-controls-row">' +
                   '<button class="ctrl-btn" onclick="window.toast(\'Rotating 3D perspective\', \'info\')">' + window.icon('rotate', 14) + ' Rotate</button>' +
                   '<button class="ctrl-btn" onclick="window.toast(\'Zoom view adjusted\', \'info\')">' + window.icon('zoom', 14) + ' Zoom</button>' +
                   '<button class="ctrl-btn" onclick="window.toast(\'View reset to frontal plane\', \'info\')">' + window.icon('reset', 14) + ' Reset</button>' +
                 '</div>' +
               '</div>' +

               '<!-- Center Detailed System Focus (Heart Health) -->' +
               '<div class="health-center-focus-card card">' +
                 '<div class="focus-card-head">' +
                   '<div>' +
                     '<h2 class="focus-title">Heart Health</h2>' +
                     '<div class="focus-sub">Your heart works hard, even in space!</div>' +
                   '</div>' +
                   '<div class="view-mode-toggle">' +
                     '<button class="mode-toggle-btn active">Simple View</button>' +
                     '<button class="mode-toggle-btn" onclick="S.openSys(\'cardiovascular\')">Detailed View</button>' +
                   '</div>' +
                 '</div>' +

                 '<!-- 3D Heart Card Container -->' +
                 '<div class="heart-visual-banner">' +
                   '<div class="mini-3d-box" id="organ-viewer-box" style="width:130px; height:130px; border-radius:12px; background:radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(15,23,42,0.9) 100%); display:flex; align-items:center; justify-content:center;">' +
                     '<canvas id="organ-canvas" style="width:100%; height:100%;"></canvas>' +
                   '</div>' +
                   '<div class="heart-status-info">' +
                     '<div class="heart-badge-pill">72 bpm Normal</div>' +
                     '<div class="heart-explanation-text">This means your heart is beating at a healthy rate! 👍 In microgravity, fluids shift upward, so daily cardio preserves your stroke volume.</div>' +
                   '</div>' +
                 '</div>' +

                 '<!-- 7-Day Trend Line Chart (Current vs Baseline) -->' +
                 '<div class="trend-chart-container">' +
                   '<div class="trend-chart-head">' +
                     '<span class="trend-title">Heart Rate Trend (7 Days)</span>' +
                     '<div class="chart-legend-row">' +
                       '<span class="legend-item"><span class="legend-line line-red"></span> Current (72 bpm)</span>' +
                       '<span class="legend-item"><span class="legend-line line-cyan"></span> Baseline (68 bpm)</span>' +
                     '</div>' +
                   '</div>' +

                   '<!-- Dual-line SVG Chart -->' +
                   '<div class="dual-curve-svg-box">' +
                     '<svg width="100%" height="110" viewBox="0 0 400 110" preserveAspectRatio="none">' +
                       '<line x1="0" y1="20" x2="400" y2="20" stroke="#E2E8F0" stroke-dasharray="4,4"/>' +
                       '<line x1="0" y1="55" x2="400" y2="55" stroke="#E2E8F0" stroke-dasharray="4,4"/>' +
                       '<line x1="0" y1="90" x2="400" y2="90" stroke="#E2E8F0" stroke-dasharray="4,4"/>' +
                       '<!-- Baseline Line (Cyan) -->' +
                       '<path d="M 20,65 Q 80,68 140,64 T 260,66 T 380,65" fill="none" stroke="#38BDF8" stroke-width="2.5" stroke-dasharray="3,3"/>' +
                       '<!-- Current Line (Red/Orange) -->' +
                       '<path d="M 20,55 Q 80,42 140,50 T 260,38 T 380,48" fill="none" stroke="#EF4444" stroke-width="3"/>' +
                       '<circle cx="380" cy="48" r="4.5" fill="#EF4444"/>' +
                     '</svg>' +
                     '<div class="chart-x-labels">' +
                       '<span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>' +
                     '</div>' +
                   '</div>' +

                   '<!-- Health Details Table -->' +
                   '<div class="health-stats-table">' +
                     '<div class="table-col"><span class="tbl-lbl">Current</span><strong class="tbl-val">72 bpm</strong></div>' +
                     '<div class="table-col"><span class="tbl-lbl">Baseline</span><strong class="tbl-val">68 bpm</strong></div>' +
                     '<div class="table-col"><span class="tbl-lbl">Change</span><strong class="tbl-val" style="color:var(--emerald);">+6% ↑</strong></div>' +
                     '<div class="table-col"><span class="tbl-lbl">Data Quality</span><strong class="tbl-val" style="color:var(--emerald);">● Good</strong></div>' +
                     '<div class="table-col"><span class="tbl-lbl">Confidence</span><strong class="tbl-val">82%</strong></div>' +
                   '</div>' +
                 '</div>' +
               '</div>' +

               '<!-- Right Column: What Affects Your Heart? -->' +
               '<div class="health-influences-card card">' +
                 '<div class="influences-head">' +
                   '<h3 class="influences-title">What Affects Your Heart?</h3>' +
                   '<p class="influences-sub">Key space factors influencing cardiovascular health</p>' +
                 '</div>' +

                 '<div class="influences-list">' +
                   '<div class="influence-item">' +
                     '<div class="influence-bullet"></div>' +
                     '<div class="influence-content">' +
                       '<strong>Microgravity:</strong> Fluid moves to upper body and reduces cardiovascular workload.' +
                     '</div>' +
                   '</div>' +
                   '<div class="influence-item">' +
                     '<div class="influence-bullet"></div>' +
                     '<div class="influence-content">' +
                       '<strong>Radiation:</strong> High-energy cosmic rays can stress vascular endothelial walls.' +
                     '</div>' +
                   '</div>' +
                   '<div class="influence-item">' +
                     '<div class="influence-bullet"></div>' +
                     '<div class="influence-content">' +
                       '<strong>Exercise Level:</strong> Preserves heart volume, stroke capability, and muscular endurance.' +
                     '</div>' +
                   '</div>' +
                   '<div class="influence-item">' +
                     '<div class="influence-bullet"></div>' +
                     '<div class="influence-content">' +
                       '<strong>Hydration:</strong> Keeps blood volume stable and avoids post-flight orthostatic stress.' +
                     '</div>' +
                   '</div>' +
                   '<div class="influence-item">' +
                     '<div class="influence-bullet"></div>' +
                     '<div class="influence-content">' +
                       '<strong>Stress &amp; Sleep:</strong> Directly governs autonomic balance and parasympathetic recovery.' +
                     '</div>' +
                   '</div>' +
                 '</div>' +

                 '<!-- NASA Evidence Card -->' +
                 '<div class="nasa-evidence-box">' +
                   '<div class="evidence-title-row">' +
                     window.icon('nasadata', 14) + ' <strong>NASA Evidence (ISS Studies)</strong>' +
                   '</div>' +
                   '<p class="evidence-p">In microgravity, blood volume shifts headward. Daily 30-min resistive exercise maintains ventricular muscle mass.</p>' +
                   '<button class="btn btn-sm btn-outline" style="width:100%; margin-top:8px;" onclick="S.set({view:\'learn\'})">Learn More (NASA) →</button>' +
                 '</div>' +

                 '<!-- Recommended Countermeasure Action -->' +
                 '<div class="recommended-action-box">' +
                   '<div class="rec-title">Recommended Action</div>' +
                   '<p class="rec-desc">Do 30 minutes of cardio exercise today to keep your heart strong!</p>' +
                   '<button class="btn btn-primary" style="width:100%;" onclick="window.toast(\'Cardio exercise timer started!\', \'info\')">Start Exercise Plan →</button>' +
                 '</div>' +
               '</div>' +
             '</div>' +

             '<!-- Bottom Action Bar: Today\'s Plan Progress Bar -->' +
             '<div class="bottom-plan-bar card">' +
               '<div class="plan-bar-left">' +
                 '<strong>Today\'s Plan:</strong> <span style="color:var(--primary); font-weight:700;">3/5 completed (60%)</span>' +
               '</div>' +
               '<div class="plan-chips-row">' +
                 '<span class="plan-chip done">' + window.icon('check', 12) + ' Exercise</span>' +
                 '<span class="plan-chip done">' + window.icon('check', 12) + ' Hydration</span>' +
                 '<span class="plan-chip active" onclick="S.set({view:\'assessment\'})">Cognitive Game</span>' +
                 '<span class="plan-chip active" onclick="S.set({view:\'wellness\'})">Health Check</span>' +
                 '<span class="plan-chip">Sleep Prep</span>' +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 3. 3D BODY EXPLORER VIEW (SCREENSHOT 3 — 3D BODY)
  var systemDetailView = function() {
    var cid = S.crewId || 'carter';
    var activeSys = S.sys || 'cardiovascular';
    var subTab = S.subTab || 'overview';

    var sysList = [
      { id: 'neurological', name: 'Brain', desc: 'Sleep, mood, focus', icon: 'brain' },
      { id: 'eyes', name: 'Eyes', desc: 'Vision changes & SANS', icon: 'eye' },
      { id: 'respiratory', name: 'Lungs', desc: 'Breathing in space', icon: 'lungs' },
      { id: 'cardiovascular', name: 'Heart', desc: 'Blood flow changes', icon: 'heart' },
      { id: 'musculoskeletal', name: 'Bones', desc: 'Get weaker in space', icon: 'bones' },
      { id: 'muscles', name: 'Muscles', desc: 'Need special exercise', icon: 'muscles' },
      { id: 'digestive', name: 'Digestive', desc: 'Appetite & nutrition', icon: 'digestive' },
      { id: 'immune', name: 'Immune System', desc: 'Works differently', icon: 'immune' }
    ];

    var sysMenuItems = sysList.map(function(s) {
      var isSel = (s.id === activeSys);
      var activeClass = isSel ? 'active' : '';
      return '<div class="body-sys-item ' + activeClass + '" onclick="S.set({sys:\'' + s.id + '\'})">' +
               '<div class="sys-item-icon-box">' + window.icon(s.icon, 18) + '</div>' +
               '<div class="sys-item-text">' +
                 '<div class="sys-item-name">' + s.name + '</div>' +
                 '<div class="sys-item-desc">' + s.desc + '</div>' +
               '</div>' +
               '<div class="sys-item-arrow">›</div>' +
             '</div>';
    }).join('');

    return '<div class="view-body-explorer animate-fade-in">' +
             '<!-- Crew Selector Bar -->' +
             renderCrewBar(cid) +

             '<!-- Page Header -->' +
             '<div class="body-explorer-head">' +
               '<div>' +
                 '<h1 class="page-title">3D Body Explorer</h1>' +
                 '<p class="page-sub">Explore each body part and see how space affects your health in real time.</p>' +
               '</div>' +
               '<div class="view-mode-toggle">' +
                 '<button class="mode-toggle-btn active">Body Systems</button>' +
                 '<button class="mode-toggle-btn" onclick="window.toast(\'Organ isolate mode active\', \'info\')">Organ View</button>' +
               '</div>' +
             '</div>' +

             '<!-- 3-Column Spatial Layout -->' +
             '<div class="body-explorer-grid">' +
               '<!-- Left Column: Body Systems Menu -->' +
               '<div class="systems-menu-card card">' +
                 '<div class="systems-menu-header">Body Systems</div>' +
                 '<div class="systems-menu-list">' + sysMenuItems + '</div>' +
               '</div>' +

               '<!-- Center Column: 3D Interactive Viewport -->' +
               '<div class="center-3d-viewport-card card">' +
                 '<div class="viewport-title-overlay">' +
                   '<span>Holographic Model Viewport</span>' +
                   '<span class="live-tag">Active WebGL</span>' +
                 '</div>' +

                 '<!-- 3D Three.js WebGL Canvas Container -->' +
                 '<div class="canvas-3d-wrapper" id="organ-viewer-box" style="width:100%; height:460px; min-height:440px; position:relative; border-radius:14px; overflow:hidden;">' +
                   '<canvas id="organ-canvas" style="width:100%; height:100%; display:block;"></canvas>' +
                 '</div>' +

                 '<div class="viewport-mascot-speech">' +
                   window.mascotAvatar(34) +
                   '<span class="speech-text">Click on any part of the body to learn how space affects it!</span>' +
                 '</div>' +

                 '<div class="viewport-controls-bar">' +
                   '<button class="ctrl-btn" onclick="window.toast(\'Rotating model\', \'info\')">' + window.icon('rotate', 14) + ' Rotate</button>' +
                   '<button class="ctrl-btn" onclick="window.toast(\'Zooming viewport\', \'info\')">' + window.icon('zoom', 14) + ' Zoom</button>' +
                   '<button class="ctrl-btn" onclick="window.toast(\'Resetting orientation\', \'info\')">' + window.icon('reset', 14) + ' Reset</button>' +
                 '</div>' +
               '</div>' +

               '<!-- Right Column: Telemetry & Analytics Panel -->' +
               '<div class="telemetry-analytics-card card">' +
                 '<div class="telemetry-panel-head">' +
                   '<div>' +
                     '<h2 class="panel-organ-title">Heart – Cardiovascular System</h2>' +
                     '<span class="panel-status-badge badge-normal">Status: Normal</span>' +
                   '</div>' +
                 '</div>' +

                 '<!-- Sub-Navigation Tabs -->' +
                 '<div class="panel-sub-tabs">' +
                   '<button class="sub-tab-btn ' + (subTab === 'overview' ? 'active' : '') + '" onclick="S.set({subTab:\'overview\'})">Overview</button>' +
                   '<button class="sub-tab-btn ' + (subTab === 'trends' ? 'active' : '') + '" onclick="S.set({subTab:\'trends\'})">Trends</button>' +
                   '<button class="sub-tab-btn ' + (subTab === 'effects' ? 'active' : '') + '" onclick="S.set({subTab:\'effects\'})">Effects in Space</button>' +
                   '<button class="sub-tab-btn ' + (subTab === 'evidence' ? 'active' : '') + '" onclick="S.set({subTab:\'evidence\'})">NASA Evidence</button>' +
                   '<button class="sub-tab-btn ' + (subTab === 'tips' ? 'active' : '') + '" onclick="S.set({subTab:\'tips\'})">Tips &amp; Actions</button>' +
                 '</div>' +

                 '<!-- Primary Metric Display -->' +
                 '<div class="primary-metric-box">' +
                   '<div class="metric-top-row">' +
                     '<span class="metric-lbl">Current Heart Rate</span>' +
                     '<span class="metric-status-text" style="color:var(--emerald);">Normal</span>' +
                   '</div>' +
                   '<div class="metric-big-num">72 <span class="metric-unit">bpm</span></div>' +
                   '<div class="metric-desc-text">What does this mean? In space, blood moves to the upper body and the heart adapts quickly to lower workload.</div>' +
                 '</div>' +

                 '<!-- 4 Vital Metric Mini-Tiles -->' +
                 '<div class="four-vitals-grid">' +
                   '<div class="mini-vital-tile"><span class="m-lbl">Blood Pressure</span><strong class="m-val">118/76</strong></div>' +
                   '<div class="mini-vital-tile"><span class="m-lbl">Oxygen Level</span><strong class="m-val">98%</strong></div>' +
                   '<div class="mini-vital-tile"><span class="m-lbl">HRV (Resting)</span><strong class="m-val">54 ms</strong></div>' +
                   '<div class="mini-vital-tile"><span class="m-lbl">Body Temp</span><strong class="m-val">36.6 °C</strong></div>' +
                 '</div>' +

                 '<!-- 7-Day Trend Chart -->' +
                 '<div class="trend-chart-mini-wrap">' +
                   '<div class="trend-head-mini">' +
                     '<span class="trend-lbl">Heart Rate Trend (7 Days)</span>' +
                     '<span class="trend-legend">Red: Current • Cyan: Baseline</span>' +
                   '</div>' +
                   '<div class="dual-curve-svg-box">' +
                     '<svg width="100%" height="70" viewBox="0 0 300 70" preserveAspectRatio="none">' +
                       '<path d="M 10,45 Q 60,50 110,46 T 210,48 T 290,46" fill="none" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3,3"/>' +
                       '<path d="M 10,38 Q 60,28 110,34 T 210,24 T 290,30" fill="none" stroke="#EF4444" stroke-width="2.5"/>' +
                     '</svg>' +
                   '</div>' +
                 '</div>' +

                 '<!-- Bottom 3 Accordion Cards -->' +
                 '<div class="bottom-accordion-group">' +
                   '<div class="accordion-item">' +
                     '<strong>Effects in Space:</strong> Microgravity fluid shifts decrease blood volume by 10-15%.' +
                   '</div>' +
                   '<div class="accordion-item">' +
                     '<strong>NASA Evidence:</strong> ISS cardio research proves 30 min daily resistive training prevents myocardial atrophy.' +
                   '</div>' +
                   '<div class="accordion-item action">' +
                     '<strong>What Can You Do?</strong> Complete 30 min cardio training &amp; stay hydrated!' +
                     '<button class="btn btn-primary btn-sm" style="width:100%; margin-top:6px;" onclick="window.toast(\'Cardio session queued!\', \'info\')">Start Cardio Plan →</button>' +
                   '</div>' +
                 '</div>' +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 4. MISSIONS DASHBOARD VIEW (SCREENSHOT 4 — MISSIONS)
  var missionView = function() {
    var cid = S.crewId || 'carter';
    var activeDay = 183;

    var dayCards = [181, 182, 183, 184, 185, 186].map(function(d) {
      var isCur = (d === 183);
      var activeClass = isCur ? 'current' : '';
      return '<button class="mission-day-chip ' + activeClass + '" onclick="window.toast(\'Viewing Mission Day ' + d + ' telemetry\', \'info\')">' +
               '<span class="chip-day-num">Day ' + d + '</span>' +
               (isCur ? '<span class="chip-cur-badge">Current Day</span>' : '<span class="chip-status-lbl">' + (d < 183 ? 'Logged' : 'Upcoming') + '</span>') +
             '</button>';
    }).join('');

    return '<div class="view-missions animate-fade-in">' +
             '<!-- Crew Selector Bar -->' +
             renderCrewBar(cid) +

             '<!-- Missions Page Header -->' +
             '<div class="missions-page-head">' +
               '<div>' +
                 '<h1 class="page-title">Missions Dashboard</h1>' +
                 '<p class="page-sub">Track your flight journey, daily scheduled activities, and physiological countermeasures.</p>' +
               '</div>' +
               '<div class="iss-orbit-stat-badge">' +
                 '<span class="iss-name">International Space Station</span>' +
                 '<span class="iss-sub">Alt: ~400 km • Orbit Speed: 27,600 km/h • 0 g</span>' +
               '</div>' +
             '</div>' +

             '<!-- Horizontal Mission Days Carousel -->' +
             '<div class="mission-days-carousel-bar card">' +
               '<div class="carousel-title-label">Mission Timeline Navigation:</div>' +
               '<div class="carousel-chips-row">' + dayCards + '</div>' +
             '</div>' +

             '<!-- Main Missions Grid -->' +
             '<div class="missions-content-grid">' +
               '<!-- Left Column: Today\'s Mission Plan -->' +
               '<div class="mission-schedule-card card">' +
                 '<div class="schedule-head">' +
                   '<div class="sched-title-group">' +
                     '<span class="sched-icon">' + window.icon('calendar', 16) + '</span>' +
                     '<span class="sched-title">Today’s Mission Plan (Oct 20, 2026 - Day 183)</span>' +
                   '</div>' +
                   '<span class="sched-progress-tag">3/6 Tasks Complete</span>' +
                 '</div>' +

                 '<div class="sched-timeline-list">' +
                   '<div class="sched-item done">' +
                     '<div class="sched-time">07:00</div>' +
                     '<div class="sched-info">' +
                       '<div class="sched-task-name">Wake up &amp; Health Check</div>' +
                       '<div class="sched-task-sub">Morning vitals, HRV baseline, psych rating</div>' +
                     '</div>' +
                     '<span class="sched-badge done">Completed</span>' +
                   '</div>' +

                   '<div class="sched-item active">' +
                     '<div class="sched-time">08:00</div>' +
                     '<div class="sched-info">' +
                       '<div class="sched-task-name">Exercise Session (Cardio &amp; Resistive)</div>' +
                       '<div class="sched-task-sub">ARED squat regimen &amp; T2 interval sprint</div>' +
                     '</div>' +
                     '<button class="btn btn-primary btn-sm" onclick="window.toast(\'Exercise session active!\', \'info\')">Start</button>' +
                   '</div>' +

                   '<div class="sched-item done">' +
                     '<div class="sched-time">10:00</div>' +
                     '<div class="sched-info">' +
                       '<div class="sched-task-name">Nutrition &amp; Electrolyte Plan</div>' +
                       '<div class="sched-task-sub">Hydration pack + Vitamin D3/Calcium packet</div>' +
                     '</div>' +
                     '<span class="sched-badge done">Completed</span>' +
                   '</div>' +

                   '<div class="sched-item active">' +
                     '<div class="sched-time">12:00</div>' +
                     '<div class="sched-info">' +
                       '<div class="sched-task-name">Cognitive Training &amp; Reflex Test</div>' +
                       '<div class="sched-task-sub">Spatial orientation and psychomotor vigilance</div>' +
                     '</div>' +
                     '<button class="btn btn-primary btn-sm" onclick="S.set({view:\'assessment\'})">Start</button>' +
                   '</div>' +

                   '<div class="sched-item upcoming">' +
                     '<div class="sched-time">15:00</div>' +
                     '<div class="sched-info">' +
                       '<div class="sched-task-name">Biomedical Research Experiment</div>' +
                       '<div class="sched-task-sub">Capillary blood draw for NASA GeneLab omics</div>' +
                     '</div>' +
                     '<span class="sched-badge upcoming">Upcoming</span>' +
                   '</div>' +

                   '<div class="sched-item upcoming">' +
                     '<div class="sched-time">19:00</div>' +
                     '<div class="sched-info">' +
                       '<div class="sched-task-name">Sleep Preparation Protocol</div>' +
                       '<div class="sched-task-sub">Cabin circadian dimming &amp; acoustic ear protection</div>' +
                     '</div>' +
                     '<span class="sched-badge upcoming">Upcoming</span>' +
                   '</div>' +
                 '</div>' +
               '</div>' +

               '<!-- Right Column: Mission Telemetry & Milestones -->' +
               '<div class="mission-right-col">' +
                 '<!-- Mission Health Overview -->' +
                 '<div class="mission-health-overview-card card">' +
                   '<div class="m-health-head">Mission Health Overview (Day 183)</div>' +
                   '<div class="m-health-grid">' +
                     '<div class="m-stat-tile"><span class="lbl">Heart Rate</span><strong>72 bpm</strong><span class="sub" style="color:var(--emerald);">Normal</span></div>' +
                     '<div class="m-stat-tile"><span class="lbl">Sleep Log</span><strong>7.8 hrs</strong><span class="sub" style="color:var(--emerald);">Restful</span></div>' +
                     '<div class="m-stat-tile"><span class="lbl">Activity Score</span><strong>85%</strong><span class="sub" style="color:var(--emerald);">Target Met</span></div>' +
                     '<div class="m-stat-tile"><span class="lbl">Bone Mineral</span><strong>Good</strong><span class="sub" style="color:var(--emerald);">Stable</span></div>' +
                     '<div class="m-stat-tile"><span class="lbl">Radiation</span><strong>0.21 mSv</strong><span class="sub" style="color:var(--emerald);">Safe</span></div>' +
                     '<div class="m-stat-tile"><span class="lbl">Immune Level</span><strong>Normal</strong><span class="sub" style="color:var(--emerald);">Optimal</span></div>' +
                   '</div>' +
                 '</div>' +

                 '<!-- Mission Milestones Stepper -->' +
                 '<div class="milestones-card card">' +
                   '<div class="milestones-head">Mission Milestones</div>' +
                   '<div class="stepper-horizontal">' +
                     '<div class="step-item done"><div class="step-circle">✓</div><div class="step-name">Launch (Day 0)</div></div>' +
                     '<div class="step-line done"></div>' +
                     '<div class="step-item done"><div class="step-circle">✓</div><div class="step-name">Docking (Day 2)</div></div>' +
                     '<div class="step-line done"></div>' +
                     '<div class="step-item current"><div class="step-circle">183</div><div class="step-name">Mid-Mission (Day 180)</div></div>' +
                     '<div class="step-line"></div>' +
                     '<div class="step-item"><div class="step-circle">○</div><div class="step-name">Deep Studies</div></div>' +
                     '<div class="step-line"></div>' +
                     '<div class="step-item"><div class="step-circle">○</div><div class="step-name">Mission End (365)</div></div>' +
                   '</div>' +
                 '</div>' +

                 '<!-- Mission Assistant Card -->' +
                 '<div class="mission-assistant-card card">' +
                   '<div class="asst-left-avatar">' + window.mascotAvatar(56) + '</div>' +
                   '<div class="asst-content">' +
                     '<div class="asst-title">Your Mission Assistant</div>' +
                     '<p class="asst-text">You are on track with your mid-mission health metrics! Keep logging your daily exercise and wellness checks.</p>' +
                   '</div>' +
                 '</div>' +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 5. LEARN VIEW (NASA Space Medicine Knowledge Base)
  var learnView = function() {
    return '<div class="view-learn animate-fade-in">' +
             '<div class="page-head">' +
               '<h1 class="page-title">Space Health Encyclopedia &amp; NASA Evidence</h1>' +
               '<p class="page-sub">Evidence-based biomedical adaptations, countermeasure research, and physiological science.</p>' +
             '</div>' +
             '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">' +
               '<div class="card" style="padding:20px;">' +
                 '<div style="font-size:28px; margin-bottom:10px;">🫀</div>' +
                 '<h3 style="font-size:16px; font-weight:800; margin-bottom:6px;">Cardiovascular Deconditioning</h3>' +
                 '<p style="font-size:13px; color:var(--text-secondary); line-height:1.6; margin-bottom:14px;">In weightlessness, hydrostatic blood pressure disappears, shifting ~2 liters of interstitial fluids toward the head and chest. Heart muscle adjusts to lower workload, requiring daily aerobic and resistive exercise.</p>' +
                 '<button class="btn btn-outline btn-sm" onclick="window.toast(\'Opening NASA Human Research Program study\', \'info\')">Read NASA HRP Guidelines →</button>' +
               '</div>' +
               '<div class="card" style="padding:20px;">' +
                 '<div style="font-size:28px; margin-bottom:10px;">🦴</div>' +
                 '<h3 style="font-size:16px; font-weight:800; margin-bottom:6px;">Bone Mineral Density &amp; Atrophy</h3>' +
                 '<p style="font-size:13px; color:var(--text-secondary); line-height:1.6; margin-bottom:14px;">Astronauts can lose up to 1-1.5% of bone density per month in load-bearing bones (lumbar spine, femur). Advanced Resistive Exercise Device (ARED) protocols maintain osteoblast mechanical signaling.</p>' +
                 '<button class="btn btn-outline btn-sm" onclick="window.toast(\'Opening ARED Clinical Evidence\', \'info\')">Read Bone Countermeasures →</button>' +
               '</div>' +
               '<div class="card" style="padding:20px;">' +
                 '<div style="font-size:28px; margin-bottom:10px;">👁️</div>' +
                 '<h3 style="font-size:16px; font-weight:800; margin-bottom:6px;">Spaceflight-Associated Neuro-ocular Syndrome (SANS)</h3>' +
                 '<p style="font-size:13px; color:var(--text-secondary); line-height:1.6; margin-bottom:14px;">Cephalad fluid shifts increase intracranial pressure and optic disc edema, leading to globe flattening and hyperopic shifts in long-duration missions.</p>' +
                 '<button class="btn btn-outline btn-sm" onclick="window.toast(\'Opening SANS Clinical Evidence\', \'info\')">Explore Optical Telemetry →</button>' +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 6. NASA DATA VIEW (Live DONKI Space Weather & GeneLab)
  var nasaDataView = function() {
    return '<div class="view-nasadata animate-fade-in">' +
             '<div class="page-head">' +
               '<h1 class="page-title">NASA Open Data &amp; Telemetry Gateway</h1>' +
               '<p class="page-sub">Direct feeds from NASA Space Weather Database Of Notifications, Knowledge, Information (DONKI) &amp; GeneLab.</p>' +
             '</div>' +
             '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">' +
               '<div class="card" style="padding:20px;">' +
                 '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">' +
                   '<h3 style="font-size:16px; font-weight:800;">DONKI Solar Activity</h3>' +
                   '<span class="badge" style="background:var(--emerald-light); color:var(--emerald);">Live Active</span>' +
                 '</div>' +
                 '<div style="font-size:24px; font-weight:900; color:var(--emerald); margin-bottom:4px;">Class A0.8 (Quiet)</div>' +
                 '<p style="font-size:12px; color:var(--text-secondary);">No Coronal Mass Ejections (CME) directed toward LEO. Galactic Cosmic Radiation at baseline levels.</p>' +
               '</div>' +
               '<div class="card" style="padding:20px;">' +
                 '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">' +
                   '<h3 style="font-size:16px; font-weight:800;">NASA GeneLab Omics</h3>' +
                   '<span class="badge" style="background:var(--primary-light); color:var(--primary);">GLDS-482</span>' +
                 '</div>' +
                 '<div style="font-size:24px; font-weight:900; color:var(--primary); margin-bottom:4px;">1,420 Biomarkers</div>' +
                 '<p style="font-size:12px; color:var(--text-secondary);">Immune expression assays, mitochondrial DNA methylation &amp; telomere elongation data synced.</p>' +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 7. WELLNESS CHECK VIEW (WITH HTML ENTITY EMOJIS)
  var wellnessView = function() {
    var cid = S.crewId || 'carter';
    var curMood = S.mood !== undefined ? S.mood : 1;
    var sliders = S.sliders || { energy: 85, stress: 25, sleep: 80, workload: 65, hydration: 90, appetite: 85 };

    var emojis = [
      { idx: 0, ent: '&#128512;', label: 'Great' },
      { idx: 1, ent: '&#128522;', label: 'Good' },
      { idx: 2, ent: '&#128528;', label: 'Neutral' },
      { idx: 3, ent: '&#128532;', label: 'Tired' },
      { idx: 4, ent: '&#128545;', label: 'Stressed' }
    ];

    var emojiButtons = emojis.map(function(e) {
      var sel = (e.idx === curMood) ? 'selected' : '';
      return '<div class="mood-radio-btn ' + sel + '" onclick="S.setMood(' + e.idx + ')">' +
               '<span class="mood-emoji">' + e.ent + '</span>' +
               '<span class="mood-label">' + e.label + '</span>' +
             '</div>';
    }).join('');

    return '<div class="view-wellness animate-fade-in">' +
             renderCrewBar(cid) +
             '<div class="page-head">' +
               '<h1 class="page-title">Daily Wellness &amp; Psych Check-In</h1>' +
               '<p class="page-sub">Log your subjective physiological ratings and microgravity adaptation metrics.</p>' +
             '</div>' +

             '<div class="card" style="max-width:740px; padding:24px;">' +
               '<h3 style="font-size:16px; font-weight:800; margin-bottom:14px;">1. How are you feeling overall today?</h3>' +
               '<div class="mood-selector-row" style="display:flex; gap:12px; margin-bottom:28px;">' + emojiButtons + '</div>' +

               '<h3 style="font-size:16px; font-weight:800; margin-bottom:14px;">2. Physiological Rating Sliders</h3>' +
               '<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:28px;">' +
                 '<div class="slider-group">' +
                   '<div style="display:flex; justify-content:space-between; margin-bottom:6px;"><label style="font-weight:700;">⚡ Energy Level</label><span id="slider-val-energy" style="color:var(--primary); font-weight:800;">' + (sliders.energy || 85) + '%</span></div>' +
                   '<input type="range" min="0" max="100" value="' + (sliders.energy || 85) + '" oninput="S.setSlider(\'energy\', this.value)" style="width:100%;">' +
                 '</div>' +
                 '<div class="slider-group">' +
                   '<div style="display:flex; justify-content:space-between; margin-bottom:6px;"><label style="font-weight:700;">🧠 Cognitive Focus</label><span id="slider-val-stress" style="color:var(--primary); font-weight:800;">' + (sliders.stress || 80) + '%</span></div>' +
                   '<input type="range" min="0" max="100" value="' + (sliders.stress || 80) + '" oninput="S.setSlider(\'stress\', this.value)" style="width:100%;">' +
                 '</div>' +
                 '<div class="slider-group">' +
                   '<div style="display:flex; justify-content:space-between; margin-bottom:6px;"><label style="font-weight:700;">😴 Sleep Quality</label><span id="slider-val-sleep" style="color:var(--primary); font-weight:800;">' + (sliders.sleep || 80) + '%</span></div>' +
                   '<input type="range" min="0" max="100" value="' + (sliders.sleep || 80) + '" oninput="S.setSlider(\'sleep\', this.value)" style="width:100%;">' +
                 '</div>' +
                 '<div class="slider-group">' +
                   '<div style="display:flex; justify-content:space-between; margin-bottom:6px;"><label style="font-weight:700;">💧 Hydration Status</label><span id="slider-val-hydration" style="color:var(--primary); font-weight:800;">' + (sliders.hydration || 90) + '%</span></div>' +
                   '<input type="range" min="0" max="100" value="' + (sliders.hydration || 90) + '" oninput="S.setSlider(\'hydration\', this.value)" style="width:100%;">' +
                 '</div>' +
               '</div>' +

               '<button class="btn btn-primary" style="width:100%; padding:14px; font-size:15px; font-weight:700;" onclick="S.submitWellness()">' +
                 'Log Daily Check-In &amp; Sync with Medical Lead →' +
               '</button>' +
             '</div>' +
           '</div>';
  };

  // 8. ASSESSMENT VIEW
  var assessmentView = function() {
    var cid = S.crewId || 'carter';
    return '<div class="view-assessment animate-fade-in">' +
             renderCrewBar(cid) +
             '<div class="page-head">' +
               '<h1 class="page-title">Cognitive &amp; Clinical Assessment</h1>' +
               '<p class="page-sub">Interactive psychomotor vigilance and cardiovascular stress tests.</p>' +
             '</div>' +
             '<div class="card" style="max-width:680px; padding:24px;">' +
               '<div style="text-align:center; padding:30px 20px;">' +
                 '<div style="font-size:48px; margin-bottom:12px;">🎯</div>' +
                 '<h3 style="font-size:20px; font-weight:800; margin-bottom:8px;">Spatial Memory &amp; Reaction Test</h3>' +
                 '<p style="font-size:13px; color:var(--text-secondary); margin-bottom:24px;">Tap the flashing targets as rapidly and accurately as possible to evaluate neurological response latency.</p>' +
                 '<button class="btn btn-primary" style="padding:12px 28px;" onclick="S.submitAssessment()">Complete Assessment →</button>' +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 9. RADIATION & DOSIMETRY VIEW
  var radiationView = function() {
    return '<div class="view-radiation animate-fade-in">' +
             '<div class="page-head">' +
               '<h1 class="page-title">Dosimetry &amp; Radiation Environment</h1>' +
               '<p class="page-sub">Continuous ionization chamber telemetry and cumulative career dose tracking.</p>' +
             '</div>' +
             '<div class="vitals-ribbon-grid">' +
               '<div class="vital-tile card"><div class="vital-tile-head"><span class="vital-name">Daily Exposure</span><span class="vital-badge badge-normal">Safe</span></div><div class="vital-main-val">0.21 <span class="vital-unit">mSv/d</span></div></div>' +
               '<div class="vital-tile card"><div class="vital-tile-head"><span class="vital-name">Mission Cumulative</span><span class="vital-badge badge-normal">Normal</span></div><div class="vital-main-val">38.4 <span class="vital-unit">mSv</span></div></div>' +
               '<div class="vital-tile card"><div class="vital-tile-head"><span class="vital-name">Career Limit</span><span class="vital-badge badge-normal">9.6%</span></div><div class="vital-main-val">400 <span class="vital-unit">mSv Max</span></div></div>' +
             '</div>' +
           '</div>';
  };

  // 10. ACTIVITY & FITNESS VIEW
  var activityView = function() {
    return '<div class="view-activity animate-fade-in">' +
             '<div class="page-head">' +
               '<h1 class="page-title">Activity &amp; Countermeasure Workouts</h1>' +
               '<p class="page-sub">ARED Resistive loads, T2 Treadmill velocity, and cycle ergometer telemetry.</p>' +
             '</div>' +
             '<div class="card" style="padding:24px;">' +
               '<h3 style="font-size:16px; font-weight:800; margin-bottom:12px;">Today’s Microgravity Exercise Target: 600 kcal</h3>' +
               '<div style="width:100%; height:12px; background:#E2E8F0; border-radius:999px; overflow:hidden; margin-bottom:12px;">' +
                 '<div style="width:85%; height:100%; background:var(--primary);"></div>' +
               '</div>' +
               '<p style="font-size:13px; color:var(--text-secondary);">510 / 600 kcal completed (85%). Completed 30 min T2 interval running and 25 min ARED deadlifts.</p>' +
             '</div>' +
           '</div>';
  };

  // 11. ALERTS VIEW
  var alertsView = function() {
    return '<div class="view-alerts animate-fade-in">' +
             '<div class="page-head">' +
               '<h1 class="page-title">Action Center &amp; Notifications</h1>' +
               '<p class="page-sub">Real-time telemetry notifications, clinical warnings, and schedule alerts.</p>' +
             '</div>' +
             '<div class="card" style="padding:20px;">' +
               '<div style="display:flex; gap:14px; align-items:flex-start; padding:12px 0; border-bottom:1px solid var(--border);">' +
                 '<span style="font-size:20px;">🟢</span>' +
                 '<div><div style="font-weight:700;">Vitals Nominal</div><div style="font-size:12px; color:var(--text-secondary);">All 6 core biometric streams are within flight surgeon green baseline tolerances.</div></div>' +
               '</div>' +
               '<div style="display:flex; gap:14px; align-items:flex-start; padding:12px 0;">' +
                 '<span style="font-size:20px;">ℹ️</span>' +
                 '<div><div style="font-weight:700;">Upcoming Exercise Block</div><div style="font-size:12px; color:var(--text-secondary);">ARED resistive session scheduled for 14:00 UTC. Hydrate with electrolyte pack beforehand.</div></div>' +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 12. PROFILE & SETTINGS VIEW
  var profileView = function() {
    var cid = S.crewId || 'carter';
    var c = window.getCrewData ? window.getCrewData(cid) : { name: 'Alex Carter', sid: 'AST-001', role: 'Commander', avatar: 'AC' };

    return '<div class="view-profile animate-fade-in">' +
             renderCrewBar(cid) +
             '<div class="page-head">' +
               '<h1 class="page-title">Astronaut Medical Profile</h1>' +
               '<p class="page-sub">Official NASA Flight Surgeon baseline medical records for <strong>' + c.name + '</strong> (' + c.sid + ').</p>' +
             '</div>' +
             '<div class="card" style="max-width:720px; padding:24px;">' +
               '<div style="display:flex; gap:18px; align-items:center; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid var(--border);">' +
                 '<div class="crew-card-avatar" style="width:60px; height:60px; font-size:20px;">' + c.avatar + '</div>' +
                 '<div>' +
                   '<h2 style="font-size:18px; font-weight:800; color:var(--text-primary);">' + c.name + '</h2>' +
                   '<div style="font-size:13px; color:var(--text-secondary);">' + c.role + ' • Serial ID: <strong>' + c.sid + '</strong></div>' +
                 '</div>' +
               '</div>' +
               '<button class="btn btn-primary" onclick="S.logout()">Switch Operational Portal / Logout</button>' +
             '</div>' +
           '</div>';
  };

  // Expose methods under both V and AstronautViews with kebab-case and camelCase aliases
  var viewsObj = {
    login: loginView,
    overview: overviewView,
    home: overviewView,
    systems: systemsView,
    health: systemsView,
    'my-health': systemsView,
    'system-detail': systemDetailView,
    systemDetail: systemDetailView,
    body3d: systemDetailView,
    '3d-body': systemDetailView,
    'body-explorer': systemDetailView,
    mission: missionView,
    missions: missionView,
    learn: learnView,
    'nasa-data': nasaDataView,
    nasadata: nasaDataView,
    vitals: overviewView,
    telemetry: overviewView,
    assessment: assessmentView,
    wellness: wellnessView,
    radiation: radiationView,
    activity: activityView,
    trends: activityView,
    alerts: alertsView,
    profile: profileView
  };

  Object.assign(window.V, viewsObj);
  Object.assign(window.AstronautViews, viewsObj);
})();
