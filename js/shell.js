// js/shell.js — Navigation Shell (Header Bar, Tabs & Sidebar) for STAR PLUS 1.2

(function() {
  window.renderShell = function(contentHtml) {
    var role = S.role || 'astronaut';
    var view = S.view || 'overview';
    var activeCrew = (typeof window.getCrewData === 'function') ? window.getCrewData(S.crewId) : { name: 'Alex Carter', sid: 'AST-001', avatar: 'AC', role: 'Commander' };

    // Primary Top Navigation Tabs matching the mockups
    var topTabs = [
      { id: 'overview', label: 'Home', icon: 'home', aliases: ['overview', 'home'] },
      { id: 'systems', label: 'My Health', icon: 'health', aliases: ['systems', 'health', 'vitals'] },
      { id: 'system-detail', label: '3D Body', icon: 'body', aliases: ['system-detail', 'body-explorer', '3d-body', 'body3d'] },
      { id: 'mission', label: 'Missions', icon: 'rocket', aliases: ['mission', 'missions'] },
      { id: 'learn', label: 'Learn', icon: 'book', aliases: ['learn'] },
      { id: 'nasa-data', label: 'NASA Data', icon: 'orbit', aliases: ['nasa-data', 'nasadata'] }
    ];

    // Build Top Navigation Tab Buttons
    var topTabsHtml = topTabs.map(function(tab) {
      var isActive = (tab.aliases.indexOf(view) !== -1);
      var activeClass = isActive ? 'active' : '';
      return '<button class="top-nav-tab ' + activeClass + '" onclick="S.set({view:\'' + tab.id + '\'})">' +
               '<span class="tab-icon">' + window.icon(tab.icon, 16) + '</span>' +
               '<span class="tab-label">' + tab.label + '</span>' +
             '</button>';
    }).join('');

    // Left Sidebar Navigation Items
    var sidebarNavItems = [
      { id: 'overview', label: 'Home', icon: 'home', aliases: ['overview', 'home'] },
      { id: 'systems', label: 'My Health', icon: 'health', aliases: ['systems', 'health', 'vitals'] },
      { id: 'system-detail', label: '3D Body', icon: 'body', aliases: ['system-detail', 'body-explorer', '3d-body', 'body3d'] },
      { id: 'mission', label: 'Missions', icon: 'rocket', aliases: ['mission', 'missions'] },
      { id: 'learn', label: 'Learn', icon: 'book', aliases: ['learn'] },
      { id: 'nasa-data', label: 'NASA Data', icon: 'orbit', aliases: ['nasa-data', 'nasadata'] }
    ];

    var sidebarNavHtml = sidebarNavItems.map(function(item) {
      var isActive = (item.aliases.indexOf(view) !== -1);
      var activeClass = isActive ? 'active' : '';
      return '<button class="side-nav-item ' + activeClass + '" onclick="S.set({view:\'' + item.id + '\'})">' +
               '<span class="side-nav-icon">' + window.icon(item.icon, 18) + '</span>' +
               '<span class="side-nav-text">' + item.label + '</span>' +
             '</button>';
    }).join('');

    // Mode Toggle (Simple Mode vs Pro Mode)
    var isPro = (role === 'staff' || role === 'control');
    var simpleActiveClass = !isPro ? 'active' : '';
    var proActiveClass = isPro ? 'active' : '';

    var userBadgeName = activeCrew ? activeCrew.name : 'Alex Carter';
    var userAvatar = activeCrew ? activeCrew.avatar : 'AC';

    return '<div class="app-layout-container">' +
             '<!-- Top Aerospace Header Bar -->' +
             '<header class="main-header">' +
               '<div class="header-left">' +
                 '<div class="brand-group" onclick="S.set({view:\'overview\'})" style="cursor:pointer;" title="STAR PLUS Home">' +
                   '<div class="brand-star">' + window.starLogo3D(34) + '</div>' +
                   '<div class="brand-text-block">' +
                     '<div class="brand-name">STAR <span class="brand-plus">PLUS</span></div>' +
                     '<div class="brand-tagline">Space Health Monitoring for Everyone</div>' +
                   '</div>' +
                   '<div class="brand-nasa-logo">' + window.nasaLogo(32) + '</div>' +
                 '</div>' +
               '</div>' +

               '<nav class="header-center-tabs">' +
                 topTabsHtml +
               '</nav>' +

               '<div class="header-right">' +
                 '<!-- Mode Switcher Pill -->' +
                 '<div class="mode-switcher-pill">' +
                   '<button class="mode-btn ' + simpleActiveClass + '" onclick="S.login(\'astronaut\')" title="Astronaut Simple Mode">Simple Mode</button>' +
                   '<button class="mode-btn ' + proActiveClass + '" onclick="S.login(\'staff\')" title="Medical Officer & Flight Deck Pro Mode">Pro Mode</button>' +
                 '</div>' +

                 '<!-- Notifications Bell -->' +
                 '<button class="header-icon-btn" onclick="S.set({view:\'alerts\'})" title="Alerts & Notifications">' +
                   window.icon('bell', 18) +
                   '<span class="notification-badge-dot"></span>' +
                 '</button>' +

                 '<!-- Mission Day Widget -->' +
                 '<div class="header-mission-widget" onclick="S.set({view:\'mission\'})" title="Mission Day Telemetry">' +
                   '<div class="mission-widget-top">' +
                     '<span class="mission-day-title">Mission Day 183</span>' +
                     '<span class="mission-days-left">199 days remaining</span>' +
                   '</div>' +
                   '<div class="mission-progress-track">' +
                     '<div class="mission-progress-fill" style="width:50%;"></div>' +
                   '</div>' +
                 '</div>' +

                 '<!-- Profile Avatar -->' +
                 '<div class="header-profile-avatar" onclick="S.set({view:\'profile\'})" title="' + userBadgeName + ' (Click for Profile/Role)">' +
                   '<span class="avatar-initials">' + userAvatar + '</span>' +
                   '<span class="avatar-online-dot"></span>' +
                 '</div>' +
               '</div>' +
             '</header>' +

             '<!-- Main App Layout (Sidebar + Content Viewport) -->' +
             '<div class="app-body-layout">' +
               '<!-- Left Sidebar Navigation -->' +
               '<aside class="app-sidebar">' +
                 '<div class="sidebar-nav-list">' +
                   sidebarNavHtml +
                   '<div class="sidebar-divider"></div>' +
                   '<button class="side-nav-item ' + (view === 'profile' ? 'active' : '') + '" onclick="S.set({view:\'profile\'})">' +
                     '<span class="side-nav-icon">' + window.icon('settings', 18) + '</span>' +
                     '<span class="side-nav-text">Settings</span>' +
                   '</button>' +
                   '<button class="side-nav-item ' + (view === 'learn' ? 'active' : '') + '" onclick="S.set({view:\'learn\'})">' +
                     '<span class="side-nav-icon">' + window.icon('help', 18) + '</span>' +
                     '<span class="side-nav-text">Help</span>' +
                   '</button>' +
                 '</div>' +

                 '<!-- Sidebar Footer Status -->' +
                 '<div class="sidebar-bottom-status">' +
                   '<div class="connection-status-pill">' +
                     '<span class="pulse-green-dot"></span>' +
                     '<span class="connection-text">Connection Online</span>' +
                     '<span class="signal-bars">' +
                       '<span class="bar b1"></span><span class="bar b2"></span><span class="bar b3"></span><span class="bar b4"></span>' +
                     '</span>' +
                   '</div>' +
                   '<div class="sidebar-motto-quote">“A healthier tomorrow for further missions.”</div>' +
                 '</div>' +
               '</aside>' +

               '<!-- Main Scrollable Content Area -->' +
               '<main class="app-main-content">' +
                 contentHtml +
               '</main>' +
             '</div>' +
           '</div>';
  };
})();
