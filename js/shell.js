// js/shell.js — Navigation Sidebar & Topbar Shell for STAR PLUS 1.2

(function() {
  window.renderShell = function(contentHtml) {
    var role = S.role;
    var view = S.view;

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
      navItems = [
        { id: 'staff-overview', label: 'Crew Overview', icon: 'crew' },
        { id: 'crew-detail', label: 'Crew Detail (Kim)', icon: 'profile' },
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

    var roleTitle = role === 'astronaut' ? 'ASTRONAUT' : (role === 'staff' ? 'FLIGHT SURGEON' : 'MISSION CONTROL');
    var userBadge = role === 'astronaut' ? 'Alex Carter (AST-001)' : (role === 'staff' ? 'Dr. Marina Santos' : 'Flight Director');

    return '<div class="app">' +
             '<!-- Sidebar -->' +
             '<aside class="sidebar">' +
               '<div class="side-logo">' +
                 '<div class="logo-icon">SP</div>' +
                 '<div class="side-title">STAR <span>PLUS</span></div>' +
               '</div>' +
               '<nav>' +
                 '<div class="navgroup">' + roleTitle + ' MENU</div>' +
                 sidebarNav +
               '</nav>' +
               '<div class="side-foot">' +
                 '<span>v1.2.0 • Online</span>' +
                 '<button style="color:rgba(255,255,255,0.6);" onclick="S.logout()" title="Logout">' + window.icon('x', 14) + '</button>' +
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
                   '<span style="color:var(--text-muted);">|</span>' +
                   '<span class="chip">DAY 184 / 912</span>' +
                   '<span style="font-size:12px; color:var(--text-secondary);">Distance: 128.4M km • Delay: 14 min</span>' +
                 '</div>' +
                 '<div class="right">' +
                   '<div class="rolebadge">' + userBadge + '</div>' +
                   '<button class="iconbtn" onclick="S.logout()">' +
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
