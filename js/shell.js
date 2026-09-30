// js/shell.js — Navigation Sidebar & Topbar Shell for STAR PLUS 1.2

(function() {
  window.renderShell = function(contentHtml) {
    var role = S.role;
    var view = S.view;
    var activeCrew = (typeof window.getCrewData === 'function') ? window.getCrewData(S.crewId) : { name: 'Alex Carter', sid: 'AST-001', avatar: 'AC', role: 'Commander' };

    var navItems = [];
    if (role === 'astronaut') {
      navItems = [
        { id: 'overview', label: 'Overview', icon: 'overview' },
        { id: 'systems', label: 'Health Systems', icon: 'systems' },
        { id: 'vitals', label: 'Vital Signs', icon: 'vitals' },
        { id: 'assessment', label: 'Assessments', icon: 'assessments' },
        { id: 'wellness', label: 'Wellness Check', icon: 'wellness' },
        { id: 'radiation', label: 'Radiation', icon: 'radiation' },
        { id: 'activity', label: 'Activity & Fitness', icon: 'activity' },
        { id: 'alerts', label: 'Action Center', icon: 'alerts' },
        { id: 'mission', label: 'Mission Info', icon: 'mission' },
        { id: 'profile', label: 'Profile & Settings', icon: 'profile' }
      ];
    } else if (role === 'staff') {
      var staffLabel = 'Crew Detail (' + (activeCrew ? activeCrew.name.split(' ')[1] || activeCrew.name : 'Crew') + ')';
      navItems = [
        { id: 'staff-overview', label: 'Crew Overview', icon: 'crew' },
        { id: 'crew-detail', label: staffLabel, icon: 'profile' },
        { id: 'systems', label: 'System Analytics', icon: 'systems' },
        { id: 'alerts', label: 'Medical Alerts', icon: 'alerts' },
        { id: 'mission', label: 'Mission Status', icon: 'mission' },
        { id: 'profile', label: 'Officer Settings', icon: 'settings' }
      ];
    } else if (role === 'control') {
      navItems = [
        { id: 'control-overview', label: 'Mission Overview', icon: 'control' },
        { id: 'staff-overview', label: 'Crew Health Status', icon: 'crew' },
        { id: 'radiation', label: 'Environment & Rad', icon: 'radiation' },
        { id: 'mission', label: 'Mission Timeline', icon: 'mission' },
        { id: 'alerts', label: 'System Alerts', icon: 'alerts' }
      ];
    }

    var sidebarNav = navItems.map(function(item) {
      var active = (view === item.id || (item.id === 'systems' && view === 'system-detail')) ? 'on' : '';
      return '<button class="navitem ' + active + '" onclick="S.set({view:\'' + item.id + '\'})">' +
               window.icon(item.icon, 18) +
               '<span>' + item.label + '</span>' +
             '</button>';
    }).join('');

    var roleTitle = role === 'astronaut' ? 'ASTRONAUT PORTAL' : (role === 'staff' ? 'FLIGHT SURGEON' : 'MISSION CONTROL');
    var userBadge = role === 'astronaut' ? (activeCrew.name + ' • ' + activeCrew.sid) : (role === 'staff' ? 'Dr. Marina Santos' : 'Flight Director');
    var roleShort = role === 'astronaut' ? activeCrew.role : (role === 'staff' ? 'Med Ops Lead' : 'HQ Comm');
    var avatarLetters = role === 'astronaut' ? activeCrew.avatar : (role === 'staff' ? 'MS' : 'FD');

    // Crew switcher dropdown options
    var crewOptions = (window.CREW || []).map(function(c) {
      var sel = (c.id === S.crewId) ? 'selected' : '';
      return '<option value="' + c.id + '" ' + sel + '>' + c.name + ' (' + c.sid + ' - ' + c.role + ')</option>';
    }).join('');

    var headerCrewSwitcher = '';
    if (role === 'astronaut' || role === 'staff') {
      headerCrewSwitcher = '<div class="header-crew-select-wrapper">' +
                             '<label class="crew-select-label">' + window.icon('crew', 13) + ' Astronaut:</label>' +
                             '<select class="header-crew-select" onchange="S.switchCrew(this.value)">' +
                               crewOptions +
                             '</select>' +
                           '</div>';
    }

    return '<div class="app">' +
             '<!-- Sidebar -->' +
             '<aside class="sidebar">' +
               '<div class="side-logo" onclick="S.set({view:\'' + (role === 'astronaut' ? 'overview' : (role === 'staff' ? 'staff-overview' : 'control-overview')) + '\'})" style="cursor:pointer;">' +
                 '<div class="logo-icon">' +
                   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
                 '</div>' +
                 '<div class="side-title">STAR <span>PLUS</span><span class="version-tag">v1.2</span></div>' +
               '</div>' +
               '<nav>' +
                 '<div class="navgroup">' + roleTitle + '</div>' +
                 sidebarNav +
               '</nav>' +
               '<div class="side-foot">' +
                 '<div class="telemetry-ping">' +
                   '<span class="ping-dot"></span>' +
                   '<span>TELEMETRY SYNCED</span>' +
                 '</div>' +
                 '<button class="logout-mini-btn" onclick="S.logout()" title="Switch Portal / Logout">' +
                   window.icon('x', 14) +
                 '</button>' +
               '</div>' +
             '</aside>' +
             '<!-- Main Content Area -->' +
             '<main class="main">' +
               '<!-- Topbar -->' +
               '<header class="topbar">' +
                 '<div class="left">' +
                   '<div class="mission-meta">' +
                     '<span class="mars-dot"></span>' +
                     '<span>MARS TRANSIT</span>' +
                   '</div>' +
                   '<span class="divider-v"></span>' +
                   '<span class="chip-sol">SOL 184 / 912</span>' +
                   '<span class="meta-stats">Distance: <strong>128.4M km</strong> • Earth Delay: <strong>14m 22s</strong> • Link: <strong style="color:var(--emerald);">99.8%</strong></span>' +
                 '</div>' +
                 '<div class="right">' +
                   headerCrewSwitcher +
                   '<div class="rolebadge">' +
                     '<span class="role-avatar">' + avatarLetters + '</span>' +
                     '<div class="role-details">' +
                       '<span class="role-name">' + userBadge + '</span>' +
                       '<span class="role-sub">' + roleShort + '</span>' +
                     '</div>' +
                   '</div>' +
                   '<button class="iconbtn switch-role-btn" onclick="S.logout()">' +
                     window.icon('profile', 14) + ' <span>Switch Role</span>' +
                   '</button>' +
                 '</div>' +
               '</header>' +
               '<!-- Page View Content -->' +
               '<div class="content">' +
                 contentHtml +
               '</div>' +
             '</main>' +
           '</div>';
  };
})();
