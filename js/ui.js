// js/ui.js — UI Primitive Generators for STAR PLUS 1.2

(function() {
  window.pill = function(status, text) {
    status = (status || 'stable').toLowerCase();
    var cls = 'pill-stable';
    var defaultText = 'Stable';

    if (status === 'attention') { cls = 'pill-attention'; defaultText = 'Attention'; }
    else if (status === 'monitoring') { cls = 'pill-monitoring'; defaultText = 'Monitoring'; }
    else if (status === 'critical') { cls = 'pill-critical'; defaultText = 'Critical'; }

    return '<span class="pill ' + cls + '"><i></i>' + (text || defaultText) + '</span>';
  };

  window.statCard = function(label, value, unit, iconName, iconBg, iconColor) {
    iconBg = iconBg || '#EAF3FF';
    iconColor = iconColor || '#1769E8';
    return '<div class="stat-pill-card">' +
             '<div class="stat-pill-icon" style="background:' + iconBg + '; color:' + iconColor + ';">' +
               window.icon(iconName || 'overview', 22) +
             '</div>' +
             '<div>' +
               '<div class="tile-label">' + label + '</div>' +
               '<div class="value" style="font-size:20px;">' + value + (unit ? '<span class="unit">' + unit + '</span>' : '') + '</div>' +
             '</div>' +
           '</div>';
  };

  window.meterBar = function(value, max, colorHex) {
    var pct = Math.min(100, Math.max(0, (value / max) * 100));
    colorHex = colorHex || '#1769E8';
    return '<div class="bar"><div style="width:' + pct + '%; background:' + colorHex + ';"></div></div>';
  };

  window.alertRow = function(alert) {
    var pillHtml = window.pill(alert.status, alert.status.toUpperCase());
    return '<div class="card" style="padding:16px 20px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; gap:16px;">' +
             '<div style="display:flex; align-items:flex-start; gap:14px;">' +
               '<div style="width:36px; height:36px; border-radius:10px; background:#FEF6E9; color:#F5A623; display:grid; place-items:center; flex-shrink:0;">' +
                 window.icon('alerts', 18) +
               '</div>' +
               '<div>' +
                 '<div style="display:flex; align-items:center; gap:10px;">' +
                   '<span style="font-weight:700; font-size:14px; color:#0F172A;">' + alert.title + '</span>' +
                   pillHtml +
                   '<span style="font-size:11px; color:#94A3B8;">' + (alert.time || 'Just now') + '</span>' +
                 '</div>' +
                 '<div style="font-size:12px; color:#64748B; margin-top:4px;">' + alert.desc + '</div>' +
               '</div>' +
             '</div>' +
             '<div style="display:flex; gap:8px;">' +
               '<button class="btn btn-p" onclick="S.set({view:\'systems\', sys:\'cardiovascular\'})">Take Action</button>' +
               '<button class="btn" onclick="this.closest(\'.card\').remove()">Dismiss</button>' +
             '</div>' +
           '</div>';
  };

  window.crewCard = function(crewMember, isActive) {
    var pillHtml = window.pill(crewMember.status, crewMember.status.toUpperCase());
    return '<div class="card hover" onclick="S.set({crewId:\'' + crewMember.id + '\', view:\'crew-detail\'})" style="border-color:' + (isActive ? '#1769E8' : 'var(--border)') + ';">' +
             '<div style="display:flex; align-items:center; gap:14px;">' +
               '<div style="width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg, #0B192C, #1769E8); color:#FFF; display:grid; place-items:center; font-weight:800; font-size:16px;">' +
                 crewMember.name.split(' ').map(function(n){return n[0];}).join('') +
               '</div>' +
               '<div style="flex:1;">' +
                 '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                   '<span style="font-weight:700; font-size:15px;">' + crewMember.name + '</span>' +
                   pillHtml +
                 '</div>' +
                 '<div style="font-size:12px; color:#64748B; margin-top:2px;">' + crewMember.role + ' • ' + crewMember.id + '</div>' +
               '</div>' +
             '</div>' +
             '<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-top:16px; padding-top:12px; border-top:1px solid #E2E8F0; text-align:center;">' +
               '<div><div class="tile-label">HR</div><div style="font-size:14px; font-weight:700;">' + crewMember.hr + '</div></div>' +
               '<div><div class="tile-label">BP</div><div style="font-size:14px; font-weight:700;">' + crewMember.bp + '</div></div>' +
               '<div><div class="tile-label">SpO₂</div><div style="font-size:14px; font-weight:700;">' + crewMember.spo2 + '</div></div>' +
             '</div>' +
             '</div>';
             };

             // Apple-grade Non-blocking Toast Notification
             window.toast = function(msg, type) {
             var container = document.getElementById('toast-container');
             if (!container) {
             container = document.createElement('div');
             container.id = 'toast-container';
             container.className = 'toast-container';
             document.body.appendChild(container);
             }

             var t = document.createElement('div');
             t.className = 'toast toast-' + (type || 'success');
             var icon = type === 'warning' ? '⚠️' : (type === 'info' ? 'ℹ️' : '✓');
             t.innerHTML = '<span style="font-size:15px; font-weight:700;">' + icon + '</span><span>' + msg + '</span>';
             container.appendChild(t);

             setTimeout(function() {
             t.classList.add('toast-out');
             setTimeout(function() {
             if (t.parentNode) t.parentNode.removeChild(t);
             }, 250);
             }, 3200);
             };
             })();
