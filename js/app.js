// js/app.js — Application Router & View Lifecycle Controller for STAR PLUS 1.2

(function() {
  window.render = function() {
    var appContainer = document.getElementById('app');
    if (!appContainer) return;

    // Dispose all running 3D canvas viewers before re-rendering view
    if (window.ThreeViewerManager) {
      window.ThreeViewerManager.disposeAll();
    }

    var role = S.role;
    var view = S.view;

    // Login screen renderer (role not set or view is login)
    if (!role || view === 'login') {
      appContainer.innerHTML = window.AstronautViews.login();
      return;
    }

    // Determine content HTML for active view
    var contentHtml = '';
    var sysMap = {
      'cardiovascular': 'cardiovascular',
      'respiratory': 'respiratory',
      'neurological': 'neurological',
      'musculoskeletal': 'musculoskeletal',
      'immune': 'immune',
      'behavioral': 'behavioral'
    };

    if (sysMap[view]) {
      S.sys = sysMap[view];
      contentHtml = window.AstronautViews.systemDetail();
    } else if (view === 'overview') {
      contentHtml = window.AstronautViews.overview();
    } else if (view === 'systems') {
      contentHtml = window.AstronautViews.systems();
    } else if (view === 'system-detail') {
      contentHtml = window.AstronautViews.systemDetail();
    } else if (view === 'vitals' || view === 'telemetry') {
      contentHtml = window.AstronautViews.vitals();
    } else if (view === 'assessment') {
      contentHtml = window.AstronautViews.assessment();
    } else if (view === 'wellness') {
      contentHtml = window.AstronautViews.wellness();
    } else if (view === 'radiation') {
      contentHtml = window.AstronautViews.radiation();
    } else if (view === 'activity' || view === 'trends') {
      contentHtml = window.AstronautViews.activity();
    } else if (view === 'alerts') {
      contentHtml = window.AstronautViews.alerts();
    } else if (view === 'mission') {
      contentHtml = window.AstronautViews.mission();
    } else if (view === 'profile') {
      contentHtml = window.AstronautViews.profile();
    } else if (view === 'staff-overview') {
      contentHtml = window.StaffViews.staffOverview();
    } else if (view === 'crew-detail') {
      contentHtml = window.StaffViews.crewDetail();
    } else if (view === 'control-overview') {
      contentHtml = window.StaffViews.controlOverview();
    } else {
      contentHtml = window.AstronautViews.overview();
    }

    // Wrap with shell (sidebar & topbar)
    appContainer.innerHTML = window.renderShell(contentHtml);

    // Initialize 3D Viewers after DOM update
    setTimeout(initViewers, 60);
  };

  function initViewers() {
    if (typeof window.disposeAllViewers === 'function') {
      window.disposeAllViewers();
    }

    var organTarget = document.getElementById('organ-canvas') || document.getElementById('organ-viewer-box') || document.getElementById('detail-3d-canvas') || document.getElementById('crew-3d-canvas');
    if (organTarget && typeof window.createViewer === 'function') {
      var organType = (window.S && window.S.sys) ? window.S.sys : 'cardiovascular';
      window.createViewer(organTarget, organType, true);
    }
  }

  // Subscribe state store to trigger render on state mutations
  if (window.S && window.S.subscribe) {
    window.S.subscribe(window.render);
  }

  // Initial render when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.render();
    });
  } else {
    window.render();
  }
})();
