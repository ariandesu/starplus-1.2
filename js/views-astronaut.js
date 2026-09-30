// js/views-astronaut.js — Complete Astronaut Section Views for STAR PLUS 1.2

(function() {
  window.V = window.V || {};
  window.AstronautViews = window.AstronautViews || {};

  // Helper: Render Crew Switcher Bar
  function renderCrewBar(activeId) {
    var crewList = window.CREW || [];
    var cards = crewList.map(function(c) {
      var active = (c.id === activeId) ? 'active' : '';
      var statusClass = c.status === 'stable' ? 'color:var(--emerald);' : (c.status === 'attention' ? 'color:var(--amber);' : 'color:var(--azure);');
      return '<div class="crew-quick-card ' + active + '" onclick="S.switchCrew(\'' + c.id + '\')">' +
               '<div class="crew-card-avatar">' + c.avatar + '</div>' +
               '<div class="crew-card-info">' +
                 '<div class="crew-card-name">' + c.name + ' <span style="font-size:10px; opacity:0.75;">(' + c.sid + ')</span></div>' +
                 '<div class="crew-card-sub">' +
                   '<span>' + c.role + '</span>' +
                   '<span style="' + statusClass + '">• ' + (c.status === 'stable' ? 'Nominal' : 'Attention') + '</span>' +
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

  // 1. ASTRONAUT OVERVIEW VIEW
  var overviewView = function() {
    var cid = S.crewId || 'carter';
    var rng = S.range || '7D';
    var t = window.getTelemetry(cid, rng);
    var c = window.getCrewData(cid);
    var systems = window.getCrewSystems(cid, rng);

    var changesHtml = t.changes.map(function(item) {
      var isUp = item.dir === 'up';
      var isDown = item.dir === 'down';
      var arrow = isUp ? '↑ ' : (isDown ? '↓ ' : '• ');
      var color = isUp ? 'var(--emerald)' : (isDown ? 'var(--rose)' : 'var(--azure)');
      return '<div class="item" style="padding:10px 0; border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center;">' +
               '<div>' +
                 '<div style="font-size:13px; font-weight:700; color:var(--text-primary);">' + item.name + '</div>' +
                 '<div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">' + item.val + '</div>' +
               '</div>' +
               '<div style="font-size:12px; font-weight:700; font-family:var(--font-mono); color:' + color + ';">' + arrow + item.delta + '</div>' +
             '</div>';
    }).join('');

    var systemPills = systems.slice(0, 4).map(function(sys) {
      var isAttn = sys.status === 'Attention';
      var badgeColor = isAttn ? 'var(--amber)' : 'var(--emerald)';
      var badgeBg = isAttn ? 'var(--amber-bg)' : 'var(--emerald-bg)';
      return '<div class="card" onclick="S.openSys(\'' + sys.id + '\')" style="cursor:pointer; padding:12px; transition:transform 0.15s ease;" onmouseover="this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.transform=\'none\'">' +
               '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">' +
                 '<div style="display:flex; align-items:center; gap:6px; font-weight:700; font-size:12px; color:var(--text-primary);">' +
                   window.icon(sys.icon, 14) + ' ' + sys.name +
                 '</div>' +
                 '<span class="badge" style="background:' + badgeBg + '; color:' + badgeColor + '; font-size:10px;">' + sys.status + '</span>' +
               '</div>' +
               '<div style="font-size:11px; color:var(--text-secondary); line-height:1.3;">' + sys.metrics + '</div>' +
             '</div>';
    }).join('');

    var overviewSvg = window.areaChart ? window.areaChart(t.series, t.labels, '#0071E3', 480, 140) : '';

    return '<div class="view-astronaut-overview animate-fade-in">' +
             '<!-- Crew Switcher Bar -->' +
             renderCrewBar(cid) +

             '<!-- Page Header -->' +
             '<div class="page-head" style="margin-bottom:16px;">' +
               '<div>' +
                 '<h1 class="page-title">Astronaut Telemetry &amp; Health Overview</h1>' +
                 '<p class="page-sub">Real-time biometrics, clinical telemetry, and organ models for <strong>' + c.name + '</strong> (' + c.sid + ' • ' + c.role + ').</p>' +
               '</div>' +
             '</div>' +

             '<!-- Time Range Tabs -->' +
             renderRangeTabs(rng) +

             '<!-- Top Stat KPI Cards -->' +
             '<div class="grid4" style="margin-bottom:24px;">' +
               '<div class="stat-card" style="border-left:4px solid var(--primary);">' +
                 '<div class="stat-label">' + window.icon('vitals', 14) + ' Readiness Score (' + rng + ')</div>' +
                 '<div class="stat-value" style="color:var(--primary);">' + t.readiness + '<span style="font-size:16px;">%</span></div>' +
                 '<div class="stat-foot" style="color:var(--emerald);">● Optimal Flight Condition</div>' +
               '</div>' +
               '<div class="stat-card" style="border-left:4px solid var(--rose);">' +
                 '<div class="stat-label">' + window.icon('heart', 14) + ' Heart Rate (' + rng + ')</div>' +
                 '<div class="stat-value" style="color:var(--rose);">' + t.hr + '</div>' +
                 '<div class="stat-foot" style="color:var(--text-secondary);">Resting: ' + c.hr + '</div>' +
               '</div>' +
               '<div class="stat-card" style="border-left:4px solid var(--amber);">' +
                 '<div class="stat-label">' + window.icon('radiation', 14) + ' Radiation Dose Rate</div>' +
                 '<div class="stat-value" style="color:var(--amber);">' + t.doseRate + '</div>' +
                 '<div class="stat-foot" style="color:var(--text-secondary);">Cumulative: ' + c.radiation + '</div>' +
               '</div>' +
               '<div class="stat-card" style="border-left:4px solid var(--emerald);">' +
                 '<div class="stat-label">' + window.icon('activity', 14) + ' Sleep / Exercise (' + rng + ')</div>' +
                 '<div class="stat-value" style="color:var(--emerald);">' + t.sleepHrs + '</div>' +
                 '<div class="stat-foot" style="color:var(--text-secondary);">Exercise: ' + t.workoutMin + '</div>' +
               '</div>' +
             '</div>' +

             '<!-- Main Overview Columns: 3D Body Card + Telemetry Trends -->' +
             '<div class="grid-2-1" style="grid-template-columns: 1.1fr 0.9fr; gap:24px;">' +
               '<!-- 3D Organ Canvas Card -->' +
               '<div class="card" style="padding:20px; display:flex; flex-direction:column;">' +
                 '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">' +
                   '<div style="display:flex; align-items:center; gap:8px;">' +
                     window.icon('systems', 18) +
                     '<h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Interactive Organ Systems (3D GLB)</h3>' +
                   '</div>' +
                   '<button class="btn btn-sm" onclick="S.set({view:\'systems\'})">View All Systems →</button>' +
                 '</div>' +
                 '<div class="organ-viewer-container" style="height:320px; position:relative; background:#0B132B; border-radius:14px; overflow:hidden; border:1px solid var(--border);">' +
                   '<canvas id="organ-canvas" style="width:100%; height:100%; display:block;"></canvas>' +
                   '<div style="position:absolute; bottom:12px; left:14px; font-size:11px; color:#A0AEC0; pointer-events:none; background:rgba(0,0,0,0.5); padding:4px 8px; border-radius:6px;">' +
                     '3D Mesh Loaded • OrbitControls Active (Drag to Rotate, Scroll to Zoom)' +
                   '</div>' +
                 '</div>' +
                 '<div style="margin-top:16px; display:grid; grid-template-columns:1fr 1fr; gap:10px;">' +
                   systemPills +
                 '</div>' +
               '</div>' +

               '<!-- Trends & Recent Biomarker Changes Card -->' +
               '<div class="card" style="padding:20px; display:flex; flex-direction:column; justify-content:space-between;">' +
                 '<div>' +
                   '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">' +
                     '<div style="display:flex; align-items:center; gap:8px;">' +
                       window.icon('vitals', 18) +
                       '<h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Biomarker Dynamic Changes (' + rng + ')</h3>' +
                     '</div>' +
                     '<span class="badge" style="background:var(--primary-light); color:var(--primary); font-size:11px;">' + c.name + '</span>' +
                   '</div>' +
                   '<div style="margin-bottom:16px;">' +
                     overviewSvg +
                   '</div>' +
                   '<div style="margin-top:10px;">' +
                     changesHtml +
                   '</div>' +
                 '</div>' +
                 '<div style="margin-top:20px; padding-top:14px; border-top:1px solid var(--border); display:flex; gap:10px;">' +
                   '<button class="btn btn-primary" style="flex:1;" onclick="S.set({view:\'assessment\'})">Start Clinical Check →</button>' +
                   '<button class="btn" style="flex:1;" onclick="S.set({view:\'wellness\'})">Daily Wellness Log</button>' +
                 '</div>' +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 2. SYSTEMS VIEW
  var systemsView = function() {
    var cid = S.crewId || 'carter';
    var rng = S.range || '7D';
    var c = window.getCrewData(cid);
    var systems = window.getCrewSystems(cid, rng);

    var cards = systems.map(function(sys) {
      var isAttn = sys.status === 'Attention';
      var badgeColor = isAttn ? 'var(--amber)' : (sys.status === 'Monitoring' ? 'var(--azure)' : 'var(--emerald)');
      var badgeBg = isAttn ? 'var(--amber-bg)' : (sys.status === 'Monitoring' ? 'var(--azure-bg)' : 'var(--emerald-bg)');

      var paramsHtml = sys.parameters.map(function(p) {
        return '<div style="display:flex; justify-content:space-between; font-size:11px; padding:4px 0; border-bottom:1px dashed var(--border);">' +
                 '<span style="color:var(--text-secondary);">' + p.label + ':</span>' +
                 '<strong style="font-family:var(--font-mono); color:var(--text-primary);">' + p.val + ' ' + p.unit + '</strong>' +
               '</div>';
      }).join('');

      return '<div class="card" style="padding:18px; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer;" onclick="S.openSys(\'' + sys.id + '\')">' +
               '<div>' +
                 '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
                   '<div style="display:flex; align-items:center; gap:8px; font-weight:800; font-size:14px; color:var(--text-primary);">' +
                     window.icon(sys.icon, 18) + ' ' + sys.name +
                   '</div>' +
                   '<span class="badge" style="background:' + badgeBg + '; color:' + badgeColor + '; font-size:10px;">' + sys.status + '</span>' +
                 '</div>' +
                 '<p style="font-size:12px; color:var(--text-secondary); line-height:1.4; margin-bottom:12px;">' + sys.blurb + '</p>' +
                 '<div style="background:var(--bg); padding:10px; border-radius:8px; margin-bottom:14px;">' +
                   paramsHtml +
                 '</div>' +
               '</div>' +
               '<button class="btn btn-sm btn-primary" style="width:100%;">Open ' + sys.name + ' Telemetry →</button>' +
             '</div>';
    }).join('');

    return '<div class="view-systems animate-fade-in">' +
             renderCrewBar(cid) +
             '<div class="page-head">' +
               '<div>' +
                 '<h1 class="page-title">Organ Systems Telemetry (' + systems.length + ' Systems)</h1>' +
                 '<p class="page-sub">Physiological breakdown and 3D organ monitoring for <strong>' + c.name + '</strong> (' + rng + ').</p>' +
               '</div>' +
             '</div>' +
             renderRangeTabs(rng) +
             '<div class="grid4" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:18px;">' +
               cards +
             '</div>' +
           '</div>';
  };

  // 3. SYSTEM DETAIL VIEW
  var systemDetailView = function() {
    var cid = S.crewId || 'carter';
    var rng = S.range || '7D';
    var sysId = S.sys || 'cardiovascular';
    var systems = window.getCrewSystems(cid, rng);
    var sys = systems.find(function(s) { return s.id === sysId; }) || systems[0];
    var c = window.getCrewData(cid);
    var t = window.getTelemetry(cid, rng);

    var subTab = S.subTab || 'overview';

    var paramsHtml = sys.parameters.map(function(p) {
      return '<div class="stat-card">' +
               '<div class="stat-label">' + p.label + '</div>' +
               '<div class="stat-value">' + p.val + '<span style="font-size:14px; margin-left:4px;">' + p.unit + '</span></div>' +
               '<div class="stat-foot" style="color:var(--primary);">' + (p.delta || 'Nominal') + '</div>' +
             '</div>';
    }).join('');

    var recommendationsHtml = sys.recommendations.map(function(rec, idx) {
      return '<div style="display:flex; align-items:flex-start; gap:10px; margin-bottom:10px; font-size:12px; color:var(--text-primary);">' +
               '<span style="background:var(--primary); color:#fff; border-radius:50%; width:20px; height:20px; display:grid; place-items:center; font-weight:800; flex-shrink:0;">' + (idx+1) + '</span>' +
               '<div>' + rec + '</div>' +
             '</div>';
    }).join('');

    var sysChartSvg = window.areaChart ? window.areaChart(sys.chartData || t.series, t.labels, '#0071E3', 440, 160) : '';

    return '<div class="view-system-detail animate-fade-in">' +
             renderCrewBar(cid) +
             '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">' +
               '<button class="btn btn-sm" onclick="S.set({view:\'systems\'})">← Back to All Systems</button>' +
               '<div style="display:flex; gap:8px;">' +
                 '<button class="btn btn-sm ' + (subTab === 'overview' ? 'btn-primary' : '') + '" onclick="S.set({subTab:\'overview\'})">Overview</button>' +
                 '<button class="btn btn-sm ' + (subTab === 'trends' ? 'btn-primary' : '') + '" onclick="S.set({subTab:\'trends\'})">Trends &amp; Metrics</button>' +
                 '<button class="btn btn-sm ' + (subTab === 'countermeasures' ? 'btn-primary' : '') + '" onclick="S.set({subTab:\'countermeasures\'})">Protocols &amp; Insights</button>' +
               '</div>' +
             '</div>' +

             renderRangeTabs(rng) +

             '<div class="grid-2-1" style="grid-template-columns: 1.2fr 0.8fr; gap:20px;">' +
               '<!-- 3D Organ Canvas Card -->' +
               '<div class="card" style="padding:20px;">' +
                 '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">' +
                   '<div style="display:flex; align-items:center; gap:8px;">' +
                     window.icon(sys.icon, 20) +
                     '<h2 style="font-size:18px; font-weight:800; color:var(--text-primary);">' + sys.name + ' 3D Telemetry</h2>' +
                   '</div>' +
                   '<span class="badge badge-stable">' + sys.status + '</span>' +
                 '</div>' +
                 '<div class="organ-viewer-container" style="height:380px; position:relative; background:#0B132B; border-radius:14px; overflow:hidden; border:1px solid var(--border);">' +
                   '<canvas id="organ-canvas" style="width:100%; height:100%; display:block;"></canvas>' +
                   '<div style="position:absolute; top:12px; left:12px; background:rgba(0,0,0,0.6); padding:6px 12px; border-radius:8px; font-size:11px; color:#fff;">' +
                     'Model: <strong>' + sys.name + ' (HRA/BodyParts3D)</strong>' +
                   '</div>' +
                 '</div>' +
               '</div>' +

               '<!-- Parameters & Trends -->' +
               '<div class="card" style="padding:20px;">' +
                 '<h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin-bottom:14px;">' + sys.chartTitle + '</h3>' +
                 '<div style="margin-bottom:18px;">' +
                   sysChartSvg +
                 '</div>' +
                 '<h4 style="font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:10px;">Live Physiological Metrics</h4>' +
                 '<div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:18px;">' +
                   paramsHtml +
                 '</div>' +
                 '<h4 style="font-size:13px; font-weight:700; color:var(--text-primary); margin-bottom:8px;">Flight Surgeon Protocols</h4>' +
                 recommendationsHtml +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 4. VITALS VIEW
  var vitalsView = function() {
    var cid = S.crewId || 'carter';
    var rng = S.range || '7D';
    var vitals = window.getCrewVitals(cid, rng);
    var c = window.getCrewData(cid);

    var cards = vitals.map(function(v) {
      var sparkSvg = window.sparkline ? window.sparkline(v.sparkData, '#0071E3', 220, 42, true) : '';
      return '<div class="card" style="padding:18px; display:flex; flex-direction:column; justify-content:space-between;">' +
               '<div>' +
                 '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">' +
                   '<span style="font-size:13px; font-weight:700; color:var(--text-primary);">' + v.name + '</span>' +
                   '<span class="badge badge-' + v.status + '" style="font-size:10px;">' + v.status.toUpperCase() + '</span>' +
                 '</div>' +
                 '<div style="font-size:26px; font-weight:900; font-family:var(--font-mono); color:var(--text-primary); margin-bottom:12px;">' +
                   v.value + ' <span style="font-size:13px; font-weight:600; color:var(--text-secondary);">' + v.unit + '</span>' +
                 '</div>' +
               '</div>' +
               '<div style="height:42px; width:100%; margin-top:8px;">' +
                 sparkSvg +
               '</div>' +
             '</div>';
    }).join('');

    return '<div class="view-vitals animate-fade-in">' +
             renderCrewBar(cid) +
             '<div class="page-head">' +
               '<div>' +
                 '<h1 class="page-title">Continuous BioMonitor Vital Signs</h1>' +
                 '<p class="page-sub">Direct telemetry feed for <strong>' + c.name + '</strong> (' + c.sid + ' • ' + rng + ').</p>' +
               '</div>' +
             '</div>' +
             renderRangeTabs(rng) +
             '<div class="grid4" style="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap:18px;">' +
               cards +
             '</div>' +
           '</div>';
  };

  // 5. CLINICAL ASSESSMENT WIZARD VIEW
  var assessmentView = function() {
    var cid = S.crewId || 'carter';
    var c = window.getCrewData(cid);
    var step = S.step || 0;

    var stepContent = '';
    if (step === 0) {
      stepContent = '<div style="padding:10px 0;">' +
                      '<h3 style="font-size:16px; font-weight:800; color:var(--text-primary); margin-bottom:10px;">Step 1: BioMonitor Baseline Calibration</h3>' +
                      '<p style="font-size:13px; color:var(--text-secondary); line-height:1.5; margin-bottom:16px;">' +
                        'Ensure the chest sensor harness and optical pulse plethysmograph are snug against skin. Live calibration for <strong>' + c.name + '</strong> is running.' +
                      '</p>' +
                      '<div style="background:var(--bg); padding:16px; border-radius:12px; margin-bottom:20px;">' +
                        '<div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px;">' +
                          '<span>Heart Rate Signal Quality:</span>' +
                          '<strong style="color:var(--emerald);">100% (High SNR)</strong>' +
                        '</div>' +
                        '<div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px;">' +
                          '<span>Resting Baseline:</span>' +
                          '<strong style="font-family:var(--font-mono);">' + c.hr + '</strong>' +
                        '</div>' +
                        '<div style="display:flex; justify-content:space-between; font-size:13px;">' +
                          '<span>SpO₂ Sensor Drift:</span>' +
                          '<strong style="color:var(--emerald);">0.0% Nominal</strong>' +
                        '</div>' +
                      '</div>' +
                      '<button class="btn btn-primary" onclick="S.stepNext()">Proceed to Neuro-Vestibular Test →</button>' +
                    '</div>';
    } else if (step === 1) {
      stepContent = '<div style="padding:10px 0;">' +
                      '<h3 style="font-size:16px; font-weight:800; color:var(--text-primary); margin-bottom:10px;">Step 2: Neuro-Vestibular &amp; Saccadic Latency Test</h3>' +
                      '<p style="font-size:13px; color:var(--text-secondary); line-height:1.5; margin-bottom:16px;">' +
                        'Tracking visual fixation target to measure zero-g otolith desensitization.' +
                      '</p>' +
                      '<div style="background:#0B132B; padding:30px; border-radius:12px; text-align:center; margin-bottom:20px; border:1px solid var(--border);">' +
                        '<div style="font-size:36px; margin-bottom:8px;">🎯</div>' +
                        '<div style="font-size:14px; font-weight:700; color:#fff;">Saccadic Reaction Time: 212 ms</div>' +
                        '<div style="font-size:12px; color:#A0AEC0; margin-top:4px;">Within Nominal Envelope (&lt; 250 ms)</div>' +
                      '</div>' +
                      '<div style="display:flex; gap:10px;">' +
                        '<button class="btn" onclick="S.stepBack()">← Previous Step</button>' +
                        '<button class="btn btn-primary" onclick="S.stepNext()">Complete Diagnostic Summary →</button>' +
                      '</div>' +
                    '</div>';
    } else {
      stepContent = '<div style="padding:10px 0;">' +
                      '<h3 style="font-size:16px; font-weight:800; color:var(--text-primary); margin-bottom:10px;">Step 3: Clinical Diagnostic Review &amp; Flight Surgeon Telemetry Sign-off</h3>' +
                      '<p style="font-size:13px; color:var(--text-secondary); line-height:1.5; margin-bottom:16px;">' +
                        'All physiological metrics for <strong>' + c.name + '</strong> have been captured and verified against Sol 184 cruise baselines.' +
                      '</p>' +
                      '<div style="background:var(--bg); padding:16px; border-radius:12px; margin-bottom:20px; border-left:4px solid var(--emerald);">' +
                        '<div style="font-weight:700; font-size:13px; color:var(--text-primary); margin-bottom:4px;">Medical Clearance Status:</div>' +
                        '<div style="font-size:13px; color:var(--emerald); font-weight:800;">FLIGHT QUALIFIED / NOMINAL MARS CRUISE</div>' +
                      '</div>' +
                      '<div style="display:flex; gap:10px;">' +
                        '<button class="btn" onclick="S.stepBack()">← Previous Step</button>' +
                        '<button class="btn btn-primary" onclick="S.submitAssessment()">Submit Report to Ground Control ✓</button>' +
                      '</div>' +
                    '</div>';
    }

    return '<div class="view-assessment animate-fade-in">' +
             renderCrewBar(cid) +
             '<div class="page-head">' +
               '<div>' +
                 '<h1 class="page-title">Interactive Medical &amp; Fitness Assessment</h1>' +
                 '<p class="page-sub">Step-by-step diagnostic verification protocol for <strong>' + c.name + '</strong>.</p>' +
               '</div>' +
             '</div>' +
             '<div class="card" style="max-width:760px; margin:0 auto; padding:24px;">' +
               stepContent +
             '</div>' +
           '</div>';
  };

  // 6. WELLNESS CHECK-IN VIEW (WITH RICH W3SCHOOLS HTML EMOJIS)
  var wellnessView = function() {
    var cid = S.crewId || 'carter';
    var c = window.getCrewData(cid);
    var curMood = S.mood !== undefined ? S.mood : 1;
    var sliders = S.sliders || {};

    // Mood cards with W3Schools HTML Emojis
    var moodsHtml = (window.MOODS || []).map(function(m, idx) {
      var active = (idx === curMood) ? 'active' : '';
      return '<div class="mood-card ' + active + '" onclick="S.setMood(' + idx + ')">' +
               '<div class="mood-emoji">' + m.emojiCode + '</div>' +
               '<div class="mood-label">' + m.label + '</div>' +
               '<div class="mood-desc">' + m.desc + '</div>' +
             '</div>';
    }).join('');

    // Subjective Sliders with HTML Emojis
    var slidersHtml = (window.SLIDERS || []).map(function(sl) {
      var val = sliders[sl.id] !== undefined ? sliders[sl.id] : sl.defaultVal;
      return '<div class="wellness-slider-box">' +
               '<div class="slider-header-line">' +
                 '<div class="slider-title-wrap">' +
                   '<span class="slider-emoji-icon">' + sl.emoji + '</span>' +
                   '<span>' + sl.label + '</span>' +
                 '</div>' +
                 '<div class="slider-value-pill" id="slider-val-' + sl.id + '">' + val + '%</div>' +
               '</div>' +
               '<input type="range" min="0" max="100" value="' + val + '" style="width:100%; accent-color:var(--primary); cursor:pointer;" oninput="S.setSlider(\'' + sl.id + '\', this.value)">' +
               '<div class="slider-sub-labels">' +
                 '<span>' + sl.minEmoji + ' ' + sl.minLabel + '</span>' +
                 '<span>' + sl.maxEmoji + ' ' + sl.maxLabel + '</span>' +
               '</div>' +
             '</div>';
    }).join('');

    // Zero-G Symptoms with HTML Emojis
    var symptomsHtml = (window.ZERO_G_SYMPTOMS || []).map(function(sym) {
      return '<label class="symptom-item">' +
               '<input type="checkbox" checked>' +
               '<span class="symptom-emoji">' + sym.emoji + '</span>' +
               '<div>' +
                 '<div class="symptom-name">' + sym.label + '</div>' +
                 '<div class="symptom-desc">' + sym.desc + '</div>' +
               '</div>' +
             '</label>';
    }).join('');

    return '<div class="view-wellness animate-fade-in">' +
             renderCrewBar(cid) +
             '<div class="page-head">' +
               '<div>' +
                 '<h1 class="page-title">Daily Subjective Wellness &amp; Zero-G Symptoms Check</h1>' +
                 '<p class="page-sub">Logged daily by <strong>' + c.name + '</strong> for flight surgeon psychological and somatic telemetry.</p>' +
               '</div>' +
             '</div>' +

             '<div class="card" style="max-width:820px; margin:0 auto; padding:24px;">' +
               '<!-- Mood Selection with W3Schools Emojis -->' +
               '<h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin-bottom:4px;">1. Overall Mood &amp; Psychological Valence</h3>' +
               '<p style="font-size:12px; color:var(--text-secondary); margin-bottom:12px;">Select the emoji that best reflects your mental alertness and emotional state today:</p>' +
               '<div class="mood-grid">' +
                 moodsHtml +
               '</div>' +

               '<!-- Subjective Sliders with Emojis -->' +
               '<h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin-top:24px; margin-bottom:4px;">2. Physiological Energy &amp; Restfulness Sliders</h3>' +
               '<p style="font-size:12px; color:var(--text-secondary); margin-bottom:14px;">Calibrate subjective feelings across key metabolic and cognitive dimensions:</p>' +
               slidersHtml +

               '<!-- Zero-G Symptoms Checklist -->' +
               '<h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin-top:24px; margin-bottom:4px;">3. Microgravity Adaptation Symptoms Check</h3>' +
               '<div class="symptom-grid">' +
                 symptomsHtml +
               '</div>' +

               '<!-- Notes Field -->' +
               '<h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin-top:20px; margin-bottom:6px;">4. Sol 184 Personal Log Notes</h3>' +
               '<textarea id="wellness-notes" placeholder="Enter subjective notes (e.g. sleep quality, headache, taste changes, exercise fatigue)..." style="width:100%; height:80px; padding:12px; border-radius:10px; border:1px solid var(--border); font-family:var(--font-sans); font-size:13px; resize:vertical; outline:none; background:var(--bg); color:var(--text-primary); margin-bottom:20px;"></textarea>' +

               '<!-- Submit Button -->' +
               '<button class="btn btn-primary" style="width:100%; padding:14px; font-size:14px;" onclick="S.submitWellness()">' +
                 '&#128640; Submit Daily Wellness Check-In to Flight Surgeon' +
               '</button>' +
             '</div>' +
           '</div>';
  };

  // 7. RADIATION VIEW
  var radiationView = function() {
    var cid = S.crewId || 'carter';
    var rng = S.range || '7D';
    var t = window.getTelemetry(cid, rng);
    var c = window.getCrewData(cid);
    var radSvg = window.areaChart ? window.areaChart(t.radSeries, t.labels, '#F5A623', 700, 200) : '';

    return '<div class="view-radiation animate-fade-in">' +
             renderCrewBar(cid) +
             '<div class="page-head">' +
               '<div>' +
                 '<h1 class="page-title">Galactic Cosmic Ray (GCR) &amp; SPE Dosimetry</h1>' +
                 '<p class="page-sub">Active personal dosimeter telemetry for <strong>' + c.name + '</strong> (' + rng + ').</p>' +
               '</div>' +
             '</div>' +
             renderRangeTabs(rng) +
             '<div class="grid4" style="margin-bottom:24px;">' +
               '<div class="stat-card" style="border-left:4px solid var(--amber);">' +
                 '<div class="stat-label">Daily Dose Rate (' + rng + ')</div>' +
                 '<div class="stat-value" style="color:var(--amber);">' + t.doseRate + '</div>' +
                 '<div class="stat-foot">Background Interplanetary</div>' +
               '</div>' +
               '<div class="stat-card" style="border-left:4px solid var(--primary);">' +
                 '<div class="stat-label">Accumulated in Period</div>' +
                 '<div class="stat-value" style="color:var(--primary);">' + t.doseAcc + '</div>' +
                 '<div class="stat-foot">' + rng + ' Transit Accumulation</div>' +
               '</div>' +
               '<div class="stat-card" style="border-left:4px solid var(--emerald);">' +
                 '<div class="stat-label">Total Career Dose</div>' +
                 '<div class="stat-value" style="color:var(--emerald);">' + c.radiation + '</div>' +
                 '<div class="stat-foot">35% of 600 mSv NASA Limit</div>' +
               '</div>' +
               '<div class="stat-card" style="border-left:4px solid var(--azure);">' +
                 '<div class="stat-label">Water Shielding Efficacy</div>' +
                 '<div class="stat-value" style="color:var(--azure);">99.4%</div>' +
                 '<div class="stat-foot">Hab Storm Shelter Nominal</div>' +
               '</div>' +
             '</div>' +
             '<div class="card" style="padding:20px;">' +
               '<h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin-bottom:14px;">GCR Ionizing Radiation Exposure Trend (' + rng + ')</h3>' +
               '<div>' +
                 radSvg +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 8. ACTIVITY & FITNESS VIEW
  var activityView = function() {
    var cid = S.crewId || 'carter';
    var rng = S.range || '7D';
    var t = window.getTelemetry(cid, rng);
    var c = window.getCrewData(cid);

    var actsHtml = (window.ACTS || []).map(function(a) {
      return '<div class="card" style="padding:14px; display:flex; justify-content:space-between; align-items:center;">' +
               '<div style="display:flex; align-items:center; gap:12px;">' +
                 '<div style="font-size:24px;">' + a.emoji + '</div>' +
                 '<div>' +
                   '<div style="font-size:13px; font-weight:700; color:var(--text-primary);">' + a.name + '</div>' +
                   '<div style="font-size:11px; color:var(--text-secondary);">' + a.type + ' • ' + a.dur + ' min</div>' +
                 '</div>' +
               '</div>' +
               '<div style="text-align:right;">' +
                 '<div style="font-size:14px; font-weight:800; font-family:var(--font-mono); color:var(--primary);">' + a.cal + ' kcal</div>' +
                 '<div style="font-size:10px; color:var(--emerald);">Completed 100%</div>' +
               '</div>' +
             '</div>';
    }).join('');

    return '<div class="view-activity animate-fade-in">' +
             renderCrewBar(cid) +
             '<div class="page-head">' +
               '<div>' +
                 '<h1 class="page-title">Countermeasure Exercise &amp; Fitness Protocol</h1>' +
                 '<p class="page-sub">ARED resistive loading, T2 treadmill, and CEVIS cycle logs for <strong>' + c.name + '</strong> (' + rng + ').</p>' +
               '</div>' +
             '</div>' +
             renderRangeTabs(rng) +
             '<div class="grid4" style="margin-bottom:24px;">' +
               '<div class="stat-card">' +
                 '<div class="stat-label">Exercise Total (' + rng + ')</div>' +
                 '<div class="stat-value" style="color:var(--emerald);">' + t.workoutMin + '</div>' +
                 '<div class="stat-foot">Target: 700 min/week</div>' +
               '</div>' +
               '<div class="stat-card">' +
                 '<div class="stat-label">ARED Resistance Compliance</div>' +
                 '<div class="stat-value" style="color:var(--primary);">96.5%</div>' +
                 '<div class="stat-foot">Bone Loss Countermeasure</div>' +
               '</div>' +
               '<div class="stat-card">' +
                 '<div class="stat-label">EVA Training Hours</div>' +
                 '<div class="stat-value" style="color:var(--azure);">' + c.evaHours + ' h</div>' +
                 '<div class="stat-foot">' + c.evaCount + ' Extravehicular Sorties</div>' +
               '</div>' +
               '<div class="stat-card">' +
                 '<div class="stat-label">VO₂ Max Retention</div>' +
                 '<div class="stat-value" style="color:var(--purple, #7657E8);">94.2%</div>' +
                 '<div class="stat-foot">Aerobic Endurance Nominal</div>' +
               '</div>' +
             '</div>' +
             '<div class="card" style="padding:20px; margin-bottom:20px;">' +
               '<h3 style="font-size:15px; font-weight:800; color:var(--text-primary); margin-bottom:14px;">Recent Exercise Sessions</h3>' +
               '<div style="display:flex; flex-direction:column; gap:10px;">' +
                 actsHtml +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 9. ALERTS / ACTION CENTER VIEW
  var alertsView = function() {
    var cid = S.crewId || 'carter';
    var c = window.getCrewData(cid);

    var alertsHtml = (window.ALERTS || []).map(function(a) {
      return '<div class="card" style="padding:16px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:flex-start; border-left:4px solid var(--amber);">' +
               '<div style="display:flex; gap:12px; align-items:flex-start;">' +
                 '<div style="font-size:20px; margin-top:2px;">' + window.icon(a.icon, 20) + '</div>' +
                 '<div>' +
                   '<div style="font-size:14px; font-weight:700; color:var(--text-primary);">' + a.title + '</div>' +
                   '<div style="font-size:12px; color:var(--text-secondary); margin-top:4px; line-height:1.4;">' + a.desc + '</div>' +
                 '</div>' +
               '</div>' +
               '<span class="badge badge-attention">' + a.time + '</span>' +
             '</div>';
    }).join('');

    return '<div class="view-alerts animate-fade-in">' +
             renderCrewBar(cid) +
             '<div class="page-head">' +
               '<div>' +
                 '<h1 class="page-title">Action Center &amp; Health Alerts</h1>' +
                 '<p class="page-sub">Active medical anomalies and priority notifications for <strong>' + c.name + '</strong>.</p>' +
               '</div>' +
             '</div>' +
             alertsHtml +
           '</div>';
  };

  // 10. MISSION INFO VIEW
  var missionView = function() {
    var m = window.MISSION;
    return '<div class="view-mission animate-fade-in">' +
             '<div class="page-head">' +
               '<div>' +
                 '<h1 class="page-title">' + m.name + ' — Mission Status</h1>' +
                 '<p class="page-sub">Flight trajectory, telemetry latency, and interplanetary transit milestones.</p>' +
               '</div>' +
             '</div>' +
             '<div class="grid4" style="margin-bottom:24px;">' +
               '<div class="stat-card">' +
                 '<div class="stat-label">Mission Transit Day</div>' +
                 '<div class="stat-value" style="color:var(--primary);">' + m.day + ' <span style="font-size:14px;">/ ' + m.total + '</span></div>' +
                 '<div class="stat-foot">20.2% Progress to Mars Orbit</div>' +
               '</div>' +
               '<div class="stat-card">' +
                 '<div class="stat-label">Earth-Vessel Distance</div>' +
                 '<div class="stat-value" style="color:var(--azure);">' + m.distance + '</div>' +
                 '<div class="stat-foot">Deep Space Network Linked</div>' +
               '</div>' +
               '<div class="stat-card">' +
                 '<div class="stat-label">One-Way Signal Delay</div>' +
                 '<div class="stat-value" style="color:var(--amber);">' + m.delay + '</div>' +
                 '<div class="stat-foot">Speed-of-Light Comm Gap</div>' +
               '</div>' +
               '<div class="stat-card">' +
                 '<div class="stat-label">Mission Phase</div>' +
                 '<div class="stat-value" style="font-size:18px; color:var(--emerald);">' + m.phase + '</div>' +
                 '<div class="stat-foot">Autonomous ECLSS Active</div>' +
               '</div>' +
             '</div>' +
           '</div>';
  };

  // 11. PROFILE & SETTINGS VIEW
  var profileView = function() {
    var cid = S.crewId || 'carter';
    var c = window.getCrewData(cid);

    return '<div class="view-profile animate-fade-in">' +
             renderCrewBar(cid) +
             '<div class="page-head">' +
               '<div>' +
                 '<h1 class="page-title">Astronaut Medical Dossier &amp; Biometrics</h1>' +
                 '<p class="page-sub">Official NASA flight surgeon baseline records for <strong>' + c.name + '</strong> (' + c.sid + ').</p>' +
               '</div>' +
             '</div>' +
             '<div class="card" style="max-width:720px; padding:24px;">' +
               '<div style="display:flex; gap:18px; align-items:center; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid var(--border);">' +
                 '<div class="crew-card-avatar" style="width:60px; height:60px; font-size:20px;">' + c.avatar + '</div>' +
                 '<div>' +
                   '<h2 style="font-size:18px; font-weight:800; color:var(--text-primary);">' + c.name + '</h2>' +
                   '<div style="font-size:13px; color:var(--text-secondary);">' + c.role + ' • Serial ID: <strong>' + c.sid + '</strong></div>' +
                   '<div style="font-size:12px; color:var(--emerald); margin-top:2px;">● ' + c.statusLabel + '</div>' +
                 '</div>' +
               '</div>' +
               '<div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px;">' +
                 '<div><span style="font-size:11px; color:var(--text-secondary);">Age / Gender:</span><div style="font-size:13px; font-weight:700;">' + c.age + ' yrs / ' + c.gender + '</div></div>' +
                 '<div><span style="font-size:11px; color:var(--text-secondary);">Height / Mass:</span><div style="font-size:13px; font-weight:700;">' + c.height + ' / ' + c.weight + '</div></div>' +
                 '<div><span style="font-size:11px; color:var(--text-secondary);">Blood Group:</span><div style="font-size:13px; font-weight:700;">' + c.bloodType + '</div></div>' +
                 '<div><span style="font-size:11px; color:var(--text-secondary);">EVA Sorties:</span><div style="font-size:13px; font-weight:700;">' + c.evaCount + ' (' + c.evaHours + ' hrs logged)</div></div>' +
                 '<div style="grid-column:1 / -1;"><span style="font-size:11px; color:var(--text-secondary);">Emergency Contact:</span><div style="font-size:13px; font-weight:700;">' + c.emergencyContact + '</div></div>' +
               '</div>' +
               '<button class="btn btn-primary" onclick="S.logout()">Log Out / Switch Role Portal</button>' +
             '</div>' +
           '</div>';
  };

  // Expose methods under both V and AstronautViews with kebab-case and camelCase aliases
  var viewsObj = {
    login: loginView,
    overview: overviewView,
    systems: systemsView,
    'system-detail': systemDetailView,
    systemDetail: systemDetailView,
    vitals: vitalsView,
    telemetry: vitalsView,
    assessment: assessmentView,
    wellness: wellnessView,
    radiation: radiationView,
    activity: activityView,
    trends: activityView,
    alerts: alertsView,
    mission: missionView,
    profile: profileView
  };

  Object.assign(window.V, viewsObj);
  Object.assign(window.AstronautViews, viewsObj);
})();
