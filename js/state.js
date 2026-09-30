// js/state.js — Global State Management & Navigation Store for STAR PLUS 1.2

(function() {
  var _listeners = [];

  var initialSliders = {};
  if (typeof SLIDERS !== 'undefined' && Array.isArray(SLIDERS)) {
    SLIDERS.forEach(function(sl) {
      initialSliders[sl.id] = sl.defaultVal || 50;
    });
  } else {
    initialSliders = { energy: 85, stress: 25, sleep: 80, workload: 65, hydration: 90, appetite: 85 };
  }

  window.S = {
    role: null,            // null = Login screen, 'astronaut', 'staff', 'control'
    view: 'login',         // 'login', 'overview', 'systems', 'system-detail', 'vitals', 'assessment', 'wellness', 'radiation', 'activity', 'alerts', 'mission', 'profile', 'staff-overview', 'crew-detail', 'control-overview'
    sys: 'cardiovascular', // active organ system detail ID
    crewId: 'carter',      // active crew member ID (carter, kim, silva, chen)
    subTab: 'overview',    // sub-tab in system detail ('overview', 'trends', 'insights', 'recommendations')
    range: '7D',           // '1D', '7D', '30D', 'Live'
    step: 0,               // assessment wizard step (0..3)
    mood: 1,               // daily wellness mood index (0..4)
    sliders: initialSliders,
    tabs: {},
    dismissed: [],
    anom: {},
    why: false,
    submitted: false,

    // Public Getters
    get: function() {
      return {
        role: this.role,
        view: this.view,
        sys: this.sys,
        crewId: this.crewId,
        subTab: this.subTab,
        range: this.range,
        step: this.step,
        mood: this.mood,
        sliders: this.sliders
      };
    },

    // State Mutation & Reactive Re-render
    set: function(updates) {
      if (!updates || typeof updates !== 'object') return;
      for (var k in updates) {
        if (Object.prototype.hasOwnProperty.call(updates, k)) {
          this[k] = updates[k];
        }
      }
      this.notify();
    },

    // Crew Switching
    switchCrew: function(id) {
      this.crewId = id;
      this.notify();
      if (window.toast) {
        var c = (window.CREW || []).find(function(item) { return item.id === id; });
        var name = c ? c.name : id;
        window.toast('Active telemetry switched to ' + name + ' (' + (c ? c.sid : '') + ')', 'info');
      }
    },

    // Date Range Selection
    setRange: function(r) {
      this.range = r;
      this.notify();
      if (window.toast) {
        window.toast('Telemetry timeframe updated to ' + r, 'info');
      }
    },

    // Role-based Navigation
    login: function(role) {
      this.role = role;
      if (role === 'staff' || role === 'surgeon') {
        this.role = 'staff';
        this.view = 'staff-overview';
      } else if (role === 'control' || role === 'mission_control') {
        this.role = 'control';
        this.view = 'control-overview';
      } else {
        this.role = 'astronaut';
        this.view = 'overview';
      }
      this.notify();
    },

    logout: function() {
      this.role = null;
      this.view = 'login';
      this.notify();
    },

    openSys: function(id) {
      this.set({ view: 'system-detail', sys: id });
    },

    openCrew: function(id) {
      this.set({ view: 'crew-detail', crewId: id });
    },

    // Assessment Wizard Flow
    stepNext: function() {
      this.step = Math.min(3, (this.step || 0) + 1);
      this.notify();
    },

    stepBack: function() {
      this.step = Math.max(0, (this.step || 0) - 1);
      this.notify();
    },

    submitAssessment: function() {
      if (window.toast) {
        window.toast('Cardiovascular assessment report submitted to Flight Surgeon.');
      }
      this.view = 'overview';
      this.step = 0;
      this.notify();
    },

    submitWellness: function() {
      if (window.toast) {
        window.toast('Daily wellness check-in logged successfully.');
      }
      this.view = 'overview';
      this.notify();
    },

    showToast: function(msg, type) {
      if (window.toast) window.toast(msg, type);
    },

    // Wellness Flow
    setMood: function(idx) {
      this.set({ mood: idx });
    },

    setSlider: function(id, val) {
      if (!this.sliders) this.sliders = {};
      this.sliders[id] = Number(val);
      var valEl = document.getElementById('slider-val-' + id);
      if (valEl) valEl.innerText = val + '%';
    },

    // Pub-Sub Event System
    subscribe: function(listener) {
      if (typeof listener === 'function' && _listeners.indexOf(listener) === -1) {
        _listeners.push(listener);
      }
    },

    notify: function() {
      _listeners.forEach(function(fn) {
        try { fn(); } catch(e) { console.error('State subscriber error:', e); }
      });
    }
  };

  // Global helper aliases for convenience
  window.login = function(r) { window.S.login(r); };
  window.logout = function() { window.S.logout(); };
  window.go = function(v) { window.S.set({ view: v }); };
  window.openSystem = function(id) { window.S.set({ view: 'system-detail', sys: id }); };
  window.openCrew = function(id) { window.S.openCrew(id); };
  window.switchCrew = function(id) { window.S.switchCrew(id); };
  window.setRange = function(r) { window.S.setRange(r); };
  window.stepNext = function() { window.S.stepNext(); };
  window.stepBack = function() { window.S.stepBack(); };
  window.setMood = function(i) { window.S.set({ mood: i }); };
  window.slideVal = function(id, v) { window.S.setSlider(id, v); };
  window.submitWellness = function() {
    window.S.submitWellness();
  };
})();
