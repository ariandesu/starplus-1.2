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
    if (view === 'overview') {
      contentHtml = window.AstronautViews.overview();
    } else if (view === 'systems') {
      contentHtml = window.AstronautViews.systems();
    } else if (view === 'system-detail') {
      contentHtml = window.AstronautViews.systemDetail();
    } else if (view === 'vitals') {
      contentHtml = window.AstronautViews.vitals();
    } else if (view === 'assessment') {
      contentHtml = window.AstronautViews.assessment();
    } else if (view === 'wellness') {
      contentHtml = window.AstronautViews.wellness();
    } else if (view === 'radiation') {
      contentHtml = window.AstronautViews.radiation();
    } else if (view === 'activity') {
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
    if (!window.ThreeViewerManager || !window.THREE) return;

    var view = S.view;

    if (view === 'overview') {
      var bodyElem = document.getElementById('body-3d-canvas');
      if (bodyElem) {
        window.ThreeViewerManager.create('body-3d-canvas', 'models/organs/realistic_human_skeleton.glb', {
          autoRotate: true,
          cameraPos: [0, 0, 3.5]
        });
      }
    } else if (view === 'systems') {
      var organModels = {
        'mini-3d-cardiovascular': 'models/organs/VH_M_Heart.glb',
        'mini-3d-respiratory': 'models/organs/VH_M_Lung.glb',
        'mini-3d-neurological': 'models/organs/Allen_M_Brain.glb',
        'mini-3d-musculoskeletal': 'models/organs/Skeleton.glb',
        'mini-3d-immune': 'models/organs/Endocrine.glb',
        'mini-3d-behavioral': 'models/organs/sleep_astronaut.glb'
      };

      Object.keys(organModels).forEach(function(elemId) {
        if (document.getElementById(elemId)) {
          window.ThreeViewerManager.create(elemId, organModels[elemId], {
            autoRotate: true,
            mini: true,
            cameraPos: [0, 0, 2.8]
          });
        }
      });
    } else if (view === 'system-detail') {
      var sysId = S.sys || 'cardiovascular';
      var sysModelMap = {
        'cardiovascular': 'models/organs/realistic_human_heart.glb',
        'respiratory': 'models/organs/VH_M_Lung.glb',
        'neurological': 'models/organs/Allen_M_Brain.glb',
        'musculoskeletal': 'models/organs/realistic_human_skeleton.glb',
        'immune': 'models/organs/Endocrine.glb',
        'behavioral': 'models/organs/sleep_astronaut.glb',
        'radiation': 'models/organs/realistic_human_skeleton.glb',
        'environmental': 'models/organs/realistic_human_skeleton.glb'
      };

      var modelPath = sysModelMap[sysId] || sysModelMap['cardiovascular'];
      if (document.getElementById('detail-3d-canvas')) {
        window.ThreeViewerManager.create('detail-3d-canvas', modelPath, {
          autoRotate: true,
          cameraPos: [0, 0, 2.5]
        });
      }
    } else if (view === 'crew-detail') {
      var crewElem = document.getElementById('crew-3d-canvas');
      if (crewElem) {
        window.ThreeViewerManager.create('crew-3d-canvas', 'models/organs/realistic_human_skeleton.glb', {
          autoRotate: true,
          cameraPos: [0, 0, 3.5]
        });
      }
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
